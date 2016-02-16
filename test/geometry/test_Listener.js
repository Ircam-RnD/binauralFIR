import test from 'tape';

import Listener from '../../src/geometry/Listener';

import glMatrix from 'gl-matrix';

const prefix = 'Listener';

test(`${prefix}: default values`, (assert) => {
  const listener = new Listener();

  assert.equals(listener.positionsType, 'gl',
                `default coordinates type is 'gl'`);

  assert.deepEquals(listener.position, [0, 0, 0],
                    `default position is in the centre`);

  assert.deepEquals(listener.view, [0, 0, -1],
                    `default view is -z`);

  assert.deepEquals(listener.up, [0, 1, 0],
                    `default up is y`);

  assert.deepEquals(listener.lookAt, glMatrix.mat4.identity([]),
                    `default lookAt is identity`);

  assert.end();
}); // defaults

test(`${prefix}: values from constructor`, (assert) => {
  const positionsType = 'gl';
  const position = [1, 2, 3];
  const view = [1, 2, 2]; // -z (translation only)
  const up = [0, 1, 0]; // y
  const lookAt = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    -1, -2, -3, 1,
  ];

  const listener = new Listener({
    positionsType,
    position,
    view,
    up,
  });

  assert.equals(listener.positionsType, 'gl',
                `default coordinates type is 'gl'`);

  assert.deepEquals(listener.position, position,
                    `position matches`);

  assert.deepEquals(listener.view, view,
                    `view matches`);

  assert.deepEquals(listener.up, up,
                    `up matches`);

  assert.deepEquals(listener.lookAt, lookAt,
                    `lookAt as expected`);

  assert.end();
}); // values from constructor
