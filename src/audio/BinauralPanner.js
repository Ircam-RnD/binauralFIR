/**
 * @fileOverview Multi-source binaural panner.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import glMatrix from 'gl-matrix';

import { glToSystem, systemToGl } from '../geometry/coordinates';

import HrtfSet from '../sofa/HrtfSet';
import Source from './Source';
import Listener from '../geometry/Listener';

/**
 * Binaural panner with multiple sources and a listener.
 */
export class BinauralPanner {

  /**
   * Constructs an HRTF set. Note that the filter positions are applied
   * during the load of an HRTF URL.
   *
   * @see {@link HrtfSet}
   * @see {@link BinauralPanner#loadHrtfSet}
   *
   * @param {Object} options
   * @param {AudioContext} options.audioContext mandatory for the creation
   * of FIR audio buffers
   * @param {CoordinateSystem} [options.coordinateSystem='gl']
   * {@link BinauralPanner#coordinateSystem}
   * @param {Number} [options.sourceCount=1]
   * @param {Array.<coordinates>} [options.sourcePositions=undefined] must
   * be of length options.sourceCount {@link BinauralPanner#sourcePositions}
   * @param {Number} [options.crossfadeDuration] in seconds.
   * @param {HrtfSet} [options.hrtfSet] refer an external HRTF set.
   * {@link BinauralPanner#hrtfSet}
   * @param {CoordinateSystem} [options.filterCoordinateSystem=options.coordinateSystem]
   * {@link BinauralPanner#filterCoordinateSystem}
   * @param {Array.<coordinates>} [options.filterPositions=undefined]
   * array of positions to filter. Use undefined to use all positions from the HRTF set.
   * {@link BinauralPanner#filterPositions}
   * @param {Boolean} [options.filterAfterLoad=false] true to filter after
   * full load of SOFA file
   * @param {Listener} [options.listener] refer an external listener.
   * {@link BinauralPanner#listener}
   * @param {CoordinateSystem} [options.listenerCoordinateSystem=options.coordinateSystem]
   * {@link BinauralPanner#listenerCoordinateSystem}
   * @param {Coordinates} [options.listenerPosition=[0,0,0]]
   * {@link BinauralPanner#listenerPosition}
   * @param {Coordinates} [options.listenerUp=[0,1,0]]
   * {@link BinauralPanner#listenerUp}
   * @param {Coordinates} [options.listenerView=[0,0,-1]]
   * {@link BinauralPanner#listenerView}
   * @param {Boolean} [options.listenerViewIsRelative=false]
   * {@link Listener#viewIsRelative}

   */
  constructor(options = {}) {
    this._audioContext = options.audioContext;

    this.coordinateSystem = options.coordinateSystem;

    const sourceCount = (typeof options.sourceCount !== 'undefined'
                         ? options.sourceCount
                         : 1);
    // allocate first
    this._listener = (typeof options.listener !== 'undefined'
                      ? options.listener
                      : new Listener() );

    // set coordinate system, that defaults to BinauralPanner's own system
    this.listenerCoordinateSystem = options.listenerCoordinateSystem;

    // use setters for internal or external listener
    this.listenerPosition = (typeof options.listenerPosition !== 'undefined'
                             ? options.listenerPosition
                             : glToSystem([], [0, 0, 0],
                                          this._listener.coordinateSystem) );

    this.listenerView = (typeof options.listenerView !== 'undefined'
                         ? options.listenerView
                         : glToSystem([], [0, 0, -1],
                                      this._listener.coordinateSystem) );
    // undefined is fine
    this.listenerViewIsRelative = options.listenerViewIsRelative;

    this.listenerUp = (typeof options.listenerUp !== 'undefined'
                       ? options.listenerUp
                       : glToSystem([], [0, 1, 0],
                                    this._listener.coordinateSystem) );

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
                      coordinateSystem: 'gl',
                    }) );

    this.filterCoordinateSystem = options.filterCoordinateSystem;
    this.filterPositions = options.filterPositions;
    this.filterAfterLoad = options.filterAfterLoad;

    if (typeof options.sourcePositions !== 'undefined') {
      this.sourcePositions = options.sourcePositions;
    }

    this.update();
  }

  // ----------- accessors

  /**
   * Set coordinate system.
   *
   * @param {CoordinateSystem} [system='gl']
   */
  set coordinateSystem(system) {
    this._coordinateSystem = (typeof system !== 'undefined'
                              ? system
                              : 'gl');
  }

  /**
   * Get coordinate system.
   *
   * @returns {CoordinateSystem}
   */
  get coordinateSystem() {
    return this._coordinateSystem;
  }

  /**
   * Refer an external HRTF set, and update sources. Its positions
   * coordinate system must be 'gl'.
   *
   * @see {@link HrtfSet}
   * @see {@link BinauralPanner#update}
   *
   * @param {HrtfSet} hrtfSet
   * @throws {Error} when hrtfSet in undefined or hrtfSet.coordinateSystem is
   * not 'gl'.
   */
  set hrtfSet(hrtfSet) {
    if (typeof hrtfSet !== 'undefined') {
      if (hrtfSet.coordinateSystem !== 'gl') {
        throw new Error(`coordinate system of HRTF set must be 'gl' `
                        + `(and not '${hrtfSet.coordinateSystem}') `
                        `for use with BinauralPannerNode`);
      }
      this._hrtfSet = hrtfSet;
    } else {
      throw new Error('Undefined HRTF set for BinauralPanner');
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
   * @see {@link HrtfSet#filterPositions}
   *
   * @param {Array.<Coordinates>} positions
   */
  set filterPositions(positions) {
    this._hrtfSet.filterPositions = positions;
  }

  /**
   * Get the filter positions of the HRTF set
   *
   * @see {@link HrtfSet#filterPositions}
   *
   * @return {Array.<Coordinates>} positions
   */
  get filterPositions() {
    return this._hrtfSet.filterPositions;
  }

  /**
   * Set coordinate system for filter positions.
   *
   * @param {CoordinateSystem} [system='gl']
   */
  set filterCoordinateSystem(system) {
    this._hrtfSet.filterCoordinateSystem = (typeof system !== 'undefined'
                                            ? system
                                            : this.coordinateSystem);
  }

  /**
   * Get coordinate system for filter positions.
   *
   * @returns {CoordinateSystem}
   */
  get filterCoordinateSystem() {
    return this._hrtfSet.filterCoordinateSystem;
  }

  /**
   * Set post-filtering flag. When false, try to load a partial set of
   * HRTF.
   *
   * @param {Boolean} [post=false]
   */
  set filterAfterLoad(post) {
    this._hrtfSet.filterAfterLoad = post;
  }

  /**
   * Get post-filtering flag. When false, try to load a partial set of
   * HRTF.
   *
   * @returns {Boolean}
   */
  get filterAfterLoad() {
    return this._hrtfSet.filterAfterLoad;
  }

  /**
   * Refer an external listener, and update sources.
   *
   * @see {@link Listener}
   * @see {@link BinauralPanner#update}
   *
   * @param {Listener} listener
   * @throws {Error} when listener in undefined.
   */
  set listener(listener) {
    if (typeof listener !== 'undefined') {
      this._listener = listener;
    } else {
      throw new Error('Undefined listener for BinauralPanner');
    }

    this._sourcesOutdated.fill(true);
    this.update();
  }

  // ---------- Listener proxies

  /**
   * Set coordinate system for listener.
   *
   * @see {@link Listener#coordinateSystem}
   *
   * @param {CoordinateSystem} [system='gl']
   */
  set listenerCoordinateSystem(coordinateSystem) {
    this._listener.coordinateSystem = (typeof coordinateSystem !== 'undefined'
                                       ? coordinateSystem
                                       : this.coordinateSystem);
  }

  /**
   * Get coordinate system for listener.
   *
   * @returns {CoordinateSystem}
   */
  get listenerCoordinateSystem() {
    return this._listener.coordinateSystem;
  }

  /**
   * Set listener position. It will update the relative positions of the
   * sources after a call to the update method.
   *
   * Default value is [0, 0, 0] in 'gl' coordinates.
   *
   * @see {@link Listener#position}
   * @see {@link BinauralPanner#update}
   *
   * @param {Coordinates} positionRequest
   */
  set listenerPosition(positionRequest) {
    this._listener.position = positionRequest;
  }

  /**
   * Get listener position.
   *
   * @returns {Coordinates}
   */
  get listenerPosition() {
    return this._listener.position;
  }

  /**
   * Set listener up direction (not an absolute position). It will update
   * the relative positions of the sources after a call to the update
   * method.
   *
   * Default value is [0, 1, 0] in 'gl' coordinates.
   *
   * @see {@link Listener#up}
   * @see {@link BinauralPanner#update}
   *
   * @param {Coordinates} positionRequest
   */
  set listenerUp(upRequest) {
    this._listener.up = upRequest;
  }

  /**
   * Get listener up direction.
   *
   * @returns {Coordinates}
   */
  get listenerUp() {
    return this._listener.up;
  }

  /**
   * Set listener view, as an aiming position or a relative direction, if
   * viewIsRelative is respectively false or true. It will update the
   * relative positions of the sources after a call to the update method.
   *
   * Default value is [0, 0, -1] in 'gl' coordinates.
   *
   * @see {@link Listener#view}
   * @see {@link Listener#viewIsRelative}
   * @see {@link BinauralPanner#update}
   *
   * @param {Coordinates} positionRequest
   */
  set listenerView(viewRequest) {
    this._listener.view = viewRequest;
  }

  /**
   * Get listener view.
   *
   * @returns {Coordinates}
   */
  get listenerView() {
    return this._listener.view;
  }

  /**
   * Set the type of view: absolute to an aiming position (when false), or
   * a relative direction (when true). It will update the relative
   * positions after a call to the update method.
   *
   * @see {@link Listener#view}
   *
   * @param {Boolean} [relative=false] true when view is a direction, false
   * when it is an absolute position.
   */
  set listenerViewIsRelative(relative) {
    this._listener.viewIsRelative = relative;
  }

  /**
   * Get the type of view.
   *
   * @returns {Boolean}
   */
  get listenerViewIsRelative() {
    return this._listerner.viewIsRelative;
  }

  /**
   * Set the sources positions. It will update the relative positions after
   * a call to the update method.
   *
   * @see {@link BinauralPanner#update}
   * @see {@link BinauralPanner#setSourcePositionByIndex}
   *
   * @param {Array.<Coordinates>} positionsRequest
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
   * @returns {Array.<Coordinates>}
   */
  get sourcePositions() {
    return this._sourcePositionsAbsolute.map( (position) => {
      return glToSystem([], position, this.coordinateSystem);
    });
  }

  /**
   * Set the position of one source. It will update the corresponding
   * relative position after a call to the update method.
   *
   * @see {@link BinauralPanner#update}
   *
   * @param {Number} index
   * @param {Coordinates} positionRequest
   * @returns {this}
   */
  setSourcePositionByIndex(index, positionRequest) {
    this._sourcesOutdated[index] = true;
    systemToGl(this._sourcePositionsAbsolute[index],
               positionRequest,
               this.coordinateSystem);

    return this;
  }

  /**
   * Get the position of one source.
   *
   * @param {Number} index
   * @returns {Coordinates}
   */
  getSourcePositionByIndex(index) {
    return glToSystem([], this._sourcePositionsAbsolute[index],
                      this.coordinateSystem);
  }

  // ----------- public methods

  /**
   * Load an HRTF set form an URL, and update sources.
   *
   * @see {@link HrtfSet#load}
   *
   * @param {String} sourceUrl
   * @returns {Promise.<this|Error>} resolve when URL successfully
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
   * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect disconnect
   * all when undefined.
   * @returns {this}
   */
  disconnectInputByIndex(index, nodesToDisconnect) {
    this._sources[index].disconnectInput(nodesToDisconnect);

    return this;
  }

  /**
   * Disconnect the input of each source.
   *
   * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect disconnect
   * all when undefined.
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
   * @param {(AudioNode|Array.<AudioNode>)} nodesToDisconnect disconnect
   * all when undefined.
   * @returns {this}
   */
  disconnectOutputByIndex(index, nodesToDisconnect) {
    this._sources[index].disconnectOutput(nodesToDisconnect);

    return this;
  }

  /**
   * Connect the output of each source.
   *
   * @see {@link BinauralPanner#connectOutputByIndex}
   *
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
   * Update the sources filters, according to pending changes in listener,
   * and source positions.
   *
   * @returns {Boolean} true when at least a change occurred.
   */
  update() {
    let updated = false;
    if (this._listener.update() ) {
      this._sourcesOutdated.fill(true);
      updated = true;
    }

    if (this._hrtfSet.isReady) {
      this._sourcePositionsAbsolute.forEach( (positionAbsolute, index) => {
        if (this._sourcesOutdated[index] ) {
          glMatrix.vec3.transformMat4(this._sourcePositionsRelative[index],
                                      positionAbsolute,
                                      this._listener.lookAt);

          this._sources[index].position = this._sourcePositionsRelative[index];

          this._sourcesOutdated[index] = false;
          updated = true;
        }
      });
    }

    return updated;
  }
}

export default BinauralPanner;
