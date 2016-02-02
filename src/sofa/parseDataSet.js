/**
 * @fileOverview Parser for DDS files
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

// '[R = 2]'
const _dimensionPattern = '\\[\\s*(\\w+)\\s*=\\s*(\\d+)\\s*\\]';
const _dimensionMatch = new RegExp(_dimensionPattern, 'g');
const _dimensionSplit = new RegExp(_dimensionPattern);

// 'Float64 ReceiverPosition[R = 2][C = 3][I = 1];'
//
// do not re-use dimension pattern (for grouping)
const _definitionPattern = '\\s*(\\w+)\\s*([\\w.]+)\\s*'
  + '((?:\\[[^\\]]+\\]\\s*)+)'
  + ';\\s*';
const _definitionMatch = new RegExp(_definitionPattern, 'g');
const _definitionSplit = new RegExp(_definitionPattern);

// `Dataset {
//   Float64 ListenerPosition[I = 1][C = 3];
//   Float64 ListenerUp[I = 1][C = 3];
//   Float64 ListenerView[I = 1][C = 3];
//   Float64 ReceiverPosition[R = 2][C = 3][I = 1];
//   Float64 SourcePosition[M = 1680][C = 3];
//   Float64 EmitterPosition[E = 1][C = 3][I = 1];
//   Float64 Data.SamplingRate[I = 1];
//   Float64 Data.Delay[I = 1][R = 2];
//   Float64 Data.IR[M = 1680][R = 2][N = 941];
//   Float64 RoomVolume[I = 1];
// } IRC_1100_C_HRIR.sofa;`
//
// do not re-use definition pattern (for grouping)
const _dataSetPattern = '\\s*Dataset\\s*\\{\\s*'
  + '((?:[^;]+;\\s*)*)'
  + '\\s*\\}\\s*[\\w.]+\\s*;\\s*';
const _dataSetSplit = new RegExp(_dataSetPattern);

/**
 * Parses dimension strings into an array of [key, value] pairs.
 *
 * @private
 * @param {String} input is single or multiple dimension
 * @returns {Array.<Array.<String>>} object [key, value] pairs
 *
 * @example
 * _parseDimension('[R = 2]');
 * // [ [ 'R', 2 ] ]
 *
 * _parseDimension('[R = 2][C = 3][I = 1]');
 * // [ [ 'R', 2 ], [ 'C', 3 ], [ 'I', 1 ] ]
 */
export function _parseDimension(input) {
  const parse = [];
  const inputs = input.match(_dimensionMatch);
  if (inputs !== null) {
    inputs.forEach( (inputSingle) => {
      const parts = _dimensionSplit.exec(inputSingle);
      if (parts !== null && parts.length > 2) {
        parse.push([parts[1], Number(parts[2]) ]);
      }
    });
  }
  return parse;
}

/**
 * Parse definition strings into an array of [key, {values}] pairs.
 *
 * @param {String} input is single or multiple definition
 * @returns {Array.<Array<String,Object>>} [key, {values}] pairs
 *
 * @private
 * @example
 * _parseDefinition('Float64 ReceiverPosition[R = 2][C = 3][I = 1];');
 * // [ [ 'ReceiverPosition',
 * //     { type: 'Float64', R: 2, C: 3, I: 1 } ] ]
 *
 * _parseDefinition(
 * `    Float64 ReceiverPosition[R = 2][C = 3][I = 1];
 *      Float64 SourcePosition[M = 1680][C = 3];
 *      Float64 EmitterPosition[E = 1][C = 3][I = 1];`);
 * // [ [ 'ReceiverPosition',
 * //      { type: 'Float64', R: 2, C: 3, I: 1 } ],
 * //   [ 'SourcePosition', { type: 'Float64', M: 1680, C: 3 } ],
 * //   [ 'EmitterPosition',
 * //     { type: 'Float64', E: 1, C: 3, I: 1 } ] ]
 */
export function _parseDefinition(input) {
  const parse = [];
  const inputs = input.match(_definitionMatch);
  if (inputs !== null) {
    inputs.forEach( (inputSingle) => {
      const parts = _definitionSplit.exec(inputSingle);
      if (parts !== null && parts.length > 3) {
        const current = [];
        current[0] = parts[2];
        current[1] = {};
        current[1].type = parts[1];
        _parseDimension(parts[3]).forEach( (dimension) => {
          current[1][dimension[0] ] = dimension[1];
        });
        parse.push(current);
      }
    });
  }
  return parse;
}

/**
 * Parse data set meta data into an object of `{definition: {key: values}}` objects.
 *
 * @param {String} input data set DDS-like.
 * @returns {Object} definitions as `{definition: {key: values}}` objects.
 *
 * @example
 * _parseDataSet(
 * `Dataset {
 *      Float64 ReceiverPosition[R = 2][C = 3][I = 1];
 *      Float64 SourcePosition[M = 1680][C = 3];
 *      Float64 EmitterPosition[E = 1][C = 3][I = 1];
 *      Float64 Data.SamplingRate[I = 1];
 * } IRC_1100_C_HRIR.sofa;`);
 * //  { ReceiverPosition: { type: 'Float64', R: 2, C: 3, I: 1 },
 * //    SourcePosition: { type: 'Float64', M: 1680, C: 3 },
 * //    EmitterPosition: { type: 'Float64', E: 1, C: 3, I: 1 }
 * //    'Data.SamplingRate': { type: 'Float64', I: 1 } }
 */
export function parseDataSet(input) {
  const parse = {};
  const definitions = _dataSetSplit.exec(input);
  if (definitions !== null && definitions.length > 1) {
    _parseDefinition(definitions[1]).forEach( (definition) => {
      parse[definition[0] ] = definition[1];
    });
  }
  return parse;
}

export default parseDataSet;
