/**
 * @fileOverview Source for binaural processing.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

/**
 * Single source.
 *
 * @see BinauralPanner
 */
export class Source {
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

  set crossfadeDuration(duration = 0.02) {
    this._crossfadeDuration = duration;
  }

  get crossfadeDuration() {
    return this._crossfadeDuration;
  }

  set hrtfSet(hrtfSet) {
    this._hrtfSet = hrtfSet;
  }

  get hrtfSet() {
    return this._hrtfSet;
  }

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
