!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.createBinauralFIR=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @fileOverview
 * The binauralFIR node provides binaural listening to the user. The novelty of
 * this library is that it permits to use your own HRTF dataset. This library
 * can be used as a regular node inside the Web Audio API.
 * @author Arnau Julià, Samuel Goldszmidt
 * @version 0.1.1
 */
var kdt = _dereq_('kdt');
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

},{"kdt":2}],2:[function(_dereq_,module,exports){
/**
 * AUTHOR OF INITIAL JS LIBRARY
 * k-d Tree JavaScript - V 1.0
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */


function Node(obj, dimension, parent) {
  this.obj = obj;
  this.left = null;
  this.right = null;
  this.parent = parent;
  this.dimension = dimension;
}

function KdTree(points, metric, dimensions) {

  var self = this;
  
  function buildTree(points, depth, parent) {
    var dim = depth % dimensions.length,
      median,
      node;

    if (points.length === 0) {
      return null;
    }
    if (points.length === 1) {
      return new Node(points[0], dim, parent);
    }

    points.sort(function (a, b) {
      return a[dimensions[dim]] - b[dimensions[dim]];
    });

    median = Math.floor(points.length / 2);
    node = new Node(points[median], dim, parent);
    node.left = buildTree(points.slice(0, median), depth + 1, node);
    node.right = buildTree(points.slice(median + 1), depth + 1, node);

    return node;
  }

  this.root = buildTree(points, 0, null);

  this.insert = function (point) {
    function innerSearch(node, parent) {

      if (node === null) {
        return parent;
      }

      var dimension = dimensions[node.dimension];
      if (point[dimension] < node.obj[dimension]) {
        return innerSearch(node.left, node);
      } else {
        return innerSearch(node.right, node);
      }
    }

    var insertPosition = innerSearch(this.root, null),
      newNode,
      dimension;

    if (insertPosition === null) {
      this.root = new Node(point, 0, null);
      return;
    }

    newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
    dimension = dimensions[insertPosition.dimension];

    if (point[dimension] < insertPosition.obj[dimension]) {
      insertPosition.left = newNode;
    } else {
      insertPosition.right = newNode;
    }
  };

  this.remove = function (point) {
    var node;

    function nodeSearch(node) {
      if (node === null) {
        return null;
      }

      if (node.obj === point) {
        return node;
      }

      var dimension = dimensions[node.dimension];

      if (point[dimension] < node.obj[dimension]) {
        return nodeSearch(node.left, node);
      } else {
        return nodeSearch(node.right, node);
      }
    }

    function removeNode(node) {
      var nextNode,
        nextObj,
        pDimension;

      function findMax(node, dim) {
        var dimension,
          own,
          left,
          right,
          max;

        if (node === null) {
          return null;
        }

        dimension = dimensions[dim];
        if (node.dimension === dim) {
          if (node.right !== null) {
            return findMax(node.right, dim);
          }
          return node;
        }

        own = node.obj[dimension];
        left = findMax(node.left, dim);
        right = findMax(node.right, dim);
        max = node;

        if (left !== null && left.obj[dimension] > own) {
          max = left;
        }

        if (right !== null && right.obj[dimension] > max.obj[dimension]) {
          max = right;
        }
        return max;
      }

      function findMin(node, dim) {
        var dimension,
          own,
          left,
          right,
          min;

        if (node === null) {
          return null;
        }

        dimension = dimensions[dim];

        if (node.dimension === dim) {
          if (node.left !== null) {
            return findMin(node.left, dim);
          }
          return node;
        }

        own = node.obj[dimension];
        left = findMin(node.left, dim);
        right = findMin(node.right, dim);
        min = node;

        if (left !== null && left.obj[dimension] < own) {
          min = left;
        }
        if (right !== null && right.obj[dimension] < min.obj[dimension]) {
          min = right;
        }
        return min;
      }

      if (node.left === null && node.right === null) {
        if (node.parent === null) {
          self.root = null;
          return;
        }

        pDimension = dimensions[node.parent.dimension];

        if (node.obj[pDimension] < node.parent.obj[pDimension]) {
          node.parent.left = null;
        } else {
          node.parent.right = null;
        }
        return;
      }

      if (node.left !== null) {
        nextNode = findMax(node.left, node.dimension);
      } else {
        nextNode = findMin(node.right, node.dimension);
      }

      nextObj = nextNode.obj;
      removeNode(nextNode);
      node.obj = nextObj;

    }

    node = nodeSearch(self.root);

    if (node === null) { return; }

    removeNode(node);
  };

  this.nearest = function (point, maxNodes, maxDistance) {
    var i,
      result,
      bestNodes;

    bestNodes = new BinaryHeap(
      function (e) { return -e[1]; }
    );

    function nearestSearch(node) {
      var bestChild,
        dimension = dimensions[node.dimension],
        ownDistance = metric(point, node.obj),
        linearPoint = {},
        linearDistance,
        otherChild,
        i;

      function saveNode(node, distance) {
        bestNodes.push([node, distance]);
        if (bestNodes.size() > maxNodes) {
          bestNodes.pop();
        }
      }

      for (i = 0; i < dimensions.length; i += 1) {
        if (i === node.dimension) {
          linearPoint[dimensions[i]] = point[dimensions[i]];
        } else {
          linearPoint[dimensions[i]] = node.obj[dimensions[i]];
        }
      }

      linearDistance = metric(linearPoint, node.obj);

      if (node.right === null && node.left === null) {
        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
          saveNode(node, ownDistance);
        }
        return;
      }

      if (node.right === null) {
        bestChild = node.left;
      } else if (node.left === null) {
        bestChild = node.right;
      } else {
        if (point[dimension] < node.obj[dimension]) {
          bestChild = node.left;
        } else {
          bestChild = node.right;
        }
      }

      nearestSearch(bestChild);

      if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
        saveNode(node, ownDistance);
      }

      if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
        if (bestChild === node.left) {
          otherChild = node.right;
        } else {
          otherChild = node.left;
        }
        if (otherChild !== null) {
          nearestSearch(otherChild);
        }
      }
    }

    if (maxDistance) {
      for (i = 0; i < maxNodes; i += 1) {
        bestNodes.push([null, maxDistance]);
      }
    }

    nearestSearch(self.root);

    result = [];

    for (i = 0; i < maxNodes; i += 1) {
      if (bestNodes.content[i][0]) {
        result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
      }
    }
    return result;
  };

  this.balanceFactor = function () {
    function height(node) {
      if (node === null) {
        return 0;
      }
      return Math.max(height(node.left), height(node.right)) + 1;
    }

    function count(node) {
      if (node === null) {
        return 0;
      }
      return count(node.left) + count(node.right) + 1;
    }

    return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
  };
}

