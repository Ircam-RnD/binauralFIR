!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.createBufferLoader=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @fileOverview
 * WAVE audio library module for buffer loading.
 * @author Karim Barkati, Victor Saiz, Emmanuel Fréard, Samuel Goldszmidt
 * @version 2.0.0
 */



/**
 * Function invocation pattern for object creation.
 * @public
 */

 var createBufferLoader = function createBufferLoader() {
  'use strict';

  /**
   * ECMAScript5 property descriptors object.
   */

   var bufferLoaderObject = {

    /**
     * Main wrapper function for audio buffer loading.
     * Switch between loadBuffer and loadAll.
     * @public
     * @param fileURLs The URL(s) of the audio files to load. Accepts a URL to the audio file location or an array of URLs.
     */
     load: {
      enumerable: true,
      value: function(fileURLs) {
        if (Array.isArray(fileURLs)) {
          return this.loadAll(fileURLs);
        } else {
          return this.loadBuffer(fileURLs);
        }
      }
    },

    /**
     * Load a single audio file,
     * decode it in an AudioBuffer, return a Promise
     * @public
     * @param fileURL The URL of the audio file location to load.
     */
     loadBuffer: {
      enumerable: true,
      value: function(fileURL) {
        return this.fileLoadingRequest(fileURL)
        .then(
          this.decodeAudioData,
          function(error){
            throw error;
          });
      }
    },

    /**
     * Load all audio files at once in a single array,
     * decode them in an array of AudioBuffers,
     * and return a Promise
     * @public
     * @param fileURLs The URLs array of the audio files to load.
     */
     loadAll: {
      enumerable: true,
      value: function(fileURLs) {
        var urlsCount = fileURLs.length;
        var promises = [];
        var that = this;

        for (var i = 0; i < urlsCount; ++i) {
          promises.push(this.fileLoadingRequest(fileURLs[i]));
        }
        // We use Q instead of Promises to get the progress handler provided by Q
        return Q.all(promises)
        .then(
          function get_all_the_things(arraybuffers) {
            return Q.all(arraybuffers.map(function(arraybuffer) {
              return that.decodeAudioData(arraybuffer);
            }));
          },
          function(error){
            throw error;  // TODO: better error handler
          },
          function (progress){
            return progress;
          }
          );
      }
    },

    /**
     * Load a file asynchronously, return a Promise.
     * @private
     * @param url The URL of the audio file to load.
     */
     fileLoadingRequest: {
      enumerable: false,
      value: function(url) {
        var deferred = Q.defer();

        var promise = new Q.fcall(function(resolve, reject){
          // Load buffer asynchronously
          var request = new XMLHttpRequest();

          request.open('GET', url, true);
          request.responseType = "arraybuffer";
          request.onload = function() {
            // Test request.status value, as 404 will also get there
            if (request.status === 200 || request.status === 304) {
              deferred.resolve(request.response);
            }
            else {
              deferred.reject(new Error(request.statusText));
            }
          };
          request.onprogress = function(evt){
            deferred.notify(evt.loaded / evt.total);
          };
          // Manage network errors
          request.onerror = function() {
            deferred.reject(new Error("Network Error"));
          };
          request.send();
        });
        return deferred.promise;
      }
    },

    /**
     * Decode Audio Data, return a Promise
     * @private
     * @param arraybuffer The arraybuffer of the loaded audio file to be decoded.
     */
     decodeAudioData: {
      enumerable: false,
      value: function(arraybuffer) {
        var deferred = Q.defer();
        var promise = new Q.fcall(function(resolve, reject){
          window.audioContext.decodeAudioData(
            arraybuffer, // returned audio data array
            function successCallback(buffer) {
              deferred.resolve(buffer);
            },
            function errorCallback(error) {
              deferred.reject(new Error("DecodeAudioData error"));
            }
            );
        });
        return deferred.promise;
      }
    }
  };

  // Instantiate an object.
  var instance = Object.create({}, bufferLoaderObject);
  return instance;
};


// CommonJS function export
module.exports = createBufferLoader;

},{}]},{},[1])
(1)
});
