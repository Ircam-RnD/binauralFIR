(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BinauralFIR = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./dist/binaural-fir');

},{"./dist/binaural-fir":2}],2:[function(require,module,exports){
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

},{"babel-runtime/helpers/class-call-check":4,"babel-runtime/helpers/create-class":5,"babel-runtime/helpers/interop-require-default":6,"kdt":9}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":7}],4:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],5:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":3}],6:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],7:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":8}],8:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],9:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJiaW5hdXJhbC1maXIuanMiLCJkaXN0L2VzNi9iaW5hdXJhbC1maXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5qcyIsIm5vZGVfbW9kdWxlcy9rZHQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQ09nQixLQUFLOzs7Ozs7OztJQUtBLFdBQVc7Ozs7Ozs7OztBQVFuQixXQVJRLFdBQVcsQ0FRbEIsT0FBTyxFQUFFOzBCQVJGLFdBQVc7O0FBUzVCLFFBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztBQUN6QyxRQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN0QixRQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLFFBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFFBQUks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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvYmluYXVyYWwtZmlyJyk7XG4iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIFRoZSBiaW5hdXJhbEZJUiBub2RlIHByb3ZpZGVzIGJpbmF1cmFsIGxpc3RlbmluZyB0byB0aGUgdXNlci5cbiAqIFRoaXMgbGlicmFyeSBhbGxvd3MgeW91IHRvIHVzZSB5b3VyIG93biBIUlRGIGRhdGFzZXQuXG4gKiBUaGlzIGxpYnJhcnkgY2FuIGJlIHVzZWQgYXMgYSByZWd1bGFyIG5vZGUgaW5zaWRlIHRoZSBXZWIgQXVkaW8gQVBJLlxuICogQGF1dGhvciBBcm5hdSBKdWxpw6BcbiAqIEB2ZXJzaW9uIDAuMS4yXG4gKi9cbmltcG9ydCBrZHQgZnJvbSAna2R0JztcblxuLyoqXG4gKiBAY2xhc3MgQmluYXVyYWxGSVJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmluYXVyYWxGSVIge1xuICAvKipcbiAgICogSW5zdGFuY2lhdGUgMiBjb252b2x2ZXIgbm9kZXNcbiAgICogV2hlbiBtb3ZpbmcgYSBzb3VyY2UsIGEgY3Jvc3NmYWRlIGlzIHRyaWdnZXJlZFxuICAgKiBiZXR3ZWVuIHRoZXNlIDIgY29udm9sdmVycy5cbiAgICogQSwgQiwgQT0+QiwgQj0+QSwgQT0+QitOZXh0LCBCPT5BK05leHRcbiAgICogVGhlIHR3byBsYXR0ZXIgZXhpc3QgaW4gXCJwZW5kaW5nIG1vZGVcIi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG9wdGlvbnMuYXVkaW9Db250ZXh0O1xuICAgIHRoaXMuaHJ0ZkRhdGFzZXQgPSBbXTtcbiAgICB0aGlzLmhydGZEYXRhc2V0TGVuZ3RoID0gMDtcbiAgICB0aGlzLnRyZWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHt9O1xuICAgIHRoaXMuY3Jvc3NmYWRlRHVyYXRpb24gPSAwLjAyO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5zdGF0ZSA9IFwiQVwiOyAgLy8gU3RhdGVzIGluIFtcIkFcIiwgXCJCXCIsIFwiQTJCXCIsIFwiQjJBXCJdXG4gICAgdGhpcy50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5wZW5kaW5nUG9zaXRpb24gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb252b2x2ZXJBID0gbmV3IENvbnZvbHZlckF1ZGlvR3JhcGgoe1xuICAgICAgYXVkaW9Db250ZXh0OiB0aGlzLmF1ZGlvQ29udGV4dFxuICAgIH0pO1xuICAgIHRoaXMuY29udm9sdmVyQS5nYWluLnZhbHVlID0gMTtcbiAgICB0aGlzLmlucHV0LmNvbm5lY3QodGhpcy5jb252b2x2ZXJBLmlucHV0KTtcbiAgICB0aGlzLmNvbnZvbHZlckIgPSBuZXcgQ29udm9sdmVyQXVkaW9HcmFwaCh7XG4gICAgICBhdWRpb0NvbnRleHQ6IHRoaXMuYXVkaW9Db250ZXh0XG4gICAgfSk7XG4gICAgdGhpcy5jb252b2x2ZXJCLmdhaW4udmFsdWUgPSAwO1xuICAgIHRoaXMuaW5wdXQuY29ubmVjdCh0aGlzLmNvbnZvbHZlckIuaW5wdXQpO1xuXG4gIH1cblxuICAvKipcbiAgICogQ29ubmVjdHMgdGhlIGJpbmF1cmFsRklSTm9kZSB0byB0aGUgV2ViIEF1ZGlvIGdyYXBoXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLmNvbnZvbHZlckEuY29ubmVjdChub2RlKTtcbiAgICB0aGlzLmNvbnZvbHZlckIuY29ubmVjdChub2RlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0IHRoZSBiaW5hdXJhbEZJUk5vZGUgZnJvbSB0aGUgV2ViIEF1ZGlvIGdyYXBoXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBkaXNjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLmNvbnZvbHZlckEuZGlzY29ubmVjdChub2RlKTtcbiAgICB0aGlzLmNvbnZvbHZlckIuZGlzY29ubmVjdChub2RlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgSFJURiBEYXRhc2V0IHRvIGJlIHVzZWQgd2l0aCB0aGUgdmlydHVhbCBzb3VyY2UuXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gaHJ0ZkRhdGFzZXQgQXJyYXkgb2YgT2JqZWN0cyBjb250YWluaW5nIHRoZSBhemltdXRoLCBkaXN0YW5jZSwgZWxldmF0aW9uLCB1cmwgYW5kIGJ1ZmZlciBmb3IgZWFjaCBwb2ludFxuICAgKi9cbiAgc2V0IEhSVEZEYXRhc2V0KGhydGZEYXRhc2V0KSB7XG4gICAgdGhpcy5ocnRmRGF0YXNldCA9IGhydGZEYXRhc2V0O1xuICAgIHRoaXMuaHJ0ZkRhdGFzZXRMZW5ndGggPSB0aGlzLmhydGZEYXRhc2V0Lmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ocnRmRGF0YXNldExlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaHJ0ZiA9IHRoaXMuaHJ0ZkRhdGFzZXRbaV07XG4gICAgICAvLyBBemltdXRoIGFuZCBlbGV2YXRpb24gdG8gcmFkaWFuc1xuICAgICAgdmFyIGF6aW11dGhSYWRpYW5zID0gaHJ0Zi5hemltdXRoICogTWF0aC5QSSAvIDE4MDtcbiAgICAgIHZhciBlbGV2YXRpb25SYWRpYW5zID0gaHJ0Zi5lbGV2YXRpb24gKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgdmFyIGNhdGVzaWFuQ29vcmQgPSB0aGlzLnNwaGVyaWNhbFRvQ2FydGVzaWFuKGF6aW11dGhSYWRpYW5zLCBlbGV2YXRpb25SYWRpYW5zLCBocnRmLmRpc3RhbmNlKTtcbiAgICAgIGhydGYueCA9IGNhdGVzaWFuQ29vcmQueDtcbiAgICAgIGhydGYueSA9IGNhdGVzaWFuQ29vcmQueTtcbiAgICAgIGhydGYueiA9IGNhdGVzaWFuQ29vcmQuejtcbiAgICB9XG4gICAgdGhpcy50cmVlID0ga2R0LmNyZWF0ZUtkVHJlZSh0aGlzLmhydGZEYXRhc2V0LCB0aGlzLmRpc3RhbmNlLCBbJ3gnLCAneScsICd6J10pO1xuICB9XG5cbiAgZ2V0IEhSVEZEYXRhc2V0KCkge1xuICAgIHJldHVybiB0aGlzLmhydGZEYXRhc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzIGluIGEgMy1EIHNwYWNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBhIE9iamVjdCBjb250YWluaW5nIHRocmVlIHByb3BlcnRpZXM6IHgsIHksIHpcbiAgICogQHBhcmFtIGIgT2JqZWN0IGNvbnRhaW5pbmcgdGhyZWUgcHJvcGVydGllczogeCwgeSwgelxuICAgKi9cbiAgZGlzdGFuY2UoYSwgYikge1xuICAgIC8vIE5vIG5lZWQgdG8gY29tcHV0ZSBzcXVhcmUgcm9vdCBoZXJlIGZvciBkaXN0YW5jZSBjb21wYXJpc29uLCB0aGlzIGlzIG1vcmUgZWZmaWNpZW50LlxuICAgIHJldHVybiBNYXRoLnBvdyhhLnggLSBiLngsIDIpICsgTWF0aC5wb3coYS55IC0gYi55LCAyKSArIE1hdGgucG93KGEueiAtIGIueiwgMik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHBvc2l0aW9uIG9mIHRoZSB2aXJ0dWFsIHNvdXJjZVxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIGF6aW11dGggQXppbXV0aCBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byAtMTgwIGZvciBzb3VyY2Ugb24geW91ciBsZWZ0LCBhbmQgZnJvbSAwIHRvIDE4MCBmb3Igc291cmNlIG9uIHlvdXIgcmlnaHRcbiAgICogQHBhcmFtIGVsZXZhdGlvbiBFbGV2YXRpb24gaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gOTAgZm9yIHNvdXJjZSBhYm92ZSB5b3VyIGhlYWQsIDAgZm9yIHNvdXJjZSBpbiBmcm9udCBvZiB5b3VyIGhlYWQsIGFuZCBmcm9tIDAgdG8gLTkwIGZvciBzb3VyY2UgYmVsb3cgeW91ciBoZWFkKVxuICAgKiBAcGFyYW0gZGlzdGFuY2UgRGlzdGFuY2UgaW4gbWV0ZXJzXG4gICAqL1xuICBzZXRQb3NpdGlvbihhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBuZWFyZXN0IHBvc2l0aW9uIGZvciB0aGUgaW5wdXQgYXppbXV0aCwgZWxldmF0aW9uIGFuZCBkaXN0YW5jZVxuICAgIHZhciBuZWFyZXN0UG9zaXRpb24gPSB0aGlzLmdldFJlYWxDb29yZGluYXRlcyhhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKTtcbiAgICBpZiAobmVhcmVzdFBvc2l0aW9uLmF6aW11dGggIT09IHRoaXMucG9zaXRpb24uYXppbXV0aCB8fCBuZWFyZXN0UG9zaXRpb24uZWxldmF0aW9uICE9PSB0aGlzLnBvc2l0aW9uLmVsZXZhdGlvbiB8fCBuZWFyZXN0UG9zaXRpb24uZGlzdGFuY2UgIT09IHRoaXMucG9zaXRpb24uZGlzdGFuY2UpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICBjYXNlIFwiQVwiOlxuICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkEyQlwiO1xuICAgICAgICAgIHRoaXMucGVuZGluZ1Bvc2l0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMuX2Nyb3NzZmFkZVRvKFwiQlwiLCBuZWFyZXN0UG9zaXRpb24pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQlwiOlxuICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkIyQVwiO1xuICAgICAgICAgIHRoaXMucGVuZGluZ1Bvc2l0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMuX2Nyb3NzZmFkZVRvKFwiQVwiLCBuZWFyZXN0UG9zaXRpb24pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQTJCXCI6XG4gICAgICAgICAgdGhpcy5wZW5kaW5nUG9zaXRpb24gPSBuZWFyZXN0UG9zaXRpb247XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJCMkFcIjpcbiAgICAgICAgICB0aGlzLnBlbmRpbmdQb3NpdGlvbiA9IG5lYXJlc3RQb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfY3Jvc3NmYWRlVG8odGFyZ2V0LCBwb3NpdGlvbikge1xuICAgIC8vIFNldCB0aGUgbmV3IHRhcmdldCBwb3NpdGlvblxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICBsZXQgaHJ0ZiA9IHRoaXMuZ2V0SFJURih0aGlzLnBvc2l0aW9uLmF6aW11dGgsIHRoaXMucG9zaXRpb24uZWxldmF0aW9uLCB0aGlzLnBvc2l0aW9uLmRpc3RhbmNlKTtcbiAgICBsZXQgbm93ID0gdGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWU7XG4gICAgbGV0IG5leHQgPSBub3cgKyB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uO1xuICAgIHN3aXRjaCAodGhpcy50YXJnZXQpIHtcbiAgICAgIGNhc2UgXCJBXCI6XG4gICAgICAgIHRoaXMuY29udm9sdmVyQS5idWZmZXIgPSBocnRmO1xuICAgICAgICB0aGlzLmNvbnZvbHZlckIuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLCBuZXh0KTtcbiAgICAgICAgdGhpcy5jb252b2x2ZXJBLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMSwgbmV4dCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkJcIjpcbiAgICAgICAgdGhpcy5jb252b2x2ZXJCLmJ1ZmZlciA9IGhydGY7XG4gICAgICAgIHRoaXMuY29udm9sdmVyQS5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIG5leHQpO1xuICAgICAgICB0aGlzLmNvbnZvbHZlckIuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgxLCBuZXh0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFRyaWdnZXIgZXZlbnQgd2hlbiBsaW5lYXJSYW1wIGlzIHJlYWNoZWRcbiAgICBmdW5jdGlvbiBlbmRSYW1wKHRnKSB7XG4gICAgICBpZiAodGcuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lID4gbmV4dCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICAgICAgLy8gVGFyZ2V0IHN0YXRlIGlzIHJlYWNoZWRcbiAgICAgICAgdGcuc3RhdGUgPSB0Zy50YXJnZXQ7XG4gICAgICAgIHRnLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gVHJpZ2dlciBpZiB0aGVyZSBpcyBhIHBlbmRpbmcgcG9zaXRpb25cbiAgICAgICAgaWYgKHRnLnBlbmRpbmdQb3NpdGlvbikge1xuICAgICAgICAgIHRnLnNldFBvc2l0aW9uKHRnLnBlbmRpbmdQb3NpdGlvbi5hemltdXRoLCB0Zy5wZW5kaW5nUG9zaXRpb24uZWxldmF0aW9uLCB0Zy5wZW5kaW5nUG9zaXRpb24uZGlzdGFuY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBpbnRlcnZhbElEID0gd2luZG93LnNldEludGVydmFsKGVuZFJhbXAsIDEwLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGR1cmF0aW9uIG9mIGNyb3NzZmFkaW5nIGluIG1pbGlzZWNvbmRzLlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIGR1cmF0aW9uIER1cmF0aW9uIG9mIHRoZSBjcm9zc2ZhZGluZyBpbiBtaWxpc2Vjb25kc1xuICAgKi9cbiAgc2V0Q3Jvc3NmYWRlRHVyYXRpb24oZHVyYXRpb24pIHtcbiAgICBpZiAoZHVyYXRpb24pIHtcbiAgICAgIC8vIE1pbGlzZWNvbmRzIHRvIHNcbiAgICAgIHRoaXMuY3Jvc3NmYWRlRHVyYXRpb24gPSBkdXJhdGlvbiAvIDEwMDA7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ3Jvc3NmYWRlRHVyYXRpb24gc2V0dGluZyBlcnJvclwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkdXJhdGlvbiBvZiBjcm9zc2ZhZGluZyBpbiBtaWxpc2Vjb25kcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0Q3Jvc3NmYWRlRHVyYXRpb24oKSB7XG4gICAgLy8gU2Vjb25kcyB0byBtc1xuICAgIHJldHVybiB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uICogMTAwMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHZpcnR1YWwgc291cmNlLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEhSVEYgZmlsZSBmb3IgYW4gZXNwZWNpZmljIHBvc2l0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSBhemltdXRoIEF6aW11dGggaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gLTE4MCBmb3Igc291cmNlIG9uIHlvdXIgbGVmdCwgYW5kIGZyb20gMCB0byAxODAgZm9yIHNvdXJjZSBvbiB5b3VyIHJpZ2h0XG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIDkwIGZvciBzb3VyY2UgYWJvdmUgeW91ciBoZWFkLCAwIGZvciBzb3VyY2UgaW4gZnJvbnQgb2YgeW91ciBoZWFkLCBhbmQgZnJvbSAwIHRvIC05MCBmb3Igc291cmNlIGJlbG93IHlvdXIgaGVhZClcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgZ2V0SFJURihhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgdmFyIG5lYXJlc3QgPSB0aGlzLmdldE5lYXJlc3RQb2ludChhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKTtcbiAgICAvLyBSZXR1cm4gYnVmZmVyIG9mIG5lYXJlc3QgcG9zaXRpb24gZm9yIHRoZSBpbnB1dCB2YWx1ZXNcbiAgICByZXR1cm4gbmVhcmVzdC5idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtIHRoZSBzcGhlcmljYWwgdG8gY2FydGVzaWFuIGNvb3JkaW5hdGVzLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIHJhZGlhbnNcbiAgICogQHBhcmFtIGVsZXZhdGlvbiBFbGV2YXRpb24gaW4gcmFkaWFuc1xuICAgKiBAcGFyYW0gZGlzdGFuY2UgRGlzdGFuY2UgaW4gbWV0ZXJzXG4gICAqL1xuICBzcGhlcmljYWxUb0NhcnRlc2lhbihhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGRpc3RhbmNlICogTWF0aC5zaW4oYXppbXV0aCksXG4gICAgICB5OiBkaXN0YW5jZSAqIE1hdGguY29zKGF6aW11dGgpLFxuICAgICAgejogZGlzdGFuY2UgKiBNYXRoLnNpbihlbGV2YXRpb24pXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5lYXJlc3QgcG9zaXRpb24gZm9yIGFuIGlucHV0IHBvc2l0aW9uLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIGdldFJlYWxDb29yZGluYXRlcyhhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgdmFyIG5lYXJlc3QgPSB0aGlzLmdldE5lYXJlc3RQb2ludChhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKTtcbiAgICAvLyBSZXR1cm4gYXppbXV0aCwgZWxldmF0aW9uIGFuZCBkaXN0YW5jZSBvZiBuZWFyZXN0IHBvc2l0aW9uIGZvciB0aGUgaW5wdXQgdmFsdWVzXG4gICAgcmV0dXJuIHtcbiAgICAgIGF6aW11dGg6IG5lYXJlc3QuYXppbXV0aCxcbiAgICAgIGVsZXZhdGlvbjogbmVhcmVzdC5lbGV2YXRpb24sXG4gICAgICBkaXN0YW5jZTogbmVhcmVzdC5kaXN0YW5jZVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBuZWFyZXN0IHBvc2l0aW9uIGZvciBhbiBpbnB1dCBwb3NpdGlvbi5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIGF6aW11dGggQXppbXV0aCBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byAtMTgwIGZvciBzb3VyY2Ugb24geW91ciBsZWZ0LCBhbmQgZnJvbSAwIHRvIDE4MCBmb3Igc291cmNlIG9uIHlvdXIgcmlnaHRcbiAgICogQHBhcmFtIGVsZXZhdGlvbiBFbGV2YXRpb24gaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gOTAgZm9yIHNvdXJjZSBhYm92ZSB5b3VyIGhlYWQsIDAgZm9yIHNvdXJjZSBpbiBmcm9udCBvZiB5b3VyIGhlYWQsIGFuZCBmcm9tIDAgdG8gLTkwIGZvciBzb3VyY2UgYmVsb3cgeW91ciBoZWFkKVxuICAgKiBAcGFyYW0gZGlzdGFuY2UgRGlzdGFuY2UgaW4gbWV0ZXJzXG4gICAqL1xuICBnZXROZWFyZXN0UG9pbnQoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuICAgIC8vIERlZ3JlZXMgdG8gcmFkaWFucyBmb3IgdGhlIGF6aW11dGggYW5kIGVsZXZhdGlvblxuICAgIHZhciBhemltdXRoUmFkaWFucyA9IGF6aW11dGggKiBNYXRoLlBJIC8gMTgwO1xuICAgIHZhciBlbGV2YXRpb25SYWRpYW5zID0gZWxldmF0aW9uICogTWF0aC5QSSAvIDE4MDtcbiAgICAvLyBDb252ZXJ0IHNwaGVyaWNhbCBjb29yZGluYXRlcyB0byBjYXJ0ZXNpYW5cbiAgICB2YXIgY2FydGVzaWFuQ29vcmQgPSB0aGlzLnNwaGVyaWNhbFRvQ2FydGVzaWFuKGF6aW11dGhSYWRpYW5zLCBlbGV2YXRpb25SYWRpYW5zLCBkaXN0YW5jZSk7XG4gICAgLy8gR2V0IHRoZSBuZWFyZXN0IEhSVEYgZmlsZSBmb3IgdGhlIGRlc2lyZWQgcG9zaXRpb25cbiAgICB2YXIgbmVhcmVzdCA9IHRoaXMudHJlZS5uZWFyZXN0KGNhcnRlc2lhbkNvb3JkLCAxKVswXTtcbiAgICByZXR1cm4gbmVhcmVzdFswXTtcbiAgfVxufVxuXG5cbi8qKlxuICogQ29udm9sdmVyIHN1YiBhdWRpbyBncmFwaCBjbGFzc1xuICovXG5jbGFzcyBDb252b2x2ZXJBdWRpb0dyYXBoIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gb3B0aW9ucy5hdWRpb0NvbnRleHQ7XG4gICAgdGhpcy5nYWluTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLmNvbnZOb2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQ29udm9sdmVyKCk7XG4gICAgdGhpcy5jb252Tm9kZS5ub3JtYWxpemUgPSBmYWxzZTtcbiAgICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb252Tm9kZSk7XG5cbiAgICAvLyBIYWNrIHRvIGZvcmNlIGF1ZGlvUGFyYW0gYWN0aXZlIHdoZW4gdGhlIHNvdXJjZSBpcyBub3QgYWN0aXZlXG4gICAgdGhpcy5vc2NpbGxhdG9yTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICB0aGlzLmdhaW5Pc2NpbGxhdG9yTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLm9zY2lsbGF0b3JOb2RlLmNvbm5lY3QodGhpcy5nYWluT3NjaWxsYXRvck5vZGUpO1xuICAgIHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgdGhpcy5nYWluT3NjaWxsYXRvck5vZGUuZ2Fpbi52YWx1ZSA9IDA7XG4gICAgdGhpcy5vc2NpbGxhdG9yTm9kZS5zdGFydCgwKTtcbiAgfVxuXG4gIGdldCBpbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYWluTm9kZTtcbiAgfVxuXG4gIGdldCBnYWluKCkge1xuICAgIHJldHVybiB0aGlzLmdhaW5Ob2RlLmdhaW47XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBidWZmZXIgaW4gdGhlIGNvbnZvbHZlck5vZGVcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0gdmFsdWUgQXVkaW9CdWZmZXIgT2JqZWN0LlxuICAgKi9cbiAgc2V0IGJ1ZmZlcih2YWx1ZSkge1xuICAgIHRoaXMuY29udk5vZGUuYnVmZmVyID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ29ubmVjdCB0aGUgQ29udm9sdmVyQXVkaW9HcmFwaCB0byBhIG5vZGVcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBub2RlIERlc3RpbmF0aW9uIG5vZGVcbiAgICovXG4gIGNvbm5lY3Qobm9kZSkge1xuICAgIHRoaXMuY29udk5vZGUuY29ubmVjdChub2RlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0IHRoZSBDb252b2x2ZXJBdWRpb0dyYXBoIHRvIGEgbm9kZVxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIG5vZGUgRGVzdGluYXRpb24gbm9kZVxuICAgKi9cbiAgZGlzY29ubmVjdChub2RlKSB7XG4gICAgdGhpcy5jb252Tm9kZS5kaXNjb25uZWN0KG5vZGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkLnNldERlc2MoaXQsIGtleSwgZGVzYyk7XG59OyIsInZhciAkT2JqZWN0ID0gT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogICAgICRPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICAkT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBpc0VudW06ICAgICB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgZ2V0RGVzYzogICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgICRPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgJE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6ICRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBlYWNoOiAgICAgICBbXS5mb3JFYWNoXG59OyIsIi8qKlxuICogQVVUSE9SIE9GIElOSVRJQUwgSlMgTElCUkFSWVxuICogay1kIFRyZWUgSmF2YVNjcmlwdCAtIFYgMS4wXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3ViaWxhYnMva2QtdHJlZS1qYXZhc2NyaXB0XG4gKlxuICogQGF1dGhvciBNaXJjZWEgUHJpY29wIDxwcmljb3BAdWJpbGFicy5uZXQ+LCAyMDEyXG4gKiBAYXV0aG9yIE1hcnRpbiBLbGVwcGUgPGtsZXBwZUB1YmlsYWJzLm5ldD4sIDIwMTJcbiAqIEBhdXRob3IgVWJpbGFicyBodHRwOi8vdWJpbGFicy5uZXQsIDIwMTJcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIDxodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocD5cbiAqL1xuXG5cbmZ1bmN0aW9uIE5vZGUob2JqLCBkaW1lbnNpb24sIHBhcmVudCkge1xuICB0aGlzLm9iaiA9IG9iajtcbiAgdGhpcy5sZWZ0ID0gbnVsbDtcbiAgdGhpcy5yaWdodCA9IG51bGw7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLmRpbWVuc2lvbiA9IGRpbWVuc2lvbjtcbn1cblxuZnVuY3Rpb24gS2RUcmVlKHBvaW50cywgbWV0cmljLCBkaW1lbnNpb25zKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBcbiAgZnVuY3Rpb24gYnVpbGRUcmVlKHBvaW50cywgZGVwdGgsIHBhcmVudCkge1xuICAgIHZhciBkaW0gPSBkZXB0aCAlIGRpbWVuc2lvbnMubGVuZ3RoLFxuICAgICAgbWVkaWFuLFxuICAgICAgbm9kZTtcblxuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBuZXcgTm9kZShwb2ludHNbMF0sIGRpbSwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBwb2ludHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGFbZGltZW5zaW9uc1tkaW1dXSAtIGJbZGltZW5zaW9uc1tkaW1dXTtcbiAgICB9KTtcblxuICAgIG1lZGlhbiA9IE1hdGguZmxvb3IocG9pbnRzLmxlbmd0aCAvIDIpO1xuICAgIG5vZGUgPSBuZXcgTm9kZShwb2ludHNbbWVkaWFuXSwgZGltLCBwYXJlbnQpO1xuICAgIG5vZGUubGVmdCA9IGJ1aWxkVHJlZShwb2ludHMuc2xpY2UoMCwgbWVkaWFuKSwgZGVwdGggKyAxLCBub2RlKTtcbiAgICBub2RlLnJpZ2h0ID0gYnVpbGRUcmVlKHBvaW50cy5zbGljZShtZWRpYW4gKyAxKSwgZGVwdGggKyAxLCBub2RlKTtcblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdGhpcy5yb290ID0gYnVpbGRUcmVlKHBvaW50cywgMCwgbnVsbCk7XG5cbiAgdGhpcy5pbnNlcnQgPSBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICBmdW5jdGlvbiBpbm5lclNlYXJjaChub2RlLCBwYXJlbnQpIHtcblxuICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbbm9kZS5kaW1lbnNpb25dO1xuICAgICAgaWYgKHBvaW50W2RpbWVuc2lvbl0gPCBub2RlLm9ialtkaW1lbnNpb25dKSB7XG4gICAgICAgIHJldHVybiBpbm5lclNlYXJjaChub2RlLmxlZnQsIG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGlubmVyU2VhcmNoKG5vZGUucmlnaHQsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBpbnNlcnRQb3NpdGlvbiA9IGlubmVyU2VhcmNoKHRoaXMucm9vdCwgbnVsbCksXG4gICAgICBuZXdOb2RlLFxuICAgICAgZGltZW5zaW9uO1xuXG4gICAgaWYgKGluc2VydFBvc2l0aW9uID09PSBudWxsKSB7XG4gICAgICB0aGlzLnJvb3QgPSBuZXcgTm9kZShwb2ludCwgMCwgbnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmV3Tm9kZSA9IG5ldyBOb2RlKHBvaW50LCAoaW5zZXJ0UG9zaXRpb24uZGltZW5zaW9uICsgMSkgJSBkaW1lbnNpb25zLmxlbmd0aCwgaW5zZXJ0UG9zaXRpb24pO1xuICAgIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbaW5zZXJ0UG9zaXRpb24uZGltZW5zaW9uXTtcblxuICAgIGlmIChwb2ludFtkaW1lbnNpb25dIDwgaW5zZXJ0UG9zaXRpb24ub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgIGluc2VydFBvc2l0aW9uLmxlZnQgPSBuZXdOb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnNlcnRQb3NpdGlvbi5yaWdodCA9IG5ld05vZGU7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgdmFyIG5vZGU7XG5cbiAgICBmdW5jdGlvbiBub2RlU2VhcmNoKG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5vYmogPT09IHBvaW50KSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGltZW5zaW9uID0gZGltZW5zaW9uc1tub2RlLmRpbWVuc2lvbl07XG5cbiAgICAgIGlmIChwb2ludFtkaW1lbnNpb25dIDwgbm9kZS5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgICByZXR1cm4gbm9kZVNlYXJjaChub2RlLmxlZnQsIG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5vZGVTZWFyY2gobm9kZS5yaWdodCwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgICB2YXIgbmV4dE5vZGUsXG4gICAgICAgIG5leHRPYmosXG4gICAgICAgIHBEaW1lbnNpb247XG5cbiAgICAgIGZ1bmN0aW9uIGZpbmRNYXgobm9kZSwgZGltKSB7XG4gICAgICAgIHZhciBkaW1lbnNpb24sXG4gICAgICAgICAgb3duLFxuICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgbWF4O1xuXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW2RpbV07XG4gICAgICAgIGlmIChub2RlLmRpbWVuc2lvbiA9PT0gZGltKSB7XG4gICAgICAgICAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kTWF4KG5vZGUucmlnaHQsIGRpbSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duID0gbm9kZS5vYmpbZGltZW5zaW9uXTtcbiAgICAgICAgbGVmdCA9IGZpbmRNYXgobm9kZS5sZWZ0LCBkaW0pO1xuICAgICAgICByaWdodCA9IGZpbmRNYXgobm9kZS5yaWdodCwgZGltKTtcbiAgICAgICAgbWF4ID0gbm9kZTtcblxuICAgICAgICBpZiAobGVmdCAhPT0gbnVsbCAmJiBsZWZ0Lm9ialtkaW1lbnNpb25dID4gb3duKSB7XG4gICAgICAgICAgbWF4ID0gbGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyaWdodCAhPT0gbnVsbCAmJiByaWdodC5vYmpbZGltZW5zaW9uXSA+IG1heC5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgICAgIG1heCA9IHJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGZpbmRNaW4obm9kZSwgZGltKSB7XG4gICAgICAgIHZhciBkaW1lbnNpb24sXG4gICAgICAgICAgb3duLFxuICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgbWluO1xuXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW2RpbV07XG5cbiAgICAgICAgaWYgKG5vZGUuZGltZW5zaW9uID09PSBkaW0pIHtcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZE1pbihub2RlLmxlZnQsIGRpbSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duID0gbm9kZS5vYmpbZGltZW5zaW9uXTtcbiAgICAgICAgbGVmdCA9IGZpbmRNaW4obm9kZS5sZWZ0LCBkaW0pO1xuICAgICAgICByaWdodCA9IGZpbmRNaW4obm9kZS5yaWdodCwgZGltKTtcbiAgICAgICAgbWluID0gbm9kZTtcblxuICAgICAgICBpZiAobGVmdCAhPT0gbnVsbCAmJiBsZWZ0Lm9ialtkaW1lbnNpb25dIDwgb3duKSB7XG4gICAgICAgICAgbWluID0gbGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmlnaHQgIT09IG51bGwgJiYgcmlnaHQub2JqW2RpbWVuc2lvbl0gPCBtaW4ub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgICAgICBtaW4gPSByaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5sZWZ0ID09PSBudWxsICYmIG5vZGUucmlnaHQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgc2VsZi5yb290ID0gbnVsbDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwRGltZW5zaW9uID0gZGltZW5zaW9uc1tub2RlLnBhcmVudC5kaW1lbnNpb25dO1xuXG4gICAgICAgIGlmIChub2RlLm9ialtwRGltZW5zaW9uXSA8IG5vZGUucGFyZW50Lm9ialtwRGltZW5zaW9uXSkge1xuICAgICAgICAgIG5vZGUucGFyZW50LmxlZnQgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGUucGFyZW50LnJpZ2h0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgbmV4dE5vZGUgPSBmaW5kTWF4KG5vZGUubGVmdCwgbm9kZS5kaW1lbnNpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dE5vZGUgPSBmaW5kTWluKG5vZGUucmlnaHQsIG5vZGUuZGltZW5zaW9uKTtcbiAgICAgIH1cblxuICAgICAgbmV4dE9iaiA9IG5leHROb2RlLm9iajtcbiAgICAgIHJlbW92ZU5vZGUobmV4dE5vZGUpO1xuICAgICAgbm9kZS5vYmogPSBuZXh0T2JqO1xuXG4gICAgfVxuXG4gICAgbm9kZSA9IG5vZGVTZWFyY2goc2VsZi5yb290KTtcblxuICAgIGlmIChub2RlID09PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgcmVtb3ZlTm9kZShub2RlKTtcbiAgfTtcblxuICB0aGlzLm5lYXJlc3QgPSBmdW5jdGlvbiAocG9pbnQsIG1heE5vZGVzLCBtYXhEaXN0YW5jZSkge1xuICAgIHZhciBpLFxuICAgICAgcmVzdWx0LFxuICAgICAgYmVzdE5vZGVzO1xuXG4gICAgYmVzdE5vZGVzID0gbmV3IEJpbmFyeUhlYXAoXG4gICAgICBmdW5jdGlvbiAoZSkgeyByZXR1cm4gLWVbMV07IH1cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gbmVhcmVzdFNlYXJjaChub2RlKSB7XG4gICAgICB2YXIgYmVzdENoaWxkLFxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW25vZGUuZGltZW5zaW9uXSxcbiAgICAgICAgb3duRGlzdGFuY2UgPSBtZXRyaWMocG9pbnQsIG5vZGUub2JqKSxcbiAgICAgICAgbGluZWFyUG9pbnQgPSB7fSxcbiAgICAgICAgbGluZWFyRGlzdGFuY2UsXG4gICAgICAgIG90aGVyQ2hpbGQsXG4gICAgICAgIGk7XG5cbiAgICAgIGZ1bmN0aW9uIHNhdmVOb2RlKG5vZGUsIGRpc3RhbmNlKSB7XG4gICAgICAgIGJlc3ROb2Rlcy5wdXNoKFtub2RlLCBkaXN0YW5jZV0pO1xuICAgICAgICBpZiAoYmVzdE5vZGVzLnNpemUoKSA+IG1heE5vZGVzKSB7XG4gICAgICAgICAgYmVzdE5vZGVzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkaW1lbnNpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpID09PSBub2RlLmRpbWVuc2lvbikge1xuICAgICAgICAgIGxpbmVhclBvaW50W2RpbWVuc2lvbnNbaV1dID0gcG9pbnRbZGltZW5zaW9uc1tpXV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGluZWFyUG9pbnRbZGltZW5zaW9uc1tpXV0gPSBub2RlLm9ialtkaW1lbnNpb25zW2ldXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaW5lYXJEaXN0YW5jZSA9IG1ldHJpYyhsaW5lYXJQb2ludCwgbm9kZS5vYmopO1xuXG4gICAgICBpZiAobm9kZS5yaWdodCA9PT0gbnVsbCAmJiBub2RlLmxlZnQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGJlc3ROb2Rlcy5zaXplKCkgPCBtYXhOb2RlcyB8fCBvd25EaXN0YW5jZSA8IGJlc3ROb2Rlcy5wZWVrKClbMV0pIHtcbiAgICAgICAgICBzYXZlTm9kZShub2RlLCBvd25EaXN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5yaWdodCA9PT0gbnVsbCkge1xuICAgICAgICBiZXN0Q2hpbGQgPSBub2RlLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUubGVmdCA9PT0gbnVsbCkge1xuICAgICAgICBiZXN0Q2hpbGQgPSBub2RlLnJpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBvaW50W2RpbWVuc2lvbl0gPCBub2RlLm9ialtkaW1lbnNpb25dKSB7XG4gICAgICAgICAgYmVzdENoaWxkID0gbm9kZS5sZWZ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJlc3RDaGlsZCA9IG5vZGUucmlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmVhcmVzdFNlYXJjaChiZXN0Q2hpbGQpO1xuXG4gICAgICBpZiAoYmVzdE5vZGVzLnNpemUoKSA8IG1heE5vZGVzIHx8IG93bkRpc3RhbmNlIDwgYmVzdE5vZGVzLnBlZWsoKVsxXSkge1xuICAgICAgICBzYXZlTm9kZShub2RlLCBvd25EaXN0YW5jZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChiZXN0Tm9kZXMuc2l6ZSgpIDwgbWF4Tm9kZXMgfHwgTWF0aC5hYnMobGluZWFyRGlzdGFuY2UpIDwgYmVzdE5vZGVzLnBlZWsoKVsxXSkge1xuICAgICAgICBpZiAoYmVzdENoaWxkID09PSBub2RlLmxlZnQpIHtcbiAgICAgICAgICBvdGhlckNoaWxkID0gbm9kZS5yaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdGhlckNoaWxkID0gbm9kZS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlckNoaWxkICE9PSBudWxsKSB7XG4gICAgICAgICAgbmVhcmVzdFNlYXJjaChvdGhlckNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXhEaXN0YW5jZSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IG1heE5vZGVzOyBpICs9IDEpIHtcbiAgICAgICAgYmVzdE5vZGVzLnB1c2goW251bGwsIG1heERpc3RhbmNlXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmVhcmVzdFNlYXJjaChzZWxmLnJvb3QpO1xuXG4gICAgcmVzdWx0ID0gW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbWF4Tm9kZXM7IGkgKz0gMSkge1xuICAgICAgaWYgKGJlc3ROb2Rlcy5jb250ZW50W2ldWzBdKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtiZXN0Tm9kZXMuY29udGVudFtpXVswXS5vYmosIGJlc3ROb2Rlcy5jb250ZW50W2ldWzFdXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdGhpcy5iYWxhbmNlRmFjdG9yID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGhlaWdodChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXRoLm1heChoZWlnaHQobm9kZS5sZWZ0KSwgaGVpZ2h0KG5vZGUucmlnaHQpKSArIDE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY291bnQobm9kZSkge1xuICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gY291bnQobm9kZS5sZWZ0KSArIGNvdW50KG5vZGUucmlnaHQpICsgMTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0KHNlbGYucm9vdCkgLyAoTWF0aC5sb2coY291bnQoc2VsZi5yb290KSkgLyBNYXRoLmxvZygyKSk7XG4gIH07XG59XG5cbi8vIEJpbmFyeSBoZWFwIGltcGxlbWVudGF0aW9uIGZyb206XG4vLyBodHRwOi8vZWxvcXVlbnRqYXZhc2NyaXB0Lm5ldC9hcHBlbmRpeDIuaHRtbFxuXG5mdW5jdGlvbiBCaW5hcnlIZWFwKHNjb3JlRnVuY3Rpb24pe1xuICB0aGlzLmNvbnRlbnQgPSBbXTtcbiAgdGhpcy5zY29yZUZ1bmN0aW9uID0gc2NvcmVGdW5jdGlvbjtcbn1cblxuQmluYXJ5SGVhcC5wcm90b3R5cGUgPSB7XG4gIHB1c2g6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAvLyBBZGQgdGhlIG5ldyBlbGVtZW50IHRvIHRoZSBlbmQgb2YgdGhlIGFycmF5LlxuICAgIHRoaXMuY29udGVudC5wdXNoKGVsZW1lbnQpO1xuICAgIC8vIEFsbG93IGl0IHRvIGJ1YmJsZSB1cC5cbiAgICB0aGlzLmJ1YmJsZVVwKHRoaXMuY29udGVudC5sZW5ndGggLSAxKTtcbiAgfSxcblxuICBwb3A6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFN0b3JlIHRoZSBmaXJzdCBlbGVtZW50IHNvIHdlIGNhbiByZXR1cm4gaXQgbGF0ZXIuXG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuY29udGVudFswXTtcbiAgICAvLyBHZXQgdGhlIGVsZW1lbnQgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXkuXG4gICAgdmFyIGVuZCA9IHRoaXMuY29udGVudC5wb3AoKTtcbiAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGVsZW1lbnRzIGxlZnQsIHB1dCB0aGUgZW5kIGVsZW1lbnQgYXQgdGhlXG4gICAgLy8gc3RhcnQsIGFuZCBsZXQgaXQgc2luayBkb3duLlxuICAgIGlmICh0aGlzLmNvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jb250ZW50WzBdID0gZW5kO1xuICAgICAgdGhpcy5zaW5rRG93bigwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBwZWVrOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50WzBdO1xuICB9LFxuXG4gIHJlbW92ZTogZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciBsZW4gPSB0aGlzLmNvbnRlbnQubGVuZ3RoO1xuICAgIC8vIFRvIHJlbW92ZSBhIHZhbHVlLCB3ZSBtdXN0IHNlYXJjaCB0aHJvdWdoIHRoZSBhcnJheSB0byBmaW5kXG4gICAgLy8gaXQuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHRoaXMuY29udGVudFtpXSA9PSBub2RlKSB7XG4gICAgICAgIC8vIFdoZW4gaXQgaXMgZm91bmQsIHRoZSBwcm9jZXNzIHNlZW4gaW4gJ3BvcCcgaXMgcmVwZWF0ZWRcbiAgICAgICAgLy8gdG8gZmlsbCB1cCB0aGUgaG9sZS5cbiAgICAgICAgdmFyIGVuZCA9IHRoaXMuY29udGVudC5wb3AoKTtcbiAgICAgICAgaWYgKGkgIT0gbGVuIC0gMSkge1xuICAgICAgICAgIHRoaXMuY29udGVudFtpXSA9IGVuZDtcbiAgICAgICAgICBpZiAodGhpcy5zY29yZUZ1bmN0aW9uKGVuZCkgPCB0aGlzLnNjb3JlRnVuY3Rpb24obm9kZSkpXG4gICAgICAgICAgICB0aGlzLmJ1YmJsZVVwKGkpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2lua0Rvd24oaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb2RlIG5vdCBmb3VuZC5cIik7XG4gIH0sXG5cbiAgc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudC5sZW5ndGg7XG4gIH0sXG5cbiAgYnViYmxlVXA6IGZ1bmN0aW9uKG4pIHtcbiAgICAvLyBGZXRjaCB0aGUgZWxlbWVudCB0aGF0IGhhcyB0byBiZSBtb3ZlZC5cbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuY29udGVudFtuXTtcbiAgICAvLyBXaGVuIGF0IDAsIGFuIGVsZW1lbnQgY2FuIG5vdCBnbyB1cCBhbnkgZnVydGhlci5cbiAgICB3aGlsZSAobiA+IDApIHtcbiAgICAgIC8vIENvbXB1dGUgdGhlIHBhcmVudCBlbGVtZW50J3MgaW5kZXgsIGFuZCBmZXRjaCBpdC5cbiAgICAgIHZhciBwYXJlbnROID0gTWF0aC5mbG9vcigobiArIDEpIC8gMikgLSAxLFxuICAgICAgICAgIHBhcmVudCA9IHRoaXMuY29udGVudFtwYXJlbnROXTtcbiAgICAgIC8vIFN3YXAgdGhlIGVsZW1lbnRzIGlmIHRoZSBwYXJlbnQgaXMgZ3JlYXRlci5cbiAgICAgIGlmICh0aGlzLnNjb3JlRnVuY3Rpb24oZWxlbWVudCkgPCB0aGlzLnNjb3JlRnVuY3Rpb24ocGFyZW50KSkge1xuICAgICAgICB0aGlzLmNvbnRlbnRbcGFyZW50Tl0gPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmNvbnRlbnRbbl0gPSBwYXJlbnQ7XG4gICAgICAgIC8vIFVwZGF0ZSAnbicgdG8gY29udGludWUgYXQgdGhlIG5ldyBwb3NpdGlvbi5cbiAgICAgICAgbiA9IHBhcmVudE47XG4gICAgICB9XG4gICAgICAvLyBGb3VuZCBhIHBhcmVudCB0aGF0IGlzIGxlc3MsIG5vIG5lZWQgdG8gbW92ZSBpdCBmdXJ0aGVyLlxuICAgICAgZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzaW5rRG93bjogZnVuY3Rpb24obikge1xuICAgIC8vIExvb2sgdXAgdGhlIHRhcmdldCBlbGVtZW50IGFuZCBpdHMgc2NvcmUuXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuY29udGVudC5sZW5ndGgsXG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmNvbnRlbnRbbl0sXG4gICAgICAgIGVsZW1TY29yZSA9IHRoaXMuc2NvcmVGdW5jdGlvbihlbGVtZW50KTtcblxuICAgIHdoaWxlKHRydWUpIHtcbiAgICAgIC8vIENvbXB1dGUgdGhlIGluZGljZXMgb2YgdGhlIGNoaWxkIGVsZW1lbnRzLlxuICAgICAgdmFyIGNoaWxkMk4gPSAobiArIDEpICogMiwgY2hpbGQxTiA9IGNoaWxkMk4gLSAxO1xuICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIHN0b3JlIHRoZSBuZXcgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnQsXG4gICAgICAvLyBpZiBhbnkuXG4gICAgICB2YXIgc3dhcCA9IG51bGw7XG4gICAgICAvLyBJZiB0aGUgZmlyc3QgY2hpbGQgZXhpc3RzIChpcyBpbnNpZGUgdGhlIGFycmF5KS4uLlxuICAgICAgaWYgKGNoaWxkMU4gPCBsZW5ndGgpIHtcbiAgICAgICAgLy8gTG9vayBpdCB1cCBhbmQgY29tcHV0ZSBpdHMgc2NvcmUuXG4gICAgICAgIHZhciBjaGlsZDEgPSB0aGlzLmNvbnRlbnRbY2hpbGQxTl0sXG4gICAgICAgICAgICBjaGlsZDFTY29yZSA9IHRoaXMuc2NvcmVGdW5jdGlvbihjaGlsZDEpO1xuICAgICAgICAvLyBJZiB0aGUgc2NvcmUgaXMgbGVzcyB0aGFuIG91ciBlbGVtZW50J3MsIHdlIG5lZWQgdG8gc3dhcC5cbiAgICAgICAgaWYgKGNoaWxkMVNjb3JlIDwgZWxlbVNjb3JlKVxuICAgICAgICAgIHN3YXAgPSBjaGlsZDFOO1xuICAgICAgfVxuICAgICAgLy8gRG8gdGhlIHNhbWUgY2hlY2tzIGZvciB0aGUgb3RoZXIgY2hpbGQuXG4gICAgICBpZiAoY2hpbGQyTiA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgY2hpbGQyID0gdGhpcy5jb250ZW50W2NoaWxkMk5dLFxuICAgICAgICAgICAgY2hpbGQyU2NvcmUgPSB0aGlzLnNjb3JlRnVuY3Rpb24oY2hpbGQyKTtcbiAgICAgICAgaWYgKGNoaWxkMlNjb3JlIDwgKHN3YXAgPT0gbnVsbCA/IGVsZW1TY29yZSA6IGNoaWxkMVNjb3JlKSl7XG4gICAgICAgICAgc3dhcCA9IGNoaWxkMk47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgbmVlZHMgdG8gYmUgbW92ZWQsIHN3YXAgaXQsIGFuZCBjb250aW51ZS5cbiAgICAgIGlmIChzd2FwICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb250ZW50W25dID0gdGhpcy5jb250ZW50W3N3YXBdO1xuICAgICAgICB0aGlzLmNvbnRlbnRbc3dhcF0gPSBlbGVtZW50O1xuICAgICAgICBuID0gc3dhcDtcbiAgICAgIH1cbiAgICAgIC8vIE90aGVyd2lzZSwgd2UgYXJlIGRvbmUuXG4gICAgICBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlS2RUcmVlOiBmdW5jdGlvbiAocG9pbnRzLCBtZXRyaWMsIGRpbWVuc2lvbnMpIHtcbiAgICByZXR1cm4gbmV3IEtkVHJlZShwb2ludHMsIG1ldHJpYywgZGltZW5zaW9ucylcbiAgfVxufVxuIl19
