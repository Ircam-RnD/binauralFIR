/**
 * @fileOverview
 * The binauralFIR node provides binaural listening to the user. The novelty of
 * this library is that it permits to use your own HRTF dataset. This library
 * can be used as a regular node inside the Web Audio API.
 * @author Arnau Julià, Samuel Goldszmidt
 * @version 0.1.1
 */
var kdt = require('kdt');
/**
 * Function invocation pattern for a binaural node.
 * @public
 */
var createBinauralFIR = function createBinauralFIR() {
  'use strict';

  // Ensure global availability of an "audioContext" instance of web audio AudioContext.
  window.audioContext = window.audioContext || new AudioContext() || new webkitAudioContext();

  /**
   * BinauralFIR object as an ECMAScript5 properties object.
   */

  var binauralFIRObject = {

    // Private properties
    hrtfDataset: {
      writable: true,
      value: []
    },
    hrtfDatasetLength: {
      writable: true,
      value: 0
    },
    tree: {
      writable: true,
      value: -1
    },

    position: {
      writable: true,
      value: {azimuth: 0, elevation: 0, distance: 1}
    },
    nextPosition: {
      writable: true,
      value: {}
    },
    changeWhenFinishCrossfading: {
      writable: true,
      value: false
    },
    intervalID: {
      writable: true,
    },
    crossfadeDuration: {
      writable: true,
      value: 20/1000
    },
    immediate: {
      writable: true,
      value: false
    },
    nextImmediate: {
      writable: true,
      value: false
    },
    finishCrossfadeTime: {
      writable: true,
      value: 0
    },
    input: {
      writable: true,
    },
    mainConvolver: {
      writable: true
    },
    secondaryConvolver: {
      writable: true
    },

    /**
     * Mandatory initialization method.
     * @public
     * @chainable
     */
    init: {
      enumerable: true,
      value: function() {
        this.input = audioContext.createGain();

        // Two sub audio graphs creation:
        // - mainConvolver which represents the current state
        // - and secondaryConvolver which represents the potential target state
        //   when moving sound to a new position

        this.mainConvolver = Object.create({}, convolverAudioGraph);
        this.mainConvolver.init();
        this.mainConvolver.gain.value = 1;
        this.input.connect(this.mainConvolver.input);

        this.secondaryConvolver = Object.create({}, convolverAudioGraph);
        this.secondaryConvolver.init();
        this.secondaryConvolver.gain.value = 0;
        this.input.connect(this.secondaryConvolver.input);

        return this;  // For chainability
      }
    },

    /**
     * Connects the binauralFIRNode to the Web Audio graph
     * @public
     * @chainable
     * @param node Destination node
     */
    connect: {
      enumerable: true,
      value: function(node) {
        this.mainConvolver.connect(node);
        this.secondaryConvolver.connect(node);
        return this;  // For chainability
      }
    },

    /**
     * Disconnect the binauralFIRNode from the Web Audio graph
     * @public
     * @chainable
     * @param node Destination node
     */
    disconnect: {
      enumerable: true,
      value: function(node) {
        this.mainConvolver.disconnect(node);
        this.secondaryConvolver.disconnect(node);
        return this; // For chainability
      }
    },

    /**
     * Set HRTF Dataset to be used with the virtual source.
     * @public
     * @chainable
     * @param hrtfDataset Array of Objects containing the azimuth, distance, elevation, url and buffer for each point
     */
    HRTFDataset: {
      enumerable : true,
      configurable : true,
      set: function(hrtfDataset){
        this.hrtfDataset = hrtfDataset;
        this.hrtfDatasetLength = this.hrtfDataset.length;

        for(var i=0; i<this.hrtfDatasetLength; i++){
          var hrtf = this.hrtfDataset[i];
          // Azimuth and elevation to radians
          var azimuthRadians = hrtf.azimuth*Math.PI/180;
          var elevationRadians = hrtf.elevation*Math.PI/180;
          var catesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, hrtf.distance);
          hrtf.x = catesianCoord.x;
          hrtf.y = catesianCoord.y;
          hrtf.z = catesianCoord.z;
        }
        this.tree = kdt.createKdTree(this.hrtfDataset, this.distance, ['x', 'y', 'z']);
      },
      get: function(){
        return this.hrtfDataset;
      }
    },

    /**
     * Calculate the distance between two points in a 3-D space.
     * @private
     * @chainable
     * @param a Object containing three properties: x, y, z
     * @param b Object containing three properties: x, y, z
     */
    distance: {
      enumerable: false,
      value: function(a, b){
        // No need to compute square root here for distance comparison, this is more eficient.
        return Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2) +  Math.pow(a.z - b.z, 2);
      }
    },

    /**
     * Set position of the virtual source
     * @public
     * @chainable
     * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
     * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
     * @param distance Distance in meters
     * @todo Implement Immediate setPosition
     */
    setPosition: {
      enumerable: true,
      value: function(azimuth, elevation, distance, optImmediate) {

        if (arguments.length === 3 || arguments.length === 4 ) {
          // Calculate the nearest position for the input azimuth, elevation and distance
          var nearestPosition = this.getRealCoordinates(azimuth, elevation, distance);
          // No need to change the current HRTF loaded if setted position equal current position
          //Some better way to compare them?
          if (JSON.stringify(nearestPosition) !== JSON.stringify(this.position) ) {
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
              this.nextImmediate = optImmediate || false;

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
    },

    /**
     * Get if the gains are in a crossfading or not.
     * @false
     */
    isCrossfading: {
      enumerable: false,
      value: function() {
        // The ramps are not finished, so the crossfading is not finished
        if(this.mainConvolver.gain.value !== 1){
          return true;
        }else{
          return false;
        }
      }
    },

    /**
     * Really change the position
     * @private
     */
    reallyStartPosition: {
      enumerable: false,
      value: function() {

        // Save the current position
        this.position.azimuth = this.nextPosition.azimuth;
        this.position.elevation = this.nextPosition.elevation;
        this.position.distance = this.nextPosition.distance;
        // Load the new position in the convolver not active (secondaryConvolver)
        this.secondaryConvolver.buffer = this.getHRTF(this.position.azimuth, this.position.elevation, this.position.distance);
        // Do the crossfading between mainConvolver and secondaryConvolver
        this.crossfading();

        // Change current mainConvolver
        this.changeCurrentMainConvolver();

        if(this.changeWhenFinishCrossfading){
          this.changeWhenFinishCrossfading = false;
          clearInterval(this.intervalID);
        }
      }
    },

    /**
     * Get the time before crossfading is finished
     * @false
     */
    getTimeBeforeCrossfadingEnd: {
      enumerable: false,
      value: function() {
        // If it is crossfading, return the time until finish the crossfading
        if(this.isCrossfading()){
          return this.finishCrossfadeTime - audioContext.currentTime;
        }else{
          // If it is not crossfading, return 0
          return 0;
        }
      }
    },

    /**
     * Set the duration of crossfading in miliseconds.
     * @public
     * @chainable
     * @param duration Duration of the crossfading in miliseconds
     */
    setCrossfadeDuration: {
      enumerable: true,
      value: function(duration) {
        if (duration) {
          // Miliseconds to s
          this.crossfadeDuration = duration/1000;
          return this; // for chainability
        } else {
          throw "CrossfadeDuration setting error";
        }
      }
    },

    /**
     * Get the duration of crossfading in miliseconds.
     * @public
     */
    getCrossfadeDuration: {
      enumerable: true,
      value: function(){
        // Seconds to ms
        return this.crossfadeDuration*1000;
      }
    },

    /**
     * Get metadata about the current HRTF set.
     * @public
     * param metadataName Name of the metadata you want to get.
     * @todo Waiting for new standard format.
     */
    getMetaDataAboutCurrentHRTF: {
      enumerable: true,
      value: function(metadataName){
        if (metadataName) {
          return "info of the metadata: nonimplemented";
        } else {
          throw "metadata getting error";
        }
      }
    },

    /**
     * Get the current position of the virtual source.
     * @public
     */
    getPosition: {
      enumerable: true,
      value: function() {
        return this.position;
      }
    },

    /**
     * Do the crossfading between the gainNode active and inactive.
     * @private
     */
    crossfading: {
      enumerable: false,
      value: function() {

        // Save when the crossfading will be finish
        this.finishCrossfadeTime = audioContext.currentTime+this.crossfadeDuration+0.02;
        // Do the crossfading betweem mainConvolver and secondaryConvolver
        this.mainConvolver.gain.setValueAtTime(1, audioContext.currentTime+0.02);
        this.mainConvolver.gain.linearRampToValueAtTime(0, audioContext.currentTime+0.02+this.crossfadeDuration);

        this.secondaryConvolver.gain.setValueAtTime(0, audioContext.currentTime+0.02);
        this.secondaryConvolver.gain.linearRampToValueAtTime(1, audioContext.currentTime+0.02+this.crossfadeDuration);
      }
    },

    /**
     * Change the current mainConvolver
     * @private
     */
    changeCurrentMainConvolver: {
      enumerable: false,
      value: function() {
        var active = this.mainConvolver;
        this.mainConvolver = this.secondaryConvolver;
        this.secondaryConvolver = active;
      }
    },

    /**
     * Get the HRTF file for an especific position
     * @private
     * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
     * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
     * @param distance Distance in meters
     */
    getHRTF: {
      enumerable: false,
      value: function(azimuth, elevation, distance){
        var nearest = this.getNearestPoint(azimuth, elevation, distance);
        // Return buffer of nearest position for the input values
        return nearest.buffer;
      }
    },

    /**
     * Transform the spherical to cartesian coordinates.
     * @private
     * @param azimuth Azimuth in radians
     * @param elevation Elevation in radians
     * @param distance Distance in meters
     */
    sphericalToCartesian: {
      enumerable: false,
      value: function(azimuth, elevation, distance){
        return {
          x: distance*Math.sin(azimuth),
          y: distance*Math.cos(azimuth),
          z: distance*Math.sin(elevation)
        }
      }
    },

    /**
     * Get the nearest position for an input position.
     * @private
     * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
     * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
     * @param distance Distance in meters
     */
    getRealCoordinates: {
      enumerable: false,
      value: function(azimuth, elevation, distance){
        var nearest = this.getNearestPoint(azimuth, elevation, distance);
        // Return azimuth, elevation and distance of nearest position for the input values
        return {
          azimuth: nearest.azimuth,
          elevation: nearest.elevation,
          distance: nearest.distance
        }
      }
    },

    /**
     * Get the nearest position for an input position.
     * @private
     * @param azimuth Azimuth in degrees (°): from 0 to -180 for source on your left, and from 0 to 180 for source on your right
     * @param elevation Elevation in degrees (°): from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
     * @param distance Distance in meters
     */
    getNearestPoint: {
      enumerable: false,
      value: function(azimuth, elevation, distance) {
        // Degrees to radians for the azimuth and elevation
        var azimuthRadians = azimuth*Math.PI/180;
        var elevationRadians = elevation*Math.PI/180;
        // Convert spherical coordinates to cartesian 
        var cartesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, distance);
        // Get the nearest HRTF file for the desired position
        var nearest = this.tree.nearest(cartesianCoord, 1)[0];

        return nearest[0];
      }
    },

    /**
     * Try to set the nextPosition position if the ramps are not in a crossfading
     * @private
     */
    setLastPosition: {
      enumerable: false,
      value: function() {
        if (!this.isCrossfading()) {
          this.reallyStartPosition();
        }
      }
    },

  };

  /**
   * Convolver sub audio graph object as an ECMAScript5 properties object.
   */

  var convolverAudioGraph = {

    // Private properties
    convNode: {
      writable: true
    },
    gainNode: {
      writable: true
    },
    oscillatorNode: {
      writable: true
    },
    gainOscillatorNode: {
      writable: true
    },

    /**
     * Mandatory initialization method.
     * @public
     * @chainable
     */
    init: {
      enumerable: true,
      value: function() {
        this.gainNode = audioContext.createGain();
        this.convNode = audioContext.createConvolver();
        this.convNode.normalize = false;
        this.gainNode.connect(this.convNode);

        // Hack to force audioParam active when the source is not active
        this.oscillatorNode = audioContext.createOscillator();
        this.gainOscillatorNode = audioContext.createGain();
        this.oscillatorNode.connect(this.gainOscillatorNode);
        this.gainOscillatorNode.connect(this.gainNode);
        this.gainOscillatorNode.gain.value = 0;
        this.oscillatorNode.start(0);

        return this;
      }
    },
    input: {
      enumerable : true,
      get: function(){
        return this.gainNode;
      }
    },
    gain: {
      enumerable : true,
      get: function(){
        return this.gainNode.gain;
      }
    },
    /**
     * Set the buffer in the convolverNode
     * @public
     * @param value AudioBuffer Object.
     */
    buffer: {
      enumerable : true,
      configurable : true,
      set: function(value){
        this.convNode.buffer = value;
      }
    },
    /**
     * Connect the convolverAudioGraph to a node
     * @public
     * @chainable
     * @param node Destination node
     */
    connect: {
      enumerable: true,
      value: function(node) {
        this.convNode.connect(node);
        return this;
      }
    },
    /**
     * Disconnect the convolverAudioGraph to a node
     * @public
     * @chainable
     * @param node Destination node
     */
    disconnect: {
      enumerable: true,
      value: function(node){
        this.convNode.disconnect(node);
        return this;
      }
    }

  };

  // Instantiate an object.
  var binauralFIR = Object.create({}, binauralFIRObject);
  return binauralFIR.init();
};

// CommonJS function export
module.exports = createBinauralFIR;
