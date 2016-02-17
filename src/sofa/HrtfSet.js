/**
 * @fileOverview Container for HRTF set: load a set from an URL and get
 * filters from corresponding positions.
 *
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import glMatrix from 'gl-matrix';

import { parseDataSet } from './parseDataSet';
import { parseSofa } from './parseSofa';
import { conformSofaType } from './parseSofa';
import coordinates from '../geometry/coordinates';
import kdTree from '../geometry/KdTree';
import { resampleFloat32Array } from '../audio/utilities';

/**
 * Container for HRTF set.
 */
export class HrtfSet {

  /**
   * Constructs an HRTF set. Note that the filter positions are applied
   * during the load of an URL.
   *
   * @see {@link HrtfSet#load}
   *
   * @param {Object} options
   * @param {AudioContext} options.audioContext mandatory for the creation
   * of FIR audio buffers
   * @param {CoordinateSystem} [options.coordinateSystem='gl']
   * {@link HrtfSet#coordinateSystem}
   * @param {CoordinateSystem} [options.filterCoordinateSystem=options.coordinateSystem]
   * {@link HrtfSet#filterCoordinateSystem}
   * @param {Array.<Coordinates>} [options.filterPositions=undefined]
   * {@link HrtfSet#filterPositions}
   * array of positions to filter. Use undefined to use all positions.
   * @param {Boolean} [options.filterAfterLoad=false] true to filter after
   * full load of SOFA file
   * {@link HrtfSet#filterAfterLoad}
   */
  constructor(options = {}) {
    this._audioContext = options.audioContext;

    this._ready = false;

    this.coordinateSystem = options.coordinateSystem;

    this.filterCoordinateSystem = options.filterCoordinateSystem;
    this.filterPositions = options.filterPositions;

    this.filterAfterLoad = options.filterAfterLoad;
  }

  // ------------ accessors

  /**
   * Set coordinate system for positions.
   * @param {CoordinateSystem} [system='gl']
   */
  set coordinateSystem(system) {
    this._coordinateSystem = (typeof system !== 'undefined'
                              ? system
                              : 'gl');
  }

  /**
   * Get coordinate system for positions.
   *
   * @returns {CoordinateSystem}
   */
  get coordinateSystem() {
    return this._coordinateSystem;
  }

  /**
   * Set coordinate system for filter positions.
   *
   * @param {CoordinateSystem} [system] undefined to use coordinateSystem
   */
  set filterCoordinateSystem(system) {
    this._filterCoordinateSystem = (typeof system !== 'undefined'
                                    ? system
                                    : this.coordinateSystem);
  }

  /**
   * Get coordinate system for filter positions.
   *
   * @param {CoordinateSystem} system
   */
  get filterCoordinateSystem() {
    return this._filterCoordinateSystem;
  }

  /**
   * Set filter positions.
   *
   * @param {Array.<Coordinates>} [positions] undefined for no filtering.
   */
  set filterPositions(positions) {
    if (typeof positions === 'undefined') {
      this._filterPositions = undefined;
    } else {
      switch (this.filterCoordinateSystem) {
        case 'gl':
          this._filterPositions = positions.map( (current) => {
            return current.slice(0); // copy
          });
          break;

        case 'sofaCartesian':
          this._filterPositions = positions.map( (current) => {
            return coordinates.sofaCartesianToGl([], current);
          });
          break;

        case 'sofaSpherical':
          this._filterPositions = positions.map( (current) => {
            return coordinates.sofaSphericalToGl([], current);
          });
          break;

        default:
          throw new Error('Bad filter coordinate system');
      }
    }
  }

  /**
   * Get filter positions.
   *
   * @param {Array.<Coordinates>} positions
   */
  get filterPositions() {
    let positions;
    if (typeof this._filterPositions !== 'undefined') {
      switch (this.filterCoordinateSystem) {
        case 'gl':
          positions = this._filterPositions.map( (current) => {
            return current.slice(0); // copy
          });
          break;

        case 'sofaCartesian':
          positions = this._filterPositions.map( (current) => {
            return coordinates.glToSofaCartesian([], current);
          });
          break;

        case 'sofaSpherical':
          positions = this._filterPositions.map( (current) => {
            return coordinates.glToSofaSpherical([], current);
          });
          break;

        default:
          throw new Error('Bad filter coordinate system');
      }
    }
    return positions;
  }

