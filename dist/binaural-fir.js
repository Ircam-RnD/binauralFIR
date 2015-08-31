/**
 * @fileOverview
 * The binauralFIR node provides binaural listening to the user. The novelty of
 * this library is that it permits to use your own HRTF dataset. This library
 * can be used as a regular node inside the Web Audio API.
 * @author Arnau Julià
 * @version 0.1.1
 */
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _kdt = require('kdt');

var _kdt2 = _interopRequireDefault(_kdt);

/**
 * @class BinauralFIR
 */

var BinauralFIR = (function () {
  function BinauralFIR(options) {
    _classCallCheck(this, BinauralFIR);

    this.audioContext = options.audioContext;
    this.hrtfDataset = [];
    this.hrtfDatasetLength = 0;
    this.tree = -1;
    this.position = {};
    this.nextPosition = {};
    this.changeWhenFinishCrossfading = false;
    this.crossfadeDuration = 20 / 1000;

    this.input = this.audioContext.createGain();

    // Two sub audio graphs creation:
    // - mainConvolver which represents the current state
    // - and secondaryConvolver which represents the potential target state
    //   when moving sound to a new position

    this.mainConvolver = new ConvolverAudioGraph({ audioContext: this.audioContext });
    this.mainConvolver.gain.value = 1;
    this.input.connect(this.mainConvolver.input);

    this.secondaryConvolver = new ConvolverAudioGraph({ audioContext: this.audioContext });
    this.secondaryConvolver.gain.value = 0;
    this.input.connect(this.secondaryConvolver.input);
  }

  /**
   * Convolver sub audio graph class
   */

  /**
   * Connects the binauralFIRNode to the Web Audio graph
   * @public
   * @chainable
   * @param node Destination node
   */

  _createClass(BinauralFIR, [{
    key: 'connect',
    value: function connect(node) {
      this.mainConvolver.connect(node);
      this.secondaryConvolver.connect(node);
      return this; // For chainability
    }

    /**
     * Disconnect the binauralFIRNode from the Web Audio graph
     * @public
     * @chainable
     * @param node Destination node
     */
  }, {
    key: 'disconnect',
    value: function disconnect(node) {
      this.mainConvolver.disconnect(node);
      this.secondaryConvolver.disconnect(node);
      return this; // For chainability
    }

    /**
     * Set HRTF Dataset to be used with the virtual source.
     * @public
     * @chainable
     * @param hrtfDataset Array of Objects containing the azimuth, distance, elevation, url and buffer for each point
     */
  }, {
    key: 'distance',

    /**
     * Calculate the distance between two points in a 3-D space.
     * @private
     * @chainable
     * @param a Object containing three properties: x, y, z
     * @param b Object containing three properties: x, y, z
     */
    value: function distance(a, b) {
      // No need to compute square root here for distance comparison, this is more efficient.
      return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);
    }

    /**
     * Set position of the virtual source
     * @public
     * @chainable
     * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
     * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
     * @param distance Distance in meters
     * @todo Implement Immediate setPosition
     */
  }, {
    key: 'setPosition',
    value: function setPosition(azimuth, elevation, distance) {

      if (arguments.length === 3 || arguments.length === 4) {
        // Calculate the nearest position for the input azimuth, elevation and distance
        var nearestPosition = this.getRealCoordinates(azimuth, elevation, distance);
        // No need to change the current HRTF loaded if setted position equal current position
        if (nearestPosition.azimuth !== this.position.azimuth || nearestPosition.elevation !== this.position.elevation || nearestPosition.distance !== this.position.distance) {
          // Check if the crossfading is active
          if (this.isCrossfading() === true) {
            // Check if there is a value waiting to be set
            if (this.changeWhenFinishCrossfading === true) {
              // Stop the past setInterval event.
              clearInterval(this.intervalID);
            } else {
              this.changeWhenFinishCrossfading = true;
            }
            // Save the position
            this.nextPosition.azimuth = nearestPosition.azimuth;
            this.nextPosition.elevation = nearestPosition.elevation;
            this.nextPosition.distance = nearestPosition.distance;

            // Start the setInterval: wait until the crossfading is finished.
            this.intervalID = window.setInterval(this.setLastPosition.bind(this), 0.005);
          } else {
            this.nextPosition.azimuth = nearestPosition.azimuth;
            this.nextPosition.elevation = nearestPosition.elevation;
            this.nextPosition.distance = nearestPosition.distance;
            this.reallyStartPosition();
          }

          return this; // For chainability
        }
      }
    }

    /**
     * Get if the gains are in a crossfading or not.
     * @false
     */
  }, {
    key: 'isCrossfading',
    value: function isCrossfading() {
      // The ramps are not finished, so the crossfading is not finished
      if (this.mainConvolver.gain.value !== 1) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * Really change the position
     * @private
     */
  }, {
    key: 'reallyStartPosition',
    value: function reallyStartPosition() {

      // Save the current position
      this.position.azimuth = this.nextPosition.azimuth;
      this.position.elevation = this.nextPosition.elevation;
      this.position.distance = this.nextPosition.distance;
      // Load the new position in the convolver not active (secondaryConvolver)
      this.secondaryConvolver.buffer = this.getHRTF(this.position.azimuth, this.position.elevation, this.position.distance);
      // Do the crossfading between mainConvolver and secondaryConvolver
      this.crossfading();

      // Change current mainConvolver
      var active = this.mainConvolver;
      this.mainConvolver = this.secondaryConvolver;
      this.secondaryConvolver = active;

      if (this.changeWhenFinishCrossfading) {
        this.changeWhenFinishCrossfading = false;
        clearInterval(this.intervalID);
      }
    }

    /**
     * Set the duration of crossfading in miliseconds.
     * @public
     * @chainable
     * @param duration Duration of the crossfading in miliseconds
     */
  }, {
    key: 'setCrossfadeDuration',
    value: function setCrossfadeDuration(duration) {
      if (duration) {
        // Miliseconds to s
        this.crossfadeDuration = duration / 1000;
        return this; // for chainability
      } else {
          throw new Error("CrossfadeDuration setting error");
        }
    }

    /**
     * Get the duration of crossfading in miliseconds.
     * @public
     */
  }, {
    key: 'getCrossfadeDuration',
    value: function getCrossfadeDuration() {
      // Seconds to ms
      return this.crossfadeDuration * 1000;
    }

    /**
     * Get the current position of the virtual source.
     * @public
     */
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.position;
    }

    /**
     * Do the crossfading between the gainNode active and inactive.
     * @private
     */
  }, {
    key: 'crossfading',
    value: function crossfading() {
      // Do the crossfading between mainConvolver and secondaryConvolver
      var guardInterval = 0.02;
      this.mainConvolver.gain.setValueAtTime(1, this.audioContext.currentTime + guardInterval);
      this.mainConvolver.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + guardInterval + this.crossfadeDuration);

      this.secondaryConvolver.gain.setValueAtTime(0, this.audioContext.currentTime + guardInterval);
      this.secondaryConvolver.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + guardInterval + this.crossfadeDuration);
    }

    /**
     * Get the HRTF file for an especific position
     * @private
     * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
     * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
     * @param distance Distance in meters
     */
  }, {
    key: 'getHRTF',
    value: function getHRTF(azimuth, elevation, distance) {
      var nearest = this.getNearestPoint(azimuth, elevation, distance);
      // Return buffer of nearest position for the input values
      return nearest.buffer;
    }

    /**
     * Transform the spherical to cartesian coordinates.
     * @private
     * @param azimuth Azimuth in radians
     * @param elevation Elevation in radians
     * @param distance Distance in meters
     */
  }, {
    key: 'sphericalToCartesian',
    value: function sphericalToCartesian(azimuth, elevation, distance) {
      return {
        x: distance * Math.sin(azimuth),
        y: distance * Math.cos(azimuth),
        z: distance * Math.sin(elevation)
      };
    }

    /**
     * Get the nearest position for an input position.
     * @private
     * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
     * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
     * @param distance Distance in meters
     */
  }, {
    key: 'getRealCoordinates',
    value: function getRealCoordinates(azimuth, elevation, distance) {
      var nearest = this.getNearestPoint(azimuth, elevation, distance);
      // Return azimuth, elevation and distance of nearest position for the input values
      return {
        azimuth: nearest.azimuth,
        elevation: nearest.elevation,
        distance: nearest.distance
      };
    }

    /**
     * Get the nearest position for an input position.
     * @private
     * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
     * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
     * @param distance Distance in meters
     */
  }, {
    key: 'getNearestPoint',
    value: function getNearestPoint(azimuth, elevation, distance) {
      // Degrees to radians for the azimuth and elevation
      var azimuthRadians = azimuth * Math.PI / 180;
      var elevationRadians = elevation * Math.PI / 180;
      // Convert spherical coordinates to cartesian
      var cartesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, distance);
      // Get the nearest HRTF file for the desired position
      var nearest = this.tree.nearest(cartesianCoord, 1)[0];

      return nearest[0];
    }

    /**
     * Try to set the nextPosition position if the ramps are not in a crossfading
     * @private
     */
  }, {
    key: 'setLastPosition',
    value: function setLastPosition() {
      if (!this.isCrossfading()) {
        this.reallyStartPosition();
      }
    }
  }, {
    key: 'HRTFDataset',
    set: function set(hrtfDataset) {
      this.hrtfDataset = hrtfDataset;
      this.hrtfDatasetLength = this.hrtfDataset.length;

      for (var i = 0; i < this.hrtfDatasetLength; i++) {
        var hrtf = this.hrtfDataset[i];
        // Azimuth and elevation to radians
        var azimuthRadians = hrtf.azimuth * Math.PI / 180;
        var elevationRadians = hrtf.elevation * Math.PI / 180;
        var catesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, hrtf.distance);
        hrtf.x = catesianCoord.x;
        hrtf.y = catesianCoord.y;
        hrtf.z = catesianCoord.z;
      }
      this.tree = _kdt2['default'].createKdTree(this.hrtfDataset, this.distance, ['x', 'y', 'z']);
    },
    get: function get() {
      return this.hrtfDataset;
    }
  }]);

  return BinauralFIR;
})();

