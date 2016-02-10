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
export function dBToLin(dBValue) {
  const factor = 1 / 20;
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
export function createDiracBuffer(options = {}) {
  const context = options.audioContext;

  const length = (typeof options.length !== 'undefined'
                  ? options.length
                  : 2); // Safari ≤9 needs one more
  const channelCount = (typeof options.channelCount !== 'undefined'
                        ? options.channelCount
                        : 1);
  const gain = (typeof options.gain !== 'undefined'
                ? options.gain
                : 0); // dB

  const buffer = context.createBuffer(channelCount, length,
                                      context.sampleRate);
  const data = buffer.getChannelData(0);

  const amplitude = dBToLin(gain);
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
export function createNoiseBuffer(options = {}) {
  const context = options.audioContext;
  const duration = (typeof options.duration !== 'undefined'
                    ? options.duration
                    : 5);

  const gain = (typeof options.gain !== 'undefined'
                ? options.gain
                : -30); // dB

  const channelCount = (typeof options.channelCount
                          ? options.channelCount
                          : context.destination.channelCount);

  const length = duration * context.sampleRate;
  const amplitude = dBToLin(gain);
  const buffer = context.createBuffer(channelCount, length,
                                    context.sampleRate);
  for (let c = 0; c < channelCount; ++c) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < length; ++i) {
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
export function resampleFloat32Array(options = {}) {
  const promise = new Promise( (resolve, reject) => {
    const inputSamples = options.inputSamples;
    const inputSampleRate = options.inputSampleRate;

    const outputSampleRate = (typeof options.outputSampleRate !== 'undefined'
                              ? options.outputSampleRate
                              : inputSampleRate);

    if (inputSampleRate === outputSampleRate) {
      resolve(new Float32Array(inputSamples) );
    } else {
      try {
        const outputSamplesNb = Math.ceil(inputSamples.length
                                          * outputSampleRate / inputSampleRate);

        const context = new window.OfflineAudioContext(1, outputSamplesNb,
                                                       outputSampleRate);

        const inputBuffer = context.createBuffer(1, inputSamples.length,
                                                 inputSampleRate);

        inputBuffer.getChannelData(0).set(inputSamples);

        const source = context.createBufferSource();
        source.buffer = inputBuffer;
        source.connect(context.destination);

        source.start(); // will start with offline context

        context.oncomplete = (event) => {
          const outputSamples = event.renderedBuffer.getChannelData(0);
          resolve(outputSamples);
        };

        context.startRendering();
      } catch (error) {
        reject(new Error(`Unable to re-sample Float32Array. ${error.message}`) );
      }
    }
  });

  return promise;
}

export default {
  dBToLin,
  createDiracBuffer,
  createNoiseBuffer,
  resampleFloat32Array,
};
