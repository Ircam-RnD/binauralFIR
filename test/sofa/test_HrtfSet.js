/**
 * @fileOverview HRTF set tests.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import test from 'blue-tape';
import '../../include/AudioContextMonkeyPatch';

import HrtfSet from '../../src/sofa/HrtfSet';

const prefix = 'HRTF set';

const audioContext = new window.AudioContext();

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

  const listen1049Url = 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/LISTEN/'
          + 'COMPENSATED/44100/IRC_1049_C_HRIR.sofa';

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
  const positionsType = 'sofaSpherical';

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
    positionsType,
  });

  const bili1142Url = 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/'
          + 'COMPENSATED/44100/IRC_1142_C_HRIR.sofa';

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
  const positionsType = 'sofaSpherical';

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
  hrtfSet.positionsType = positionsType;
  hrtfSet.filterPositionsType = positionsType;

  hrtfSet.filterPositions = filterPositions;

  const url = 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/'
          + 'COMPENSATED/44100/IRC_1142_C_HRIR.sofa';

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
  const positionsType = 'sofaSpherical';

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
    positionsType,
  });

  const crossmod1071Url = `http://bili2.ircam.fr/SimpleFreeFieldHRIR/CROSSMOD/COMPENSATED/`
          + `${audioContext.sampleRate}/IRC_1071_C_HRIR.sofa`;

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
