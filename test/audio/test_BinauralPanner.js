import test from 'blue-tape';

import '../../include/AudioContextMonkeyPatch';

import audio from '../../src/audio/utilities';
import BinauralPanner from '../../src/audio/BinauralPanner';
import HrtfSet from '../../src/sofa/HrtfSet';
import ServerDataBase from '../../src/sofa/ServerDataBase';
import coordinates from '../../src/geometry/coordinates';

import { almostEquals } from '../../src/common/utilities';
const epsilon = 10e-7; // Float32

const prefix = 'Binaural panner';

const sampleRate = 44100;

const positionsType = 'sofaSpherical';
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

const serverDataBase = new ServerDataBase();

test(`${prefix}`, (assert) => {
  console.log('loading catalogue from server');
  return serverDataBase.loadCatalogue()
    .then( () => {

      return serverDataBase.getUrls({
        convention: 'HRIR',
        dataBase: 'BILI',
        equalisation: 'RAW',
        sampleRate,
        freePattern: '1111',
      });
    })
    .then( (urls) => {
      const promises = testPositions.map( (position, index) => {
        const positionName = testPositionsName[index];

        // use off-line context now
        const audioContext = new window.OfflineAudioContext(
                  2, // stereo output
                  sampleRate, // 1 second
                  sampleRate);

        const hrtfSet = new HrtfSet({
          audioContext,
          filterPositions: testPositions,
          filterPositionsType: positionsType,
          positionsType: 'gl', // mandatory for BinauralPanner
        });

        return hrtfSet.load(urls[0])
          .then( () => {
            return new Promise( (resolve, reject) => {

              const binauralPanner = new BinauralPanner({
                audioContext,
                crossfadeDuration: 0, // immediate for testing
                hrtfSet,
                positionsType,
                sourceCount: testPositions.length,
                sourcePositions: testPositions,
              });

              const diracBuffer = audio.createDiracBuffer( {
                audioContext,
                length: 2, // Safari needs at least 2 samples
              } );

              binauralPanner.connectOutputs(audioContext.destination);
              const dirac = audioContext.createBufferSource();
              dirac.buffer = diracBuffer;
              binauralPanner.connectInputByIndex(index, dirac);
              dirac.start();

              audioContext.oncomplete = (event) => {
                const sourceBuffer = event.renderedBuffer;

                const firBuffer = binauralPanner._hrtfSet.nearestFir(
                  coordinates.typedToGl([], position, positionsType) );

                for (let channel = 0; channel < 2; ++channel) {
                  const firArray = [ ...firBuffer.getChannelData(channel) ];
                  const sourceArray = [ ...sourceBuffer.getChannelData(channel) ];

                  /* eslint-disable no-loop-func */
                  assert.equals(firArray.findIndex( (sample, s) => {
                    return !almostEquals(sample, sourceArray[s], epsilon);
                  }), -1, `${positionName}[${channel}] matches`);

                }
                resolve();
              };

              audioContext.onerror = () => {
                reject();
              };

              audioContext.startRendering();
            });

          });

      });

      return Promise.all(promises);
    }); // after URL loaded
}); // test after HrtfSet
