/**
 * @fileOverview
 * The binauralFIR node provides binaural listening to the user.
 * This library allows you to use your own HRTF dataset.
 * This library can be used as a regular node inside the Web Audio API.
 * @author Arnau Julià
 * @version 0.1.2
 */
import kdt from 'kdt';

/**
 * @class BinauralFIR
 */
export default class BinauralFIR {
  /**
   * Instanciate 2 convolver nodes
   * When moving a source, a crossfade is triggered
   * between these 2 convolvers.
   * A, B, A=>B, B=>A, A=>B+Next, B=>A+Next
   * The two latter exist in "pending mode".
   */
  constructor(options) {
    this.audioContext = options.audioContext;
    this.hrtfDataset = [];
    this.hrtfDatasetLength = 0;
    this.tree = undefined;
    this.position = {};
    this.crossfadeDuration = 0.02;
    this.input = this.audioContext.createGain();
    this.state = "A";  // States in ["A", "B", "A2B", "B2A"]
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
   * Connects the binauralFIRNode to the Web Audio graph
   * @public
   * @chainable
   * @param node Destination node
   */
  connect(node) {
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
  disconnect(node) {
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
   */
  setPosition(azimuth, elevation, distance) {
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

  _crossfadeTo(target, position) {
    // Set the new target position
    this.position = position;
    this.target = target;
    let hrtf = this.getHRTF(this.position.azimuth, this.position.elevation, this.position.distance);
    let now = this.audioContext.currentTime;
    let next = now + this.crossfadeDuration;
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
    let intervalID = window.setInterval(endRamp, 10, this);
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
      return this;
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
    };
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
    };
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
}


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
}
