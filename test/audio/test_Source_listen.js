import test from 'blue-tape';
import serveSofaHrir from 'serve-sofa-hrir';

import '../../include/AudioContextMonkeyPatch';

import audio from '../../src/audio/utilities';
import Source from '../../src/audio/Source';

const prefix = 'Listening test for single source';

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
];

const testPositionsName = [
  'front-left',
  'centre',
  'front-right',
];

const hrtfSet = new serveSofaHrir.HrtfSet({
  audioContext,
  filterPositions: testPositions,
  coordinateSystem,
});

console.log('accessing server');
const serverDataBase = new serveSofaHrir.ServerDataBase();

test(`${prefix}`, (assert) => {
  return serverDataBase.loadCatalogue()
    .then( () => {

      return serverDataBase.getUrls({
        convention: 'HRIR',
        dataBase: 'BILI',
        equalisation: 'COMPENSATED',
        sampleRate: audioContext.sampleRate,
        freePattern: '1147',
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
      console.log('testing moving source');

      const source = new Source({
        audioContext,
        hrtfSet,
        crossfadeDuration: 0,
      });

      const noiseBufferSource = audioContext.createBufferSource();
      noiseBufferSource.buffer = noiseBuffer;
      noiseBufferSource.loop = true;

      source.connectInput(noiseBufferSource);
      source.connectOutput(audioContext.destination);
      noiseBufferSource.start(0);

      testPositions.forEach( (position, index) => {
        const positionName = testPositionsName[index];
        return new Promise( () => {
          source.position = position;
          if (window.confirm(`Is sound on the ${positionName}?`) ) {
            assert.pass(`${positionName}`);
          } else {
            assert.fail(`${positionName}`);
          }
        });
      }); // for each position

      noiseBufferSource.stop(0);
    }); // testing source
}); // test after HrtfSet
