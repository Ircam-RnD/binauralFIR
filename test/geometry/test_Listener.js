import test from 'tape';

import Listener from '../../src/geometry/Listener';

import glMatrix from 'gl-matrix';

const prefix = 'Listener';

test(`${prefix}: default values`, (assert) => {
  const listener = new Listener();

  assert.equals(listener.coordinateSystem, 'gl',
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
  const coordinateSystem = 'gl';
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
    coordinateSystem,
    position,
    view,
    up,
  });

  assert.equals(listener.coordinateSystem, 'gl',
                `coordinate system matches`);

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

test(`${prefix}: moving listener around centre`, (assert) => {
  const listener = new Listener({
    coordinateSystem: 'gl',
    view: [0, 0, 0], // towards centre
  });

  const absolutePosition = [1, 2, 3];
  let positionName;
  const relativePosition = [];

  positionName = 'listen from right';
  listener.position = [1, 0, 0];
  listener.up = [0, 1, 0];
  let expectedRelativePosition = [-3, 2, 0];

  listener.update();
  glMatrix.vec3.transformMat4(relativePosition, absolutePosition,
                              listener.lookAt);
  assert.deepEquals(relativePosition, expectedRelativePosition, positionName);

  positionName = 'listen from left';
  listener.position = [-1, 0, 0];
  listener.up = [0, 1, 0];
  expectedRelativePosition = [3, 2, -2];

  listener.update();
  glMatrix.vec3.transformMat4(relativePosition, absolutePosition,
                              listener.lookAt);
  assert.deepEquals(relativePosition, expectedRelativePosition, positionName);

  positionName = 'listen from top';
  listener.position = [0, 1, 0];
  listener.up = [0, 0, -1];
  expectedRelativePosition = [1, -3, 1];

  listener.update();
  glMatrix.vec3.transformMat4(relativePosition, absolutePosition,
                              listener.lookAt);
  assert.deepEquals(relativePosition, expectedRelativePosition, positionName);

  positionName = 'listen from bottom';
  listener.position = [0, -1, 0];
  listener.up = [0, 0, 1];
  expectedRelativePosition = [1, 3, -3];

  listener.update();
  glMatrix.vec3.transformMat4(relativePosition, absolutePosition,
                              listener.lookAt);
  assert.deepEquals(relativePosition, expectedRelativePosition, positionName);

  positionName = 'listen from back';
  listener.position = [0, 0, -1];
  listener.up = [0, 1, 0];
  expectedRelativePosition = [-1, 2, -4];

  listener.update();
  glMatrix.vec3.transformMat4(relativePosition, absolutePosition,
                              listener.lookAt);
  assert.deepEquals(relativePosition, expectedRelativePosition, positionName);

  positionName = 'listen from back, upside-down';
  listener.position = [0, 0, -1];
  listener.up = [0, -1, 0];
  expectedRelativePosition = [1, -2, -4];

  listener.update();
  glMatrix.vec3.transformMat4(relativePosition, absolutePosition,
                              listener.lookAt);
  assert.deepEquals(relativePosition, expectedRelativePosition, positionName);

  assert.end();
}); // defaults
