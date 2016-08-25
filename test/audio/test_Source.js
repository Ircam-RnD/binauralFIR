import test from 'blue-tape';
import serveSofaHrir from 'serve-sofa-hrir';

import '../../include/AudioContextMonkeyPatch';

import audio from '../../src/audio/utilities';
import Source from '../../src/audio/Source';

import { almostEquals } from '../../src/common/utilities';
const epsilon = 10e-7; // Float32

const prefix = 'Audio source';

const sampleRate = 44100;

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

const serverDataBase = new serveSofaHrir.ServerDataBase();

test(`${prefix}`, (assert) => {
  return serverDataBase.loadCatalogue()
    .then( () => {

      return serverDataBase.getUrls({
        convention: 'HRIR',
        dataBase: 'BILI',
        equalisation: 'COMPENSATED',
        sampleRate,
        freePattern: '1147',
      });
    })
    .then( (urls) => {
      const promises = testPositions.map( (position, index) => {
        const positionName = testPositionsName[index];

        // use off-line context now
        const audioContext
                = new window.OfflineAudioContext(2,
                                                 1 * sampleRate, // 1 second
                                                 sampleRate);

        const hrtfSet = new serveSofaHrir.HrtfSet({
          audioContext,
          filterPositions: [position],
          coordinateSystem,
        });

        return hrtfSet.load(urls[0])
          .then( () => {
            return new Promise( (resolve, reject) => {
              const source = new Source({
                audioContext,
                hrtfSet,
                position,
                crossfadeDuration: 0, // immediate positions
                distAttenuationExponent: 0, // no distance test here
              });

              const diracBuffer = audio.createDiracBuffer( {
                audioContext,
                length: 2, // Safari needs at least 2 samples
              } );
              const dirac = audioContext.createBufferSource();
              dirac.buffer = diracBuffer;

              source.connectInput(dirac);
              source.connectOutput(audioContext.destination);

              dirac.start();

              audioContext.oncomplete = (event) => {
                const sourceBuffer = event.renderedBuffer;
                const firBuffer = hrtfSet.nearestFir(position);

                for (let channel = 0; channel < 2; ++channel) {
                  // conversion to un-typed array for Safari ≤ 9
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
