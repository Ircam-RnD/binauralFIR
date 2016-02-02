/**
 * @fileOverview Helpers for k-d tree.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import tree from 'kd.tree';
export { tree };

export function distanceSquared(a, b) {
  const x = b.x - a.x;
  const y = b.y - a.y;
  const z = b.z - a.z;
  return x * x + y * y + z * z;
}

export function distance(a, b) {
  return Math.sqrt(this.distanceSquared(a, b) );
}

export default {
  distance,
  distanceSquared,
  tree,
};
