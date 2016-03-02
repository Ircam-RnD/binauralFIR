/**
 * @fileOverview Access a remote catalogue from a SOFA server, and get URLs
 * with filtering.
 *
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import parseXml from './parseXml';
import { parseDataSet } from './parseDataSet';

/**
 * SOFA remote data-base.
 */
export class ServerDataBase {
  /**
   * This is only a constructor, it does not load any thing.
   *
   * @see {@link ServerDataBase#loadCatalogue}
   *
   * @param {Object} [options]
   * @param {String} [options.serverUrl] base URL of server, including
   * protocol, eg. 'http://bili2.ircam.fr'. Default protocol is `https:` if
   * `window.location.protocol` is also `https:`, or `http:`, to avoid
   * mixed contents (that are often blocked).
   */
  constructor(options = {}) {
    this._server = options.serverUrl;

    if (typeof this._server === 'undefined') {
      const protocol = (window.location.protocol === 'https:'
                        ? 'https:'
                        : 'http:');

      this._server = `${protocol}//bili2.ircam.fr`;
    }

    this._catalogue = {};
    this._urls = [];
  }

  /**
   * Asynchronously load complete catalogue from the server, including the
   * catalogue links found in any partial catalogue.
   *
   * @param {String} [sourceUrl] URL of the root catalogue, including the
   * server, like 'http://bili2.ircam.fr/catalog.xml'.
   *  Default is 'catalog.xml' at serverURL supplied at
   * {@link ServerDataBase#constructor}.
   * @param {Object} [destination] Catalogue to update. Default is
   * internal.
   * @returns {Promise.<String|Error>} The promise will resolve (with
   * sourceUrl) when every sub-catalogue will successfully load, or will
   * reject (with an error) as soon as one transfer fails.
   */
  loadCatalogue(sourceUrl = `${this._server}/catalog.xml`,
                destination = this._catalogue) {
    const promise = new Promise( (resolve, reject) => {
      const request = new window.XMLHttpRequest();
      request.open('GET', sourceUrl);
      request.onerror = () => {
        reject(new Error(`Unable to GET ${sourceUrl}, status ${request.status} `
                         + `${request.responseText}`) );
      };

      request.onload = () => {
        if (request.status < 200 || request.status >= 300) {
          request.onerror();
          return;
        }

        const xml = parseXml(request.response);
        const dataSet = xml.querySelector('dataset');

        // recursive catalogues
        const catalogueReferences = xml.querySelectorAll('dataset > catalogRef');

        if (catalogueReferences.length === 0) {
          // end of recursion
          destination.urls = [];
          const urls = xml.querySelectorAll('dataset > dataset');
          for (let ref = 0; ref < urls.length; ++ref) {
            // data set name already contains a leading slash
            const url = this._server
                    + dataSet.getAttribute('name') + '/'
                    + urls[ref].getAttribute('name');
            this._urls.push(url);
            destination.urls.push(url);
          }

          resolve(sourceUrl);
        } else {
          // recursion
          const promises = [];
          for (let ref = 0; ref < catalogueReferences.length; ++ref) {
            const name = catalogueReferences[ref].getAttribute('name');
            const recursiveUrl = this._server
                    + dataSet.getAttribute('name') + '/'
                    + catalogueReferences[ref].getAttribute('xlink:href');
            destination[name] = {};
            promises.push(this.loadCatalogue(recursiveUrl, destination[name]) );
          }

          Promise.all(promises)
            .then( () => {
              this._urls.sort();
              resolve(sourceUrl);
            })
            .catch( (error) => {
              reject(error);
            });
        }
      }; // request.onload

      request.send();
    });

    return promise;
  }

  /**
   * Get URLs, possibly filtered.
   *
   * Any filter can be partial, and is case-insensitive. The result must
   * match every supplied filter. Undefined filters are not applied. For
   * any filter, `|` is the or operator.
   *
   * @param {Object} [options] optional filters
   * @param {String} [options.convention] 'HRIR' or 'SOS'
   * @param {String} [options.dataBase] 'LISTEN', 'BILI', etc.
   * @param {String} [options.equalisation] 'RAW','COMPENSATED'
   * @param {String} [options.sampleRate] in Hertz
   * @param {String} [options.sosOrder] '12order' or '24order'
   * @param {String} [options.freePattern] any pattern matched
   * globally. Use separators (spaces, tabs, etc.) to combine multiple
   * patterns: '44100 listen' will restrict on URLs matching '44100' and
   * 'listen'; '44100|48000 bili|listen' matches ('44100' or '48000') and
   * ('bili' or 'listen').
   * @returns {Array.<String>} URLs that match every filter.
   */
  getUrls(options = {}) {
    // the number and the order of the filters in the following array must
    // match the URL sub-directories
    const filters = [
      options.convention,
      options.dataBase,
      options.equalisation,
      options.sampleRate,
      options.sosOrder, // in file name
    ];

    // any where in URL
    const freePattern = (typeof options.freePattern === 'number'
                         ? options.freePattern.toString()
                         : options.freePattern);

    const pattern = filters.reduce( (global, local) => {
      // partial filter inside slashes
      return `${global}/` + (typeof local !== 'undefined'
                             ? `[^/]*(?:${local})[^/]*`
                             : '[^/]*');
    }, '');

    let regExp = new RegExp(pattern, 'i');

    let urls = this._urls.filter( (url) => {
      return regExp.test(url);
    });

    if (typeof freePattern !== 'undefined') {
      // split patterns with separators
      const patterns = freePattern.split(/\s+/);
      patterns.forEach( (current) => {
        regExp = new RegExp(current, 'i');

        urls = urls.filter( (url) => {
          return regExp.test(url);
        });
      });
    }

    return urls;
  }

  /**
   * Get the data-set definitions of a given URL.
   *
   * @param {String} sourceUrl is the complete SOFA URL, with the
   * server, like
   * 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/COMPENSATED/44100/IRC_1100_C_HRIR.sofa'
   *
   * @returns {Promise.<Object|String>} The promise will resolve after
   * successfully loading, with definitions as * `{definition: {key: values}}`
   * objects; the promise will reject is the transfer fails, with an error.
   */
  getDataSetDefinitions(sourceUrl) {
    const promise = new Promise( (resolve, reject) => {
      const url = `${sourceUrl}.dds`;
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
        resolve(parseDataSet(request.response) );
      }; // request.onload

      request.send();
    });

    return promise;
  }

  /**
   * Get all source positions of a given URL.
   *
   * @param {String} sourceUrl is the complete SOFA URL, with the
   * server, like
   * 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/COMPENSATED/44100/IRC_1100_C_HRIR.sofa'
   *
   * @returns {Promise.<Array<Array.<Number>>|Error>} The promise will resolve
   * after successfully loading, with an array of positions (which are
   * arrays of 3 numbers); the promise will reject is the transfer fails,
   * with an error.
   */
  getSourcePositions(sourceUrl) {
    const promise = new Promise( (resolve, reject) => {
      const url = `${sourceUrl}.json?SourcePosition`;

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
          const response = JSON.parse(request.response);
          if (response.leaves[0].name !== 'SourcePosition') {
            throw new Error('SourcePosition not found');
          }

          resolve(response.leaves[0].data);
        } catch (error) {
          // re-throw
          reject(new Error(`Unable to parse response from ${url}. ${error.message}`) );
        }
      }; // request.onload

      request.send();
    });

    return promise;
  }

}

export default ServerDataBase;
