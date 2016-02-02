'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileOverview Access a remote data-base from a SOFA server.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Jean-Philippe.Lambert@ircam.fr
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2015-2016 IRCAM, Paris, France
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerDataBase = undefined;

var _parseXml = require('./parseXml');

var _parseXml2 = _interopRequireDefault(_parseXml);

var _parseDataSet = require('./parseDataSet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * SOFA remote data-base.
 */

var ServerDataBase = exports.ServerDataBase = function () {
  /**
   * This is only a constructor, it does not load any thing.
   *
   * @see loadCatalogue
   *
   * @param {Object} [options]
   * @param {String} [options.serverUrl] base URL of server, including
   * protocol, eg. 'http://bili2.ircam.fr'.
   */

  function ServerDataBase() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ServerDataBase);

    this._server = typeof options.serverUrl !== 'undefined' ? options.serverUrl : 'http://bili2.ircam.fr';

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
   * {@link constructor}.
   * @param {Object} [destination] Catalogue to update. Default is
   * internal.
   * @returns {Promise.<(String | Error)>} The promise will resolve (with
   * sourceUrl) when every sub-catalogue will successfully load, or will
   * reject (with an error) as soon as one transfer fails.
   */

  _createClass(ServerDataBase, [{
    key: 'loadCatalogue',
    value: function loadCatalogue() {
      var _this = this;

      var sourceUrl = arguments.length <= 0 || arguments[0] === undefined ? this._server + '/catalog.xml' : arguments[0];
      var destination = arguments.length <= 1 || arguments[1] === undefined ? this._catalogue : arguments[1];

      var promise = new Promise(function (resolve, reject) {
        var request = new window.XMLHttpRequest();
        request.open('GET', sourceUrl);
        request.onerror = function () {
          reject(new Error('Unable to GET ' + sourceUrl + ', status ' + request.status + ' ' + ('' + request.responseText)));
        };

        request.onload = function () {
          if (request.status < 200 || request.status >= 300) {
            request.onerror();
            return;
          }

          var xml = (0, _parseXml2.default)(request.response);
          var dataSet = xml.querySelector('dataset');

          // recursive catalogues
          var catalogueReferences = xml.querySelectorAll('dataset > catalogRef');

          if (catalogueReferences.length === 0) {
            // end of recursion
            destination.urls = [];
            var urls = xml.querySelectorAll('dataset > dataset');
            for (var ref = 0; ref < urls.length; ++ref) {
              // data set name already contains a leading slash
              var url = _this._server + dataSet.getAttribute('name') + '/' + urls[ref].getAttribute('name');
              _this._urls.push(url);
              destination.urls.push(url);
            }

            resolve(sourceUrl);
          } else {
            // recursion
            var promises = [];
            for (var ref = 0; ref < catalogueReferences.length; ++ref) {
              var name = catalogueReferences[ref].getAttribute('name');
              var recursiveUrl = _this._server + dataSet.getAttribute('name') + '/' + catalogueReferences[ref].getAttribute('xlink:href');
              destination[name] = {};
              promises.push(_this.loadCatalogue(recursiveUrl, destination[name]));
            }

            Promise.all(promises).then(function () {
              _this._urls.sort();
              resolve(sourceUrl);
            }).catch(function (error) {
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
     * match every supplied filter. Undefined filters are not applied.
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
     * 'listen'
     * @returns {Array.<String>} URLs that match every filter.
     */

  }, {
    key: 'getUrls',
    value: function getUrls() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      // the number and the order of the filters in the following array must
      // match the URL sub-directories
      var filters = [options.convention, options.dataBase, options.equalisation, options.sampleRate, options.sosOrder];

      // any where in URL
      // in file name
      var freePattern = options.freePattern;

      var pattern = filters.reduce(function (global, local) {
        // partial filter inside slashes
        return global + '/' + (typeof local !== 'undefined' ? '[^/]*' + local + '[^/]*' : '[^/]*');
      }, '');

      var regExp = new RegExp(pattern, 'i');

      var urls = this._urls.filter(function (url) {
        return regExp.test(url);
      });

      if (typeof freePattern !== 'undefined') {
        // split patterns with separators
        var patterns = freePattern.split(/\s+/);
        patterns.forEach(function (current) {
          regExp = new RegExp(current, 'i');

          urls = urls.filter(function (url) {
            return regExp.test(url);
          });
        });
      }

      return urls;
    }

    /**
     * Get all source positions of a given URL.
     *
     * @param {String} sourceUrl is the complete SOFA URL, with the
     * server, like
     * 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/COMPENSATED/44100/IRC_1100_C_HRIR.sofa'
     *
     * @returns {Promise.<(Object | String)>} The promise will resolve after
     * successfully loading, with definitions as * `{definition: {key: values}}`
     * objects; the promise will reject is the transfer fails, with an error.
     */

  }, {
    key: 'getDataSetDefinitions',
    value: function getDataSetDefinitions(sourceUrl) {
      var promise = new Promise(function (resolve, reject) {
        var url = sourceUrl + '.dds';
        var request = new window.XMLHttpRequest();
        request.open('GET', url);
        request.onerror = function () {
          reject(new Error('Unable to GET ' + url + ', status ' + request.status + ' ' + ('' + request.responseText)));
        };

        request.onload = function () {
          if (request.status < 200 || request.status >= 300) {
            request.onerror();
            return;
          }
          resolve((0, _parseDataSet.parseDataSet)(request.response));
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
     * @returns {Promise.<(Array<Array.<Number>> | String)>} The promise will resolve
     * after successfully loading, with an array of positions (which are
     * arrays of 3 numbers); the promise will reject is the transfer fails,
     * with an error.
     */

  }, {
    key: 'getSourcePositions',
    value: function getSourcePositions(sourceUrl) {
      var promise = new Promise(function (resolve, reject) {
        var url = sourceUrl + '.json?SourcePosition';

        var request = new window.XMLHttpRequest();
        request.open('GET', url);
        request.onerror = function () {
          reject(new Error('Unable to GET ' + url + ', status ' + request.status + ' ' + ('' + request.responseText)));
        };

        request.onload = function () {
          if (request.status < 200 || request.status >= 300) {
            request.onerror();
            return;
          }

          try {
            var response = JSON.parse(request.response);
            if (response.leaves[0].name !== 'SourcePosition') {
              throw new Error('SourcePosition not found');
            }

            resolve(response.leaves[0].data);
          } catch (error) {
            // re-throw
            reject(new Error('Unable to parse response from ' + url + '. ' + error.message));
          }
        }; // request.onload

        request.send();
      });

      return promise;
    }
  }]);

  return ServerDataBase;
}();

exports.default = ServerDataBase;