  /**
   * Set post-filtering flag. When false, try to load a partial set of
   * HRTF.
   *
   * @param {Boolean} [post=false]
   */
  set filterAfterLoad(post) {
    this._filterAfterLoad = (typeof post !== 'undefined'
                             ? post
                             : false);
  }

  /**
   * Get post-filtering flag. When false, try to load a partial set of
   * HRTF.
   *
   * @returns {Boolean}
   */
  get filterAfterLoad() {
    return this._filterAfterLoad;
  }

  /**
   * Test whether an HRTF set is actually loaded.
   *
   * @see {@link HrtfSet#load}
   *
   * @returns {Boolean} false before any successful load, true after.
   *
   */
  get isReady() {
    return this._ready;
  }

  /**
   * Get the URL used to actually load the HRTF set.
   *
   * @returns {String} that is undefined before a successfully load.
   */
  get sofaUrl() {
    return this._sofaUrl;
  }

  /**
   * Get the original sample-rate from the SOFA URL already loaded.
   *
   * @returns {Number} that is undefined before a successfully load.
   */
  get sofaSampleRate() {
    return this._sofaSampleRate;
  }

  /**
   * Get the meta-data from the SOFA URL already loaded.
   *
   * @returns {Object} that is undefined before a successfully load.
   */
  get sofaMetaData() {
    return this._sofaMetaData;
  }

  // ------------- public methods

  /**
   * Apply filter positions to an existing set of HRTF. (After a successful
   * load.)
   *
   * This is destructive.
   *
   * @see {@link HrtfSet#load}
   */
  applyFilterPositions() {
    // do not use getter for gl positions
    let filteredPositions = this._filterPositions.map( (current) => {
      return this._kdt.nearest({ x: current[0], y: current[1], z: current[2] },
                               1)
        .pop()[0]; // nearest data
    });

    // filter out duplicates
    filteredPositions = [ ...new Set(filteredPositions) ];

    this._kdt = kdTree.tree.createKdTree(filteredPositions,
                                         kdTree.distanceSquared,
                                         ['x', 'y', 'z']);
  }

  /**
   * Load an URL and generate the corresponding set of IR buffers.
   *
   * @param {String} sourceUrl
   * @returns {Promise.<this|Error>} resolve when the URL sucessfully
   * loaded.
   */
  load(sourceUrl) {
    const extension = sourceUrl.split('.').pop();

    const url = (extension === 'sofa'
                 ? `${sourceUrl}.json`
                 : sourceUrl);

    let promise;

    // need a server for partial downloading ("sofa" extension may be naive)
    const preFilter = typeof this._filterPositions !== 'undefined'
            && !this.filterAfterLoad
            && extension === 'sofa';
    if (preFilter) {
      promise = Promise.all([
        this._loadMetaAndPositions(sourceUrl),
        this._loadDataSet(sourceUrl),
      ])
        .then( (indicesAndDataSet) => {
          const indices = indicesAndDataSet[0];
          const dataSet = indicesAndDataSet[1];
          return this._loadSofaPartial(sourceUrl, indices, dataSet)
            .then( () => {
              this._ready = true;
              return this; // final resolve
            });
        })
        .catch( () => {
          // when pre-fitering fails, for any reason, try to post-filter
          // console.log(`Error while partial loading of ${sourceUrl}. `
          //             + `${error.message}. `
          //             + `Load full and post-filtering, instead.`);
          return this._loadSofaFull(url)
            .then( () => {
              this.applyFilterPositions();
              this._ready = true;
              return this; // final resolve
            });
        });
    } else {
      promise = this._loadSofaFull(url)
        .then( () => {
          if (typeof this._filterPositions !== 'undefined'
              && this.filterAfterLoad) {
            this.applyFilterPositions();
          }
          this._ready = true;
          return this; // final resolve
        });
    }

    return promise;
  }

