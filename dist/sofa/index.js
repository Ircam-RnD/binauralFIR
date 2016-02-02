'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HrtfSet = require('./HrtfSet');

var _HrtfSet2 = _interopRequireDefault(_HrtfSet);

var _ServerDataBase = require('./ServerDataBase');

var _ServerDataBase2 = _interopRequireDefault(_ServerDataBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileOverview Utility classes to handle the loading of HRTF files form a
 * SOFA server.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

exports.default = {
  HrtfSet: _HrtfSet2.default,
  ServerDataBase: _ServerDataBase2.default
};