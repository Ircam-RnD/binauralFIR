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
    hrtfData: {
      writable: true,
      value: []
    },
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
    currentHRTFBufferIndex: {
      writable: true,
      value: -1
    },
    bufferIndex: {
      writable: true,
      value: 0
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

    /**
     * Set a HRTF set and update the current position with the new HRTF.
     * @public
     * @chainable
     */
     /*
    loadHRTF: {
      enumerable: true,
      value: function(buffer) {
        if (buffer) {
          // Save the new HRTF set
          this.setBuffer(buffer);
          // Update the current position with the new HRTF
          this.setPosition(this.position.azimuth, this.position.elevation, this.position.distance);
          return this; // for chainability
        } else {
          throw "HRTF setting error";
        }
      }
    },
    */
    HRTFDataset: {
      enumerable : true,
      configurable : true,
      set: function(hrtfDataset){
        // TODO: test if hrtfDataset in the appropriate format
        // at least: [{azimuth:, elevation: , distance:, buffer: } ..]
        this.hrtfDataset = hrtfDataset;

        this.hrtfDatasetLength = this.hrtfDataset.length;
        // Functionnal programming should be cleaner
        // !!! Convert to good value (radian etc.)
        for(var i=0; i<this.hrtfDatasetLength; i++){
          var hrtf = this.hrtfDataset[i];
          hrtf.x = hrtf.distance*Math.sin(hrtf.elevation)*Math.cos(hrtf.azimuth);
          hrtf.y = hrtf.distance*Math.sin(hrtf.elevation)*Math.sin(hrtf.azimuth);
          hrtf.z = hrtf.distance*Math.cos(hrtf.elevation);
          console.log(hrtf.x, hrtf.y, hrtf.z);
        }
        this.tree = kdt.createKdTree(this.hrtfDataset, this.distance, ['x', 'y', 'z']);
        console.log("this.tree");
        // Here we should have the azimuth and elevation steps of our HRTF files
        this.setPosition(this.position.azimuth, this.position.elevation, this.position.distance);
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
        if (arguments.length === 3 || arguments.length === 4 ) {
          // Derive the value of the next buffer
          var bufferIndex = this.getBufferValue(azimuth, elevation, distance);

          // Check if it is necessary to change the active buffer.
          // I guess we could do: this.position != {azimuth: ,elevation: ,distance: }
          if (bufferIndex !== this.currentHRTFBufferIndex) {

            // Check if the crossfading is active
            if (this.isCrossfading() === true) {
              // Check it there are a value waiting to be set
              if (this.changeWhenFinishCrossfading === true ) {
                // Stop the past setInterval event.
                clearInterval(this.intervalID);
              } else {
                this.changeWhenFinishCrossfading = true;
              }
              // Save the position
              this.nextPosition.azimuth = azimuth;
              this.nextPosition.elevation = elevation;
              this.nextPosition.distance = distance;
              this.nextImmediate = optImmediate || false;

              // Start the setInterval: wait until the crossfading is finished.
              this.intervalID = window.setInterval(this.setLastPosition.bind(this), 0.005);
            } else {
              this.nextPosition.azimuth = azimuth;
              this.nextPosition.elevation = elevation;
              this.nextPosition.distance = distance;
              this.reallyStartPosition();
            }

          } else {
              // Although it is not necessary to update the HRTF buffer, we save the current position.
              this.position.azimuth = azimuth;
              this.position.elevation = elevation;
              this.position.distance = distance;
              // optImmediate not implemented
              this.immediate = optImmediate || false;
          }

          return this; // for chainability
        } else {
          throw "Position setting error";
        }
      }
    },

    /**
     * Get if the gains are in a crossfading or not.
     * @public
     */
    isCrossfading: {
      enumerable: true,
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

        //var bufferIndex = this.getBufferValue(this.position.azimuth, this.position.elevation, this.position.distance);
        // Load the new position in the convolver not active
        //this.secondaryConvolver.buffer = this.hrtfData[bufferIndex];
        this.secondaryConvolver.buffer = this.getHRTF(this.position.azimuth, this.position.elevation, this.position.distance);
        // Do the crossfading between convNodeInactive and convNodeActive
        this.crossfading();
        // Update the value of the current HRTF Position
        this.currentHRTFBufferIndex = bufferIndex;

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
     * @public
     */
    getTimeBeforeCrossfadingEnd: {
      enumerable: true,
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

        if(this.isCrossfading() === true)
        {
          console.log(audioContext.currentTime, "problem!!");
        }
        //if(this.gainNode[this.convNodeActive].gain.value!==1||this.gainNode[this.convNodeInactive].gain.value!==0){
        if(this.mainConvolver.gain.value !== 1){
          console.log(audioContext.currentTime, "problem!!");
        }

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

    /**
     *
     * @private
     */
     /*
    setBuffer: {
      enumerable: false,
      value: function(buffer) {
        if (buffer) {
          this.hrtfData = buffer;
        } else {
          throw "buffer getting error";
        }
      }
    },
    */

    /**
     * Get the index buffer value for one specified position (azimuth, elevation, distance)
     * @private
     * @todo Have to be adapted to the new standard format
     */
    getBufferValue: {
      enumerable: false,
      value: function(azimuth, elevation, distance){
        if (arguments.length === 3) {
          return parseInt(azimuth*this.hrtfData.length/360, 10);
        } else {
          throw "buffer getting error";
        }
      }
    },

    getHRTF: {
      enumerable: false,
      value: function(azimuth, elevation, distance){
        var x = distance*Math.sin(elevation)*Math.cos(azimuth);
        var y = distance*Math.sin(elevation)*Math.sin(azimuth);
        var z = distance*Math.cos(elevation);
        var nearest = this.tree.nearest({ x: x, y: y, z: z}, 1)[0];
        console.log(nearest);
        /*
        for(var i=0; i<this.hrtfDataset.length; i++){
          if(this.hrtfDataset.azimuth == azimuth && this.hrtfDataset.elevation == elevation && this.hrtfDataset.distance == distance){
            return this.hrtfDataset[i].buffer;
          }
        }
        */
      }
    },

    getHRTFIndex: {

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