  /**
   * @typedef HrtfSet.nearestType
   * @type {Object}
   * @property {Number} distance from the request
   * @property {AudioBuffer} fir 2-channels impulse response
   * @property {Number} index original index in the SOFA set
   * @property {Coordinates} position using coordinateSystem coordinates
   * system.
   */

  /**
   * Get the nearest point in the HRTF set, after a successful load.
   *
   * @see {@link HrtfSet#load}
   *
   * @param {Coordinates} positionRequest
   * @returns {HrtfSet.nearestType}
   */
  nearest(positionRequest) {
    const position = coordinates.systemToGl([], positionRequest, this.coordinateSystem);
    const nearest = this._kdt.nearest({
      x: position[0],
      y: position[1],
      z: position[2],
    }, 1).pop(); // nearest only
    const data = nearest[0];
    coordinates.glToSystem(position, [data.x, data.y, data.z], this.coordinateSystem);
    return {
      distance: nearest[1],
      fir: data.fir,
      index: data.index,
      position,
    };
  }

  /**
   * Get the FIR AudioBuffer that corresponds to the closest position in
   * the set.
   * @param {Coordinates} positionRequest
   * @returns {AudioBuffer}
   */
  nearestFir(positionRequest) {
    return this.nearest(positionRequest).fir;
  }

  // ----------- private methods

  /**
   * Creates a kd-tree out of the specified indices, positions, and FIR.
   *
   * @private
   *
   * @param {Array}
   * indicesPositionsFirs
   * @returns {this}
   */
  _createKdTree(indicesPositionsFirs) {
    const positions = indicesPositionsFirs.map( (value) => {
      const impulseResponses = value[2];
      const fir = this._audioContext.createBuffer(
        impulseResponses.length,
        impulseResponses[0].length,
        this._audioContext.sampleRate);
      impulseResponses.forEach( (samples, channel) => {
        // do not use copyToChannel because of Safari <= 9
        fir.getChannelData(channel).set(samples);
      });

      return {
        index: value[0],
        x: value[1][0],
        y: value[1][1],
        z: value[1][2],
        fir,
      };
    });

    this._kdt = kdTree.tree.createKdTree(positions,
                                         kdTree.distanceSquared,
                                         ['x', 'y', 'z']);
    return this;
  }

  /**
   * Asynchronously create Float32Arrays, with possible re-sampling.
   *
   * @private
   *
   * @param {Array.<Number>} indices
   * @param {Array.<Coordinates>} positions
   * @param {Array.<Float32Array>} firs
   * @returns {Promise.<Array|Error>}
   * @throws {Error} assertion that the channel count is 2
   */
  _generateIndicesPositionsFirs(indices, positions, firs) {
    const sofaFirsPromises = firs.map( (sofaFirChannels, index) => {
      const channelCount = sofaFirChannels.length;
      if (channelCount !== 2) {
        throw new Error(`Bad number of channels`
                        + ` for IR index ${indices[index]}`
                        + ` (${channelCount} instead of 2)`);
      }

      const sofaFirsChannelsPromises = sofaFirChannels.map( (fir) => {
        return resampleFloat32Array({
          inputSamples: fir,
          inputSampleRate: this._sofaSampleRate,
          outputSampleRate: this._audioContext.sampleRate,
        });
      });
      return Promise.all(sofaFirsChannelsPromises)
        .then( (firChannels) => {
          return [
            indices[index],
            positions[index],
            firChannels,
          ];
        })
        .catch( (error) => {
          // re-throw
          throw new Error(
            `Unable to re-sample impulse response ${index}. ${error.message}`);
        });
    });
    return Promise.all(sofaFirsPromises);
  }

