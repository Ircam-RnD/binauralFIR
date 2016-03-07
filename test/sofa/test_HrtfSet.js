/**
 * @fileOverview HRTF set tests.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import test from 'blue-tape';
import '../../include/AudioContextMonkeyPatch';

import HrtfSet from '../../src/sofa/HrtfSet';

import { almostEquals } from '../../src/common/utilities';
const epsilon = 10e-7; // Float32

const prefix = 'HRTF set';

const sampleRate = 44100;

const audioContext = new window.OfflineAudioContext(
                  2, // stereo output
                  sampleRate, // 1 second
                  sampleRate);

const serverBad = 'http://server.bad';
const serverDefault = 'http://bili2.ircam.fr';
const urlBad = 'url.bad';

test(`${prefix}: Bad set`, (assert) => {
  const hrtfSet = new HrtfSet({
    audioContext,
  });

  const testPromises = [];

  testPromises.push(
    hrtfSet.load(`${serverBad}/good.url`)
      .then( (response) => {
        assert.fail(`Bad server should have failed. Got ${response} instead.`);
      })
      .catch( (error) => {
        assert.pass(`Bad server failed, as expected: ${error.message}.`);
      })
  );

  testPromises.push(
    hrtfSet.load(`${serverDefault}/${urlBad}`)
      .then( (response) => {
        assert.fail(`Bad URL should have failed. Got ${response} instead.`);
      })
      .catch( (error) => {
        assert.pass(`Bad URL failed, as expected: ${error.message}.`);
      })
  );

  return Promise.all(testPromises);
});

test(`${prefix}: Load set`, (assert) => {
  const hrtfSet = new HrtfSet({
    audioContext,
  });

  const listen1049Url = `http://bili2.ircam.fr/SimpleFreeFieldHRIR/LISTEN/`
          + `COMPENSATED/${sampleRate}/IRC_1049_C_HRIR.sofa`;

  const testPromises = [];

  testPromises.push(
    hrtfSet.load(listen1049Url)
      .then( (response) => {
        assert.pass(`Got ${response}.`);
      })
      .catch( (error) => {
        assert.fail(`URL ${listen1049Url} failed: ${error.message}.`);
      })
  );

  return Promise.all(testPromises);
});

test(`${prefix}: Partial load set`, (assert) => {
  // spherical in degrees
  const coordinateSystem = 'sofaSpherical';

  const filterPositions = [
    [30, 0, 2], // front-left
    [0, 0, 2], // centre
    [-30, 0, 2], // front-right
  ];

  const testPositions = [
    [-180, 0, 2],
    [-90, 0, 2],
    [-60, 0, 2],
    [-30, 0, 2],
    [0, 0, 2],
    [40, 0, 2],
    [100, 0, 2],
  ];

  const expectedIndices = [
    701,
    701,
    701,
    701,
    481,
    501,
    501,
  ];

  const hrtfSet = new HrtfSet({
    audioContext,
    filterPositions,
    coordinateSystem,
  });

  const bili1142Url = `http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/`
          + `COMPENSATED/${sampleRate}/IRC_1142_C_HRIR.sofa`;

  const testPromises = [];

  testPromises.push(
    hrtfSet.load(bili1142Url)
      .then( () => {
        assert.equals(filterPositions.findIndex( (position) => {
          const nearest = hrtfSet.nearest(position);
          return nearest.distance > 0.01;
        }), -1, 'got all expected positions');

        assert.equals(testPositions.findIndex( (position, index) => {
          const nearest = hrtfSet.nearest(position);
          return nearest.index !== expectedIndices[index];
        }), -1, 'got all expected indices');

      })
      .catch( (error) => {
        assert.fail(`URL ${bili1142Url} failed: ${error.message}.`);
      })
  );

  return Promise.all(testPromises);
});

test(`${prefix}: Instantiate and set filter afterwards`, (assert) => {
  // spherical in degrees
  const coordinateSystem = 'sofaSpherical';

  const filterPositions = [
    [30, 0, 2], // front-left
    [0, 0, 2], // centre
    [-30, 0, 2], // front-right
  ];

  const testPositions = [
    [-180, 0, 2],
    [-90, 0, 2],
    [-60, 0, 2],
    [-30, 0, 2],
    [0, 0, 2],
    [40, 0, 2],
    [100, 0, 2],
  ];

  const expectedIndices = [
    701,
    701,
    701,
    701,
    481,
    501,
    501,
  ];

  const hrtfSet = new HrtfSet({
    audioContext,
  });

  // when not defined in constructor, must explicitly set all types
  hrtfSet.coordinateSystem = coordinateSystem;
  hrtfSet.filterCoordinateSystem = coordinateSystem;

  hrtfSet.filterPositions = filterPositions;

  const url = `http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/`
          + `COMPENSATED/${sampleRate}/IRC_1142_C_HRIR.sofa`;

  const testPromises = [];

  testPromises.push(
    hrtfSet.load(url)
      .then( () => {
        assert.equals(filterPositions.findIndex( (position) => {
          const nearest = hrtfSet.nearest(position);
          return nearest.distance > 0.01;
        }), -1, 'got all expected positions');

        assert.equals(testPositions.findIndex( (position, index) => {
          const nearest = hrtfSet.nearest(position);
          return nearest.index !== expectedIndices[index];
        }), -1, 'got all expected indices');

      })
      .catch( (error) => {
        assert.fail(`URL ${url} failed: ${error.message}.`);
      })
  );

  return Promise.all(testPromises);
});

test(`${prefix}: Load full set and post-filter`, (assert) => {
  // spherical in degrees
  const coordinateSystem = 'sofaSpherical';

  const filterPositions = [
    [30, 0, 2], // front-left
    [0, 0, 2], // centre
    [-30, 0, 2], // front-right
  ];

  const testPositions = [
    [-180, 0, 2],
    [-90, 0, 2],
    [-60, 0, 2],
    [-30, 0, 2],
    [0, 0, 2],
    [40, 0, 2],
    [100, 0, 2],
  ];

  const expectedIndices = [
    337,
    337,
    337,
    337,
    271,
    277,
    277,
  ];

  const hrtfSet = new HrtfSet({
    audioContext,
    filterPositions,
    filterAfterLoad: true,
    coordinateSystem,
  });

  const crossmod1071Url = `http://bili2.ircam.fr/SimpleFreeFieldHRIR/CROSSMOD/`
    + `COMPENSATED/${audioContext.sampleRate}/IRC_1071_C_HRIR.sofa`;

  const testPromises = [];

  testPromises.push(
    hrtfSet.load(crossmod1071Url)
      .then( () => {
        assert.equals(filterPositions.findIndex( (position, index) => {
          const nearest = hrtfSet.nearest(filterPositions[index]);
          return nearest.distance > 0.01;
        }), -1, 'got all expected positions form SOFA');

        assert.equals(testPositions.findIndex( (position, index) => {
          const nearest = hrtfSet.nearest(position);
          return nearest.index !== expectedIndices[index];
        }), -1, 'got all expected indices from SOFA');

      })
      .catch( (error) => {
        assert.fail(`URL ${crossmod1071Url} failed: ${error.message}.`);
      })
  );

  testPromises.push(
    hrtfSet.load(`${crossmod1071Url}.json`)
      .then( () => {
        assert.equals(filterPositions.findIndex( (position, index) => {
          const nearest = hrtfSet.nearest(filterPositions[index]);
          return nearest.distance > 0.01;
        }), -1, 'got all expected positions from JSON');

        assert.equals(testPositions.findIndex( (position, index) => {
          const nearest = hrtfSet.nearest(position);
          return nearest.index !== expectedIndices[index];
        }), -1, 'got all expected indices from JSON');

      })
      .catch( (error) => {
        assert.fail(`URL ${crossmod1071Url}.json failed: ${error.message}.`);
      })
  );

  return Promise.all(testPromises);
});

test(`${prefix}: Partial load, export, and re-load`, (assert) => {
  // spherical in degrees
  const coordinateSystem = 'sofaSpherical';
  const url = `http://bili2.ircam.fr/hyrax/SimpleFreeFieldHRIR/BILI/COMPENSATED/`
          + `${sampleRate}/IRC_1115_C_HRIR.sofa`;

  const filterPositions = [];
  for (let azimuth = 0; azimuth < 360; azimuth += 10) {
    for (let elevation = -45; elevation <= 45; elevation += 10) {
      filterPositions.push([azimuth, elevation, 2.06]);
    }
  }

  const hrtfSet = new HrtfSet({
    audioContext,
    coordinateSystem,
    filterPositions,
  });

  const testPromises = [];

  testPromises.push(
    hrtfSet.load(url)
      .then( () => {

        const exportedBlob = new window.Blob([hrtfSet.export()],
                                             { type: 'application/json' });
        const exportedUrl = window.URL.createObjectURL(exportedBlob);

        // const $link = document.createElement('a');
        // $link.href = exportedUrl;
        // $link.download = hrtfSet.sofaName + '.json';
        // $link.style.display = 'none';
        // document.body.appendChild($link);
        // $link.click();

        const hrtfSet2 = new HrtfSet({
          audioContext,
          coordinateSystem,
          filterPositions,
        });

        return hrtfSet2.load(exportedUrl)
          .then( () => {
            assert.equals(filterPositions.findIndex( (position, index) => {
              const nearest = hrtfSet2.nearest(filterPositions[index]);
              return nearest.distance > 0.02;
            }), -1, 'got all expected positions form export');

            assert.equals(filterPositions.findIndex( (position) => {
              const fir = hrtfSet.nearestFir(position);
              const fir2 = hrtfSet2.nearestFir(position);

              const channelsNb = fir.numberOfChannels;
              let equals = true;
              for (let channel = 0; channel < channelsNb; ++channel) {
                // conversion to un-typed array for Safari ≤ 9
                const firArray = [ ... fir.getChannelData(channel) ];
                const fir2Array = [ ... fir2.getChannelData(channel) ];
                /* eslint-disable no-loop-func */
                equals = equals
                  && firArray.findIndex( (sample, s) => {
                    return !almostEquals(sample, fir2Array[s], epsilon);
                  }) === -1;
              }
              return !equals;
            }), -1, 'filters match');

          }); // re-load
      }) // load reference
  );

  return Promise.all(testPromises);
});

