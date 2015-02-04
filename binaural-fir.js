!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.BinauralFIR=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var kdt = require('kdt');
var audioContext = require("audio-context");
var BinauralFIR = function BinauralFIR() {
  this.hrtfDataset = [];
  this.hrtfDatasetLength = 0;
  this.tree = -1;
  this.position = {};
  this.nextPosition = {};
  this.changeWhenFinishCrossfading = false;
  this.intervalID = undefined;
  this.crossfadeDuration = 20 / 1000;
  this.input = undefined;
  this.mainConvolver = undefined;
  this.secondaryConvolver = undefined;
  this.input = audioContext.createGain();
  this.mainConvolver = new ConvolverAudioGraph();
  this.mainConvolver.gain.value = 1;
  this.input.connect(this.mainConvolver.input);
  this.secondaryConvolver = new ConvolverAudioGraph();
  this.secondaryConvolver.gain.value = 0;
  this.input.connect(this.secondaryConvolver.input);
  return this;
};
($traceurRuntime.createClass)(BinauralFIR, {
  connect: function(node) {
    this.mainConvolver.connect(node);
    this.secondaryConvolver.connect(node);
    return this;
  },
  disconnect: function(node) {
    this.mainConvolver.disconnect(node);
    this.secondaryConvolver.disconnect(node);
    return this;
  },
  set HRTFDataset(hrtfDataset) {
    this.hrtfDataset = hrtfDataset;
    this.hrtfDatasetLength = this.hrtfDataset.length;
    for (var i = 0; i < this.hrtfDatasetLength; i++) {
      var hrtf = this.hrtfDataset[i];
      var azimuthRadians = hrtf.azimuth * Math.PI / 180;
      var elevationRadians = hrtf.elevation * Math.PI / 180;
      var catesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, hrtf.distance);
      hrtf.x = catesianCoord.x;
      hrtf.y = catesianCoord.y;
      hrtf.z = catesianCoord.z;
    }
    this.tree = kdt.createKdTree(this.hrtfDataset, this.distance, ['x', 'y', 'z']);
  },
  get HRTFDataset() {
    return this.hrtfDataset;
  },
  distance: function(a, b) {
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);
  },
  setPosition: function(azimuth, elevation, distance) {
    if (arguments.length === 3 || arguments.length === 4) {
      var nearestPosition = this.getRealCoordinates(azimuth, elevation, distance);
      if (nearestPosition.azimuth !== this.position.azimuth || nearestPosition.elevation !== this.position.elevation || nearestPosition.distance !== this.position.distance) {
        if (this.isCrossfading() === true) {
          if (this.changeWhenFinishCrossfading === true) {
            clearInterval(this.intervalID);
          } else {
            this.changeWhenFinishCrossfading = true;
          }
          this.nextPosition.azimuth = nearestPosition.azimuth;
          this.nextPosition.elevation = nearestPosition.elevation;
          this.nextPosition.distance = nearestPosition.distance;
          this.intervalID = window.setInterval(this.setLastPosition.bind(this), 0.005);
        } else {
          this.nextPosition.azimuth = nearestPosition.azimuth;
          this.nextPosition.elevation = nearestPosition.elevation;
          this.nextPosition.distance = nearestPosition.distance;
          this.reallyStartPosition();
        }
        return this;
      }
    }
  },
  isCrossfading: function() {
    if (this.mainConvolver.gain.value !== 1) {
      return true;
    } else {
      return false;
    }
  },
  reallyStartPosition: function() {
    this.position.azimuth = this.nextPosition.azimuth;
    this.position.elevation = this.nextPosition.elevation;
    this.position.distance = this.nextPosition.distance;
    this.secondaryConvolver.buffer = this.getHRTF(this.position.azimuth, this.position.elevation, this.position.distance);
    this.crossfading();
    var active = this.mainConvolver;
    this.mainConvolver = this.secondaryConvolver;
    this.secondaryConvolver = active;
    if (this.changeWhenFinishCrossfading) {
      this.changeWhenFinishCrossfading = false;
      clearInterval(this.intervalID);
    }
  },
  setCrossfadeDuration: function(duration) {
    if (duration) {
      this.crossfadeDuration = duration / 1000;
      return this;
    } else {
      throw "CrossfadeDuration setting error";
    }
  },
  getCrossfadeDuration: function() {
    return this.crossfadeDuration * 1000;
  },
  getPosition: function() {
    return this.position;
  },
  crossfading: function() {
    var guardInterval = 0.02;
    this.mainConvolver.gain.setValueAtTime(1, audioContext.currentTime + guardInterval);
    this.mainConvolver.gain.linearRampToValueAtTime(0, audioContext.currentTime + guardInterval + this.crossfadeDuration);
    this.secondaryConvolver.gain.setValueAtTime(0, audioContext.currentTime + guardInterval);
    this.secondaryConvolver.gain.linearRampToValueAtTime(1, audioContext.currentTime + guardInterval + this.crossfadeDuration);
  },
  getHRTF: function(azimuth, elevation, distance) {
    var nearest = this.getNearestPoint(azimuth, elevation, distance);
    return nearest.buffer;
  },
  sphericalToCartesian: function(azimuth, elevation, distance) {
    return {
      x: distance * Math.sin(azimuth),
      y: distance * Math.cos(azimuth),
      z: distance * Math.sin(elevation)
    };
  },
  getRealCoordinates: function(azimuth, elevation, distance) {
    var nearest = this.getNearestPoint(azimuth, elevation, distance);
    return {
      azimuth: nearest.azimuth,
      elevation: nearest.elevation,
      distance: nearest.distance
    };
  },
  getNearestPoint: function(azimuth, elevation, distance) {
    var azimuthRadians = azimuth * Math.PI / 180;
    var elevationRadians = elevation * Math.PI / 180;
    var cartesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, distance);
    var nearest = this.tree.nearest(cartesianCoord, 1)[0];
    return nearest[0];
  },
  setLastPosition: function() {
    if (!this.isCrossfading()) {
      this.reallyStartPosition();
    }
  }
}, {});
;
var ConvolverAudioGraph = function ConvolverAudioGraph() {
  this.gainNode = audioContext.createGain();
  this.convNode = audioContext.createConvolver();
  this.convNode.normalize = false;
  this.gainNode.connect(this.convNode);
  this.oscillatorNode = audioContext.createOscillator();
  this.gainOscillatorNode = audioContext.createGain();
  this.oscillatorNode.connect(this.gainOscillatorNode);
  this.gainOscillatorNode.connect(this.gainNode);
  this.gainOscillatorNode.gain.value = 0;
  this.oscillatorNode.start(0);
  return this;
};
($traceurRuntime.createClass)(ConvolverAudioGraph, {
  get input() {
    return this.gainNode;
  },
  get gain() {
    return this.gainNode.gain;
  },
  set buffer(value) {
    this.convNode.buffer = value;
  },
  connect: function(node) {
    this.convNode.connect(node);
    return this;
  },
  disconnect: function(node) {
    this.convNode.disconnect(node);
    return this;
  }
}, {});
;
module.exports = BinauralFIR;


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js
},{"audio-context":3,"kdt":4}],2:[function(require,module,exports){
/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/* 

This monkeypatch library is intended to be included in projects that are
written to the proper AudioContext spec (instead of webkitAudioContext), 
and that use the new naming and proper bits of the Web Audio API (e.g. 
using BufferSourceNode.start() instead of BufferSourceNode.noteOn()), but may
have to run on systems that only support the deprecated bits.

This library should be harmless to include if the browser supports 
unprefixed "AudioContext", and/or if it supports the new names.  

The patches this library handles:
if window.AudioContext is unsupported, it will be aliased to webkitAudioContext().
if AudioBufferSourceNode.start() is unimplemented, it will be routed to noteOn() or
noteGrainOn(), depending on parameters.

The following aliases only take effect if the new names are not already in place:

AudioBufferSourceNode.stop() is aliased to noteOff()
AudioContext.createGain() is aliased to createGainNode()
AudioContext.createDelay() is aliased to createDelayNode()
AudioContext.createScriptProcessor() is aliased to createJavaScriptNode()
AudioContext.createPeriodicWave() is aliased to createWaveTable()
OscillatorNode.start() is aliased to noteOn()
OscillatorNode.stop() is aliased to noteOff()
OscillatorNode.setPeriodicWave() is aliased to setWaveTable()
AudioParam.setTargetAtTime() is aliased to setTargetValueAtTime()

This library does NOT patch the enumerated type changes, as it is 
recommended in the specification that implementations support both integer
and string types for AudioPannerNode.panningModel, AudioPannerNode.distanceModel 
BiquadFilterNode.type and OscillatorNode.type.

*/
(function (global, exports, perf) {
  'use strict';

  function fixSetTarget(param) {
    if (!param) // if NYI, just return
      return;
    if (!param.setTargetAtTime)
      param.setTargetAtTime = param.setTargetValueAtTime; 
  }

  if (window.hasOwnProperty('webkitAudioContext') && 
      !window.hasOwnProperty('AudioContext')) {
    window.AudioContext = webkitAudioContext;

    if (!AudioContext.prototype.hasOwnProperty('createGain'))
      AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
    if (!AudioContext.prototype.hasOwnProperty('createDelay'))
      AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode;
    if (!AudioContext.prototype.hasOwnProperty('createScriptProcessor'))
      AudioContext.prototype.createScriptProcessor = AudioContext.prototype.createJavaScriptNode;
    if (!AudioContext.prototype.hasOwnProperty('createPeriodicWave'))
      AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable;


    AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain;
    AudioContext.prototype.createGain = function() { 
      var node = this.internal_createGain();
      fixSetTarget(node.gain);
      return node;
    };

    AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay;
    AudioContext.prototype.createDelay = function(maxDelayTime) { 
      var node = maxDelayTime ? this.internal_createDelay(maxDelayTime) : this.internal_createDelay();
      fixSetTarget(node.delayTime);
      return node;
    };

    AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource;
    AudioContext.prototype.createBufferSource = function() { 
      var node = this.internal_createBufferSource();
      if (!node.start) {
        node.start = function ( when, offset, duration ) {
          if ( offset || duration )
            this.noteGrainOn( when, offset, duration );
          else
            this.noteOn( when );
        };
      }
      if (!node.stop)
        node.stop = node.noteOff;
      fixSetTarget(node.playbackRate);
      return node;
    };

    AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor;
    AudioContext.prototype.createDynamicsCompressor = function() { 
      var node = this.internal_createDynamicsCompressor();
      fixSetTarget(node.threshold);
      fixSetTarget(node.knee);
      fixSetTarget(node.ratio);
      fixSetTarget(node.reduction);
      fixSetTarget(node.attack);
      fixSetTarget(node.release);
      return node;
    };

    AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter;
    AudioContext.prototype.createBiquadFilter = function() { 
      var node = this.internal_createBiquadFilter();
      fixSetTarget(node.frequency);
      fixSetTarget(node.detune);
      fixSetTarget(node.Q);
      fixSetTarget(node.gain);
      return node;
    };

    if (AudioContext.prototype.hasOwnProperty( 'createOscillator' )) {
      AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator;
      AudioContext.prototype.createOscillator = function() { 
        var node = this.internal_createOscillator();
        if (!node.start)
          node.start = node.noteOn; 
        if (!node.stop)
          node.stop = node.noteOff;
        if (!node.setPeriodicWave)
          node.setPeriodicWave = node.setWaveTable;
        fixSetTarget(node.frequency);
        fixSetTarget(node.detune);
        return node;
      };
    }
  }
}(window));
},{}],3:[function(require,module,exports){
/*globals AudioContext*/
require('./ac-monkeypatch');
window.waves = window.waves || {};
module.exports = window.waves.audioContext = window.waves.audioContext || new AudioContext();
},{"./ac-monkeypatch":2}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2F1ZGlvLWNvbnRleHQvYWMtbW9ua2V5cGF0Y2guanMiLCJub2RlX21vZHVsZXMvYXVkaW8tY29udGV4dC9hdWRpby1jb250ZXh0LmpzIiwibm9kZV9tb2R1bGVzL2tkdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ1NBO0FBQUEsQUFBSSxFQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7QUFDeEIsQUFBSSxFQUFBLENBQUEsWUFBVyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsZUFBYyxDQUFDLENBQUM7QUFWM0MsQUFBSSxFQUFBLGNBZ0JKLFNBQU0sWUFBVSxDQUVILEFBQUMsQ0FBRTtBQUNaLEtBQUcsWUFBWSxFQUFJLEdBQUMsQ0FBQztBQUNyQixLQUFHLGtCQUFrQixFQUFJLEVBQUEsQ0FBQztBQUMxQixLQUFHLEtBQUssRUFBSSxFQUFDLENBQUEsQ0FBQztBQUNkLEtBQUcsU0FBUyxFQUFJLEdBQUMsQ0FBQztBQUNsQixLQUFHLGFBQWEsRUFBSSxHQUFDLENBQUM7QUFDdEIsS0FBRyw0QkFBNEIsRUFBSSxNQUFJLENBQUM7QUFDeEMsS0FBRyxXQUFXLEVBQUksVUFBUSxDQUFDO0FBQzNCLEtBQUcsa0JBQWtCLEVBQUksQ0FBQSxFQUFDLEVBQUksS0FBRyxDQUFDO0FBQ2xDLEtBQUcsTUFBTSxFQUFJLFVBQVEsQ0FBQztBQUN0QixLQUFHLGNBQWMsRUFBSSxVQUFRLENBQUM7QUFDOUIsS0FBRyxtQkFBbUIsRUFBSSxVQUFRLENBQUM7QUFFbkMsS0FBRyxNQUFNLEVBQUksQ0FBQSxZQUFXLFdBQVcsQUFBQyxFQUFDLENB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogd3JpdHRlbiBpbiBFQ01Bc2NyaXB0IDYgKi9cbi8qKlxuICogQGZpbGVPdmVydmlld1xuICogVGhlIGJpbmF1cmFsRklSIG5vZGUgcHJvdmlkZXMgYmluYXVyYWwgbGlzdGVuaW5nIHRvIHRoZSB1c2VyLiBUaGUgbm92ZWx0eSBvZlxuICogdGhpcyBsaWJyYXJ5IGlzIHRoYXQgaXQgcGVybWl0cyB0byB1c2UgeW91ciBvd24gSFJURiBkYXRhc2V0LiBUaGlzIGxpYnJhcnlcbiAqIGNhbiBiZSB1c2VkIGFzIGEgcmVndWxhciBub2RlIGluc2lkZSB0aGUgV2ViIEF1ZGlvIEFQSS5cbiAqIEBhdXRob3IgQXJuYXUgSnVsacOgXG4gKiBAdmVyc2lvbiAwLjEuMVxuICovXG52YXIga2R0ID0gcmVxdWlyZSgna2R0Jyk7XG52YXIgYXVkaW9Db250ZXh0ID0gcmVxdWlyZShcImF1ZGlvLWNvbnRleHRcIik7XG5cbi8qKlxuICogQGNsYXNzIEJpbmF1cmFsRklSXG4gKi9cblxuY2xhc3MgQmluYXVyYWxGSVIge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaHJ0ZkRhdGFzZXQgPSBbXTtcbiAgICB0aGlzLmhydGZEYXRhc2V0TGVuZ3RoID0gMDtcbiAgICB0aGlzLnRyZWUgPSAtMTtcbiAgICB0aGlzLnBvc2l0aW9uID0ge307XG4gICAgdGhpcy5uZXh0UG9zaXRpb24gPSB7fTtcbiAgICB0aGlzLmNoYW5nZVdoZW5GaW5pc2hDcm9zc2ZhZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaW50ZXJ2YWxJRCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uID0gMjAgLyAxMDAwO1xuICAgIHRoaXMuaW5wdXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tYWluQ29udm9sdmVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5pbnB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cbiAgICAvLyBUd28gc3ViIGF1ZGlvIGdyYXBocyBjcmVhdGlvbjpcbiAgICAvLyAtIG1haW5Db252b2x2ZXIgd2hpY2ggcmVwcmVzZW50cyB0aGUgY3VycmVudCBzdGF0ZVxuICAgIC8vIC0gYW5kIHNlY29uZGFyeUNvbnZvbHZlciB3aGljaCByZXByZXNlbnRzIHRoZSBwb3RlbnRpYWwgdGFyZ2V0IHN0YXRlXG4gICAgLy8gICB3aGVuIG1vdmluZyBzb3VuZCB0byBhIG5ldyBwb3NpdGlvblxuXG4gICAgdGhpcy5tYWluQ29udm9sdmVyID0gbmV3IENvbnZvbHZlckF1ZGlvR3JhcGgoKTtcbiAgICB0aGlzLm1haW5Db252b2x2ZXIuZ2Fpbi52YWx1ZSA9IDE7XG4gICAgdGhpcy5pbnB1dC5jb25uZWN0KHRoaXMubWFpbkNvbnZvbHZlci5pbnB1dCk7XG5cbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlciA9IG5ldyBDb252b2x2ZXJBdWRpb0dyYXBoKCk7XG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuZ2Fpbi52YWx1ZSA9IDA7XG4gICAgdGhpcy5pbnB1dC5jb25uZWN0KHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmlucHV0KTtcblxuICAgIHJldHVybiB0aGlzOyAvLyBGb3IgY2hhaW5hYmlsaXR5XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0aGUgYmluYXVyYWxGSVJOb2RlIHRvIHRoZSBXZWIgQXVkaW8gZ3JhcGhcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBub2RlIERlc3RpbmF0aW9uIG5vZGVcbiAgICovXG4gIGNvbm5lY3Qobm9kZSkge1xuICAgIHRoaXMubWFpbkNvbnZvbHZlci5jb25uZWN0KG5vZGUpO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmNvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7IC8vIEZvciBjaGFpbmFiaWxpdHlcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0IHRoZSBiaW5hdXJhbEZJUk5vZGUgZnJvbSB0aGUgV2ViIEF1ZGlvIGdyYXBoXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBkaXNjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLm1haW5Db252b2x2ZXIuZGlzY29ubmVjdChub2RlKTtcbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5kaXNjb25uZWN0KG5vZGUpO1xuICAgIHJldHVybiB0aGlzOyAvLyBGb3IgY2hhaW5hYmlsaXR5XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgSFJURiBEYXRhc2V0IHRvIGJlIHVzZWQgd2l0aCB0aGUgdmlydHVhbCBzb3VyY2UuXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gaHJ0ZkRhdGFzZXQgQXJyYXkgb2YgT2JqZWN0cyBjb250YWluaW5nIHRoZSBhemltdXRoLCBkaXN0YW5jZSwgZWxldmF0aW9uLCB1cmwgYW5kIGJ1ZmZlciBmb3IgZWFjaCBwb2ludFxuICAgKi9cbiAgc2V0IEhSVEZEYXRhc2V0KGhydGZEYXRhc2V0KSB7XG4gICAgdGhpcy5ocnRmRGF0YXNldCA9IGhydGZEYXRhc2V0O1xuICAgIHRoaXMuaHJ0ZkRhdGFzZXRMZW5ndGggPSB0aGlzLmhydGZEYXRhc2V0Lmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ocnRmRGF0YXNldExlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaHJ0ZiA9IHRoaXMuaHJ0ZkRhdGFzZXRbaV07XG4gICAgICAvLyBBemltdXRoIGFuZCBlbGV2YXRpb24gdG8gcmFkaWFuc1xuICAgICAgdmFyIGF6aW11dGhSYWRpYW5zID0gaHJ0Zi5hemltdXRoICogTWF0aC5QSSAvIDE4MDtcbiAgICAgIHZhciBlbGV2YXRpb25SYWRpYW5zID0gaHJ0Zi5lbGV2YXRpb24gKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgdmFyIGNhdGVzaWFuQ29vcmQgPSB0aGlzLnNwaGVyaWNhbFRvQ2FydGVzaWFuKGF6aW11dGhSYWRpYW5zLCBlbGV2YXRpb25SYWRpYW5zLCBocnRmLmRpc3RhbmNlKTtcbiAgICAgIGhydGYueCA9IGNhdGVzaWFuQ29vcmQueDtcbiAgICAgIGhydGYueSA9IGNhdGVzaWFuQ29vcmQueTtcbiAgICAgIGhydGYueiA9IGNhdGVzaWFuQ29vcmQuejtcbiAgICB9XG4gICAgdGhpcy50cmVlID0ga2R0LmNyZWF0ZUtkVHJlZSh0aGlzLmhydGZEYXRhc2V0LCB0aGlzLmRpc3RhbmNlLCBbJ3gnLCAneScsICd6J10pO1xuICB9XG5cbiAgZ2V0IEhSVEZEYXRhc2V0KCkge1xuICAgIHJldHVybiB0aGlzLmhydGZEYXRhc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzIGluIGEgMy1EIHNwYWNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBhIE9iamVjdCBjb250YWluaW5nIHRocmVlIHByb3BlcnRpZXM6IHgsIHksIHpcbiAgICogQHBhcmFtIGIgT2JqZWN0IGNvbnRhaW5pbmcgdGhyZWUgcHJvcGVydGllczogeCwgeSwgelxuICAgKi9cbiAgZGlzdGFuY2UoYSwgYikge1xuICAgIC8vIE5vIG5lZWQgdG8gY29tcHV0ZSBzcXVhcmUgcm9vdCBoZXJlIGZvciBkaXN0YW5jZSBjb21wYXJpc29uLCB0aGlzIGlzIG1vcmUgZWZpY2llbnQuXG4gICAgcmV0dXJuIE1hdGgucG93KGEueCAtIGIueCwgMikgKyBNYXRoLnBvdyhhLnkgLSBiLnksIDIpICsgTWF0aC5wb3coYS56IC0gYi56LCAyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcG9zaXRpb24gb2YgdGhlIHZpcnR1YWwgc291cmNlXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICogQHRvZG8gSW1wbGVtZW50IEltbWVkaWF0ZSBzZXRQb3NpdGlvblxuICAgKi9cbiAgc2V0UG9zaXRpb24oYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBuZWFyZXN0IHBvc2l0aW9uIGZvciB0aGUgaW5wdXQgYXppbXV0aCwgZWxldmF0aW9uIGFuZCBkaXN0YW5jZVxuICAgICAgdmFyIG5lYXJlc3RQb3NpdGlvbiA9IHRoaXMuZ2V0UmVhbENvb3JkaW5hdGVzKGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpO1xuICAgICAgLy8gTm8gbmVlZCB0byBjaGFuZ2UgdGhlIGN1cnJlbnQgSFJURiBsb2FkZWQgaWYgc2V0dGVkIHBvc2l0aW9uIGVxdWFsIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIGlmIChuZWFyZXN0UG9zaXRpb24uYXppbXV0aCAhPT0gdGhpcy5wb3NpdGlvbi5hemltdXRoIHx8IG5lYXJlc3RQb3NpdGlvbi5lbGV2YXRpb24gIT09IHRoaXMucG9zaXRpb24uZWxldmF0aW9uIHx8IG5lYXJlc3RQb3NpdGlvbi5kaXN0YW5jZSAhPT0gdGhpcy5wb3NpdGlvbi5kaXN0YW5jZSkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY3Jvc3NmYWRpbmcgaXMgYWN0aXZlXG4gICAgICAgIGlmICh0aGlzLmlzQ3Jvc3NmYWRpbmcoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgdmFsdWUgd2FpdGluZyB0byBiZSBzZXRcbiAgICAgICAgICBpZiAodGhpcy5jaGFuZ2VXaGVuRmluaXNoQ3Jvc3NmYWRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3AgdGhlIHBhc3Qgc2V0SW50ZXJ2YWwgZXZlbnQuXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU2F2ZSB0aGUgcG9zaXRpb25cbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5hemltdXRoID0gbmVhcmVzdFBvc2l0aW9uLmF6aW11dGg7XG4gICAgICAgICAgdGhpcy5uZXh0UG9zaXRpb24uZWxldmF0aW9uID0gbmVhcmVzdFBvc2l0aW9uLmVsZXZhdGlvbjtcbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5kaXN0YW5jZSA9IG5lYXJlc3RQb3NpdGlvbi5kaXN0YW5jZTtcblxuICAgICAgICAgIC8vIFN0YXJ0IHRoZSBzZXRJbnRlcnZhbDogd2FpdCB1bnRpbCB0aGUgY3Jvc3NmYWRpbmcgaXMgZmluaXNoZWQuXG4gICAgICAgICAgdGhpcy5pbnRlcnZhbElEID0gd2luZG93LnNldEludGVydmFsKHRoaXMuc2V0TGFzdFBvc2l0aW9uLmJpbmQodGhpcyksIDAuMDA1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5hemltdXRoID0gbmVhcmVzdFBvc2l0aW9uLmF6aW11dGg7XG4gICAgICAgICAgdGhpcy5uZXh0UG9zaXRpb24uZWxldmF0aW9uID0gbmVhcmVzdFBvc2l0aW9uLmVsZXZhdGlvbjtcbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5kaXN0YW5jZSA9IG5lYXJlc3RQb3NpdGlvbi5kaXN0YW5jZTtcbiAgICAgICAgICB0aGlzLnJlYWxseVN0YXJ0UG9zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzOyAvLyBGb3IgY2hhaW5hYmlsaXR5XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpZiB0aGUgZ2FpbnMgYXJlIGluIGEgY3Jvc3NmYWRpbmcgb3Igbm90LlxuICAgKiBAZmFsc2VcbiAgICovXG4gIGlzQ3Jvc3NmYWRpbmcoKSB7XG4gICAgLy8gVGhlIHJhbXBzIGFyZSBub3QgZmluaXNoZWQsIHNvIHRoZSBjcm9zc2ZhZGluZyBpcyBub3QgZmluaXNoZWRcbiAgICBpZiAodGhpcy5tYWluQ29udm9sdmVyLmdhaW4udmFsdWUgIT09IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWxseSBjaGFuZ2UgdGhlIHBvc2l0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWFsbHlTdGFydFBvc2l0aW9uKCkge1xuXG4gICAgLy8gU2F2ZSB0aGUgY3VycmVudCBwb3NpdGlvblxuICAgIHRoaXMucG9zaXRpb24uYXppbXV0aCA9IHRoaXMubmV4dFBvc2l0aW9uLmF6aW11dGg7XG4gICAgdGhpcy5wb3NpdGlvbi5lbGV2YXRpb24gPSB0aGlzLm5leHRQb3NpdGlvbi5lbGV2YXRpb247XG4gICAgdGhpcy5wb3NpdGlvbi5kaXN0YW5jZSA9IHRoaXMubmV4dFBvc2l0aW9uLmRpc3RhbmNlO1xuICAgIC8vIExvYWQgdGhlIG5ldyBwb3NpdGlvbiBpbiB0aGUgY29udm9sdmVyIG5vdCBhY3RpdmUgKHNlY29uZGFyeUNvbnZvbHZlcilcbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5idWZmZXIgPSB0aGlzLmdldEhSVEYodGhpcy5wb3NpdGlvbi5hemltdXRoLCB0aGlzLnBvc2l0aW9uLmVsZXZhdGlvbiwgdGhpcy5wb3NpdGlvbi5kaXN0YW5jZSk7XG4gICAgLy8gRG8gdGhlIGNyb3NzZmFkaW5nIGJldHdlZW4gbWFpbkNvbnZvbHZlciBhbmQgc2Vjb25kYXJ5Q29udm9sdmVyXG4gICAgdGhpcy5jcm9zc2ZhZGluZygpO1xuXG4gICAgLy8gQ2hhbmdlIGN1cnJlbnQgbWFpbkNvbnZvbHZlclxuICAgIHZhciBhY3RpdmUgPSB0aGlzLm1haW5Db252b2x2ZXI7XG4gICAgdGhpcy5tYWluQ29udm9sdmVyID0gdGhpcy5zZWNvbmRhcnlDb252b2x2ZXI7XG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIgPSBhY3RpdmU7XG5cbiAgICBpZiAodGhpcy5jaGFuZ2VXaGVuRmluaXNoQ3Jvc3NmYWRpbmcpIHtcbiAgICAgIHRoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nID0gZmFsc2U7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZHVyYXRpb24gb2YgY3Jvc3NmYWRpbmcgaW4gbWlsaXNlY29uZHMuXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gZHVyYXRpb24gRHVyYXRpb24gb2YgdGhlIGNyb3NzZmFkaW5nIGluIG1pbGlzZWNvbmRzXG4gICAqL1xuICBzZXRDcm9zc2ZhZGVEdXJhdGlvbihkdXJhdGlvbikge1xuICAgIGlmIChkdXJhdGlvbikge1xuICAgICAgLy8gTWlsaXNlY29uZHMgdG8gc1xuICAgICAgdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbiA9IGR1cmF0aW9uIC8gMTAwMDtcbiAgICAgIHJldHVybiB0aGlzOyAvLyBmb3IgY2hhaW5hYmlsaXR5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IFwiQ3Jvc3NmYWRlRHVyYXRpb24gc2V0dGluZyBlcnJvclwiO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGR1cmF0aW9uIG9mIGNyb3NzZmFkaW5nIGluIG1pbGlzZWNvbmRzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXRDcm9zc2ZhZGVEdXJhdGlvbigpIHtcbiAgICAvLyBTZWNvbmRzIHRvIG1zXG4gICAgcmV0dXJuIHRoaXMuY3Jvc3NmYWRlRHVyYXRpb24gKiAxMDAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgdmlydHVhbCBzb3VyY2UuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIERvIHRoZSBjcm9zc2ZhZGluZyBiZXR3ZWVuIHRoZSBnYWluTm9kZSBhY3RpdmUgYW5kIGluYWN0aXZlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY3Jvc3NmYWRpbmcoKSB7XG4gICAgLy8gRG8gdGhlIGNyb3NzZmFkaW5nIGJldHdlZW4gbWFpbkNvbnZvbHZlciBhbmQgc2Vjb25kYXJ5Q29udm9sdmVyXG4gICAgdmFyIGd1YXJkSW50ZXJ2YWwgPSAwLjAyO1xuICAgIHRoaXMubWFpbkNvbnZvbHZlci5nYWluLnNldFZhbHVlQXRUaW1lKDEsIGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGd1YXJkSW50ZXJ2YWwpO1xuICAgIHRoaXMubWFpbkNvbnZvbHZlci5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGd1YXJkSW50ZXJ2YWwgKyB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uKTtcblxuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCwgYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZ3VhcmRJbnRlcnZhbCk7XG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgxLCBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBndWFyZEludGVydmFsICsgdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBIUlRGIGZpbGUgZm9yIGFuIGVzcGVjaWZpYyBwb3NpdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIGdldEhSVEYoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuICAgIHZhciBuZWFyZXN0ID0gdGhpcy5nZXROZWFyZXN0UG9pbnQoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSk7XG4gICAgLy8gUmV0dXJuIGJ1ZmZlciBvZiBuZWFyZXN0IHBvc2l0aW9uIGZvciB0aGUgaW5wdXQgdmFsdWVzXG4gICAgcmV0dXJuIG5lYXJlc3QuYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGUgc3BoZXJpY2FsIHRvIGNhcnRlc2lhbiBjb29yZGluYXRlcy5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIGF6aW11dGggQXppbXV0aCBpbiByYWRpYW5zXG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIHJhZGlhbnNcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgc3BoZXJpY2FsVG9DYXJ0ZXNpYW4oYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBkaXN0YW5jZSAqIE1hdGguc2luKGF6aW11dGgpLFxuICAgICAgeTogZGlzdGFuY2UgKiBNYXRoLmNvcyhhemltdXRoKSxcbiAgICAgIHo6IGRpc3RhbmNlICogTWF0aC5zaW4oZWxldmF0aW9uKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5lYXJlc3QgcG9zaXRpb24gZm9yIGFuIGlucHV0IHBvc2l0aW9uLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIGdldFJlYWxDb29yZGluYXRlcyhhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgdmFyIG5lYXJlc3QgPSB0aGlzLmdldE5lYXJlc3RQb2ludChhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKTtcbiAgICAvLyBSZXR1cm4gYXppbXV0aCwgZWxldmF0aW9uIGFuZCBkaXN0YW5jZSBvZiBuZWFyZXN0IHBvc2l0aW9uIGZvciB0aGUgaW5wdXQgdmFsdWVzXG4gICAgcmV0dXJuIHtcbiAgICAgIGF6aW11dGg6IG5lYXJlc3QuYXppbXV0aCxcbiAgICAgIGVsZXZhdGlvbjogbmVhcmVzdC5lbGV2YXRpb24sXG4gICAgICBkaXN0YW5jZTogbmVhcmVzdC5kaXN0YW5jZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5lYXJlc3QgcG9zaXRpb24gZm9yIGFuIGlucHV0IHBvc2l0aW9uLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIGdldE5lYXJlc3RQb2ludChhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgLy8gRGVncmVlcyB0byByYWRpYW5zIGZvciB0aGUgYXppbXV0aCBhbmQgZWxldmF0aW9uXG4gICAgdmFyIGF6aW11dGhSYWRpYW5zID0gYXppbXV0aCAqIE1hdGguUEkgLyAxODA7XG4gICAgdmFyIGVsZXZhdGlvblJhZGlhbnMgPSBlbGV2YXRpb24gKiBNYXRoLlBJIC8gMTgwO1xuICAgIC8vIENvbnZlcnQgc3BoZXJpY2FsIGNvb3JkaW5hdGVzIHRvIGNhcnRlc2lhblxuICAgIHZhciBjYXJ0ZXNpYW5Db29yZCA9IHRoaXMuc3BoZXJpY2FsVG9DYXJ0ZXNpYW4oYXppbXV0aFJhZGlhbnMsIGVsZXZhdGlvblJhZGlhbnMsIGRpc3RhbmNlKTtcbiAgICAvLyBHZXQgdGhlIG5lYXJlc3QgSFJURiBmaWxlIGZvciB0aGUgZGVzaXJlZCBwb3NpdGlvblxuICAgIHZhciBuZWFyZXN0ID0gdGhpcy50cmVlLm5lYXJlc3QoY2FydGVzaWFuQ29vcmQsIDEpWzBdO1xuXG4gICAgcmV0dXJuIG5lYXJlc3RbMF07XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIHNldCB0aGUgbmV4dFBvc2l0aW9uIHBvc2l0aW9uIGlmIHRoZSByYW1wcyBhcmUgbm90IGluIGEgY3Jvc3NmYWRpbmdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldExhc3RQb3NpdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuaXNDcm9zc2ZhZGluZygpKSB7XG4gICAgICB0aGlzLnJlYWxseVN0YXJ0UG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuXG59O1xuXG4vKipcbiAqIENvbnZvbHZlciBzdWIgYXVkaW8gZ3JhcGggY2xhc3NcbiAqL1xuXG5jbGFzcyBDb252b2x2ZXJBdWRpb0dyYXBoIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLmNvbnZOb2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUNvbnZvbHZlcigpO1xuICAgIHRoaXMuY29udk5vZGUubm9ybWFsaXplID0gZmFsc2U7XG4gICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udk5vZGUpO1xuXG4gICAgLy8gSGFjayB0byBmb3JjZSBhdWRpb1BhcmFtIGFjdGl2ZSB3aGVuIHRoZSBzb3VyY2UgaXMgbm90IGFjdGl2ZVxuICAgIHRoaXMub3NjaWxsYXRvck5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgIHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLm9zY2lsbGF0b3JOb2RlLmNvbm5lY3QodGhpcy5nYWluT3NjaWxsYXRvck5vZGUpO1xuICAgIHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgdGhpcy5nYWluT3NjaWxsYXRvck5vZGUuZ2Fpbi52YWx1ZSA9IDA7XG4gICAgdGhpcy5vc2NpbGxhdG9yTm9kZS5zdGFydCgwKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IGlucHV0KCkge1xuICAgIHJldHVybiB0aGlzLmdhaW5Ob2RlO1xuICB9XG5cbiAgZ2V0IGdhaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2Fpbk5vZGUuZ2FpbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGJ1ZmZlciBpbiB0aGUgY29udm9sdmVyTm9kZVxuICAgKiBAcHVibGljXG4gICAqIEBwYXJhbSB2YWx1ZSBBdWRpb0J1ZmZlciBPYmplY3QuXG4gICAqL1xuICBzZXQgYnVmZmVyKHZhbHVlKSB7XG4gICAgdGhpcy5jb252Tm9kZS5idWZmZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0IHRoZSBDb252b2x2ZXJBdWRpb0dyYXBoIHRvIGEgbm9kZVxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIG5vZGUgRGVzdGluYXRpb24gbm9kZVxuICAgKi9cbiAgY29ubmVjdChub2RlKSB7XG4gICAgdGhpcy5jb252Tm9kZS5jb25uZWN0KG5vZGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3QgdGhlIENvbnZvbHZlckF1ZGlvR3JhcGggdG8gYSBub2RlXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBkaXNjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLmNvbnZOb2RlLmRpc2Nvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufTtcblxuLy8gQ29tbW9uSlMgZnVuY3Rpb24gZXhwb3J0XG5tb2R1bGUuZXhwb3J0cyA9IEJpbmF1cmFsRklSO1xuIiwiLyogQ29weXJpZ2h0IDIwMTMgQ2hyaXMgV2lsc29uXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAgIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAgIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyogXG5cblRoaXMgbW9ua2V5cGF0Y2ggbGlicmFyeSBpcyBpbnRlbmRlZCB0byBiZSBpbmNsdWRlZCBpbiBwcm9qZWN0cyB0aGF0IGFyZVxud3JpdHRlbiB0byB0aGUgcHJvcGVyIEF1ZGlvQ29udGV4dCBzcGVjIChpbnN0ZWFkIG9mIHdlYmtpdEF1ZGlvQ29udGV4dCksIFxuYW5kIHRoYXQgdXNlIHRoZSBuZXcgbmFtaW5nIGFuZCBwcm9wZXIgYml0cyBvZiB0aGUgV2ViIEF1ZGlvIEFQSSAoZS5nLiBcbnVzaW5nIEJ1ZmZlclNvdXJjZU5vZGUuc3RhcnQoKSBpbnN0ZWFkIG9mIEJ1ZmZlclNvdXJjZU5vZGUubm90ZU9uKCkpLCBidXQgbWF5XG5oYXZlIHRvIHJ1biBvbiBzeXN0ZW1zIHRoYXQgb25seSBzdXBwb3J0IHRoZSBkZXByZWNhdGVkIGJpdHMuXG5cblRoaXMgbGlicmFyeSBzaG91bGQgYmUgaGFybWxlc3MgdG8gaW5jbHVkZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBcbnVucHJlZml4ZWQgXCJBdWRpb0NvbnRleHRcIiwgYW5kL29yIGlmIGl0IHN1cHBvcnRzIHRoZSBuZXcgbmFtZXMuICBcblxuVGhlIHBhdGNoZXMgdGhpcyBsaWJyYXJ5IGhhbmRsZXM6XG5pZiB3aW5kb3cuQXVkaW9Db250ZXh0IGlzIHVuc3VwcG9ydGVkLCBpdCB3aWxsIGJlIGFsaWFzZWQgdG8gd2Via2l0QXVkaW9Db250ZXh0KCkuXG5pZiBBdWRpb0J1ZmZlclNvdXJjZU5vZGUuc3RhcnQoKSBpcyB1bmltcGxlbWVudGVkLCBpdCB3aWxsIGJlIHJvdXRlZCB0byBub3RlT24oKSBvclxubm90ZUdyYWluT24oKSwgZGVwZW5kaW5nIG9uIHBhcmFtZXRlcnMuXG5cblRoZSBmb2xsb3dpbmcgYWxpYXNlcyBvbmx5IHRha2UgZWZmZWN0IGlmIHRoZSBuZXcgbmFtZXMgYXJlIG5vdCBhbHJlYWR5IGluIHBsYWNlOlxuXG5BdWRpb0J1ZmZlclNvdXJjZU5vZGUuc3RvcCgpIGlzIGFsaWFzZWQgdG8gbm90ZU9mZigpXG5BdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpIGlzIGFsaWFzZWQgdG8gY3JlYXRlR2Fpbk5vZGUoKVxuQXVkaW9Db250ZXh0LmNyZWF0ZURlbGF5KCkgaXMgYWxpYXNlZCB0byBjcmVhdGVEZWxheU5vZGUoKVxuQXVkaW9Db250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigpIGlzIGFsaWFzZWQgdG8gY3JlYXRlSmF2YVNjcmlwdE5vZGUoKVxuQXVkaW9Db250ZXh0LmNyZWF0ZVBlcmlvZGljV2F2ZSgpIGlzIGFsaWFzZWQgdG8gY3JlYXRlV2F2ZVRhYmxlKClcbk9zY2lsbGF0b3JOb2RlLnN0YXJ0KCkgaXMgYWxpYXNlZCB0byBub3RlT24oKVxuT3NjaWxsYXRvck5vZGUuc3RvcCgpIGlzIGFsaWFzZWQgdG8gbm90ZU9mZigpXG5Pc2NpbGxhdG9yTm9kZS5zZXRQZXJpb2RpY1dhdmUoKSBpcyBhbGlhc2VkIHRvIHNldFdhdmVUYWJsZSgpXG5BdWRpb1BhcmFtLnNldFRhcmdldEF0VGltZSgpIGlzIGFsaWFzZWQgdG8gc2V0VGFyZ2V0VmFsdWVBdFRpbWUoKVxuXG5UaGlzIGxpYnJhcnkgZG9lcyBOT1QgcGF0Y2ggdGhlIGVudW1lcmF0ZWQgdHlwZSBjaGFuZ2VzLCBhcyBpdCBpcyBcbnJlY29tbWVuZGVkIGluIHRoZSBzcGVjaWZpY2F0aW9uIHRoYXQgaW1wbGVtZW50YXRpb25zIHN1cHBvcnQgYm90aCBpbnRlZ2VyXG5hbmQgc3RyaW5nIHR5cGVzIGZvciBBdWRpb1Bhbm5lck5vZGUucGFubmluZ01vZGVsLCBBdWRpb1Bhbm5lck5vZGUuZGlzdGFuY2VNb2RlbCBcbkJpcXVhZEZpbHRlck5vZGUudHlwZSBhbmQgT3NjaWxsYXRvck5vZGUudHlwZS5cblxuKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBleHBvcnRzLCBwZXJmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBmaXhTZXRUYXJnZXQocGFyYW0pIHtcbiAgICBpZiAoIXBhcmFtKSAvLyBpZiBOWUksIGp1c3QgcmV0dXJuXG4gICAgICByZXR1cm47XG4gICAgaWYgKCFwYXJhbS5zZXRUYXJnZXRBdFRpbWUpXG4gICAgICBwYXJhbS5zZXRUYXJnZXRBdFRpbWUgPSBwYXJhbS5zZXRUYXJnZXRWYWx1ZUF0VGltZTsgXG4gIH1cblxuICBpZiAod2luZG93Lmhhc093blByb3BlcnR5KCd3ZWJraXRBdWRpb0NvbnRleHQnKSAmJiBcbiAgICAgICF3aW5kb3cuaGFzT3duUHJvcGVydHkoJ0F1ZGlvQ29udGV4dCcpKSB7XG4gICAgd2luZG93LkF1ZGlvQ29udGV4dCA9IHdlYmtpdEF1ZGlvQ29udGV4dDtcblxuICAgIGlmICghQXVkaW9Db250ZXh0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnY3JlYXRlR2FpbicpKVxuICAgICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVHYWluID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVHYWluTm9kZTtcbiAgICBpZiAoIUF1ZGlvQ29udGV4dC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ2NyZWF0ZURlbGF5JykpXG4gICAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmNyZWF0ZURlbGF5ID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVEZWxheU5vZGU7XG4gICAgaWYgKCFBdWRpb0NvbnRleHQucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdjcmVhdGVTY3JpcHRQcm9jZXNzb3InKSlcbiAgICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlU2NyaXB0UHJvY2Vzc29yID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVKYXZhU2NyaXB0Tm9kZTtcbiAgICBpZiAoIUF1ZGlvQ29udGV4dC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ2NyZWF0ZVBlcmlvZGljV2F2ZScpKVxuICAgICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVQZXJpb2RpY1dhdmUgPSBBdWRpb0NvbnRleHQucHJvdG90eXBlLmNyZWF0ZVdhdmVUYWJsZTtcblxuXG4gICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5pbnRlcm5hbF9jcmVhdGVHYWluID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVHYWluO1xuICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlR2FpbiA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgIHZhciBub2RlID0gdGhpcy5pbnRlcm5hbF9jcmVhdGVHYWluKCk7XG4gICAgICBmaXhTZXRUYXJnZXQobm9kZS5nYWluKTtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG5cbiAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmludGVybmFsX2NyZWF0ZURlbGF5ID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVEZWxheTtcbiAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmNyZWF0ZURlbGF5ID0gZnVuY3Rpb24obWF4RGVsYXlUaW1lKSB7IFxuICAgICAgdmFyIG5vZGUgPSBtYXhEZWxheVRpbWUgPyB0aGlzLmludGVybmFsX2NyZWF0ZURlbGF5KG1heERlbGF5VGltZSkgOiB0aGlzLmludGVybmFsX2NyZWF0ZURlbGF5KCk7XG4gICAgICBmaXhTZXRUYXJnZXQobm9kZS5kZWxheVRpbWUpO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcblxuICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuaW50ZXJuYWxfY3JlYXRlQnVmZmVyU291cmNlID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVCdWZmZXJTb3VyY2U7XG4gICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVCdWZmZXJTb3VyY2UgPSBmdW5jdGlvbigpIHsgXG4gICAgICB2YXIgbm9kZSA9IHRoaXMuaW50ZXJuYWxfY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICBpZiAoIW5vZGUuc3RhcnQpIHtcbiAgICAgICAgbm9kZS5zdGFydCA9IGZ1bmN0aW9uICggd2hlbiwgb2Zmc2V0LCBkdXJhdGlvbiApIHtcbiAgICAgICAgICBpZiAoIG9mZnNldCB8fCBkdXJhdGlvbiApXG4gICAgICAgICAgICB0aGlzLm5vdGVHcmFpbk9uKCB3aGVuLCBvZmZzZXQsIGR1cmF0aW9uICk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5ub3RlT24oIHdoZW4gKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmICghbm9kZS5zdG9wKVxuICAgICAgICBub2RlLnN0b3AgPSBub2RlLm5vdGVPZmY7XG4gICAgICBmaXhTZXRUYXJnZXQobm9kZS5wbGF5YmFja1JhdGUpO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcblxuICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuaW50ZXJuYWxfY3JlYXRlRHluYW1pY3NDb21wcmVzc29yID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVEeW5hbWljc0NvbXByZXNzb3I7XG4gICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVEeW5hbWljc0NvbXByZXNzb3IgPSBmdW5jdGlvbigpIHsgXG4gICAgICB2YXIgbm9kZSA9IHRoaXMuaW50ZXJuYWxfY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKCk7XG4gICAgICBmaXhTZXRUYXJnZXQobm9kZS50aHJlc2hvbGQpO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUua25lZSk7XG4gICAgICBmaXhTZXRUYXJnZXQobm9kZS5yYXRpbyk7XG4gICAgICBmaXhTZXRUYXJnZXQobm9kZS5yZWR1Y3Rpb24pO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUuYXR0YWNrKTtcbiAgICAgIGZpeFNldFRhcmdldChub2RlLnJlbGVhc2UpO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcblxuICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuaW50ZXJuYWxfY3JlYXRlQmlxdWFkRmlsdGVyID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVCaXF1YWRGaWx0ZXI7XG4gICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVCaXF1YWRGaWx0ZXIgPSBmdW5jdGlvbigpIHsgXG4gICAgICB2YXIgbm9kZSA9IHRoaXMuaW50ZXJuYWxfY3JlYXRlQmlxdWFkRmlsdGVyKCk7XG4gICAgICBmaXhTZXRUYXJnZXQobm9kZS5mcmVxdWVuY3kpO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUuZGV0dW5lKTtcbiAgICAgIGZpeFNldFRhcmdldChub2RlLlEpO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUuZ2Fpbik7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuXG4gICAgaWYgKEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoICdjcmVhdGVPc2NpbGxhdG9yJyApKSB7XG4gICAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmludGVybmFsX2NyZWF0ZU9zY2lsbGF0b3IgPSBBdWRpb0NvbnRleHQucHJvdG90eXBlLmNyZWF0ZU9zY2lsbGF0b3I7XG4gICAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmNyZWF0ZU9zY2lsbGF0b3IgPSBmdW5jdGlvbigpIHsgXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5pbnRlcm5hbF9jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIGlmICghbm9kZS5zdGFydClcbiAgICAgICAgICBub2RlLnN0YXJ0ID0gbm9kZS5ub3RlT247IFxuICAgICAgICBpZiAoIW5vZGUuc3RvcClcbiAgICAgICAgICBub2RlLnN0b3AgPSBub2RlLm5vdGVPZmY7XG4gICAgICAgIGlmICghbm9kZS5zZXRQZXJpb2RpY1dhdmUpXG4gICAgICAgICAgbm9kZS5zZXRQZXJpb2RpY1dhdmUgPSBub2RlLnNldFdhdmVUYWJsZTtcbiAgICAgICAgZml4U2V0VGFyZ2V0KG5vZGUuZnJlcXVlbmN5KTtcbiAgICAgICAgZml4U2V0VGFyZ2V0KG5vZGUuZGV0dW5lKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9O1xuICAgIH1cbiAgfVxufSh3aW5kb3cpKTsiLCIvKmdsb2JhbHMgQXVkaW9Db250ZXh0Ki9cbnJlcXVpcmUoJy4vYWMtbW9ua2V5cGF0Y2gnKTtcbndpbmRvdy53YXZlcyA9IHdpbmRvdy53YXZlcyB8fCB7fTtcbm1vZHVsZS5leHBvcnRzID0gd2luZG93LndhdmVzLmF1ZGlvQ29udGV4dCA9IHdpbmRvdy53YXZlcy5hdWRpb0NvbnRleHQgfHwgbmV3IEF1ZGlvQ29udGV4dCgpOyIsIi8qKlxuICogQVVUSE9SIE9GIElOSVRJQUwgSlMgTElCUkFSWVxuICogay1kIFRyZWUgSmF2YVNjcmlwdCAtIFYgMS4wXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3ViaWxhYnMva2QtdHJlZS1qYXZhc2NyaXB0XG4gKlxuICogQGF1dGhvciBNaXJjZWEgUHJpY29wIDxwcmljb3BAdWJpbGFicy5uZXQ+LCAyMDEyXG4gKiBAYXV0aG9yIE1hcnRpbiBLbGVwcGUgPGtsZXBwZUB1YmlsYWJzLm5ldD4sIDIwMTJcbiAqIEBhdXRob3IgVWJpbGFicyBodHRwOi8vdWJpbGFicy5uZXQsIDIwMTJcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIDxodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocD5cbiAqL1xuXG5cbmZ1bmN0aW9uIE5vZGUob2JqLCBkaW1lbnNpb24sIHBhcmVudCkge1xuICB0aGlzLm9iaiA9IG9iajtcbiAgdGhpcy5sZWZ0ID0gbnVsbDtcbiAgdGhpcy5yaWdodCA9IG51bGw7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLmRpbWVuc2lvbiA9IGRpbWVuc2lvbjtcbn1cblxuZnVuY3Rpb24gS2RUcmVlKHBvaW50cywgbWV0cmljLCBkaW1lbnNpb25zKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBcbiAgZnVuY3Rpb24gYnVpbGRUcmVlKHBvaW50cywgZGVwdGgsIHBhcmVudCkge1xuICAgIHZhciBkaW0gPSBkZXB0aCAlIGRpbWVuc2lvbnMubGVuZ3RoLFxuICAgICAgbWVkaWFuLFxuICAgICAgbm9kZTtcblxuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBuZXcgTm9kZShwb2ludHNbMF0sIGRpbSwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBwb2ludHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGFbZGltZW5zaW9uc1tkaW1dXSAtIGJbZGltZW5zaW9uc1tkaW1dXTtcbiAgICB9KTtcblxuICAgIG1lZGlhbiA9IE1hdGguZmxvb3IocG9pbnRzLmxlbmd0aCAvIDIpO1xuICAgIG5vZGUgPSBuZXcgTm9kZShwb2ludHNbbWVkaWFuXSwgZGltLCBwYXJlbnQpO1xuICAgIG5vZGUubGVmdCA9IGJ1aWxkVHJlZShwb2ludHMuc2xpY2UoMCwgbWVkaWFuKSwgZGVwdGggKyAxLCBub2RlKTtcbiAgICBub2RlLnJpZ2h0ID0gYnVpbGRUcmVlKHBvaW50cy5zbGljZShtZWRpYW4gKyAxKSwgZGVwdGggKyAxLCBub2RlKTtcblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdGhpcy5yb290ID0gYnVpbGRUcmVlKHBvaW50cywgMCwgbnVsbCk7XG5cbiAgdGhpcy5pbnNlcnQgPSBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICBmdW5jdGlvbiBpbm5lclNlYXJjaChub2RlLCBwYXJlbnQpIHtcblxuICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbbm9kZS5kaW1lbnNpb25dO1xuICAgICAgaWYgKHBvaW50W2RpbWVuc2lvbl0gPCBub2RlLm9ialtkaW1lbnNpb25dKSB7XG4gICAgICAgIHJldHVybiBpbm5lclNlYXJjaChub2RlLmxlZnQsIG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGlubmVyU2VhcmNoKG5vZGUucmlnaHQsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBpbnNlcnRQb3NpdGlvbiA9IGlubmVyU2VhcmNoKHRoaXMucm9vdCwgbnVsbCksXG4gICAgICBuZXdOb2RlLFxuICAgICAgZGltZW5zaW9uO1xuXG4gICAgaWYgKGluc2VydFBvc2l0aW9uID09PSBudWxsKSB7XG4gICAgICB0aGlzLnJvb3QgPSBuZXcgTm9kZShwb2ludCwgMCwgbnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmV3Tm9kZSA9IG5ldyBOb2RlKHBvaW50LCAoaW5zZXJ0UG9zaXRpb24uZGltZW5zaW9uICsgMSkgJSBkaW1lbnNpb25zLmxlbmd0aCwgaW5zZXJ0UG9zaXRpb24pO1xuICAgIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbaW5zZXJ0UG9zaXRpb24uZGltZW5zaW9uXTtcblxuICAgIGlmIChwb2ludFtkaW1lbnNpb25dIDwgaW5zZXJ0UG9zaXRpb24ub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgIGluc2VydFBvc2l0aW9uLmxlZnQgPSBuZXdOb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnNlcnRQb3NpdGlvbi5yaWdodCA9IG5ld05vZGU7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgdmFyIG5vZGU7XG5cbiAgICBmdW5jdGlvbiBub2RlU2VhcmNoKG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5vYmogPT09IHBvaW50KSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGltZW5zaW9uID0gZGltZW5zaW9uc1tub2RlLmRpbWVuc2lvbl07XG5cbiAgICAgIGlmIChwb2ludFtkaW1lbnNpb25dIDwgbm9kZS5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgICByZXR1cm4gbm9kZVNlYXJjaChub2RlLmxlZnQsIG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5vZGVTZWFyY2gobm9kZS5yaWdodCwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgICB2YXIgbmV4dE5vZGUsXG4gICAgICAgIG5leHRPYmosXG4gICAgICAgIHBEaW1lbnNpb247XG5cbiAgICAgIGZ1bmN0aW9uIGZpbmRNYXgobm9kZSwgZGltKSB7XG4gICAgICAgIHZhciBkaW1lbnNpb24sXG4gICAgICAgICAgb3duLFxuICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgbWF4O1xuXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW2RpbV07XG4gICAgICAgIGlmIChub2RlLmRpbWVuc2lvbiA9PT0gZGltKSB7XG4gICAgICAgICAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kTWF4KG5vZGUucmlnaHQsIGRpbSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duID0gbm9kZS5vYmpbZGltZW5zaW9uXTtcbiAgICAgICAgbGVmdCA9IGZpbmRNYXgobm9kZS5sZWZ0LCBkaW0pO1xuICAgICAgICByaWdodCA9IGZpbmRNYXgobm9kZS5yaWdodCwgZGltKTtcbiAgICAgICAgbWF4ID0gbm9kZTtcblxuICAgICAgICBpZiAobGVmdCAhPT0gbnVsbCAmJiBsZWZ0Lm9ialtkaW1lbnNpb25dID4gb3duKSB7XG4gICAgICAgICAgbWF4ID0gbGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyaWdodCAhPT0gbnVsbCAmJiByaWdodC5vYmpbZGltZW5zaW9uXSA+IG1heC5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgICAgIG1heCA9IHJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGZpbmRNaW4obm9kZSwgZGltKSB7XG4gICAgICAgIHZhciBkaW1lbnNpb24sXG4gICAgICAgICAgb3duLFxuICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgbWluO1xuXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW2RpbV07XG5cbiAgICAgICAgaWYgKG5vZGUuZGltZW5zaW9uID09PSBkaW0pIHtcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZE1pbihub2RlLmxlZnQsIGRpbSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duID0gbm9kZS5vYmpbZGltZW5zaW9uXTtcbiAgICAgICAgbGVmdCA9IGZpbmRNaW4obm9kZS5sZWZ0LCBkaW0pO1xuICAgICAgICByaWdodCA9IGZpbmRNaW4obm9kZS5yaWdodCwgZGltKTtcbiAgICAgICAgbWluID0gbm9kZTtcblxuICAgICAgICBpZiAobGVmdCAhPT0gbnVsbCAmJiBsZWZ0Lm9ialtkaW1lbnNpb25dIDwgb3duKSB7XG4gICAgICAgICAgbWluID0gbGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmlnaHQgIT09IG51bGwgJiYgcmlnaHQub2JqW2RpbWVuc2lvbl0gPCBtaW4ub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgICAgICBtaW4gPSByaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5sZWZ0ID09PSBudWxsICYmIG5vZGUucmlnaHQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgc2VsZi5yb290ID0gbnVsbDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwRGltZW5zaW9uID0gZGltZW5zaW9uc1tub2RlLnBhcmVudC5kaW1lbnNpb25dO1xuXG4gICAgICAgIGlmIChub2RlLm9ialtwRGltZW5zaW9uXSA8IG5vZGUucGFyZW50Lm9ialtwRGltZW5zaW9uXSkge1xuICAgICAgICAgIG5vZGUucGFyZW50LmxlZnQgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGUucGFyZW50LnJpZ2h0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgbmV4dE5vZGUgPSBmaW5kTWF4KG5vZGUubGVmdCwgbm9kZS5kaW1lbnNpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dE5vZGUgPSBmaW5kTWluKG5vZGUucmlnaHQsIG5vZGUuZGltZW5zaW9uKTtcbiAgICAgIH1cblxuICAgICAgbmV4dE9iaiA9IG5leHROb2RlLm9iajtcbiAgICAgIHJlbW92ZU5vZGUobmV4dE5vZGUpO1xuICAgICAgbm9kZS5vYmogPSBuZXh0T2JqO1xuXG4gICAgfVxuXG4gICAgbm9kZSA9IG5vZGVTZWFyY2goc2VsZi5yb290KTtcblxuICAgIGlmIChub2RlID09PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgcmVtb3ZlTm9kZShub2RlKTtcbiAgfTtcblxuICB0aGlzLm5lYXJlc3QgPSBmdW5jdGlvbiAocG9pbnQsIG1heE5vZGVzLCBtYXhEaXN0YW5jZSkge1xuICAgIHZhciBpLFxuICAgICAgcmVzdWx0LFxuICAgICAgYmVzdE5vZGVzO1xuXG4gICAgYmVzdE5vZGVzID0gbmV3IEJpbmFyeUhlYXAoXG4gICAgICBmdW5jdGlvbiAoZSkgeyByZXR1cm4gLWVbMV07IH1cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gbmVhcmVzdFNlYXJjaChub2RlKSB7XG4gICAgICB2YXIgYmVzdENoaWxkLFxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW25vZGUuZGltZW5zaW9uXSxcbiAgICAgICAgb3duRGlzdGFuY2UgPSBtZXRyaWMocG9pbnQsIG5vZGUub2JqKSxcbiAgICAgICAgbGluZWFyUG9pbnQgPSB7fSxcbiAgICAgICAgbGluZWFyRGlzdGFuY2UsXG4gICAgICAgIG90aGVyQ2hpbGQsXG4gICAgICAgIGk7XG5cbiAgICAgIGZ1bmN0aW9uIHNhdmVOb2RlKG5vZGUsIGRpc3RhbmNlKSB7XG4gICAgICAgIGJlc3ROb2Rlcy5wdXNoKFtub2RlLCBkaXN0YW5jZV0pO1xuICAgICAgICBpZiAoYmVzdE5vZGVzLnNpemUoKSA+IG1heE5vZGVzKSB7XG4gICAgICAgICAgYmVzdE5vZGVzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkaW1lbnNpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpID09PSBub2RlLmRpbWVuc2lvbikge1xuICAgICAgICAgIGxpbmVhclBvaW50W2RpbWVuc2lvbnNbaV1dID0gcG9pbnRbZGltZW5zaW9uc1tpXV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGluZWFyUG9pbnRbZGltZW5zaW9uc1tpXV0gPSBub2RlLm9ialtkaW1lbnNpb25zW2ldXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaW5lYXJEaXN0YW5jZSA9IG1ldHJpYyhsaW5lYXJQb2ludCwgbm9kZS5vYmopO1xuXG4gICAgICBpZiAobm9kZS5yaWdodCA9PT0gbnVsbCAmJiBub2RlLmxlZnQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGJlc3ROb2Rlcy5zaXplKCkgPCBtYXhOb2RlcyB8fCBvd25EaXN0YW5jZSA8IGJlc3ROb2Rlcy5wZWVrKClbMV0pIHtcbiAgICAgICAgICBzYXZlTm9kZShub2RlLCBvd25EaXN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5yaWdodCA9PT0gbnVsbCkge1xuICAgICAgICBiZXN0Q2hpbGQgPSBub2RlLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUubGVmdCA9PT0gbnVsbCkge1xuICAgICAgICBiZXN0Q2hpbGQgPSBub2RlLnJpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBvaW50W2RpbWVuc2lvbl0gPCBub2RlLm9ialtkaW1lbnNpb25dKSB7XG4gICAgICAgICAgYmVzdENoaWxkID0gbm9kZS5sZWZ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJlc3RDaGlsZCA9IG5vZGUucmlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmVhcmVzdFNlYXJjaChiZXN0Q2hpbGQpO1xuXG4gICAgICBpZiAoYmVzdE5vZGVzLnNpemUoKSA8IG1heE5vZGVzIHx8IG93bkRpc3RhbmNlIDwgYmVzdE5vZGVzLnBlZWsoKVsxXSkge1xuICAgICAgICBzYXZlTm9kZShub2RlLCBvd25EaXN0YW5jZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChiZXN0Tm9kZXMuc2l6ZSgpIDwgbWF4Tm9kZXMgfHwgTWF0aC5hYnMobGluZWFyRGlzdGFuY2UpIDwgYmVzdE5vZGVzLnBlZWsoKVsxXSkge1xuICAgICAgICBpZiAoYmVzdENoaWxkID09PSBub2RlLmxlZnQpIHtcbiAgICAgICAgICBvdGhlckNoaWxkID0gbm9kZS5yaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdGhlckNoaWxkID0gbm9kZS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlckNoaWxkICE9PSBudWxsKSB7XG4gICAgICAgICAgbmVhcmVzdFNlYXJjaChvdGhlckNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXhEaXN0YW5jZSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IG1heE5vZGVzOyBpICs9IDEpIHtcbiAgICAgICAgYmVzdE5vZGVzLnB1c2goW251bGwsIG1heERpc3RhbmNlXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmVhcmVzdFNlYXJjaChzZWxmLnJvb3QpO1xuXG4gICAgcmVzdWx0ID0gW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbWF4Tm9kZXM7IGkgKz0gMSkge1xuICAgICAgaWYgKGJlc3ROb2Rlcy5jb250ZW50W2ldWzBdKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtiZXN0Tm9kZXMuY29udGVudFtpXVswXS5vYmosIGJlc3ROb2Rlcy5jb250ZW50W2ldWzFdXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdGhpcy5iYWxhbmNlRmFjdG9yID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGhlaWdodChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXRoLm1heChoZWlnaHQobm9kZS5sZWZ0KSwgaGVpZ2h0KG5vZGUucmlnaHQpKSArIDE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY291bnQobm9kZSkge1xuICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gY291bnQobm9kZS5sZWZ0KSArIGNvdW50KG5vZGUucmlnaHQpICsgMTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0KHNlbGYucm9vdCkgLyAoTWF0aC5sb2coY291bnQoc2VsZi5yb290KSkgLyBNYXRoLmxvZygyKSk7XG4gIH07XG59XG5cbi8vIEJpbmFyeSBoZWFwIGltcGxlbWVudGF0aW9uIGZyb206XG4vLyBodHRwOi8vZWxvcXVlbnRqYXZhc2NyaXB0Lm5ldC9hcHBlbmRpeDIuaHRtbFxuXG5mdW5jdGlvbiBCaW5hcnlIZWFwKHNjb3JlRnVuY3Rpb24pe1xuICB0aGlzLmNvbnRlbnQgPSBbXTtcbiAgdGhpcy5zY29yZUZ1bmN0aW9uID0gc2NvcmVGdW5jdGlvbjtcbn1cblxuQmluYXJ5SGVhcC5wcm90b3R5cGUgPSB7XG4gIHB1c2g6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAvLyBBZGQgdGhlIG5ldyBlbGVtZW50IHRvIHRoZSBlbmQgb2YgdGhlIGFycmF5LlxuICAgIHRoaXMuY29udGVudC5wdXNoKGVsZW1lbnQpO1xuICAgIC8vIEFsbG93IGl0IHRvIGJ1YmJsZSB1cC5cbiAgICB0aGlzLmJ1YmJsZVVwKHRoaXMuY29udGVudC5sZW5ndGggLSAxKTtcbiAgfSxcblxuICBwb3A6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFN0b3JlIHRoZSBmaXJzdCBlbGVtZW50IHNvIHdlIGNhbiByZXR1cm4gaXQgbGF0ZXIuXG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuY29udGVudFswXTtcbiAgICAvLyBHZXQgdGhlIGVsZW1lbnQgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXkuXG4gICAgdmFyIGVuZCA9IHRoaXMuY29udGVudC5wb3AoKTtcbiAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGVsZW1lbnRzIGxlZnQsIHB1dCB0aGUgZW5kIGVsZW1lbnQgYXQgdGhlXG4gICAgLy8gc3RhcnQsIGFuZCBsZXQgaXQgc2luayBkb3duLlxuICAgIGlmICh0aGlzLmNvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jb250ZW50WzBdID0gZW5kO1xuICAgICAgdGhpcy5zaW5rRG93bigwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBwZWVrOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50WzBdO1xuICB9LFxuXG4gIHJlbW92ZTogZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciBsZW4gPSB0aGlzLmNvbnRlbnQubGVuZ3RoO1xuICAgIC8vIFRvIHJlbW92ZSBhIHZhbHVlLCB3ZSBtdXN0IHNlYXJjaCB0aHJvdWdoIHRoZSBhcnJheSB0byBmaW5kXG4gICAgLy8gaXQuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHRoaXMuY29udGVudFtpXSA9PSBub2RlKSB7XG4gICAgICAgIC8vIFdoZW4gaXQgaXMgZm91bmQsIHRoZSBwcm9jZXNzIHNlZW4gaW4gJ3BvcCcgaXMgcmVwZWF0ZWRcbiAgICAgICAgLy8gdG8gZmlsbCB1cCB0aGUgaG9sZS5cbiAgICAgICAgdmFyIGVuZCA9IHRoaXMuY29udGVudC5wb3AoKTtcbiAgICAgICAgaWYgKGkgIT0gbGVuIC0gMSkge1xuICAgICAgICAgIHRoaXMuY29udGVudFtpXSA9IGVuZDtcbiAgICAgICAgICBpZiAodGhpcy5zY29yZUZ1bmN0aW9uKGVuZCkgPCB0aGlzLnNjb3JlRnVuY3Rpb24obm9kZSkpXG4gICAgICAgICAgICB0aGlzLmJ1YmJsZVVwKGkpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2lua0Rvd24oaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb2RlIG5vdCBmb3VuZC5cIik7XG4gIH0sXG5cbiAgc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudC5sZW5ndGg7XG4gIH0sXG5cbiAgYnViYmxlVXA6IGZ1bmN0aW9uKG4pIHtcbiAgICAvLyBGZXRjaCB0aGUgZWxlbWVudCB0aGF0IGhhcyB0byBiZSBtb3ZlZC5cbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuY29udGVudFtuXTtcbiAgICAvLyBXaGVuIGF0IDAsIGFuIGVsZW1lbnQgY2FuIG5vdCBnbyB1cCBhbnkgZnVydGhlci5cbiAgICB3aGlsZSAobiA+IDApIHtcbiAgICAgIC8vIENvbXB1dGUgdGhlIHBhcmVudCBlbGVtZW50J3MgaW5kZXgsIGFuZCBmZXRjaCBpdC5cbiAgICAgIHZhciBwYXJlbnROID0gTWF0aC5mbG9vcigobiArIDEpIC8gMikgLSAxLFxuICAgICAgICAgIHBhcmVudCA9IHRoaXMuY29udGVudFtwYXJlbnROXTtcbiAgICAgIC8vIFN3YXAgdGhlIGVsZW1lbnRzIGlmIHRoZSBwYXJlbnQgaXMgZ3JlYXRlci5cbiAgICAgIGlmICh0aGlzLnNjb3JlRnVuY3Rpb24oZWxlbWVudCkgPCB0aGlzLnNjb3JlRnVuY3Rpb24ocGFyZW50KSkge1xuICAgICAgICB0aGlzLmNvbnRlbnRbcGFyZW50Tl0gPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmNvbnRlbnRbbl0gPSBwYXJlbnQ7XG4gICAgICAgIC8vIFVwZGF0ZSAnbicgdG8gY29udGludWUgYXQgdGhlIG5ldyBwb3NpdGlvbi5cbiAgICAgICAgbiA9IHBhcmVudE47XG4gICAgICB9XG4gICAgICAvLyBGb3VuZCBhIHBhcmVudCB0aGF0IGlzIGxlc3MsIG5vIG5lZWQgdG8gbW92ZSBpdCBmdXJ0aGVyLlxuICAgICAgZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzaW5rRG93bjogZnVuY3Rpb24obikge1xuICAgIC8vIExvb2sgdXAgdGhlIHRhcmdldCBlbGVtZW50IGFuZCBpdHMgc2NvcmUuXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuY29udGVudC5sZW5ndGgsXG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmNvbnRlbnRbbl0sXG4gICAgICAgIGVsZW1TY29yZSA9IHRoaXMuc2NvcmVGdW5jdGlvbihlbGVtZW50KTtcblxuICAgIHdoaWxlKHRydWUpIHtcbiAgICAgIC8vIENvbXB1dGUgdGhlIGluZGljZXMgb2YgdGhlIGNoaWxkIGVsZW1lbnRzLlxuICAgICAgdmFyIGNoaWxkMk4gPSAobiArIDEpICogMiwgY2hpbGQxTiA9IGNoaWxkMk4gLSAxO1xuICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIHN0b3JlIHRoZSBuZXcgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnQsXG4gICAgICAvLyBpZiBhbnkuXG4gICAgICB2YXIgc3dhcCA9IG51bGw7XG4gICAgICAvLyBJZiB0aGUgZmlyc3QgY2hpbGQgZXhpc3RzIChpcyBpbnNpZGUgdGhlIGFycmF5KS4uLlxuICAgICAgaWYgKGNoaWxkMU4gPCBsZW5ndGgpIHtcbiAgICAgICAgLy8gTG9vayBpdCB1cCBhbmQgY29tcHV0ZSBpdHMgc2NvcmUuXG4gICAgICAgIHZhciBjaGlsZDEgPSB0aGlzLmNvbnRlbnRbY2hpbGQxTl0sXG4gICAgICAgICAgICBjaGlsZDFTY29yZSA9IHRoaXMuc2NvcmVGdW5jdGlvbihjaGlsZDEpO1xuICAgICAgICAvLyBJZiB0aGUgc2NvcmUgaXMgbGVzcyB0aGFuIG91ciBlbGVtZW50J3MsIHdlIG5lZWQgdG8gc3dhcC5cbiAgICAgICAgaWYgKGNoaWxkMVNjb3JlIDwgZWxlbVNjb3JlKVxuICAgICAgICAgIHN3YXAgPSBjaGlsZDFOO1xuICAgICAgfVxuICAgICAgLy8gRG8gdGhlIHNhbWUgY2hlY2tzIGZvciB0aGUgb3RoZXIgY2hpbGQuXG4gICAgICBpZiAoY2hpbGQyTiA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgY2hpbGQyID0gdGhpcy5jb250ZW50W2NoaWxkMk5dLFxuICAgICAgICAgICAgY2hpbGQyU2NvcmUgPSB0aGlzLnNjb3JlRnVuY3Rpb24oY2hpbGQyKTtcbiAgICAgICAgaWYgKGNoaWxkMlNjb3JlIDwgKHN3YXAgPT0gbnVsbCA/IGVsZW1TY29yZSA6IGNoaWxkMVNjb3JlKSl7XG4gICAgICAgICAgc3dhcCA9IGNoaWxkMk47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgbmVlZHMgdG8gYmUgbW92ZWQsIHN3YXAgaXQsIGFuZCBjb250aW51ZS5cbiAgICAgIGlmIChzd2FwICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb250ZW50W25dID0gdGhpcy5jb250ZW50W3N3YXBdO1xuICAgICAgICB0aGlzLmNvbnRlbnRbc3dhcF0gPSBlbGVtZW50O1xuICAgICAgICBuID0gc3dhcDtcbiAgICAgIH1cbiAgICAgIC8vIE90aGVyd2lzZSwgd2UgYXJlIGRvbmUuXG4gICAgICBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlS2RUcmVlOiBmdW5jdGlvbiAocG9pbnRzLCBtZXRyaWMsIGRpbWVuc2lvbnMpIHtcbiAgICByZXR1cm4gbmV3IEtkVHJlZShwb2ludHMsIG1ldHJpYywgZGltZW5zaW9ucylcbiAgfVxufVxuIl19
