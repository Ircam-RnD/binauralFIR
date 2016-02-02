/**
 * @fileOverview Common utilities
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

export function almostEquals(value, reference, tolerance = Number.EPSILON) {
  return Math.abs(value - reference) <= tolerance;
}

export function almostEqualsModulo(value, reference, modulo,
                                   tolerance = Number.EPSILON) {
  return Math.abs(value - reference) % modulo <= tolerance;
}

export default {
  almostEquals,
  almostEqualsModulo,
};
