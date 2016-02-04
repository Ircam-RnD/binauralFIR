/**
 * @fileOverview Multi-source binaural panner.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2016 IRCAM, Paris, France
 * @license CECILL-2.1
 */

import glMatrix from 'gl-matrix';

import {
  glToTyped,
  typedToGl,
} from '../geometry/coordinates';

import HrtfSet from '../sofa/HrtfSet';
import Source from './Source';

/**
 * Binaural panner with multiple sources and a listener.
 */
export class BinauralPanner {

  /**
   /**
   * Constructs an HRTF set. Note that the filter positions are applied
   * during the load of an HRTF URL.
   *
   * @see HrtfSet
   * @see loadHrtfSet
   *
   * @param {Object} options
   * @param {AudioContext} options.audioContext mandatory for the creation
   * of FIR audio buffers
   * @param {coordinatesType} [options.positionsType='gl']
   * @param {coordinatesType} [options.filterPositionsType=options.positionsType]
   * @param {Array.<coordinates>} [options.filterPositions=undefined]
   * array of positions to filter. Use undefined to use all positions.
   * @param {Boolean} [options.filterAfterLoad = false] true to filter after
   * full load of SOFA file
   * @param {coordinates} [options.listenerPosition=[0, 0, 0]]
   * @param {coordinates} [options.listenerUp=[0, 1, 0]]
   * @param {coordinates} [options.listenerView=[0, 0, -1]]
   * @param {Number} [options.sourceCount=1]
   * @param {Array.<coordinates>} [options.sourcePositions=undefined] must
   * be of length options.sourceCount
   */
  constructor(options = {}) {
    this._audioContext = options.audioContext;

    this.positionsType = options.positionsType;

    const sourceCount = (typeof options.sourceCount !== 'undefined'
                         ? options.sourceCount
                         : 1);

    this._listenerOutdated = true;
    this._listenerLookAt = [];

    this._listenerPosition = [];
    this.listenerPosition = (typeof options.listenerPosition !== 'undefined'
                             ? options.listenerPosition
                             : glToTyped([], [0, 0, 0], this.positionsType) );

    this._listenerUp = [];
    this.listenerUp = (typeof options.listenerUp !== 'undefined'
                       ? options.listenerUp
                       : glToTyped([], [0, 1, 0], this.positionsType) );

    this._listenerView = [];
    this.listenerView = (typeof options.listenerView !== 'undefined'
                         ? options.listenerView
                         : glToTyped([], [0, 0, -1], this.positionsType) );

    this._sourcesOutdated = new Array(sourceCount).fill(true);

    this._sources = this._sourcesOutdated.map( () => {
      return new Source({
        audioContext: this._audioContext,
        crossfadeDuration: options.crossfadeDuration,
      });
    });

    this._sourcePositionsAbsolute = this._sourcesOutdated.map( () => {
      return [0, 0, 1]; // allocation and default value
    });

    this._sourcePositionsRelative = this._sourcesOutdated.map( () => {
      return [0, 0, 1]; // allocation and default value
    });

    this.hrtfSet = (typeof options.hrtfSet !== 'undefined'
                    ? options.hrtfSet
                    : new HrtfSet({
                      audioContext: this._audioContext,
                      positionsType: 'gl',
                    }) );

    this.filterPositionsType = options.filterPositionsType;
    this.filterPositions = options.filterPositions;
    this.filterAfterLoad = options.filterAfterLoad;

    if (typeof options.sourcePositions !== 'undefined') {
      this.sourcePositions = options.sourcePositions;
    }

    this.update();
  }

  // ----------- accessors

  /**
   * Set coordinates type for positions.
   * @param {coordinatesType} [type='gl']
   */
  set positionsType(type) {
    this._positionsType = (typeof type !== 'undefined'
                           ? type
                           : 'gl');
  }

  /**
   * Get coordinates type for positions.
   * @returns {coordinatesType}
   */
  get positionsType() {
    return this._positionsType;
  }

