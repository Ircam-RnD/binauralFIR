'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileOverview Multi-source binaural panner.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Jean-Philippe.Lambert@ircam.fr
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2016 IRCAM, Paris, France
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BinauralPanner = undefined;

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

var _coordinates = require('../geometry/coordinates');

var _Source = require('./Source');

var _Source2 = _interopRequireDefault(_Source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Binaural panner with multiple sources and a listener.
 */

var BinauralPanner = exports.BinauralPanner = function () {
  function BinauralPanner() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BinauralPanner);

    this._audioContext = options.audioContext;

    this.positionsType = typeof options.positionsType !== 'undefined' ? options.positionsType : 'gl';

    this._hrtfSet = options.hrtfSet;

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
        crossfadeDuration: options.crossfadeDuration,
        hrtfSet: _this._hrtfSet
      });
    });

    this._sourcePositionsAbsolute = this._sourcesOutdated.map(function () {
      return [0, 0, 1]; // allocation and default value
    });

    this._sourcePositionsRelative = this._sourcesOutdated.map(function () {
      return [0, 0, 1]; // allocation and default value
    });

    if (typeof options.sourcePositions !== 'undefined') {
      this.sourcePositions = options.sourcePositions;
    }

    this.update();
  }

  // ----------- accessors

  _createClass(BinauralPanner, [{
    key: 'setSourcePositionByIndex',
    value: function setSourcePositionByIndex(index, positionRequest) {
      this._sourcesOutdated[index] = true;
      (0, _coordinates.typedToGl)(this._sourcePositionsAbsolute[index], positionRequest, this.positionsType);

      return this;
    }
  }, {
    key: 'getSourcePositionByIndex',
    value: function getSourcePositionByIndex(index) {
      return (0, _coordinates.glToTyped)([], this._sourcePositionsAbsolute[index], this.positionsType);
    }

    // ----------- public methods

  }, {
    key: 'connectInputByIndex',
    value: function connectInputByIndex(index, nodesToConnect, output, input) {
      this._sources[index].connectInput(nodesToConnect, output, input);

      return this;
    }
  }, {
    key: 'disconnectInputByIndex',
    value: function disconnectInputByIndex(index, nodesToDisconnect) {
      this._sources[index].disconnectInput(nodesToDisconnect);

      return this;
    }
  }, {
    key: 'disconnectInputs',
    value: function disconnectInputs(nodesToDisconnect) {
      var nodes = Array.isArray(nodesToDisconnect) ? nodesToDisconnect : [nodesToDisconnect]; // make array

      this._sources.forEach(function (source, index) {
        source.disconnectInput(nodes[index]);
      });

      return this;
    }
  }, {
    key: 'connectOutputByIndex',
    value: function connectOutputByIndex(index, nodesToConnect, output, input) {
      this._sources[index].connectOutput(nodesToConnect, output, input);

      return this;
    }
  }, {
    key: 'disconnectOutputByIndex',
    value: function disconnectOutputByIndex(index, nodesToDisconnect) {
      this._sources[index].disconnectOutput(nodesToDisconnect);

      return this;
    }
  }, {
    key: 'connectOutputs',
    value: function connectOutputs(nodesToConnect, output, input) {
      this._sources.forEach(function (source) {
        source.connectOutput(nodesToConnect, output, input);
      });

      return this;
    }
  }, {
    key: 'disconnectOutputs',
    value: function disconnectOutputs(nodesToDisconnect) {
      this._sources.forEach(function (source) {
        source.disconnectOutput(nodesToDisconnect);
      });

      return this;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      if (this._listenerOutdated) {
        _glMatrix2.default.mat4.lookAt(this._listenerLookAt, this._listenerPosition, this._listenerView, this._listenerUp);

        this._sourcesOutdated.fill(true);
      }

      this._sourcePositionsAbsolute.forEach(function (positionAbsolute, index) {
        if (_this2._sourcesOutdated[index]) {
          _glMatrix2.default.vec3.transformMat4(_this2._sourcePositionsRelative[index], positionAbsolute, _this2._listenerLookAt);

          _this2._sources[index].position = _this2._sourcePositionsRelative[index];

          _this2._sourcesOutdated[index] = false;
        }
      });

      return this;
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
     * Set coordinates type for positions.
     * @param {coordinatesType} [type='gl']
     */

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
  }, {
    key: 'sourcePositions',
    set: function set(positionsRequest) {
      var _this3 = this;

      if (positionsRequest.length !== this._sources.length) {
        throw new Error('Bad number of source positions: ' + (positionsRequest.length + ' ') + ('instead of ' + this._sources.length));
      }

      positionsRequest.forEach(function (position, index) {
        _this3.setSourcePositionByIndex(index, position);
      });
    },
    get: function get() {
      var _this4 = this;

      return this._sourcePositionsAbsolute.map(function (position) {
        return (0, _coordinates.glToTyped)([], position, _this4.positionsType);
      });
    }
  }]);

  return BinauralPanner;
}();

exports.default = BinauralPanner;