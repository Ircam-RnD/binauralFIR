/**
 * @fileOverview Listener.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2016 IRCAM, Paris, France
 * @license CECILL-2.1
 */

import glMatrix from 'gl-matrix';

import { glToTyped, typedToGl } from '../geometry/coordinates';

/**
 * Camera-like listener. It generates a look-at matrix from a position, a
 * view point, and an up direction.
 *
 */
export class Listener {

  /**
   * Constructs a listener.
   *
   * @param {coordinatesType} [options.positionsType='gl']
   * {@link Listener#positionsType}
   * @param {coordinates} [options.position=[0,0,0]]
   * {@link Listener#position}
   * @param {coordinates} [options.up=[0,1,0]]
   * {@link Listener#up}
   * @param {coordinates} [options.view=[0,0,-1]]
   * {@link Listener#view}
   */
  constructor(options = {}) {
    this._outdated = true;
    this._lookAt = [];

    this.positionsType = options.positionsType;

    this._position = [];
    this.position = (typeof options.position !== 'undefined'
                     ? options.position
                     : glToTyped([], [0, 0, 0], this.positionsType) );

    this._up = [];
    this.up = (typeof options.up !== 'undefined'
               ? options.up
               : glToTyped([], [0, 1, 0], this.positionsType) );

    this._view = [];
    this.view = (typeof options.view !== 'undefined'
                 ? options.view
                 : glToTyped([], [0, 0, -1], this.positionsType) );

    this.update();
  }

  // ------------- accessors

  /**
   * Get the current look-at matrix. Note is updated only after a call to
   * the update method.
   *
   * @see {@link Listener#update}
   *
   * @returns {mat4} look-at matrix
   */
  get lookAt() {
    return this._lookAt;
  }

  /**
   * Set coordinates type.
   *
   * @param {coordinatesType} [type='gl']
   */
  set positionsType(coordinatesType) {
    this._positionsType = (typeof coordinatesType !== 'undefined'
                           ? coordinatesType
                           : 'gl');
  }

  /**
   * Get coordinates type.
   *
   * @returns {coordinatesType}
   */
  get positionsType() {
    return this._positionsType;
  }

  /**
   * Set listener position. It will update the relative positions of the
   * sources after a call to the update method.
   *
   * Default value is [0, 0, 0] in 'gl' coordinates.
   *
   * @see {@link Listener#update}
   *
   * @param {coordinates} positionRequest
   */
  set position(positionRequest) {
    typedToGl(this._position, positionRequest, this._positionsType);
    this._outdated = true;
  }

  /**
   * Get listener position.
   *
   * @returns {coordinates}
   */
  get position() {
    return glToTyped([], this._position, this._positionsType);
  }

  /**
   * Set listener up direction (not an absolute position). It will update
   * the relative positions of the sources after a call to the update
   * method.
   *
   * Default value is [0, 1, 0] in 'gl' coordinates.
   *
   * @see {@link Listener#update}
   *
   * @param {coordinates} positionRequest
   */
  set up(upRequest) {
    typedToGl(this._up, upRequest, this._positionsType);
    this._outdated = true;
  }

  /**
   * Get listener up direction.
   *
   * @returns {coordinates}
   */
  get up() {
    return glToTyped([], this._up, this._positionsType);
  }

  /**
   * Set listener view, as an aiming position. It is an absolute position,
   * and not a direction. It will update the relative positions of the
   * sources after a call to the update method.
   *
   * Default value is [0, 0, -1] in 'gl' coordinates.
   *
   * @see {@link Listener#update}
   *
   * @param {coordinates} positionRequest
   */
  set view(viewRequest) {
    typedToGl(this._view, viewRequest, this._positionsType);
    this._outdated = true;
  }

  /**
   * Get listener view.
   *
   * @returns {coordinates}
   */
  get view() {
    return glToTyped([], this._view, this._positionsType);
  }

  // --------- public methods

  /**
   * Updates the look-at matrix, according to the pending changes in
   * position, view, and up.
   *
   * @returns {Boolean} true when at least a change occurred.
   */
  update() {
    const updated = this._outdated;
    if (this._outdated) {
      glMatrix.mat4.lookAt(this._lookAt, this._position, this._view, this._up);
      this._outdated = false;
    }

    return updated;
  }

}

export default Listener;
