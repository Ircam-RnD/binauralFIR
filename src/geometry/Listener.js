/**
 * @fileOverview Listener.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import glMatrix from 'gl-matrix';

import { glToSystem, systemToGl } from '../geometry/coordinates';

/**
 * Camera-like listener. It generates a look-at matrix from a position, a
 * view point, and an up direction.
 *
 */
export class Listener {

  /**
   * Constructs a listener.
   *
   * @param {Object} options
   * @param {CoordinateSystem} [options.coordinateSystem='gl']
   * {@link Listener#coordinateSystem}
   * @param {Coordinates} [options.position=[0,0,0]]
   * {@link Listener#position}
   * @param {Coordinates} [options.up=[0,1,0]]
   * {@link Listener#up}
   * @param {Coordinates} [options.view=[0,0,-1]]
   * {@link Listener#view}
   * @param {Boolean} [options.viewIsRelative=false]
   * {@link Listener#viewIsRelative}
   */
  constructor(options = {}) {
    this._outdated = true;
    this._lookAt = [];

    this.coordinateSystem = options.coordinateSystem;

    this._position = [];
    this.position = (typeof options.position !== 'undefined'
                     ? options.position
                     : glToSystem([], [0, 0, 0], this.coordinateSystem) );

    this._up = [];
    this.up = (typeof options.up !== 'undefined'
               ? options.up
               : glToSystem([], [0, 1, 0], this.coordinateSystem) );

    this.viewIsRelative = options.viewIsRelative; // undefined is fine

    this._view = [];
    this.view = (typeof options.view !== 'undefined'
                 ? options.view
                 : glToSystem([], [0, 0, -1], this.coordinateSystem) );

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
   * Set coordinate system.
   *
   * @param {CoordinateSystem} [system='gl']
   */
  set coordinateSystem(system) {
    this._coordinateSystem = (typeof system !== 'undefined'
                              ? system
                              : 'gl');
  }

  /**
   * Get coordinate system.
   *
   * @returns {CoordinateSystem}
   */
  get coordinateSystem() {
    return this._coordinateSystem;
  }

  /**
   * Set listener position. It will update the look-at matrix after a call
   * to the update method.
   *
   * Default value is [0, 0, 0] in 'gl' coordinates.
   *
   * @see {@link Listener#update}
   *
   * @param {Coordinates} positionRequest
   */
  set position(positionRequest) {
    systemToGl(this._position, positionRequest, this._coordinateSystem);
    this._outdated = true;
  }

  /**
   * Get listener position.
   *
   * @returns {Coordinates}
   */
  get position() {
    return glToSystem([], this._position, this._coordinateSystem);
  }

  /**
   * Set listener up direction (not an absolute position). It will update
   * the look-at matrix after a call to the update method.
   *
   * Default value is [0, 1, 0] in 'gl' coordinates.
   *
   * @see {@link Listener#update}
   *
   * @param {Coordinates} upRequest
   */
  set up(upRequest) {
    systemToGl(this._up, upRequest, this._coordinateSystem);
    this._outdated = true;
  }

  /**
   * Get listener up direction.
   *
   * @returns {Coordinates}
   */
  get up() {
    return glToSystem([], this._up, this._coordinateSystem);
  }

  /**
   * Set listener view, as an aiming position or a relative direction, if
   * viewIsRelative is respectively false or true. It will update the
   * look-at matrix after a call to the update method.
   *
   * Default value is [0, 0, -1] in 'gl' coordinates.
   *
   * @see {@link Listener#viewIsRelative}
   * @see {@link Listener#update}
   *
   * @param {Coordinates} viewRequest
   */
  set view(viewRequest) {
    systemToGl(this._view, viewRequest, this._coordinateSystem);
    this._outdated = true;
  }

  /**
   * Get listener view.
   *
   * @returns {Coordinates}
   */
  get view() {
    return glToSystem([], this._view, this._coordinateSystem);
  }

  /**
   * Set the type of view: absolute to an aiming position (when false), or
   * a relative direction (when true). It will update the look-at matrix
   * after a call to the update method.
   *
   * @see {@link Listener#view}
   *
   * @param {Boolean} [relative=false] true when view is a direction, false
   * when it is an absolute position.
   */
  set viewIsRelative(relative) {
    this._viewIsRelative = (typeof relative !== 'undefined'
                            ? relative
                            : false);
  }

  /**
   * Get the type of view.
   *
   * @returns {Boolean}
   */
  get viewIsRelative() {
    return this._viewIsRelative;
  }

  // --------- public methods

  /**
   * Updates the look-at matrix, according to the pending changes in
   * position, view, viewIsRelative, and up.
   *
   * @returns {Boolean} true when at least a change occurred.
   */
  update() {
    const updated = this._outdated;
    if (this._outdated) {
      const view = (this._viewIsRelative
                    ? glMatrix.vec3.add([], this._view, this._position)
                    : this._view);
      glMatrix.mat4.lookAt(this._lookAt,
                           this._position, view, this._up);
      this._outdated = false;
    }

    return updated;
  }

}

export default Listener;
