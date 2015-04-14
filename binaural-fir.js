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
  this.mainConvolver = new ConvolverAudioGraph();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2tkdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ1NBO0FBQUEsQUFBSSxFQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7QUFUeEIsQUFBSSxFQUFBLGNBZUosU0FBTSxZQUFVLENBRUYsT0FBTSxDQUFHO0FBQ25CLEtBQUcsYUFBYSxFQUFJLENBQUEsT0FBTSxhQUFhLENBQUM7QUFDeEMsS0FBRyxZQUFZLEVBQUksR0FBQyxDQUFDO0FBQ3JCLEtBQUcsa0JBQWtCLEVBQUksRUFBQSxDQUFDO0FBQzFCLEtBQUcsS0FBSyxFQUFJLEVBQUMsQ0FBQSxDQUFDO0FBQ2QsS0FBRyxTQUFTLEVBQUksR0FBQyxDQUFDO0FBQ2xCLEtBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUN0QixLQUFHLDRCQUE0QixFQUFJLE1BQUksQ0FBQztBQUN4QyxLQUFHLGtCQUFrQixFQUFJLENBQUEsRUFBQyxFQUFJLEtBQUcsQ0FBQztBQUVsQyxLQUFHLE1BQU0sRUFBSSxDQUFBLElBQUcsYUFBYSxXQUFXLEFBQUMsRUFBQyxDQUFDO0FBTzNDLEtBQUcsY0FBYyxFQUFJLElBQUksb0JBQWtCLEFBQUMsRUFBQyxDQUFDO0FBQzlDLEtBQUcsY0FBYyxLQUFLLE1BQU0sRUFBSSxFQUFBLENBQUM7QUFDakMsS0FBRyxNQUFNLFFBQVEsQUFBQyxDQUFDLElBQUcsY0FBYyxNQUFNLENBQUMsQ0FBQztBQUU1QyxLQUFHLG1CQUFtQixFQUFJLElBQUksb0JBQWtCLEFBQUMsQ0FBQyxDQUFDLFlBQVcsQ0FBRyxDQUFBLElBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogd3JpdHRlbiBpbiBFQ01Bc2NyaXB0IDYgKi9cbi8qKlxuICogQGZpbGVPdmVydmlld1xuICogVGhlIGJpbmF1cmFsRklSIG5vZGUgcHJvdmlkZXMgYmluYXVyYWwgbGlzdGVuaW5nIHRvIHRoZSB1c2VyLiBUaGUgbm92ZWx0eSBvZlxuICogdGhpcyBsaWJyYXJ5IGlzIHRoYXQgaXQgcGVybWl0cyB0byB1c2UgeW91ciBvd24gSFJURiBkYXRhc2V0LiBUaGlzIGxpYnJhcnlcbiAqIGNhbiBiZSB1c2VkIGFzIGEgcmVndWxhciBub2RlIGluc2lkZSB0aGUgV2ViIEF1ZGlvIEFQSS5cbiAqIEBhdXRob3IgQXJuYXUgSnVsacOgXG4gKiBAdmVyc2lvbiAwLjEuMVxuICovXG52YXIga2R0ID0gcmVxdWlyZSgna2R0Jyk7XG5cbi8qKlxuICogQGNsYXNzIEJpbmF1cmFsRklSXG4gKi9cblxuY2xhc3MgQmluYXVyYWxGSVIge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG9wdGlvbnMuYXVkaW9Db250ZXh0O1xuICAgIHRoaXMuaHJ0ZkRhdGFzZXQgPSBbXTtcbiAgICB0aGlzLmhydGZEYXRhc2V0TGVuZ3RoID0gMDtcbiAgICB0aGlzLnRyZWUgPSAtMTtcbiAgICB0aGlzLnBvc2l0aW9uID0ge307XG4gICAgdGhpcy5uZXh0UG9zaXRpb24gPSB7fTtcbiAgICB0aGlzLmNoYW5nZVdoZW5GaW5pc2hDcm9zc2ZhZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY3Jvc3NmYWRlRHVyYXRpb24gPSAyMCAvIDEwMDA7XG5cbiAgICB0aGlzLmlucHV0ID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXG4gICAgLy8gVHdvIHN1YiBhdWRpbyBncmFwaHMgY3JlYXRpb246XG4gICAgLy8gLSBtYWluQ29udm9sdmVyIHdoaWNoIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAvLyAtIGFuZCBzZWNvbmRhcnlDb252b2x2ZXIgd2hpY2ggcmVwcmVzZW50cyB0aGUgcG90ZW50aWFsIHRhcmdldCBzdGF0ZVxuICAgIC8vICAgd2hlbiBtb3Zpbmcgc291bmQgdG8gYSBuZXcgcG9zaXRpb25cblxuICAgIHRoaXMubWFpbkNvbnZvbHZlciA9IG5ldyBDb252b2x2ZXJBdWRpb0dyYXBoKCk7XG4gICAgdGhpcy5tYWluQ29udm9sdmVyLmdhaW4udmFsdWUgPSAxO1xuICAgIHRoaXMuaW5wdXQuY29ubmVjdCh0aGlzLm1haW5Db252b2x2ZXIuaW5wdXQpO1xuXG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIgPSBuZXcgQ29udm9sdmVyQXVkaW9HcmFwaCh7YXVkaW9Db250ZXh0OiB0aGlzLmF1ZGlvQ29udGV4dH0pO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmdhaW4udmFsdWUgPSAwO1xuICAgIHRoaXMuaW5wdXQuY29ubmVjdCh0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5pbnB1dCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0aGUgYmluYXVyYWxGSVJOb2RlIHRvIHRoZSBXZWIgQXVkaW8gZ3JhcGhcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBub2RlIERlc3RpbmF0aW9uIG5vZGVcbiAgICovXG4gIGNvbm5lY3Qobm9kZSkge1xuICAgIHRoaXMubWFpbkNvbnZvbHZlci5jb25uZWN0KG5vZGUpO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmNvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7IC8vIEZvciBjaGFpbmFiaWxpdHlcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0IHRoZSBiaW5hdXJhbEZJUk5vZGUgZnJvbSB0aGUgV2ViIEF1ZGlvIGdyYXBoXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBkaXNjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLm1haW5Db252b2x2ZXIuZGlzY29ubmVjdChub2RlKTtcbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5kaXNjb25uZWN0KG5vZGUpO1xuICAgIHJldHVybiB0aGlzOyAvLyBGb3IgY2hhaW5hYmlsaXR5XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgSFJURiBEYXRhc2V0IHRvIGJlIHVzZWQgd2l0aCB0aGUgdmlydHVhbCBzb3VyY2UuXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gaHJ0ZkRhdGFzZXQgQXJyYXkgb2YgT2JqZWN0cyBjb250YWluaW5nIHRoZSBhemltdXRoLCBkaXN0YW5jZSwgZWxldmF0aW9uLCB1cmwgYW5kIGJ1ZmZlciBmb3IgZWFjaCBwb2ludFxuICAgKi9cbiAgc2V0IEhSVEZEYXRhc2V0KGhydGZEYXRhc2V0KSB7XG4gICAgdGhpcy5ocnRmRGF0YXNldCA9IGhydGZEYXRhc2V0O1xuICAgIHRoaXMuaHJ0ZkRhdGFzZXRMZW5ndGggPSB0aGlzLmhydGZEYXRhc2V0Lmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ocnRmRGF0YXNldExlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaHJ0ZiA9IHRoaXMuaHJ0ZkRhdGFzZXRbaV07XG4gICAgICAvLyBBemltdXRoIGFuZCBlbGV2YXRpb24gdG8gcmFkaWFuc1xuICAgICAgdmFyIGF6aW11dGhSYWRpYW5zID0gaHJ0Zi5hemltdXRoICogTWF0aC5QSSAvIDE4MDtcbiAgICAgIHZhciBlbGV2YXRpb25SYWRpYW5zID0gaHJ0Zi5lbGV2YXRpb24gKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgdmFyIGNhdGVzaWFuQ29vcmQgPSB0aGlzLnNwaGVyaWNhbFRvQ2FydGVzaWFuKGF6aW11dGhSYWRpYW5zLCBlbGV2YXRpb25SYWRpYW5zLCBocnRmLmRpc3RhbmNlKTtcbiAgICAgIGhydGYueCA9IGNhdGVzaWFuQ29vcmQueDtcbiAgICAgIGhydGYueSA9IGNhdGVzaWFuQ29vcmQueTtcbiAgICAgIGhydGYueiA9IGNhdGVzaWFuQ29vcmQuejtcbiAgICB9XG4gICAgdGhpcy50cmVlID0ga2R0LmNyZWF0ZUtkVHJlZSh0aGlzLmhydGZEYXRhc2V0LCB0aGlzLmRpc3RhbmNlLCBbJ3gnLCAneScsICd6J10pO1xuICB9XG5cbiAgZ2V0IEhSVEZEYXRhc2V0KCkge1xuICAgIHJldHVybiB0aGlzLmhydGZEYXRhc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzIGluIGEgMy1EIHNwYWNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBhIE9iamVjdCBjb250YWluaW5nIHRocmVlIHByb3BlcnRpZXM6IHgsIHksIHpcbiAgICogQHBhcmFtIGIgT2JqZWN0IGNvbnRhaW5pbmcgdGhyZWUgcHJvcGVydGllczogeCwgeSwgelxuICAgKi9cbiAgZGlzdGFuY2UoYSwgYikge1xuICAgIC8vIE5vIG5lZWQgdG8gY29tcHV0ZSBzcXVhcmUgcm9vdCBoZXJlIGZvciBkaXN0YW5jZSBjb21wYXJpc29uLCB0aGlzIGlzIG1vcmUgZWZmaWNpZW50LlxuICAgIHJldHVybiBNYXRoLnBvdyhhLnggLSBiLngsIDIpICsgTWF0aC5wb3coYS55IC0gYi55LCAyKSArIE1hdGgucG93KGEueiAtIGIueiwgMik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHBvc2l0aW9uIG9mIHRoZSB2aXJ0dWFsIHNvdXJjZVxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIGF6aW11dGggQXppbXV0aCBpbiBkZWdyZWVzICjCsCk6IGZyb20gMCB0byAtMTgwIGZvciBzb3VyY2Ugb24geW91ciBsZWZ0LCBhbmQgZnJvbSAwIHRvIDE4MCBmb3Igc291cmNlIG9uIHlvdXIgcmlnaHRcbiAgICogQHBhcmFtIGVsZXZhdGlvbiBFbGV2YXRpb24gaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gOTAgZm9yIHNvdXJjZSBhYm92ZSB5b3VyIGhlYWQsIDAgZm9yIHNvdXJjZSBpbiBmcm9udCBvZiB5b3VyIGhlYWQsIGFuZCBmcm9tIDAgdG8gLTkwIGZvciBzb3VyY2UgYmVsb3cgeW91ciBoZWFkKVxuICAgKiBAcGFyYW0gZGlzdGFuY2UgRGlzdGFuY2UgaW4gbWV0ZXJzXG4gICAqIEB0b2RvIEltcGxlbWVudCBJbW1lZGlhdGUgc2V0UG9zaXRpb25cbiAgICovXG4gIHNldFBvc2l0aW9uKGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpIHtcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbmVhcmVzdCBwb3NpdGlvbiBmb3IgdGhlIGlucHV0IGF6aW11dGgsIGVsZXZhdGlvbiBhbmQgZGlzdGFuY2VcbiAgICAgIHZhciBuZWFyZXN0UG9zaXRpb24gPSB0aGlzLmdldFJlYWxDb29yZGluYXRlcyhhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKTtcbiAgICAgIC8vIE5vIG5lZWQgdG8gY2hhbmdlIHRoZSBjdXJyZW50IEhSVEYgbG9hZGVkIGlmIHNldHRlZCBwb3NpdGlvbiBlcXVhbCBjdXJyZW50IHBvc2l0aW9uXG4gICAgICBpZiAobmVhcmVzdFBvc2l0aW9uLmF6aW11dGggIT09IHRoaXMucG9zaXRpb24uYXppbXV0aCB8fCBuZWFyZXN0UG9zaXRpb24uZWxldmF0aW9uICE9PSB0aGlzLnBvc2l0aW9uLmVsZXZhdGlvbiB8fCBuZWFyZXN0UG9zaXRpb24uZGlzdGFuY2UgIT09IHRoaXMucG9zaXRpb24uZGlzdGFuY2UpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNyb3NzZmFkaW5nIGlzIGFjdGl2ZVxuICAgICAgICBpZiAodGhpcy5pc0Nyb3NzZmFkaW5nKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIHZhbHVlIHdhaXRpbmcgdG8gYmUgc2V0XG4gICAgICAgICAgaWYgKHRoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBTdG9wIHRoZSBwYXN0IHNldEludGVydmFsIGV2ZW50LlxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVdoZW5GaW5pc2hDcm9zc2ZhZGluZyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFNhdmUgdGhlIHBvc2l0aW9uXG4gICAgICAgICAgdGhpcy5uZXh0UG9zaXRpb24uYXppbXV0aCA9IG5lYXJlc3RQb3NpdGlvbi5hemltdXRoO1xuICAgICAgICAgIHRoaXMubmV4dFBvc2l0aW9uLmVsZXZhdGlvbiA9IG5lYXJlc3RQb3NpdGlvbi5lbGV2YXRpb247XG4gICAgICAgICAgdGhpcy5uZXh0UG9zaXRpb24uZGlzdGFuY2UgPSBuZWFyZXN0UG9zaXRpb24uZGlzdGFuY2U7XG5cbiAgICAgICAgICAvLyBTdGFydCB0aGUgc2V0SW50ZXJ2YWw6IHdhaXQgdW50aWwgdGhlIGNyb3NzZmFkaW5nIGlzIGZpbmlzaGVkLlxuICAgICAgICAgIHRoaXMuaW50ZXJ2YWxJRCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLnNldExhc3RQb3NpdGlvbi5iaW5kKHRoaXMpLCAwLjAwNSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5uZXh0UG9zaXRpb24uYXppbXV0aCA9IG5lYXJlc3RQb3NpdGlvbi5hemltdXRoO1xuICAgICAgICAgIHRoaXMubmV4dFBvc2l0aW9uLmVsZXZhdGlvbiA9IG5lYXJlc3RQb3NpdGlvbi5lbGV2YXRpb247XG4gICAgICAgICAgdGhpcy5uZXh0UG9zaXRpb24uZGlzdGFuY2UgPSBuZWFyZXN0UG9zaXRpb24uZGlzdGFuY2U7XG4gICAgICAgICAgdGhpcy5yZWFsbHlTdGFydFBvc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpczsgLy8gRm9yIGNoYWluYWJpbGl0eVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaWYgdGhlIGdhaW5zIGFyZSBpbiBhIGNyb3NzZmFkaW5nIG9yIG5vdC5cbiAgICogQGZhbHNlXG4gICAqL1xuICBpc0Nyb3NzZmFkaW5nKCkge1xuICAgIC8vIFRoZSByYW1wcyBhcmUgbm90IGZpbmlzaGVkLCBzbyB0aGUgY3Jvc3NmYWRpbmcgaXMgbm90IGZpbmlzaGVkXG4gICAgaWYgKHRoaXMubWFpbkNvbnZvbHZlci5nYWluLnZhbHVlICE9PSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFsbHkgY2hhbmdlIHRoZSBwb3NpdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVhbGx5U3RhcnRQb3NpdGlvbigpIHtcblxuICAgIC8vIFNhdmUgdGhlIGN1cnJlbnQgcG9zaXRpb25cbiAgICB0aGlzLnBvc2l0aW9uLmF6aW11dGggPSB0aGlzLm5leHRQb3NpdGlvbi5hemltdXRoO1xuICAgIHRoaXMucG9zaXRpb24uZWxldmF0aW9uID0gdGhpcy5uZXh0UG9zaXRpb24uZWxldmF0aW9uO1xuICAgIHRoaXMucG9zaXRpb24uZGlzdGFuY2UgPSB0aGlzLm5leHRQb3NpdGlvbi5kaXN0YW5jZTtcbiAgICAvLyBMb2FkIHRoZSBuZXcgcG9zaXRpb24gaW4gdGhlIGNvbnZvbHZlciBub3QgYWN0aXZlIChzZWNvbmRhcnlDb252b2x2ZXIpXG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuYnVmZmVyID0gdGhpcy5nZXRIUlRGKHRoaXMucG9zaXRpb24uYXppbXV0aCwgdGhpcy5wb3NpdGlvbi5lbGV2YXRpb24sIHRoaXMucG9zaXRpb24uZGlzdGFuY2UpO1xuICAgIC8vIERvIHRoZSBjcm9zc2ZhZGluZyBiZXR3ZWVuIG1haW5Db252b2x2ZXIgYW5kIHNlY29uZGFyeUNvbnZvbHZlclxuICAgIHRoaXMuY3Jvc3NmYWRpbmcoKTtcblxuICAgIC8vIENoYW5nZSBjdXJyZW50IG1haW5Db252b2x2ZXJcbiAgICB2YXIgYWN0aXZlID0gdGhpcy5tYWluQ29udm9sdmVyO1xuICAgIHRoaXMubWFpbkNvbnZvbHZlciA9IHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q29udm9sdmVyID0gYWN0aXZlO1xuXG4gICAgaWYgKHRoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nKSB7XG4gICAgICB0aGlzLmNoYW5nZVdoZW5GaW5pc2hDcm9zc2ZhZGluZyA9IGZhbHNlO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGR1cmF0aW9uIG9mIGNyb3NzZmFkaW5nIGluIG1pbGlzZWNvbmRzLlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtIGR1cmF0aW9uIER1cmF0aW9uIG9mIHRoZSBjcm9zc2ZhZGluZyBpbiBtaWxpc2Vjb25kc1xuICAgKi9cbiAgc2V0Q3Jvc3NmYWRlRHVyYXRpb24oZHVyYXRpb24pIHtcbiAgICBpZiAoZHVyYXRpb24pIHtcbiAgICAgIC8vIE1pbGlzZWNvbmRzIHRvIHNcbiAgICAgIHRoaXMuY3Jvc3NmYWRlRHVyYXRpb24gPSBkdXJhdGlvbiAvIDEwMDA7XG4gICAgICByZXR1cm4gdGhpczsgLy8gZm9yIGNoYWluYWJpbGl0eVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDcm9zc2ZhZGVEdXJhdGlvbiBzZXR0aW5nIGVycm9yXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGR1cmF0aW9uIG9mIGNyb3NzZmFkaW5nIGluIG1pbGlzZWNvbmRzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXRDcm9zc2ZhZGVEdXJhdGlvbigpIHtcbiAgICAvLyBTZWNvbmRzIHRvIG1zXG4gICAgcmV0dXJuIHRoaXMuY3Jvc3NmYWRlRHVyYXRpb24gKiAxMDAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgdmlydHVhbCBzb3VyY2UuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIERvIHRoZSBjcm9zc2ZhZGluZyBiZXR3ZWVuIHRoZSBnYWluTm9kZSBhY3RpdmUgYW5kIGluYWN0aXZlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY3Jvc3NmYWRpbmcoKSB7XG4gICAgLy8gRG8gdGhlIGNyb3NzZmFkaW5nIGJldHdlZW4gbWFpbkNvbnZvbHZlciBhbmQgc2Vjb25kYXJ5Q29udm9sdmVyXG4gICAgdmFyIGd1YXJkSW50ZXJ2YWwgPSAwLjAyO1xuICAgIHRoaXMubWFpbkNvbnZvbHZlci5nYWluLnNldFZhbHVlQXRUaW1lKDEsIHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZ3VhcmRJbnRlcnZhbCk7XG4gICAgdGhpcy5tYWluQ29udm9sdmVyLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgdGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBndWFyZEludGVydmFsICsgdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbik7XG5cbiAgICB0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5nYWluLnNldFZhbHVlQXRUaW1lKDAsIHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZ3VhcmRJbnRlcnZhbCk7XG4gICAgdGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgxLCB0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGd1YXJkSW50ZXJ2YWwgKyB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEhSVEYgZmlsZSBmb3IgYW4gZXNwZWNpZmljIHBvc2l0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSBhemltdXRoIEF6aW11dGggaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gLTE4MCBmb3Igc291cmNlIG9uIHlvdXIgbGVmdCwgYW5kIGZyb20gMCB0byAxODAgZm9yIHNvdXJjZSBvbiB5b3VyIHJpZ2h0XG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIDkwIGZvciBzb3VyY2UgYWJvdmUgeW91ciBoZWFkLCAwIGZvciBzb3VyY2UgaW4gZnJvbnQgb2YgeW91ciBoZWFkLCBhbmQgZnJvbSAwIHRvIC05MCBmb3Igc291cmNlIGJlbG93IHlvdXIgaGVhZClcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgZ2V0SFJURihhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgdmFyIG5lYXJlc3QgPSB0aGlzLmdldE5lYXJlc3RQb2ludChhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKTtcbiAgICAvLyBSZXR1cm4gYnVmZmVyIG9mIG5lYXJlc3QgcG9zaXRpb24gZm9yIHRoZSBpbnB1dCB2YWx1ZXNcbiAgICByZXR1cm4gbmVhcmVzdC5idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtIHRoZSBzcGhlcmljYWwgdG8gY2FydGVzaWFuIGNvb3JkaW5hdGVzLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gYXppbXV0aCBBemltdXRoIGluIHJhZGlhbnNcbiAgICogQHBhcmFtIGVsZXZhdGlvbiBFbGV2YXRpb24gaW4gcmFkaWFuc1xuICAgKiBAcGFyYW0gZGlzdGFuY2UgRGlzdGFuY2UgaW4gbWV0ZXJzXG4gICAqL1xuICBzcGhlcmljYWxUb0NhcnRlc2lhbihhemltdXRoLCBlbGV2YXRpb24sIGRpc3RhbmNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGRpc3RhbmNlICogTWF0aC5zaW4oYXppbXV0aCksXG4gICAgICB5OiBkaXN0YW5jZSAqIE1hdGguY29zKGF6aW11dGgpLFxuICAgICAgejogZGlzdGFuY2UgKiBNYXRoLnNpbihlbGV2YXRpb24pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbmVhcmVzdCBwb3NpdGlvbiBmb3IgYW4gaW5wdXQgcG9zaXRpb24uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSBhemltdXRoIEF6aW11dGggaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gLTE4MCBmb3Igc291cmNlIG9uIHlvdXIgbGVmdCwgYW5kIGZyb20gMCB0byAxODAgZm9yIHNvdXJjZSBvbiB5b3VyIHJpZ2h0XG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIDkwIGZvciBzb3VyY2UgYWJvdmUgeW91ciBoZWFkLCAwIGZvciBzb3VyY2UgaW4gZnJvbnQgb2YgeW91ciBoZWFkLCBhbmQgZnJvbSAwIHRvIC05MCBmb3Igc291cmNlIGJlbG93IHlvdXIgaGVhZClcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgZ2V0UmVhbENvb3JkaW5hdGVzKGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpIHtcbiAgICB2YXIgbmVhcmVzdCA9IHRoaXMuZ2V0TmVhcmVzdFBvaW50KGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpO1xuICAgIC8vIFJldHVybiBhemltdXRoLCBlbGV2YXRpb24gYW5kIGRpc3RhbmNlIG9mIG5lYXJlc3QgcG9zaXRpb24gZm9yIHRoZSBpbnB1dCB2YWx1ZXNcbiAgICByZXR1cm4ge1xuICAgICAgYXppbXV0aDogbmVhcmVzdC5hemltdXRoLFxuICAgICAgZWxldmF0aW9uOiBuZWFyZXN0LmVsZXZhdGlvbixcbiAgICAgIGRpc3RhbmNlOiBuZWFyZXN0LmRpc3RhbmNlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbmVhcmVzdCBwb3NpdGlvbiBmb3IgYW4gaW5wdXQgcG9zaXRpb24uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSBhemltdXRoIEF6aW11dGggaW4gZGVncmVlcyAowrApOiBmcm9tIDAgdG8gLTE4MCBmb3Igc291cmNlIG9uIHlvdXIgbGVmdCwgYW5kIGZyb20gMCB0byAxODAgZm9yIHNvdXJjZSBvbiB5b3VyIHJpZ2h0XG4gICAqIEBwYXJhbSBlbGV2YXRpb24gRWxldmF0aW9uIGluIGRlZ3JlZXMgKMKwKTogZnJvbSAwIHRvIDkwIGZvciBzb3VyY2UgYWJvdmUgeW91ciBoZWFkLCAwIGZvciBzb3VyY2UgaW4gZnJvbnQgb2YgeW91ciBoZWFkLCBhbmQgZnJvbSAwIHRvIC05MCBmb3Igc291cmNlIGJlbG93IHlvdXIgaGVhZClcbiAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGluIG1ldGVyc1xuICAgKi9cbiAgZ2V0TmVhcmVzdFBvaW50KGF6aW11dGgsIGVsZXZhdGlvbiwgZGlzdGFuY2UpIHtcbiAgICAvLyBEZWdyZWVzIHRvIHJhZGlhbnMgZm9yIHRoZSBhemltdXRoIGFuZCBlbGV2YXRpb25cbiAgICB2YXIgYXppbXV0aFJhZGlhbnMgPSBhemltdXRoICogTWF0aC5QSSAvIDE4MDtcbiAgICB2YXIgZWxldmF0aW9uUmFkaWFucyA9IGVsZXZhdGlvbiAqIE1hdGguUEkgLyAxODA7XG4gICAgLy8gQ29udmVydCBzcGhlcmljYWwgY29vcmRpbmF0ZXMgdG8gY2FydGVzaWFuXG4gICAgdmFyIGNhcnRlc2lhbkNvb3JkID0gdGhpcy5zcGhlcmljYWxUb0NhcnRlc2lhbihhemltdXRoUmFkaWFucywgZWxldmF0aW9uUmFkaWFucywgZGlzdGFuY2UpO1xuICAgIC8vIEdldCB0aGUgbmVhcmVzdCBIUlRGIGZpbGUgZm9yIHRoZSBkZXNpcmVkIHBvc2l0aW9uXG4gICAgdmFyIG5lYXJlc3QgPSB0aGlzLnRyZWUubmVhcmVzdChjYXJ0ZXNpYW5Db29yZCwgMSlbMF07XG5cbiAgICByZXR1cm4gbmVhcmVzdFswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnkgdG8gc2V0IHRoZSBuZXh0UG9zaXRpb24gcG9zaXRpb24gaWYgdGhlIHJhbXBzIGFyZSBub3QgaW4gYSBjcm9zc2ZhZGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0TGFzdFBvc2l0aW9uKCkge1xuICAgIGlmICghdGhpcy5pc0Nyb3NzZmFkaW5nKCkpIHtcbiAgICAgIHRoaXMucmVhbGx5U3RhcnRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG5cbn07XG5cbi8qKlxuICogQ29udm9sdmVyIHN1YiBhdWRpbyBncmFwaCBjbGFzc1xuICovXG5cbmNsYXNzIENvbnZvbHZlckF1ZGlvR3JhcGgge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG9wdGlvbnMuYXVkaW9Db250ZXh0O1xuICAgIHRoaXMuZ2Fpbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5jb252Tm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUNvbnZvbHZlcigpO1xuICAgIHRoaXMuY29udk5vZGUubm9ybWFsaXplID0gZmFsc2U7XG4gICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udk5vZGUpO1xuXG4gICAgLy8gSGFjayB0byBmb3JjZSBhdWRpb1BhcmFtIGFjdGl2ZSB3aGVuIHRoZSBzb3VyY2UgaXMgbm90IGFjdGl2ZVxuICAgIHRoaXMub3NjaWxsYXRvck5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgdGhpcy5nYWluT3NjaWxsYXRvck5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5vc2NpbGxhdG9yTm9kZS5jb25uZWN0KHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlKTtcbiAgICB0aGlzLmdhaW5Pc2NpbGxhdG9yTm9kZS5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xuICAgIHRoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlLmdhaW4udmFsdWUgPSAwO1xuICAgIHRoaXMub3NjaWxsYXRvck5vZGUuc3RhcnQoMCk7XG4gIH1cblxuICBnZXQgaW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2Fpbk5vZGU7XG4gIH1cblxuICBnZXQgZ2FpbigpIHtcbiAgICByZXR1cm4gdGhpcy5nYWluTm9kZS5nYWluO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgYnVmZmVyIGluIHRoZSBjb252b2x2ZXJOb2RlXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHZhbHVlIEF1ZGlvQnVmZmVyIE9iamVjdC5cbiAgICovXG4gIHNldCBidWZmZXIodmFsdWUpIHtcbiAgICB0aGlzLmNvbnZOb2RlLmJ1ZmZlciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3QgdGhlIENvbnZvbHZlckF1ZGlvR3JhcGggdG8gYSBub2RlXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gbm9kZSBEZXN0aW5hdGlvbiBub2RlXG4gICAqL1xuICBjb25uZWN0KG5vZGUpIHtcbiAgICB0aGlzLmNvbnZOb2RlLmNvbm5lY3Qobm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgQ29udm9sdmVyQXVkaW9HcmFwaCB0byBhIG5vZGVcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSBub2RlIERlc3RpbmF0aW9uIG5vZGVcbiAgICovXG4gIGRpc2Nvbm5lY3Qobm9kZSkge1xuICAgIHRoaXMuY29udk5vZGUuZGlzY29ubmVjdChub2RlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59O1xuXG4vLyBDb21tb25KUyBmdW5jdGlvbiBleHBvcnRcbm1vZHVsZS5leHBvcnRzID0gQmluYXVyYWxGSVI7XG4iLCIvKipcbiAqIEFVVEhPUiBPRiBJTklUSUFMIEpTIExJQlJBUllcbiAqIGstZCBUcmVlIEphdmFTY3JpcHQgLSBWIDEuMFxuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS91YmlsYWJzL2tkLXRyZWUtamF2YXNjcmlwdFxuICpcbiAqIEBhdXRob3IgTWlyY2VhIFByaWNvcCA8cHJpY29wQHViaWxhYnMubmV0PiwgMjAxMlxuICogQGF1dGhvciBNYXJ0aW4gS2xlcHBlIDxrbGVwcGVAdWJpbGFicy5uZXQ+LCAyMDEyXG4gKiBAYXV0aG9yIFViaWxhYnMgaHR0cDovL3ViaWxhYnMubmV0LCAyMDEyXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZSA8aHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHA+XG4gKi9cblxuXG5mdW5jdGlvbiBOb2RlKG9iaiwgZGltZW5zaW9uLCBwYXJlbnQpIHtcbiAgdGhpcy5vYmogPSBvYmo7XG4gIHRoaXMubGVmdCA9IG51bGw7XG4gIHRoaXMucmlnaHQgPSBudWxsO1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5kaW1lbnNpb24gPSBkaW1lbnNpb247XG59XG5cbmZ1bmN0aW9uIEtkVHJlZShwb2ludHMsIG1ldHJpYywgZGltZW5zaW9ucykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgXG4gIGZ1bmN0aW9uIGJ1aWxkVHJlZShwb2ludHMsIGRlcHRoLCBwYXJlbnQpIHtcbiAgICB2YXIgZGltID0gZGVwdGggJSBkaW1lbnNpb25zLmxlbmd0aCxcbiAgICAgIG1lZGlhbixcbiAgICAgIG5vZGU7XG5cbiAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IE5vZGUocG9pbnRzWzBdLCBkaW0sIHBhcmVudCk7XG4gICAgfVxuXG4gICAgcG9pbnRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBhW2RpbWVuc2lvbnNbZGltXV0gLSBiW2RpbWVuc2lvbnNbZGltXV07XG4gICAgfSk7XG5cbiAgICBtZWRpYW4gPSBNYXRoLmZsb29yKHBvaW50cy5sZW5ndGggLyAyKTtcbiAgICBub2RlID0gbmV3IE5vZGUocG9pbnRzW21lZGlhbl0sIGRpbSwgcGFyZW50KTtcbiAgICBub2RlLmxlZnQgPSBidWlsZFRyZWUocG9pbnRzLnNsaWNlKDAsIG1lZGlhbiksIGRlcHRoICsgMSwgbm9kZSk7XG4gICAgbm9kZS5yaWdodCA9IGJ1aWxkVHJlZShwb2ludHMuc2xpY2UobWVkaWFuICsgMSksIGRlcHRoICsgMSwgbm9kZSk7XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHRoaXMucm9vdCA9IGJ1aWxkVHJlZShwb2ludHMsIDAsIG51bGwpO1xuXG4gIHRoaXMuaW5zZXJ0ID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgZnVuY3Rpb24gaW5uZXJTZWFyY2gobm9kZSwgcGFyZW50KSB7XG5cbiAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBkaW1lbnNpb24gPSBkaW1lbnNpb25zW25vZGUuZGltZW5zaW9uXTtcbiAgICAgIGlmIChwb2ludFtkaW1lbnNpb25dIDwgbm9kZS5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgICByZXR1cm4gaW5uZXJTZWFyY2gobm9kZS5sZWZ0LCBub2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbm5lclNlYXJjaChub2RlLnJpZ2h0LCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaW5zZXJ0UG9zaXRpb24gPSBpbm5lclNlYXJjaCh0aGlzLnJvb3QsIG51bGwpLFxuICAgICAgbmV3Tm9kZSxcbiAgICAgIGRpbWVuc2lvbjtcblxuICAgIGlmIChpbnNlcnRQb3NpdGlvbiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5yb290ID0gbmV3IE5vZGUocG9pbnQsIDAsIG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5ld05vZGUgPSBuZXcgTm9kZShwb2ludCwgKGluc2VydFBvc2l0aW9uLmRpbWVuc2lvbiArIDEpICUgZGltZW5zaW9ucy5sZW5ndGgsIGluc2VydFBvc2l0aW9uKTtcbiAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW2luc2VydFBvc2l0aW9uLmRpbWVuc2lvbl07XG5cbiAgICBpZiAocG9pbnRbZGltZW5zaW9uXSA8IGluc2VydFBvc2l0aW9uLm9ialtkaW1lbnNpb25dKSB7XG4gICAgICBpbnNlcnRQb3NpdGlvbi5sZWZ0ID0gbmV3Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zZXJ0UG9zaXRpb24ucmlnaHQgPSBuZXdOb2RlO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uIChwb2ludCkge1xuICAgIHZhciBub2RlO1xuXG4gICAgZnVuY3Rpb24gbm9kZVNlYXJjaChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUub2JqID09PSBwb2ludCkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbbm9kZS5kaW1lbnNpb25dO1xuXG4gICAgICBpZiAocG9pbnRbZGltZW5zaW9uXSA8IG5vZGUub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgICAgcmV0dXJuIG5vZGVTZWFyY2gobm9kZS5sZWZ0LCBub2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBub2RlU2VhcmNoKG5vZGUucmlnaHQsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgdmFyIG5leHROb2RlLFxuICAgICAgICBuZXh0T2JqLFxuICAgICAgICBwRGltZW5zaW9uO1xuXG4gICAgICBmdW5jdGlvbiBmaW5kTWF4KG5vZGUsIGRpbSkge1xuICAgICAgICB2YXIgZGltZW5zaW9uLFxuICAgICAgICAgIG93bixcbiAgICAgICAgICBsZWZ0LFxuICAgICAgICAgIHJpZ2h0LFxuICAgICAgICAgIG1heDtcblxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZGltZW5zaW9uID0gZGltZW5zaW9uc1tkaW1dO1xuICAgICAgICBpZiAobm9kZS5kaW1lbnNpb24gPT09IGRpbSkge1xuICAgICAgICAgIGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZE1heChub2RlLnJpZ2h0LCBkaW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG93biA9IG5vZGUub2JqW2RpbWVuc2lvbl07XG4gICAgICAgIGxlZnQgPSBmaW5kTWF4KG5vZGUubGVmdCwgZGltKTtcbiAgICAgICAgcmlnaHQgPSBmaW5kTWF4KG5vZGUucmlnaHQsIGRpbSk7XG4gICAgICAgIG1heCA9IG5vZGU7XG5cbiAgICAgICAgaWYgKGxlZnQgIT09IG51bGwgJiYgbGVmdC5vYmpbZGltZW5zaW9uXSA+IG93bikge1xuICAgICAgICAgIG1heCA9IGxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmlnaHQgIT09IG51bGwgJiYgcmlnaHQub2JqW2RpbWVuc2lvbl0gPiBtYXgub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgICAgICBtYXggPSByaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBmaW5kTWluKG5vZGUsIGRpbSkge1xuICAgICAgICB2YXIgZGltZW5zaW9uLFxuICAgICAgICAgIG93bixcbiAgICAgICAgICBsZWZ0LFxuICAgICAgICAgIHJpZ2h0LFxuICAgICAgICAgIG1pbjtcblxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZGltZW5zaW9uID0gZGltZW5zaW9uc1tkaW1dO1xuXG4gICAgICAgIGlmIChub2RlLmRpbWVuc2lvbiA9PT0gZGltKSB7XG4gICAgICAgICAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmRNaW4obm9kZS5sZWZ0LCBkaW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG93biA9IG5vZGUub2JqW2RpbWVuc2lvbl07XG4gICAgICAgIGxlZnQgPSBmaW5kTWluKG5vZGUubGVmdCwgZGltKTtcbiAgICAgICAgcmlnaHQgPSBmaW5kTWluKG5vZGUucmlnaHQsIGRpbSk7XG4gICAgICAgIG1pbiA9IG5vZGU7XG5cbiAgICAgICAgaWYgKGxlZnQgIT09IG51bGwgJiYgbGVmdC5vYmpbZGltZW5zaW9uXSA8IG93bikge1xuICAgICAgICAgIG1pbiA9IGxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJpZ2h0ICE9PSBudWxsICYmIHJpZ2h0Lm9ialtkaW1lbnNpb25dIDwgbWluLm9ialtkaW1lbnNpb25dKSB7XG4gICAgICAgICAgbWluID0gcmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUubGVmdCA9PT0gbnVsbCAmJiBub2RlLnJpZ2h0ID09PSBudWxsKSB7XG4gICAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgIHNlbGYucm9vdCA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcERpbWVuc2lvbiA9IGRpbWVuc2lvbnNbbm9kZS5wYXJlbnQuZGltZW5zaW9uXTtcblxuICAgICAgICBpZiAobm9kZS5vYmpbcERpbWVuc2lvbl0gPCBub2RlLnBhcmVudC5vYmpbcERpbWVuc2lvbl0pIHtcbiAgICAgICAgICBub2RlLnBhcmVudC5sZWZ0ID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlLnBhcmVudC5yaWdodCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgIG5leHROb2RlID0gZmluZE1heChub2RlLmxlZnQsIG5vZGUuZGltZW5zaW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHROb2RlID0gZmluZE1pbihub2RlLnJpZ2h0LCBub2RlLmRpbWVuc2lvbik7XG4gICAgICB9XG5cbiAgICAgIG5leHRPYmogPSBuZXh0Tm9kZS5vYmo7XG4gICAgICByZW1vdmVOb2RlKG5leHROb2RlKTtcbiAgICAgIG5vZGUub2JqID0gbmV4dE9iajtcblxuICAgIH1cblxuICAgIG5vZGUgPSBub2RlU2VhcmNoKHNlbGYucm9vdCk7XG5cbiAgICBpZiAobm9kZSA9PT0gbnVsbCkgeyByZXR1cm47IH1cblxuICAgIHJlbW92ZU5vZGUobm9kZSk7XG4gIH07XG5cbiAgdGhpcy5uZWFyZXN0ID0gZnVuY3Rpb24gKHBvaW50LCBtYXhOb2RlcywgbWF4RGlzdGFuY2UpIHtcbiAgICB2YXIgaSxcbiAgICAgIHJlc3VsdCxcbiAgICAgIGJlc3ROb2RlcztcblxuICAgIGJlc3ROb2RlcyA9IG5ldyBCaW5hcnlIZWFwKFxuICAgICAgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIC1lWzFdOyB9XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIG5lYXJlc3RTZWFyY2gobm9kZSkge1xuICAgICAgdmFyIGJlc3RDaGlsZCxcbiAgICAgICAgZGltZW5zaW9uID0gZGltZW5zaW9uc1tub2RlLmRpbWVuc2lvbl0sXG4gICAgICAgIG93bkRpc3RhbmNlID0gbWV0cmljKHBvaW50LCBub2RlLm9iaiksXG4gICAgICAgIGxpbmVhclBvaW50ID0ge30sXG4gICAgICAgIGxpbmVhckRpc3RhbmNlLFxuICAgICAgICBvdGhlckNoaWxkLFxuICAgICAgICBpO1xuXG4gICAgICBmdW5jdGlvbiBzYXZlTm9kZShub2RlLCBkaXN0YW5jZSkge1xuICAgICAgICBiZXN0Tm9kZXMucHVzaChbbm9kZSwgZGlzdGFuY2VdKTtcbiAgICAgICAgaWYgKGJlc3ROb2Rlcy5zaXplKCkgPiBtYXhOb2Rlcykge1xuICAgICAgICAgIGJlc3ROb2Rlcy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZGltZW5zaW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoaSA9PT0gbm9kZS5kaW1lbnNpb24pIHtcbiAgICAgICAgICBsaW5lYXJQb2ludFtkaW1lbnNpb25zW2ldXSA9IHBvaW50W2RpbWVuc2lvbnNbaV1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpbmVhclBvaW50W2RpbWVuc2lvbnNbaV1dID0gbm9kZS5vYmpbZGltZW5zaW9uc1tpXV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGluZWFyRGlzdGFuY2UgPSBtZXRyaWMobGluZWFyUG9pbnQsIG5vZGUub2JqKTtcblxuICAgICAgaWYgKG5vZGUucmlnaHQgPT09IG51bGwgJiYgbm9kZS5sZWZ0ID09PSBudWxsKSB7XG4gICAgICAgIGlmIChiZXN0Tm9kZXMuc2l6ZSgpIDwgbWF4Tm9kZXMgfHwgb3duRGlzdGFuY2UgPCBiZXN0Tm9kZXMucGVlaygpWzFdKSB7XG4gICAgICAgICAgc2F2ZU5vZGUobm9kZSwgb3duRGlzdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUucmlnaHQgPT09IG51bGwpIHtcbiAgICAgICAgYmVzdENoaWxkID0gbm9kZS5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChub2RlLmxlZnQgPT09IG51bGwpIHtcbiAgICAgICAgYmVzdENoaWxkID0gbm9kZS5yaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwb2ludFtkaW1lbnNpb25dIDwgbm9kZS5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgICAgIGJlc3RDaGlsZCA9IG5vZGUubGVmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiZXN0Q2hpbGQgPSBub2RlLnJpZ2h0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5lYXJlc3RTZWFyY2goYmVzdENoaWxkKTtcblxuICAgICAgaWYgKGJlc3ROb2Rlcy5zaXplKCkgPCBtYXhOb2RlcyB8fCBvd25EaXN0YW5jZSA8IGJlc3ROb2Rlcy5wZWVrKClbMV0pIHtcbiAgICAgICAgc2F2ZU5vZGUobm9kZSwgb3duRGlzdGFuY2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYmVzdE5vZGVzLnNpemUoKSA8IG1heE5vZGVzIHx8IE1hdGguYWJzKGxpbmVhckRpc3RhbmNlKSA8IGJlc3ROb2Rlcy5wZWVrKClbMV0pIHtcbiAgICAgICAgaWYgKGJlc3RDaGlsZCA9PT0gbm9kZS5sZWZ0KSB7XG4gICAgICAgICAgb3RoZXJDaGlsZCA9IG5vZGUucmlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3RoZXJDaGlsZCA9IG5vZGUubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXJDaGlsZCAhPT0gbnVsbCkge1xuICAgICAgICAgIG5lYXJlc3RTZWFyY2gob3RoZXJDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWF4RGlzdGFuY2UpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBtYXhOb2RlczsgaSArPSAxKSB7XG4gICAgICAgIGJlc3ROb2Rlcy5wdXNoKFtudWxsLCBtYXhEaXN0YW5jZV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5lYXJlc3RTZWFyY2goc2VsZi5yb290KTtcblxuICAgIHJlc3VsdCA9IFtdO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG1heE5vZGVzOyBpICs9IDEpIHtcbiAgICAgIGlmIChiZXN0Tm9kZXMuY29udGVudFtpXVswXSkge1xuICAgICAgICByZXN1bHQucHVzaChbYmVzdE5vZGVzLmNvbnRlbnRbaV1bMF0ub2JqLCBiZXN0Tm9kZXMuY29udGVudFtpXVsxXV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHRoaXMuYmFsYW5jZUZhY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBoZWlnaHQobm9kZSkge1xuICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWF0aC5tYXgoaGVpZ2h0KG5vZGUubGVmdCksIGhlaWdodChub2RlLnJpZ2h0KSkgKyAxO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvdW50KG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvdW50KG5vZGUubGVmdCkgKyBjb3VudChub2RlLnJpZ2h0KSArIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhlaWdodChzZWxmLnJvb3QpIC8gKE1hdGgubG9nKGNvdW50KHNlbGYucm9vdCkpIC8gTWF0aC5sb2coMikpO1xuICB9O1xufVxuXG4vLyBCaW5hcnkgaGVhcCBpbXBsZW1lbnRhdGlvbiBmcm9tOlxuLy8gaHR0cDovL2Vsb3F1ZW50amF2YXNjcmlwdC5uZXQvYXBwZW5kaXgyLmh0bWxcblxuZnVuY3Rpb24gQmluYXJ5SGVhcChzY29yZUZ1bmN0aW9uKXtcbiAgdGhpcy5jb250ZW50ID0gW107XG4gIHRoaXMuc2NvcmVGdW5jdGlvbiA9IHNjb3JlRnVuY3Rpb247XG59XG5cbkJpbmFyeUhlYXAucHJvdG90eXBlID0ge1xuICBwdXNoOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgLy8gQWRkIHRoZSBuZXcgZWxlbWVudCB0byB0aGUgZW5kIG9mIHRoZSBhcnJheS5cbiAgICB0aGlzLmNvbnRlbnQucHVzaChlbGVtZW50KTtcbiAgICAvLyBBbGxvdyBpdCB0byBidWJibGUgdXAuXG4gICAgdGhpcy5idWJibGVVcCh0aGlzLmNvbnRlbnQubGVuZ3RoIC0gMSk7XG4gIH0sXG5cbiAgcG9wOiBmdW5jdGlvbigpIHtcbiAgICAvLyBTdG9yZSB0aGUgZmlyc3QgZWxlbWVudCBzbyB3ZSBjYW4gcmV0dXJuIGl0IGxhdGVyLlxuICAgIHZhciByZXN1bHQgPSB0aGlzLmNvbnRlbnRbMF07XG4gICAgLy8gR2V0IHRoZSBlbGVtZW50IGF0IHRoZSBlbmQgb2YgdGhlIGFycmF5LlxuICAgIHZhciBlbmQgPSB0aGlzLmNvbnRlbnQucG9wKCk7XG4gICAgLy8gSWYgdGhlcmUgYXJlIGFueSBlbGVtZW50cyBsZWZ0LCBwdXQgdGhlIGVuZCBlbGVtZW50IGF0IHRoZVxuICAgIC8vIHN0YXJ0LCBhbmQgbGV0IGl0IHNpbmsgZG93bi5cbiAgICBpZiAodGhpcy5jb250ZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuY29udGVudFswXSA9IGVuZDtcbiAgICAgIHRoaXMuc2lua0Rvd24oMCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgcGVlazogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFswXTtcbiAgfSxcblxuICByZW1vdmU6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgbGVuID0gdGhpcy5jb250ZW50Lmxlbmd0aDtcbiAgICAvLyBUbyByZW1vdmUgYSB2YWx1ZSwgd2UgbXVzdCBzZWFyY2ggdGhyb3VnaCB0aGUgYXJyYXkgdG8gZmluZFxuICAgIC8vIGl0LlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmNvbnRlbnRbaV0gPT0gbm9kZSkge1xuICAgICAgICAvLyBXaGVuIGl0IGlzIGZvdW5kLCB0aGUgcHJvY2VzcyBzZWVuIGluICdwb3AnIGlzIHJlcGVhdGVkXG4gICAgICAgIC8vIHRvIGZpbGwgdXAgdGhlIGhvbGUuXG4gICAgICAgIHZhciBlbmQgPSB0aGlzLmNvbnRlbnQucG9wKCk7XG4gICAgICAgIGlmIChpICE9IGxlbiAtIDEpIHtcbiAgICAgICAgICB0aGlzLmNvbnRlbnRbaV0gPSBlbmQ7XG4gICAgICAgICAgaWYgKHRoaXMuc2NvcmVGdW5jdGlvbihlbmQpIDwgdGhpcy5zY29yZUZ1bmN0aW9uKG5vZGUpKVxuICAgICAgICAgICAgdGhpcy5idWJibGVVcChpKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnNpbmtEb3duKGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm9kZSBub3QgZm91bmQuXCIpO1xuICB9LFxuXG4gIHNpemU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQubGVuZ3RoO1xuICB9LFxuXG4gIGJ1YmJsZVVwOiBmdW5jdGlvbihuKSB7XG4gICAgLy8gRmV0Y2ggdGhlIGVsZW1lbnQgdGhhdCBoYXMgdG8gYmUgbW92ZWQuXG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLmNvbnRlbnRbbl07XG4gICAgLy8gV2hlbiBhdCAwLCBhbiBlbGVtZW50IGNhbiBub3QgZ28gdXAgYW55IGZ1cnRoZXIuXG4gICAgd2hpbGUgKG4gPiAwKSB7XG4gICAgICAvLyBDb21wdXRlIHRoZSBwYXJlbnQgZWxlbWVudCdzIGluZGV4LCBhbmQgZmV0Y2ggaXQuXG4gICAgICB2YXIgcGFyZW50TiA9IE1hdGguZmxvb3IoKG4gKyAxKSAvIDIpIC0gMSxcbiAgICAgICAgICBwYXJlbnQgPSB0aGlzLmNvbnRlbnRbcGFyZW50Tl07XG4gICAgICAvLyBTd2FwIHRoZSBlbGVtZW50cyBpZiB0aGUgcGFyZW50IGlzIGdyZWF0ZXIuXG4gICAgICBpZiAodGhpcy5zY29yZUZ1bmN0aW9uKGVsZW1lbnQpIDwgdGhpcy5zY29yZUZ1bmN0aW9uKHBhcmVudCkpIHtcbiAgICAgICAgdGhpcy5jb250ZW50W3BhcmVudE5dID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5jb250ZW50W25dID0gcGFyZW50O1xuICAgICAgICAvLyBVcGRhdGUgJ24nIHRvIGNvbnRpbnVlIGF0IHRoZSBuZXcgcG9zaXRpb24uXG4gICAgICAgIG4gPSBwYXJlbnROO1xuICAgICAgfVxuICAgICAgLy8gRm91bmQgYSBwYXJlbnQgdGhhdCBpcyBsZXNzLCBubyBuZWVkIHRvIG1vdmUgaXQgZnVydGhlci5cbiAgICAgIGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2lua0Rvd246IGZ1bmN0aW9uKG4pIHtcbiAgICAvLyBMb29rIHVwIHRoZSB0YXJnZXQgZWxlbWVudCBhbmQgaXRzIHNjb3JlLlxuICAgIHZhciBsZW5ndGggPSB0aGlzLmNvbnRlbnQubGVuZ3RoLFxuICAgICAgICBlbGVtZW50ID0gdGhpcy5jb250ZW50W25dLFxuICAgICAgICBlbGVtU2NvcmUgPSB0aGlzLnNjb3JlRnVuY3Rpb24oZWxlbWVudCk7XG5cbiAgICB3aGlsZSh0cnVlKSB7XG4gICAgICAvLyBDb21wdXRlIHRoZSBpbmRpY2VzIG9mIHRoZSBjaGlsZCBlbGVtZW50cy5cbiAgICAgIHZhciBjaGlsZDJOID0gKG4gKyAxKSAqIDIsIGNoaWxkMU4gPSBjaGlsZDJOIC0gMTtcbiAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBzdG9yZSB0aGUgbmV3IHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50LFxuICAgICAgLy8gaWYgYW55LlxuICAgICAgdmFyIHN3YXAgPSBudWxsO1xuICAgICAgLy8gSWYgdGhlIGZpcnN0IGNoaWxkIGV4aXN0cyAoaXMgaW5zaWRlIHRoZSBhcnJheSkuLi5cbiAgICAgIGlmIChjaGlsZDFOIDwgbGVuZ3RoKSB7XG4gICAgICAgIC8vIExvb2sgaXQgdXAgYW5kIGNvbXB1dGUgaXRzIHNjb3JlLlxuICAgICAgICB2YXIgY2hpbGQxID0gdGhpcy5jb250ZW50W2NoaWxkMU5dLFxuICAgICAgICAgICAgY2hpbGQxU2NvcmUgPSB0aGlzLnNjb3JlRnVuY3Rpb24oY2hpbGQxKTtcbiAgICAgICAgLy8gSWYgdGhlIHNjb3JlIGlzIGxlc3MgdGhhbiBvdXIgZWxlbWVudCdzLCB3ZSBuZWVkIHRvIHN3YXAuXG4gICAgICAgIGlmIChjaGlsZDFTY29yZSA8IGVsZW1TY29yZSlcbiAgICAgICAgICBzd2FwID0gY2hpbGQxTjtcbiAgICAgIH1cbiAgICAgIC8vIERvIHRoZSBzYW1lIGNoZWNrcyBmb3IgdGhlIG90aGVyIGNoaWxkLlxuICAgICAgaWYgKGNoaWxkMk4gPCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIGNoaWxkMiA9IHRoaXMuY29udGVudFtjaGlsZDJOXSxcbiAgICAgICAgICAgIGNoaWxkMlNjb3JlID0gdGhpcy5zY29yZUZ1bmN0aW9uKGNoaWxkMik7XG4gICAgICAgIGlmIChjaGlsZDJTY29yZSA8IChzd2FwID09IG51bGwgPyBlbGVtU2NvcmUgOiBjaGlsZDFTY29yZSkpe1xuICAgICAgICAgIHN3YXAgPSBjaGlsZDJOO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBlbGVtZW50IG5lZWRzIHRvIGJlIG1vdmVkLCBzd2FwIGl0LCBhbmQgY29udGludWUuXG4gICAgICBpZiAoc3dhcCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29udGVudFtuXSA9IHRoaXMuY29udGVudFtzd2FwXTtcbiAgICAgICAgdGhpcy5jb250ZW50W3N3YXBdID0gZWxlbWVudDtcbiAgICAgICAgbiA9IHN3YXA7XG4gICAgICB9XG4gICAgICAvLyBPdGhlcndpc2UsIHdlIGFyZSBkb25lLlxuICAgICAgZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZUtkVHJlZTogZnVuY3Rpb24gKHBvaW50cywgbWV0cmljLCBkaW1lbnNpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBLZFRyZWUocG9pbnRzLCBtZXRyaWMsIGRpbWVuc2lvbnMpXG4gIH1cbn1cbiJdfQ==