  /**
   * Try to load a data set from a SOFA URL.
   *
   * @private
   *
   * @param {String} sourceUrl
   * @returns {Promise.<Object|Error>}
   */
  _loadDataSet(sourceUrl) {
    const promise = new Promise( (resolve, reject) => {
      const ddsUrl = `${sourceUrl}.dds`;
      const request = new window.XMLHttpRequest();
      request.open('GET', ddsUrl);
      request.onerror = () => {
        reject(new Error(`Unable to GET ${ddsUrl}, status ${request.status} `
                         + `${request.responseText}`) );
      };

      request.onload = () => {
        if (request.status < 200 || request.status >= 300) {
          request.onerror();
          return;
        }

        try {
          const dds = parseDataSet(request.response);
          resolve(dds);
        } catch (error) {
          // re-throw
          reject(new Error(`Unable to parse ${ddsUrl}. ${error.message}`) );
        }
      }; // request.onload

      request.send();
    });

    return promise;
  }

  /**
   * Try to load meta-data and positions from a SOFA URL, to get the
   * indices closest to the filter positions.
   *
   * @private
   *
   * @param {String} sourceUrl
   * @returns {Promise.<Array.<Number>|Error>}
   */
  _loadMetaAndPositions(sourceUrl) {
    const promise = new Promise( (resolve, reject) => {
      const positionsUrl = `${sourceUrl}.json?`
              + `ListenerPosition,ListenerUp,ListenerView,SourcePosition,`
              + `Data.Delay,Data.SamplingRate,`
              + `EmitterPosition,ReceiverPosition,RoomVolume`; // meta

      const request = new window.XMLHttpRequest();
      request.open('GET', positionsUrl);
      request.onerror = () => {
        reject(new Error(`Unable to GET ${positionsUrl}, status ${request.status} `
                         + `${request.responseText}`) );
      };

      request.onload = () => {
        if (request.status < 200 || request.status >= 300) {
          request.onerror();
          return;
        }

        try {
          const data = parseSofa(request.response);
          this._setMetaData(data);

          const sourcePositions = this._sourcePositionsToGl(data);
          const hrtfPositions = sourcePositions.map( (position, index) => {
            return {
              x: position[0],
              y: position[1],
              z: position[2],
              index,
            };
          });

          const kdt = kdTree.tree.createKdTree(
            hrtfPositions,
            kdTree.distanceSquared,
            ['x', 'y', 'z']);

          let nearestIndices = this._filterPositions.map( (current) => {
            return kdt.nearest({ x: current[0], y: current[1], z: current[2] },
                               1)
              .pop()[0] // nearest data
              .index;
          });

          // filter out duplicates
          nearestIndices = [ ...new Set(nearestIndices) ];

          this._sofaUrl = sourceUrl;
          resolve(nearestIndices);
        } catch (error) {
          // re-throw
          reject(new Error(`Unable to parse ${positionsUrl}. ${error.message}`) );
        }
      }; // request.onload

      request.send();
    });

    return promise;
  }

  /**
   * Try to load full SOFA URL.
   *
   * @private
   *
   * @param {String} url
   * @returns {Promise.<this|Error>}
   */
  _loadSofaFull(url) {
    const promise = new Promise( (resolve, reject) => {
      const request = new window.XMLHttpRequest();
      request.open('GET', url);
      request.onerror = () => {
        reject(new Error(`Unable to GET ${url}, status ${request.status} `
                         + `${request.responseText}`) );
      };

      request.onload = () => {
        if (request.status < 200 || request.status >= 300) {
          request.onerror();
          return;
        }

        try {
          const data = parseSofa(request.response);
          this._setMetaData(data);
          const sourcePositions = this._sourcePositionsToGl(data);
          this._generateIndicesPositionsFirs(
            sourcePositions.map( (position, index) => index), // full
            sourcePositions,
            data['Data.IR'].data
          )
            .then( (indicesPositionsFirs) => {
              this._createKdTree(indicesPositionsFirs);
              this._sofaUrl = url;
              resolve(this);
            });

        } catch (error) {
          // re-throw
          reject(new Error(`Unable to parse ${url}. ${error.message}`) );
        }
      }; // request.onload

      request.send();
    });

    return promise;
  }

