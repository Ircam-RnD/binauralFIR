'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.parseSofa = parseSofa;
exports.stringifySofa = stringifySofa;
exports.conformSofaCoordinateSystem = conformSofaCoordinateSystem;
/**
 * @fileOverview Parser functions for SOFA files
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

/**
 * Parses a SOFA JSON string with into an object with `name`, `data` and
 * `metaData` attributes.
 *
 * @see {@link stringifySofa}
 *
 * @param {String} sofaString in SOFA JSON format
 * @returns {Object} with `data` and `metaData` attributes
 * @throws {Error} when the parsing fails
 */
function parseSofa(sofaString) {
  try {
    var _ret = function () {
      var sofa = JSON.parse(sofaString);
      var sofaSet = {};

      sofaSet.name = sofa.name;

      if (typeof sofa.attributes !== 'undefined') {
        sofaSet.metaData = {};
        var metaData = sofa.attributes.find(function (e) {
          return e.name === 'NC_GLOBAL';
        });
        if (typeof metaData !== 'undefined') {
          metaData.attributes.forEach(function (e) {
            sofaSet.metaData[e.name] = e.value[0];
          });
        }
      }

      if (typeof sofa.leaves !== 'undefined') {
        var data = sofa.leaves;
        data.forEach(function (d) {
          sofaSet[d.name] = {};
          d.attributes.forEach(function (a) {
            sofaSet[d.name][a.name] = a.value[0];
          });
          sofaSet[d.name].shape = d.shape;
          sofaSet[d.name].data = d.data;
        });
      }

      return {
        v: sofaSet
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } catch (error) {
    throw new Error('Unable to parse SOFA string. ' + error.message);
  }
}

/**
 * Generates a SOFA JSON string from an object.
 *
 * Note that the properties differ from either an {@link HrtfSet} and from
 * the result of the parsing of a SOFA JSON. In particular, the listener
 * attributes correspond to the reference for the filters; the source
 * positions are the positions in the data-base.
 *
 * @see {@link parseSofa}
 * @see {@link HrtfSet}
 *
 * @param {Object} sofaSet
 * @param {Coordinates} sofaSet.ListenerPosition
 * @param {CoordinateSystem} sofaSet.ListenerPositionType
 * @param {Coordinates} sofaSet.ListenerUp
 * @param {CoordinateSystem} sofaSet.ListenerUpType
 * @param {Coordinates} sofaSet.ListenerView
 * @param {CoordinateSystem} sofaSet.ListenerViewType
 * @param {Array.<Array.<Number>>} sofaSet.SourcePosition
 * @param {CoordinateSystem} sofaSet.SourcePositionType
 * @param {Number} sofaSet.DataSamplingRate
 * @param {Array.<Array.<Array.<Number>>>} sofaSet.DataIR
 * @param {Array.<Number>} sofaSet.RoomVolume
 * @returns {String} in SOFA JSON format
 * @throws {Error} when the export fails, because of missing data or
 * unknown coordinate system
 */
function stringifySofa(sofaSet) {
  var sofa = {};

  if (typeof sofaSet.name !== 'undefined') {
    sofa.name = sofaSet.name;
  }

  if (typeof sofaSet.metaData !== 'undefined') {
    sofa.attributes = [];
    var ncGlobal = {
      name: 'NC_GLOBAL',
      attributes: []
    };

    for (var attribute in sofaSet.metaData) {
      if (sofaSet.metaData.hasOwnProperty(attribute)) {
        ncGlobal.attributes.push({
          name: attribute,
          value: [sofaSet.metaData[attribute]]
        });
      }
    }

    sofa.attributes.push(ncGlobal);
  }

  // always the same;
  var type = 'Float64';

  var attributes = undefined;

  sofa.leaves = [];

  [['ListenerPosition', 'ListenerPositionType'], ['ListenerUp', 'ListenerUpType'], ['ListenerView', 'ListenerViewType']].forEach(function (listenerAttributeAndType) {
    var listenerAttributeName = listenerAttributeAndType[0];
    var listenerAttribute = sofaSet[listenerAttributeName];
    var listenerType = sofaSet[listenerAttributeAndType[1]];
    if (typeof listenerAttribute !== 'undefined') {
      switch (listenerType) {
        case 'cartesian':
          attributes = [{ name: 'Type', value: ['cartesian'] }, { name: 'Units', value: ['metre, metre, metre'] }];
          break;

        case 'spherical':
          attributes = [{ name: 'Type', value: ['spherical'] }, { name: 'Units', value: ['degree, degree, metre'] }];
          break;

        default:
          throw new Error('Unknown coordinate system type ' + (listenerType + ' for ' + listenerAttribute));
      }
      // in SOFA, everything is contained by an array, even an array.
      sofa.leaves.push({
        name: listenerAttributeName,
        type: type,
        attributes: attributes,
        shape: [1, 3],
        data: [listenerAttribute]
      });
    }
  });

  if (typeof sofaSet.SourcePosition !== 'undefined') {
    switch (sofaSet.SourcePositionType) {
      case 'cartesian':
        attributes = [{ name: 'Type', value: ['cartesian'] }, { name: 'Units', value: ['metre, metre, metre'] }];
        break;

      case 'spherical':
        attributes = [{ name: 'Type', value: ['spherical'] }, { name: 'Units', value: ['degree, degree, metre'] }];
        break;

      default:
        throw new Error('Unknown coordinate system type ' + ('' + sofaSet.SourcePositionType));
    }
    sofa.leaves.push({
      name: 'SourcePosition',
      type: type,
      attributes: attributes,
      shape: [sofaSet.SourcePosition.length, sofaSet.SourcePosition[0].length],
      data: sofaSet.SourcePosition
    });
  }

  if (typeof sofaSet.DataSamplingRate !== 'undefined') {
    sofa.leaves.push({
      name: 'Data.SamplingRate',
      type: type,
      attributes: [{ name: 'Unit', value: 'hertz' }],
      shape: [1],
      data: [sofaSet.DataSamplingRate]
    });
  } else {
    throw new Error('No data sampling-rate');
  }

  if (typeof sofaSet.DataDelay !== 'undefined') {
    sofa.leaves.push({
      name: 'Data.Delay',
      type: type,
      attributes: [],
      shape: [1, sofaSet.DataDelay.length],
      data: [sofaSet.DataDelay]
    });
  }

  if (typeof sofaSet.DataIR !== 'undefined') {
    sofa.leaves.push({
      name: 'Data.IR',
      type: type,
      attributes: [],
      shape: [sofaSet.DataIR.length, sofaSet.DataIR[0].length, sofaSet.DataIR[0][0].length],
      data: sofaSet.DataIR
    });
  } else {
    throw new Error('No data IR');
  }

  if (typeof sofaSet.RoomVolume !== 'undefined') {
    sofa.leaves.push({
      name: 'RoomVolume',
      type: type,
      attributes: [{ name: 'Units', value: ['cubic metre'] }],
      shape: [1],
      data: [sofaSet.RoomVolume]
    });
  }

  sofa.nodes = [];

  return JSON.stringify(sofa);
}

/**
 * Prefix SOFA coordinate system with `sofa`.
 *
 * @param {String} system : either `cartesian` or `spherical`
 * @returns {String} either `sofaCartesian` or `sofaSpherical`
 * @throws {Error} if system is unknown
 */
function conformSofaCoordinateSystem(system) {
  var type = undefined;

  switch (system) {
    case 'cartesian':
      type = 'sofaCartesian';
      break;

    case 'spherical':
      type = 'sofaSpherical';
      break;

    default:
      throw new Error('Bad SOFA type ' + system);
  }
  return type;
}

exports.default = {
  parseSofa: parseSofa,
  conformSofaCoordinateSystem: conformSofaCoordinateSystem
};