exports['default'] = BinauralFIR;

var ConvolverAudioGraph = (function () {
  function ConvolverAudioGraph(options) {
    _classCallCheck(this, ConvolverAudioGraph);

    this.audioContext = options.audioContext;
    this.gainNode = this.audioContext.createGain();
    this.convNode = this.audioContext.createConvolver();
    this.convNode.normalize = false;
    this.gainNode.connect(this.convNode);

    // Hack to force audioParam active when the source is not active
    this.oscillatorNode = this.audioContext.createOscillator();
    this.gainOscillatorNode = this.audioContext.createGain();
    this.oscillatorNode.connect(this.gainOscillatorNode);
    this.gainOscillatorNode.connect(this.gainNode);
    this.gainOscillatorNode.gain.value = 0;
    this.oscillatorNode.start(0);
  }

  _createClass(ConvolverAudioGraph, [{
    key: 'connect',

    /**
     * Connect the ConvolverAudioGraph to a node
     * @public
     * @chainable
     * @param node Destination node
     */
    value: function connect(node) {
      this.convNode.connect(node);
      return this;
    }

    /**
     * Disconnect the ConvolverAudioGraph to a node
     * @public
     * @chainable
     * @param node Destination node
     */
  }, {
    key: 'disconnect',
    value: function disconnect(node) {
      this.convNode.disconnect(node);
      return this;
    }
  }, {
    key: 'input',
    get: function get() {
      return this.gainNode;
    }
  }, {
    key: 'gain',
    get: function get() {
      return this.gainNode.gain;
    }

    /**
     * Set the buffer in the convolverNode
     * @public
     * @param value AudioBuffer Object.
     */
  }, {
    key: 'buffer',
    set: function set(value) {
      this.convNode.buffer = value;
    }
  }]);

  return ConvolverAudioGraph;
})();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1NBckNRLGVBQUc7QUFDVixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7OztTQUVPLGVBQUc7QUFDVCxhQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0tBQzNCOzs7Ozs7Ozs7U0FPUyxhQUFDLEtBQUssRUFBRTtBQUNoQixVQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7S0FDOUI7OztTQWhDRyxtQkFBbUIiLCJmaWxlIjoiZXM2L2JpbmF1cmFsLWZpci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogVGhlIGJpbmF1cmFsRklSIG5vZGUgcHJvdmlkZXMgYmluYXVyYWwgbGlzdGVuaW5nIHRvIHRoZSB1c2VyLiBUaGUgbm92ZWx0eSBvZlxuICogdGhpcyBsaWJyYXJ5IGlzIHRoYXQgaXQgcGVybWl0cyB0byB1c2UgeW91ciBvd24gSFJURiBkYXRhc2V0LiBUaGlzIGxpYnJhcnlcbiAqIGNhbiBiZSB1c2VkIGFzIGEgcmVndWxhciBub2RlIGluc2lkZSB0aGUgV2ViIEF1ZGlvIEFQSS5cbiAqIEBhdXRob3IgQXJuYXUgSnVsacOgXG4gKiBAdmVyc2lvbiAwLjEuMVxuICovXG5pbXBvcnQga2R0IGZyb20gJ2tkdCc7XG5cbi8qKlxuICogQGNsYXNzIEJpbmF1cmFsRklSXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbmF1cmFsRklSIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gb3B0aW9ucy5hdWRpb0NvbnRleHQ7XG4gICAgdGhpcy5ocnRmRGF0YXNldCA9IFtdO1xuICAgIHRoaXMuaHJ0ZkRhdGFzZXRMZW5ndGggPSAwO1xuICAgIHRoaXMudHJlZSA9IC0xO1xuICAgIHRoaXMucG9zaXRpb24gPSB7fTtcbiAgICB0aGlzLm5leHRQb3NpdGlvbiA9IHt9O1xuICAgIHRoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbiA9IDIwIC8gMTAwMDtcblxuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cbiAgICAvLyBUd28gc3ViIGF1ZGlvIGdyYXBocyBjcmVhdGlvbjpcbiAgICAvLyAtIG1haW5Db252b2x2ZXIgd2hpY2ggcmVwcmVzZW50cyB0aGUgY3VycmVudCBzdGF0ZVxuICAgIC8vIC0gYW5kIHNlY29uZGFyeUNvbnZvbHZlciB3aGljaCByZXByZXNlbnRzIHRoZSBwb3RlbnRpYWwgdGFyZ2V0IHN0YXRlXG4gICAgLy8gICB3aGVuIG1vdmluZyBzb3VuZCB0byBhIG5ldyBwb3NpdGlvblxuXG4gICAgdGhpcy5tYWluQ29udm9sdmVyID0gbmV3IENvbnZvbHZlckF1ZGlvR3JhcGgoe2F1ZGlvQ29udGV4dDogdGhpcy5hdWRpb0NvbnRleHR9KTtcbiAgICB0aGlzLm1haW5Db252b2x2ZXIuZ2Fpbi52YWx1ZSA9IDE7XG4gICAgdGhpcy5pbnB1dC5jb25uZWN0KHRoaXMubWFpbkNvbnZvbHZlci5pbnB1dCk7XG5cbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlciA9IG5ldyBDb252b2x2ZXJBdWRpb0dyYXBoKHthdWRpb0NvbnRleHQ6IHRoaXMuYXVkaW9Db250ZXh0fSk7XG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuZ2Fpbi52YWx1ZSA9IDA7XG4gICAgdGhpcy5pbnB1dC5jb25uZWN0KHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmlucHV0KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRoZSBiaW5hdXJhbEZJUk5vZGUgdG8gdGhlIFdlYiBBdWRpbyBncmFwaFxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIG5vZGUgRGVzdGluYXRpb24gbm9kZVxuICAgKi9cbiAgY29ubmVjdChub2RlKSB7XG4gICAgdGhpcy5tYWluQ29udm9sdmVyLmNvbm5lY3Qobm9kZSk7XG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuY29ubmVjdChub2RlKTtcbiAgICByZXR1cm4gdGhpczsgLy8gRm9yIGNoYWluYWJpbGl0eVxuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3QgdGhlIGJpbmF1cmFsRklSTm9kZSBmcm9tIHRoZSBXZWIgQXVkaW8gZ3JhcGhcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBub2RlIERlc3RpbmF0aW9uIG5vZGVcbiAgICovXG4gIGRpc2Nvbm5lY3Qobm9kZSkge1xuICAgIHRoaXMubWFpbkNvbnZvbHZlci5kaXNjb25uZWN0KG5vZGUpO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmRpc2Nvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7IC8vIEZvciBjaGFpbmFiaWxpdHlcblxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBIUlRGIERhdGFzZXQgdG8gYmUgdXNlZCB3aXRoIHRoZSB2aXJ0dWFsIHNvdXJjZS5cbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBocnRmRGF0YXNldCBBcnJheSBvZiBPYmplY3RzIGNvbnRhaW5pbmcgdGhlIGF6aW11dGgsIGRpc3RhbmNlLCBlbGV2YXRpb24sIHVybCBhbmQgYnVmZmVyIGZvciBlYWNoIHBvaW50XG4gICAqL1xuICBzZXQgSFJURkRhdGFzZXQoaHJ0ZkRhdGFzZXQpIHtcbiAgICB0aGlzLmhydGZEYXRhc2V0ID0gaHJ0ZkRhdGFzZXQ7XG4gICAgdGhpcy5ocnRmRGF0YXNldExlbmd0aCA9IHRoaXMuaHJ0ZkRhdGFzZXQubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhydGZEYXRhc2V0TGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBocnRmID0gdGhpcy5ocnRmRGF0YXNldFtpXTtcbiAgICAgIC8vIEF6aW11dGggYW5kIGVsZXZhdGlvbiB0byByYWRpYW5zXG4gICAgICB2YXIgYXppbXV0aFJhZGlhbnMgPSBocnRmLmF6aW11dGggKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgdmFyIGVsZXZhdGlvblJhZGlhbnMgPSBocnRmLmVsZXZhdGlvbiAqIE1hdGguUEkgLyAxODA7XG4gICAgICB2YXIgY2F0ZXNpYW5Db29yZCA9IHRoaXMuc3BoZXJpY2FsVG9DYXJ0ZXNpYW4oYXppbXV0aFJhZGlhbnMsIGVsZXZhdGlvblJhZGlhbnMsIGhydGYuZGlzdGFuY2UpO1xuICAgICAgaHJ0Zi54ID0gY2F0ZXNpYW5Db29yZC54O1xuICAgICAgaHJ0Zi55ID0gY2F0ZXNpYW5Db29yZC55O1xuICAgICAgaHJ0Zi56ID0gY2F0ZXNpYW5Db29yZC56O1xuICAgIH1cbiAgICB0aGlzLnRyZWUgPSBrZHQuY3JlYXRlS2RUcmVlKHRoaXMuaHJ0ZkRhdGFzZXQsIHRoaXMuZGlzdGFuY2UsIFsneCcsICd5JywgJ3onXSk7XG4gIH1cblxuICBnZXQgSFJURkRhdGFzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaHJ0ZkRhdGFzZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHMgaW4gYSAzLUQgc3BhY2UuXG4gICAqIEBwcml2YXRlXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIGEgT2JqZWN0IGNvbnRhaW5pbmcgdGhyZWUgcHJvcGVydGllczogeCwgeSwgelxuICAgKiBAcGFyYW0gYiBPYmplY3QgY29udGFpbmluZyB0aHJlZSBwcm9wZXJ0aWVzOiB4LCB5LCB6XG4gICAqL1xuICBkaXN0YW5jZShhLCBiKSB7XG4gICAgLy8gTm8gbmVlZCB0byBjb21wdXRlIHNxdWFyZSByb290IGhlcmUgZm9yIGRpc3RhbmNlIGNvbXBhcmlzb24sIHRoaXMgaXMgbW9yZSBlZmZpY2llbnQuXG4gICAgcmV0dXJuIE1hdGgucG93KGEueCAtIGIueCwgMikgKyBNYXRoLnBvdyhhLnkgLSBiLnksIDIpICsgTWF0aC5wb3coYS56IC0gYi56LCAyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcG9zaXRpb24gb2YgdGhlIHZpcnR1YWwgc291cmNlXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICogQHRvZG8gSW1wbGVtZW50IEltbWVkaWF0ZSBzZXRQb3NpdGlvblxuICAgKi9cbiAgc2V0UG9zaXRpb24oYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBuZWFyZXN0IHBvc2l0aW9uIGZvciB0aGUgaW5wdXQgYXppbXV0aCwgZWxldmF0aW9uIGFuZCBkaXN0YW5jZVxuICAgICAgdmFyIG5lYXJlc3RQb3NpdGlvbiA9IHRoaXMuZ2V0UmVhbENvb3JkaW5hdGVzKGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpO1xuICAgICAgLy8gTm8gbmVlZCB0byBjaGFuZ2UgdGhlIGN1cnJlbnQgSFJURiBsb2FkZWQgaWYgc2V0dGVkIHBvc2l0aW9uIGVxdWFsIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIGlmIChuZWFyZXN0UG9zaXRpb24uYXppbXV0aCAhPT0gdGhpcy5wb3NpdGlvbi5hemltdXRoIHx8IG5lYXJlc3RQb3NpdGlvbi5lbGV2YXRpb24gIT09IHRoaXMucG9zaXRpb24uZWxldmF0aW9uIHx8IG5lYXJlc3RQb3NpdGlvbi5kaXN0YW5jZSAhPT0gdGhpcy5wb3NpdGlvbi5kaXN0YW5jZSkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY3Jvc3NmYWRpbmcgaXMgYWN0aXZlXG4gICAgICAgIGlmICh0aGlzLmlzQ3Jvc3NmYWRpbmcoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgdmFsdWUgd2FpdGluZyB0byBiZSBzZXRcbiAgICAgICAgICBpZiAodGhpcy5jaGFuZ2VXaGVuRmluaXNoQ3Jvc3NmYWRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3AgdGhlIHBhc3Qgc2V0SW50ZXJ2YWwgZXZlbnQuXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU2F2ZSB0aGUgcG9zaXRpb25cbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5hemltdXRoID0gbmVhcmVzdFBvc2l0aW9uLmF6aW11dGg7XG4gICAgICAgICAgdGhpcy5uZXh0UG9zaXRpb24uZWxldmF0aW9uID0gbmVhcmVzdFBvc2l0aW9uLmVsZXZhdGlvbjtcbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5kaXN0YW5jZSA9IG5lYXJlc3RQb3NpdGlvbi5kaXN0YW5jZTtcblxuICAgICAgICAgIC8vIFN0YXJ0IHRoZSBzZXRJbnRlcnZhbDogd2FpdCB1bnRpbCB0aGUgY3Jvc3NmYWRpbmcgaXMgZmluaXNoZWQuXG4gICAgICAgICAgdGhpcy5pbnRlcnZhbElEID0gd2luZG93LnNldEludGVydmFsKHRoaXMuc2V0TGFzdFBvc2l0aW9uLmJpbmQodGhpcyksIDAuMDA1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5hemltdXRoID0gbmVhcmVzdFBvc2l0aW9uLmF6aW11dGg7XG4gICAgICAgICAgdGhpcy5uZXh0UG9zaXRpb24uZWxldmF0aW9uID0gbmVhcmVzdFBvc2l0aW9uLmVsZXZhdGlvbjtcbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5kaXN0YW5jZSA9IG5lYXJlc3RQb3NpdGlvbi5kaXN0YW5jZTtcbiAgICAgICAgICB0aGlzLnJlYWxseVN0YXJ0UG9zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzOyAvLyBGb3IgY2hhaW5hYmlsaXR5XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpZiB0aGUgZ2FpbnMgYXJlIGluIGEgY3Jvc3NmYWRpbmcgb3Igbm90LlxuICAgKiBAZmFsc2VcbiAgICovXG4gIGlzQ3Jvc3NmYWRpbmcoKSB7XG4gICAgLy8gVGhlIHJhbXBzIGFyZSBub3QgZmluaXNoZWQsIHNvIHRoZSBjcm9zc2ZhZGluZyBpcyBub3QgZmluaXNoZWRcbiAgICBpZiAodGhpcy5tYWluQ29udm9sdmVyLmdhaW4udmFsdWUgIT09IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWxseSBjaGFuZ2UgdGhlIHBvc2l0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWFsbHlTdGFydFBvc2l0aW9uKCkge1xuXG4gICAgLy8gU2F2ZSB0aGUgY3VycmVudCBwb3NpdGlvblxuICAgIHRoaXMucG9zaXRpb24uYXppbXV0aCA9IHRoaXMubmV4dFBvc2l0aW9uLmF6aW11dGg7XG4gICAgdGhpcy5wb3NpdGlvbi5lbGV2YXRpb24gPSB0aGlzLm5leHRQb3NpdGlvbi5lbGV2YXRpb247XG4gICAgdGhpcy5wb3NpdGlvbi5kaXN0YW5jZSA9IHRoaXMubmV4dFBvc2l0aW9uLmRpc3RhbmNlO1xuICAgIC8vIExvYWQgdGhlIG5ldyBwb3NpdGlvbiBpbiB0aGUgY29udm9sdmVyIG5vdCBhY3RpdmUgKHNlY29uZGFyeUNvbnZvbHZlcilcbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5idWZmZXIgPSB0aGlzLmdldEhSVEYodGhpcy5wb3NpdGlvbi5hemltdXRoLCB0aGlzLnBvc2l0aW9uLmVsZXZhdGlvbiwgdGhpcy5wb3NpdGlvbi5kaXN0YW5jZSk7XG4gICAgLy8gRG8gdGhlIGNyb3NzZmFkaW5nIGJldHdlZW4gbWFpbkNvbnZvbHZlciBhbmQgc2Vjb25kYXJ5Q29udm9sdmVyXG4gICAgdGhpcy5jcm9zc2ZhZGluZygpO1xuXG4gICAgLy8gQ2hhbmdlIGN1cnJlbnQgbWFpbkNvbnZvbHZlclxuICAgIHZhciBhY3RpdmUgPSB0aGlzLm1haW5Db252b2x2ZXI7XG4gICAgdGhpcy5tYWluQ29udm9sdmVyID0gdGhpcy5zZWNvbmRhcnlDb252b2x2ZXI7XG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIgPSBhY3RpdmU7XG5cbiAgICBpZiAodGhpcy5jaGFuZ2VXaGVuRmluaXNoQ3Jvc3NmYWRpbmcpIHtcbiAgICAgIHRoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nID0gZmFsc2U7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZHVyYXRpb24gb2YgY3Jvc3NmYWRpbmcgaW4gbWlsaXNlY29uZHMuXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gZHVyYXRpb24gRHVyYXRpb24gb2YgdGhlIGNyb3NzZmFkaW5nIGluIG1pbGlzZWNvbmRzXG4gICAqL1xuICBzZXRDcm9zc2ZhZGVEdXJhdGlvbihkdXJhdGlvbikge1xuICAgIGlmIChkdXJhdGlvbikge1xuICAgICAgLy8gTWlsaXNlY29uZHMgdG8gc1xuICAgICAgdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbiA9IGR1cmF0aW9uIC8gMTAwMDtcbiAgICAgIHJldHVybiB0aGlzOyAvLyBmb3IgY2hhaW5hYmlsaXR5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNyb3NzZmFkZUR1cmF0aW9uIHNldHRpbmcgZXJyb3JcIik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZHVyYXRpb24gb2YgY3Jvc3NmYWRpbmcgaW4gbWlsaXNlY29uZHMuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldENyb3NzZmFkZUR1cmF0aW9uKCkge1xuICAgIC8vIFNlY29uZHMgdG8gbXNcbiAgICByZXR1cm4gdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbiAqIDEwMDA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSB2aXJ0dWFsIHNvdXJjZS5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogRG8gdGhlIGNyb3NzZmFkaW5nIGJldHdlZW4gdGhlIGdhaW5Ob2RlIGFjdGl2ZSBhbmQgaW5hY3RpdmUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjcm9zc2ZhZGluZygpIHtcbiAgICAvLyBEbyB0aGUgY3Jvc3NmYWRpbmcgYmV0d2VlbiBtYWluQ29udm9sdmVyIGFuZCBzZWNvbmRhcnlDb252b2x2ZXJcbiAgICB2YXIgZ3VhcmRJbnRlcnZhbCA9IDAuMDI7XG4gICAgdGhpcy5tYWluQ29udm9sdmVyLmdhaW4uc2V0VmFsdWVBdFRpbWUoMSwgdGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBndWFyZEludGVydmFsKTtcbiAgICB0aGlzLm1haW5Db252b2x2ZXIuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLCB0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGd1YXJkSW50ZXJ2YWwgKyB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uKTtcblxuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCwgdGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBndWFyZEludGVydmFsKTtcbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDEsIHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZ3VhcmRJbnRlcnZhbCArIHRoaXMuY3Jvc3NmYWRlRHVyYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgSFJURiBmaWxlIGZvciBhbiBlc3BlY2lmaWMgcG9zaXRpb25cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIGF6aW11dGggQXppbXV0aCBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byAtMTgwIGZvciBzb3VyY2Ugb24geW91ciBsZWZ0LCBhbmQgZnJvbSAwIHRvIDE4MCBmb3Igc291cmNlIG9uIHlvdXIgcmlnaHRcbiAgICogQHBhcmFtIGVsZXZhdGlvbiBFbGV2YXRpb24gaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gOTAgZm9yIHNvdXJjZSBhYm92ZSB5b3VyIGhlYWQsIDAgZm9yIHNvdXJjZSBpbiBmcm9udCBvZiB5b3VyIGhlYWQsIGFuZCBmcm9tIDAgdG8gLTkwIGZvciBzb3VyY2UgYmVsb3cgeW91ciBoZWFkKVxuICAgKiBAcGFyYW0gZGlzdGFuY2UgRGlzdGFuY2UgaW4gbWV0ZXJzXG4gICAqL1xuICBnZXRIUlRGKGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpIHtcbiAgICB2YXIgbmVhcmVzdCA9IHRoaXMuZ2V0TmVhcmVzdFBvaW50KGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpO1xuICAgIC8vIFJldHVybiBidWZmZXIgb2YgbmVhcmVzdCBwb3NpdGlvbiBmb3IgdGhlIGlucHV0IHZhbHVlc1xuICAgIHJldHVybiBuZWFyZXN0LmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdGhlIHNwaGVyaWNhbCB0byBjYXJ0ZXNpYW4gY29vcmRpbmF0ZXMuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSBhemltdXRoIEF6aW11dGggaW4gcmFkaWFuc1xuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiByYWRpYW5zXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIHNwaGVyaWNhbFRvQ2FydGVzaWFuKGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogZGlzdGFuY2UgKiBNYXRoLnNpbihhemltdXRoKSxcbiAgICAgIHk6IGRpc3RhbmNlICogTWF0aC5jb3MoYXppbXV0aCksXG4gICAgICB6OiBkaXN0YW5jZSAqIE1hdGguc2luKGVsZXZhdGlvbilcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbmVhcmVzdCBwb3NpdGlvbiBmb3IgYW4gaW5wdXQgcG9zaXRpb24uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSBhemltdXRoIEF6aW11dGggaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gLTE4MCBmb3Igc291cmNlIG9uIHlvdXIgbGVmdCwgYW5kIGZyb20gMCB0byAxODAgZm9yIHNvdXJjZSBvbiB5b3VyIHJpZ2h0XG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIDkwIGZvciBzb3VyY2UgYWJvdmUgeW91ciBoZWFkLCAwIGZvciBzb3VyY2UgaW4gZnJvbnQgb2YgeW91ciBoZWFkLCBhbmQgZnJvbSAwIHRvIC05MCBmb3Igc291cmNlIGJlbG93IHlvdXIgaGVhZClcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgZ2V0UmVhbENvb3JkaW5hdGVzKGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpIHtcbiAgICB2YXIgbmVhcmVzdCA9IHRoaXMuZ2V0TmVhcmVzdFBvaW50KGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpO1xuICAgIC8vIFJldHVybiBhemltdXRoLCBlbGV2YXRpb24gYW5kIGRpc3RhbmNlIG9mIG5lYXJlc3QgcG9zaXRpb24gZm9yIHRoZSBpbnB1dCB2YWx1ZXNcbiAgICByZXR1cm4ge1xuICAgICAgYXppbXV0aDogbmVhcmVzdC5hemltdXRoLFxuICAgICAgZWxldmF0aW9uOiBuZWFyZXN0LmVsZXZhdGlvbixcbiAgICAgIGRpc3RhbmNlOiBuZWFyZXN0LmRpc3RhbmNlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5lYXJlc3QgcG9zaXRpb24gZm9yIGFuIGlucHV0IHBvc2l0aW9uLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIGdldE5lYXJlc3RQb2ludChhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgLy8gRGVncmVlcyB0byByYWRpYW5zIGZvciB0aGUgYXppbXV0aCBhbmQgZWxldmF0aW9uXG4gICAgdmFyIGF6aW11dGhSYWRpYW5zID0gYXppbXV0aCAqIE1hdGguUEkgLyAxODA7XG4gICAgdmFyIGVsZXZhdGlvblJhZGlhbnMgPSBlbGV2YXRpb24gKiBNYXRoLlBJIC8gMTgwO1xuICAgIC8vIENvbnZlcnQgc3BoZXJpY2FsIGNvb3JkaW5hdGVzIHRvIGNhcnRlc2lhblxuICAgIHZhciBjYXJ0ZXNpYW5Db29yZCA9IHRoaXMuc3BoZXJpY2FsVG9DYXJ0ZXNpYW4oYXppbXV0aFJhZGlhbnMsIGVsZXZhdGlvblJhZGlhbnMsIGRpc3RhbmNlKTtcbiAgICAvLyBHZXQgdGhlIG5lYXJlc3QgSFJURiBmaWxlIGZvciB0aGUgZGVzaXJlZCBwb3NpdGlvblxuICAgIHZhciBuZWFyZXN0ID0gdGhpcy50cmVlLm5lYXJlc3QoY2FydGVzaWFuQ29vcmQsIDEpWzBdO1xuXG4gICAgcmV0dXJuIG5lYXJlc3RbMF07XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIHNldCB0aGUgbmV4dFBvc2l0aW9uIHBvc2l0aW9uIGlmIHRoZSByYW1wcyBhcmUgbm90IGluIGEgY3Jvc3NmYWRpbmdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldExhc3RQb3NpdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuaXNDcm9zc2ZhZGluZygpKSB7XG4gICAgICB0aGlzLnJlYWxseVN0YXJ0UG9zaXRpb24oKTtcbiAgICB9XG4gIH1cbn1cblxuXG4vKipcbiAqIENvbnZvbHZlciBzdWIgYXVkaW8gZ3JhcGggY2xhc3NcbiAqL1xuY2xhc3MgQ29udm9sdmVyQXVkaW9HcmFwaCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG9wdGlvbnMuYXVkaW9Db250ZXh0O1xuICAgIHRoaXMuZ2Fpbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5jb252Tm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUNvbnZvbHZlcigpO1xuICAgIHRoaXMuY29udk5vZGUubm9ybWFsaXplID0gZmFsc2U7XG4gICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udk5vZGUpO1xuXG4gICAgLy8gSGFjayB0byBmb3JjZSBhdWRpb1BhcmFtIGFjdGl2ZSB3aGVuIHRoZSBzb3VyY2UgaXMgbm90IGFjdGl2ZVxuICAgIHRoaXMub3NjaWxsYXRvck5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgdGhpcy5nYWluT3NjaWxsYXRvck5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5vc2NpbGxhdG9yTm9kZS5jb25uZWN0KHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlKTtcbiAgICB0aGlzLmdhaW5Pc2NpbGxhdG9yTm9kZS5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xuICAgIHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlLmdhaW4udmFsdWUgPSAwO1xuICAgIHRoaXMub3NjaWxsYXRvck5vZGUuc3RhcnQoMCk7XG4gIH1cblxuICBnZXQgaW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2Fpbk5vZGU7XG4gIH1cblxuICBnZXQgZ2FpbigpIHtcbiAgICByZXR1cm4gdGhpcy5nYWluTm9kZS5nYWluO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgYnVmZmVyIGluIHRoZSBjb252b2x2ZXJOb2RlXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHZhbHVlIEF1ZGlvQnVmZmVyIE9iamVjdC5cbiAgICovXG4gIHNldCBidWZmZXIodmFsdWUpIHtcbiAgICB0aGlzLmNvbnZOb2RlLmJ1ZmZlciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3QgdGhlIENvbnZvbHZlckF1ZGlvR3JhcGggdG8gYSBub2RlXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLmNvbnZOb2RlLmNvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgQ29udm9sdmVyQXVkaW9HcmFwaCB0byBhIG5vZGVcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBub2RlIERlc3RpbmF0aW9uIG5vZGVcbiAgICovXG4gIGRpc2Nvbm5lY3Qobm9kZSkge1xuICAgIHRoaXMuY29udk5vZGUuZGlzY29ubmVjdChub2RlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIl19