/**
 * @fileOverview Helpers for k-d tree.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import tree from 'kd.tree';
export { tree };

/**
 * Get the squared distance between to points.
 *
 * (Avoid computing the square-root when unnecessary.)
 *
 * @param {Object} a in cartesian coordinates.
 * @param {Number} a.x
 * @param {Number} a.y
 * @param {Number} a.z
 * @param {Object} b in cartesian coordinates.
 * @param {Number} b.x
 * @param {Number} b.y
 * @param {Number} b.z
 * @returns {Number}
 */
export function distanceSquared(a, b) {
  const x = b.x - a.x;
  const y = b.y - a.y;
  const z = b.z - a.z;
  return x * x + y * y + z * z;
}

/**
 * Get the distance between to points.
 *
 * @param {Object} a in cartesian coordinates.
 * @param {Number} a.x
 * @param {Number} a.y
 * @param {Number} a.z
 * @param {Object} b in cartesian coordinates.
 * @param {Number} b.x
 * @param {Number} b.y
 * @param {Number} b.z
 * @returns {Number}
 */
export function distance(a, b) {
  return Math.sqrt(this.distanceSquared(a, b) );
}

export default {
  distance,
  distanceSquared,
  tree,
};
