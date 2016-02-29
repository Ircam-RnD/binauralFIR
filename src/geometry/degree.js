/**
 * @fileOverview Convert to and from degree
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

/**
 * Degree to radian multiplication factor.
 *
 * @type {Number}
 */
export const toRadianFactor = Math.PI / 180;

/**
 * Radian to degree multiplication factor.
 *
 * @type {Number}
 */
export const fromRadianFactor = 1 / toRadianFactor;

/**
 * Convert an angle in degrees to radians.
 *
 * @param {Number} angle in degrees
 * @returns {Number} angle in radians
 */
export function toRadian(angle) {
  return angle * toRadianFactor;
}

/**
 * Convert an angle in radians to degrees.
 *
 * @param {Number} angle in radians
 * @returns {Number} angle in degrees
 */
export function fromRadian(angle) {
  return angle * fromRadianFactor;
}

/**
 * Get the cosinus of an angle in degrees.
 *
 * @param {Number} angle
 * @returns {Number}
 */
export function cos(angle) {
  return Math.cos(angle * toRadianFactor);
}

/**
 * Get the sinus of an angle in degrees.
 *
 * @param {Number} angle
 * @returns {Number}
 */
export function sin(angle) {
  return Math.sin(angle * toRadianFactor );
}

/**
 * Get the arc-tangent (2 arguments) of 2 angles in degrees.
 *
 * @param {Number} y
 * @param {Number} x
 * @returns {Number}
 */
export function atan2(y, x) {
  return Math.atan2(y, x) * fromRadianFactor;
}

export default {
  atan2,
  cos,
  fromRadian,
  fromRadianFactor,
  sin,
  toRadian,
  toRadianFactor,
};
