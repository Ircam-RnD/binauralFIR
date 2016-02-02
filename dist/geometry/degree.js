"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRadian = toRadian;
exports.fromRadian = fromRadian;
exports.cos = cos;
exports.sin = sin;
exports.atan2 = atan2;
/**
 * @fileOverview Convert to and from degree
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

var toRadianFactor = exports.toRadianFactor = Math.PI / 180;
var fromRadianFactor = exports.fromRadianFactor = 1 / toRadianFactor;

function toRadian(angle) {
  return angle * toRadianFactor;
}

function fromRadian(angle) {
  return angle * fromRadianFactor;
}

function cos(angle) {
  return Math.cos(angle * toRadianFactor);
}

function sin(angle) {
  return Math.sin(angle * toRadianFactor);
}

function atan2(y, x) {
  return Math.atan2(y, x) * fromRadianFactor;
}

exports.default = {
  atan2: atan2,
  cos: cos,
  fromRadian: fromRadian,
  fromRadianFactor: fromRadianFactor,
  sin: sin,
  toRadian: toRadian,
  toRadianFactor: toRadianFactor
};