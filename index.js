/**
 * @fileOverview
 * Audio Library for Binaural audio playing
 * Comments...
 * @author Arnau Julià
 * @version 0.1.0
 */

/**
 * Function invocation pattern for a binaural node.
 * @public
 */
var createBinauralFIR = function createBinauralFIR(hrtf) {
  'use strict';

  /**
   * BinauralFIR object as an ECMAScript5 properties object.
   */

  var binauralFIRObject = {

    // Private properties
    context: {
      writable: true
    },
    hrtfData: {
      writable: true
    },
    convNode: {
      writable: true,
      value: []
    },
    gainNode: {
      writable: true,
      value: []
    },
    outputNode: {
      writable: true
    },
    oscillatorNode: {
      writable: true
    },
    gainOscillatorNode: {
      writable: true
    },
    nextPosition: {
      writable: true,
      value: []
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
    position: {
      writable: true,
      value: []
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
    startedAtTime: {
      writable: true,
      value: 0
    },
    convNodeActive: {
      writable: true,
      value: 0
    },
    convNodeInactive: {
      writable: true,
      value: 1
    },
    input: {
      writable: true,
    },
    number: {
      writable: true,
      value: 0
    },
    id: {
      writable: true,
      value: false
    },

    /**
     * Mandatory initialization method.
     * @public
     * @chainable
     */
    init: {
      enumerable: true,
      value: function(hrtf) {

        this.context = window.audioContext;
        this.setBuffer(hrtf);

        //Creations
        this.input = this.context.createGain();
        this.gainNode[0] = this.context.createGain();
        this.gainNode[1] = this.context.createGain();
        this.convNode[0] = this.context.createConvolver();
        this.convNode[1] = this.context.createConvolver();
        this.convNode[0].normalize = false;
        this.convNode[1].normalize = false;
  
        //to mantain the audioParam active when the source is not active
        this.oscillatorNode = this.context.createOscillator();
        this.gainOscillatorNode = this.context.createGain();
  
        //Connections
        this.oscillatorNode.connect(this.gainOscillatorNode);
        this.gainOscillatorNode.connect(this.gainNode[0]);
        this.gainOscillatorNode.connect(this.gainNode[1]);
        this.input.connect(this.gainNode[0]);
        this.input.connect(this.gainNode[1]);
        this.gainNode[0].connect(this.convNode[0]);
        this.gainNode[1].connect(this.convNode[1]);
  
        //Value
        this.gainNode[0].gain.value = 1;
        this.gainNode[1].gain.value = 0;
        this.gainOscillatorNode.gain.value = 0;
        //If they are set through getPosition method, it's not set immediately
        // this.convNode[0].buffer = this.hrtfData[0];
        // this.convNode[1].buffer = this.hrtfData[0];
        this.oscillatorNode.start(0);
        this.position[0] = 0;
        this.position[1] = 0;
        this.position[2] = 1;
  
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
        this.convNode[0].connect(node);
        this.convNode[1].connect(node);
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
        this.convNode[0].disconnect(output);
        this.convNode[1].disconnect(output);
        return this; // for chainability
      }
    },

    /**
     * Set a HRTF set and update the current position with the new HRTF.
     * @public
     * @chainable
     */
    loadHRTF: {
      enumerable: true,
      value: function(buffer) {
        if (buffer) {
          //save the new HRTF set
          this.setBuffer(buffer);
          //update the current position with the new HRTF
          this.setPosition(this.getPosition()[0], this.getPosition()[1], this.getPosition()[2]);
          return this; // for chainability
        } else {
          throw "HRTF setting error";
        }
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
          //Derive the value of the next buffer
          var bufferIndex = this.getBufferValue(azimuth, elevation, distance);
          
          //Check if it is necessary to change the active buffer.
          if (bufferIndex !== this.currentHRTFBufferIndex) {
                        
            //Check if the crossfading is active           
            if (this.isCrossfading() === true) {              
              //Check it there are a value waiting to be set
              if (this.changeWhenFinishCrossfading === true ) {
                //Stop the past setInterval event.
                clearInterval(this.intervalID);
              } else {
                this.changeWhenFinishCrossfading = true;
              }
              //save the position
              this.nextPosition[0] = azimuth;
              this.nextPosition[1] = elevation;
              this.nextPosition[2] = distance;
              this.nextImmediate = optImmediate || false;
              
              //start the setInterval: wait until the crossfading is finished.
              this.intervalID = window.setInterval(this.setLastPosition.bind(this), 0.005);
            } else {
              this.nextPosition[0] = azimuth;
              this.nextPosition[1] = elevation;
              this.nextPosition[2] = distance;
              this.reallyStartPosition();
            }  
   
          } else {
              //Although it is not necessary to update the HRTF buffer, we save the current position.
              this.position[0] = azimuth;
              this.position[1] = elevation;
              this.position[2] = distance;
              //optImmediate not implemented
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
        //The ramps are not finished, the crossfading is not finished
        if(this.gainNode[this.convNodeActive].gain.value!==1||this.gainNode[this.convNodeInactive].gain.value!==0) {
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

        //Save the current position (maybe better in an object?)
        this.position[0] = this.nextPosition[0];
        this.position[1] = this.nextPosition[1];
        this.position[2] = this.nextPosition[2];

        var bufferIndex = this.getBufferValue(this.position[0], this.position[1], this.position[2]);

        //Load the new position in the convolver not active
        this.convNode[this.convNodeInactive].buffer = this.hrtfData[bufferIndex];
        //Do the crossfading between convNodeInactive and convNodeActive
        this.crossfading();
        //Update the value of the current HRTF Position
        this.currentHRTFBufferIndex = bufferIndex;

        //Update the memories
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
        //if it is crossfading, return the time until finish the crossfading
        if(this.isCrossfading()){
          return this.finishCrossfadeTime - this.context.currentTime;
        }else{
        //if it is not crossfading, return 0
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
          //ms to s
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
        //s to ms
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
          return "info of the metadata: nonimplemented"
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
        //position[0] = azimuth;
        //position[1] = elevation;
        //position[2] = distance;
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
        if(this.gainNode[this.convNodeActive].gain.value!==1||this.gainNode[this.convNodeInactive].gain.value!==0){
          console.log(audioContext.currentTime, "problem!!");
        }

        //save when the crossfading will be finish
        this.finishCrossfadeTime = this.context.currentTime+this.crossfadeDuration+0.02;
        //Do crossfading
        this.gainNode[this.convNodeActive].gain.setValueAtTime(1, this.context.currentTime+0.02);
        this.gainNode[this.convNodeActive].gain.linearRampToValueAtTime(0, this.context.currentTime+0.02+this.crossfadeDuration);
        
        this.gainNode[this.convNodeInactive].gain.setValueAtTime(0, this.context.currentTime+0.02);
        this.gainNode[this.convNodeInactive].gain.linearRampToValueAtTime(1, this.context.currentTime+0.02+this.crossfadeDuration);
      }
    },

    /**
     * Update the convolverNode active and inactive
     * @private
     */
    updateMemories: {
      enumerable: false,
      value: function() {
        var aactive = this.convNodeActive;
        this.convNodeActive = this.convNodeInactive;
        this.convNodeInactive = aactive;
      }
    },

    /**
     * Update the convolverNode active and inactive
     * @private
     */
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

    /**
     * Get the index buffer value for one specified position (azimuth, elevation, distance)
     * @private
     * @todo Have to be adapted to the new standard format
     */
    getBufferValue: {
      enumerable: false,
      value: function(azimuth, elevation, distance){
        if (arguments.length===3) {
          return parseInt(azimuth*this.hrtfData.length/360, 10);
        } else {
          throw "buffer getting error";
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

  // Instantiate an object.
  var binauralFIR = Object.create({}, binauralFIRObject);
  return binauralFIR.init(hrtf);
};

// CommonJS function export
module.exports = createBinauralFIR;
