import test from 'blue-tape';

import '../../include/AudioContextMonkeyPatch';

import audio from '../../src/audio/utilities';
import BinauralPanner from '../../src/audio/BinauralPanner';
import HrtfSet from '../../src/sofa/HrtfSet';
import ServerDataBase from '../../src/sofa/ServerDataBase';

const prefix = 'Listening test for BinauralPanner';

const audioContext = new window.AudioContext();

const noiseBuffer = audio.createNoiseBuffer({
  audioContext,
  channelCount: 1,
  duration: 5,
  gain: -20,
});

const coordinateSystem = 'sofaSpherical';
const testPositions = [
  [30, 0, 2], // front-left
  [0, 0, 2], // centre
  [-30, 0, 2], // front-right
  [-110, 0, 2], // rear-right
  [110, 0, 2], // rear-left
];

const testPositionsName = [
  'front-left',
  'centre',
  'front-right',
  'rear-right',
  'rear-left',
];

const hrtfSet = new HrtfSet({
  audioContext,
  filterPositions: testPositions,
  filterCoordinateSystem: coordinateSystem,
  coordinateSystem: 'gl', // mandatory for BinauralPanner
});

console.log('accessing server');
const serverDataBase = new ServerDataBase();

test(`${prefix}`, (assert) => {
  return serverDataBase.loadCatalogue()
    .then( () => {

      return serverDataBase.getUrls({
        convention: 'HRIR',
        dataBase: 'BILI',
        equalisation: 'COMPENSATED',
        sampleRate: audioContext.sampleRate,
        freePattern: '1148',
      });
    })
    .then( (urls) => {
      console.log('loading HRTF set');
      return hrtfSet.load(urls[0]);
    })
    .then( () => {
      console.log('activate audio');
      return new Promise( (resolve, reject) => {
        const now = audioContext.currentTime;
        if (now === 0) {
          console.log('manually start audio context');
          /* eslint-disable no-alert */
          if (window.confirm('Start Audio?') ) {
            const gain = audioContext.createGain();
            gain.gain.value = 0;
            gain.connect(audioContext.destination);

            const noiseBufferSource = audioContext.createBufferSource();
            noiseBufferSource.buffer = noiseBuffer;
            noiseBufferSource.loop = true;

            noiseBufferSource.connect(gain);
            noiseBufferSource.start(now);
            noiseBufferSource.stop(now + 0.3);
            resolve();
          } else {
            reject(new Error('Audio not started'));
          }
        } else {
          resolve();
        }
      });
    })
    .then( () => {
      console.log('testing multi source');

      const binauralPanner = new BinauralPanner({
        audioContext,
        crossfadeDuration: 0, // immediate for testing
        hrtfSet,
        coordinateSystem,
        sourceCount: testPositions.length,
        sourcePositions: testPositions,
      });

      binauralPanner.connectOutputs(audioContext.destination);

      testPositions.forEach( (position, index) => {
        const positionName = testPositionsName[index];
        const now = audioContext.currentTime;
        const noiseBufferSource = audioContext.createBufferSource();
        noiseBufferSource.buffer = noiseBuffer;
        noiseBufferSource.loop = true;
        binauralPanner.connectInputByIndex(index, noiseBufferSource);
        noiseBufferSource.start(now);

        if (window.confirm(`Is sound on the ${positionName}?`) ) {
          assert.pass(`${positionName}`);
          binauralPanner.disconnectInputByIndex(index, noiseBufferSource);
        } else {
          assert.fail(`${positionName}`);
          binauralPanner.disconnectInputByIndex(index, noiseBufferSource);
        }
        noiseBufferSource.stop(now);
      }); // for each position

    }); // testing source
}); // test after HrtfSet
