'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tree = undefined;
exports.distanceSquared = distanceSquared;
exports.distance = distance;

var _kd = require('kd.tree');

var _kd2 = _interopRequireDefault(_kd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.tree = _kd2.default; /**
                              * @fileOverview Helpers for k-d tree.
                              * @author Jean-Philippe.Lambert@ircam.fr
                              * @copyright 2015-2016 IRCAM, Paris, France
                              * @license BSD-3-Clause
                              */

function distanceSquared(a, b) {
  var x = b.x - a.x;
  var y = b.y - a.y;
  var z = b.z - a.z;
  return x * x + y * y + z * z;
}

function distance(a, b) {
  return Math.sqrt(this.distanceSquared(a, b));
}

exports.default = {
  distance: distance,
  distanceSquared: distanceSquared,
  tree: _kd2.default
};