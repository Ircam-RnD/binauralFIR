/* written in ECMAscript 6 */
/**
 * @fileOverview
 * The binauralFIR node provides binaural listening to the user. The novelty of
 * this library is that it permits to use your own HRTF dataset. This library
 * can be used as a regular node inside the Web Audio API.
 * @author Arnau Julià
 * @version 0.1.1
 */
var kdt = require('kdt');

/**
 * @class BinauralFIR
 */

class BinauralFIR {

  constructor(options) {
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

    this.mainConvolver = new ConvolverAudioGraph({audioContext: this.audioContext});
    this.mainConvolver.gain.value = 1;
    this.input.connect(this.mainConvolver.input);

    this.secondaryConvolver = new ConvolverAudioGraph({audioContext: this.audioContext});
    this.secondaryConvolver.gain.value = 0;
    this.input.connect(this.secondaryConvolver.input);

  }

  /**
   * Connects the binauralFIRNode to the Web Audio graph
   * @public
   * @chainable
   * @param node Destination node
   */
  connect(node) {
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
  disconnect(node) {
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
  set HRTFDataset(hrtfDataset) {
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
    this.tree = kdt.createKdTree(this.hrtfDataset, this.distance, ['x', 'y', 'z']);
  }

  get HRTFDataset() {
    return this.hrtfDataset;
  }

  /**
   * Calculate the distance between two points in a 3-D space.
   * @private
   * @chainable
   * @param a Object containing three properties: x, y, z
   * @param b Object containing three properties: x, y, z
   */
  distance(a, b) {
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
  setPosition(azimuth, elevation, distance) {

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
  isCrossfading() {
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
  reallyStartPosition() {

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
  setCrossfadeDuration(duration) {
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
  getCrossfadeDuration() {
    // Seconds to ms
    return this.crossfadeDuration * 1000;
  }

  /**
   * Get the current position of the virtual source.
   * @public
   */
  getPosition() {
    return this.position;
  }

  /**
   * Do the crossfading between the gainNode active and inactive.
   * @private
   */
  crossfading() {
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
  getHRTF(azimuth, elevation, distance) {
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
  sphericalToCartesian(azimuth, elevation, distance) {
    return {
      x: distance * Math.sin(azimuth),
      y: distance * Math.cos(azimuth),
      z: distance * Math.sin(elevation)
    }
  }

  /**
   * Get the nearest position for an input position.
   * @private
   * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
   * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
   * @param distance Distance in meters
   */
  getRealCoordinates(azimuth, elevation, distance) {
    var nearest = this.getNearestPoint(azimuth, elevation, distance);
    // Return azimuth, elevation and distance of nearest position for the input values
    return {
      azimuth: nearest.azimuth,
      elevation: nearest.elevation,
      distance: nearest.distance
    }
  }

  /**
   * Get the nearest position for an input position.
   * @private
   * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
   * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
   * @param distance Distance in meters
   */
  getNearestPoint(azimuth, elevation, distance) {
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
  setLastPosition() {
    if (!this.isCrossfading()) {
      this.reallyStartPosition();
    }
  }


};

/**
 * Convolver sub audio graph class
 */

class ConvolverAudioGraph {

  constructor(options) {
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

  get input() {
    return this.gainNode;
  }

  get gain() {
    return this.gainNode.gain;
  }

  /**
   * Set the buffer in the convolverNode
   * @public
   * @param value AudioBuffer Object.
   */
  set buffer(value) {
    this.convNode.buffer = value;
  }

  /**
   * Connect the ConvolverAudioGraph to a node
   * @public
   * @chainable
   * @param node Destination node
   */
  connect(node) {
    this.convNode.connect(node);
    return this;
  }

  /**
   * Disconnect the ConvolverAudioGraph to a node
   * @public
   * @chainable
   * @param node Destination node
   */
  disconnect(node) {
    this.convNode.disconnect(node);
    return this;
  }

};

// CommonJS function export
module.exports = BinauralFIR;