// Binary heap implementation from:
// http://eloquentjavascript.net/appendix2.html

function BinaryHeap(scoreFunction){
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);
    // Allow it to bubble up.
    this.bubbleUp(this.content.length - 1);
  },

  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  },

  peek: function() {
    return this.content[0];
  },

  remove: function(node) {
    var len = this.content.length;
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < len; i++) {
      if (this.content[i] == node) {
        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();
        if (i != len - 1) {
          this.content[i] = end;
          if (this.scoreFunction(end) < this.scoreFunction(node))
            this.bubbleUp(i);
          else
            this.sinkDown(i);
        }
        return;
      }
    }
    throw new Error("Node not found.");
  },

  size: function() {
    return this.content.length;
  },

  bubbleUp: function(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n];
    // When at 0, an element can not go up any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1,
          parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to move it further.
      else {
        break;
      }
    }
  },

  sinkDown: function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
        element = this.content[n],
        elemScore = this.scoreFunction(element);

    while(true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2, child1N = child2N - 1;
      // This is used to store the new position of the element,
      // if any.
      var swap = null;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N],
            child1Score = this.scoreFunction(child1);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore)
          swap = child1N;
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N],
            child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score)){
          swap = child2N;
        }
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap != null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  }
};

module.exports = {
  createKdTree: function (points, metric, dimensions) {
    return new KdTree(points, metric, dimensions)
  }
}

},{}]},{},[1])
(1)
});