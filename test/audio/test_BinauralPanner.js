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

const serverDataBase = new ServerDataBase();
const serverDataBaseLoaded = serverDataBase.loadCatalogue();
serverDataBaseLoaded.catch( (error) => {
  throw new Error(`Error while loading catalogue. ${error.message}`);
});

test(`${prefix} with an external HRTF set`, (assert) => {
  return serverDataBaseLoaded
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
          filterCoordinateSystem: coordinateSystem,
          coordinateSystem: 'gl', // mandatory for BinauralPanner
        });

        return hrtfSet.load(urls[0])
          .then( () => {
            return new Promise( (resolve, reject) => {

              const binauralPanner = new BinauralPanner({
                audioContext,
                crossfadeDuration: 0, // immediate for testing
                hrtfSet,
                coordinateSystem,
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
                  coordinates.systemToGl([], position, coordinateSystem) );

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

test(`${prefix} with an internal HRTF set`, (assert) => {
  return serverDataBaseLoaded
    .then( () => {

      return serverDataBase.getUrls({
        convention: 'HRIR',
        dataBase: 'BILI',
        equalisation: 'COMPENSATED',
        sampleRate,
        freePattern: '1112',
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

        const binauralPanner = new BinauralPanner({
          audioContext,
          crossfadeDuration: 0, // immediate for testing
          filterPositions: testPositions,
          filterCoordinateSystem: coordinateSystem,
          coordinateSystem,
          sourceCount: testPositions.length,
          sourcePositions: testPositions,
        });

        return binauralPanner.loadHrtfSet(urls[0])
          .then( () => {
            return new Promise( (resolve, reject) => {

              const diracBuffer = audio.createDiracBuffer( {
                audioContext,
                length: 2, // Safari needs at least 2 samples
              } );

              binauralPanner.connectOutputs(audioContext.destination);
              const dirac = audioContext.createBufferSource();
              dirac.buffer = diracBuffer;
              binauralPanner.connectInputByIndex(index, dirac);
              dirac.start(0);

              audioContext.oncomplete = (event) => {
                const sourceBuffer = event.renderedBuffer;

                const firBuffer = binauralPanner._hrtfSet.nearestFir(
                  coordinates.systemToGl([], position, coordinateSystem) );

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

              audioContext.startRendering(0);
            });

          });

      });

      return Promise.all(promises);
    }); // after URL loaded
}); // test after HrtfSet
