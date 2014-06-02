!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.createPlayer=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @fileOverview
 * WAVE audio library module for buffer playing.
 * Caution: speed changes may harm state handling.
 * @author Karim Barkati
 * @version 0.2.2
 */

var events = _dereq_('events');

/**
 * Function invocation pattern for a simple player.
 * @public
 */
var createPlayer = function createPlayer(optionalAudioBuffer) {
  'use strict';

  // Ensure global availability of an "audioContext" instance of web audio AudioContext.
  window.audioContext = window.audioContext || new AudioContext() || new webkitAudioContext();

  var eventEmitter = new events.EventEmitter();

  /**
   * Simple player object as an ECMAScript5 properties object.
   */

  var playerObject = {

    // Private properties
    source: {
      writable: true
    },
    buffer: {
      writable: true
    },
    gainNode: {
      writable: true
    },
    outputNode: {
      writable: true
    },
    speed: {
      writable: true,
      value: 1
    },
    gain: {
      writable: true
    },
    loop: {
      writable: true,
      value: false
    },

    // For resuming after pause
    startPosition: {
      writable: true,
      value: 0
    },
    startedAtTime: {
      writable: true,
      value: 0
    },

    // Player status
    IS_PLAYING: {
      value: "is_playing"
    },
    IS_PAUSED: {
      value: "is_paused"
    },
    IS_STOPPED: {
      value: "is_stopped"
    },
    status: {
      writable: true
    },

    /**
     * Mandatory initialization method.
     * @public
     * @chainable
     */
    init: {
      enumerable: true,
      value: function(optionalAudioBuffer) {

        this.status = this.IS_STOPPED;

        if (optionalAudioBuffer) {
          this.setBuffer(optionalAudioBuffer);
        }

        // Create web audio nodes, relying on the given audio context.
        this.gainNode = audioContext.createGain();
        this.outputNode = audioContext.createGain(); // dummy node to provide a web audio-like output node

        // this.on('ended', function() {
        //   console.log("Audio playing ended.");
        // });
        return this; // for chainability
      }
    },

    /**
     * Web audio API-like connect method.
     * @public
     * @chainable
     */
    connect: {
      enumerable: true,
      value: function(target) {
        this.outputNode = target;
        this.gainNode.connect(this.outputNode || audioContext.destination);
        return this; // for chainability
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
        this.gainNode.disconnect(output);
        return this; // for chainability
      }
    },

    /**
     * Set buffer and bufferDuration.
     * @public
     * @chainable
     */
    setBuffer: {
      enumerable: true,
      value: function(buffer) {
        if (buffer) {
          this.buffer = buffer;
          this.bufferDuration = buffer.duration;
          return this; // for chainability
        } else {
          throw "Buffer setting error";
        }
      }
    },

    /**
     * Set gain value and squared volume.
     * @public
     * @chainable
     */
    setGain: {
      enumerable: true,
      value: function(gain) {
        if (gain) {
          this.gain = gain;
          // Let's use an x-squared curve since simple linear (x) does not sound as good.
          this.gainNode.gain.value = gain * gain;
          return this; // for chainability
        } else {
          throw "Gain setting error";
        }
      }
    },

    /**
     * Set playback speed.
     * @public
     * @chainable
     */
    setSpeed: {
      enumerable: true,
      value: function(val) {
        if (val) {
          this.speed = val;
          if (this.source)
            this.source.playbackRate.value = this.speed;
          return this; // for chainability
        } else {
          throw "Speed setting error";
        }
      }
    },

    /**
     * Enable or disable looping playback.
     * @public
     * @chainable
     */
    enableLoop: {
      enumerable: true,
      value: function(bool) {
        this.loop = bool;
        if (this.status !== this.IS_STOPPED) {
          this.source.loop = this.loop;
        }
        return this; // for chainability
      }
    },

    /**
     * Start playing.
     * @public
     */
    start: {
      enumerable: true,
      value: function() {
        // Lock playing to avoid multiple sources creation.
        if (this.status !== this.IS_PLAYING) {
          // Configure a BufferSource.
          this.startedAtTime = audioContext.currentTime;
          this.source = audioContext.createBufferSource();
          this.source.buffer = this.buffer;
          this.source.playbackRate.value = this.speed;
          this.source.loop = this.loop;
          this.source.connect(this.gainNode);

          // Resume but make sure we stay in bound of the buffer.
          var offset = this.startPosition % this.buffer.duration;
          this.source.start(0, offset); // optional 3rd argument as duration
          this.status = this.IS_PLAYING;

          this.setOnendedCallback();

          return offset;
        } else {
          console.log("Already playing.");
        }
      }
    },

    /**
     * Stop playing.
     * @public
     */
    stop: {
      enumerable: true,
      value: function() {
        if (this.status === this.IS_PLAYING) {
          this.source.stop(0);
        }
        if (this.status !== this.IS_STOPPED) {
          this.status = this.IS_STOPPED;
          this.startPosition = 0;
          return this.startPosition;
        } else {
          console.log("Already stopped.");
        }
      }
    },

    /**
     * Pause playing.
     * @public
     */
    pause: {
      enumerable: true,
      value: function() {
        if (this.status === this.IS_PLAYING) {
          this.status = this.IS_PAUSED;
          this.source.stop(0);
          // Measure how much time passed since the last pause.
          this.startPosition = this.startPosition + this.getElapsedDuration();

          return this.startPosition;
        } else {
          console.log("Not playing.");
        }
      }
    },

    /**
     * Seek buffer position (in sec).
     * @public
     */
    seek: {
      enumerable: true,
      value: function(pos) {
        if (this.status === this.IS_PLAYING) {
          this.stop();
          this.startPosition = pos % this.bufferDuration;
          this.start();
        } else {
          this.startPosition = pos % this.bufferDuration;
        }
        return this.startPosition;
      }
    },

    /**
     * Get player status.
     * @public
     */
    getStatus: {
      enumerable: true,
      value: function() {
        return this.status;
      }
    },

    /**
     * Event listener.
     * @public
     */
    on: {
      enumerable: true,
      value: eventEmitter.on
    },

    /**
     * Event emitter.
     * @private
     */
    emit: {
      enumerable: false,
      value: eventEmitter.emit
    },

    /**
     * Compute elapsed duration since previous position change.
     * @private
     * @todo Handle speed changes.
     */
    getElapsedDuration: {
      enumerable: false,
      value: function() {
        return audioContext.currentTime - this.startedAtTime;
      }
    },

    /**
     * Release playing flag when the end of the buffer is reached.
     * @private
     * @todo Handle speed changes.
     */
    setOnendedCallback: {
      enumerable: false,
      value: function() {
        var that = this;

        // Release source playing flag when the end of the buffer is reached.
        // Issue: the event comes late and is emitted on every source.stop(),
        // so it is necessary to check elapsed duration,
        // but speed changes can mess it up...
        this.source.onended = function() {
          console.log("Elapsed duration on \'ended\' event:",
            that.getElapsedDuration() + that.startPosition,
            "sec");
          if ((that.status !== that.IS_PAUSED) && (that.getElapsedDuration() + that.startPosition > that.bufferDuration)) {
            if (!that.loop) {
              that.status = that.IS_STOPPED;
              that.startPosition = 0;
            }
            that.emit("ended", that.startPosition);
          }
        };
      }
    },

  };

  // Instantiate an object.
  var player = Object.create({}, playerObject);
  return player.init(optionalAudioBuffer);
};


// CommonJS function export
module.exports = createPlayer;
},{"events":2}],2:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      console.trace();
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[1])
(1)
});