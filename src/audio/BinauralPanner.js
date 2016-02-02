/**
 * @fileOverview Multi-source binaural panner.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import glMatrix from 'gl-matrix';

import {
  glToTyped,
  typedToGl,
} from '../geometry/coordinates';

import Source from './Source';

/**
 * Binaural panner with multiple sources and a listener.
 */
export class BinauralPanner {
  constructor(options = {}) {
    this._audioContext = options.audioContext;

    this.positionsType = (typeof options.positionsType !== 'undefined'
                          ? options.positionsType
                          : 'gl');

    this._hrtfSet = options.hrtfSet;

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
        hrtfSet: this._hrtfSet,
      });
    });

    this._sourcePositionsAbsolute = this._sourcesOutdated.map( () => {
      return [0, 0, 1]; // allocation and default value
    });

    this._sourcePositionsRelative = this._sourcesOutdated.map( () => {
      return [0, 0, 1]; // allocation and default value
    });

    if (typeof options.sourcePositions !== 'undefined') {
      this.sourcePositions = options.sourcePositions;
    }

    this.update();
  }

  // ----------- accessors

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

  set sourcePositions(positionsRequest) {
    if (positionsRequest.length !== this._sources.length) {
      throw new Error(`Bad number of source positions: `
                      + `${positionsRequest.length} `
                      + `instead of ${this._sources.length}`);
    }

    positionsRequest.forEach( (position, index) => {
      this.setSourcePositionByIndex(index, position);
    });
  }

  get sourcePositions() {
    return this._sourcePositionsAbsolute.map( (position) => {
      return glToTyped([], position, this.positionsType);
    });
  }

  setSourcePositionByIndex(index, positionRequest) {
    this._sourcesOutdated[index] = true;
    typedToGl(this._sourcePositionsAbsolute[index],
              positionRequest,
              this.positionsType);

    return this;
  }

  getSourcePositionByIndex(index) {
    return glToTyped([], this._sourcePositionsAbsolute[index],
                     this.positionsType);
  }

  // ----------- public methods

  connectInputByIndex(index, nodesToConnect, output, input) {
    this._sources[index].connectInput(nodesToConnect, output, input);

    return this;
  }

  disconnectInputByIndex(index, nodesToDisconnect) {
    this._sources[index].disconnectInput(nodesToDisconnect);

    return this;
  }

  disconnectInputs(nodesToDisconnect) {
    const nodes = (Array.isArray(nodesToDisconnect)
                   ? nodesToDisconnect
                   : [nodesToDisconnect] ); // make array

    this._sources.forEach( (source, index) => {
      source.disconnectInput(nodes[index]);
    });

    return this;
  }

  connectOutputByIndex(index, nodesToConnect, output, input) {
    this._sources[index].connectOutput(nodesToConnect, output, input);

    return this;
  }

  disconnectOutputByIndex(index, nodesToDisconnect) {
    this._sources[index].disconnectOutput(nodesToDisconnect);

    return this;
  }

  connectOutputs(nodesToConnect, output, input) {
    this._sources.forEach( (source) => {
      source.connectOutput(nodesToConnect, output, input);
    });

    return this;
  }

  disconnectOutputs(nodesToDisconnect) {
    this._sources.forEach( (source) => {
      source.disconnectOutput(nodesToDisconnect);
    });

    return this;
  }

  update() {
    if (this._listenerOutdated) {
      glMatrix.mat4.lookAt(this._listenerLookAt,
                           this._listenerPosition,
                           this._listenerView,
                           this._listenerUp);

      this._sourcesOutdated.fill(true);
    }

    this._sourcePositionsAbsolute.forEach( (positionAbsolute, index) => {
      if (this._sourcesOutdated[index] ) {
        glMatrix.vec3.transformMat4(this._sourcePositionsRelative[index],
                                    positionAbsolute,
                                    this._listenerLookAt);

        this._sources[index].position = this._sourcePositionsRelative[index];

        this._sourcesOutdated[index] = false;
      }
    });

    return this;
  }
}

export default BinauralPanner;