  /**
   * Refer an external HRTF set, and update sources. Its positions
   * coordinate type must be 'gl'.
   *
   * @see HrtfSet
   * @see BinauralPanner#update
   *
   * @param {HrtfSet} hrtfSet
   * @throws {Error} when hrtfSet in undefined or hrtfSet.positionsType is
   * not 'gl'.
   */
  set hrtfSet(hrtfSet) {
    if (typeof hrtfSet !== 'undefined') {
      if (hrtfSet.positionsType !== 'gl') {
        throw new Error(`positions type of HRTF set must be 'gl' `
                        + `(and not '${hrtfSet.positionsType}') `
                        `for use with BinauralPannerNode`);
      }
      this._hrtfSet = hrtfSet;
    } else {
      throw new Error(`Undefined HRTF set for BinauralPanner`);
    }

    // update HRTF set references
    this._sourcesOutdated.fill(true);
    this._sources.forEach( (source) => {
      source.hrtfSet = this._hrtfSet;
    });

    this.update();
  }

  /**
   * Get the HrtfSet.
   *
   * @returns {HrtfSet}
   */
  get hrtfSet() {
    return this._hrtfSet;
  }

  // ------------- HRTF set proxies

  /**
   * Set the filter positions of the HRTF set
   *
   * @see HrtfSet#filterPositions
   *
   * @param {Array.<coordinates>} positions
   */
  set filterPositions(positions) {
    this._hrtfSet.filterPositions = positions;
  }

  /**
   * Get the filter positions of the HRTF set
   *
   * @see HrtfSet#filterPositions
   *
   * @return {Array.<coordinates>} positions
   */
  get filterPositions() {
    return this._hrtfSet.filterPositions;
  }

  set filterPositionsType(type) {
    this._hrtfSet.filterPositionsType = type;
  }

  get filterPositionsType() {
    return this._hrtfSet.filterPositionsType;
  }

  set filterAfterLoad(post) {
    this._hrtfSet.filterAfterLoad = post;
  }

  get filterAfterLoad() {
    return this._hrtfSet.filterAfterLoad;
  }

  set listenerPosition(positionRequest) {
    typedToGl(this._listenerPosition, positionRequest, this._positionsType);
    this._listenerOutdated = true;
  }

  get listenerPosition() {
    return glToTyped([], this._listenerPosition, this._positionsType);
  }

  set listenerUp(upRequest) {
    typedToGl(this._listenerUp, upRequest, this._positionsType);
    this._listenerOutdated = true;
  }

  get listenerUp() {
    return glToTyped([], this._listenerUp, this._positionsType);
  }

  set listenerView(viewRequest) {
    typedToGl(this._listenerView, viewRequest, this._positionsType);
    this._listenerOutdated = true;
  }

  get listenerView() {
    return glToTyped([], this._listenerView, this._positionsType);
  }

  /**
   * Set the sources positions.
   *
   * @see BinauralPanner#setSourcePositionByIndex
   *
   * @param {Array.<coordinates>} positionsRequest
   * @throws {Error} if the length of positionsRequest is not the same as
   * the number of sources
   */
  set sourcePositions(positionsRequest) {
    if (positionsRequest.length !== this._sources.length) {
      throw new Error(`Bad number of source positions: `
                      + `${positionsRequest.length} `
                      + `instead of ${this._sources.length}`);
    }

    positionsRequest.forEach( (position, index) => {
      this._sourcesOutdated[index] = true;
      this.setSourcePositionByIndex(index, position);
    });
  }

  /**
   * Get the source positions.
   *
   * @returns {Array.<coordinates>}
   */
  get sourcePositions() {
    return this._sourcePositionsAbsolute.map( (position) => {
      return glToTyped([], position, this.positionsType);
    });
  }

  /**
   * Set the position of one source.
   *
   * @param {Number} index
   * @param {coordinates} positionRequest
   * @returns {this}
   */
  setSourcePositionByIndex(index, positionRequest) {
    this._sourcesOutdated[index] = true;
    typedToGl(this._sourcePositionsAbsolute[index],
              positionRequest,
              this.positionsType);

    return this;
  }

  /**
   * Get the position of one source
   *
   * @param {Number} index
   * @returns {coordinates}
   */
  getSourcePositionByIndex(index) {
    return glToTyped([], this._sourcePositionsAbsolute[index],
                     this.positionsType);
  }

