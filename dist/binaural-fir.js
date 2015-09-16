/**
 * @fileOverview
 * The binauralFIR node provides binaural listening to the user.
 * This library allows you to use your own HRTF dataset.
 * This library can be used as a regular node inside the Web Audio API.
 * @author Arnau Julià
 * @version 0.1.2
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
  /**
   * Instanciate 2 convolver nodes
   * When moving a source, a crossfade is triggered
   * between these 2 convolvers.
   * A, B, A=>B, B=>A, A=>B+Next, B=>A+Next
   * The two latter exist in "pending mode".
   */

  function BinauralFIR(options) {
    _classCallCheck(this, BinauralFIR);

    this.audioContext = options.audioContext;
    this.hrtfDataset = [];
    this.hrtfDatasetLength = 0;
    this.tree = undefined;
    this.position = {};
    this.crossfadeDuration = 0.02;
    this.input = this.audioContext.createGain();
    this.state = "A"; // States in ["A", "B", "A2B", "B2A"]
    this.target = undefined;
    this.pendingPosition = undefined;
    this.convolverA = new ConvolverAudioGraph({
      audioContext: this.audioContext
    });
    this.convolverA.gain.value = 1;
    this.input.connect(this.convolverA.input);
    this.convolverB = new ConvolverAudioGraph({
      audioContext: this.audioContext
    });
    this.convolverB.gain.value = 0;
    this.input.connect(this.convolverB.input);
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
      this.convolverA.connect(node);
      this.convolverB.connect(node);
      return this;
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
      this.convolverA.disconnect(node);
      this.convolverB.disconnect(node);
      return this;
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
     */
  }, {
    key: 'setPosition',
    value: function setPosition(azimuth, elevation, distance) {
      // Calculate the nearest position for the input azimuth, elevation and distance
      var nearestPosition = this.getRealCoordinates(azimuth, elevation, distance);
      if (nearestPosition.azimuth !== this.position.azimuth || nearestPosition.elevation !== this.position.elevation || nearestPosition.distance !== this.position.distance) {
        switch (this.state) {
          case "A":
            this.state = "A2B";
            this.pendingPosition = undefined;
            this._crossfadeTo("B", nearestPosition);
            break;
          case "B":
            this.state = "B2A";
            this.pendingPosition = undefined;
            this._crossfadeTo("A", nearestPosition);
            break;
          case "A2B":
            this.pendingPosition = nearestPosition;
            break;
          case "B2A":
            this.pendingPosition = nearestPosition;
            break;
        }
      }
    }
  }, {
    key: '_crossfadeTo',
    value: function _crossfadeTo(target, position) {
      // Set the new target position
      this.position = position;
      this.target = target;
      var hrtf = this.getHRTF(this.position.azimuth, this.position.elevation, this.position.distance);
      var now = this.audioContext.currentTime;
      var next = now + this.crossfadeDuration;
      switch (this.target) {
        case "A":
          this.convolverA.buffer = hrtf;
          this.convolverB.gain.linearRampToValueAtTime(0, next);
          this.convolverA.gain.linearRampToValueAtTime(1, next);
          break;
        case "B":
          this.convolverB.buffer = hrtf;
          this.convolverA.gain.linearRampToValueAtTime(0, next);
          this.convolverB.gain.linearRampToValueAtTime(1, next);
          break;
      }
      // Trigger event when linearRamp is reached
      function endRamp(tg) {
        if (tg.audioContext.currentTime > next) {
          window.clearInterval(intervalID);
          // Target state is reached
          tg.state = tg.target;
          tg.target = undefined;
          // Trigger if there is a pending position
          if (tg.pendingPosition) {
            tg.setPosition(tg.pendingPosition.azimuth, tg.pendingPosition.elevation, tg.pendingPosition.distance);
          }
        }
      }
      var intervalID = window.setInterval(endRamp, 10, this);
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
        return this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9iaW5hdXJhbC1maXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBUWdCLEtBQUs7Ozs7Ozs7O0lBS0EsV0FBVzs7Ozs7Ozs7O0FBUW5CLFdBUlEsV0FBVyxDQVFsQixPQUFPLEVBQUU7MEJBUkYsV0FBVzs7QUFTNUIsUUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0FBQ3pDLFFBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7QUFDM0IsUUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7QUFDdEIsUUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbkIsUUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM5QixRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUMsUUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDakIsUUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7QUFDeEIsUUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7QUFDakMsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG1CQUFtQixDQUFDO0FBQ3hDLGtCQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7S0FDaEMsQ0FBQyxDQUFDO0FBQ0gsUUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUMvQixRQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztBQUN4QyxrQkFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO0tBQ2hDLENBQUMsQ0FBQztBQUNILFFBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDL0IsUUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUUzQzs7Ozs7Ozs7Ozs7OztlQTlCa0IsV0FBVzs7V0FzQ3ZCLGlCQUFDLElBQUksRUFBRTtBQUNaLFVBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLFVBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7V0FRUyxvQkFBQyxJQUFJLEVBQUU7QUFDZixVQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxVQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxhQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FvQ08sa0JBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTs7QUFFYixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2pGOzs7Ozs7Ozs7Ozs7V0FVVSxxQkFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTs7QUFFeEMsVUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUUsVUFBSSxlQUFlLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksZUFBZSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtBQUNySyxnQkFBUSxJQUFJLENBQUMsS0FBSztBQUNoQixlQUFLLEdBQUc7QUFDTixnQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBQ2pDLGdCQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUN4QyxrQkFBTTtBQUFBLEFBQ1IsZUFBSyxHQUFHO0FBQ04sZ0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLGdCQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDeEMsa0JBQU07QUFBQSxBQUNSLGVBQUssS0FBSztBQUNSLGdCQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUN2QyxrQkFBTTtBQUFBLEFBQ1IsZUFBSyxLQUFLO0FBQ1IsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLGtCQUFNO0FBQUEsU0FDVDtPQUNGO0tBQ0Y7OztXQUVXLHNCQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7O0FBRTdCLFVBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLFVBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRyxVQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztBQUN4QyxVQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0FBQ3hDLGNBQVEsSUFBSSxDQUFDLE1BQU07QUFDakIsYUFBSyxHQUFHO0FBQ04sY0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQzlCLGNBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RCxjQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEQsZ0JBQU07QUFBQSxBQUNSLGFBQUssR0FBRztBQUNOLGNBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUM5QixjQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEQsY0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RELGdCQUFNO0FBQUEsT0FDVDs7QUFFRCxlQUFTLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDbkIsWUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUU7QUFDdEMsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRWpDLFlBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNyQixZQUFFLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQzs7QUFFdEIsY0FBSSxFQUFFLENBQUMsZUFBZSxFQUFFO0FBQ3RCLGNBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztXQUN2RztTQUNGO09BQ0Y7QUFDRCxVQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDeEQ7Ozs7Ozs7Ozs7V0FRbUIsOEJBQUMsUUFBUSxFQUFFO0FBQzdCLFVBQUksUUFBUSxFQUFFOztBQUVaLFlBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3pDLGVBQU8sSUFBSSxDQUFDO09BQ2IsTUFBTTtBQUNMLGNBQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztPQUNwRDtLQUNGOzs7Ozs7OztXQU1tQixnQ0FBRzs7QUFFckIsYUFBTyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0tBQ3RDOzs7Ozs7OztXQU1VLHVCQUFHO0FBQ1osYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7Ozs7Ozs7OztXQVNNLGlCQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO0FBQ3BDLFVBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQzs7QUFFakUsYUFBTyxPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ3ZCOzs7Ozs7Ozs7OztXQVNtQiw4QkFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtBQUNqRCxhQUFPO0FBQ0wsU0FBQyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUMvQixTQUFDLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQy9CLFNBQUMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7T0FDbEMsQ0FBQztLQUNIOzs7Ozs7Ozs7OztXQVNpQiw0QkFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtBQUMvQyxVQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7O0FBRWpFLGFBQU87QUFDTCxlQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87QUFDeEIsaUJBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztBQUM1QixnQkFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO09BQzNCLENBQUM7S0FDSDs7Ozs7Ozs7Ozs7V0FTYyx5QkFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTs7QUFFNUMsVUFBSSxjQUFjLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBQzdDLFVBQUksZ0JBQWdCLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDOztBQUVqRCxVQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUUzRixVQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsYUFBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkI7OztTQW5NYyxhQUFDLFdBQVcsRUFBRTtBQUMzQixVQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUMvQixVQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7O0FBRWpELFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDL0MsWUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFL0IsWUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUNsRCxZQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDdEQsWUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0YsWUFBSSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLFlBQUksQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUN6QixZQUFJLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7T0FDMUI7QUFDRCxVQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDaEY7U0FFYyxlQUFHO0FBQ2hCLGFBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUN6Qjs7O1NBakZrQixXQUFXOzs7cUJBQVgsV0FBVzs7SUF3UTFCLG1CQUFtQjtBQUNaLFdBRFAsbUJBQW1CLENBQ1gsT0FBTyxFQUFFOzBCQURqQixtQkFBbUI7O0FBRXJCLFFBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztBQUN6QyxRQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDL0MsUUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELFFBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUNoQyxRQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7OztBQUdyQyxRQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUMzRCxRQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN6RCxRQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNyRCxRQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQyxRQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDdkMsUUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDOUI7O2VBZkcsbUJBQW1COzs7Ozs7Ozs7V0F3Q2hCLGlCQUFDLElBQUksRUFBRTtBQUNaLFVBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7V0FRUyxvQkFBQyxJQUFJLEVBQUU7QUFDZixVQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixhQUFPLElBQUksQ0FBQztLQUNiOzs7U0FyQ1EsZUFBRztBQUNWLGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7O1NBRU8sZUFBRztBQUNULGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7S0FDM0I7Ozs7Ozs7OztTQU9TLGFBQUMsS0FBSyxFQUFFO0FBQ2hCLFVBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUM5Qjs7O1NBaENHLG1CQUFtQiIsImZpbGUiOiJlczYvYmluYXVyYWwtZmlyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBUaGUgYmluYXVyYWxGSVIgbm9kZSBwcm92aWRlcyBiaW5hdXJhbCBsaXN0ZW5pbmcgdG8gdGhlIHVzZXIuXG4gKiBUaGlzIGxpYnJhcnkgYWxsb3dzIHlvdSB0byB1c2UgeW91ciBvd24gSFJURiBkYXRhc2V0LlxuICogVGhpcyBsaWJyYXJ5IGNhbiBiZSB1c2VkIGFzIGEgcmVndWxhciBub2RlIGluc2lkZSB0aGUgV2ViIEF1ZGlvIEFQSS5cbiAqIEBhdXRob3IgQXJuYXUgSnVsacOgXG4gKiBAdmVyc2lvbiAwLjEuMlxuICovXG5pbXBvcnQga2R0IGZyb20gJ2tkdCc7XG5cbi8qKlxuICogQGNsYXNzIEJpbmF1cmFsRklSXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbmF1cmFsRklSIHtcbiAgLyoqXG4gICAqIEluc3RhbmNpYXRlIDIgY29udm9sdmVyIG5vZGVzXG4gICAqIFdoZW4gbW92aW5nIGEgc291cmNlLCBhIGNyb3NzZmFkZSBpcyB0cmlnZ2VyZWRcbiAgICogYmV0d2VlbiB0aGVzZSAyIGNvbnZvbHZlcnMuXG4gICAqIEEsIEIsIEE9PkIsIEI9PkEsIEE9PkIrTmV4dCwgQj0+QStOZXh0XG4gICAqIFRoZSB0d28gbGF0dGVyIGV4aXN0IGluIFwicGVuZGluZyBtb2RlXCIuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5hdWRpb0NvbnRleHQgPSBvcHRpb25zLmF1ZGlvQ29udGV4dDtcbiAgICB0aGlzLmhydGZEYXRhc2V0ID0gW107XG4gICAgdGhpcy5ocnRmRGF0YXNldExlbmd0aCA9IDA7XG4gICAgdGhpcy50cmVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucG9zaXRpb24gPSB7fTtcbiAgICB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uID0gMC4wMjtcbiAgICB0aGlzLmlucHV0ID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIHRoaXMuc3RhdGUgPSBcIkFcIjsgIC8vIFN0YXRlcyBpbiBbXCJBXCIsIFwiQlwiLCBcIkEyQlwiLCBcIkIyQVwiXVxuICAgIHRoaXMudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGVuZGluZ1Bvc2l0aW9uID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY29udm9sdmVyQSA9IG5ldyBDb252b2x2ZXJBdWRpb0dyYXBoKHtcbiAgICAgIGF1ZGlvQ29udGV4dDogdGhpcy5hdWRpb0NvbnRleHRcbiAgICB9KTtcbiAgICB0aGlzLmNvbnZvbHZlckEuZ2Fpbi52YWx1ZSA9IDE7XG4gICAgdGhpcy5pbnB1dC5jb25uZWN0KHRoaXMuY29udm9sdmVyQS5pbnB1dCk7XG4gICAgdGhpcy5jb252b2x2ZXJCID0gbmV3IENvbnZvbHZlckF1ZGlvR3JhcGgoe1xuICAgICAgYXVkaW9Db250ZXh0OiB0aGlzLmF1ZGlvQ29udGV4dFxuICAgIH0pO1xuICAgIHRoaXMuY29udm9sdmVyQi5nYWluLnZhbHVlID0gMDtcbiAgICB0aGlzLmlucHV0LmNvbm5lY3QodGhpcy5jb252b2x2ZXJCLmlucHV0KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRoZSBiaW5hdXJhbEZJUk5vZGUgdG8gdGhlIFdlYiBBdWRpbyBncmFwaFxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIG5vZGUgRGVzdGluYXRpb24gbm9kZVxuICAgKi9cbiAgY29ubmVjdChub2RlKSB7XG4gICAgdGhpcy5jb252b2x2ZXJBLmNvbm5lY3Qobm9kZSk7XG4gICAgdGhpcy5jb252b2x2ZXJCLmNvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgYmluYXVyYWxGSVJOb2RlIGZyb20gdGhlIFdlYiBBdWRpbyBncmFwaFxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIG5vZGUgRGVzdGluYXRpb24gbm9kZVxuICAgKi9cbiAgZGlzY29ubmVjdChub2RlKSB7XG4gICAgdGhpcy5jb252b2x2ZXJBLmRpc2Nvbm5lY3Qobm9kZSk7XG4gICAgdGhpcy5jb252b2x2ZXJCLmRpc2Nvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IEhSVEYgRGF0YXNldCB0byBiZSB1c2VkIHdpdGggdGhlIHZpcnR1YWwgc291cmNlLlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIGhydGZEYXRhc2V0IEFycmF5IG9mIE9iamVjdHMgY29udGFpbmluZyB0aGUgYXppbXV0aCwgZGlzdGFuY2UsIGVsZXZhdGlvbiwgdXJsIGFuZCBidWZmZXIgZm9yIGVhY2ggcG9pbnRcbiAgICovXG4gIHNldCBIUlRGRGF0YXNldChocnRmRGF0YXNldCkge1xuICAgIHRoaXMuaHJ0ZkRhdGFzZXQgPSBocnRmRGF0YXNldDtcbiAgICB0aGlzLmhydGZEYXRhc2V0TGVuZ3RoID0gdGhpcy5ocnRmRGF0YXNldC5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaHJ0ZkRhdGFzZXRMZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhydGYgPSB0aGlzLmhydGZEYXRhc2V0W2ldO1xuICAgICAgLy8gQXppbXV0aCBhbmQgZWxldmF0aW9uIHRvIHJhZGlhbnNcbiAgICAgIHZhciBhemltdXRoUmFkaWFucyA9IGhydGYuYXppbXV0aCAqIE1hdGguUEkgLyAxODA7XG4gICAgICB2YXIgZWxldmF0aW9uUmFkaWFucyA9IGhydGYuZWxldmF0aW9uICogTWF0aC5QSSAvIDE4MDtcbiAgICAgIHZhciBjYXRlc2lhbkNvb3JkID0gdGhpcy5zcGhlcmljYWxUb0NhcnRlc2lhbihhemltdXRoUmFkaWFucywgZWxldmF0aW9uUmFkaWFucywgaHJ0Zi5kaXN0YW5jZSk7XG4gICAgICBocnRmLnggPSBjYXRlc2lhbkNvb3JkLng7XG4gICAgICBocnRmLnkgPSBjYXRlc2lhbkNvb3JkLnk7XG4gICAgICBocnRmLnogPSBjYXRlc2lhbkNvb3JkLno7XG4gICAgfVxuICAgIHRoaXMudHJlZSA9IGtkdC5jcmVhdGVLZFRyZWUodGhpcy5ocnRmRGF0YXNldCwgdGhpcy5kaXN0YW5jZSwgWyd4JywgJ3knLCAneiddKTtcbiAgfVxuXG4gIGdldCBIUlRGRGF0YXNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5ocnRmRGF0YXNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50cyBpbiBhIDMtRCBzcGFjZS5cbiAgICogQHByaXZhdGVcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gYSBPYmplY3QgY29udGFpbmluZyB0aHJlZSBwcm9wZXJ0aWVzOiB4LCB5LCB6XG4gICAqIEBwYXJhbSBiIE9iamVjdCBjb250YWluaW5nIHRocmVlIHByb3BlcnRpZXM6IHgsIHksIHpcbiAgICovXG4gIGRpc3RhbmNlKGEsIGIpIHtcbiAgICAvLyBObyBuZWVkIHRvIGNvbXB1dGUgc3F1YXJlIHJvb3QgaGVyZSBmb3IgZGlzdGFuY2UgY29tcGFyaXNvbiwgdGhpcyBpcyBtb3JlIGVmZmljaWVudC5cbiAgICByZXR1cm4gTWF0aC5wb3coYS54IC0gYi54LCAyKSArIE1hdGgucG93KGEueSAtIGIueSwgMikgKyBNYXRoLnBvdyhhLnogLSBiLnosIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBwb3NpdGlvbiBvZiB0aGUgdmlydHVhbCBzb3VyY2VcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBhemltdXRoIEF6aW11dGggaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gLTE4MCBmb3Igc291cmNlIG9uIHlvdXIgbGVmdCwgYW5kIGZyb20gMCB0byAxODAgZm9yIHNvdXJjZSBvbiB5b3VyIHJpZ2h0XG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIDkwIGZvciBzb3VyY2UgYWJvdmUgeW91ciBoZWFkLCAwIGZvciBzb3VyY2UgaW4gZnJvbnQgb2YgeW91ciBoZWFkLCBhbmQgZnJvbSAwIHRvIC05MCBmb3Igc291cmNlIGJlbG93IHlvdXIgaGVhZClcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgc2V0UG9zaXRpb24oYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuICAgIC8vIENhbGN1bGF0ZSB0aGUgbmVhcmVzdCBwb3NpdGlvbiBmb3IgdGhlIGlucHV0IGF6aW11dGgsIGVsZXZhdGlvbiBhbmQgZGlzdGFuY2VcbiAgICB2YXIgbmVhcmVzdFBvc2l0aW9uID0gdGhpcy5nZXRSZWFsQ29vcmRpbmF0ZXMoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSk7XG4gICAgaWYgKG5lYXJlc3RQb3NpdGlvbi5hemltdXRoICE9PSB0aGlzLnBvc2l0aW9uLmF6aW11dGggfHwgbmVhcmVzdFBvc2l0aW9uLmVsZXZhdGlvbiAhPT0gdGhpcy5wb3NpdGlvbi5lbGV2YXRpb24gfHwgbmVhcmVzdFBvc2l0aW9uLmRpc3RhbmNlICE9PSB0aGlzLnBvc2l0aW9uLmRpc3RhbmNlKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgY2FzZSBcIkFcIjpcbiAgICAgICAgICB0aGlzLnN0YXRlID0gXCJBMkJcIjtcbiAgICAgICAgICB0aGlzLnBlbmRpbmdQb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLl9jcm9zc2ZhZGVUbyhcIkJcIiwgbmVhcmVzdFBvc2l0aW9uKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkJcIjpcbiAgICAgICAgICB0aGlzLnN0YXRlID0gXCJCMkFcIjtcbiAgICAgICAgICB0aGlzLnBlbmRpbmdQb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLl9jcm9zc2ZhZGVUbyhcIkFcIiwgbmVhcmVzdFBvc2l0aW9uKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkEyQlwiOlxuICAgICAgICAgIHRoaXMucGVuZGluZ1Bvc2l0aW9uID0gbmVhcmVzdFBvc2l0aW9uO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQjJBXCI6XG4gICAgICAgICAgdGhpcy5wZW5kaW5nUG9zaXRpb24gPSBuZWFyZXN0UG9zaXRpb247XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2Nyb3NzZmFkZVRvKHRhcmdldCwgcG9zaXRpb24pIHtcbiAgICAvLyBTZXQgdGhlIG5ldyB0YXJnZXQgcG9zaXRpb25cbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgbGV0IGhydGYgPSB0aGlzLmdldEhSVEYodGhpcy5wb3NpdGlvbi5hemltdXRoLCB0aGlzLnBvc2l0aW9uLmVsZXZhdGlvbiwgdGhpcy5wb3NpdGlvbi5kaXN0YW5jZSk7XG4gICAgbGV0IG5vdyA9IHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuICAgIGxldCBuZXh0ID0gbm93ICsgdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbjtcbiAgICBzd2l0Y2ggKHRoaXMudGFyZ2V0KSB7XG4gICAgICBjYXNlIFwiQVwiOlxuICAgICAgICB0aGlzLmNvbnZvbHZlckEuYnVmZmVyID0gaHJ0ZjtcbiAgICAgICAgdGhpcy5jb252b2x2ZXJCLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgbmV4dCk7XG4gICAgICAgIHRoaXMuY29udm9sdmVyQS5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDEsIG5leHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJCXCI6XG4gICAgICAgIHRoaXMuY29udm9sdmVyQi5idWZmZXIgPSBocnRmO1xuICAgICAgICB0aGlzLmNvbnZvbHZlckEuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLCBuZXh0KTtcbiAgICAgICAgdGhpcy5jb252b2x2ZXJCLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMSwgbmV4dCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBUcmlnZ2VyIGV2ZW50IHdoZW4gbGluZWFyUmFtcCBpcyByZWFjaGVkXG4gICAgZnVuY3Rpb24gZW5kUmFtcCh0Zykge1xuICAgICAgaWYgKHRnLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSA+IG5leHQpIHtcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgICAgIC8vIFRhcmdldCBzdGF0ZSBpcyByZWFjaGVkXG4gICAgICAgIHRnLnN0YXRlID0gdGcudGFyZ2V0O1xuICAgICAgICB0Zy50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIFRyaWdnZXIgaWYgdGhlcmUgaXMgYSBwZW5kaW5nIHBvc2l0aW9uXG4gICAgICAgIGlmICh0Zy5wZW5kaW5nUG9zaXRpb24pIHtcbiAgICAgICAgICB0Zy5zZXRQb3NpdGlvbih0Zy5wZW5kaW5nUG9zaXRpb24uYXppbXV0aCwgdGcucGVuZGluZ1Bvc2l0aW9uLmVsZXZhdGlvbiwgdGcucGVuZGluZ1Bvc2l0aW9uLmRpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgaW50ZXJ2YWxJRCA9IHdpbmRvdy5zZXRJbnRlcnZhbChlbmRSYW1wLCAxMCwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkdXJhdGlvbiBvZiBjcm9zc2ZhZGluZyBpbiBtaWxpc2Vjb25kcy5cbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBkdXJhdGlvbiBEdXJhdGlvbiBvZiB0aGUgY3Jvc3NmYWRpbmcgaW4gbWlsaXNlY29uZHNcbiAgICovXG4gIHNldENyb3NzZmFkZUR1cmF0aW9uKGR1cmF0aW9uKSB7XG4gICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICAvLyBNaWxpc2Vjb25kcyB0byBzXG4gICAgICB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uID0gZHVyYXRpb24gLyAxMDAwO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNyb3NzZmFkZUR1cmF0aW9uIHNldHRpbmcgZXJyb3JcIik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZHVyYXRpb24gb2YgY3Jvc3NmYWRpbmcgaW4gbWlsaXNlY29uZHMuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldENyb3NzZmFkZUR1cmF0aW9uKCkge1xuICAgIC8vIFNlY29uZHMgdG8gbXNcbiAgICByZXR1cm4gdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbiAqIDEwMDA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSB2aXJ0dWFsIHNvdXJjZS5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBIUlRGIGZpbGUgZm9yIGFuIGVzcGVjaWZpYyBwb3NpdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIGdldEhSVEYoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuICAgIHZhciBuZWFyZXN0ID0gdGhpcy5nZXROZWFyZXN0UG9pbnQoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSk7XG4gICAgLy8gUmV0dXJuIGJ1ZmZlciBvZiBuZWFyZXN0IHBvc2l0aW9uIGZvciB0aGUgaW5wdXQgdmFsdWVzXG4gICAgcmV0dXJuIG5lYXJlc3QuYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGUgc3BoZXJpY2FsIHRvIGNhcnRlc2lhbiBjb29yZGluYXRlcy5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIGF6aW11dGggQXppbXV0aCBpbiByYWRpYW5zXG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIHJhZGlhbnNcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgc3BoZXJpY2FsVG9DYXJ0ZXNpYW4oYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBkaXN0YW5jZSAqIE1hdGguc2luKGF6aW11dGgpLFxuICAgICAgeTogZGlzdGFuY2UgKiBNYXRoLmNvcyhhemltdXRoKSxcbiAgICAgIHo6IGRpc3RhbmNlICogTWF0aC5zaW4oZWxldmF0aW9uKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBuZWFyZXN0IHBvc2l0aW9uIGZvciBhbiBpbnB1dCBwb3NpdGlvbi5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIGF6aW11dGggQXppbXV0aCBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byAtMTgwIGZvciBzb3VyY2Ugb24geW91ciBsZWZ0LCBhbmQgZnJvbSAwIHRvIDE4MCBmb3Igc291cmNlIG9uIHlvdXIgcmlnaHRcbiAgICogQHBhcmFtIGVsZXZhdGlvbiBFbGV2YXRpb24gaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gOTAgZm9yIHNvdXJjZSBhYm92ZSB5b3VyIGhlYWQsIDAgZm9yIHNvdXJjZSBpbiBmcm9udCBvZiB5b3VyIGhlYWQsIGFuZCBmcm9tIDAgdG8gLTkwIGZvciBzb3VyY2UgYmVsb3cgeW91ciBoZWFkKVxuICAgKiBAcGFyYW0gZGlzdGFuY2UgRGlzdGFuY2UgaW4gbWV0ZXJzXG4gICAqL1xuICBnZXRSZWFsQ29vcmRpbmF0ZXMoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuICAgIHZhciBuZWFyZXN0ID0gdGhpcy5nZXROZWFyZXN0UG9pbnQoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSk7XG4gICAgLy8gUmV0dXJuIGF6aW11dGgsIGVsZXZhdGlvbiBhbmQgZGlzdGFuY2Ugb2YgbmVhcmVzdCBwb3NpdGlvbiBmb3IgdGhlIGlucHV0IHZhbHVlc1xuICAgIHJldHVybiB7XG4gICAgICBhemltdXRoOiBuZWFyZXN0LmF6aW11dGgsXG4gICAgICBlbGV2YXRpb246IG5lYXJlc3QuZWxldmF0aW9uLFxuICAgICAgZGlzdGFuY2U6IG5lYXJlc3QuZGlzdGFuY2VcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbmVhcmVzdCBwb3NpdGlvbiBmb3IgYW4gaW5wdXQgcG9zaXRpb24uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSBhemltdXRoIEF6aW11dGggaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gLTE4MCBmb3Igc291cmNlIG9uIHlvdXIgbGVmdCwgYW5kIGZyb20gMCB0byAxODAgZm9yIHNvdXJjZSBvbiB5b3VyIHJpZ2h0XG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIDkwIGZvciBzb3VyY2UgYWJvdmUgeW91ciBoZWFkLCAwIGZvciBzb3VyY2UgaW4gZnJvbnQgb2YgeW91ciBoZWFkLCBhbmQgZnJvbSAwIHRvIC05MCBmb3Igc291cmNlIGJlbG93IHlvdXIgaGVhZClcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgZ2V0TmVhcmVzdFBvaW50KGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpIHtcbiAgICAvLyBEZWdyZWVzIHRvIHJhZGlhbnMgZm9yIHRoZSBhemltdXRoIGFuZCBlbGV2YXRpb25cbiAgICB2YXIgYXppbXV0aFJhZGlhbnMgPSBhemltdXRoICogTWF0aC5QSSAvIDE4MDtcbiAgICB2YXIgZWxldmF0aW9uUmFkaWFucyA9IGVsZXZhdGlvbiAqIE1hdGguUEkgLyAxODA7XG4gICAgLy8gQ29udmVydCBzcGhlcmljYWwgY29vcmRpbmF0ZXMgdG8gY2FydGVzaWFuXG4gICAgdmFyIGNhcnRlc2lhbkNvb3JkID0gdGhpcy5zcGhlcmljYWxUb0NhcnRlc2lhbihhemltdXRoUmFkaWFucywgZWxldmF0aW9uUmFkaWFucywgZGlzdGFuY2UpO1xuICAgIC8vIEdldCB0aGUgbmVhcmVzdCBIUlRGIGZpbGUgZm9yIHRoZSBkZXNpcmVkIHBvc2l0aW9uXG4gICAgdmFyIG5lYXJlc3QgPSB0aGlzLnRyZWUubmVhcmVzdChjYXJ0ZXNpYW5Db29yZCwgMSlbMF07XG4gICAgcmV0dXJuIG5lYXJlc3RbMF07XG4gIH1cbn1cblxuXG4vKipcbiAqIENvbnZvbHZlciBzdWIgYXVkaW8gZ3JhcGggY2xhc3NcbiAqL1xuY2xhc3MgQ29udm9sdmVyQXVkaW9HcmFwaCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG9wdGlvbnMuYXVkaW9Db250ZXh0O1xuICAgIHRoaXMuZ2Fpbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5jb252Tm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUNvbnZvbHZlcigpO1xuICAgIHRoaXMuY29udk5vZGUubm9ybWFsaXplID0gZmFsc2U7XG4gICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udk5vZGUpO1xuXG4gICAgLy8gSGFjayB0byBmb3JjZSBhdWRpb1BhcmFtIGFjdGl2ZSB3aGVuIHRoZSBzb3VyY2UgaXMgbm90IGFjdGl2ZVxuICAgIHRoaXMub3NjaWxsYXRvck5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgdGhpcy5nYWluT3NjaWxsYXRvck5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5vc2NpbGxhdG9yTm9kZS5jb25uZWN0KHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlKTtcbiAgICB0aGlzLmdhaW5Pc2NpbGxhdG9yTm9kZS5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xuICAgIHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlLmdhaW4udmFsdWUgPSAwO1xuICAgIHRoaXMub3NjaWxsYXRvck5vZGUuc3RhcnQoMCk7XG4gIH1cblxuICBnZXQgaW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2Fpbk5vZGU7XG4gIH1cblxuICBnZXQgZ2FpbigpIHtcbiAgICByZXR1cm4gdGhpcy5nYWluTm9kZS5nYWluO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgYnVmZmVyIGluIHRoZSBjb252b2x2ZXJOb2RlXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHZhbHVlIEF1ZGlvQnVmZmVyIE9iamVjdC5cbiAgICovXG4gIHNldCBidWZmZXIodmFsdWUpIHtcbiAgICB0aGlzLmNvbnZOb2RlLmJ1ZmZlciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3QgdGhlIENvbnZvbHZlckF1ZGlvR3JhcGggdG8gYSBub2RlXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLmNvbnZOb2RlLmNvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgQ29udm9sdmVyQXVkaW9HcmFwaCB0byBhIG5vZGVcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBub2RlIERlc3RpbmF0aW9uIG5vZGVcbiAgICovXG4gIGRpc2Nvbm5lY3Qobm9kZSkge1xuICAgIHRoaXMuY29udk5vZGUuZGlzY29ubmVjdChub2RlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIl19