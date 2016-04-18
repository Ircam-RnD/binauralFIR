/**
 * @fileOverview SOFA server tests for known issues
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import test from 'blue-tape';

import {
  almostEquals,
  almostEqualsModulo,
} from '../../src/common/utilities';
const epsilon = 1e-6;

import ServerDataBase from '../../src/sofa/ServerDataBase';

const prefix = 'ServerDataBase issues';

// helpers

/**
 * Find one value matching the reference in an array.
 *
 * @param {Array} values
 * @param {Array} reference
 * @param {Number} tolerance to consider a matching value
 * @returns {Number} index of matched reference
 */
function findOne(values, reference, tolerance = epsilon) {
  return values.findIndex( (currentArray) => {
    return currentArray.every( (currentValue, index) => {
      return almostEquals(currentValue, reference[index], tolerance);
    });
  });
}

/**
 * Find one value matching the reference in an array, with modulo
 *
 * @param {Array} values
 * @param {Array} reference
 * @param {Number} modulo used for comparison
 * @param {Number} tolerance to consider a matching value
 * @returns {Number} index of matched reference
 */
function findOneModulo(values, reference, modulo, tolerance = epsilon) {
  return values.findIndex( (currentArray) => {
    return currentArray.every( (currentValue, index) => {
      return almostEqualsModulo(currentValue, reference[index],
                                modulo, tolerance);
    });
  });
}

test(`${prefix}: Source positions`, (assert) => {
  const dataBase = new ServerDataBase();

  const listen1012Url = 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/'
          + 'LISTEN/COMPENSATED/44100/IRC_1012_C_HRIR.sofa';

  // aggregate all promises
  const testPromises = [];

  testPromises.push(
    dataBase.getSourcePositions(listen1012Url)
      .then( (sourcePositions) => {
        assert.equals(187, sourcePositions.length,
                      `Got ${sourcePositions.length} source positions `
                      + `from ${listen1012Url}`);

        const listen1012Positions = [
          [0, -45, 2.06],
          [105, 30, 2.06],
          [135, 45, 2.06],
          [300, 60, 2.06],
          [330, 60, 2.06],
          [180, 75, 2.06],
          [0, 90, 2.06],
        ];

        assert.equals(listen1012Positions.findIndex( (current) => {
          return findOne(sourcePositions, current) === -1;
        }), -1, 'Found expected positions');

        // same positions, that may not conform to SOFA standard
        assert.equals(listen1012Positions.findIndex( (current) => {
          return findOneModulo(sourcePositions, current, 360) === -1;
        }), -1, 'Found expected positions, modulo 360');

      })
      .catch( (error) => {
        assert.fail(`Unable to load positions from ${listen1012Url}: `
                    + `${error.message}`);
      })
  );

  return Promise.all(testPromises);
});