test(`${prefix}: Full load, export, and re-load`, (assert) => {
  // spherical in degrees
  const coordinateSystem = 'sofaSpherical';
  const url = `http://bili2.ircam.fr/hyrax/SimpleFreeFieldHRIR/LISTEN/`
          + `COMPENSATED/${sampleRate}/IRC_1033_C_HRIR.sofa`;

  const testPositions = [];
  for (let azimuth = 0; azimuth < 360; azimuth += 10) {
    for (let elevation = -45; elevation <= 45; elevation += 10) {
      testPositions.push([azimuth, elevation, 2.06]);
    }
  }

  const hrtfSet = new HrtfSet({
    audioContext,
    coordinateSystem,
  });

  const testPromises = [];

  testPromises.push(
    hrtfSet.load(url)
      .then( () => {

        const exportedBlob = new window.Blob([hrtfSet.export()],
                                             { type: 'application/json' });
        const exportedUrl = window.URL.createObjectURL(exportedBlob);

        const hrtfSet2 = new HrtfSet({
          audioContext,
          coordinateSystem,
          testPositions,
        });

        return hrtfSet2.load(exportedUrl)
          .then( () => {
            assert.equals(testPositions.findIndex( (position, index) => {
              const nearest = hrtfSet2.nearest(testPositions[index]);
              return nearest.distance > 0.1; // few positions in LISTEN data-base
            }), -1, 'got all expected positions form export');

            assert.equals(testPositions.findIndex( (position) => {
              const fir = hrtfSet.nearestFir(position);
              const fir2 = hrtfSet2.nearestFir(position);

              const channelsNb = fir.numberOfChannels;
              let equals = true;
              for (let channel = 0; channel < channelsNb; ++channel) {
                // conversion to un-typed array for Safari ≤ 9
                const firArray = [ ... fir.getChannelData(channel) ];
                const fir2Array = [ ... fir2.getChannelData(channel) ];
                /* eslint-disable no-loop-func */
                equals = equals
                  && firArray.findIndex( (sample, s) => {
                    return !almostEquals(sample, fir2Array[s], epsilon);
                  }) === -1;
              }
              return !equals;
            }), -1, 'filters match');

          }); // re-load
      }) // load reference
  );

  return Promise.all(testPromises);
});
