"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.almostEquals = almostEquals;
exports.almostEqualsModulo = almostEqualsModulo;
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
function almostEquals(value, reference) {
  var tolerance = arguments.length <= 2 || arguments[2] === undefined ? Number.EPSILON : arguments[2];

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
function almostEqualsModulo(value, reference, modulo) {
  var tolerance = arguments.length <= 3 || arguments[3] === undefined ? Number.EPSILON : arguments[3];

  return Math.abs(value - reference) % modulo <= tolerance;
}

exports.default = {
  almostEquals: almostEquals,
  almostEqualsModulo: almostEqualsModulo
};