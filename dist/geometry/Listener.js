'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Listener = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileOverview Listener.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Jean-Philippe.Lambert@ircam.fr
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2016 IRCAM, Paris, France
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

var _coordinates = require('../geometry/coordinates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Camera-like listener. It generates a look-at matrix from a position, a
 * view point, and an up direction.
 *
 */

var Listener = exports.Listener = function () {

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

  function Listener() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Listener);

    this._outdated = true;
    this._lookAt = [];

    this.coordinateSystem = options.coordinateSystem;

    this._position = [];
    this.position = typeof options.position !== 'undefined' ? options.position : (0, _coordinates.glToSystem)([], [0, 0, 0], this.coordinateSystem);

    this._up = [];
    this.up = typeof options.up !== 'undefined' ? options.up : (0, _coordinates.glToSystem)([], [0, 1, 0], this.coordinateSystem);

    this.viewIsRelative = options.viewIsRelative; // undefined is fine

    this._view = [];
    this.view = typeof options.view !== 'undefined' ? options.view : (0, _coordinates.glToSystem)([], [0, 0, -1], this.coordinateSystem);

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


  _createClass(Listener, [{
    key: 'update',


    // --------- public methods

    /**
     * Updates the look-at matrix, according to the pending changes in
     * position, view, viewIsRelative, and up.
     *
     * @returns {Boolean} true when at least a change occurred.
     */
    value: function update() {
      var updated = this._outdated;
      if (this._outdated) {
        var view = this._viewIsRelative ? _glMatrix2.default.vec3.add([], this._view, this._position) : this._view;
        _glMatrix2.default.mat4.lookAt(this._lookAt, this._position, view, this._up);
        this._outdated = false;
      }

      return updated;
    }
  }, {
    key: 'lookAt',
    get: function get() {
      return this._lookAt;
    }

    /**
     * Set coordinate system.
     *
     * @param {CoordinateSystem} [system='gl']
     */

  }, {
    key: 'coordinateSystem',
    set: function set(system) {
      this._coordinateSystem = typeof system !== 'undefined' ? system : 'gl';
    }

    /**
     * Get coordinate system.
     *
     * @returns {CoordinateSystem}
     */
    ,
    get: function get() {
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

  }, {
    key: 'position',
    set: function set(positionRequest) {
      (0, _coordinates.systemToGl)(this._position, positionRequest, this._coordinateSystem);
      this._outdated = true;
    }

    /**
     * Get listener position.
     *
     * @returns {Coordinates}
     */
    ,
    get: function get() {
      return (0, _coordinates.glToSystem)([], this._position, this._coordinateSystem);
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

  }, {
    key: 'up',
    set: function set(upRequest) {
      (0, _coordinates.systemToGl)(this._up, upRequest, this._coordinateSystem);
      this._outdated = true;
    }

    /**
     * Get listener up direction.
     *
     * @returns {Coordinates}
     */
    ,
    get: function get() {
      return (0, _coordinates.glToSystem)([], this._up, this._coordinateSystem);
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

  }, {
    key: 'view',
    set: function set(viewRequest) {
      (0, _coordinates.systemToGl)(this._view, viewRequest, this._coordinateSystem);
      this._outdated = true;
    }

    /**
     * Get listener view.
     *
     * @returns {Coordinates}
     */
    ,
    get: function get() {
      return (0, _coordinates.glToSystem)([], this._view, this._coordinateSystem);
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

  }, {
    key: 'viewIsRelative',
    set: function set(relative) {
      this._viewIsRelative = typeof relative !== 'undefined' ? relative : false;
    }

    /**
     * Get the type of view.
     *
     * @returns {Boolean}
     */
    ,
    get: function get() {
      return this._viewIsRelative;
    }
  }]);

  return Listener;
}();

exports.default = Listener;