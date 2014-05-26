/**
 * @fileOverview
 * Javascript binaural audio library
 * @author Arnau Julià, Samuel Goldszmidt
 * @version 0.1.1
 */
var kdt = require('kdt');
/**
 * Function invocation pattern for a binaural node.
 * @public
 */
var createBinauralFIR = function createBinauralFIR(hrtf) {
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
      value: {azimuth: 0, elevation: 0, distance: 0}
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
      value: function(hrtf) {
        //this.setBuffer(hrtf);
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

        return this;  // for chainability
      }
    },

    /**
     * Web audio API-like connect method.
     * @public
     * @chainable
     */
    connect: {
      enumerable: true,
      value: function(node) {
        this.mainConvolver.connect(node);
        this.secondaryConvolver.connect(node);
        return this;  // for chainability
      }
    },

    /**
     * Web audio API-like disconnect method.
     * @public
     * @chainable
     */
    disconnect: {
      enumerable: true,
      value: function(output) {
        this.mainConvolver.disconnect(node);
        this.secondaryConvolver.disconnect(node);
        return this; // for chainability
      }
    },

    HRTFDataset: {
      enumerable : true,
      configurable : true,
      set: function(hrtfDataset){
        // TODO: test if hrtfDataset in the appropriate format
        // at least: [{azimuth:, elevation: , distance:, buffer: } ..]
        // pb we need to know the spherical coordonate system.
        // We need to be VERY explicit and clear on this question for the user: what do we expect from him.
        this.hrtfDataset = hrtfDataset;

        this.hrtfDatasetLength = this.hrtfDataset.length;
        // Functionnal programming should be cleaner
        // !!! Convert to good value (radian etc.)
        for(var i=0; i<this.hrtfDatasetLength; i++){
          var hrtf = this.hrtfDataset[i];
          var azimuthRadians = hrtf.azimuth*Math.PI/180;
          var elevationRadians = hrtf.elevation*Math.PI/180;
          var catesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, hrtf.distance);
          hrtf.x = catesianCoord.x;
          hrtf.y = catesianCoord.y;
          hrtf.z = catesianCoord.z;
        }
        this.tree = kdt.createKdTree(this.hrtfDataset, this.distance, ['x', 'y', 'z']);
        // Here we should have the azimuth and elevation steps of our HRTF files
        // but no necessity to set the position
        // this.setPosition(this.position.azimuth, this.position.elevation, this.position.distance);
      },
      get: function(){
        return this.hrtfDataset;
      }
    },

    distance: {
      value: function(a, b){
        // No need to compute square root here for distance comparison, this is more eficient.
        return Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2) +  Math.pow(a.z - b.z, 2);
      }
    },

    /**
     * Set Position of virtual source
     * @public
     * @chainable
     * @todo Implement Immediate setPosition
     */
    setPosition: {
      enumerable: true,
      value: function(azimuth, elevation, distance, optImmediate) {
        // We must be explicit too with the user: he must give us the right values in the adequate coordonate system
        // the one choosen in HRTFDataset
        if (arguments.length === 3 || arguments.length === 4 ) {
          // Calculate the nearest position for the input azimuth, elevation and distance
          var nearestPosition = this.getRealCoordinates(azimuth, elevation, distance);
          // No need to change the current HRTF loaded if setted position equal current position
          // I guess we could do: this.position != {azimuth: ,elevation: ,distance: }
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
              this.nextPosition.azimuth = realCoordinates.azimuth;
              this.nextPosition.elevation = realCoordinates.elevation;
              this.nextPosition.distance = realCoordinates.distance;
              this.nextImmediate = optImmediate || false;

              // Start the setInterval: wait until the crossfading is finished.
              this.intervalID = window.setInterval(this.setLastPosition.bind(this), 0.005);
            } else {
              this.nextPosition.azimuth = realCoordinates.azimuth;
              this.nextPosition.elevation = realCoordinates.elevation;
              this.nextPosition.distance = realCoordinates.distance;
              this.reallyStartPosition();
            }
          
            return this; // for chainability
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
        // The ramps are not finished, the crossfading is not finished
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
        // Load the new position in the convolver not active
        this.secondaryConvolver.buffer = this.getHRTF(this.position.azimuth, this.position.elevation, this.position.distance);
        // Do the crossfading between mainConvolver and secondaryConvolver
        this.crossfading();

        // Update the memories
        this.updateMemories();

        if(this.changeWhenFinishCrossfading){
          this.changeWhenFinishCrossfading = false;
          clearInterval(this.intervalID);
        }
      }
    },

    /**
     * Get the time before crossfading end
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
     * Set the crossfade duration in ms
     * @public
     * @chainable
     */
    setCrossfadeDuration: {
      enumerable: true,
      value: function(duration) {
        if (duration) {
          // ms to s
          this.crossfadeDuration = duration/1000;
          return this; // for chainability
        } else {
          throw "CrossfadeDuration setting error";
        }
      }
    },

    /**
     * Get the crossfade duration in ms
     * @public
     */
    getCrossfadeDuration: {
      enumerable: true,
      value: function(){
        // s to ms
        return this.crossfadeDuration*1000;
      }
    },

    /**
     * Get the specified metadata about current HRTF set
     * @public
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
     * Get player status.
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
        // Do the crossfading
        this.mainConvolver.gain.setValueAtTime(1, audioContext.currentTime+0.02);
        this.mainConvolver.gain.linearRampToValueAtTime(0, audioContext.currentTime+0.02+this.crossfadeDuration);

        this.secondaryConvolver.gain.setValueAtTime(0, audioContext.currentTime+0.02);
        this.secondaryConvolver.gain.linearRampToValueAtTime(1, audioContext.currentTime+0.02+this.crossfadeDuration);
      }
    },

    /**
     * Update the convolverNode active and inactive
     * @private
     */
    updateMemories: {
      enumerable: false,
      value: function() {
        var active = this.mainConvolver;
        this.mainConvolver = this.secondaryConvolver;
        this.secondaryConvolver = active;
      }
    },

    getHRTF: {
      enumerable: false,
      value: function(azimuth, elevation, distance){
        //azimuth and elevation: degrees to radians
        var azimuthRadians = azimuth*Math.PI/180;
        var elevationRadians = elevation*Math.PI/180;
        //convert spherical coordinates to cartesian 
        var cartesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, distance);
        var nearest = this.tree.nearest(cartesianCoord, 1)[0];
        //return buffer of nearest position for the input values
        return nearest[0].buffer;
      }
    },

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

    getRealCoordinates: {
      // don't think it's usefull.
      enumerable: false,
      value: function(azimuth, elevation, distance){
        //azimuth and elevation: degrees to radians
        var azimuthRadians = azimuth*Math.PI/180;
        var elevationRadians = elevation*Math.PI/180;
        //convert spherical coordinates to cartesian
        var cartesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, distance);
        var nearest = this.tree.nearest(cartesianCoord, 1)[0];
        //return azimuth, elevation and distance of nearest position for the input values
        return {
          azimuth: nearest[0].azimuth,
          elevation: nearest[0].elevation,
          distance: nearest[0].distance
        }
      }

    },

    /**
     * Try to set the 'nextPosition' position if the ramps are not in a crossfading
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
    buffer: {
      enumerable : true,
      configurable : true,
      set: function(value){
        this.convNode.buffer = value;
      }
    },
    connect: {
      enumerable: true,
      value: function(node) {
        this.convNode.connect(node);
        return this;
      }
    },
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
  return binauralFIR.init(hrtf);
};

// CommonJS function export
module.exports = createBinauralFIR;
