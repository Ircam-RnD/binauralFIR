'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.dBToLin = dBToLin;
exports.createDiracBuffer = createDiracBuffer;
exports.createNoiseBuffer = createNoiseBuffer;
exports.resampleFloat32Array = resampleFloat32Array;
/**
 * @fileOverview Audio utilities
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

/**
 * Convert a dB value to a linear amplitude, i.e. -20dB gives 0.1
 *
 * @param {Number} dBValue
 * @returns {Number}
 */
function dBToLin(dBValue) {
  var factor = 1 / 20;
  return Math.pow(10, dBValue * factor);
}

/**
 * Create a Dirac buffer, zero-padded.
 *
 * Warning: the default length is 2 samples,
 * to by-pass a bug in Safari ≤ 9.
 *
 * @param {Object} options
 * @param {AudioContext} options.audioContext must be defined
 * @param {Number} [options.channelCount=1]
 * @param {Number} [options.gain=0] in dB
 * @param {Number} [options.length=2] in samples
 * @returns {AudioBuffer}
 */
function createDiracBuffer() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var context = options.audioContext;

  var length = typeof options.length !== 'undefined' ? options.length : 2; // Safari ≤9 needs one more
  var channelCount = typeof options.channelCount !== 'undefined' ? options.channelCount : 1;
  var gain = typeof options.gain !== 'undefined' ? options.gain : 0; // dB

  var buffer = context.createBuffer(channelCount, length, context.sampleRate);
  var data = buffer.getChannelData(0);

  var amplitude = dBToLin(gain);
  data[0] = amplitude;
  // already padded with zeroes

  return buffer;
}

/**
 * Create a noise buffer.
 *
 * @param {Object} options
 * @param {AudioContext} options.audioContext must be defined
 * @param {Number} [options.channelCount=1]
 * @param {Number} [options.duration=5] in seconds
 * @param {Number} [options.gain=-30] in dB
 * @returns {AudioBuffer}
 */
function createNoiseBuffer() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var context = options.audioContext;
  var duration = typeof options.duration !== 'undefined' ? options.duration : 5;

  var gain = typeof options.gain !== 'undefined' ? options.gain : -30; // dB

  var channelCount = _typeof(options.channelCount) ? options.channelCount : context.destination.channelCount;

  var length = duration * context.sampleRate;
  var amplitude = dBToLin(gain);
  var buffer = context.createBuffer(channelCount, length, context.sampleRate);
  for (var c = 0; c < channelCount; ++c) {
    var data = buffer.getChannelData(c);
    for (var i = 0; i < length; ++i) {
      data[i] = amplitude * (Math.random() * 2 - 1);
    }
  }
  return buffer;
}

/**
 * Convert an array, typed or not, to a Float32Array, with possible re-sampling.
 *
 * @param {Object} options
 * @param {Array} options.inputSamples input array
 * @param {Number} options.inputSampleRate in Hertz
 * @param {Number} [options.outputSampleRate=options.inputSampleRate]
 * @returns {Promise.<Float32Array|Error>}
 */
function resampleFloat32Array() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var promise = new Promise(function (resolve, reject) {
    var inputSamples = options.inputSamples;
    var inputSampleRate = options.inputSampleRate;

    var outputSampleRate = typeof options.outputSampleRate !== 'undefined' ? options.outputSampleRate : inputSampleRate;

    if (inputSampleRate === outputSampleRate) {
      resolve(new Float32Array(inputSamples));
    } else {
      try {
        var outputSamplesNb = Math.ceil(inputSamples.length * outputSampleRate / inputSampleRate);

        var context = new window.OfflineAudioContext(1, outputSamplesNb, outputSampleRate);

        var inputBuffer = context.createBuffer(1, inputSamples.length, inputSampleRate);

        inputBuffer.getChannelData(0).set(inputSamples);

        var source = context.createBufferSource();
        source.buffer = inputBuffer;
        source.connect(context.destination);

        source.start(); // will start with offline context

        context.oncomplete = function (event) {
          var outputSamples = event.renderedBuffer.getChannelData(0);
          resolve(outputSamples);
        };

        context.startRendering();
      } catch (error) {
        reject(new Error('Unable to re-sample Float32Array. ' + error.message));
      }
    }
  });

  return promise;
}

exports.default = {
  dBToLin: dBToLin,
  createDiracBuffer: createDiracBuffer,
  createNoiseBuffer: createNoiseBuffer,
  resampleFloat32Array: resampleFloat32Array
};