  // ----------- public methods

  /**
   * Load an HRTF set form an URL, and update sources.
   *
   * @see HrtfSet#load
   *
   * @param {String} sourceUrl
   * @returns {Promise.<(this|Error)>} resolve when URL successfully
   * loaded.
   */
  loadHrtfSet(sourceUrl) {
    return this._hrtfSet.load(sourceUrl)
      .then( () => {
        this._sourcesOutdated.fill(true);
        this.update();
        return this;
      });
  }

  /**
   * Connect the input of a source.
   *
   * @param {Number} index
   * @param {(AudioNode|Array.<AudioNode>)} nodesToConnect
   * @param {Number} [output=0] output to connect from
   * @param {Number} [input=0] input to connect to
   * @returns {this}
   */
  connectInputByIndex(index, nodesToConnect, output, input) {
    this._sources[index].connectInput(nodesToConnect, output, input);

    return this;
  }

  /**
   * Disconnect the input of one source.
   *
   * @param {Number} index
   * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect
   * @returns {this}
   */
  disconnectInputByIndex(index, nodesToDisconnect) {
    this._sources[index].disconnectInput(nodesToDisconnect);

    return this;
  }

  /**
   * Disconnect the input of each source.
   *
   * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect
   * @returns {this}
   */
  disconnectInputs(nodesToDisconnect) {
    const nodes = (Array.isArray(nodesToDisconnect)
                   ? nodesToDisconnect
                   : [nodesToDisconnect] ); // make array

    this._sources.forEach( (source, index) => {
      source.disconnectInput(nodes[index]);
    });

    return this;
  }

  /**
   * Connect the output of a source.
   *
   * @param {Number} index
   * @param {(AudioNode|Array.<AudioNode>)} nodesToConnect
   * @param {Number} [output=0] output to connect from
   * @param {Number} [input=0] input to connect to
   * @returns {this}
   */
  connectOutputByIndex(index, nodesToConnect, output, input) {
    this._sources[index].connectOutput(nodesToConnect, output, input);

    return this;
  }

  /**
   * Disconnect the output of a source.
   *
   * @param {Number} index
   * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect
   * @returns {this}
   */
  disconnectOutputByIndex(index, nodesToDisconnect) {
    this._sources[index].disconnectOutput(nodesToDisconnect);

    return this;
  }

  /**
   * Connect each output of each source. Note that the number of nodes to
   * connect must match the number of sources.
   *
   * @see BinauralPanner#connectOutputByIndex
   *
   * @param {Number} index
   * @param {(AudioNode|Array.<AudioNode>)} nodesToConnect
   * @param {Number} [output=0] output to connect from
   * @param {Number} [input=0] input to connect to
   * @returns {this}
   */
  connectOutputs(nodesToConnect, output, input) {
    this._sources.forEach( (source) => {
      source.connectOutput(nodesToConnect, output, input);
    });

    return this;
  }

  /**
   * Disconnect the output of each source.
   *
   * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect
   * @returns {this}
   */
  disconnectOutputs(nodesToDisconnect) {
    this._sources.forEach( (source) => {
      source.disconnectOutput(nodesToDisconnect);
    });

    return this;
  }

  /**
   * Update the sources filters, according to possible changes in listener,
   * and source positions.
   *
   * @returns {this}
   */
  update() {
    if (this._listenerOutdated) {
      glMatrix.mat4.lookAt(this._listenerLookAt,
                           this._listenerPosition,
                           this._listenerView,
                           this._listenerUp);

      this._sourcesOutdated.fill(true);
    }

    if (this._hrtfSet.isReady) {
      this._sourcePositionsAbsolute.forEach( (positionAbsolute, index) => {
        if (this._sourcesOutdated[index] ) {
          glMatrix.vec3.transformMat4(this._sourcePositionsRelative[index],
                                      positionAbsolute,
                                      this._listenerLookAt);

          this._sources[index].position = this._sourcePositionsRelative[index];

          this._sourcesOutdated[index] = false;
        }
      });
    }

    return this;
  }
}

export default BinauralPanner;
