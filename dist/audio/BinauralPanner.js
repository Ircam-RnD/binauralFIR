'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileOverview Multi-source binaural panner.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Jean-Philippe.Lambert@ircam.fr
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2016 IRCAM, Paris, France
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license CECILL-2.1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _templateObject = _taggedTemplateLiteral(['for use with BinauralPannerNode'], ['for use with BinauralPannerNode']);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BinauralPanner = undefined;

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

var _coordinates = require('../geometry/coordinates');

var _HrtfSet = require('../sofa/HrtfSet');

var _HrtfSet2 = _interopRequireDefault(_HrtfSet);

var _Source = require('./Source');

var _Source2 = _interopRequireDefault(_Source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Binaural panner with multiple sources and a listener.
 */

var BinauralPanner = exports.BinauralPanner = function () {

  /**
   /**
   * Constructs an HRTF set. Note that the filter positions are applied
   * during the load of an HRTF URL.
   *
   * @see HrtfSet
   * @see loadHrtfSet
   *
   * @param {Object} options
   * @param {AudioContext} options.audioContext mandatory for the creation
   * of FIR audio buffers
   * @param {coordinatesType} [options.positionsType='gl']
   * @param {coordinatesType} [options.filterPositionsType=options.positionsType]
   * @param {Array.<coordinates>} [options.filterPositions=undefined]
   * array of positions to filter. Use undefined to use all positions.
   * @param {Boolean} [options.filterAfterLoad = false] true to filter after
   * full load of SOFA file
   * @param {coordinates} [options.listenerPosition=[0, 0, 0]]
   * @param {coordinates} [options.listenerUp=[0, 1, 0]]
   * @param {coordinates} [options.listenerView=[0, 0, -1]]
   * @param {Number} [options.sourceCount=1]
   * @param {Array.<coordinates>} [options.sourcePositions=undefined] must
   * be of length options.sourceCount
   */

  function BinauralPanner() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BinauralPanner);

    this._audioContext = options.audioContext;

    this.positionsType = options.positionsType;

    var sourceCount = typeof options.sourceCount !== 'undefined' ? options.sourceCount : 1;

    this._listenerOutdated = true;
    this._listenerLookAt = [];

    this._listenerPosition = [];
    this.listenerPosition = typeof options.listenerPosition !== 'undefined' ? options.listenerPosition : (0, _coordinates.glToTyped)([], [0, 0, 0], this.positionsType);

    this._listenerUp = [];
    this.listenerUp = typeof options.listenerUp !== 'undefined' ? options.listenerUp : (0, _coordinates.glToTyped)([], [0, 1, 0], this.positionsType);

    this._listenerView = [];
    this.listenerView = typeof options.listenerView !== 'undefined' ? options.listenerView : (0, _coordinates.glToTyped)([], [0, 0, -1], this.positionsType);

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
   * @param {coordinatesType} [type='gl']
   */

  _createClass(BinauralPanner, [{
    key: 'setSourcePositionByIndex',

    /**
     * Set the position of one source.
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
     * Get the position of one source
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
     * @see HrtfSet#load
     *
     * @param {String} sourceUrl
     * @returns {Promise.<(this|Error)>} resolve when URL successfully
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
     * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect
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
     * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect
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
     * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect
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
     * @see BinauralPanner#connectOutputByIndex
     *
     * @param {Number} index
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
     * Update the sources filters, according to possible changes in listener,
     * and source positions.
     *
     * @returns {this}
     */

  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      if (this._listenerOutdated) {
        _glMatrix2.default.mat4.lookAt(this._listenerLookAt, this._listenerPosition, this._listenerView, this._listenerUp);

        this._sourcesOutdated.fill(true);
      }

      if (this._hrtfSet.isReady) {
        this._sourcePositionsAbsolute.forEach(function (positionAbsolute, index) {
          if (_this3._sourcesOutdated[index]) {
            _glMatrix2.default.vec3.transformMat4(_this3._sourcePositionsRelative[index], positionAbsolute, _this3._listenerLookAt);

            _this3._sources[index].position = _this3._sourcePositionsRelative[index];

            _this3._sourcesOutdated[index] = false;
          }
        });
      }

      return this;
    }
  }, {
    key: 'positionsType',
    set: function set(type) {
      this._positionsType = typeof type !== 'undefined' ? type : 'gl';
    }

    /**
     * Get coordinates type for positions.
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
     * @see HrtfSet
     * @see BinauralPanner#update
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
     * @see HrtfSet#filterPositions
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
     * @see HrtfSet#filterPositions
     *
     * @return {Array.<coordinates>} positions
     */
    ,
    get: function get() {
      return this._hrtfSet.filterPositions;
    }
  }, {
    key: 'filterPositionsType',
    set: function set(type) {
      this._hrtfSet.filterPositionsType = typeof type !== 'undefined' ? type : this.positionsType;
    },
    get: function get() {
      return this._hrtfSet.filterPositionsType;
    }
  }, {
    key: 'filterAfterLoad',
    set: function set(post) {
      this._hrtfSet.filterAfterLoad = post;
    },
    get: function get() {
      return this._hrtfSet.filterAfterLoad;
    }
  }, {
    key: 'listenerPosition',
    set: function set(positionRequest) {
      (0, _coordinates.typedToGl)(this._listenerPosition, positionRequest, this._positionsType);
      this._listenerOutdated = true;
    },
    get: function get() {
      return (0, _coordinates.glToTyped)([], this._listenerPosition, this._positionsType);
    }
  }, {
    key: 'listenerUp',
    set: function set(upRequest) {
      (0, _coordinates.typedToGl)(this._listenerUp, upRequest, this._positionsType);
      this._listenerOutdated = true;
    },
    get: function get() {
      return (0, _coordinates.glToTyped)([], this._listenerUp, this._positionsType);
    }
  }, {
    key: 'listenerView',
    set: function set(viewRequest) {
      (0, _coordinates.typedToGl)(this._listenerView, viewRequest, this._positionsType);
      this._listenerOutdated = true;
    },
    get: function get() {
      return (0, _coordinates.glToTyped)([], this._listenerView, this._positionsType);
    }

    /**
     * Set the sources positions.
     *
     * @see BinauralPanner#setSourcePositionByIndex
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