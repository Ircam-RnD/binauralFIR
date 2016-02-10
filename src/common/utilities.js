/**
 * @fileOverview Common utilities
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

/**
 * Test whether a value is around a reference, given a tolerance.
 *
 * @param {Number} value
 * @param {Number} reference
 * @param {Number} [tolerance=Number.EPSILON]
 * @returns {Number} Math.abs(value - reference) <= tolerance;
 */
export function almostEquals(value, reference, tolerance = Number.EPSILON) {
  return Math.abs(value - reference) <= tolerance;
}

/**
 * Test whether a value is around a reference, given a tolerance and a
 * modulo.
 *
 * @param {Number} value
 * @param {Number} reference
 * @param {Number} modulo
 * @param {Number} [tolerance=Number.EPSILON]
 * @returns {Number} Math.abs(value - reference) % modulo <= tolerance;
 */
export function almostEqualsModulo(value, reference, modulo,
                                   tolerance = Number.EPSILON) {
  return Math.abs(value - reference) % modulo <= tolerance;
}

export default {
  almostEquals,
  almostEqualsModulo,
};
