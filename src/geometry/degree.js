/**
 * @fileOverview Convert to and from degree
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

export const toRadianFactor = Math.PI / 180;
export const fromRadianFactor = 1 / toRadianFactor;

export function toRadian(angle) {
  return angle * toRadianFactor;
}

export function fromRadian(angle) {
  return angle * fromRadianFactor;
}

export function cos(angle) {
  return Math.cos(angle * toRadianFactor);
}

export function sin(angle) {
  return Math.sin(angle * toRadianFactor );
}

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
