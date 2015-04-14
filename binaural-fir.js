!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.BinauralFIR=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var kdt = require('kdt');
var BinauralFIR = function BinauralFIR(options) {
  this.audioContext = options.audioContext;
  this.hrtfDataset = [];
  this.hrtfDatasetLength = 0;
  this.tree = -1;
  this.position = {};
  this.nextPosition = {};
  this.changeWhenFinishCrossfading = false;
  this.crossfadeDuration = 20 / 1000;
  this.input = this.audioContext.createGain();
  this.mainConvolver = new ConvolverAudioGraph({audioContext: this.audioContext});
  this.mainConvolver.gain.value = 1;
  this.input.connect(this.mainConvolver.input);
  this.secondaryConvolver = new ConvolverAudioGraph({audioContext: this.audioContext});
  this.secondaryConvolver.gain.value = 0;
  this.input.connect(this.secondaryConvolver.input);
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
      throw new Error("CrossfadeDuration setting error");
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
    this.mainConvolver.gain.setValueAtTime(1, this.audioContext.currentTime + guardInterval);
    this.mainConvolver.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + guardInterval + this.crossfadeDuration);
    this.secondaryConvolver.gain.setValueAtTime(0, this.audioContext.currentTime + guardInterval);
    this.secondaryConvolver.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + guardInterval + this.crossfadeDuration);
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
var ConvolverAudioGraph = function ConvolverAudioGraph(options) {
  this.audioContext = options.audioContext;
  this.gainNode = this.audioContext.createGain();
  this.convNode = this.audioContext.createConvolver();
  this.convNode.normalize = false;
  this.gainNode.connect(this.convNode);
  this.oscillatorNode = this.audioContext.createOscillator();
  this.gainOscillatorNode = this.audioContext.createGain();
  this.oscillatorNode.connect(this.gainOscillatorNode);
  this.gainOscillatorNode.connect(this.gainNode);
  this.gainOscillatorNode.gain.value = 0;
  this.oscillatorNode.start(0);
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
},{"kdt":2}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2tkdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ1NBO0FBQUEsQUFBSSxFQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7QUFUeEIsQUFBSSxFQUFBLGNBZUosU0FBTSxZQUFVLENBRUYsT0FBTSxDQUFHO0FBQ25CLEtBQUcsYUFBYSxFQUFJLENBQUEsT0FBTSxhQUFhLENBQUM7QUFDeEMsS0FBRyxZQUFZLEVBQUksR0FBQyxDQUFDO0FBQ3JCLEtBQUcsa0JBQWtCLEVBQUksRUFBQSxDQUFDO0FBQzFCLEtBQUcsS0FBSyxFQUFJLEVBQUMsQ0FBQSxDQUFDO0FBQ2QsS0FBRyxTQUFTLEVBQUksR0FBQyxDQUFDO0FBQ2xCLEtBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUN0QixLQUFHLDRCQUE0QixFQUFJLE1BQUksQ0FBQztBQUN4QyxLQUFHLGtCQUFrQixFQUFJLENBQUEsRUFBQyxFQUFJLEtBQUcsQ0FBQztBQUVsQyxLQUFHLE1BQU0sRUFBSSxDQUFBLElBQUcsYUFBYSxXQUFXLEFBQUMsRUFBQyxDQUFDO0FBTzNDLEtBQUcsY0FBYyxFQUFJLElBQUksb0JBQWtCLEFBQUMsQ0FBQyxDQUFDLFlBQVcsQ0FBRyxDQUFBLElBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUMvRSxLQUFHLGNBQWMsS0FBSyxNQUFNLEVBQUksRUFBQSxDQUFDO0FBQ2pDLEtBQUcsTUFBTSxRQUFRLEFBQUMsQ0FBQyxJQUFHLGNBQWMsTUFBTSxDQUFDLENBQUM7QUFFNUMsS0FBRyxtQkFBbUIsRUFBSSxJQUFJLG9CQUFrQixBQUFDLENBQUMsQ0FBQyxZ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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIHdyaXR0ZW4gaW4gRUNNQXNjcmlwdCA2ICovXG4vKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIFRoZSBiaW5hdXJhbEZJUiBub2RlIHByb3ZpZGVzIGJpbmF1cmFsIGxpc3RlbmluZyB0byB0aGUgdXNlci4gVGhlIG5vdmVsdHkgb2ZcbiAqIHRoaXMgbGlicmFyeSBpcyB0aGF0IGl0IHBlcm1pdHMgdG8gdXNlIHlvdXIgb3duIEhSVEYgZGF0YXNldC4gVGhpcyBsaWJyYXJ5XG4gKiBjYW4gYmUgdXNlZCBhcyBhIHJlZ3VsYXIgbm9kZSBpbnNpZGUgdGhlIFdlYiBBdWRpbyBBUEkuXG4gKiBAYXV0aG9yIEFybmF1IEp1bGnDoFxuICogQHZlcnNpb24gMC4xLjFcbiAqL1xudmFyIGtkdCA9IHJlcXVpcmUoJ2tkdCcpO1xuXG4vKipcbiAqIEBjbGFzcyBCaW5hdXJhbEZJUlxuICovXG5cbmNsYXNzIEJpbmF1cmFsRklSIHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5hdWRpb0NvbnRleHQgPSBvcHRpb25zLmF1ZGlvQ29udGV4dDtcbiAgICB0aGlzLmhydGZEYXRhc2V0ID0gW107XG4gICAgdGhpcy5ocnRmRGF0YXNldExlbmd0aCA9IDA7XG4gICAgdGhpcy50cmVlID0gLTE7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHt9O1xuICAgIHRoaXMubmV4dFBvc2l0aW9uID0ge307XG4gICAgdGhpcy5jaGFuZ2VXaGVuRmluaXNoQ3Jvc3NmYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uID0gMjAgLyAxMDAwO1xuXG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblxuICAgIC8vIFR3byBzdWIgYXVkaW8gZ3JhcGhzIGNyZWF0aW9uOlxuICAgIC8vIC0gbWFpbkNvbnZvbHZlciB3aGljaCByZXByZXNlbnRzIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgLy8gLSBhbmQgc2Vjb25kYXJ5Q29udm9sdmVyIHdoaWNoIHJlcHJlc2VudHMgdGhlIHBvdGVudGlhbCB0YXJnZXQgc3RhdGVcbiAgICAvLyAgIHdoZW4gbW92aW5nIHNvdW5kIHRvIGEgbmV3IHBvc2l0aW9uXG5cbiAgICB0aGlzLm1haW5Db252b2x2ZXIgPSBuZXcgQ29udm9sdmVyQXVkaW9HcmFwaCh7YXVkaW9Db250ZXh0OiB0aGlzLmF1ZGlvQ29udGV4dH0pO1xuICAgIHRoaXMubWFpbkNvbnZvbHZlci5nYWluLnZhbHVlID0gMTtcbiAgICB0aGlzLmlucHV0LmNvbm5lY3QodGhpcy5tYWluQ29udm9sdmVyLmlucHV0KTtcblxuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyID0gbmV3IENvbnZvbHZlckF1ZGlvR3JhcGgoe2F1ZGlvQ29udGV4dDogdGhpcy5hdWRpb0NvbnRleHR9KTtcbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5nYWluLnZhbHVlID0gMDtcbiAgICB0aGlzLmlucHV0LmNvbm5lY3QodGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuaW5wdXQpO1xuXG4gIH1cblxuICAvKipcbiAgICogQ29ubmVjdHMgdGhlIGJpbmF1cmFsRklSTm9kZSB0byB0aGUgV2ViIEF1ZGlvIGdyYXBoXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLm1haW5Db252b2x2ZXIuY29ubmVjdChub2RlKTtcbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5jb25uZWN0KG5vZGUpO1xuICAgIHJldHVybiB0aGlzOyAvLyBGb3IgY2hhaW5hYmlsaXR5XG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgYmluYXVyYWxGSVJOb2RlIGZyb20gdGhlIFdlYiBBdWRpbyBncmFwaFxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIG5vZGUgRGVzdGluYXRpb24gbm9kZVxuICAgKi9cbiAgZGlzY29ubmVjdChub2RlKSB7XG4gICAgdGhpcy5tYWluQ29udm9sdmVyLmRpc2Nvbm5lY3Qobm9kZSk7XG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuZGlzY29ubmVjdChub2RlKTtcbiAgICByZXR1cm4gdGhpczsgLy8gRm9yIGNoYWluYWJpbGl0eVxuXG4gIH1cblxuICAvKipcbiAgICogU2V0IEhSVEYgRGF0YXNldCB0byBiZSB1c2VkIHdpdGggdGhlIHZpcnR1YWwgc291cmNlLlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIGhydGZEYXRhc2V0IEFycmF5IG9mIE9iamVjdHMgY29udGFpbmluZyB0aGUgYXppbXV0aCwgZGlzdGFuY2UsIGVsZXZhdGlvbiwgdXJsIGFuZCBidWZmZXIgZm9yIGVhY2ggcG9pbnRcbiAgICovXG4gIHNldCBIUlRGRGF0YXNldChocnRmRGF0YXNldCkge1xuICAgIHRoaXMuaHJ0ZkRhdGFzZXQgPSBocnRmRGF0YXNldDtcbiAgICB0aGlzLmhydGZEYXRhc2V0TGVuZ3RoID0gdGhpcy5ocnRmRGF0YXNldC5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaHJ0ZkRhdGFzZXRMZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhydGYgPSB0aGlzLmhydGZEYXRhc2V0W2ldO1xuICAgICAgLy8gQXppbXV0aCBhbmQgZWxldmF0aW9uIHRvIHJhZGlhbnNcbiAgICAgIHZhciBhemltdXRoUmFkaWFucyA9IGhydGYuYXppbXV0aCAqIE1hdGguUEkgLyAxODA7XG4gICAgICB2YXIgZWxldmF0aW9uUmFkaWFucyA9IGhydGYuZWxldmF0aW9uICogTWF0aC5QSSAvIDE4MDtcbiAgICAgIHZhciBjYXRlc2lhbkNvb3JkID0gdGhpcy5zcGhlcmljYWxUb0NhcnRlc2lhbihhemltdXRoUmFkaWFucywgZWxldmF0aW9uUmFkaWFucywgaHJ0Zi5kaXN0YW5jZSk7XG4gICAgICBocnRmLnggPSBjYXRlc2lhbkNvb3JkLng7XG4gICAgICBocnRmLnkgPSBjYXRlc2lhbkNvb3JkLnk7XG4gICAgICBocnRmLnogPSBjYXRlc2lhbkNvb3JkLno7XG4gICAgfVxuICAgIHRoaXMudHJlZSA9IGtkdC5jcmVhdGVLZFRyZWUodGhpcy5ocnRmRGF0YXNldCwgdGhpcy5kaXN0YW5jZSwgWyd4JywgJ3knLCAneiddKTtcbiAgfVxuXG4gIGdldCBIUlRGRGF0YXNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5ocnRmRGF0YXNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50cyBpbiBhIDMtRCBzcGFjZS5cbiAgICogQHByaXZhdGVcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gYSBPYmplY3QgY29udGFpbmluZyB0aHJlZSBwcm9wZXJ0aWVzOiB4LCB5LCB6XG4gICAqIEBwYXJhbSBiIE9iamVjdCBjb250YWluaW5nIHRocmVlIHByb3BlcnRpZXM6IHgsIHksIHpcbiAgICovXG4gIGRpc3RhbmNlKGEsIGIpIHtcbiAgICAvLyBObyBuZWVkIHRvIGNvbXB1dGUgc3F1YXJlIHJvb3QgaGVyZSBmb3IgZGlzdGFuY2UgY29tcGFyaXNvbiwgdGhpcyBpcyBtb3JlIGVmZmljaWVudC5cbiAgICByZXR1cm4gTWF0aC5wb3coYS54IC0gYi54LCAyKSArIE1hdGgucG93KGEueSAtIGIueSwgMikgKyBNYXRoLnBvdyhhLnogLSBiLnosIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBwb3NpdGlvbiBvZiB0aGUgdmlydHVhbCBzb3VyY2VcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBhemltdXRoIEF6aW11dGggaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gLTE4MCBmb3Igc291cmNlIG9uIHlvdXIgbGVmdCwgYW5kIGZyb20gMCB0byAxODAgZm9yIHNvdXJjZSBvbiB5b3VyIHJpZ2h0XG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIDkwIGZvciBzb3VyY2UgYWJvdmUgeW91ciBoZWFkLCAwIGZvciBzb3VyY2UgaW4gZnJvbnQgb2YgeW91ciBoZWFkLCBhbmQgZnJvbSAwIHRvIC05MCBmb3Igc291cmNlIGJlbG93IHlvdXIgaGVhZClcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKiBAdG9kbyBJbXBsZW1lbnQgSW1tZWRpYXRlIHNldFBvc2l0aW9uXG4gICAqL1xuICBzZXRQb3NpdGlvbihhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIG5lYXJlc3QgcG9zaXRpb24gZm9yIHRoZSBpbnB1dCBhemltdXRoLCBlbGV2YXRpb24gYW5kIGRpc3RhbmNlXG4gICAgICB2YXIgbmVhcmVzdFBvc2l0aW9uID0gdGhpcy5nZXRSZWFsQ29vcmRpbmF0ZXMoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSk7XG4gICAgICAvLyBObyBuZWVkIHRvIGNoYW5nZSB0aGUgY3VycmVudCBIUlRGIGxvYWRlZCBpZiBzZXR0ZWQgcG9zaXRpb24gZXF1YWwgY3VycmVudCBwb3NpdGlvblxuICAgICAgaWYgKG5lYXJlc3RQb3NpdGlvbi5hemltdXRoICE9PSB0aGlzLnBvc2l0aW9uLmF6aW11dGggfHwgbmVhcmVzdFBvc2l0aW9uLmVsZXZhdGlvbiAhPT0gdGhpcy5wb3NpdGlvbi5lbGV2YXRpb24gfHwgbmVhcmVzdFBvc2l0aW9uLmRpc3RhbmNlICE9PSB0aGlzLnBvc2l0aW9uLmRpc3RhbmNlKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjcm9zc2ZhZGluZyBpcyBhY3RpdmVcbiAgICAgICAgaWYgKHRoaXMuaXNDcm9zc2ZhZGluZygpID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSB2YWx1ZSB3YWl0aW5nIHRvIGJlIHNldFxuICAgICAgICAgIGlmICh0aGlzLmNoYW5nZVdoZW5GaW5pc2hDcm9zc2ZhZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gU3RvcCB0aGUgcGFzdCBzZXRJbnRlcnZhbCBldmVudC5cbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VXaGVuRmluaXNoQ3Jvc3NmYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBTYXZlIHRoZSBwb3NpdGlvblxuICAgICAgICAgIHRoaXMubmV4dFBvc2l0aW9uLmF6aW11dGggPSBuZWFyZXN0UG9zaXRpb24uYXppbXV0aDtcbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5lbGV2YXRpb24gPSBuZWFyZXN0UG9zaXRpb24uZWxldmF0aW9uO1xuICAgICAgICAgIHRoaXMubmV4dFBvc2l0aW9uLmRpc3RhbmNlID0gbmVhcmVzdFBvc2l0aW9uLmRpc3RhbmNlO1xuXG4gICAgICAgICAgLy8gU3RhcnQgdGhlIHNldEludGVydmFsOiB3YWl0IHVudGlsIHRoZSBjcm9zc2ZhZGluZyBpcyBmaW5pc2hlZC5cbiAgICAgICAgICB0aGlzLmludGVydmFsSUQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5zZXRMYXN0UG9zaXRpb24uYmluZCh0aGlzKSwgMC4wMDUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubmV4dFBvc2l0aW9uLmF6aW11dGggPSBuZWFyZXN0UG9zaXRpb24uYXppbXV0aDtcbiAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbi5lbGV2YXRpb24gPSBuZWFyZXN0UG9zaXRpb24uZWxldmF0aW9uO1xuICAgICAgICAgIHRoaXMubmV4dFBvc2l0aW9uLmRpc3RhbmNlID0gbmVhcmVzdFBvc2l0aW9uLmRpc3RhbmNlO1xuICAgICAgICAgIHRoaXMucmVhbGx5U3RhcnRQb3NpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7IC8vIEZvciBjaGFpbmFiaWxpdHlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGlmIHRoZSBnYWlucyBhcmUgaW4gYSBjcm9zc2ZhZGluZyBvciBub3QuXG4gICAqIEBmYWxzZVxuICAgKi9cbiAgaXNDcm9zc2ZhZGluZygpIHtcbiAgICAvLyBUaGUgcmFtcHMgYXJlIG5vdCBmaW5pc2hlZCwgc28gdGhlIGNyb3NzZmFkaW5nIGlzIG5vdCBmaW5pc2hlZFxuICAgIGlmICh0aGlzLm1haW5Db252b2x2ZXIuZ2Fpbi52YWx1ZSAhPT0gMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhbGx5IGNoYW5nZSB0aGUgcG9zaXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlYWxseVN0YXJ0UG9zaXRpb24oKSB7XG5cbiAgICAvLyBTYXZlIHRoZSBjdXJyZW50IHBvc2l0aW9uXG4gICAgdGhpcy5wb3NpdGlvbi5hemltdXRoID0gdGhpcy5uZXh0UG9zaXRpb24uYXppbXV0aDtcbiAgICB0aGlzLnBvc2l0aW9uLmVsZXZhdGlvbiA9IHRoaXMubmV4dFBvc2l0aW9uLmVsZXZhdGlvbjtcbiAgICB0aGlzLnBvc2l0aW9uLmRpc3RhbmNlID0gdGhpcy5uZXh0UG9zaXRpb24uZGlzdGFuY2U7XG4gICAgLy8gTG9hZCB0aGUgbmV3IHBvc2l0aW9uIGluIHRoZSBjb252b2x2ZXIgbm90IGFjdGl2ZSAoc2Vjb25kYXJ5Q29udm9sdmVyKVxuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmJ1ZmZlciA9IHRoaXMuZ2V0SFJURih0aGlzLnBvc2l0aW9uLmF6aW11dGgsIHRoaXMucG9zaXRpb24uZWxldmF0aW9uLCB0aGlzLnBvc2l0aW9uLmRpc3RhbmNlKTtcbiAgICAvLyBEbyB0aGUgY3Jvc3NmYWRpbmcgYmV0d2VlbiBtYWluQ29udm9sdmVyIGFuZCBzZWNvbmRhcnlDb252b2x2ZXJcbiAgICB0aGlzLmNyb3NzZmFkaW5nKCk7XG5cbiAgICAvLyBDaGFuZ2UgY3VycmVudCBtYWluQ29udm9sdmVyXG4gICAgdmFyIGFjdGl2ZSA9IHRoaXMubWFpbkNvbnZvbHZlcjtcbiAgICB0aGlzLm1haW5Db252b2x2ZXIgPSB0aGlzLnNlY29uZGFyeUNvbnZvbHZlcjtcbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlciA9IGFjdGl2ZTtcblxuICAgIGlmICh0aGlzLmNoYW5nZVdoZW5GaW5pc2hDcm9zc2ZhZGluZykge1xuICAgICAgdGhpcy5jaGFuZ2VXaGVuRmluaXNoQ3Jvc3NmYWRpbmcgPSBmYWxzZTtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkdXJhdGlvbiBvZiBjcm9zc2ZhZGluZyBpbiBtaWxpc2Vjb25kcy5cbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBkdXJhdGlvbiBEdXJhdGlvbiBvZiB0aGUgY3Jvc3NmYWRpbmcgaW4gbWlsaXNlY29uZHNcbiAgICovXG4gIHNldENyb3NzZmFkZUR1cmF0aW9uKGR1cmF0aW9uKSB7XG4gICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICAvLyBNaWxpc2Vjb25kcyB0byBzXG4gICAgICB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uID0gZHVyYXRpb24gLyAxMDAwO1xuICAgICAgcmV0dXJuIHRoaXM7IC8vIGZvciBjaGFpbmFiaWxpdHlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ3Jvc3NmYWRlRHVyYXRpb24gc2V0dGluZyBlcnJvclwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkdXJhdGlvbiBvZiBjcm9zc2ZhZGluZyBpbiBtaWxpc2Vjb25kcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0Q3Jvc3NmYWRlRHVyYXRpb24oKSB7XG4gICAgLy8gU2Vjb25kcyB0byBtc1xuICAgIHJldHVybiB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uICogMTAwMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHZpcnR1YWwgc291cmNlLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEbyB0aGUgY3Jvc3NmYWRpbmcgYmV0d2VlbiB0aGUgZ2Fpbk5vZGUgYWN0aXZlIGFuZCBpbmFjdGl2ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNyb3NzZmFkaW5nKCkge1xuICAgIC8vIERvIHRoZSBjcm9zc2ZhZGluZyBiZXR3ZWVuIG1haW5Db252b2x2ZXIgYW5kIHNlY29uZGFyeUNvbnZvbHZlclxuICAgIHZhciBndWFyZEludGVydmFsID0gMC4wMjtcbiAgICB0aGlzLm1haW5Db252b2x2ZXIuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgxLCB0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGd1YXJkSW50ZXJ2YWwpO1xuICAgIHRoaXMubWFpbkNvbnZvbHZlci5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZ3VhcmRJbnRlcnZhbCArIHRoaXMuY3Jvc3NmYWRlRHVyYXRpb24pO1xuXG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCB0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGd1YXJkSW50ZXJ2YWwpO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMSwgdGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBndWFyZEludGVydmFsICsgdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBIUlRGIGZpbGUgZm9yIGFuIGVzcGVjaWZpYyBwb3NpdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIGdldEhSVEYoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuICAgIHZhciBuZWFyZXN0ID0gdGhpcy5nZXROZWFyZXN0UG9pbnQoYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSk7XG4gICAgLy8gUmV0dXJuIGJ1ZmZlciBvZiBuZWFyZXN0IHBvc2l0aW9uIGZvciB0aGUgaW5wdXQgdmFsdWVzXG4gICAgcmV0dXJuIG5lYXJlc3QuYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGUgc3BoZXJpY2FsIHRvIGNhcnRlc2lhbiBjb29yZGluYXRlcy5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIGF6aW11dGggQXppbXV0aCBpbiByYWRpYW5zXG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIHJhZGlhbnNcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgc3BoZXJpY2FsVG9DYXJ0ZXNpYW4oYXppbXV0aCwgZWxldmF0aW9uLCBkaXN0YW5jZSkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBkaXN0YW5jZSAqIE1hdGguc2luKGF6aW11dGgpLFxuICAgICAgeTogZGlzdGFuY2UgKiBNYXRoLmNvcyhhemltdXRoKSxcbiAgICAgIHo6IGRpc3RhbmNlICogTWF0aC5zaW4oZWxldmF0aW9uKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5lYXJlc3QgcG9zaXRpb24gZm9yIGFuIGlucHV0IHBvc2l0aW9uLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIGdldFJlYWxDb29yZGluYXRlcyhhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgdmFyIG5lYXJlc3QgPSB0aGlzLmdldE5lYXJlc3RQb2ludChhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKTtcbiAgICAvLyBSZXR1cm4gYXppbXV0aCwgZWxldmF0aW9uIGFuZCBkaXN0YW5jZSBvZiBuZWFyZXN0IHBvc2l0aW9uIGZvciB0aGUgaW5wdXQgdmFsdWVzXG4gICAgcmV0dXJuIHtcbiAgICAgIGF6aW11dGg6IG5lYXJlc3QuYXppbXV0aCxcbiAgICAgIGVsZXZhdGlvbjogbmVhcmVzdC5lbGV2YXRpb24sXG4gICAgICBkaXN0YW5jZTogbmVhcmVzdC5kaXN0YW5jZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5lYXJlc3QgcG9zaXRpb24gZm9yIGFuIGlucHV0IHBvc2l0aW9uLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIC0xODAgZm9yIHNvdXJjZSBvbiB5b3VyIGxlZnQsIGFuZCBmcm9tIDAgdG8gMTgwIGZvciBzb3VyY2Ugb24geW91ciByaWdodFxuICAgKiBAcGFyYW0gZWxldmF0aW9uIEVsZXZhdGlvbiBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byA5MCBmb3Igc291cmNlIGFib3ZlIHlvdXIgaGVhZCwgMCBmb3Igc291cmNlIGluIGZyb250IG9mIHlvdXIgaGVhZCwgYW5kIGZyb20gMCB0byAtOTAgZm9yIHNvdXJjZSBiZWxvdyB5b3VyIGhlYWQpXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBEaXN0YW5jZSBpbiBtZXRlcnNcbiAgICovXG4gIGdldE5lYXJlc3RQb2ludChhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgLy8gRGVncmVlcyB0byByYWRpYW5zIGZvciB0aGUgYXppbXV0aCBhbmQgZWxldmF0aW9uXG4gICAgdmFyIGF6aW11dGhSYWRpYW5zID0gYXppbXV0aCAqIE1hdGguUEkgLyAxODA7XG4gICAgdmFyIGVsZXZhdGlvblJhZGlhbnMgPSBlbGV2YXRpb24gKiBNYXRoLlBJIC8gMTgwO1xuICAgIC8vIENvbnZlcnQgc3BoZXJpY2FsIGNvb3JkaW5hdGVzIHRvIGNhcnRlc2lhblxuICAgIHZhciBjYXJ0ZXNpYW5Db29yZCA9IHRoaXMuc3BoZXJpY2FsVG9DYXJ0ZXNpYW4oYXppbXV0aFJhZGlhbnMsIGVsZXZhdGlvblJhZGlhbnMsIGRpc3RhbmNlKTtcbiAgICAvLyBHZXQgdGhlIG5lYXJlc3QgSFJURiBmaWxlIGZvciB0aGUgZGVzaXJlZCBwb3NpdGlvblxuICAgIHZhciBuZWFyZXN0ID0gdGhpcy50cmVlLm5lYXJlc3QoY2FydGVzaWFuQ29vcmQsIDEpWzBdO1xuXG4gICAgcmV0dXJuIG5lYXJlc3RbMF07XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIHNldCB0aGUgbmV4dFBvc2l0aW9uIHBvc2l0aW9uIGlmIHRoZSByYW1wcyBhcmUgbm90IGluIGEgY3Jvc3NmYWRpbmdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldExhc3RQb3NpdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuaXNDcm9zc2ZhZGluZygpKSB7XG4gICAgICB0aGlzLnJlYWxseVN0YXJ0UG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuXG59O1xuXG4vKipcbiAqIENvbnZvbHZlciBzdWIgYXVkaW8gZ3JhcGggY2xhc3NcbiAqL1xuXG5jbGFzcyBDb252b2x2ZXJBdWRpb0dyYXBoIHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5hdWRpb0NvbnRleHQgPSBvcHRpb25zLmF1ZGlvQ29udGV4dDtcbiAgICB0aGlzLmdhaW5Ob2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIHRoaXMuY29udk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVDb252b2x2ZXIoKTtcbiAgICB0aGlzLmNvbnZOb2RlLm5vcm1hbGl6ZSA9IGZhbHNlO1xuICAgIHRoaXMuZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLmNvbnZOb2RlKTtcblxuICAgIC8vIEhhY2sgdG8gZm9yY2UgYXVkaW9QYXJhbSBhY3RpdmUgd2hlbiB0aGUgc291cmNlIGlzIG5vdCBhY3RpdmVcbiAgICB0aGlzLm9zY2lsbGF0b3JOb2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgIHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIHRoaXMub3NjaWxsYXRvck5vZGUuY29ubmVjdCh0aGlzLmdhaW5Pc2NpbGxhdG9yTm9kZSk7XG4gICAgdGhpcy5nYWluT3NjaWxsYXRvck5vZGUuY29ubmVjdCh0aGlzLmdhaW5Ob2RlKTtcbiAgICB0aGlzLmdhaW5Pc2NpbGxhdG9yTm9kZS5nYWluLnZhbHVlID0gMDtcbiAgICB0aGlzLm9zY2lsbGF0b3JOb2RlLnN0YXJ0KDApO1xuICB9XG5cbiAgZ2V0IGlucHV0KCkge1xuICAgIHJldHVybiB0aGlzLmdhaW5Ob2RlO1xuICB9XG5cbiAgZ2V0IGdhaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2Fpbk5vZGUuZ2FpbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGJ1ZmZlciBpbiB0aGUgY29udm9sdmVyTm9kZVxuICAgKiBAcHVibGljXG4gICAqIEBwYXJhbSB2YWx1ZSBBdWRpb0J1ZmZlciBPYmplY3QuXG4gICAqL1xuICBzZXQgYnVmZmVyKHZhbHVlKSB7XG4gICAgdGhpcy5jb252Tm9kZS5idWZmZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0IHRoZSBDb252b2x2ZXJBdWRpb0dyYXBoIHRvIGEgbm9kZVxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIG5vZGUgRGVzdGluYXRpb24gbm9kZVxuICAgKi9cbiAgY29ubmVjdChub2RlKSB7XG4gICAgdGhpcy5jb252Tm9kZS5jb25uZWN0KG5vZGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3QgdGhlIENvbnZvbHZlckF1ZGlvR3JhcGggdG8gYSBub2RlXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBkaXNjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLmNvbnZOb2RlLmRpc2Nvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufTtcblxuLy8gQ29tbW9uSlMgZnVuY3Rpb24gZXhwb3J0XG5tb2R1bGUuZXhwb3J0cyA9IEJpbmF1cmFsRklSO1xuIiwiLyoqXG4gKiBBVVRIT1IgT0YgSU5JVElBTCBKUyBMSUJSQVJZXG4gKiBrLWQgVHJlZSBKYXZhU2NyaXB0IC0gViAxLjBcbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdWJpbGFicy9rZC10cmVlLWphdmFzY3JpcHRcbiAqXG4gKiBAYXV0aG9yIE1pcmNlYSBQcmljb3AgPHByaWNvcEB1YmlsYWJzLm5ldD4sIDIwMTJcbiAqIEBhdXRob3IgTWFydGluIEtsZXBwZSA8a2xlcHBlQHViaWxhYnMubmV0PiwgMjAxMlxuICogQGF1dGhvciBVYmlsYWJzIGh0dHA6Ly91YmlsYWJzLm5ldCwgMjAxMlxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgPGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwPlxuICovXG5cblxuZnVuY3Rpb24gTm9kZShvYmosIGRpbWVuc2lvbiwgcGFyZW50KSB7XG4gIHRoaXMub2JqID0gb2JqO1xuICB0aGlzLmxlZnQgPSBudWxsO1xuICB0aGlzLnJpZ2h0ID0gbnVsbDtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuZGltZW5zaW9uID0gZGltZW5zaW9uO1xufVxuXG5mdW5jdGlvbiBLZFRyZWUocG9pbnRzLCBtZXRyaWMsIGRpbWVuc2lvbnMpIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIFxuICBmdW5jdGlvbiBidWlsZFRyZWUocG9pbnRzLCBkZXB0aCwgcGFyZW50KSB7XG4gICAgdmFyIGRpbSA9IGRlcHRoICUgZGltZW5zaW9ucy5sZW5ndGgsXG4gICAgICBtZWRpYW4sXG4gICAgICBub2RlO1xuXG4gICAgaWYgKHBvaW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIG5ldyBOb2RlKHBvaW50c1swXSwgZGltLCBwYXJlbnQpO1xuICAgIH1cblxuICAgIHBvaW50cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYVtkaW1lbnNpb25zW2RpbV1dIC0gYltkaW1lbnNpb25zW2RpbV1dO1xuICAgIH0pO1xuXG4gICAgbWVkaWFuID0gTWF0aC5mbG9vcihwb2ludHMubGVuZ3RoIC8gMik7XG4gICAgbm9kZSA9IG5ldyBOb2RlKHBvaW50c1ttZWRpYW5dLCBkaW0sIHBhcmVudCk7XG4gICAgbm9kZS5sZWZ0ID0gYnVpbGRUcmVlKHBvaW50cy5zbGljZSgwLCBtZWRpYW4pLCBkZXB0aCArIDEsIG5vZGUpO1xuICAgIG5vZGUucmlnaHQgPSBidWlsZFRyZWUocG9pbnRzLnNsaWNlKG1lZGlhbiArIDEpLCBkZXB0aCArIDEsIG5vZGUpO1xuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB0aGlzLnJvb3QgPSBidWlsZFRyZWUocG9pbnRzLCAwLCBudWxsKTtcblxuICB0aGlzLmluc2VydCA9IGZ1bmN0aW9uIChwb2ludCkge1xuICAgIGZ1bmN0aW9uIGlubmVyU2VhcmNoKG5vZGUsIHBhcmVudCkge1xuXG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgfVxuXG4gICAgICB2YXIgZGltZW5zaW9uID0gZGltZW5zaW9uc1tub2RlLmRpbWVuc2lvbl07XG4gICAgICBpZiAocG9pbnRbZGltZW5zaW9uXSA8IG5vZGUub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgICAgcmV0dXJuIGlubmVyU2VhcmNoKG5vZGUubGVmdCwgbm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW5uZXJTZWFyY2gobm9kZS5yaWdodCwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGluc2VydFBvc2l0aW9uID0gaW5uZXJTZWFyY2godGhpcy5yb290LCBudWxsKSxcbiAgICAgIG5ld05vZGUsXG4gICAgICBkaW1lbnNpb247XG5cbiAgICBpZiAoaW5zZXJ0UG9zaXRpb24gPT09IG51bGwpIHtcbiAgICAgIHRoaXMucm9vdCA9IG5ldyBOb2RlKHBvaW50LCAwLCBudWxsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuZXdOb2RlID0gbmV3IE5vZGUocG9pbnQsIChpbnNlcnRQb3NpdGlvbi5kaW1lbnNpb24gKyAxKSAlIGRpbWVuc2lvbnMubGVuZ3RoLCBpbnNlcnRQb3NpdGlvbik7XG4gICAgZGltZW5zaW9uID0gZGltZW5zaW9uc1tpbnNlcnRQb3NpdGlvbi5kaW1lbnNpb25dO1xuXG4gICAgaWYgKHBvaW50W2RpbWVuc2lvbl0gPCBpbnNlcnRQb3NpdGlvbi5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgaW5zZXJ0UG9zaXRpb24ubGVmdCA9IG5ld05vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc2VydFBvc2l0aW9uLnJpZ2h0ID0gbmV3Tm9kZTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICB2YXIgbm9kZTtcblxuICAgIGZ1bmN0aW9uIG5vZGVTZWFyY2gobm9kZSkge1xuICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLm9iaiA9PT0gcG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG5cbiAgICAgIHZhciBkaW1lbnNpb24gPSBkaW1lbnNpb25zW25vZGUuZGltZW5zaW9uXTtcblxuICAgICAgaWYgKHBvaW50W2RpbWVuc2lvbl0gPCBub2RlLm9ialtkaW1lbnNpb25dKSB7XG4gICAgICAgIHJldHVybiBub2RlU2VhcmNoKG5vZGUubGVmdCwgbm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbm9kZVNlYXJjaChub2RlLnJpZ2h0LCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICAgIHZhciBuZXh0Tm9kZSxcbiAgICAgICAgbmV4dE9iaixcbiAgICAgICAgcERpbWVuc2lvbjtcblxuICAgICAgZnVuY3Rpb24gZmluZE1heChub2RlLCBkaW0pIHtcbiAgICAgICAgdmFyIGRpbWVuc2lvbixcbiAgICAgICAgICBvd24sXG4gICAgICAgICAgbGVmdCxcbiAgICAgICAgICByaWdodCxcbiAgICAgICAgICBtYXg7XG5cbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbZGltXTtcbiAgICAgICAgaWYgKG5vZGUuZGltZW5zaW9uID09PSBkaW0pIHtcbiAgICAgICAgICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmRNYXgobm9kZS5yaWdodCwgZGltKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBvd24gPSBub2RlLm9ialtkaW1lbnNpb25dO1xuICAgICAgICBsZWZ0ID0gZmluZE1heChub2RlLmxlZnQsIGRpbSk7XG4gICAgICAgIHJpZ2h0ID0gZmluZE1heChub2RlLnJpZ2h0LCBkaW0pO1xuICAgICAgICBtYXggPSBub2RlO1xuXG4gICAgICAgIGlmIChsZWZ0ICE9PSBudWxsICYmIGxlZnQub2JqW2RpbWVuc2lvbl0gPiBvd24pIHtcbiAgICAgICAgICBtYXggPSBsZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJpZ2h0ICE9PSBudWxsICYmIHJpZ2h0Lm9ialtkaW1lbnNpb25dID4gbWF4Lm9ialtkaW1lbnNpb25dKSB7XG4gICAgICAgICAgbWF4ID0gcmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZmluZE1pbihub2RlLCBkaW0pIHtcbiAgICAgICAgdmFyIGRpbWVuc2lvbixcbiAgICAgICAgICBvd24sXG4gICAgICAgICAgbGVmdCxcbiAgICAgICAgICByaWdodCxcbiAgICAgICAgICBtaW47XG5cbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbZGltXTtcblxuICAgICAgICBpZiAobm9kZS5kaW1lbnNpb24gPT09IGRpbSkge1xuICAgICAgICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kTWluKG5vZGUubGVmdCwgZGltKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBvd24gPSBub2RlLm9ialtkaW1lbnNpb25dO1xuICAgICAgICBsZWZ0ID0gZmluZE1pbihub2RlLmxlZnQsIGRpbSk7XG4gICAgICAgIHJpZ2h0ID0gZmluZE1pbihub2RlLnJpZ2h0LCBkaW0pO1xuICAgICAgICBtaW4gPSBub2RlO1xuXG4gICAgICAgIGlmIChsZWZ0ICE9PSBudWxsICYmIGxlZnQub2JqW2RpbWVuc2lvbl0gPCBvd24pIHtcbiAgICAgICAgICBtaW4gPSBsZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyaWdodCAhPT0gbnVsbCAmJiByaWdodC5vYmpbZGltZW5zaW9uXSA8IG1pbi5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgICAgIG1pbiA9IHJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW47XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmxlZnQgPT09IG51bGwgJiYgbm9kZS5yaWdodCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICBzZWxmLnJvb3QgPSBudWxsO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBEaW1lbnNpb24gPSBkaW1lbnNpb25zW25vZGUucGFyZW50LmRpbWVuc2lvbl07XG5cbiAgICAgICAgaWYgKG5vZGUub2JqW3BEaW1lbnNpb25dIDwgbm9kZS5wYXJlbnQub2JqW3BEaW1lbnNpb25dKSB7XG4gICAgICAgICAgbm9kZS5wYXJlbnQubGVmdCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9kZS5wYXJlbnQucmlnaHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICBuZXh0Tm9kZSA9IGZpbmRNYXgobm9kZS5sZWZ0LCBub2RlLmRpbWVuc2lvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0Tm9kZSA9IGZpbmRNaW4obm9kZS5yaWdodCwgbm9kZS5kaW1lbnNpb24pO1xuICAgICAgfVxuXG4gICAgICBuZXh0T2JqID0gbmV4dE5vZGUub2JqO1xuICAgICAgcmVtb3ZlTm9kZShuZXh0Tm9kZSk7XG4gICAgICBub2RlLm9iaiA9IG5leHRPYmo7XG5cbiAgICB9XG5cbiAgICBub2RlID0gbm9kZVNlYXJjaChzZWxmLnJvb3QpO1xuXG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHsgcmV0dXJuOyB9XG5cbiAgICByZW1vdmVOb2RlKG5vZGUpO1xuICB9O1xuXG4gIHRoaXMubmVhcmVzdCA9IGZ1bmN0aW9uIChwb2ludCwgbWF4Tm9kZXMsIG1heERpc3RhbmNlKSB7XG4gICAgdmFyIGksXG4gICAgICByZXN1bHQsXG4gICAgICBiZXN0Tm9kZXM7XG5cbiAgICBiZXN0Tm9kZXMgPSBuZXcgQmluYXJ5SGVhcChcbiAgICAgIGZ1bmN0aW9uIChlKSB7IHJldHVybiAtZVsxXTsgfVxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBuZWFyZXN0U2VhcmNoKG5vZGUpIHtcbiAgICAgIHZhciBiZXN0Q2hpbGQsXG4gICAgICAgIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbbm9kZS5kaW1lbnNpb25dLFxuICAgICAgICBvd25EaXN0YW5jZSA9IG1ldHJpYyhwb2ludCwgbm9kZS5vYmopLFxuICAgICAgICBsaW5lYXJQb2ludCA9IHt9LFxuICAgICAgICBsaW5lYXJEaXN0YW5jZSxcbiAgICAgICAgb3RoZXJDaGlsZCxcbiAgICAgICAgaTtcblxuICAgICAgZnVuY3Rpb24gc2F2ZU5vZGUobm9kZSwgZGlzdGFuY2UpIHtcbiAgICAgICAgYmVzdE5vZGVzLnB1c2goW25vZGUsIGRpc3RhbmNlXSk7XG4gICAgICAgIGlmIChiZXN0Tm9kZXMuc2l6ZSgpID4gbWF4Tm9kZXMpIHtcbiAgICAgICAgICBiZXN0Tm9kZXMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGRpbWVuc2lvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGkgPT09IG5vZGUuZGltZW5zaW9uKSB7XG4gICAgICAgICAgbGluZWFyUG9pbnRbZGltZW5zaW9uc1tpXV0gPSBwb2ludFtkaW1lbnNpb25zW2ldXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaW5lYXJQb2ludFtkaW1lbnNpb25zW2ldXSA9IG5vZGUub2JqW2RpbWVuc2lvbnNbaV1dO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpbmVhckRpc3RhbmNlID0gbWV0cmljKGxpbmVhclBvaW50LCBub2RlLm9iaik7XG5cbiAgICAgIGlmIChub2RlLnJpZ2h0ID09PSBudWxsICYmIG5vZGUubGVmdCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoYmVzdE5vZGVzLnNpemUoKSA8IG1heE5vZGVzIHx8IG93bkRpc3RhbmNlIDwgYmVzdE5vZGVzLnBlZWsoKVsxXSkge1xuICAgICAgICAgIHNhdmVOb2RlKG5vZGUsIG93bkRpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLnJpZ2h0ID09PSBudWxsKSB7XG4gICAgICAgIGJlc3RDaGlsZCA9IG5vZGUubGVmdDtcbiAgICAgIH0gZWxzZSBpZiAobm9kZS5sZWZ0ID09PSBudWxsKSB7XG4gICAgICAgIGJlc3RDaGlsZCA9IG5vZGUucmlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocG9pbnRbZGltZW5zaW9uXSA8IG5vZGUub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgICAgICBiZXN0Q2hpbGQgPSBub2RlLmxlZnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmVzdENoaWxkID0gbm9kZS5yaWdodDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZWFyZXN0U2VhcmNoKGJlc3RDaGlsZCk7XG5cbiAgICAgIGlmIChiZXN0Tm9kZXMuc2l6ZSgpIDwgbWF4Tm9kZXMgfHwgb3duRGlzdGFuY2UgPCBiZXN0Tm9kZXMucGVlaygpWzFdKSB7XG4gICAgICAgIHNhdmVOb2RlKG5vZGUsIG93bkRpc3RhbmNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJlc3ROb2Rlcy5zaXplKCkgPCBtYXhOb2RlcyB8fCBNYXRoLmFicyhsaW5lYXJEaXN0YW5jZSkgPCBiZXN0Tm9kZXMucGVlaygpWzFdKSB7XG4gICAgICAgIGlmIChiZXN0Q2hpbGQgPT09IG5vZGUubGVmdCkge1xuICAgICAgICAgIG90aGVyQ2hpbGQgPSBub2RlLnJpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG90aGVyQ2hpbGQgPSBub2RlLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyQ2hpbGQgIT09IG51bGwpIHtcbiAgICAgICAgICBuZWFyZXN0U2VhcmNoKG90aGVyQ2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1heERpc3RhbmNlKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbWF4Tm9kZXM7IGkgKz0gMSkge1xuICAgICAgICBiZXN0Tm9kZXMucHVzaChbbnVsbCwgbWF4RGlzdGFuY2VdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZWFyZXN0U2VhcmNoKHNlbGYucm9vdCk7XG5cbiAgICByZXN1bHQgPSBbXTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBtYXhOb2RlczsgaSArPSAxKSB7XG4gICAgICBpZiAoYmVzdE5vZGVzLmNvbnRlbnRbaV1bMF0pIHtcbiAgICAgICAgcmVzdWx0LnB1c2goW2Jlc3ROb2Rlcy5jb250ZW50W2ldWzBdLm9iaiwgYmVzdE5vZGVzLmNvbnRlbnRbaV1bMV1dKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB0aGlzLmJhbGFuY2VGYWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gaGVpZ2h0KG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hdGgubWF4KGhlaWdodChub2RlLmxlZnQpLCBoZWlnaHQobm9kZS5yaWdodCkpICsgMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb3VudChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb3VudChub2RlLmxlZnQpICsgY291bnQobm9kZS5yaWdodCkgKyAxO1xuICAgIH1cblxuICAgIHJldHVybiBoZWlnaHQoc2VsZi5yb290KSAvIChNYXRoLmxvZyhjb3VudChzZWxmLnJvb3QpKSAvIE1hdGgubG9nKDIpKTtcbiAgfTtcbn1cblxuLy8gQmluYXJ5IGhlYXAgaW1wbGVtZW50YXRpb24gZnJvbTpcbi8vIGh0dHA6Ly9lbG9xdWVudGphdmFzY3JpcHQubmV0L2FwcGVuZGl4Mi5odG1sXG5cbmZ1bmN0aW9uIEJpbmFyeUhlYXAoc2NvcmVGdW5jdGlvbil7XG4gIHRoaXMuY29udGVudCA9IFtdO1xuICB0aGlzLnNjb3JlRnVuY3Rpb24gPSBzY29yZUZ1bmN0aW9uO1xufVxuXG5CaW5hcnlIZWFwLnByb3RvdHlwZSA9IHtcbiAgcHVzaDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIC8vIEFkZCB0aGUgbmV3IGVsZW1lbnQgdG8gdGhlIGVuZCBvZiB0aGUgYXJyYXkuXG4gICAgdGhpcy5jb250ZW50LnB1c2goZWxlbWVudCk7XG4gICAgLy8gQWxsb3cgaXQgdG8gYnViYmxlIHVwLlxuICAgIHRoaXMuYnViYmxlVXAodGhpcy5jb250ZW50Lmxlbmd0aCAtIDEpO1xuICB9LFxuXG4gIHBvcDogZnVuY3Rpb24oKSB7XG4gICAgLy8gU3RvcmUgdGhlIGZpcnN0IGVsZW1lbnQgc28gd2UgY2FuIHJldHVybiBpdCBsYXRlci5cbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5jb250ZW50WzBdO1xuICAgIC8vIEdldCB0aGUgZWxlbWVudCBhdCB0aGUgZW5kIG9mIHRoZSBhcnJheS5cbiAgICB2YXIgZW5kID0gdGhpcy5jb250ZW50LnBvcCgpO1xuICAgIC8vIElmIHRoZXJlIGFyZSBhbnkgZWxlbWVudHMgbGVmdCwgcHV0IHRoZSBlbmQgZWxlbWVudCBhdCB0aGVcbiAgICAvLyBzdGFydCwgYW5kIGxldCBpdCBzaW5rIGRvd24uXG4gICAgaWYgKHRoaXMuY29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmNvbnRlbnRbMF0gPSBlbmQ7XG4gICAgICB0aGlzLnNpbmtEb3duKDApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIHBlZWs6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRbMF07XG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMuY29udGVudC5sZW5ndGg7XG4gICAgLy8gVG8gcmVtb3ZlIGEgdmFsdWUsIHdlIG11c3Qgc2VhcmNoIHRocm91Z2ggdGhlIGFycmF5IHRvIGZpbmRcbiAgICAvLyBpdC5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5jb250ZW50W2ldID09IG5vZGUpIHtcbiAgICAgICAgLy8gV2hlbiBpdCBpcyBmb3VuZCwgdGhlIHByb2Nlc3Mgc2VlbiBpbiAncG9wJyBpcyByZXBlYXRlZFxuICAgICAgICAvLyB0byBmaWxsIHVwIHRoZSBob2xlLlxuICAgICAgICB2YXIgZW5kID0gdGhpcy5jb250ZW50LnBvcCgpO1xuICAgICAgICBpZiAoaSAhPSBsZW4gLSAxKSB7XG4gICAgICAgICAgdGhpcy5jb250ZW50W2ldID0gZW5kO1xuICAgICAgICAgIGlmICh0aGlzLnNjb3JlRnVuY3Rpb24oZW5kKSA8IHRoaXMuc2NvcmVGdW5jdGlvbihub2RlKSlcbiAgICAgICAgICAgIHRoaXMuYnViYmxlVXAoaSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zaW5rRG93bihpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vZGUgbm90IGZvdW5kLlwiKTtcbiAgfSxcblxuICBzaXplOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50Lmxlbmd0aDtcbiAgfSxcblxuICBidWJibGVVcDogZnVuY3Rpb24obikge1xuICAgIC8vIEZldGNoIHRoZSBlbGVtZW50IHRoYXQgaGFzIHRvIGJlIG1vdmVkLlxuICAgIHZhciBlbGVtZW50ID0gdGhpcy5jb250ZW50W25dO1xuICAgIC8vIFdoZW4gYXQgMCwgYW4gZWxlbWVudCBjYW4gbm90IGdvIHVwIGFueSBmdXJ0aGVyLlxuICAgIHdoaWxlIChuID4gMCkge1xuICAgICAgLy8gQ29tcHV0ZSB0aGUgcGFyZW50IGVsZW1lbnQncyBpbmRleCwgYW5kIGZldGNoIGl0LlxuICAgICAgdmFyIHBhcmVudE4gPSBNYXRoLmZsb29yKChuICsgMSkgLyAyKSAtIDEsXG4gICAgICAgICAgcGFyZW50ID0gdGhpcy5jb250ZW50W3BhcmVudE5dO1xuICAgICAgLy8gU3dhcCB0aGUgZWxlbWVudHMgaWYgdGhlIHBhcmVudCBpcyBncmVhdGVyLlxuICAgICAgaWYgKHRoaXMuc2NvcmVGdW5jdGlvbihlbGVtZW50KSA8IHRoaXMuc2NvcmVGdW5jdGlvbihwYXJlbnQpKSB7XG4gICAgICAgIHRoaXMuY29udGVudFtwYXJlbnROXSA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29udGVudFtuXSA9IHBhcmVudDtcbiAgICAgICAgLy8gVXBkYXRlICduJyB0byBjb250aW51ZSBhdCB0aGUgbmV3IHBvc2l0aW9uLlxuICAgICAgICBuID0gcGFyZW50TjtcbiAgICAgIH1cbiAgICAgIC8vIEZvdW5kIGEgcGFyZW50IHRoYXQgaXMgbGVzcywgbm8gbmVlZCB0byBtb3ZlIGl0IGZ1cnRoZXIuXG4gICAgICBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNpbmtEb3duOiBmdW5jdGlvbihuKSB7XG4gICAgLy8gTG9vayB1cCB0aGUgdGFyZ2V0IGVsZW1lbnQgYW5kIGl0cyBzY29yZS5cbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5jb250ZW50Lmxlbmd0aCxcbiAgICAgICAgZWxlbWVudCA9IHRoaXMuY29udGVudFtuXSxcbiAgICAgICAgZWxlbVNjb3JlID0gdGhpcy5zY29yZUZ1bmN0aW9uKGVsZW1lbnQpO1xuXG4gICAgd2hpbGUodHJ1ZSkge1xuICAgICAgLy8gQ29tcHV0ZSB0aGUgaW5kaWNlcyBvZiB0aGUgY2hpbGQgZWxlbWVudHMuXG4gICAgICB2YXIgY2hpbGQyTiA9IChuICsgMSkgKiAyLCBjaGlsZDFOID0gY2hpbGQyTiAtIDE7XG4gICAgICAvLyBUaGlzIGlzIHVzZWQgdG8gc3RvcmUgdGhlIG5ldyBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudCxcbiAgICAgIC8vIGlmIGFueS5cbiAgICAgIHZhciBzd2FwID0gbnVsbDtcbiAgICAgIC8vIElmIHRoZSBmaXJzdCBjaGlsZCBleGlzdHMgKGlzIGluc2lkZSB0aGUgYXJyYXkpLi4uXG4gICAgICBpZiAoY2hpbGQxTiA8IGxlbmd0aCkge1xuICAgICAgICAvLyBMb29rIGl0IHVwIGFuZCBjb21wdXRlIGl0cyBzY29yZS5cbiAgICAgICAgdmFyIGNoaWxkMSA9IHRoaXMuY29udGVudFtjaGlsZDFOXSxcbiAgICAgICAgICAgIGNoaWxkMVNjb3JlID0gdGhpcy5zY29yZUZ1bmN0aW9uKGNoaWxkMSk7XG4gICAgICAgIC8vIElmIHRoZSBzY29yZSBpcyBsZXNzIHRoYW4gb3VyIGVsZW1lbnQncywgd2UgbmVlZCB0byBzd2FwLlxuICAgICAgICBpZiAoY2hpbGQxU2NvcmUgPCBlbGVtU2NvcmUpXG4gICAgICAgICAgc3dhcCA9IGNoaWxkMU47XG4gICAgICB9XG4gICAgICAvLyBEbyB0aGUgc2FtZSBjaGVja3MgZm9yIHRoZSBvdGhlciBjaGlsZC5cbiAgICAgIGlmIChjaGlsZDJOIDwgbGVuZ3RoKSB7XG4gICAgICAgIHZhciBjaGlsZDIgPSB0aGlzLmNvbnRlbnRbY2hpbGQyTl0sXG4gICAgICAgICAgICBjaGlsZDJTY29yZSA9IHRoaXMuc2NvcmVGdW5jdGlvbihjaGlsZDIpO1xuICAgICAgICBpZiAoY2hpbGQyU2NvcmUgPCAoc3dhcCA9PSBudWxsID8gZWxlbVNjb3JlIDogY2hpbGQxU2NvcmUpKXtcbiAgICAgICAgICBzd2FwID0gY2hpbGQyTjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgZWxlbWVudCBuZWVkcyB0byBiZSBtb3ZlZCwgc3dhcCBpdCwgYW5kIGNvbnRpbnVlLlxuICAgICAgaWYgKHN3YXAgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRbbl0gPSB0aGlzLmNvbnRlbnRbc3dhcF07XG4gICAgICAgIHRoaXMuY29udGVudFtzd2FwXSA9IGVsZW1lbnQ7XG4gICAgICAgIG4gPSBzd2FwO1xuICAgICAgfVxuICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBhcmUgZG9uZS5cbiAgICAgIGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVLZFRyZWU6IGZ1bmN0aW9uIChwb2ludHMsIG1ldHJpYywgZGltZW5zaW9ucykge1xuICAgIHJldHVybiBuZXcgS2RUcmVlKHBvaW50cywgbWV0cmljLCBkaW1lbnNpb25zKVxuICB9XG59XG4iXX0=
