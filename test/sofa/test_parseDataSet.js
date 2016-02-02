/**
 * @fileOverview DDS parser tests.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import test from 'tape';

import {
  _parseDimension,
  _parseDefinition,
  parseDataSet,
} from '../../src/sofa/parseDataSet';

const prefix = 'DDS parser';

// internal tests, because the regular expressions are fragile
test(`${prefix}: internals`, (assert) => {
  assert.deepEqual(_parseDimension('[R = 2]'),
                   [['R', 2]],
                   'simple dimension');

  assert.deepEqual(_parseDimension('[R = 2][C = 3][I = 1]'),
                   [['R', 2], ['C', 3], ['I', 1]],
                   'multiple dimensions');

  assert.deepEqual(
    _parseDefinition(
    'Float64 ReceiverPosition[R = 2][C = 3][I = 1];'),
    [
      ['ReceiverPosition', { type: 'Float64', R: 2, C: 3, I: 1 }],
    ],
    'single definition');

  assert.deepEqual(
    _parseDefinition(
    `    Float64 ReceiverPosition[R = 2][C = 3][I = 1];
         Float64 SourcePosition[M = 1680][C = 3];
         Float64 EmitterPosition[E = 1][C = 3][I = 1];`),
    [
      ['ReceiverPosition', { type: 'Float64', R: 2, C: 3, I: 1 }],
      ['SourcePosition', { type: 'Float64', M: 1680, C: 3 }],
      ['EmitterPosition', { type: 'Float64', E: 1, C: 3, I: 1 },
      ],
    ],
    'multiple definitions');

  assert.end();
});

test(`${prefix}: complete files`, (assert) => {
  assert.deepEqual(
    parseDataSet(
    `Dataset {
        Float64 ListenerPosition[I = 1][C = 3];
        Float64 ListenerUp[I = 1][C = 3];
        Float64 ListenerView[I = 1][C = 3];
        Float64 ReceiverPosition[R = 2][C = 3][I = 1];
        Float64 SourcePosition[M = 1680][C = 3];
        Float64 EmitterPosition[E = 1][C = 3][I = 1];
        Float64 Data.SamplingRate[I = 1];
        Float64 Data.Delay[I = 1][R = 2];
        Float64 Data.IR[M = 1680][R = 2][N = 941];
        Float64 RoomVolume[I = 1];
    } IRC_1100_C_HRIR.sofa;`),
    {
      ListenerPosition: { type: 'Float64', I: 1, C: 3 },
      ListenerUp: { type: 'Float64', I: 1, C: 3 },
      ListenerView: { type: 'Float64', I: 1, C: 3 },
      ReceiverPosition: { type: 'Float64', R: 2, C: 3, I: 1 },
      SourcePosition: { type: 'Float64', M: 1680, C: 3 },
      EmitterPosition: { type: 'Float64', E: 1, C: 3, I: 1 },
      'Data.SamplingRate': { type: 'Float64', I: 1 },
      'Data.Delay': { type: 'Float64', I: 1, R: 2 },
      'Data.IR': { type: 'Float64', M: 1680, R: 2, N: 941 },
      RoomVolume: { type: 'Float64', I: 1 },
    },
    'IRC_1100_C_HRIR.sofa.dds');

  assert.end();
});
