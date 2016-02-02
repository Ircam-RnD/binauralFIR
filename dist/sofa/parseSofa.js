'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSofa = parseSofa;
exports.conformSofaType = conformSofaType;
/**
 * @fileOverview Parser functions for SOFA files
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

/**
 * Parses a SOFA JSON string with into an object with `data` and `metaData`
 * attributes.
 *
 * @param {String} sofaString
 * @returns {Object} with `data` and `metaData` attributes
 * @throws {Error} when the parsing fails
 */
function parseSofa(sofaString) {
  try {
    var _ret = function () {
      var sofa = JSON.parse(sofaString);
      var hrtf = {};

      hrtf.name = sofa.name;

      if (typeof sofa.attributes !== 'undefined') {
        hrtf.metaData = {};
        var metaData = sofa.attributes.find(function (e) {
          return e.name === 'NC_GLOBAL';
        });
        if (typeof metaData !== 'undefined') {
          metaData.attributes.forEach(function (e) {
            hrtf.metaData[e.name] = e.value[0];
          });
        }
      }

      if (typeof sofa.leaves !== 'undefined') {
        var data = sofa.leaves;
        data.forEach(function (d) {
          hrtf[d.name] = {};
          d.attributes.forEach(function (a) {
            hrtf[d.name][a.name] = a.value[0];
          });
          hrtf[d.name].shape = d.shape;
          hrtf[d.name].data = d.data;
        });
      }

      return {
        v: hrtf
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } catch (error) {
    throw new Error('Unable to parse SOFA string. ' + error.message);
  }
}

/**
 * Prefix SOFA coordinates type with `sofa`.
 *
 * @param {String} sofaType : either `cartesian` or `spherical`
 * @returns {String} either `sofaCartesian` or `sofaSpherical`
 * @throws {Error} if sofaType is unknown
 */
function conformSofaType(sofaType) {
  var type = undefined;

  switch (sofaType) {
    case 'cartesian':
      type = 'sofaCartesian';
      break;

    case 'spherical':
      type = 'sofaSpherical';
      break;

    default:
      throw new Error('Bad SOFA type ' + sofaType);
  }
  return type;
}

exports.default = {
  parseSofa: parseSofa,
  conformSofaType: conformSofaType
};