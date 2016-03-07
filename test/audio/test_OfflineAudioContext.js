import test from 'blue-tape';

import '../../include/AudioContextMonkeyPatch.js';

const prefix = 'Offline audio context';

const audioContext = new window.AudioContext();

test(`${prefix}: test for offline context`, (assert) => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  console.log(`native (online) audio context sample rate is`
              + ` ${audioContext.sampleRate}`);

  const promises = [];

  let sampleRates = [
    audioContext.sampleRate,
//    22050, // error on Safari 9
    44100,
    48000,
    96000,
  ];

  sampleRates = [...new Set(sampleRates)]; // no duplicates
  sampleRates.forEach( (sampleRate) => {
    promises.push(
      new Promise( (resolve, reject) => {
        try {
          const context = new window.OfflineAudioContext(1, input.length,
                                                         sampleRate);
          const buffer = context.createBuffer(1, input.length, sampleRate);
          const data = buffer.getChannelData(0);
          data.set(input);
          const bufferSource = context.createBufferSource();
          bufferSource.buffer = buffer;
          bufferSource.connect(context.destination);
          bufferSource.start();

          context.oncomplete = (event) => {
            const output = event.renderedBuffer.getChannelData(0);
            resolve(output);
          };

          context.startRendering();
        } catch (error) {
          reject(new Error(`Error at ${sampleRate} Hz: ${error.message}`) );
        }
      })
        .then( (output) => {
          assert.equals(output.length, input.length,
                        `context rendered entirely at ${sampleRate} Hz`);
          assert.deepEquals(output, input,
                            `no unexpected change in data at ${sampleRate}`);
        })
    );
  });

  return Promise.all(promises);
});
