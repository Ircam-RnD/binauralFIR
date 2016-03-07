import test from 'blue-tape';

import '../../include/AudioContextMonkeyPatch.js';

import { almostEquals } from '../../src/common/utilities';

import { resampleFloat32Array } from '../../src/audio/utilities';

const prefix = 'Audio utilities';

const audioContext = new window.AudioContext();

test(`${prefix}: resample`, (assert) => {
  const epsilon = 0.3; // very rough

  const promises = [];

  const inputSamples = new Float32Array([
    0,
    0.5,
    0,
    -0.5,
    0,
    0.25,
    0,
    -0.25,
    0,
    0.0125,
    -0,
  ]);

  // must at least support re-sampling to native sample-rate
  const outputSampleRate = audioContext.sampleRate;

  // little change
  const inputSampleRate = (outputSampleRate !== 44100
                           ? 44100
                           : 48000);

  promises.push(
    resampleFloat32Array({
      inputSamples,
      inputSampleRate: outputSampleRate,
      outputSampleRate,
    })
      .then( (outputSamples) => {
        assert.deepEquals(outputSamples, inputSamples,
                          'no change after re-sampling to the same sample-rate.');
      })
  );

  promises.push(
    resampleFloat32Array({
      inputSamples,
      inputSampleRate,
      outputSampleRate,
    })
      .then( (outputSamples) => {
        assert.equals(outputSamples.length,
                      Math.ceil(inputSamples.length
                                * outputSampleRate / inputSampleRate),
                      'change number of samples after up-sampling');

        // reverse
        return resampleFloat32Array({
          inputSamples: outputSamples,
          inputSampleRate: outputSampleRate,
          outputSampleRate: inputSampleRate,
        });
      })
      .then( (outputSamples) => {
        assert.ok(almostEquals(outputSamples.length, inputSamples.length,
                               1),
                  'go back to almost the same number of samples'
                  + ' after down-sampling.');

        // conversion to un-typed array for Safari ≤ 9
        assert.equals([...inputSamples].findIndex( (current, index) => {
          return !almostEquals(current, outputSamples[index], epsilon);
        }), -1, 'almost back to original samples');

      })
  ); // push promise

  return Promise.all(promises);
});
