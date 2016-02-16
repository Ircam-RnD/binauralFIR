'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BinauralPanner = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileOverview Multi-source binaural panner.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Jean-Philippe.Lambert@ircam.fr
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2016 IRCAM, Paris, France
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license CECILL-2.1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _templateObject = _taggedTemplateLiteral(['for use with BinauralPannerNode'], ['for use with BinauralPannerNode']);

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

var _coordinates = require('../geometry/coordinates');

var _HrtfSet = require('../sofa/HrtfSet');

var _HrtfSet2 = _interopRequireDefault(_HrtfSet);

var _Source = require('./Source');

var _Source2 = _interopRequireDefault(_Source);

var _Listener = require('../geometry/Listener');

var _Listener2 = _interopRequireDefault(_Listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Binaural panner with multiple sources and a listener.
 */

var BinauralPanner = exports.BinauralPanner = function () {

  /**
   * Constructs an HRTF set. Note that the filter positions are applied
   * during the load of an HRTF URL.
   *
   * See {@link HrtfSet}.
   * See {@link BinauralPanner#loadHrtfSet}.
   *
   * @param {Object} options
   * @param {AudioContext} options.audioContext mandatory for the creation
   * of FIR audio buffers
   * @param {coordinatesType} [options.positionsType='gl']
   * {@link BinauralPanner#positionsType}
   * @param {Number} [options.sourceCount=1]
   * @param {Array.<coordinates>} [options.sourcePositions=undefined] must
   * be of length options.sourceCount {@link BinauralPanner#sourcePositions}
   * @param {Number} [options.crossfadeDuration] in seconds.
   * @param {HrtfSet} [options.hrtfSet] refer an external HRTF set.
   * {@link BinauralPanner#hrtfSet}
   * @param {coordinatesType} [options.filterPositionsType=options.positionsType]
   * {@link BinauralPanner#filterPositionsType}
   * @param {Array.<coordinates>} [options.filterPositions=undefined]
   * array of positions to filter. Use undefined to use all positions from the HRTF set.
   * {@link BinauralPanner#filterPositions}
   * @param {Boolean} [options.filterAfterLoad=false] true to filter after
   * full load of SOFA file
   * @param {Listener} [options.listener] refer an external listener.
   * {@link BinauralPanner#listener}
   * @param {coordinatesType} [options.listenerPositionsType=options.positionsType]
   * {@link BinauralPanner#listenerPositionsType}
   * @param {coordinates} [options.listenerPosition=[0,0,0]]
   * {@link BinauralPanner#listenerPosition}
   * @param {coordinates} [options.listenerUp=[0,1,0]]
   * {@link BinauralPanner#listenerUp}
   * @param {coordinates} [options.listenerView=[0,0,-1]]
   * {@link BinauralPanner#listenerView}
   */

  function BinauralPanner() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BinauralPanner);

    this._audioContext = options.audioContext;

    this.positionsType = options.positionsType;

    var sourceCount = typeof options.sourceCount !== 'undefined' ? options.sourceCount : 1;
    // allocate first
    this._listener = typeof options.listener !== 'undefined' ? options.listener : new _Listener2.default();

    // set coordinates type, that defaults to BinauralPanner's own type
    this.listenerPositionsType = options.listenerPositionsType;

    // use setters for internal or external listener
    this.listenerPosition = typeof options.listenerPosition !== 'undefined' ? options.listenerPosition : (0, _coordinates.glToTyped)([], [0, 0, 0], this._listener.positionsType);

    this.listenerView = typeof options.listenerView !== 'undefined' ? options.listenerView : (0, _coordinates.glToTyped)([], [0, 0, -1], this._listener.positionsType);

    this.listenerUp = typeof options.listenerUp !== 'undefined' ? options.listenerUp : (0, _coordinates.glToTyped)([], [0, 1, 0], this._listener.positionsType);

    // this._listenerOutdated = true;
    // this._listenerLookAt = [];

    // this._listenerPosition = [];
    // this.listenerPosition = (typeof options.listenerPosition !== 'undefined'
    //                          ? options.listenerPosition
    //                          : glToTyped([], [0, 0, 0], this.positionsType) );

    // this._listenerUp = [];
    // this.listenerUp = (typeof options.listenerUp !== 'undefined'
    //                    ? options.listenerUp
    //                    : glToTyped([], [0, 1, 0], this.positionsType) );

    // this._listenerView = [];
    // this.listenerView = (typeof options.listenerView !== 'undefined'
    //                      ? options.listenerView
    //                      : glToTyped([], [0, 0, -1], this.positionsType) );

    this._sourcesOutdated = new Array(sourceCount).fill(true);

    this._sources = this._sourcesOutdated.map(function () {
      return new _Source2.default({
        audioContext: _this._audioContext,
        crossfadeDuration: options.crossfadeDuration
      });
    });

    this._sourcePositionsAbsolute = this._sourcesOutdated.map(function () {
      return [0, 0, 1]; // allocation and default value
    });

    this._sourcePositionsRelative = this._sourcesOutdated.map(function () {
      return [0, 0, 1]; // allocation and default value
    });

    this.hrtfSet = typeof options.hrtfSet !== 'undefined' ? options.hrtfSet : new _HrtfSet2.default({
      audioContext: this._audioContext,
      positionsType: 'gl'
    });

    this.filterPositionsType = options.filterPositionsType;
    this.filterPositions = options.filterPositions;
    this.filterAfterLoad = options.filterAfterLoad;

    if (typeof options.sourcePositions !== 'undefined') {
      this.sourcePositions = options.sourcePositions;
    }

    this.update();
  }

  // ----------- accessors

  /**
   * Set coordinates type for positions.
   *
   * @param {coordinatesType} [type='gl']
   */


  _createClass(BinauralPanner, [{
    key: 'setSourcePositionByIndex',


    /**
     * Set the position of one source. It will update the corresponding
     * relative position after a call to the update method.
     *
     * See {@link BinauralPanner#update}.
     *
     * @param {Number} index
     * @param {coordinates} positionRequest
     * @returns {this}
     */
    value: function setSourcePositionByIndex(index, positionRequest) {
      this._sourcesOutdated[index] = true;
      (0, _coordinates.typedToGl)(this._sourcePositionsAbsolute[index], positionRequest, this.positionsType);

      return this;
    }

    /**
     * Get the position of one source.
     *
     * @param {Number} index
     * @returns {coordinates}
     */

  }, {
    key: 'getSourcePositionByIndex',
    value: function getSourcePositionByIndex(index) {
      return (0, _coordinates.glToTyped)([], this._sourcePositionsAbsolute[index], this.positionsType);
    }

    // ----------- public methods

    /**
     * Load an HRTF set form an URL, and update sources.
     *
     * See {@link HrtfSet#load}.
     *
     * @param {String} sourceUrl
     * @returns {Promise.<this|Error>} resolve when URL successfully
     * loaded.
     */

  }, {
    key: 'loadHrtfSet',
    value: function loadHrtfSet(sourceUrl) {
      var _this2 = this;

      return this._hrtfSet.load(sourceUrl).then(function () {
        _this2._sourcesOutdated.fill(true);
        _this2.update();
        return _this2;
      });
    }

    /**
     * Connect the input of a source.
     *
     * @param {Number} index
     * @param {(AudioNode|Array.<AudioNode>)} nodesToConnect
     * @param {Number} [output=0] output to connect from
     * @param {Number} [input=0] input to connect to
     * @returns {this}
     */

  }, {
    key: 'connectInputByIndex',
    value: function connectInputByIndex(index, nodesToConnect, output, input) {
      this._sources[index].connectInput(nodesToConnect, output, input);

      return this;
    }

    /**
     * Disconnect the input of one source.
     *
     * @param {Number} index
     * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect disconnect
     * all when undefined.
     * @returns {this}
     */

  }, {
    key: 'disconnectInputByIndex',
    value: function disconnectInputByIndex(index, nodesToDisconnect) {
      this._sources[index].disconnectInput(nodesToDisconnect);

      return this;
    }

    /**
     * Disconnect the input of each source.
     *
     * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect disconnect
     * all when undefined.
     * @returns {this}
     */

  }, {
    key: 'disconnectInputs',
    value: function disconnectInputs(nodesToDisconnect) {
      var nodes = Array.isArray(nodesToDisconnect) ? nodesToDisconnect : [nodesToDisconnect]; // make array

      this._sources.forEach(function (source, index) {
        source.disconnectInput(nodes[index]);
      });

      return this;
    }

    /**
     * Connect the output of a source.
     *
     * @param {Number} index
     * @param {(AudioNode|Array.<AudioNode>)} nodesToConnect
     * @param {Number} [output=0] output to connect from
     * @param {Number} [input=0] input to connect to
     * @returns {this}
     */

  }, {
    key: 'connectOutputByIndex',
    value: function connectOutputByIndex(index, nodesToConnect, output, input) {
      this._sources[index].connectOutput(nodesToConnect, output, input);

      return this;
    }

    /**
     * Disconnect the output of a source.
     *
     * @param {Number} index
     * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect disconnect
     * all when undefined.
     * @returns {this}
     */

  }, {
    key: 'disconnectOutputByIndex',
    value: function disconnectOutputByIndex(index, nodesToDisconnect) {
      this._sources[index].disconnectOutput(nodesToDisconnect);

      return this;
    }

    /**
     * Connect each output of each source. Note that the number of nodes to
     * connect must match the number of sources.
     *
     * See {@link BinauralPanner#connectOutputByIndex}.
     *
     * @param {(AudioNode|Array.<AudioNode>)} nodesToConnect
     * @param {Number} [output=0] output to connect from
     * @param {Number} [input=0] input to connect to
     * @returns {this}
     */

  }, {
    key: 'connectOutputs',
    value: function connectOutputs(nodesToConnect, output, input) {
      this._sources.forEach(function (source) {
        source.connectOutput(nodesToConnect, output, input);
      });

      return this;
    }

    /**
     * Disconnect the output of each source.
     *
     * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect
     * @returns {this}
     */

  }, {
    key: 'disconnectOutputs',
    value: function disconnectOutputs(nodesToDisconnect) {
      this._sources.forEach(function (source) {
        source.disconnectOutput(nodesToDisconnect);
      });

      return this;
    }

    /**
     * Update the sources filters, according to pending changes in listener,
     * and source positions.
     *
     * @returns {Boolean} true when at least a change occurred.
     */

  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      var updated = false;
      if (this._listener.update()) {
        this._sourcesOutdated.fill(true);
        updated = true;
      }

      if (this._hrtfSet.isReady) {
        this._sourcePositionsAbsolute.forEach(function (positionAbsolute, index) {
          if (_this3._sourcesOutdated[index]) {
            _glMatrix2.default.vec3.transformMat4(_this3._sourcePositionsRelative[index], positionAbsolute, _this3._listener.lookAt);

            _this3._sources[index].position = _this3._sourcePositionsRelative[index];

            _this3._sourcesOutdated[index] = false;
            updated = true;
          }
        });
      }

      return updated;
    }
  }, {
    key: 'positionsType',
    set: function set(type) {
      this._positionsType = typeof type !== 'undefined' ? type : 'gl';
    }

    /**
     * Get coordinates type for positions.
     *
     * @returns {coordinatesType}
     */
    ,
    get: function get() {
      return this._positionsType;
    }

    /**
     * Refer an external HRTF set, and update sources. Its positions
     * coordinate type must be 'gl'.
     *
     * See {@link HrtfSet}.
     * See {@link BinauralPanner#update}.
     *
     * @param {HrtfSet} hrtfSet
     * @throws {Error} when hrtfSet in undefined or hrtfSet.positionsType is
     * not 'gl'.
     */

  }, {
    key: 'hrtfSet',
    set: function set(hrtfSet) {
      var _this4 = this;

      if (typeof hrtfSet !== 'undefined') {
        if (hrtfSet.positionsType !== 'gl') {
          throw new Error('positions type of HRTF set must be \'gl\' ' + ('(and not \'' + hrtfSet.positionsType + '\') ')(_templateObject));
        }
        this._hrtfSet = hrtfSet;
      } else {
        throw new Error('Undefined HRTF set for BinauralPanner');
      }

      // update HRTF set references
      this._sourcesOutdated.fill(true);
      this._sources.forEach(function (source) {
        source.hrtfSet = _this4._hrtfSet;
      });

      this.update();
    }

    /**
     * Get the HrtfSet.
     *
     * @returns {HrtfSet}
     */
    ,
    get: function get() {
      return this._hrtfSet;
    }

    // ------------- HRTF set proxies

    /**
     * Set the filter positions of the HRTF set
     *
     * See {@link HrtfSet#filterPositions}.
     *
     * @param {Array.<coordinates>} positions
     */

  }, {
    key: 'filterPositions',
    set: function set(positions) {
      this._hrtfSet.filterPositions = positions;
    }

    /**
     * Get the filter positions of the HRTF set
     *
     * See {@link HrtfSet#filterPositions}.
     *
     * @return {Array.<coordinates>} positions
     */
    ,
    get: function get() {
      return this._hrtfSet.filterPositions;
    }

    /**
     * Set coordinates type for filter positions.
     *
     * @param {coordinatesType} [type='gl']
     */

  }, {
    key: 'filterPositionsType',
    set: function set(type) {
      this._hrtfSet.filterPositionsType = typeof type !== 'undefined' ? type : this.positionsType;
    }

    /**
     * Get coordinates type for filter positions.
     *
     * @returns {coordinatesType}
     */
    ,
    get: function get() {
      return this._hrtfSet.filterPositionsType;
    }

    /**
     * Set post-filtering flag. When false, try to load a partial set of
     * HRTF.
     *
     * @param {Boolean} [post=false]
     */

  }, {
    key: 'filterAfterLoad',
    set: function set(post) {
      this._hrtfSet.filterAfterLoad = post;
    }

    /**
     * Get post-filtering flag. When false, try to load a partial set of
     * HRTF.
     *
     * @returns {Boolean}
     */
    ,
    get: function get() {
      return this._hrtfSet.filterAfterLoad;
    }

    /**
     * Refer an external listener, and update sources.
     *
     * See {@link Listener}.
     * See {@link BinauralPanner#update}.
     *
     * @param {Listener} listener
     * @throws {Error} when listener in undefined.
     */

  }, {
    key: 'listener',
    set: function set(listener) {
      if (typeof listener !== 'undefined') {
        this._listener = listener;
      } else {
        throw new Error('Undefined listener for BinauralPanner');
      }

      this._sourcesOutdated.fill(true);
      this.update();
    }

    // ---------- Listener proxies

    /**
     * Set coordinates type for listener.
     *
     * @param {coordinatesType} [type='gl']
     */

  }, {
    key: 'listenerPositionsType',
    set: function set(coordinatesType) {
      this._listener.positionsType = typeof coordinatesType !== 'undefined' ? coordinatesType : this.positionsType;
    }

    /**
     * Get coordinates type for listener.
     *
     * @returns {coordinatesType}
     */
    ,
    get: function get() {
      return this._listener.positionsType;
    }

    /**
     * Set listener position. It will update the relative positions of the
     * sources after a call to the update method.
     *
     * Default value is [0, 0, 0] in 'gl' coordinates.
     *
     * See {@link Listener#position}.
     * See {@link BinauralPanner#update}.
     *
     * @param {coordinates} positionRequest
     */

  }, {
    key: 'listenerPosition',
    set: function set(positionRequest) {
      this._listener.position = positionRequest;
    }

    /**
     * Get listener position.
     *
     * @returns {coordinates}
     */
    ,
    get: function get() {
      return this._listener.position;
    }

    /**
     * Set listener up direction (not an absolute position). It will update
     * the relative positions of the sources after a call to the update
     * method.
     *
     * Default value is [0, 1, 0] in 'gl' coordinates.
     *
     * See {@link Listener#up}.
     * See {@link BinauralPanner#update}.
     *
     * @param {coordinates} positionRequest
     */

  }, {
    key: 'listenerUp',
    set: function set(upRequest) {
      this._listener.up = upRequest;
    }

    /**
     * Get listener up direction.
     *
     * @returns {coordinates}
     */
    ,
    get: function get() {
      return this._listener.up;
    }

    /**
     * Set listener view, as an aiming position. It is an absolute position,
     * and not a direction. It will update the relative positions of the
     * sources after a call to the update method.
     *
     * Default value is [0, 0, -1] in 'gl' coordinates.
     *
     * See {@link Listener#view}.
     * See {@link BinauralPanner#update}.a
     *
     * @param {coordinates} positionRequest
     */

  }, {
    key: 'listenerView',
    set: function set(viewRequest) {
      this._listener.view = viewRequest;
    }

    /**
     * Get listener view direction.
     *
     * @returns {coordinates}
     */
    ,
    get: function get() {
      return this._listener.view;
    }

    /**
     * Set the sources positions. It will update the relative positions after
     * a call to the update method.
     *
     * See {@link BinauralPanner#update}.
     * See {@link BinauralPanner#setSourcePositionByIndex}.
     *
     * @param {Array.<coordinates>} positionsRequest
     * @throws {Error} if the length of positionsRequest is not the same as
     * the number of sources
     */

  }, {
    key: 'sourcePositions',
    set: function set(positionsRequest) {
      var _this5 = this;

      if (positionsRequest.length !== this._sources.length) {
        throw new Error('Bad number of source positions: ' + (positionsRequest.length + ' ') + ('instead of ' + this._sources.length));
      }

      positionsRequest.forEach(function (position, index) {
        _this5._sourcesOutdated[index] = true;
        _this5.setSourcePositionByIndex(index, position);
      });
    }

    /**
     * Get the source positions.
     *
     * @returns {Array.<coordinates>}
     */
    ,
    get: function get() {
      var _this6 = this;

      return this._sourcePositionsAbsolute.map(function (position) {
        return (0, _coordinates.glToTyped)([], position, _this6.positionsType);
      });
    }
  }]);

  return BinauralPanner;
}();

exports.default = BinauralPanner;