  /**
   * Try to load partial data from a SOFA URL.
   *
   * @private
   *
   * @param {Array.<String>} sourceUrl
   * @param {Array.<Number>} indices
   * @param {Object} dataSet
   * @returns {Promise.<this|Error>}
   */
  _loadSofaPartial(sourceUrl, indices, dataSet) {
    const urlPromises = indices.map( (index) => {
      const urlPromise = new Promise( (resolve, reject) => {
        const positionUrl = `${sourceUrl}.json?`
                + `SourcePosition[${index}][0:1:${dataSet.SourcePosition.C - 1}],`
                + `Data.IR[${index}][0:1:${dataSet['Data.IR'].R - 1}]`
                + `[0:1:${dataSet['Data.IR'].N - 1}]`;

        const request = new window.XMLHttpRequest();
        request.open('GET', positionUrl);
        request.onerror = () => {
          reject(new Error(`Unable to GET ${positionUrl}, status ${request.status} `
                           + `${request.responseText}`) );
        };

        request.onload = () => {
          if (request.status < 200 || request.status >= 300) {
            request.onerror();
          }

          try {
            const data = parseSofa(request.response);
            // (meta-data is already loaded)

            const sourcePositions = this._sourcePositionsToGl(data);
            this._generateIndicesPositionsFirs([index],
                                               sourcePositions,
                                               data['Data.IR'].data)
              .then( (indicesPositionsFirs) => {
                // One position per URL here
                // Array made of multiple promises, later
                resolve(indicesPositionsFirs[0]);
              });
          } catch (error) {
            // re-throw
            reject(new Error(
              `Unable to parse ${positionUrl}. ${error.message}`) );
          }
        }; // request.onload

        request.send();
      });

      return urlPromise;
    });

    return Promise.all(urlPromises)
      .then( (indicesPositionsFirs) => {
        this._createKdTree(indicesPositionsFirs);
        return this; // final resolve
      });
  }

  /**
   * Set meta-data.
   *
   * @private
   *
   * @param {Object} data
   * @throws {Error} assertion for FIR data.
   */
  _setMetaData(data) {
    if (data.metaData.DataType !== 'FIR') {
      throw new Error('SOFA data type is not FIR');
    }

    this._sofaMetaData = data.metaData;
    this._sofaSampleRate = data['Data.SamplingRate'].data[0];

    // Convert listener position, up, and view to SOFA cartesian,
    // to generate a SOFA-to-GL look-at mat4.
    // Default SOFA type is 'cartesian' (see table D.4A).

    const listenerPosition = coordinates.systemToSofaCartesian(
      [], data.ListenerPosition.data[0],
      conformSofaType(data.ListenerPosition.Type || 'cartesian') );

    const listenerView = coordinates.systemToSofaCartesian(
      [], data.ListenerView.data[0],
      conformSofaType(data.ListenerView.Type || 'cartesian') );

    const listenerUp = coordinates.systemToSofaCartesian(
      [], data.ListenerUp.data[0],
      conformSofaType(data.ListenerUp.Type || 'cartesian') );

    this._sofaToGl = glMatrix.mat4.lookAt(
      [], listenerPosition, listenerView, listenerUp);
  }

  /**
   * Convert to GL coordinates, in-place.
   *
   * @private
   *
   * @param {Object} data
   * @returns {Array.<Coordinates>}
   * @throws {Error}
   */
  _sourcePositionsToGl(data) {
    const sourcePositions = data.SourcePosition.data; // reference
    const sourceCoordinateSystem = (typeof data.SourcePosition.Type !== 'undefined'
                                    ? data.SourcePosition.Type
                                    : 'spherical'); // default (SOFA Table D.4C)
    switch (sourceCoordinateSystem) {
      case 'cartesian':
        sourcePositions.forEach( (position) => {
          glMatrix.vec3.transformMat4(position, position,
                                      this._sofaToGl);
        });
        break;

      case 'spherical':
        sourcePositions.forEach( (position) => {
          coordinates.sofaSphericalToSofaCartesian(position, position); // in-place
          glMatrix.vec3.transformMat4(position, position,
                                      this._sofaToGl);
        });
        break;

      default:
        throw new Error('Bad source position type');
    }

    return sourcePositions;
  }

}

export default HrtfSet;
