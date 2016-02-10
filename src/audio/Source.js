/**
 * @fileOverview Source for binaural processing.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

/**
 * Single source.
 *
 * See {@link BinauralPanner}.
 */
export class Source {

  /**
   * Construct a source, with and AudioContext and an HrtfSet.
   *
   * See {@link HrtfSet}.
   *
   * @param {Object} options
   * @param {AudioContext} options.audioContext mandatory for the creation
   * of FIR audio buffers
   * @param {HrtfSet} hrtfSet {@link Source#hrtfSet}
   * @param {coordinate} [position=[0, 0, 0]] in 'gl' coordinates type.
   * {@link Source#position}
   * @param {Number} [crossfadeDuration] in seconds
   * {@link Source#crossfadeDuration}
   */
  constructor(options = {}) {
    this._audioContext = options.audioContext;
    this._hrtfSet = options.hrtfSet;

    this._convolverCurrent = this._audioContext.createConvolver();
    this._convolverCurrent.normalize = false;

    this._gainCurrent = this._audioContext.createGain();
    this._convolverCurrent.connect(this._gainCurrent);

    this._convolverNext = this._audioContext.createConvolver();
    this._convolverNext.normalize = false;

    this._gainNext = this._audioContext.createGain();
    this._convolverNext.connect(this._gainNext);

    this.crossfadeDuration = options.crossfadeDuration;

    this._crossfadeAfterTime = this._audioContext.currentTime;
    this._crossfadeTimeout = undefined;

    // set position when everything is ready
    if (typeof options.position !== 'undefined') {
      this.position = options.position;
    }
  }

  // ----------- accessors

  /**
   * Set the crossfade duration when the position changes.
   *
   * @param {Number} [duration=0.02] in seconds
   */
  set crossfadeDuration(duration = 0.02) {
    this._crossfadeDuration = duration;
  }

  /**
   * Get the crossfade duration when the position changes.
   *
   * @returns {Number} in seconds
   */
  get crossfadeDuration() {
    return this._crossfadeDuration;
  }

  /**
   * Refer an external HRTF set.
   *
   * @param {HrtfSet} hrtfSet
   */
  set hrtfSet(hrtfSet) {
    this._hrtfSet = hrtfSet;
  }

  /**
   * Get the HrtfSet.
   *
   * @returns {HrtfSet}
   */
  get hrtfSet() {
    return this._hrtfSet;
  }

  /**
   * Set the position of the source and updates.
   *
   * @param {coordinates} positionRequest
   */
  set position(positionRequest) {
    clearTimeout(this._crossfadeTimeout);
    const now = this._audioContext.currentTime;
    if (now >= this._crossfadeAfterTime) {
      this._crossfadeAfterTime = now + this._crossfadeDuration;

      // swap
      let tmp = this._convolverCurrent;
      this._convolverCurrent = this._convolverNext;
      this._convolverNext = tmp;

      tmp = this._gainCurrent;
      this._gainCurrent = this._gainNext;
      this._gainNext = tmp;

      this._convolverNext.buffer = this._hrtfSet.nearestFir(positionRequest);

      // fade in next
      this._gainNext.gain.cancelScheduledValues(now);
      this._gainNext.gain.setValueAtTime(0, now);
      this._gainNext.gain.linearRampToValueAtTime(
        1, now + this._crossfadeDuration);

      // fade out current
      this._gainCurrent.gain.cancelScheduledValues(now);
      this._gainCurrent.gain.setValueAtTime(1, now);
      this._gainCurrent.gain.linearRampToValueAtTime(
        0, now + this._crossfadeDuration);
    } else {
      // re-schedule later
      this._crossfadeTimeout = setTimeout( () => {
        this.position = positionRequest;
      }, 0.02);
    }

  }

  // ----------- public methods

  /**
   * Connect the input of a source.
   *
   * @param {(AudioNode|Array.<AudioNode>)} nodesToConnect
   * @param {Number} [output=0] output to connect from
   * @param {Number} [input=0] input to connect to
   * @returns {this}
   */
  connectInput(nodesToConnect, output, input) {
    const nodes = (Array.isArray(nodesToConnect)
                   ? nodesToConnect
                   : [nodesToConnect] ); // make array

    nodes.forEach( (node) => {
      node.connect(this._convolverCurrent, output, input);
      node.connect(this._convolverNext, output, input);
    });

    return this;
  }

  /**
   * Disconnect the input of a source.
   *
   * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect disconnect
   * all when undefined.
   * @returns {this}
   */
  disconnectInput(nodesToDisconnect) {
    const nodes = (Array.isArray(nodesToDisconnect)
                   ? nodesToDisconnect
                   : [nodesToDisconnect] ); // make array

    nodes.forEach( (node) => {
      node.disconnect(this._convolverCurrent);
      node.disconnect(this._convolverNext);
    });

    return this;
  }

  /**
   * Connect the output of a source.
   *
   * @param {(AudioNode|Array.<AudioNode>)} nodesToConnect
   * @param {Number} [output=0] output to connect from
   * @param {Number} [input=0] input to connect to
   * @returns {this}
   */
  connectOutput(nodesToConnect, output, input) {
    const nodes = (Array.isArray(nodesToConnect)
                   ? nodesToConnect
                   : [nodesToConnect] ); // make array

    nodes.forEach( (node) => {
      this._gainCurrent.connect(node, output, input);
      this._gainNext.connect(node, output, input);
    });

    return this;
  }

  /**
   * Disconnect the output of a source.
   *
   * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect disconnect
   * all when undefined.
   * @returns {this}
   */
  disconnectOutput(nodesToDisconnect) {
    if (typeof nodesToDisconnect === 'undefined') {
      // disconnect all
      this._gainCurrent.disconnect();
      this._gainNext.disconnect();
    } else {
      const nodes = (Array.isArray(nodesToDisconnect)
                     ? nodesToDisconnect
                     : [nodesToDisconnect] ); // make array

      nodes.forEach( (node) => {
        this._gainCurrent.disconnect(node);
        this._gainNext.disconnect(node);
      });
    }

    return this;
  }

}

export default Source;
