(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var chai = require('chai');
var audioContext = require("audio-context");
var BinauralFIR = require('../binaural-fir.es6.js');
var assert = chai.assert;
var targetNode = audioContext.destination;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
describe("BinauralFIR tests", function() {
  this.buffer = audioContext.createBuffer(1, 512, 44100);
  this.data = this.buffer.getChannelData(0);
  for (var i = 0; i < this.data.length; i++) {
    this.data[i] = (Math.random() - 0.5) * 2;
  }
  var numberOfPositions = getRandomInt(100, 200);
  this.hrtfs = [];
  for (var i = 0; i < numberOfPositions; i++) {
    var url = 'fakeURL.wav';
    var obj = {
      azimuth: getRandomInt(0, 90),
      elevation: getRandomInt(0, 90),
      distance: getRandomInt(1, 3),
      url: url,
      buffer: this.buffer
    };
    this.hrtfs.push(obj);
  }
  var self = this;
  self.binauralFIR = new BinauralFIR();
  self.binauralFIR.connect(targetNode);
  it('should set HRTF DataSet correctly', function() {
    self.binauralFIR.HRTFDataset = self.hrtfs;
    assert.equal(self.binauralFIR.HRTFDataset, self.hrtfs);
  });
  it('should detect that is crossfading', function() {
    self.binauralFIR.setPosition(0, 0, 1);
    assert.equal(self.binauralFIR.isCrossfading(), true);
  });
  it('should set position correctly', function() {
    self.binauralFIR.setPosition(10, 20, 30);
    var coord = self.binauralFIR.getRealCoordinates(10, 20, 30);
    assert.equal(self.binauralFIR.getPosition().azimuth, coord.azimuth);
    assert.equal(self.binauralFIR.getPosition().elevation, coord.elevation);
    assert.equal(self.binauralFIR.getPosition().distance, coord.distance);
  });
  it('should set crossfade duration correctly', function() {
    self.binauralFIR.setCrossfadeDuration(30);
    assert.equal(self.binauralFIR.getCrossfadeDuration(), 30);
  });
});


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/tests/tests.js
},{"../binaural-fir.es6.js":2,"audio-context":4,"chai":11}],2:[function(require,module,exports){
"use strict";
"use strict";
var __cov_D9o4h8SfqJEQqLYmix4GlA = (Function('return this'))();
if (!__cov_D9o4h8SfqJEQqLYmix4GlA.__coverage__) {
  __cov_D9o4h8SfqJEQqLYmix4GlA.__coverage__ = {};
}
__cov_D9o4h8SfqJEQqLYmix4GlA = __cov_D9o4h8SfqJEQqLYmix4GlA.__coverage__;
if (!(__cov_D9o4h8SfqJEQqLYmix4GlA['/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js'])) {
  __cov_D9o4h8SfqJEQqLYmix4GlA['/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js'] = {
    "path": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
    "s": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "16": 0,
      "17": 0,
      "18": 0,
      "19": 0,
      "20": 0,
      "21": 0,
      "22": 0,
      "23": 0,
      "24": 0,
      "25": 0,
      "26": 0,
      "27": 0,
      "28": 0,
      "29": 0,
      "30": 0,
      "31": 0,
      "32": 0,
      "33": 0,
      "34": 0,
      "35": 0,
      "36": 0,
      "37": 0,
      "38": 0,
      "39": 0,
      "40": 0,
      "41": 0,
      "42": 0,
      "43": 0,
      "44": 0,
      "45": 0,
      "46": 0,
      "47": 0,
      "48": 0,
      "49": 0,
      "50": 0,
      "51": 0,
      "52": 0,
      "53": 0,
      "54": 0,
      "55": 0,
      "56": 0,
      "57": 0,
      "58": 0,
      "59": 0,
      "60": 0,
      "61": 0,
      "62": 0,
      "63": 0,
      "64": 0,
      "65": 0,
      "66": 0,
      "67": 0,
      "68": 0,
      "69": 0,
      "70": 0,
      "71": 0,
      "72": 0,
      "73": 0,
      "74": 0,
      "75": 0,
      "76": 0,
      "77": 0,
      "78": 0,
      "79": 0,
      "80": 0,
      "81": 0,
      "82": 0,
      "83": 0,
      "84": 0,
      "85": 0,
      "86": 0,
      "87": 0,
      "88": 0,
      "89": 0,
      "90": 0,
      "91": 0,
      "92": 0,
      "93": 0,
      "94": 0,
      "95": 0,
      "96": 0,
      "97": 0,
      "98": 0,
      "99": 0,
      "100": 0,
      "101": 0,
      "102": 0,
      "103": 0,
      "104": 0,
      "105": 0,
      "106": 0,
      "107": 0,
      "108": 0,
      "109": 0,
      "110": 0,
      "111": 0,
      "112": 0,
      "113": 0,
      "114": 0,
      "115": 0,
      "116": 0
    },
    "b": {
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0, 0],
      "5": [0, 0],
      "6": [0, 0],
      "7": [0, 0],
      "8": [0, 0],
      "9": [0, 0],
      "10": [0, 0]
    },
    "f": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "16": 0,
      "17": 0,
      "18": 0,
      "19": 0,
      "20": 0,
      "21": 0,
      "22": 0,
      "23": 0,
      "24": 0
    },
    "fnMap": {
      "1": {
        "name": "BinauralFIR",
        "line": 4,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 17,
            "column": 0,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 19,
            "column": 16,
            "name": null
          }
        }
      },
      "2": {
        "name": "(anonymous_2)",
        "line": 26,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 57,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 57,
            "column": 16,
            "name": null
          }
        }
      },
      "3": {
        "name": "(anonymous_3)",
        "line": 31,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 69,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 69,
            "column": 19,
            "name": null
          }
        }
      },
      "4": {
        "name": "(anonymous_4)",
        "line": 36,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 82,
            "column": 31,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 82,
            "column": 31,
            "name": null
          }
        }
      },
      "5": {
        "name": "(anonymous_5)",
        "line": 50,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 99,
            "column": 20,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 99,
            "column": 20,
            "name": null
          }
        }
      },
      "6": {
        "name": "(anonymous_6)",
        "line": 53,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 110,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 110,
            "column": 17,
            "name": null
          }
        }
      },
      "7": {
        "name": "(anonymous_7)",
        "line": 56,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 124,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 124,
            "column": 44,
            "name": null
          }
        }
      },
      "8": {
        "name": "(anonymous_8)",
        "line": 80,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 163,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 163,
            "column": 18,
            "name": null
          }
        }
      },
      "9": {
        "name": "(anonymous_9)",
        "line": 87,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 176,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 176,
            "column": 24,
            "name": null
          }
        }
      },
      "10": {
        "name": "(anonymous_10)",
        "line": 101,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 204,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 204,
            "column": 33,
            "name": null
          }
        }
      },
      "11": {
        "name": "(anonymous_11)",
        "line": 109,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 218,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 218,
            "column": 25,
            "name": null
          }
        }
      },
      "12": {
        "name": "(anonymous_12)",
        "line": 112,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 227,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 227,
            "column": 16,
            "name": null
          }
        }
      },
      "13": {
        "name": "(anonymous_13)",
        "line": 115,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 235,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 235,
            "column": 16,
            "name": null
          }
        }
      },
      "14": {
        "name": "(anonymous_14)",
        "line": 122,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 252,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 252,
            "column": 40,
            "name": null
          }
        }
      },
      "15": {
        "name": "(anonymous_15)",
        "line": 126,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 265,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 265,
            "column": 53,
            "name": null
          }
        }
      },
      "16": {
        "name": "(anonymous_16)",
        "line": 133,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 280,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 280,
            "column": 51,
            "name": null
          }
        }
      },
      "17": {
        "name": "(anonymous_17)",
        "line": 141,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 297,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 297,
            "column": 48,
            "name": null
          }
        }
      },
      "18": {
        "name": "(anonymous_18)",
        "line": 148,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 313,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 313,
            "column": 20,
            "name": null
          }
        }
      },
      "19": {
        "name": "ConvolverAudioGraph",
        "line": 155,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 326,
            "column": 0,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 328,
            "column": 16,
            "name": null
          }
        }
      },
      "20": {
        "name": "(anonymous_20)",
        "line": 169,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 345,
            "column": 14,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 345,
            "column": 14,
            "name": null
          }
        }
      },
      "21": {
        "name": "(anonymous_21)",
        "line": 172,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 349,
            "column": 13,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 349,
            "column": 13,
            "name": null
          }
        }
      },
      "22": {
        "name": "(anonymous_22)",
        "line": 175,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 358,
            "column": 20,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 358,
            "column": 20,
            "name": null
          }
        }
      },
      "23": {
        "name": "(anonymous_23)",
        "line": 178,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 368,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 368,
            "column": 16,
            "name": null
          }
        }
      },
      "24": {
        "name": "(anonymous_24)",
        "line": 182,
        "loc": {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 379,
            "column": 2,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 379,
            "column": 19,
            "name": null
          }
        }
      }
    },
    "statementMap": {
      "1": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 10,
          "column": 0,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 10,
          "column": 24,
          "name": null
        }
      },
      "2": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 11,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 11,
          "column": 43,
          "name": null
        }
      },
      "3": {
        "start": {
          "line": 0,
          "column": 0
        },
        "end": {
          "line": 0,
          "column": 0
        },
        "skip": true
      },
      "4": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 20,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 20,
          "column": 25,
          "name": null
        }
      },
      "5": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 21,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 21,
          "column": 30,
          "name": null
        }
      },
      "6": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 22,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 22,
          "column": 18,
          "name": null
        }
      },
      "7": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 23,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 23,
          "column": 22,
          "name": null
        }
      },
      "8": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 24,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 24,
          "column": 26,
          "name": null
        }
      },
      "9": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 25,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 25,
          "column": 44,
          "name": null
        }
      },
      "10": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 26,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 26,
          "column": 31,
          "name": null
        }
      },
      "11": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 27,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 27,
          "column": 38,
          "name": null
        }
      },
      "12": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 28,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 28,
          "column": 26,
          "name": null
        }
      },
      "13": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 29,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 29,
          "column": 34,
          "name": null
        }
      },
      "14": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 30,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 30,
          "column": 39,
          "name": null
        }
      },
      "15": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 32,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 32,
          "column": 42,
          "name": null
        }
      },
      "16": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 39,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 39,
          "column": 50,
          "name": null
        }
      },
      "17": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 40,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 40,
          "column": 37,
          "name": null
        }
      },
      "18": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 41,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 41,
          "column": 48,
          "name": null
        }
      },
      "19": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 43,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 43,
          "column": 55,
          "name": null
        }
      },
      "20": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 44,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 44,
          "column": 42,
          "name": null
        }
      },
      "21": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 45,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 45,
          "column": 53,
          "name": null
        }
      },
      "22": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 47,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 47,
          "column": 15,
          "name": null
        }
      },
      "23": {
        "start": {
          "line": 0,
          "column": 0
        },
        "end": {
          "line": 0,
          "column": 0
        },
        "skip": true
      },
      "24": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 58,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 58,
          "column": 36,
          "name": null
        }
      },
      "25": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 59,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 59,
          "column": 41,
          "name": null
        }
      },
      "26": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 60,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 60,
          "column": 15,
          "name": null
        }
      },
      "27": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 70,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 70,
          "column": 39,
          "name": null
        }
      },
      "28": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 71,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 71,
          "column": 44,
          "name": null
        }
      },
      "29": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 72,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 72,
          "column": 15,
          "name": null
        }
      },
      "30": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 83,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 83,
          "column": 34,
          "name": null
        }
      },
      "31": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 84,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 84,
          "column": 52,
          "name": null
        }
      },
      "32": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 86,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 95,
          "column": 4,
          "name": null
        }
      },
      "33": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 87,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 87,
          "column": 36,
          "name": null
        }
      },
      "34": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 89,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 89,
          "column": 55,
          "name": null
        }
      },
      "35": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 90,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 90,
          "column": 59,
          "name": null
        }
      },
      "36": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 91,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 91,
          "column": 100,
          "name": null
        }
      },
      "37": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 92,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 92,
          "column": 30,
          "name": null
        }
      },
      "38": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 93,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 93,
          "column": 30,
          "name": null
        }
      },
      "39": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 94,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 94,
          "column": 30,
          "name": null
        }
      },
      "40": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 96,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 96,
          "column": 82,
          "name": null
        }
      },
      "41": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 100,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 100,
          "column": 27,
          "name": null
        }
      },
      "42": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 112,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 112,
          "column": 83,
          "name": null
        }
      },
      "43": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 126,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 156,
          "column": 4,
          "name": null
        }
      },
      "44": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 128,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 128,
          "column": 81,
          "name": null
        }
      },
      "45": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 130,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 155,
          "column": 6,
          "name": null
        }
      },
      "46": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 132,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 152,
          "column": 8,
          "name": null
        }
      },
      "47": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 134,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 139,
          "column": 10,
          "name": null
        }
      },
      "48": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 136,
          "column": 12,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 136,
          "column": 42,
          "name": null
        }
      },
      "49": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 138,
          "column": 12,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 138,
          "column": 51,
          "name": null
        }
      },
      "50": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 141,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 141,
          "column": 61,
          "name": null
        }
      },
      "51": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 142,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 142,
          "column": 65,
          "name": null
        }
      },
      "52": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 143,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 143,
          "column": 63,
          "name": null
        }
      },
      "53": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 146,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 146,
          "column": 86,
          "name": null
        }
      },
      "54": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 148,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 148,
          "column": 61,
          "name": null
        }
      },
      "55": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 149,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 149,
          "column": 65,
          "name": null
        }
      },
      "56": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 150,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 150,
          "column": 63,
          "name": null
        }
      },
      "57": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 151,
          "column": 10,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 151,
          "column": 36,
          "name": null
        }
      },
      "58": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 154,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 154,
          "column": 19,
          "name": null
        }
      },
      "59": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 165,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 169,
          "column": 4,
          "name": null
        }
      },
      "60": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 166,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 166,
          "column": 17,
          "name": null
        }
      },
      "61": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 168,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 168,
          "column": 18,
          "name": null
        }
      },
      "62": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 179,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 179,
          "column": 53,
          "name": null
        }
      },
      "63": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 180,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 180,
          "column": 57,
          "name": null
        }
      },
      "64": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 181,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 181,
          "column": 55,
          "name": null
        }
      },
      "65": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 183,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 183,
          "column": 121,
          "name": null
        }
      },
      "66": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 185,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 185,
          "column": 22,
          "name": null
        }
      },
      "67": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 188,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 188,
          "column": 35,
          "name": null
        }
      },
      "68": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 189,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 189,
          "column": 48,
          "name": null
        }
      },
      "69": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 190,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 190,
          "column": 36,
          "name": null
        }
      },
      "70": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 192,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 195,
          "column": 4,
          "name": null
        }
      },
      "71": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 193,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 193,
          "column": 46,
          "name": null
        }
      },
      "72": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 194,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 194,
          "column": 36,
          "name": null
        }
      },
      "73": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 205,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 211,
          "column": 4,
          "name": null
        }
      },
      "74": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 207,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 207,
          "column": 46,
          "name": null
        }
      },
      "75": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 208,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 208,
          "column": 17,
          "name": null
        }
      },
      "76": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 210,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 210,
          "column": 45,
          "name": null
        }
      },
      "77": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 220,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 220,
          "column": 40,
          "name": null
        }
      },
      "78": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 228,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 228,
          "column": 24,
          "name": null
        }
      },
      "79": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 237,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 237,
          "column": 28,
          "name": null
        }
      },
      "80": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 238,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 238,
          "column": 87,
          "name": null
        }
      },
      "81": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 239,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 239,
          "column": 121,
          "name": null
        }
      },
      "82": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 241,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 241,
          "column": 92,
          "name": null
        }
      },
      "83": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 242,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 242,
          "column": 126,
          "name": null
        }
      },
      "84": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 253,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 253,
          "column": 68,
          "name": null
        }
      },
      "85": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 255,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 255,
          "column": 25,
          "name": null
        }
      },
      "86": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 266,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 270,
          "column": 4,
          "name": null
        }
      },
      "87": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 281,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 281,
          "column": 68,
          "name": null
        }
      },
      "88": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 283,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 287,
          "column": 4,
          "name": null
        }
      },
      "89": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 299,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 299,
          "column": 48,
          "name": null
        }
      },
      "90": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 300,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 300,
          "column": 52,
          "name": null
        }
      },
      "91": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 302,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 302,
          "column": 94,
          "name": null
        }
      },
      "92": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 304,
          "column": 8,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 304,
          "column": 57,
          "name": null
        }
      },
      "93": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 306,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 306,
          "column": 21,
          "name": null
        }
      },
      "94": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 314,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 316,
          "column": 4,
          "name": null
        }
      },
      "95": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 315,
          "column": 6,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 315,
          "column": 32,
          "name": null
        }
      },
      "96": {
        "start": {
          "line": 0,
          "column": 0
        },
        "end": {
          "line": 0,
          "column": 0
        },
        "skip": true
      },
      "97": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 329,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 329,
          "column": 45,
          "name": null
        }
      },
      "98": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 330,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 330,
          "column": 50,
          "name": null
        }
      },
      "99": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 331,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 331,
          "column": 35,
          "name": null
        }
      },
      "100": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 332,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 332,
          "column": 40,
          "name": null
        }
      },
      "101": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 335,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 335,
          "column": 57,
          "name": null
        }
      },
      "102": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 336,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 336,
          "column": 55,
          "name": null
        }
      },
      "103": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 337,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 337,
          "column": 56,
          "name": null
        }
      },
      "104": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 338,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 338,
          "column": 50,
          "name": null
        }
      },
      "105": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 339,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 339,
          "column": 42,
          "name": null
        }
      },
      "106": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 340,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 340,
          "column": 32,
          "name": null
        }
      },
      "107": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 342,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 342,
          "column": 15,
          "name": null
        }
      },
      "108": {
        "start": {
          "line": 0,
          "column": 0
        },
        "end": {
          "line": 0,
          "column": 0
        },
        "skip": true
      },
      "109": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 346,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 346,
          "column": 24,
          "name": null
        }
      },
      "110": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 350,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 350,
          "column": 29,
          "name": null
        }
      },
      "111": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 359,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 359,
          "column": 32,
          "name": null
        }
      },
      "112": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 369,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 369,
          "column": 31,
          "name": null
        }
      },
      "113": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 370,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 370,
          "column": 15,
          "name": null
        }
      },
      "114": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 380,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 380,
          "column": 34,
          "name": null
        }
      },
      "115": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 381,
          "column": 4,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 381,
          "column": 15,
          "name": null
        }
      },
      "116": {
        "start": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 387,
          "column": 0,
          "name": null
        },
        "end": {
          "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
          "line": 387,
          "column": 28,
          "name": null
        }
      }
    },
    "branchMap": {
      "1": {
        "line": 57,
        "type": "if",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 126,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 126,
            "column": 4,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 126,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 126,
            "column": 4,
            "name": null
          }
        }]
      },
      "2": {
        "line": 57,
        "type": "binary-expr",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 126,
            "column": 8,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 126,
            "column": 29,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 126,
            "column": 34,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 126,
            "column": 58,
            "name": null
          }
        }]
      },
      "3": {
        "line": 59,
        "type": "if",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 6,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 6,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 6,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 6,
            "name": null
          }
        }]
      },
      "4": {
        "line": 59,
        "type": "binary-expr",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 10,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 58,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 63,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 115,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 120,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 130,
            "column": 173,
            "name": null
          }
        }]
      },
      "5": {
        "line": 60,
        "type": "if",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 132,
            "column": 8,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 132,
            "column": 8,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 132,
            "column": 8,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 132,
            "column": 8,
            "name": null
          }
        }]
      },
      "6": {
        "line": 61,
        "type": "if",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 134,
            "column": 10,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 134,
            "column": 10,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 134,
            "column": 10,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 134,
            "column": 10,
            "name": null
          }
        }]
      },
      "7": {
        "line": 81,
        "type": "if",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 165,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 165,
            "column": 4,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 165,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 165,
            "column": 4,
            "name": null
          }
        }]
      },
      "8": {
        "line": 96,
        "type": "if",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 192,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 192,
            "column": 4,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 192,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 192,
            "column": 4,
            "name": null
          }
        }]
      },
      "9": {
        "line": 102,
        "type": "if",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 205,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 205,
            "column": 4,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 205,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 205,
            "column": 4,
            "name": null
          }
        }]
      },
      "10": {
        "line": 149,
        "type": "if",
        "locations": [{
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 314,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 314,
            "column": 4,
            "name": null
          }
        }, {
          "start": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 314,
            "column": 4,
            "name": null
          },
          "end": {
            "source": "/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js",
            "line": 314,
            "column": 4,
            "name": null
          }
        }]
      }
    }
  };
}
__cov_D9o4h8SfqJEQqLYmix4GlA = __cov_D9o4h8SfqJEQqLYmix4GlA['/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js'];
__cov_D9o4h8SfqJEQqLYmix4GlA.s['1']++;
var kdt = require('kdt');
__cov_D9o4h8SfqJEQqLYmix4GlA.s['2']++;
var audioContext = require('audio-context');
__cov_D9o4h8SfqJEQqLYmix4GlA.s['3']++;
var BinauralFIR = function BinauralFIR() {
  __cov_D9o4h8SfqJEQqLYmix4GlA.f['1']++;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['4']++;
  this.hrtfDataset = [];
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['5']++;
  this.hrtfDatasetLength = 0;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['6']++;
  this.tree = -1;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['7']++;
  this.position = {};
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['8']++;
  this.nextPosition = {};
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['9']++;
  this.changeWhenFinishCrossfading = false;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['10']++;
  this.intervalID = undefined;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['11']++;
  this.crossfadeDuration = 20 / 1000;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['12']++;
  this.input = undefined;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['13']++;
  this.mainConvolver = undefined;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['14']++;
  this.secondaryConvolver = undefined;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['15']++;
  this.input = audioContext.createGain();
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['16']++;
  this.mainConvolver = new ConvolverAudioGraph();
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['17']++;
  this.mainConvolver.gain.value = 1;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['18']++;
  this.input.connect(this.mainConvolver.input);
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['19']++;
  this.secondaryConvolver = new ConvolverAudioGraph();
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['20']++;
  this.secondaryConvolver.gain.value = 0;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['21']++;
  this.input.connect(this.secondaryConvolver.input);
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['22']++;
  return this;
};
__cov_D9o4h8SfqJEQqLYmix4GlA.s['23']++;
$traceurRuntime.createClass(BinauralFIR, {
  connect: function(node) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['2']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['24']++;
    this.mainConvolver.connect(node);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['25']++;
    this.secondaryConvolver.connect(node);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['26']++;
    return this;
  },
  disconnect: function(node) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['3']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['27']++;
    this.mainConvolver.disconnect(node);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['28']++;
    this.secondaryConvolver.disconnect(node);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['29']++;
    return this;
  },
  set HRTFDataset(hrtfDataset) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['4']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['30']++;
    this.hrtfDataset = hrtfDataset;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['31']++;
    this.hrtfDatasetLength = this.hrtfDataset.length;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['32']++;
    for (var i = 0; i < this.hrtfDatasetLength; i++) {
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['33']++;
      var hrtf = this.hrtfDataset[i];
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['34']++;
      var azimuthRadians = hrtf.azimuth * Math.PI / 180;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['35']++;
      var elevationRadians = hrtf.elevation * Math.PI / 180;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['36']++;
      var catesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, hrtf.distance);
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['37']++;
      hrtf.x = catesianCoord.x;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['38']++;
      hrtf.y = catesianCoord.y;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['39']++;
      hrtf.z = catesianCoord.z;
    }
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['40']++;
    this.tree = kdt.createKdTree(this.hrtfDataset, this.distance, ['x', 'y', 'z']);
  },
  get HRTFDataset() {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['5']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['41']++;
    return this.hrtfDataset;
  },
  distance: function(a, b) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['6']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['42']++;
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);
  },
  setPosition: function(azimuth, elevation, distance) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['7']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['43']++;
    if ((__cov_D9o4h8SfqJEQqLYmix4GlA.b['2'][0]++, arguments.length === 3) || (__cov_D9o4h8SfqJEQqLYmix4GlA.b['2'][1]++, arguments.length === 4)) {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['1'][0]++;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['44']++;
      var nearestPosition = this.getRealCoordinates(azimuth, elevation, distance);
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['45']++;
      if ((__cov_D9o4h8SfqJEQqLYmix4GlA.b['4'][0]++, nearestPosition.azimuth !== this.position.azimuth) || (__cov_D9o4h8SfqJEQqLYmix4GlA.b['4'][1]++, nearestPosition.elevation !== this.position.elevation) || (__cov_D9o4h8SfqJEQqLYmix4GlA.b['4'][2]++, nearestPosition.distance !== this.position.distance)) {
        __cov_D9o4h8SfqJEQqLYmix4GlA.b['3'][0]++;
        __cov_D9o4h8SfqJEQqLYmix4GlA.s['46']++;
        if (this.isCrossfading() === true) {
          __cov_D9o4h8SfqJEQqLYmix4GlA.b['5'][0]++;
          __cov_D9o4h8SfqJEQqLYmix4GlA.s['47']++;
          if (this.changeWhenFinishCrossfading === true) {
            __cov_D9o4h8SfqJEQqLYmix4GlA.b['6'][0]++;
            __cov_D9o4h8SfqJEQqLYmix4GlA.s['48']++;
            clearInterval(this.intervalID);
          } else {
            __cov_D9o4h8SfqJEQqLYmix4GlA.b['6'][1]++;
            __cov_D9o4h8SfqJEQqLYmix4GlA.s['49']++;
            this.changeWhenFinishCrossfading = true;
          }
          __cov_D9o4h8SfqJEQqLYmix4GlA.s['50']++;
          this.nextPosition.azimuth = nearestPosition.azimuth;
          __cov_D9o4h8SfqJEQqLYmix4GlA.s['51']++;
          this.nextPosition.elevation = nearestPosition.elevation;
          __cov_D9o4h8SfqJEQqLYmix4GlA.s['52']++;
          this.nextPosition.distance = nearestPosition.distance;
          __cov_D9o4h8SfqJEQqLYmix4GlA.s['53']++;
          this.intervalID = window.setInterval(this.setLastPosition.bind(this), 0.005);
        } else {
          __cov_D9o4h8SfqJEQqLYmix4GlA.b['5'][1]++;
          __cov_D9o4h8SfqJEQqLYmix4GlA.s['54']++;
          this.nextPosition.azimuth = nearestPosition.azimuth;
          __cov_D9o4h8SfqJEQqLYmix4GlA.s['55']++;
          this.nextPosition.elevation = nearestPosition.elevation;
          __cov_D9o4h8SfqJEQqLYmix4GlA.s['56']++;
          this.nextPosition.distance = nearestPosition.distance;
          __cov_D9o4h8SfqJEQqLYmix4GlA.s['57']++;
          this.reallyStartPosition();
        }
        __cov_D9o4h8SfqJEQqLYmix4GlA.s['58']++;
        return this;
      } else {
        __cov_D9o4h8SfqJEQqLYmix4GlA.b['3'][1]++;
      }
    } else {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['1'][1]++;
    }
  },
  isCrossfading: function() {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['8']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['59']++;
    if (this.mainConvolver.gain.value !== 1) {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['7'][0]++;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['60']++;
      return true;
    } else {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['7'][1]++;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['61']++;
      return false;
    }
  },
  reallyStartPosition: function() {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['9']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['62']++;
    this.position.azimuth = this.nextPosition.azimuth;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['63']++;
    this.position.elevation = this.nextPosition.elevation;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['64']++;
    this.position.distance = this.nextPosition.distance;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['65']++;
    this.secondaryConvolver.buffer = this.getHRTF(this.position.azimuth, this.position.elevation, this.position.distance);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['66']++;
    this.crossfading();
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['67']++;
    var active = this.mainConvolver;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['68']++;
    this.mainConvolver = this.secondaryConvolver;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['69']++;
    this.secondaryConvolver = active;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['70']++;
    if (this.changeWhenFinishCrossfading) {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['8'][0]++;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['71']++;
      this.changeWhenFinishCrossfading = false;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['72']++;
      clearInterval(this.intervalID);
    } else {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['8'][1]++;
    }
  },
  setCrossfadeDuration: function(duration) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['10']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['73']++;
    if (duration) {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['9'][0]++;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['74']++;
      this.crossfadeDuration = duration / 1000;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['75']++;
      return this;
    } else {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['9'][1]++;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['76']++;
      throw 'CrossfadeDuration setting error';
    }
  },
  getCrossfadeDuration: function() {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['11']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['77']++;
    return this.crossfadeDuration * 1000;
  },
  getPosition: function() {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['12']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['78']++;
    return this.position;
  },
  crossfading: function() {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['13']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['79']++;
    var guardInterval = 0.02;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['80']++;
    this.mainConvolver.gain.setValueAtTime(1, audioContext.currentTime + guardInterval);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['81']++;
    this.mainConvolver.gain.linearRampToValueAtTime(0, audioContext.currentTime + guardInterval + this.crossfadeDuration);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['82']++;
    this.secondaryConvolver.gain.setValueAtTime(0, audioContext.currentTime + guardInterval);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['83']++;
    this.secondaryConvolver.gain.linearRampToValueAtTime(1, audioContext.currentTime + guardInterval + this.crossfadeDuration);
  },
  getHRTF: function(azimuth, elevation, distance) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['14']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['84']++;
    var nearest = this.getNearestPoint(azimuth, elevation, distance);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['85']++;
    return nearest.buffer;
  },
  sphericalToCartesian: function(azimuth, elevation, distance) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['15']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['86']++;
    return {
      x: distance * Math.sin(azimuth),
      y: distance * Math.cos(azimuth),
      z: distance * Math.sin(elevation)
    };
  },
  getRealCoordinates: function(azimuth, elevation, distance) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['16']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['87']++;
    var nearest = this.getNearestPoint(azimuth, elevation, distance);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['88']++;
    return {
      azimuth: nearest.azimuth,
      elevation: nearest.elevation,
      distance: nearest.distance
    };
  },
  getNearestPoint: function(azimuth, elevation, distance) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['17']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['89']++;
    var azimuthRadians = azimuth * Math.PI / 180;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['90']++;
    var elevationRadians = elevation * Math.PI / 180;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['91']++;
    var cartesianCoord = this.sphericalToCartesian(azimuthRadians, elevationRadians, distance);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['92']++;
    var nearest = this.tree.nearest(cartesianCoord, 1)[0];
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['93']++;
    return nearest[0];
  },
  setLastPosition: function() {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['18']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['94']++;
    if (!this.isCrossfading()) {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['10'][0]++;
      __cov_D9o4h8SfqJEQqLYmix4GlA.s['95']++;
      this.reallyStartPosition();
    } else {
      __cov_D9o4h8SfqJEQqLYmix4GlA.b['10'][1]++;
    }
  }
}, {});
;
__cov_D9o4h8SfqJEQqLYmix4GlA.s['96']++;
var ConvolverAudioGraph = function ConvolverAudioGraph() {
  __cov_D9o4h8SfqJEQqLYmix4GlA.f['19']++;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['97']++;
  this.gainNode = audioContext.createGain();
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['98']++;
  this.convNode = audioContext.createConvolver();
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['99']++;
  this.convNode.normalize = false;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['100']++;
  this.gainNode.connect(this.convNode);
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['101']++;
  this.oscillatorNode = audioContext.createOscillator();
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['102']++;
  this.gainOscillatorNode = audioContext.createGain();
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['103']++;
  this.oscillatorNode.connect(this.gainOscillatorNode);
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['104']++;
  this.gainOscillatorNode.connect(this.gainNode);
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['105']++;
  this.gainOscillatorNode.gain.value = 0;
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['106']++;
  this.oscillatorNode.start(0);
  __cov_D9o4h8SfqJEQqLYmix4GlA.s['107']++;
  return this;
};
__cov_D9o4h8SfqJEQqLYmix4GlA.s['108']++;
$traceurRuntime.createClass(ConvolverAudioGraph, {
  get input() {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['20']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['109']++;
    return this.gainNode;
  },
  get gain() {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['21']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['110']++;
    return this.gainNode.gain;
  },
  set buffer(value) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['22']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['111']++;
    this.convNode.buffer = value;
  },
  connect: function(node) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['23']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['112']++;
    this.convNode.connect(node);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['113']++;
    return this;
  },
  disconnect: function(node) {
    __cov_D9o4h8SfqJEQqLYmix4GlA.f['24']++;
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['114']++;
    this.convNode.disconnect(node);
    __cov_D9o4h8SfqJEQqLYmix4GlA.s['115']++;
    return this;
  }
}, {});
;
__cov_D9o4h8SfqJEQqLYmix4GlA.s['116']++;
module.exports = BinauralFIR;


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/binaural-fir.es6.js
},{"audio-context":4,"kdt":44}],3:[function(require,module,exports){
"use strict";
(function(global, exports, perf) {
  'use strict';
  function fixSetTarget(param) {
    if (!param)
      return;
    if (!param.setTargetAtTime)
      param.setTargetAtTime = param.setTargetValueAtTime;
  }
  if (window.hasOwnProperty('webkitAudioContext') && !window.hasOwnProperty('AudioContext')) {
    window.AudioContext = webkitAudioContext;
    if (!AudioContext.prototype.hasOwnProperty('createGain'))
      AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
    if (!AudioContext.prototype.hasOwnProperty('createDelay'))
      AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode;
    if (!AudioContext.prototype.hasOwnProperty('createScriptProcessor'))
      AudioContext.prototype.createScriptProcessor = AudioContext.prototype.createJavaScriptNode;
    if (!AudioContext.prototype.hasOwnProperty('createPeriodicWave'))
      AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable;
    AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain;
    AudioContext.prototype.createGain = function() {
      var node = this.internal_createGain();
      fixSetTarget(node.gain);
      return node;
    };
    AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay;
    AudioContext.prototype.createDelay = function(maxDelayTime) {
      var node = maxDelayTime ? this.internal_createDelay(maxDelayTime) : this.internal_createDelay();
      fixSetTarget(node.delayTime);
      return node;
    };
    AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource;
    AudioContext.prototype.createBufferSource = function() {
      var node = this.internal_createBufferSource();
      if (!node.start) {
        node.start = function(when, offset, duration) {
          if (offset || duration)
            this.noteGrainOn(when, offset, duration);
          else
            this.noteOn(when);
        };
      }
      if (!node.stop)
        node.stop = node.noteOff;
      fixSetTarget(node.playbackRate);
      return node;
    };
    AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor;
    AudioContext.prototype.createDynamicsCompressor = function() {
      var node = this.internal_createDynamicsCompressor();
      fixSetTarget(node.threshold);
      fixSetTarget(node.knee);
      fixSetTarget(node.ratio);
      fixSetTarget(node.reduction);
      fixSetTarget(node.attack);
      fixSetTarget(node.release);
      return node;
    };
    AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter;
    AudioContext.prototype.createBiquadFilter = function() {
      var node = this.internal_createBiquadFilter();
      fixSetTarget(node.frequency);
      fixSetTarget(node.detune);
      fixSetTarget(node.Q);
      fixSetTarget(node.gain);
      return node;
    };
    if (AudioContext.prototype.hasOwnProperty('createOscillator')) {
      AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator;
      AudioContext.prototype.createOscillator = function() {
        var node = this.internal_createOscillator();
        if (!node.start)
          node.start = node.noteOn;
        if (!node.stop)
          node.stop = node.noteOff;
        if (!node.setPeriodicWave)
          node.setPeriodicWave = node.setWaveTable;
        fixSetTarget(node.frequency);
        fixSetTarget(node.detune);
        return node;
      };
    }
  }
}(window));


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/audio-context/ac-monkeypatch.js
},{}],4:[function(require,module,exports){
"use strict";
require('./ac-monkeypatch');
window.waves = window.waves || {};
module.exports = window.waves.audioContext = window.waves.audioContext || new AudioContext();


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/audio-context/audio-context.js
},{"./ac-monkeypatch":3}],5:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length, 2)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length, unitSize) {
  if (unitSize) length -= length % unitSize;
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":6,"ieee754":7,"is-array":8}],6:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],7:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],8:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],9:[function(require,module,exports){
(function (process){
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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":10}],10:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],11:[function(require,module,exports){
"use strict";
module.exports = require('./lib/chai');


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/index.js
},{"./lib/chai":12}],12:[function(require,module,exports){
"use strict";
var used = [],
    exports = module.exports = {};
exports.version = '1.10.0';
exports.AssertionError = require('assertion-error');
var util = require('./chai/utils');
exports.use = function(fn) {
  if (!~used.indexOf(fn)) {
    fn(this, util);
    used.push(fn);
  }
  return this;
};
var config = require('./chai/config');
exports.config = config;
var assertion = require('./chai/assertion');
exports.use(assertion);
var core = require('./chai/core/assertions');
exports.use(core);
var expect = require('./chai/interface/expect');
exports.use(expect);
var should = require('./chai/interface/should');
exports.use(should);
var assert = require('./chai/interface/assert');
exports.use(assert);


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai.js
},{"./chai/assertion":13,"./chai/config":14,"./chai/core/assertions":15,"./chai/interface/assert":16,"./chai/interface/expect":17,"./chai/interface/should":18,"./chai/utils":29,"assertion-error":38}],13:[function(require,module,exports){
"use strict";
var config = require('./config');
var NOOP = function() {};
module.exports = function(_chai, util) {
  var AssertionError = _chai.AssertionError,
      flag = util.flag;
  _chai.Assertion = Assertion;
  function Assertion(obj, msg, stack) {
    flag(this, 'ssfi', stack || arguments.callee);
    flag(this, 'object', obj);
    flag(this, 'message', msg);
  }
  Object.defineProperty(Assertion, 'includeStack', {
    get: function() {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      return config.includeStack;
    },
    set: function(value) {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      config.includeStack = value;
    }
  });
  Object.defineProperty(Assertion, 'showDiff', {
    get: function() {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      return config.showDiff;
    },
    set: function(value) {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      config.showDiff = value;
    }
  });
  Assertion.addProperty = function(name, fn) {
    util.addProperty(this.prototype, name, fn);
  };
  Assertion.addMethod = function(name, fn) {
    util.addMethod(this.prototype, name, fn);
  };
  Assertion.addChainableMethod = function(name, fn, chainingBehavior) {
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };
  Assertion.addChainableNoop = function(name, fn) {
    util.addChainableMethod(this.prototype, name, NOOP, fn);
  };
  Assertion.overwriteProperty = function(name, fn) {
    util.overwriteProperty(this.prototype, name, fn);
  };
  Assertion.overwriteMethod = function(name, fn) {
    util.overwriteMethod(this.prototype, name, fn);
  };
  Assertion.overwriteChainableMethod = function(name, fn, chainingBehavior) {
    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
  };
  Assertion.prototype.assert = function(expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (true !== showDiff)
      showDiff = false;
    if (true !== config.showDiff)
      showDiff = false;
    if (!ok) {
      var msg = util.getMessage(this, arguments),
          actual = util.getActual(this, arguments);
      throw new AssertionError(msg, {
        actual: actual,
        expected: expected,
        showDiff: showDiff
      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
  };
  Object.defineProperty(Assertion.prototype, '_obj', {
    get: function() {
      return flag(this, 'object');
    },
    set: function(val) {
      flag(this, 'object', val);
    }
  });
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/assertion.js
},{"./config":14}],14:[function(require,module,exports){
"use strict";
module.exports = {
  includeStack: false,
  showDiff: true,
  truncateThreshold: 40
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/config.js
},{}],15:[function(require,module,exports){
"use strict";
module.exports = function(chai, _) {
  var Assertion = chai.Assertion,
      toString = Object.prototype.toString,
      flag = _.flag;
  ['to', 'be', 'been', 'is', 'and', 'has', 'have', 'with', 'that', 'at', 'of', 'same'].forEach(function(chain) {
    Assertion.addProperty(chain, function() {
      return this;
    });
  });
  Assertion.addProperty('not', function() {
    flag(this, 'negate', true);
  });
  Assertion.addProperty('deep', function() {
    flag(this, 'deep', true);
  });
  function an(type, msg) {
    if (msg)
      flag(this, 'message', msg);
    type = type.toLowerCase();
    var obj = flag(this, 'object'),
        article = ~['a', 'e', 'i', 'o', 'u'].indexOf(type.charAt(0)) ? 'an ' : 'a ';
    this.assert(type === _.type(obj), 'expected #{this} to be ' + article + type, 'expected #{this} not to be ' + article + type);
  }
  Assertion.addChainableMethod('an', an);
  Assertion.addChainableMethod('a', an);
  function includeChainingBehavior() {
    flag(this, 'contains', true);
  }
  function include(val, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var expected = false;
    if (_.type(obj) === 'array' && _.type(val) === 'object') {
      for (var i in obj) {
        if (_.eql(obj[i], val)) {
          expected = true;
          break;
        }
      }
    } else if (_.type(val) === 'object') {
      if (!flag(this, 'negate')) {
        for (var k in val)
          new Assertion(obj).property(k, val[k]);
        return;
      }
      var subset = {};
      for (var k in val)
        subset[k] = obj[k];
      expected = _.eql(subset, val);
    } else {
      expected = obj && ~obj.indexOf(val);
    }
    this.assert(expected, 'expected #{this} to include ' + _.inspect(val), 'expected #{this} to not include ' + _.inspect(val));
  }
  Assertion.addChainableMethod('include', include, includeChainingBehavior);
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
  Assertion.addChainableNoop('ok', function() {
    this.assert(flag(this, 'object'), 'expected #{this} to be truthy', 'expected #{this} to be falsy');
  });
  Assertion.addChainableNoop('true', function() {
    this.assert(true === flag(this, 'object'), 'expected #{this} to be true', 'expected #{this} to be false', this.negate ? false : true);
  });
  Assertion.addChainableNoop('false', function() {
    this.assert(false === flag(this, 'object'), 'expected #{this} to be false', 'expected #{this} to be true', this.negate ? true : false);
  });
  Assertion.addChainableNoop('null', function() {
    this.assert(null === flag(this, 'object'), 'expected #{this} to be null', 'expected #{this} not to be null');
  });
  Assertion.addChainableNoop('undefined', function() {
    this.assert(undefined === flag(this, 'object'), 'expected #{this} to be undefined', 'expected #{this} not to be undefined');
  });
  Assertion.addChainableNoop('exist', function() {
    this.assert(null != flag(this, 'object'), 'expected #{this} to exist', 'expected #{this} to not exist');
  });
  Assertion.addChainableNoop('empty', function() {
    var obj = flag(this, 'object'),
        expected = obj;
    if (Array.isArray(obj) || 'string' === typeof object) {
      expected = obj.length;
    } else if (typeof obj === 'object') {
      expected = Object.keys(obj).length;
    }
    this.assert(!expected, 'expected #{this} to be empty', 'expected #{this} not to be empty');
  });
  function checkArguments() {
    var obj = flag(this, 'object'),
        type = Object.prototype.toString.call(obj);
    this.assert('[object Arguments]' === type, 'expected #{this} to be arguments but got ' + type, 'expected #{this} to not be arguments');
  }
  Assertion.addChainableNoop('arguments', checkArguments);
  Assertion.addChainableNoop('Arguments', checkArguments);
  function assertEqual(val, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'deep')) {
      return this.eql(val);
    } else {
      this.assert(val === obj, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', val, this._obj, true);
    }
  }
  Assertion.addMethod('equal', assertEqual);
  Assertion.addMethod('equals', assertEqual);
  Assertion.addMethod('eq', assertEqual);
  function assertEql(obj, msg) {
    if (msg)
      flag(this, 'message', msg);
    this.assert(_.eql(obj, flag(this, 'object')), 'expected #{this} to deeply equal #{exp}', 'expected #{this} to not deeply equal #{exp}', obj, this._obj, true);
  }
  Assertion.addMethod('eql', assertEql);
  Assertion.addMethod('eqls', assertEql);
  function assertAbove(n, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(len > n, 'expected #{this} to have a length above #{exp} but got #{act}', 'expected #{this} to not have a length above #{exp}', n, len);
    } else {
      this.assert(obj > n, 'expected #{this} to be above ' + n, 'expected #{this} to be at most ' + n);
    }
  }
  Assertion.addMethod('above', assertAbove);
  Assertion.addMethod('gt', assertAbove);
  Assertion.addMethod('greaterThan', assertAbove);
  function assertLeast(n, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(len >= n, 'expected #{this} to have a length at least #{exp} but got #{act}', 'expected #{this} to have a length below #{exp}', n, len);
    } else {
      this.assert(obj >= n, 'expected #{this} to be at least ' + n, 'expected #{this} to be below ' + n);
    }
  }
  Assertion.addMethod('least', assertLeast);
  Assertion.addMethod('gte', assertLeast);
  function assertBelow(n, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(len < n, 'expected #{this} to have a length below #{exp} but got #{act}', 'expected #{this} to not have a length below #{exp}', n, len);
    } else {
      this.assert(obj < n, 'expected #{this} to be below ' + n, 'expected #{this} to be at least ' + n);
    }
  }
  Assertion.addMethod('below', assertBelow);
  Assertion.addMethod('lt', assertBelow);
  Assertion.addMethod('lessThan', assertBelow);
  function assertMost(n, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(len <= n, 'expected #{this} to have a length at most #{exp} but got #{act}', 'expected #{this} to have a length above #{exp}', n, len);
    } else {
      this.assert(obj <= n, 'expected #{this} to be at most ' + n, 'expected #{this} to be above ' + n);
    }
  }
  Assertion.addMethod('most', assertMost);
  Assertion.addMethod('lte', assertMost);
  Assertion.addMethod('within', function(start, finish, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object'),
        range = start + '..' + finish;
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(len >= start && len <= finish, 'expected #{this} to have a length within ' + range, 'expected #{this} to not have a length within ' + range);
    } else {
      this.assert(obj >= start && obj <= finish, 'expected #{this} to be within ' + range, 'expected #{this} to not be within ' + range);
    }
  });
  function assertInstanceOf(constructor, msg) {
    if (msg)
      flag(this, 'message', msg);
    var name = _.getName(constructor);
    this.assert(flag(this, 'object') instanceof constructor, 'expected #{this} to be an instance of ' + name, 'expected #{this} to not be an instance of ' + name);
  }
  ;
  Assertion.addMethod('instanceof', assertInstanceOf);
  Assertion.addMethod('instanceOf', assertInstanceOf);
  Assertion.addMethod('property', function(name, val, msg) {
    if (msg)
      flag(this, 'message', msg);
    var descriptor = flag(this, 'deep') ? 'deep property ' : 'property ',
        negate = flag(this, 'negate'),
        obj = flag(this, 'object'),
        value = flag(this, 'deep') ? _.getPathValue(name, obj) : obj[name];
    if (negate && undefined !== val) {
      if (undefined === value) {
        msg = (msg != null) ? msg + ': ' : '';
        throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));
      }
    } else {
      this.assert(undefined !== value, 'expected #{this} to have a ' + descriptor + _.inspect(name), 'expected #{this} to not have ' + descriptor + _.inspect(name));
    }
    if (undefined !== val) {
      this.assert(val === value, 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}', 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}', val, value);
    }
    flag(this, 'object', value);
  });
  function assertOwnProperty(name, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(obj.hasOwnProperty(name), 'expected #{this} to have own property ' + _.inspect(name), 'expected #{this} to not have own property ' + _.inspect(name));
  }
  Assertion.addMethod('ownProperty', assertOwnProperty);
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);
  function assertLengthChain() {
    flag(this, 'doLength', true);
  }
  function assertLength(n, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).to.have.property('length');
    var len = obj.length;
    this.assert(len == n, 'expected #{this} to have a length of #{exp} but got #{act}', 'expected #{this} to not have a length of #{act}', n, len);
  }
  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
  Assertion.addMethod('lengthOf', assertLength);
  Assertion.addMethod('match', function(re, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(re.exec(obj), 'expected #{this} to match ' + re, 'expected #{this} not to match ' + re);
  });
  Assertion.addMethod('string', function(str, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).is.a('string');
    this.assert(~obj.indexOf(str), 'expected #{this} to contain ' + _.inspect(str), 'expected #{this} to not contain ' + _.inspect(str));
  });
  function assertKeys(keys) {
    var obj = flag(this, 'object'),
        str,
        ok = true;
    keys = keys instanceof Array ? keys : Array.prototype.slice.call(arguments);
    if (!keys.length)
      throw new Error('keys required');
    var actual = Object.keys(obj),
        expected = keys,
        len = keys.length;
    ok = keys.every(function(key) {
      return ~actual.indexOf(key);
    });
    if (!flag(this, 'negate') && !flag(this, 'contains')) {
      ok = ok && keys.length == actual.length;
    }
    if (len > 1) {
      keys = keys.map(function(key) {
        return _.inspect(key);
      });
      var last = keys.pop();
      str = keys.join(', ') + ', and ' + last;
    } else {
      str = _.inspect(keys[0]);
    }
    str = (len > 1 ? 'keys ' : 'key ') + str;
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;
    this.assert(ok, 'expected #{this} to ' + str, 'expected #{this} to not ' + str, expected.sort(), actual.sort(), true);
  }
  Assertion.addMethod('keys', assertKeys);
  Assertion.addMethod('key', assertKeys);
  function assertThrows(constructor, errMsg, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).is.a('function');
    var thrown = false,
        desiredError = null,
        name = null,
        thrownError = null;
    if (arguments.length === 0) {
      errMsg = null;
      constructor = null;
    } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
      errMsg = constructor;
      constructor = null;
    } else if (constructor && constructor instanceof Error) {
      desiredError = constructor;
      constructor = null;
      errMsg = null;
    } else if (typeof constructor === 'function') {
      name = constructor.prototype.name || constructor.name;
      if (name === 'Error' && constructor !== Error) {
        name = (new constructor()).name;
      }
    } else {
      constructor = null;
    }
    try {
      obj();
    } catch (err) {
      if (desiredError) {
        this.assert(err === desiredError, 'expected #{this} to throw #{exp} but #{act} was thrown', 'expected #{this} to not throw #{exp}', (desiredError instanceof Error ? desiredError.toString() : desiredError), (err instanceof Error ? err.toString() : err));
        flag(this, 'object', err);
        return this;
      }
      if (constructor) {
        this.assert(err instanceof constructor, 'expected #{this} to throw #{exp} but #{act} was thrown', 'expected #{this} to not throw #{exp} but #{act} was thrown', name, (err instanceof Error ? err.toString() : err));
        if (!errMsg) {
          flag(this, 'object', err);
          return this;
        }
      }
      var message = 'object' === _.type(err) && "message" in err ? err.message : '' + err;
      if ((message != null) && errMsg && errMsg instanceof RegExp) {
        this.assert(errMsg.exec(message), 'expected #{this} to throw error matching #{exp} but got #{act}', 'expected #{this} to throw error not matching #{exp}', errMsg, message);
        flag(this, 'object', err);
        return this;
      } else if ((message != null) && errMsg && 'string' === typeof errMsg) {
        this.assert(~message.indexOf(errMsg), 'expected #{this} to throw error including #{exp} but got #{act}', 'expected #{this} to throw error not including #{act}', errMsg, message);
        flag(this, 'object', err);
        return this;
      } else {
        thrown = true;
        thrownError = err;
      }
    }
    var actuallyGot = '',
        expectedThrown = name !== null ? name : desiredError ? '#{exp}' : 'an error';
    if (thrown) {
      actuallyGot = ' but #{act} was thrown';
    }
    this.assert(thrown === true, 'expected #{this} to throw ' + expectedThrown + actuallyGot, 'expected #{this} to not throw ' + expectedThrown + actuallyGot, (desiredError instanceof Error ? desiredError.toString() : desiredError), (thrownError instanceof Error ? thrownError.toString() : thrownError));
    flag(this, 'object', thrownError);
  }
  ;
  Assertion.addMethod('throw', assertThrows);
  Assertion.addMethod('throws', assertThrows);
  Assertion.addMethod('Throw', assertThrows);
  Assertion.addMethod('respondTo', function(method, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object'),
        itself = flag(this, 'itself'),
        context = ('function' === _.type(obj) && !itself) ? obj.prototype[method] : obj[method];
    this.assert('function' === typeof context, 'expected #{this} to respond to ' + _.inspect(method), 'expected #{this} to not respond to ' + _.inspect(method));
  });
  Assertion.addProperty('itself', function() {
    flag(this, 'itself', true);
  });
  Assertion.addMethod('satisfy', function(matcher, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var result = matcher(obj);
    this.assert(result, 'expected #{this} to satisfy ' + _.objDisplay(matcher), 'expected #{this} to not satisfy' + _.objDisplay(matcher), this.negate ? false : true, result);
  });
  Assertion.addMethod('closeTo', function(expected, delta, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).is.a('number');
    if (_.type(expected) !== 'number' || _.type(delta) !== 'number') {
      throw new Error('the arguments to closeTo must be numbers');
    }
    this.assert(Math.abs(obj - expected) <= delta, 'expected #{this} to be close to ' + expected + ' +/- ' + delta, 'expected #{this} not to be close to ' + expected + ' +/- ' + delta);
  });
  function isSubsetOf(subset, superset, cmp) {
    return subset.every(function(elem) {
      if (!cmp)
        return superset.indexOf(elem) !== -1;
      return superset.some(function(elem2) {
        return cmp(elem, elem2);
      });
    });
  }
  Assertion.addMethod('members', function(subset, msg) {
    if (msg)
      flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj).to.be.an('array');
    new Assertion(subset).to.be.an('array');
    var cmp = flag(this, 'deep') ? _.eql : undefined;
    if (flag(this, 'contains')) {
      return this.assert(isSubsetOf(subset, obj, cmp), 'expected #{this} to be a superset of #{act}', 'expected #{this} to not be a superset of #{act}', obj, subset);
    }
    this.assert(isSubsetOf(obj, subset, cmp) && isSubsetOf(subset, obj, cmp), 'expected #{this} to have the same members as #{act}', 'expected #{this} to not have the same members as #{act}', obj, subset);
  });
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/core/assertions.js
},{}],16:[function(require,module,exports){
"use strict";
module.exports = function(chai, util) {
  var Assertion = chai.Assertion,
      flag = util.flag;
  var assert = chai.assert = function(express, errmsg) {
    var test = new Assertion(null, null, chai.assert);
    test.assert(express, errmsg, '[ negation message unavailable ]');
  };
  assert.fail = function(actual, expected, message, operator) {
    message = message || 'assert.fail()';
    throw new chai.AssertionError(message, {
      actual: actual,
      expected: expected,
      operator: operator
    }, assert.fail);
  };
  assert.ok = function(val, msg) {
    new Assertion(val, msg).is.ok;
  };
  assert.notOk = function(val, msg) {
    new Assertion(val, msg).is.not.ok;
  };
  assert.equal = function(act, exp, msg) {
    var test = new Assertion(act, msg, assert.equal);
    test.assert(exp == flag(test, 'object'), 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{act}', exp, act);
  };
  assert.notEqual = function(act, exp, msg) {
    var test = new Assertion(act, msg, assert.notEqual);
    test.assert(exp != flag(test, 'object'), 'expected #{this} to not equal #{exp}', 'expected #{this} to equal #{act}', exp, act);
  };
  assert.strictEqual = function(act, exp, msg) {
    new Assertion(act, msg).to.equal(exp);
  };
  assert.notStrictEqual = function(act, exp, msg) {
    new Assertion(act, msg).to.not.equal(exp);
  };
  assert.deepEqual = function(act, exp, msg) {
    new Assertion(act, msg).to.eql(exp);
  };
  assert.notDeepEqual = function(act, exp, msg) {
    new Assertion(act, msg).to.not.eql(exp);
  };
  assert.isTrue = function(val, msg) {
    new Assertion(val, msg).is['true'];
  };
  assert.isFalse = function(val, msg) {
    new Assertion(val, msg).is['false'];
  };
  assert.isNull = function(val, msg) {
    new Assertion(val, msg).to.equal(null);
  };
  assert.isNotNull = function(val, msg) {
    new Assertion(val, msg).to.not.equal(null);
  };
  assert.isUndefined = function(val, msg) {
    new Assertion(val, msg).to.equal(undefined);
  };
  assert.isDefined = function(val, msg) {
    new Assertion(val, msg).to.not.equal(undefined);
  };
  assert.isFunction = function(val, msg) {
    new Assertion(val, msg).to.be.a('function');
  };
  assert.isNotFunction = function(val, msg) {
    new Assertion(val, msg).to.not.be.a('function');
  };
  assert.isObject = function(val, msg) {
    new Assertion(val, msg).to.be.a('object');
  };
  assert.isNotObject = function(val, msg) {
    new Assertion(val, msg).to.not.be.a('object');
  };
  assert.isArray = function(val, msg) {
    new Assertion(val, msg).to.be.an('array');
  };
  assert.isNotArray = function(val, msg) {
    new Assertion(val, msg).to.not.be.an('array');
  };
  assert.isString = function(val, msg) {
    new Assertion(val, msg).to.be.a('string');
  };
  assert.isNotString = function(val, msg) {
    new Assertion(val, msg).to.not.be.a('string');
  };
  assert.isNumber = function(val, msg) {
    new Assertion(val, msg).to.be.a('number');
  };
  assert.isNotNumber = function(val, msg) {
    new Assertion(val, msg).to.not.be.a('number');
  };
  assert.isBoolean = function(val, msg) {
    new Assertion(val, msg).to.be.a('boolean');
  };
  assert.isNotBoolean = function(val, msg) {
    new Assertion(val, msg).to.not.be.a('boolean');
  };
  assert.typeOf = function(val, type, msg) {
    new Assertion(val, msg).to.be.a(type);
  };
  assert.notTypeOf = function(val, type, msg) {
    new Assertion(val, msg).to.not.be.a(type);
  };
  assert.instanceOf = function(val, type, msg) {
    new Assertion(val, msg).to.be.instanceOf(type);
  };
  assert.notInstanceOf = function(val, type, msg) {
    new Assertion(val, msg).to.not.be.instanceOf(type);
  };
  assert.include = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.include).include(inc);
  };
  assert.notInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notInclude).not.include(inc);
  };
  assert.match = function(exp, re, msg) {
    new Assertion(exp, msg).to.match(re);
  };
  assert.notMatch = function(exp, re, msg) {
    new Assertion(exp, msg).to.not.match(re);
  };
  assert.property = function(obj, prop, msg) {
    new Assertion(obj, msg).to.have.property(prop);
  };
  assert.notProperty = function(obj, prop, msg) {
    new Assertion(obj, msg).to.not.have.property(prop);
  };
  assert.deepProperty = function(obj, prop, msg) {
    new Assertion(obj, msg).to.have.deep.property(prop);
  };
  assert.notDeepProperty = function(obj, prop, msg) {
    new Assertion(obj, msg).to.not.have.deep.property(prop);
  };
  assert.propertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg).to.have.property(prop, val);
  };
  assert.propertyNotVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg).to.not.have.property(prop, val);
  };
  assert.deepPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg).to.have.deep.property(prop, val);
  };
  assert.deepPropertyNotVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg).to.not.have.deep.property(prop, val);
  };
  assert.lengthOf = function(exp, len, msg) {
    new Assertion(exp, msg).to.have.length(len);
  };
  assert.Throw = function(fn, errt, errs, msg) {
    if ('string' === typeof errt || errt instanceof RegExp) {
      errs = errt;
      errt = null;
    }
    var assertErr = new Assertion(fn, msg).to.Throw(errt, errs);
    return flag(assertErr, 'object');
  };
  assert.doesNotThrow = function(fn, type, msg) {
    if ('string' === typeof type) {
      msg = type;
      type = null;
    }
    new Assertion(fn, msg).to.not.Throw(type);
  };
  assert.operator = function(val, operator, val2, msg) {
    if (!~['==', '===', '>', '>=', '<', '<=', '!=', '!=='].indexOf(operator)) {
      throw new Error('Invalid operator "' + operator + '"');
    }
    var test = new Assertion(eval(val + operator + val2), msg);
    test.assert(true === flag(test, 'object'), 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2), 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2));
  };
  assert.closeTo = function(act, exp, delta, msg) {
    new Assertion(act, msg).to.be.closeTo(exp, delta);
  };
  assert.sameMembers = function(set1, set2, msg) {
    new Assertion(set1, msg).to.have.same.members(set2);
  };
  assert.includeMembers = function(superset, subset, msg) {
    new Assertion(superset, msg).to.include.members(subset);
  };
  assert.ifError = function(val, msg) {
    new Assertion(val, msg).to.not.be.ok;
  };
  (function alias(name, as) {
    assert[as] = assert[name];
    return alias;
  })('Throw', 'throw')('Throw', 'throws');
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/interface/assert.js
},{}],17:[function(require,module,exports){
"use strict";
module.exports = function(chai, util) {
  chai.expect = function(val, message) {
    return new chai.Assertion(val, message);
  };
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/interface/expect.js
},{}],18:[function(require,module,exports){
"use strict";
module.exports = function(chai, util) {
  var Assertion = chai.Assertion;
  function loadShould() {
    function shouldGetter() {
      if (this instanceof String || this instanceof Number) {
        return new Assertion(this.constructor(this), null, shouldGetter);
      } else if (this instanceof Boolean) {
        return new Assertion(this == true, null, shouldGetter);
      }
      return new Assertion(this, null, shouldGetter);
    }
    function shouldSetter(value) {
      Object.defineProperty(this, 'should', {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    Object.defineProperty(Object.prototype, 'should', {
      set: shouldSetter,
      get: shouldGetter,
      configurable: true
    });
    var should = {};
    should.equal = function(val1, val2, msg) {
      new Assertion(val1, msg).to.equal(val2);
    };
    should.Throw = function(fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };
    should.exist = function(val, msg) {
      new Assertion(val, msg).to.exist;
    };
    should.not = {};
    should.not.equal = function(val1, val2, msg) {
      new Assertion(val1, msg).to.not.equal(val2);
    };
    should.not.Throw = function(fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };
    should.not.exist = function(val, msg) {
      new Assertion(val, msg).to.not.exist;
    };
    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];
    return should;
  }
  ;
  chai.should = loadShould;
  chai.Should = loadShould;
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/interface/should.js
},{}],19:[function(require,module,exports){
"use strict";
var transferFlags = require('./transferFlags');
var flag = require('./flag');
var config = require('../config');
var hasProtoSupport = '__proto__' in Object;
var excludeNames = /^(?:length|name|arguments|caller)$/;
var call = Function.prototype.call,
    apply = Function.prototype.apply;
module.exports = function(ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function') {
    chainingBehavior = function() {};
  }
  var chainableBehavior = {
    method: method,
    chainingBehavior: chainingBehavior
  };
  if (!ctx.__methods) {
    ctx.__methods = {};
  }
  ctx.__methods[name] = chainableBehavior;
  Object.defineProperty(ctx, name, {
    get: function() {
      chainableBehavior.chainingBehavior.call(this);
      var assert = function assert() {
        var old_ssfi = flag(this, 'ssfi');
        if (old_ssfi && config.includeStack === false)
          flag(this, 'ssfi', assert);
        var result = chainableBehavior.method.apply(this, arguments);
        return result === undefined ? this : result;
      };
      if (hasProtoSupport) {
        var prototype = assert.__proto__ = Object.create(this);
        prototype.call = call;
        prototype.apply = apply;
      } else {
        var asserterNames = Object.getOwnPropertyNames(ctx);
        asserterNames.forEach(function(asserterName) {
          if (!excludeNames.test(asserterName)) {
            var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
            Object.defineProperty(assert, asserterName, pd);
          }
        });
      }
      transferFlags(this, assert);
      return assert;
    },
    configurable: true
  });
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/addChainableMethod.js
},{"../config":14,"./flag":22,"./transferFlags":36}],20:[function(require,module,exports){
"use strict";
var config = require('../config');
var flag = require('./flag');
module.exports = function(ctx, name, method) {
  ctx[name] = function() {
    var old_ssfi = flag(this, 'ssfi');
    if (old_ssfi && config.includeStack === false)
      flag(this, 'ssfi', ctx[name]);
    var result = method.apply(this, arguments);
    return result === undefined ? this : result;
  };
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/addMethod.js
},{"../config":14,"./flag":22}],21:[function(require,module,exports){
"use strict";
module.exports = function(ctx, name, getter) {
  Object.defineProperty(ctx, name, {
    get: function() {
      var result = getter.call(this);
      return result === undefined ? this : result;
    },
    configurable: true
  });
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/addProperty.js
},{}],22:[function(require,module,exports){
"use strict";
module.exports = function(obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/flag.js
},{}],23:[function(require,module,exports){
"use strict";
module.exports = function(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/getActual.js
},{}],24:[function(require,module,exports){
"use strict";
module.exports = function getEnumerableProperties(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/getEnumerableProperties.js
},{}],25:[function(require,module,exports){
"use strict";
var flag = require('./flag'),
    getActual = require('./getActual'),
    inspect = require('./inspect'),
    objDisplay = require('./objDisplay');
module.exports = function(obj, args) {
  var negate = flag(obj, 'negate'),
      val = flag(obj, 'object'),
      expected = args[3],
      actual = getActual(obj, args),
      msg = negate ? args[2] : args[1],
      flagMsg = flag(obj, 'message');
  if (typeof msg === "function")
    msg = msg();
  msg = msg || '';
  msg = msg.replace(/#{this}/g, objDisplay(val)).replace(/#{act}/g, objDisplay(actual)).replace(/#{exp}/g, objDisplay(expected));
  return flagMsg ? flagMsg + ': ' + msg : msg;
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/getMessage.js
},{"./flag":22,"./getActual":23,"./inspect":30,"./objDisplay":31}],26:[function(require,module,exports){
"use strict";
module.exports = function(func) {
  if (func.name)
    return func.name;
  var match = /^\s?function ([^(]*)\(/.exec(func);
  return match && match[1] ? match[1] : "";
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/getName.js
},{}],27:[function(require,module,exports){
"use strict";
var getPathValue = module.exports = function(path, obj) {
  var parsed = parsePath(path);
  return _getPathValue(parsed, obj);
};
function parsePath(path) {
  var str = path.replace(/\[/g, '.['),
      parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function(value) {
    var re = /\[(\d+)\]$/,
        mArr = re.exec(value);
    if (mArr)
      return {i: parseFloat(mArr[1])};
    else
      return {p: value};
  });
}
;
function _getPathValue(parsed, obj) {
  var tmp = obj,
      res;
  for (var i = 0,
      l = parsed.length; i < l; i++) {
    var part = parsed[i];
    if (tmp) {
      if ('undefined' !== typeof part.p)
        tmp = tmp[part.p];
      else if ('undefined' !== typeof part.i)
        tmp = tmp[part.i];
      if (i == (l - 1))
        res = tmp;
    } else {
      res = undefined;
    }
  }
  return res;
}
;


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/getPathValue.js
},{}],28:[function(require,module,exports){
"use strict";
module.exports = function getProperties(object) {
  var result = Object.getOwnPropertyNames(subject);
  function addProperty(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }
  var proto = Object.getPrototypeOf(subject);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }
  return result;
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/getProperties.js
},{}],29:[function(require,module,exports){
"use strict";
var exports = module.exports = {};
exports.test = require('./test');
exports.type = require('./type');
exports.getMessage = require('./getMessage');
exports.getActual = require('./getActual');
exports.inspect = require('./inspect');
exports.objDisplay = require('./objDisplay');
exports.flag = require('./flag');
exports.transferFlags = require('./transferFlags');
exports.eql = require('deep-eql');
exports.getPathValue = require('./getPathValue');
exports.getName = require('./getName');
exports.addProperty = require('./addProperty');
exports.addMethod = require('./addMethod');
exports.overwriteProperty = require('./overwriteProperty');
exports.overwriteMethod = require('./overwriteMethod');
exports.addChainableMethod = require('./addChainableMethod');
exports.overwriteChainableMethod = require('./overwriteChainableMethod');


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/index.js
},{"./addChainableMethod":19,"./addMethod":20,"./addProperty":21,"./flag":22,"./getActual":23,"./getMessage":25,"./getName":26,"./getPathValue":27,"./inspect":30,"./objDisplay":31,"./overwriteChainableMethod":32,"./overwriteMethod":33,"./overwriteProperty":34,"./test":35,"./transferFlags":36,"./type":37,"deep-eql":39}],30:[function(require,module,exports){
"use strict";
var getName = require('./getName');
var getProperties = require('./getProperties');
var getEnumerableProperties = require('./getEnumerableProperties');
module.exports = inspect;
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function(str) {
      return str;
    }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}
var isDOMElement = function(object) {
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return object && typeof object === 'object' && object.nodeType === 1 && typeof object.nodeName === 'string';
  }
};
function formatValue(ctx, value, recurseTimes) {
  if (value && typeof value.inspect === 'function' && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes);
    if (typeof ret !== 'string') {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }
  if (isDOMElement(value)) {
    if ('outerHTML' in value) {
      return value.outerHTML;
    } else {
      try {
        if (document.xmlVersion) {
          var xmlSerializer = new XMLSerializer();
          return xmlSerializer.serializeToString(value);
        } else {
          var ns = "http://www.w3.org/1999/xhtml";
          var container = document.createElementNS(ns, '_');
          container.appendChild(value.cloneNode(false));
          html = container.innerHTML.replace('><', '>' + value.innerHTML + '<');
          container.innerHTML = '';
          return html;
        }
      } catch (err) {}
    }
  }
  var visibleKeys = getEnumerableProperties(value);
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;
  if (keys.length === 0 || (isError(value) && ((keys.length === 1 && keys[0] === 'stack') || (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')))) {
    if (typeof value === 'function') {
      var name = getName(value);
      var nameSuffix = name ? ': ' + name : '';
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }
  var base = '',
      array = false,
      braces = ['{', '}'];
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }
  if (typeof value === 'function') {
    var name = getName(value);
    var nameSuffix = name ? ': ' + name : '';
    base = ' [Function' + nameSuffix + ']';
  }
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }
  if (isError(value)) {
    return formatError(value);
  }
  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }
  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }
  ctx.seen.push(value);
  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }
  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');
    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    case 'number':
      if (value === 0 && (1 / value) === -Infinity) {
        return ctx.stylize('-0', 'number');
      }
      return ctx.stylize('' + value, 'number');
    case 'boolean':
      return ctx.stylize('' + value, 'boolean');
  }
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}
function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0,
      l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name,
      str;
  if (value.__lookupGetter__) {
    if (value.__lookupGetter__(key)) {
      if (value.__lookupSetter__(key)) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (value.__lookupSetter__(key)) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }
  return name + ': ' + str;
}
function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0)
      numLinesEst++;
    return prev + cur.length + 1;
  }, 0);
  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }
  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}
function isArray(ar) {
  return Array.isArray(ar) || (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}
function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}
function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}
function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}
function objectToString(o) {
  return Object.prototype.toString.call(o);
}


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/inspect.js
},{"./getEnumerableProperties":24,"./getName":26,"./getProperties":28}],31:[function(require,module,exports){
"use strict";
var inspect = require('./inspect');
var config = require('../config');
module.exports = function(obj) {
  var str = inspect(obj),
      type = Object.prototype.toString.call(obj);
  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type === '[object Function]') {
      return !obj.name || obj.name === '' ? '[Function]' : '[Function: ' + obj.name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + obj.length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj),
          kstr = keys.length > 2 ? keys.splice(0, 2).join(', ') + ', ...' : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/objDisplay.js
},{"../config":14,"./inspect":30}],32:[function(require,module,exports){
"use strict";
module.exports = function(ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name];
  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function() {
    var result = chainingBehavior(_chainingBehavior).call(this);
    return result === undefined ? this : result;
  };
  var _method = chainableBehavior.method;
  chainableBehavior.method = function() {
    var result = method(_method).apply(this, arguments);
    return result === undefined ? this : result;
  };
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/overwriteChainableMethod.js
},{}],33:[function(require,module,exports){
"use strict";
module.exports = function(ctx, name, method) {
  var _method = ctx[name],
      _super = function() {
        return this;
      };
  if (_method && 'function' === typeof _method)
    _super = _method;
  ctx[name] = function() {
    var result = method(_super).apply(this, arguments);
    return result === undefined ? this : result;
  };
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/overwriteMethod.js
},{}],34:[function(require,module,exports){
"use strict";
module.exports = function(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name),
      _super = function() {};
  if (_get && 'function' === typeof _get.get)
    _super = _get.get;
  Object.defineProperty(ctx, name, {
    get: function() {
      var result = getter(_super).call(this);
      return result === undefined ? this : result;
    },
    configurable: true
  });
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/overwriteProperty.js
},{}],35:[function(require,module,exports){
"use strict";
var flag = require('./flag');
module.exports = function(obj, args) {
  var negate = flag(obj, 'negate'),
      expr = args[0];
  return negate ? !expr : expr;
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/test.js
},{"./flag":22}],36:[function(require,module,exports){
"use strict";
module.exports = function(assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));
  if (!object.__flags) {
    object.__flags = Object.create(null);
  }
  includeAll = arguments.length === 3 ? includeAll : true;
  for (var flag in flags) {
    if (includeAll || (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {
      object.__flags[flag] = flags[flag];
    }
  }
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/transferFlags.js
},{}],37:[function(require,module,exports){
"use strict";
var natives = {
  '[object Arguments]': 'arguments',
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object Function]': 'function',
  '[object Number]': 'number',
  '[object RegExp]': 'regexp',
  '[object String]': 'string'
};
module.exports = function(obj) {
  var str = Object.prototype.toString.call(obj);
  if (natives[str])
    return natives[str];
  if (obj === null)
    return 'null';
  if (obj === undefined)
    return 'undefined';
  if (obj === Object(obj))
    return 'object';
  return typeof obj;
};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/chai/lib/chai/utils/type.js
},{}],38:[function(require,module,exports){
/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

function exclude () {
  var excludes = [].slice.call(arguments);

  function excludeProps (res, obj) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
};

/*!
 * Primary Exports
 */

module.exports = AssertionError;

/**
 * ### AssertionError
 *
 * An extension of the JavaScript `Error` constructor for
 * assertion and validation scenarios.
 *
 * @param {String} message
 * @param {Object} properties to include (optional)
 * @param {callee} start stack function (optional)
 */

function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // capture stack trace
  ssf = ssf || arguments.callee;
  if (ssf && Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  }
}

/*!
 * Inherit from Error.prototype
 */

AssertionError.prototype = Object.create(Error.prototype);

/*!
 * Statically set name
 */

AssertionError.prototype.name = 'AssertionError';

/*!
 * Ensure correct constructor
 */

AssertionError.prototype.constructor = AssertionError;

/**
 * Allow errors to be converted to JSON for static transfer.
 *
 * @param {Boolean} include stack (default: `true`)
 * @return {Object} object that can be `JSON.stringify`
 */

AssertionError.prototype.toJSON = function (stack) {
  var extend = exclude('constructor', 'toJSON', 'stack')
    , props = extend({ name: this.name }, this);

  // include stack if exists and not turned off
  if (false !== stack && this.stack) {
    props.stack = this.stack;
  }

  return props;
};

},{}],39:[function(require,module,exports){
module.exports = require('./lib/eql');

},{"./lib/eql":40}],40:[function(require,module,exports){
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var type = require('type-detect');

/*!
 * Buffer.isBuffer browser shim
 */

var Buffer;
try { Buffer = require('buffer').Buffer; }
catch(ex) {
  Buffer = {};
  Buffer.isBuffer = function() { return false; }
}

/*!
 * Primary Export
 */

module.exports = deepEqual;

/**
 * Assert super-strict (egal) equality between
 * two objects of any type.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @param {Array} memoised (optional)
 * @return {Boolean} equal match
 */

function deepEqual(a, b, m) {
  if (sameValue(a, b)) {
    return true;
  } else if ('date' === type(a)) {
    return dateEqual(a, b);
  } else if ('regexp' === type(a)) {
    return regexpEqual(a, b);
  } else if (Buffer.isBuffer(a)) {
    return bufferEqual(a, b);
  } else if ('arguments' === type(a)) {
    return argumentsEqual(a, b, m);
  } else if (!typeEqual(a, b)) {
    return false;
  } else if (('object' !== type(a) && 'object' !== type(b))
  && ('array' !== type(a) && 'array' !== type(b))) {
    return sameValue(a, b);
  } else {
    return objectEqual(a, b, m);
  }
}

/*!
 * Strict (egal) equality test. Ensures that NaN always
 * equals NaN and `-0` does not equal `+0`.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} equal match
 */

function sameValue(a, b) {
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  return a !== a && b !== b;
}

/*!
 * Compare the types of two given objects and
 * return if they are equal. Note that an Array
 * has a type of `array` (not `object`) and arguments
 * have a type of `arguments` (not `array`/`object`).
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

function typeEqual(a, b) {
  return type(a) === type(b);
}

/*!
 * Compare two Date objects by asserting that
 * the time values are equal using `saveValue`.
 *
 * @param {Date} a
 * @param {Date} b
 * @return {Boolean} result
 */

function dateEqual(a, b) {
  if ('date' !== type(b)) return false;
  return sameValue(a.getTime(), b.getTime());
}

/*!
 * Compare two regular expressions by converting them
 * to string and checking for `sameValue`.
 *
 * @param {RegExp} a
 * @param {RegExp} b
 * @return {Boolean} result
 */

function regexpEqual(a, b) {
  if ('regexp' !== type(b)) return false;
  return sameValue(a.toString(), b.toString());
}

/*!
 * Assert deep equality of two `arguments` objects.
 * Unfortunately, these must be sliced to arrays
 * prior to test to ensure no bad behavior.
 *
 * @param {Arguments} a
 * @param {Arguments} b
 * @param {Array} memoize (optional)
 * @return {Boolean} result
 */

function argumentsEqual(a, b, m) {
  if ('arguments' !== type(b)) return false;
  a = [].slice.call(a);
  b = [].slice.call(b);
  return deepEqual(a, b, m);
}

/*!
 * Get enumerable properties of a given object.
 *
 * @param {Object} a
 * @return {Array} property names
 */

function enumerable(a) {
  var res = [];
  for (var key in a) res.push(key);
  return res;
}

/*!
 * Simple equality for flat iterable objects
 * such as Arrays or Node.js buffers.
 *
 * @param {Iterable} a
 * @param {Iterable} b
 * @return {Boolean} result
 */

function iterableEqual(a, b) {
  if (a.length !==  b.length) return false;

  var i = 0;
  var match = true;

  for (; i < a.length; i++) {
    if (a[i] !== b[i]) {
      match = false;
      break;
    }
  }

  return match;
}

/*!
 * Extension to `iterableEqual` specifically
 * for Node.js Buffers.
 *
 * @param {Buffer} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

function bufferEqual(a, b) {
  if (!Buffer.isBuffer(b)) return false;
  return iterableEqual(a, b);
}

/*!
 * Block for `objectEqual` ensuring non-existing
 * values don't get in.
 *
 * @param {Mixed} object
 * @return {Boolean} result
 */

function isValue(a) {
  return a !== null && a !== undefined;
}

/*!
 * Recursively check the equality of two objects.
 * Once basic sameness has been established it will
 * defer to `deepEqual` for each enumerable key
 * in the object.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

function objectEqual(a, b, m) {
  if (!isValue(a) || !isValue(b)) {
    return false;
  }

  if (a.prototype !== b.prototype) {
    return false;
  }

  var i;
  if (m) {
    for (i = 0; i < m.length; i++) {
      if ((m[i][0] === a && m[i][1] === b)
      ||  (m[i][0] === b && m[i][1] === a)) {
        return true;
      }
    }
  } else {
    m = [];
  }

  try {
    var ka = enumerable(a);
    var kb = enumerable(b);
  } catch (ex) {
    return false;
  }

  ka.sort();
  kb.sort();

  if (!iterableEqual(ka, kb)) {
    return false;
  }

  m.push([ a, b ]);

  var key;
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], m)) {
      return false;
    }
  }

  return true;
}

},{"buffer":5,"type-detect":41}],41:[function(require,module,exports){
module.exports = require('./lib/type');

},{"./lib/type":42}],42:[function(require,module,exports){
/*!
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Primary Exports
 */

var exports = module.exports = getType;

/*!
 * Detectable javascript natives
 */

var natives = {
    '[object Array]': 'array'
  , '[object RegExp]': 'regexp'
  , '[object Function]': 'function'
  , '[object Arguments]': 'arguments'
  , '[object Date]': 'date'
};

/**
 * ### typeOf (obj)
 *
 * Use several different techniques to determine
 * the type of object being tested.
 *
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */

function getType (obj) {
  var str = Object.prototype.toString.call(obj);
  if (natives[str]) return natives[str];
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (obj === Object(obj)) return 'object';
  return typeof obj;
}

exports.Library = Library;

/**
 * ### Library
 *
 * Create a repository for custom type detection.
 *
 * ```js
 * var lib = new type.Library;
 * ```
 *
 */

function Library () {
  this.tests = {};
}

/**
 * #### .of (obj)
 *
 * Expose replacement `typeof` detection to the library.
 *
 * ```js
 * if ('string' === lib.of('hello world')) {
 *   // ...
 * }
 * ```
 *
 * @param {Mixed} object to test
 * @return {String} type
 */

Library.prototype.of = getType;

/**
 * #### .define (type, test)
 *
 * Add a test to for the `.test()` assertion.
 *
 * Can be defined as a regular expression:
 *
 * ```js
 * lib.define('int', /^[0-9]+$/);
 * ```
 *
 * ... or as a function:
 *
 * ```js
 * lib.define('bln', function (obj) {
 *   if ('boolean' === lib.of(obj)) return true;
 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
 *   return !! ~blns.indexOf(obj);
 * });
 * ```
 *
 * @param {String} type
 * @param {RegExp|Function} test
 * @api public
 */

Library.prototype.define = function (type, test) {
  if (arguments.length === 1) return this.tests[type];
  this.tests[type] = test;
  return this;
};

/**
 * #### .test (obj, test)
 *
 * Assert that an object is of type. Will first
 * check natives, and if that does not pass it will
 * use the user defined custom tests.
 *
 * ```js
 * assert(lib.test('1', 'int'));
 * assert(lib.test('yes', 'bln'));
 * ```
 *
 * @param {Mixed} object
 * @param {String} type
 * @return {Boolean} result
 * @api public
 */

Library.prototype.test = function (obj, type) {
  if (type === getType(obj)) return true;
  var test = this.tests[type];

  if (test && 'regexp' === getType(test)) {
    return test.test(obj);
  } else if (test && 'function' === getType(test)) {
    return test(obj);
  } else {
    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
  }
};

},{}],43:[function(require,module,exports){
(function (process,global){
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $keys = $Object.keys;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $toString = $Object.prototype.toString;
  var $preventExtensions = Object.preventExtensions;
  var $seal = Object.seal;
  var $isExtensible = Object.isExtensible;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var privateNames = $create(null);
  function isPrivateName(s) {
    return privateNames[s];
  }
  function createPrivateName() {
    var s = newUniqueString();
    privateNames[s] = true;
    return s;
  }
  function isShimSymbol(symbol) {
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isShimSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  var hashProperty = createPrivateName();
  var hashPropertyDescriptor = {value: undefined};
  var hashObjectProperties = {
    hash: {value: undefined},
    self: {value: undefined}
  };
  var hashCounter = 0;
  function getOwnHashObject(object) {
    var hashObject = object[hashProperty];
    if (hashObject && hashObject.self === object)
      return hashObject;
    if ($isExtensible(object)) {
      hashObjectProperties.hash.value = hashCounter++;
      hashObjectProperties.self.value = object;
      hashPropertyDescriptor.value = $create(null, hashObjectProperties);
      $defineProperty(object, hashProperty, hashPropertyDescriptor);
      return hashPropertyDescriptor.value;
    }
    return undefined;
  }
  function freeze(object) {
    getOwnHashObject(object);
    return $freeze.apply(this, arguments);
  }
  function preventExtensions(object) {
    getOwnHashObject(object);
    return $preventExtensions.apply(this, arguments);
  }
  function seal(object) {
    getOwnHashObject(object);
    return $seal.apply(this, arguments);
  }
  freeze(SymbolValue.prototype);
  function isSymbolString(s) {
    return symbolValues[s] || privateNames[s];
  }
  function toProperty(name) {
    if (isShimSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function removeSymbolKeys(array) {
    var rv = [];
    for (var i = 0; i < array.length; i++) {
      if (!isSymbolString(array[i])) {
        rv.push(array[i]);
      }
    }
    return rv;
  }
  function getOwnPropertyNames(object) {
    return removeSymbolKeys($getOwnPropertyNames(object));
  }
  function keys(object) {
    return removeSymbolKeys($keys(object));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol) {
        rv.push(symbol);
      }
    }
    return rv;
  }
  function getOwnPropertyDescriptor(object, name) {
    return $getOwnPropertyDescriptor(object, toProperty(name));
  }
  function hasOwnProperty(name) {
    return $hasOwnProperty.call(this, toProperty(name));
  }
  function getOption(name) {
    return global.traceur && global.traceur.options[name];
  }
  function defineProperty(object, name, descriptor) {
    if (isShimSymbol(name)) {
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    $defineProperty(Object, 'freeze', {value: freeze});
    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
    $defineProperty(Object, 'seal', {value: seal});
    $defineProperty(Object, 'keys', {value: keys});
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (isSymbolString(name))
          continue;
        (function(mod, name) {
          $defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        })(arguments[i], names[j]);
      }
    }
    return object;
  }
  function isObject(x) {
    return x != null && (typeof x === 'object' || typeof x === 'function');
  }
  function toObject(x) {
    if (x == null)
      throw $TypeError();
    return $Object(x);
  }
  function checkObjectCoercible(argument) {
    if (argument == null) {
      throw new TypeError('Value cannot be converted to an Object');
    }
    return argument;
  }
  function polyfillSymbol(global, Symbol) {
    if (!global.Symbol) {
      global.Symbol = Symbol;
      Object.getOwnPropertySymbols = getOwnPropertySymbols;
    }
    if (!global.Symbol.iterator) {
      global.Symbol.iterator = Symbol('Symbol.iterator');
    }
  }
  function setupGlobals(global) {
    polyfillSymbol(global, Symbol);
    global.Reflect = global.Reflect || {};
    global.Reflect.global = global.Reflect.global || global;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    checkObjectCoercible: checkObjectCoercible,
    createPrivateName: createPrivateName,
    defineProperties: $defineProperties,
    defineProperty: $defineProperty,
    exportStar: exportStar,
    getOwnHashObject: getOwnHashObject,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    isObject: isObject,
    isPrivateName: isPrivateName,
    isSymbolString: isSymbolString,
    keys: $keys,
    setupGlobals: setupGlobals,
    toObject: toObject,
    toProperty: toProperty,
    typeof: typeOf
  };
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function() {
  'use strict';
  var path;
  function relativeRequire(callerPath, requiredPath) {
    path = path || typeof require !== 'undefined' && require('path');
    function isDirectory(path) {
      return path.slice(-1) === '/';
    }
    function isAbsolute(path) {
      return path[0] === '/';
    }
    function isRelative(path) {
      return path[0] === '.';
    }
    if (isDirectory(requiredPath) || isAbsolute(requiredPath))
      return;
    return isRelative(requiredPath) ? require(path.resolve(path.dirname(callerPath), requiredPath)) : require(requiredPath);
  }
  $traceurRuntime.require = relativeRequire;
})();
(function() {
  'use strict';
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
      }
    }
    return rv;
  }
  $traceurRuntime.spread = spread;
})();
(function() {
  'use strict';
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
  var $getPrototypeOf = Object.getPrototypeOf;
  var $__0 = Object,
      getOwnPropertyNames = $__0.getOwnPropertyNames,
      getOwnPropertySymbols = $__0.getOwnPropertySymbols;
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    do {
      var result = $getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = $getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  function superConstructor(ctor) {
    return ctor.__proto__;
  }
  function superCall(self, homeObject, name, args) {
    return superGet(self, homeObject, name).apply(self, args);
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if (!descriptor.get)
        return descriptor.value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError(("super has no setter '" + name + "'."));
  }
  function getDescriptors(object) {
    var descriptors = {};
    var names = getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    var symbols = getOwnPropertySymbols(object);
    for (var i = 0; i < symbols.length; i++) {
      var symbol = symbols[i];
      descriptors[$traceurRuntime.toProperty(symbol)] = $getOwnPropertyDescriptor(object, $traceurRuntime.toProperty(symbol));
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.defaultSuperCall = defaultSuperCall;
  $traceurRuntime.superCall = superCall;
  $traceurRuntime.superConstructor = superConstructor;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
})();
(function() {
  'use strict';
  if (typeof $traceurRuntime !== 'object') {
    throw new Error('traceur runtime not found.');
  }
  var createPrivateName = $traceurRuntime.createPrivateName;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $create = Object.create;
  var $TypeError = TypeError;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        throw x;
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value = moveNext(ctx);
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateName();
  var moveNextName = createPrivateName();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
    }
  };
  $defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false}
  });
  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = $create(functionObject.prototype);
    object[ctxName] = ctx;
    object[moveNextName] = moveNext;
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
})();
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  ;
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function() {
  'use strict';
  var types = {
    any: {name: 'any'},
    boolean: {name: 'boolean'},
    number: {name: 'number'},
    string: {name: 'string'},
    symbol: {name: 'symbol'},
    void: {name: 'void'}
  };
  var GenericType = function GenericType(type, argumentTypes) {
    this.type = type;
    this.argumentTypes = argumentTypes;
  };
  ($traceurRuntime.createClass)(GenericType, {}, {});
  var typeRegister = Object.create(null);
  function genericType(type) {
    for (var argumentTypes = [],
        $__1 = 1; $__1 < arguments.length; $__1++)
      argumentTypes[$__1 - 1] = arguments[$__1];
    var typeMap = typeRegister;
    var key = $traceurRuntime.getOwnHashObject(type).hash;
    if (!typeMap[key]) {
      typeMap[key] = Object.create(null);
    }
    typeMap = typeMap[key];
    for (var i = 0; i < argumentTypes.length - 1; i++) {
      key = $traceurRuntime.getOwnHashObject(argumentTypes[i]).hash;
      if (!typeMap[key]) {
        typeMap[key] = Object.create(null);
      }
      typeMap = typeMap[key];
    }
    var tail = argumentTypes[argumentTypes.length - 1];
    key = $traceurRuntime.getOwnHashObject(tail).hash;
    if (!typeMap[key]) {
      typeMap[key] = new GenericType(type, argumentTypes);
    }
    return typeMap[key];
  }
  $traceurRuntime.GenericType = GenericType;
  $traceurRuntime.genericType = genericType;
  $traceurRuntime.type = types;
})();
(function(global) {
  'use strict';
  var $__2 = $traceurRuntime,
      canonicalizeUrl = $__2.canonicalizeUrl,
      resolveUrl = $__2.resolveUrl,
      isAbsolute = $__2.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  };
  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
  var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
    if (!(cause instanceof $ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  };
  var $ModuleEvaluationError = ModuleEvaluationError;
  ($traceurRuntime.createClass)(ModuleEvaluationError, {
    stripError: function(message) {
      return message.replace(/.*Error:/, this.constructor.name + ':');
    },
    stripCause: function(cause) {
      if (!cause)
        return '';
      if (!cause.message)
        return cause + '';
      return this.stripError(cause.message);
    },
    loadedBy: function(moduleName) {
      this.stack += '\n loaded by ' + moduleName;
    },
    stripStack: function(causeStack) {
      var stack = [];
      causeStack.split('\n').some((function(frame) {
        if (/UncoatedModuleInstantiator/.test(frame))
          return true;
        stack.push(frame);
      }));
      stack[0] = this.stripError(stack[0]);
      return stack.join('\n');
    }
  }, {}, Error);
  function beforeLines(lines, number) {
    var result = [];
    var first = number - 3;
    if (first < 0)
      first = 0;
    for (var i = first; i < number; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function afterLines(lines, number) {
    var last = number + 1;
    if (last > lines.length - 1)
      last = lines.length - 1;
    var result = [];
    for (var i = number; i <= last; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function columnSpacing(columns) {
    var result = '';
    for (var i = 0; i < columns - 1; i++) {
      result += '-';
    }
    return result;
  }
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superConstructor($UncoatedModuleInstantiator).call(this, url, null);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      try {
        var relativeRequire;
        if (typeof $traceurRuntime !== undefined) {
          relativeRequire = $traceurRuntime.require.bind(null, this.url);
        }
        return this.value_ = this.func.call(global, relativeRequire);
      } catch (ex) {
        if (ex instanceof ModuleEvaluationError) {
          ex.loadedBy(this.url);
          throw ex;
        }
        if (ex.stack) {
          var lines = this.func.toString().split('\n');
          var evaled = [];
          ex.stack.split('\n').some(function(frame) {
            if (frame.indexOf('UncoatedModuleInstantiator.getUncoatedModule') > 0)
              return true;
            var m = /(at\s[^\s]*\s).*>:(\d*):(\d*)\)/.exec(frame);
            if (m) {
              var line = parseInt(m[2], 10);
              evaled = evaled.concat(beforeLines(lines, line));
              evaled.push(columnSpacing(m[3]) + '^');
              evaled = evaled.concat(afterLines(lines, line));
              evaled.push('= = = = = = = = =');
            } else {
              evaled.push(frame);
            }
          });
          ex.stack = evaled.join('\n');
        }
        throw new ModuleEvaluationError(this.url, ex);
      }
    }}, {}, UncoatedModuleEntry);
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    }));
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== 'string')
        throw new TypeError('module name must be a string, not ' + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
        return module;
      }));
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, deps, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, deps, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__0 = arguments;
            var depMap = {};
            deps.forEach((function(dep, index) {
              return depMap[dep] = $__0[index];
            }));
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    },
    getForTesting: function(name) {
      var $__0 = this;
      if (!this.testingPrefix_) {
        Object.keys(moduleInstances).some((function(key) {
          var m = /(traceur@[^\/]*\/)/.exec(key);
          if (m) {
            $__0.testingPrefix_ = m[1];
            return true;
          }
        }));
      }
      return this.get(this.testingPrefix_ + name);
    }
  };
  var moduleStoreModule = new Module({ModuleStore: ModuleStore});
  ModuleStore.set('@traceur/src/runtime/ModuleStore', moduleStoreModule);
  ModuleStore.set('@traceur/src/runtime/ModuleStore.js', moduleStoreModule);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  global.System = {
    register: ModuleStore.register.bind(ModuleStore),
    registerModule: ModuleStore.registerModule.bind(ModuleStore),
    get: ModuleStore.get,
    set: ModuleStore.set,
    normalize: ModuleStore.normalize
  };
  $traceurRuntime.getModuleImpl = function(name) {
    var instantiator = getUncoatedModuleInstantiator(name);
    return instantiator && instantiator.getUncoatedModule();
  };
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/utils.js";
  var $ceil = Math.ceil;
  var $floor = Math.floor;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $pow = Math.pow;
  var $min = Math.min;
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x >>> 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
    return x > 0 ? $floor(x) : $ceil(x);
  }
  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
  }
  function checkIterable(x) {
    return !isObject(x) ? undefined : x[Symbol.iterator];
  }
  function isConstructor(x) {
    return isCallable(x);
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function maybeDefine(object, name, descr) {
    if (!(name in object)) {
      Object.defineProperty(object, name, descr);
    }
  }
  function maybeDefineMethod(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function maybeDefineConst(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function maybeAddConsts(object, consts) {
    for (var i = 0; i < consts.length; i += 2) {
      var name = consts[i];
      var value = consts[i + 1];
      maybeDefineConst(object, name, value);
    }
  }
  function maybeAddIterator(object, func, Symbol) {
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  var polyfills = [];
  function registerPolyfill(func) {
    polyfills.push(func);
  }
  function polyfillAll(global) {
    polyfills.forEach((function(f) {
      return f(global);
    }));
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get isNumber() {
      return isNumber;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    },
    get checkIterable() {
      return checkIterable;
    },
    get isConstructor() {
      return isConstructor;
    },
    get createIteratorResultObject() {
      return createIteratorResultObject;
    },
    get maybeDefine() {
      return maybeDefine;
    },
    get maybeDefineMethod() {
      return maybeDefineMethod;
    },
    get maybeDefineConst() {
      return maybeDefineConst;
    },
    get maybeAddFunctions() {
      return maybeAddFunctions;
    },
    get maybeAddConsts() {
      return maybeAddConsts;
    },
    get maybeAddIterator() {
      return maybeAddIterator;
    },
    get registerPolyfill() {
      return registerPolyfill;
    },
    get polyfillAll() {
      return polyfillAll;
    }
  };
});
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Map.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Map.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      isObject = $__0.isObject,
      maybeAddIterator = $__0.maybeAddIterator,
      registerPolyfill = $__0.registerPolyfill;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  var deletedSentinel = {};
  function lookupIndex(map, key) {
    if (isObject(key)) {
      var hashObject = getOwnHashObject(key);
      return hashObject && map.objectIndex_[hashObject.hash];
    }
    if (typeof key === 'string')
      return map.stringIndex_[key];
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.deletedCount_ = 0;
  }
  var Map = function Map() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Map called on incompatible type');
    if ($hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError('Map can not be reentrantly initialised');
    }
    initMap(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__2 = iterable[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__3; !($__3 = $__2.next()).done; ) {
        var $__4 = $__3.value,
            key = $__4[0],
            value = $__4[1];
        {
          this.set(key, value);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Map, {
    get size() {
      return this.entries_.length / 2 - this.deletedCount_;
    },
    get: function(key) {
      var index = lookupIndex(this, key);
      if (index !== undefined)
        return this.entries_[index + 1];
    },
    set: function(key, value) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index = lookupIndex(this, key);
      if (index !== undefined) {
        this.entries_[index + 1] = value;
      } else {
        index = this.entries_.length;
        this.entries_[index] = key;
        this.entries_[index + 1] = value;
        if (objectMode) {
          var hashObject = getOwnHashObject(key);
          var hash = hashObject.hash;
          this.objectIndex_[hash] = index;
        } else if (stringMode) {
          this.stringIndex_[key] = index;
        } else {
          this.primitiveIndex_[key] = index;
        }
      }
      return this;
    },
    has: function(key) {
      return lookupIndex(this, key) !== undefined;
    },
    delete: function(key) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index;
      var hash;
      if (objectMode) {
        var hashObject = getOwnHashObject(key);
        if (hashObject) {
          index = this.objectIndex_[hash = hashObject.hash];
          delete this.objectIndex_[hash];
        }
      } else if (stringMode) {
        index = this.stringIndex_[key];
        delete this.stringIndex_[key];
      } else {
        index = this.primitiveIndex_[key];
        delete this.primitiveIndex_[key];
      }
      if (index !== undefined) {
        this.entries_[index] = deletedSentinel;
        this.entries_[index + 1] = undefined;
        this.deletedCount_++;
        return true;
      }
      return false;
    },
    clear: function() {
      initMap(this);
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      for (var i = 0; i < this.entries_.length; i += 2) {
        var key = this.entries_[i];
        var value = this.entries_[i + 1];
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    },
    entries: $traceurRuntime.initGeneratorFunction(function $__5() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return [key, value];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__5, this);
    }),
    keys: $traceurRuntime.initGeneratorFunction(function $__6() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return key;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__6, this);
    }),
    values: $traceurRuntime.initGeneratorFunction(function $__7() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return value;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__7, this);
    })
  }, {});
  Object.defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  function polyfillMap(global) {
    var $__4 = global,
        Object = $__4.Object,
        Symbol = $__4.Symbol;
    if (!global.Map)
      global.Map = Map;
    var mapPrototype = global.Map.prototype;
    if (mapPrototype.entries === undefined)
      global.Map = Map;
    if (mapPrototype.entries) {
      maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Map().entries()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillMap);
  return {
    get Map() {
      return Map;
    },
    get polyfillMap() {
      return polyfillMap;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Map.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Set.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Set.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      isObject = $__0.isObject,
      maybeAddIterator = $__0.maybeAddIterator,
      registerPolyfill = $__0.registerPolyfill;
  var Map = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Map.js").Map;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  function initSet(set) {
    set.map_ = new Map();
  }
  var Set = function Set() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Set called on incompatible type');
    if ($hasOwnProperty.call(this, 'map_')) {
      throw new TypeError('Set can not be reentrantly initialised');
    }
    initSet(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__4 = iterable[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__5; !($__5 = $__4.next()).done; ) {
        var item = $__5.value;
        {
          this.add(item);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Set, {
    get size() {
      return this.map_.size;
    },
    has: function(key) {
      return this.map_.has(key);
    },
    add: function(key) {
      this.map_.set(key, key);
      return this;
    },
    delete: function(key) {
      return this.map_.delete(key);
    },
    clear: function() {
      return this.map_.clear();
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      var $__2 = this;
      return this.map_.forEach((function(value, key) {
        callbackFn.call(thisArg, key, key, $__2);
      }));
    },
    values: $traceurRuntime.initGeneratorFunction(function $__7() {
      var $__8,
          $__9;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__8 = this.map_.keys()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__9 = $__8[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__9.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__9.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__9.value;
            default:
              return $ctx.end();
          }
      }, $__7, this);
    }),
    entries: $traceurRuntime.initGeneratorFunction(function $__10() {
      var $__11,
          $__12;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__11 = this.map_.entries()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__12 = $__11[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__12.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__12.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__12.value;
            default:
              return $ctx.end();
          }
      }, $__10, this);
    })
  }, {});
  Object.defineProperty(Set.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  function polyfillSet(global) {
    var $__6 = global,
        Object = $__6.Object,
        Symbol = $__6.Symbol;
    if (!global.Set)
      global.Set = Set;
    var setPrototype = global.Set.prototype;
    if (setPrototype.values) {
      maybeAddIterator(setPrototype, setPrototype.values, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Set().values()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillSet);
  return {
    get Set() {
      return Set;
    },
    get polyfillSet() {
      return polyfillSet;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Set.js" + '');
System.registerModule("traceur-runtime@0.0.79/node_modules/rsvp/lib/rsvp/asap.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/node_modules/rsvp/lib/rsvp/asap.js";
  var len = 0;
  function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      scheduleFlush();
    }
  }
  var $__default = asap;
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick() {
    return function() {
      process.nextTick(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function() {
      channel.port2.postMessage(0);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];
      callback(arg);
      queue[i] = undefined;
      queue[i + 1] = undefined;
    }
    len = 0;
  }
  var scheduleFlush;
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Promise.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Promise.js";
  var async = System.get("traceur-runtime@0.0.79/node_modules/rsvp/lib/rsvp/asap.js").default;
  var registerPolyfill = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js").registerPolyfill;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: (function(x) {
          promiseResolve(promise, x);
        }),
        reject: (function(r) {
          promiseReject(promise, r);
        })
      };
    } else {
      var result = {};
      result.promise = new C((function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      }));
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function Promise(resolver) {
    if (resolver === promiseRaw)
      return;
    if (typeof resolver !== 'function')
      throw new TypeError;
    var promise = promiseInit(this);
    try {
      resolver((function(x) {
        promiseResolve(promise, x);
      }), (function(r) {
        promiseReject(promise, r);
      }));
    } catch (e) {
      promiseReject(promise, e);
    }
  };
  ($traceurRuntime.createClass)(Promise, {
    catch: function(onReject) {
      return this.then(undefined, onReject);
    },
    then: function(onResolve, onReject) {
      if (typeof onResolve !== 'function')
        onResolve = idResolveHandler;
      if (typeof onReject !== 'function')
        onReject = idRejectHandler;
      var that = this;
      var constructor = this.constructor;
      return chain(this, function(x) {
        x = promiseCoerce(constructor, x);
        return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
      }, onReject);
    }
  }, {
    resolve: function(x) {
      if (this === $Promise) {
        if (isPromise(x)) {
          return x;
        }
        return promiseSet(new $Promise(promiseRaw), +1, x);
      } else {
        return new this(function(resolve, reject) {
          resolve(x);
        });
      }
    },
    reject: function(r) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), -1, r);
      } else {
        return new this((function(resolve, reject) {
          reject(r);
        }));
      }
    },
    all: function(values) {
      var deferred = getDeferred(this);
      var resolutions = [];
      try {
        var count = values.length;
        if (count === 0) {
          deferred.resolve(resolutions);
        } else {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(i, x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            }.bind(undefined, i), (function(r) {
              deferred.reject(r);
            }));
          }
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    },
    race: function(values) {
      var deferred = getDeferred(this);
      try {
        for (var i = 0; i < values.length; i++) {
          this.resolve(values[i]).then((function(x) {
            deferred.resolve(x);
          }), (function(r) {
            deferred.reject(r);
          }));
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    }
  });
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async((function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    }));
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = '@@thenable';
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        x[thenableSymbol] = promise;
        return promise;
      }
      if (typeof then === 'function') {
        var p = x[thenableSymbol];
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          x[thenableSymbol] = deferred.promise;
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  registerPolyfill(polyfillPromise);
  return {
    get Promise() {
      return Promise;
    },
    get polyfillPromise() {
      return polyfillPromise;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Promise.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/StringIterator.js", [], function() {
  "use strict";
  var $__2;
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/StringIterator.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      createIteratorResultObject = $__0.createIteratorResultObject,
      isObject = $__0.isObject;
  var toProperty = $traceurRuntime.toProperty;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function StringIterator() {};
  ($traceurRuntime.createClass)(StringIterator, ($__2 = {}, Object.defineProperty($__2, "next", {
    value: function() {
      var o = this;
      if (!isObject(o) || !hasOwnProperty.call(o, iteratedString)) {
        throw new TypeError('this must be a StringIterator object');
      }
      var s = o[toProperty(iteratedString)];
      if (s === undefined) {
        return createIteratorResultObject(undefined, true);
      }
      var position = o[toProperty(stringIteratorNextIndex)];
      var len = s.length;
      if (position >= len) {
        o[toProperty(iteratedString)] = undefined;
        return createIteratorResultObject(undefined, true);
      }
      var first = s.charCodeAt(position);
      var resultString;
      if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
        resultString = String.fromCharCode(first);
      } else {
        var second = s.charCodeAt(position + 1);
        if (second < 0xDC00 || second > 0xDFFF) {
          resultString = String.fromCharCode(first);
        } else {
          resultString = String.fromCharCode(first) + String.fromCharCode(second);
        }
      }
      o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
      return createIteratorResultObject(resultString, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__2, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__2), {});
  function createStringIterator(string) {
    var s = String(string);
    var iterator = Object.create(StringIterator.prototype);
    iterator[toProperty(iteratedString)] = s;
    iterator[toProperty(stringIteratorNextIndex)] = 0;
    return iterator;
  }
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/String.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/String.js";
  var createStringIterator = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/StringIterator.js").createStringIterator;
  var $__1 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      maybeAddFunctions = $__1.maybeAddFunctions,
      maybeAddIterator = $__1.maybeAddIterator,
      registerPolyfill = $__1.registerPolyfill;
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function includes(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    if (search && $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (pos != pos) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    if (searchLength + start > stringLength) {
      return false;
    }
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint() {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  function stringPrototypeIterator() {
    var o = $traceurRuntime.checkObjectCoercible(this);
    var s = String(o);
    return createStringIterator(s);
  }
  function polyfillString(global) {
    var String = global.String;
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'endsWith', endsWith, 'includes', includes, 'repeat', repeat, 'startsWith', startsWith]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  registerPolyfill(polyfillString);
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get includes() {
      return includes;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    },
    get stringPrototypeIterator() {
      return stringPrototypeIterator;
    },
    get polyfillString() {
      return polyfillString;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/String.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/ArrayIterator.js", [], function() {
  "use strict";
  var $__2;
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/ArrayIterator.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      toObject = $__0.toObject,
      toUint32 = $__0.toUint32,
      createIteratorResultObject = $__0.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__2 = {}, Object.defineProperty($__2, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
      return createIteratorResultObject(index, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__2, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__2), {});
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Array.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Array.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/ArrayIterator.js"),
      entries = $__0.entries,
      keys = $__0.keys,
      values = $__0.values;
  var $__1 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      checkIterable = $__1.checkIterable,
      isCallable = $__1.isCallable,
      isConstructor = $__1.isConstructor,
      maybeAddFunctions = $__1.maybeAddFunctions,
      maybeAddIterator = $__1.maybeAddIterator,
      registerPolyfill = $__1.registerPolyfill,
      toInteger = $__1.toInteger,
      toLength = $__1.toLength,
      toObject = $__1.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      for (var $__2 = items[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__3; !($__3 = $__2.next()).done; ) {
        var item = $__3.value;
        {
          if (mapping) {
            arr[k] = mapFn.call(thisArg, item, k);
          } else {
            arr[k] = item;
          }
          k++;
        }
      }
      arr.length = k;
      return arr;
    }
    len = toLength(items.length);
    arr = isConstructor(C) ? new C(len) : new Array(len);
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function of() {
    for (var items = [],
        $__4 = 0; $__4 < arguments.length; $__4++)
      items[$__4] = arguments[$__4];
    var C = this;
    var len = items.length;
    var arr = isConstructor(C) ? new C(len) : new Array(len);
    for (var k = 0; k < len; k++) {
      arr[k] = items[k];
    }
    arr.length = len;
    return arr;
  }
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      var value = object[i];
      if (predicate.call(thisArg, value, i, object)) {
        return returnIndex ? i : value;
      }
    }
    return returnIndex ? -1 : undefined;
  }
  function polyfillArray(global) {
    var $__5 = global,
        Array = $__5.Array,
        Object = $__5.Object,
        Symbol = $__5.Symbol;
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from, 'of', of]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(Object.getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  registerPolyfill(polyfillArray);
  return {
    get from() {
      return from;
    },
    get of() {
      return of;
    },
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    },
    get polyfillArray() {
      return polyfillArray;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Array.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Object.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Object.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill;
  var $__1 = $traceurRuntime,
      defineProperty = $__1.defineProperty,
      getOwnPropertyDescriptor = $__1.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__1.getOwnPropertyNames,
      isPrivateName = $__1.isPrivateName,
      keys = $__1.keys;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = source == null ? [] : keys(source);
      var p,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        if (isPrivateName(name))
          continue;
        target[name] = source[name];
      }
    }
    return target;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      if (isPrivateName(name))
        continue;
      descriptor = getOwnPropertyDescriptor(source, props[p]);
      defineProperty(target, props[p], descriptor);
    }
    return target;
  }
  function polyfillObject(global) {
    var Object = global.Object;
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  registerPolyfill(polyfillObject);
  return {
    get is() {
      return is;
    },
    get assign() {
      return assign;
    },
    get mixin() {
      return mixin;
    },
    get polyfillObject() {
      return polyfillObject;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Object.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Number.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Number.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      isNumber = $__0.isNumber,
      maybeAddConsts = $__0.maybeAddConsts,
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill,
      toInteger = $__0.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  ;
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  ;
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
    }
    return false;
  }
  function polyfillNumber(global) {
    var Number = global.Number;
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
  }
  registerPolyfill(polyfillNumber);
  return {
    get MAX_SAFE_INTEGER() {
      return MAX_SAFE_INTEGER;
    },
    get MIN_SAFE_INTEGER() {
      return MIN_SAFE_INTEGER;
    },
    get EPSILON() {
      return EPSILON;
    },
    get isFinite() {
      return NumberIsFinite;
    },
    get isInteger() {
      return isInteger;
    },
    get isNaN() {
      return NumberIsNaN;
    },
    get isSafeInteger() {
      return isSafeInteger;
    },
    get polyfillNumber() {
      return polyfillNumber;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Number.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/polyfills.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/polyfills.js";
  var polyfillAll = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js").polyfillAll;
  polyfillAll(Reflect.global);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfillAll(global);
  };
  return {};
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/polyfills.js" + '');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":10,"path":9}],44:[function(require,module,exports){
"use strict";
function Node(obj, dimension, parent) {
  this.obj = obj;
  this.left = null;
  this.right = null;
  this.parent = parent;
  this.dimension = dimension;
}
function KdTree(points, metric, dimensions) {
  var self = this;
  function buildTree(points, depth, parent) {
    var dim = depth % dimensions.length,
        median,
        node;
    if (points.length === 0) {
      return null;
    }
    if (points.length === 1) {
      return new Node(points[0], dim, parent);
    }
    points.sort(function(a, b) {
      return a[dimensions[dim]] - b[dimensions[dim]];
    });
    median = Math.floor(points.length / 2);
    node = new Node(points[median], dim, parent);
    node.left = buildTree(points.slice(0, median), depth + 1, node);
    node.right = buildTree(points.slice(median + 1), depth + 1, node);
    return node;
  }
  this.root = buildTree(points, 0, null);
  this.insert = function(point) {
    function innerSearch(node, parent) {
      if (node === null) {
        return parent;
      }
      var dimension = dimensions[node.dimension];
      if (point[dimension] < node.obj[dimension]) {
        return innerSearch(node.left, node);
      } else {
        return innerSearch(node.right, node);
      }
    }
    var insertPosition = innerSearch(this.root, null),
        newNode,
        dimension;
    if (insertPosition === null) {
      this.root = new Node(point, 0, null);
      return;
    }
    newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
    dimension = dimensions[insertPosition.dimension];
    if (point[dimension] < insertPosition.obj[dimension]) {
      insertPosition.left = newNode;
    } else {
      insertPosition.right = newNode;
    }
  };
  this.remove = function(point) {
    var node;
    function nodeSearch(node) {
      if (node === null) {
        return null;
      }
      if (node.obj === point) {
        return node;
      }
      var dimension = dimensions[node.dimension];
      if (point[dimension] < node.obj[dimension]) {
        return nodeSearch(node.left, node);
      } else {
        return nodeSearch(node.right, node);
      }
    }
    function removeNode(node) {
      var nextNode,
          nextObj,
          pDimension;
      function findMax(node, dim) {
        var dimension,
            own,
            left,
            right,
            max;
        if (node === null) {
          return null;
        }
        dimension = dimensions[dim];
        if (node.dimension === dim) {
          if (node.right !== null) {
            return findMax(node.right, dim);
          }
          return node;
        }
        own = node.obj[dimension];
        left = findMax(node.left, dim);
        right = findMax(node.right, dim);
        max = node;
        if (left !== null && left.obj[dimension] > own) {
          max = left;
        }
        if (right !== null && right.obj[dimension] > max.obj[dimension]) {
          max = right;
        }
        return max;
      }
      function findMin(node, dim) {
        var dimension,
            own,
            left,
            right,
            min;
        if (node === null) {
          return null;
        }
        dimension = dimensions[dim];
        if (node.dimension === dim) {
          if (node.left !== null) {
            return findMin(node.left, dim);
          }
          return node;
        }
        own = node.obj[dimension];
        left = findMin(node.left, dim);
        right = findMin(node.right, dim);
        min = node;
        if (left !== null && left.obj[dimension] < own) {
          min = left;
        }
        if (right !== null && right.obj[dimension] < min.obj[dimension]) {
          min = right;
        }
        return min;
      }
      if (node.left === null && node.right === null) {
        if (node.parent === null) {
          self.root = null;
          return;
        }
        pDimension = dimensions[node.parent.dimension];
        if (node.obj[pDimension] < node.parent.obj[pDimension]) {
          node.parent.left = null;
        } else {
          node.parent.right = null;
        }
        return;
      }
      if (node.left !== null) {
        nextNode = findMax(node.left, node.dimension);
      } else {
        nextNode = findMin(node.right, node.dimension);
      }
      nextObj = nextNode.obj;
      removeNode(nextNode);
      node.obj = nextObj;
    }
    node = nodeSearch(self.root);
    if (node === null) {
      return;
    }
    removeNode(node);
  };
  this.nearest = function(point, maxNodes, maxDistance) {
    var i,
        result,
        bestNodes;
    bestNodes = new BinaryHeap(function(e) {
      return -e[1];
    });
    function nearestSearch(node) {
      var bestChild,
          dimension = dimensions[node.dimension],
          ownDistance = metric(point, node.obj),
          linearPoint = {},
          linearDistance,
          otherChild,
          i;
      function saveNode(node, distance) {
        bestNodes.push([node, distance]);
        if (bestNodes.size() > maxNodes) {
          bestNodes.pop();
        }
      }
      for (i = 0; i < dimensions.length; i += 1) {
        if (i === node.dimension) {
          linearPoint[dimensions[i]] = point[dimensions[i]];
        } else {
          linearPoint[dimensions[i]] = node.obj[dimensions[i]];
        }
      }
      linearDistance = metric(linearPoint, node.obj);
      if (node.right === null && node.left === null) {
        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
          saveNode(node, ownDistance);
        }
        return;
      }
      if (node.right === null) {
        bestChild = node.left;
      } else if (node.left === null) {
        bestChild = node.right;
      } else {
        if (point[dimension] < node.obj[dimension]) {
          bestChild = node.left;
        } else {
          bestChild = node.right;
        }
      }
      nearestSearch(bestChild);
      if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
        saveNode(node, ownDistance);
      }
      if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
        if (bestChild === node.left) {
          otherChild = node.right;
        } else {
          otherChild = node.left;
        }
        if (otherChild !== null) {
          nearestSearch(otherChild);
        }
      }
    }
    if (maxDistance) {
      for (i = 0; i < maxNodes; i += 1) {
        bestNodes.push([null, maxDistance]);
      }
    }
    nearestSearch(self.root);
    result = [];
    for (i = 0; i < maxNodes; i += 1) {
      if (bestNodes.content[i][0]) {
        result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
      }
    }
    return result;
  };
  this.balanceFactor = function() {
    function height(node) {
      if (node === null) {
        return 0;
      }
      return Math.max(height(node.left), height(node.right)) + 1;
    }
    function count(node) {
      if (node === null) {
        return 0;
      }
      return count(node.left) + count(node.right) + 1;
    }
    return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
  };
}
function BinaryHeap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
}
BinaryHeap.prototype = {
  push: function(element) {
    this.content.push(element);
    this.bubbleUp(this.content.length - 1);
  },
  pop: function() {
    var result = this.content[0];
    var end = this.content.pop();
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  },
  peek: function() {
    return this.content[0];
  },
  remove: function(node) {
    var len = this.content.length;
    for (var i = 0; i < len; i++) {
      if (this.content[i] == node) {
        var end = this.content.pop();
        if (i != len - 1) {
          this.content[i] = end;
          if (this.scoreFunction(end) < this.scoreFunction(node))
            this.bubbleUp(i);
          else
            this.sinkDown(i);
        }
        return;
      }
    }
    throw new Error("Node not found.");
  },
  size: function() {
    return this.content.length;
  },
  bubbleUp: function(n) {
    var element = this.content[n];
    while (n > 0) {
      var parentN = Math.floor((n + 1) / 2) - 1,
          parent = this.content[parentN];
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        n = parentN;
      } else {
        break;
      }
    }
  },
  sinkDown: function(n) {
    var length = this.content.length,
        element = this.content[n],
        elemScore = this.scoreFunction(element);
    while (true) {
      var child2N = (n + 1) * 2,
          child1N = child2N - 1;
      var swap = null;
      if (child1N < length) {
        var child1 = this.content[child1N],
            child1Score = this.scoreFunction(child1);
        if (child1Score < elemScore)
          swap = child1N;
      }
      if (child2N < length) {
        var child2 = this.content[child2N],
            child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }
      if (swap != null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      } else {
        break;
      }
    }
  }
};
module.exports = {createKdTree: function(points, metric, dimensions) {
    return new KdTree(points, metric, dimensions);
  }};


//# sourceURL=/Users/goldszmidt/sam/pro/dev/binauralFIR/node_modules/kdt/index.js
},{}]},{},[43,1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi90ZXN0cy90ZXN0cy5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvYXVkaW8tY29udGV4dC9hYy1tb25rZXlwYXRjaC5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL25vZGVfbW9kdWxlcy9hdWRpby1jb250ZXh0L2F1ZGlvLWNvbnRleHQuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaXMtYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL25vZGVfbW9kdWxlcy9jaGFpL2luZGV4LmpzIiwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9hc3NlcnRpb24uanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9jb25maWcuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9jb3JlL2Fzc2VydGlvbnMuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9pbnRlcmZhY2UvYXNzZXJ0LmpzIiwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvaW50ZXJmYWNlL2V4cGVjdC5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2ludGVyZmFjZS9zaG91bGQuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9hZGRDaGFpbmFibGVNZXRob2QuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9hZGRNZXRob2QuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9hZGRQcm9wZXJ0eS5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2ZsYWcuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRBY3R1YWwuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRFbnVtZXJhYmxlUHJvcGVydGllcy5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2dldE1lc3NhZ2UuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXROYW1lLmpzIiwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0UGF0aFZhbHVlLmpzIiwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0UHJvcGVydGllcy5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2luZGV4LmpzIiwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvaW5zcGVjdC5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL29iakRpc3BsYXkuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9vdmVyd3JpdGVDaGFpbmFibGVNZXRob2QuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9vdmVyd3JpdGVNZXRob2QuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9vdmVyd3JpdGVQcm9wZXJ0eS5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL3Rlc3QuanMiLCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy90cmFuc2ZlckZsYWdzLmpzIiwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9jaGFpL25vZGVfbW9kdWxlcy9hc3NlcnRpb24tZXJyb3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWwvbGliL2VxbC5qcyIsIm5vZGVfbW9kdWxlcy9jaGFpL25vZGVfbW9kdWxlcy9kZWVwLWVxbC9ub2RlX21vZHVsZXMvdHlwZS1kZXRlY3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWwvbm9kZV9tb2R1bGVzL3R5cGUtZGV0ZWN0L2xpYi90eXBlLmpzIiwibm9kZV9tb2R1bGVzL2VzNmlmeS9ub2RlX21vZHVsZXMvdHJhY2V1ci9iaW4vdHJhY2V1ci1ydW50aW1lLmpzIiwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvbm9kZV9tb2R1bGVzL2tkdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQUEsQUFBSSxFQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7QUFDMUIsQUFBSSxFQUFBLENBQUEsWUFBVyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsZUFBYyxDQUFDLENBQUM7QUFDM0MsQUFBSSxFQUFBLENBQUEsV0FBVSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsd0JBQXVCLENBQUMsQ0FBQTtBQUNsRCxBQUFJLEVBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxJQUFHLE9BQU8sQ0FBQztBQVF4QixBQUFJLEVBQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxZQUFXLFlBQVksQ0FBQztBQUd6QyxPQUFTLGFBQVcsQ0FBRSxHQUFFLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDOUIsT0FBTyxDQUFBLElBQUcsTUFBTSxBQUFDLENBQUMsSUFBRyxPQUFPLEFBQUMsRUFBQyxDQUFBLENBQUksRUFBQyxHQUFFLEVBQUksSUFBRSxDQUFBLENBQUksRUFBQSxDQUFDLENBQUMsQ0FBQSxDQUFJLElBQUUsQ0FBQztBQUMxRDtBQUFBLEFBRUEsT0FBTyxBQUFDLENBQUMsbUJBQWtCLENBQUcsVUFBUSxBQUFDLENBQUU7QUFFdkMsS0FBRyxPQUFPLEVBQUksQ0FBQSxZQUFXLGFBQWEsQUFBQyxDQUFDLENBQUEsQ0FBRyxJQUFFLENBQUcsTUFBSSxDQUFDLENBQUM7QUFDdEQsS0FBRyxLQUFLLEVBQUksQ0FBQSxJQUFHLE9BQU8sZUFBZSxBQUFDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDekMsTUFBUyxHQUFBLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBRyxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsS0FBSyxPQUFPLENBQUcsQ0FBQSxDQUFBLEVBQUUsQ0FBRztBQUN6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QUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsVUFBSSxDQUFFLEVBQUE7QUFBRSxVQUFJLENBQUUsRUFBQTtBQUFFLFVBQUksQ0FBRSxFQUFBO0FBQUUsVUFBSSxDQUFFLEVBQUE7QUFBRSxVQUFJLENBQUUsRUFBQTtBQUFFLFVBQUksQ0FBRSxFQUFBO0FBQUUsVUFBSSxDQUFFLEVBQUE7QUFBRSxVQUFJLENBQUUsRUFBQTtBQUFFLFVBQUksQ0FBRSxFQUFBO0FBQUUsVUFBSSxDQUFFLEVBQUE7QUFBRSxVQUFJLENBQUUsRUFBQTtBQUFFLFVBQUksQ0FBRSxFQUFBO0FBQUUsVUFBSSxDQUFFLEVBQUE7QUFBRSxVQUFJLENBQUUsRUFBQTtBQUFFLFVBQUksQ0FBRSxFQUFBO0FBQUUsVUFBSSxDQUFFLEVBQUE7QUFBRSxVQUFJLENBQUUsRUFBQTtBQUFBLElBQUM7QUFBRSxNQUFFLENBQUU7QUFBQyxRQUFFLENBQUUsRUFBQyxDQUFBLENBQUUsRUFBQSxDQUFDO0FBQUUsUUFBRSxDQUFFLEVBQUMsQ0FBQSxDQUFFLEVBQUEsQ0FBQztBQUFFLFFBQUUsQ0FBRSxFQUFDLENBQUEsQ0FBRSxFQUFBLENBQUM7QUFBRSxRQUFFLENBQUUsRUFBQyxDQUFBLENBQUUsRUFBQSxDQUFFLEVBQUEsQ0FBQztBQUFFLFFBQUUsQ0FBRSxFQUFDLENBQUEsQ0FBRSxFQUFBLENBQUM7QUFBRSxRQUFFLENBQUUsRUFBQyxDQUFBLENBQUUsRUFBQSxDQUFDO0FBQUUsUUFBRSxDQUFFLEVBQUMsQ0FBQSxDQUFFLEVBQUEsQ0FBQztBQUFFLFFBQUUsQ0FBRSxFQUFDLENBQUEsQ0FBRSxFQUFBLENBQUM7QUFBRSxRQUFFLENBQUUsRUFBQyxDQUFBLENBQUUsRUFBQSxDQUFDO0FBQUUsU0FBRyxDQUFFLEVBQUMsQ0FBQSxDQUFFLEVBQUEsQ0FBQztBQUFBLElBQUM7QUFBRSxNQUFFLENBQUU7QUFBQyxRQUFFLENBQUUsRUFBQTtBQUFFLFFBQUUsQ0FBRSxFQUFBO0FBQUUsUUFBRSxDQUFFLEVBQUE7QUFBRSxRQUFFLENBQUUsRUFBQTtBQUFFLFFBQUUsQ0FBRSxFQUFBO0FBQUUsUUFBRSxDQUFFLEVBQUE7QUFBRSxRQUFFLENBQUUsRUFBQTtBQUFFLFFBQUUsQ0FBRSxFQUFBO0FBQUUsUUFBRSxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxDQUFFLEVBQUE7QUFBRSxTQUFHLENBQUUsRUFBQTtBQUFFLFNBQUcsQ0FBRSxFQUFBO0FBQUUsU0FBRyxD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QUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxRQUFFLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxRQUFFLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxRQUFFLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxlQUFLLENBQUUsRUFBQTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFBLFFBQUM7QUFBRSxZQUFJLENBQUU7QUFBQyxlQUFLLENBQUUsRUFBQTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFBLFFBQUM7QUFBRSxhQUFLLENBQUUsS0FBRztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsSUFBRTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxHQUFDO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsR0FBQztBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxHQUFDO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsSUFBRTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsSUFBRTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsSUFBRTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxlQUFLLENBQUUsRUFBQTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFBLFFBQUM7QUFBRSxZQUFJLENBQUU7QUFBQyxlQUFLLENBQUUsRUFBQTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFBLFFBQUM7QUFBRSxhQUFLLENBQUUsS0FBRztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxTQUFHLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxlQUFLLENBQUUsRUFBQTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFBLFFBQUM7QUFBRSxZQUFJLENBQUU7QUFBQyxlQUFLLENBQUUsRUFBQTtBQUFFLGlCQUFPLENBQUUsRUFBQTtBQUFBLFFBQUM7QUFBRSxhQUFLLENBQUUsS0FBRztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBRSxVQUFJLENBQUU7QUFBQyxjQUFNLENBQUU7QUFBQyxpQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGVBQUssQ0FBRSxJQUFFO0FBQUUsaUJBQU8sQ0FBRSxFQUFBO0FBQUUsZUFBSyxDQUFFLEtBQUc7QUFBQSxRQUFDO0FBQUUsWUFBSSxDQUFFO0FBQUMsaUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxlQUFLLENBQUUsSUFBRTtBQUFFLGlCQUFPLENBQUUsR0FBQztBQUFFLGVBQUssQ0FBRSxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBQSxJQUFDO0FBQUUsY0FBVSxDQUFFO0FBQUMsUUFBRSxDQUFFO0FBQUMsYUFBSyxDQUFFLEdBQUM7QUFBRSxhQUFLLENBQUUsS0FBRztBQUFFLGtCQUFVLENBQUUsRUFBQztBQUFDLGdCQUFNLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsRUFBQTtBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBRSxjQUFJLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsRUFBQTtBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBQSxRQUFDLENBQUU7QUFBQyxnQkFBTSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLEVBQUE7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUUsY0FBSSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLEVBQUE7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUEsUUFBQyxDQUFDO0FBQUEsTUFBQztBQUFFLFFBQUUsQ0FBRTtBQUFDLGFBQUssQ0FBRSxHQUFDO0FBQUUsYUFBSyxDQUFFLGNBQVk7QUFBRSxrQkFBVSxDQUFFLEVBQUM7QUFBQyxnQkFBTSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLEVBQUE7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUUsY0FBSSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLEdBQUM7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUEsUUFBQyxDQUFFO0FBQUMsZ0JBQU0sQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxHQUFDO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFFLGNBQUksQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxHQUFDO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFBLFFBQUMsQ0FBQztBQUFBLE1BQUM7QUFBRSxRQUFFLENBQUU7QUFBQyxhQUFLLENBQUUsR0FBQztBQUFFLGFBQUssQ0FBRSxLQUFHO0FBQUUsa0JBQVUsQ0FBRSxFQUFDO0FBQUMsZ0JBQU0sQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxFQUFBO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFFLGNBQUksQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxFQUFBO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFBLFFBQUMsQ0FBRTtBQUFDLGdCQUFNLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsRUFBQTtBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBRSxjQUFJLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsRUFBQTtBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBQSxRQUFDLENBQUM7QUFBQSxNQUFDO0FBQUUsUUFBRSxDQUFFO0FBQUMsYUFBSyxDQUFFLEdBQUM7QUFBRSxhQUFLLENBQUUsY0FBWTtBQUFFLGtCQUFVLENBQUUsRUFBQztBQUFDLGdCQUFNLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsR0FBQztBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBRSxjQUFJLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsR0FBQztBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBQSxRQUFDLENBQUU7QUFBQyxnQkFBTSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLEdBQUM7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUUsY0FBSSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLElBQUU7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUEsUUFBQyxDQUFFO0FBQUMsZ0JBQU0sQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxJQUFFO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFFLGNBQUksQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxJQUFFO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFBLFFBQUMsQ0FBQztBQUFBLE1BQUM7QUFBRSxRQUFFLENBQUU7QUFBQyxhQUFLLENBQUUsR0FBQztBQUFFLGFBQUssQ0FBRSxLQUFHO0FBQUUsa0JBQVUsQ0FBRSxFQUFDO0FBQUMsZ0JBQU0sQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxFQUFBO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFFLGNBQUksQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxFQUFBO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFBLFFBQUMsQ0FBRTtBQUFDLGdCQUFNLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsRUFBQTtBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBRSxjQUFJLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsRUFBQTtBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBQSxRQUFDLENBQUM7QUFBQSxNQUFDO0FBQUUsUUFBRSxDQUFFO0FBQUMsYUFBSyxDQUFFLEdBQUM7QUFBRSxhQUFLLENBQUUsS0FBRztBQUFFLGtCQUFVLENBQUUsRUFBQztBQUFDLGdCQUFNLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsR0FBQztBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBRSxjQUFJLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsR0FBQztBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBQSxRQUFDLENBQUU7QUFBQyxnQkFBTSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLEdBQUM7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUUsY0FBSSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLEdBQUM7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUEsUUFBQyxDQUFDO0FBQUEsTUFBQztBQUFFLFFBQUUsQ0FBRTtBQUFDLGFBQUssQ0FBRSxHQUFDO0FBQUUsYUFBSyxDQUFFLEtBQUc7QUFBRSxrQkFBVSxDQUFFLEVBQUM7QUFBQyxnQkFBTSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLEVBQUE7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUUsY0FBSSxDQUFFO0FBQUMsbUJBQU8sQ0FBRSxnRUFBOEQ7QUFBRSxpQkFBSyxDQUFFLElBQUU7QUFBRSxtQkFBTyxDQUFFLEVBQUE7QUFBRSxpQkFBSyxDQUFFLEtBQUc7QUFBQSxVQUFDO0FBQUEsUUFBQyxDQUFFO0FBQUMsZ0JBQU0sQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxFQUFBO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFFLGNBQUksQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxFQUFBO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFBLFFBQUMsQ0FBQztBQUFBLE1BQUM7QUFBRSxRQUFFLENBQUU7QUFBQyxhQUFLLENBQUUsR0FBQztBQUFFLGFBQUssQ0FBRSxLQUFHO0FBQUUsa0JBQVUsQ0FBRSxFQUFDO0FBQUMsZ0JBQU0sQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxFQUFBO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFFLGNBQUksQ0FBRTtBQUFDLG1CQUFPLENBQUUsZ0VBQThEO0FBQUUsaUJBQUssQ0FBRSxJQUFFO0FBQUUsbUJBQU8sQ0FBRSxFQUFBO0FBQUUsaUJBQUssQ0FBRSxLQUFHO0FBQUEsVUFBQztBQUFBLFFBQUMsQ0FBRTtBQUFDLGdCQUFNLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsRUFBQTtBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBRSxjQUFJLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsRUFBQTtBQUFFLGlCQUFLLENBQUUsS0FBRztBQUFBLFVBQUM7QUFBQSxRQUFDLENBQUM7QUFBQSxNQUFDO0FBQUUsUUFBRSxDQUFFO0FBQUMsYUFBSyxDQUFFLElBQUU7QUFBRSxhQUFLLENBQUUsS0FBRztBQUFFLGtCQUFVLENBQUUsRUFBQztBQUFDLGdCQUFNLENBQUU7QUFBQyxtQkFBTyxDQUFFLGdFQUE4RDtBQUFFLGlCQUFLLENBQUUsSUFBRTtBQUFFLG1CQUFPLENBQUUsRUFBQTtBQUFF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Q0FBQyxFQUFFLENBQUM7QUFBQyxLQUFHLDRCQUE0QixFQUFFLE1BQUksQ0FBQztBQUFDLDZCQUEyQixFQUFFLENBQUUsSUFBRyxDQUFDLEVBQUUsQ0FBQztBQUFDLEtBQUcsV0FBVyxFQUFFLFVBQVEsQ0FBQztBQUFDLDZCQUEyQixFQUFFLENBQUUsSUFBRyxDQUFDLEVBQUUsQ0FBQztBQUFDLEtBQUcsa0JBQWtCLEVBQUUsQ0FBQSxFQUFDLEVBQUUsS0FBRyxDQUFDO0FBQUMsNkJBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsS0FBRyxNQUFNLEVBQUUsVUFBUSxDQUFDO0FBQUMsNkJBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsS0FBRyxjQUFjLEVBQUUsVUFBUSxDQUFDO0FBQUMsNkJBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsS0FBRyxtQkFBbUIsRUFBRSxVQUFRLENBQUM7QUFBQyw2QkFBMkIsRUFBRSxDQUFFLElBQUcsQ0FBQyxFQUFFLENBQUM7QUFBQyxLQUFHLE1BQU0sRUFBRSxDQUFBLFlBQVcsV0FBVyxBQUFDLEVBQUMsQ0FBQztBQUFDLDZCQUEyQixFQUFFLENBQUUsSUFBRyxDQUFDLEVBQUUsQ0FBQztBQUFDLEtBQUcsY0FBYyxFQUFFLElBQUksb0JBQWtCLEFBQUMsRUFBQyxDQUFDO0FBQUMsNkJBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsS0FBRyxjQUFjLEtBQUssTUFBTSxFQUFFLEVBQUEsQ0FBQztBQUFDLDZCQUEyQixFQUFFLENBQUUsSUFBRyxDQUFDLEVBQUUsQ0FBQztBQUFDLEtBQUcsTUFBTSxRQUFRLEFBQUMsQ0FBQyxJQUFHLGNBQWMsTUFBTSxDQUFDLENBQUM7QUFBQyw2QkFBMkIsRUFBRSxDQUFFLElBQUcsQ0FBQyxFQUFFLENBQUM7QUFBQyxLQUFHLG1CQUFtQixFQUFFLElBQUksb0JBQWtCLEFBQUMsRUFBQyxDQUFDO0FBQUMsNkJBQTJCLEVBQUUsQ0FBRSxJ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QUFDLENBQUMsQ0FBQSxFQUFFLEVBQUUsQ0FBQSxDQUFBLEVBQUUsQ0FBRSxFQUFBLENBQUMsQ0FBQztFQUFDO0FBQUUsWUFBVSxDQUFFLFVBQVMsT0FBTSxDQUFFLENBQUEsU0FBUSxDQUFFLENBQUEsUUFBTyxDQUFFO0FBQUMsK0JBQTJCLEVBQUUsQ0FBRSxHQUFFLENBQUMsRUFBRSxDQUFDO0FBQUMsK0JBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsT0FBRyxDQUFDLDRCQUEyQixFQUFFLENBQUUsR0FBRSxDQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUUsQ0FBRSxDQUFBLFNBQVEsT0FBTyxJQUFJLEVBQXJCLEFBQXFCLENBQUMsR0FBRyxFQUFDLDRCQUEyQixFQUFFLENBQUUsR0FBRSxDQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUUsQ0FBRSxDQUFBLFNBQVEsT0FBTyxJQUFJLEVBQXJCLEFBQXFCLENBQUMsQ0FBRTtBQUFDLGlDQUEyQixFQUFFLENBQUUsR0FBRSxDQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUUsQ0FBQztBQUFDLGlDQUEyQixFQUFFLENBQUUsSUFBRyxDQUFDLEVBQUUsQ0FBQztBQUFDLEFBQUksUUFBQSxDQUFBLGVBQWMsRUFBRSxDQUFBLElBQUcsbUJBQW1CLEFBQUMsQ0FBQyxPQUFNLENBQUUsVUFBUSxDQUFFLFNBQU8sQ0FBQyxDQUFDO0FBQUMsaUNBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsU0FBRyxDQUFDLDRCQUEyQixFQUFFLENBQUUsR0FBRSxDQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUUsQ0FBRSxDQUFBLGVBQWMsUUFBUSxJQUFJLENBQUEsSUFBRyxTQUFTLFFBQXhDLEFBQWdELENBQUMsR0FBRyxFQUFDLDRCQUEyQixFQUFFLENBQUUsR0FBRSxDQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUUsQ0FBRSxDQUFBLGVBQWMsVUFBVSxJQUFJLENBQUEsSUFBRyxTQUFTLFVBQTFDLEFBQW9ELENBQUMsQ0FBQSxFQUFHLEVBQUMsNEJBQTJCLEVBQUUsQ0FBRSxHQUFFLENBQUMsQ0FBRSxDQUFBLENBQUMsRUFBRSxDQUFFLENBQUEsZUFBYyxTQUFTLElBQUksQ0FBQSxJQUFHLFNBQVMsU0FBekMsQUFBa0QsQ0FBQyxDQUFFO0FBQUMsbUNBQTJCLEVBQUUsQ0FBRSxHQUFFLENBQUMsQ0FBRSxDQUFBLENBQUMsRUFBRSxDQUFDO0FBQUMsbUNBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsV0FBRyxJQUFHLGNBQWMsQUFBQyxFQUFDLENBQUEsR0FBSSxLQUFHLENBQUU7QUFBQyxxQ0FBMkIsRUFBRSxDQUFFLEdBQUUsQ0FBQyxDQUFFLENBQUEsQ0FBQyxFQUFFLENBQUM7QUFBQyxxQ0FBMkIsRUFBRSxDQUFFLElBQUcsQ0FBQyxFQUFFLENBQUM7QUFBQyxhQUFHLElBQUcsNEJBQTRCLElBQUksS0FBRyxDQUFFO0FBQUMsdUNBQTJCLEVBQUUsQ0FBRSxHQUFFLENBQUMsQ0FBRSxDQUFBLENBQUMsRUFBRSxDQUFDO0FBQUMsdUNBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsd0JBQVksQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFDLENBQUM7VUFBQyxLQUFLO0FBQUMsdUNBQTJCLEVBQUUsQ0FBRSxHQUFFLENBQUMsQ0FBRSxDQUFBLENBQUMsRUFBRSxDQUFDO0FBQUMsdUNBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsZUFBRyw0QkFBNEIsRUFBRSxLQUFHLENBQUM7VUFBQztBQUFBLEFBQUMscUNBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsYUFBRyxhQUFhLFFBQVEsRUFBRSxDQUFBLGVBQWMsUUFBUSxDQUFDO0FBQUMscUNBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsYUFBRyxhQUFhLFVBQVUsRUFBRSxDQUFBLGVBQWMsVUFBVSxDQUFDO0FBQUMscUNBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FB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QUM7QUFBQyw2QkFBMkIsRUFBRSxDQUFFLEtBQUksQ0FBQyxFQUFFLENBQUM7QUFBQyxPQUFPLEtBQUcsQ0FBQztBQUFDLENBQUM7QUFBQywyQkFBMkIsRUFBRSxDQUFFLEtBQUksQ0FBQyxFQUFFLENBQUM7QUFBQyxjQUFjLFlBQVksQUFBQyxDQUFDLG1CQUFrQixDQUFFO0FBQUMsSUFBSSxNQUFJLEVBQUc7QUFBQywrQkFBMkIsRUFBRSxDQUFFLElBQUcsQ0FBQyxFQUFFLENBQUM7QUFBQywrQkFBMkIsRUFBRSxDQUFFLEtBQUksQ0FBQyxFQUFFLENBQUM7QUFBQyxTQUFPLENBQUEsSUFBRyxTQUFTLENBQUM7RUFBQztBQUFFLElBQUksS0FBRyxFQUFHO0FBQUMsK0JBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsK0JBQTJCLEVBQUUsQ0FBRSxLQUFJLENBQUMsRUFBRSxDQUFDO0FBQUMsU0FBTyxDQUFBLElBQUcsU0FBUyxLQUFLLENBQUM7RUFBQztBQUFFLElBQUksT0FBSyxDQUFFLEtBQUksQ0FBRTtBQUFDLCtCQUEyQixFQUFFLENBQUUsSUFBRyxDQUFDLEVBQUUsQ0FBQztBQUFDLCtCQUEyQixFQUFFLENBQUUsS0FBSSxDQUFDLEVBQUUsQ0FBQztBQUFDLE9BQUcsU0FBUyxPQUFPLEVBQUUsTUFBSSxDQUFDO0VBQUM7QUFBRSxRQUFNLENBQUUsVUFBUyxJQUFHLENBQUU7QUFBQywrQkFBMkIsRUFBRSxDQUFFLElBQUcsQ0FBQyxFQUFFLENBQUM7QUFBQywrQkFBMkIsRUFBRSxDQUFFLEtBQUksQ0FBQyxFQUFFLENBQUM7QUFBQyxPQUFHLFNBQVMsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFBQywrQkFBMkIsRUFBRSxDQUFFLEtBQUksQ0FBQyxFQUFFLENBQUM7QUFBQyxTQUFPLEtBQUcsQ0FBQztFQUFDO0FBQUUsV0FBUyxDQUFFLFVBQVMsSUFBRyxDQUFFO0FBQUMsK0JBQTJCLEVBQUUsQ0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDO0FBQUMsK0JBQTJC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S0FBSyxNQUFNLEVBQUksQ0FBQSxNQUFLLE1BQU0sR0FBSyxHQUFDLENBQUM7QUFDakMsS0FBSyxRQUFRLEVBQUksQ0FBQSxNQUFLLE1BQU0sYUFBYSxFQUFJLENBQUEsTUFBSyxNQUFNLGFBQWEsR0FBSyxJQUFJLGFBQVcsQUFBQyxFQUFDLENBQUM7QUFBQTs7OztBQ0g1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWhDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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T0FBSyxVQUFVLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDckMsTUFBSSxVQUFRLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLEFBQUMsQ0FBQyxTQUFRLENBQUMsQ0FBQztFQUM1QyxDQUFDO0FBbUJELE9BQUssYUFBYSxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQ3hDLE1BQUksVUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEFBQUMsQ0FBQyxTQUFRLENBQUMsQ0FBQztFQUNoRCxDQUFDO0FBc0JELE9BQUssT0FBTyxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQ3hDLE1BQUksVUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7RUFDdkMsQ0FBQztBQWlCRCxPQUFLLFVBQVUsRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUMzQyxNQUFJLFVBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBRyxJQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7RUFDM0MsQ0FBQztBQW1CRCxPQUFLLFdBQVcsRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUM1QyxNQUFJLFVBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBRyxJQUFFLENBQUMsR0FBRyxHQUFHLFdBQVcsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0VBQ2hELENBQUM7QUFtQkQsT0FBSyxjQUFjLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDL0MsTUFBSSxVQUFRLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLFdBQVcsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0VBQ3BELENBQUM7QUFrQkQsT0FBSyxRQUFRLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxHQUFFLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDeEMsTUFBSSxVQUFRLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFHLENBQUEsTUFBSyxRQUFRLENBQUMsUUFBUSxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7RUFDdEQsQ0FBQztBQWtCRCxPQUFLLFdBQVcsRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUMzQyxNQUFJLFVBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBRyxJQUFFLENBQUcsQ0FBQSxNQUFLLFdBQVcsQ0FBQyxJQUFJLFFBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDO0VBQzdELENBQUM7QUFnQkQsT0FBSyxNQUFNLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxFQUFDLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDckMsTUFBSSxVQUFRLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLEdBQUcsTUFBTSxBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7RUFDdEMsQ0FBQztBQWdCRCxPQUFLLFNBQVMsRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLEVBQUMsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUN4QyxNQUFJLFVBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBRyxJQUFFLENBQUMsR0FBRyxJQUFJLE1BQU0sQUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0VBQzFDLENBQUM7QUFnQkQsT0FBSyxTQUFTLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDMUMsTUFBSSxVQUFRLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLEdBQUcsS0FBSyxTQUFTLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztFQUNoRCxDQUFDO0FBZ0JELE9BQUssWUFBWSxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQzdDLE1BQUksVUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxHQUFHLElBQUksS0FBSyxTQUFTLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztFQUNwRCxDQUFDO0FBaUJELE9BQUssYUFBYSxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQzlDLE1BQUksVUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxHQUFHLEtBQUssS0FBSyxTQUFTLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztFQUNyRCxDQUFDO0FBaUJELE9BQUssZ0JBQWdCLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDakQsTUFBSSxVQUFRLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLEdBQUcsSUFBSSxLQUFLLEtBQUssU0FBUyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7RUFDekQsQ0FBQztBQWtCRCxPQUFLLFlBQVksRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUNsRCxNQUFJLFVBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBRyxJQUFFLENBQUMsR0FBRyxLQUFLLFNBQVMsQUFBQyxDQUFDLElBQUcsQ0FBRyxJQUFFLENBQUMsQ0FBQztFQUNyRCxDQUFDO0FBa0JELE9BQUssZUFBZSxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQ3JELE1BQUksVUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxHQUFHLElBQUksS0FBSyxTQUFTLEFBQUMsQ0FBQyxJQUFHLENBQUcsSUFBRSxDQUFDLENBQUM7RUFDekQsQ0FBQztBQW1CRCxPQUFLLGdCQUFnQixFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQ3RELE1BQUksVUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxHQUFHLEtBQUssS0FBSyxTQUFTLEFBQUMsQ0FBQyxJQUFHLENBQUcsSUFBRSxDQUFDLENBQUM7RUFDMUQsQ0FBQztBQW1CRCxPQUFLLG1CQUFtQixFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQ3pELE1BQUksVUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxHQUFHLElBQUksS0FBSyxLQUFLLFNBQVMsQUFBQyxDQUFDLElBQUcsQ0FBRyxJQUFFLENBQUMsQ0FBQztFQUM5RCxDQUFDO0FBaUJELE9BQUssU0FBUyxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQ3pDLE1BQUksVUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxHQUFHLEtBQUssT0FBTyxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7RUFDN0MsQ0FBQztBQTBCRCxPQUFLLE1BQU0sRUFBSSxVQUFVLEVBQUMsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUM1QyxPQUFJLFFBQU8sSUFBTSxPQUFPLEtBQUcsQ0FBQSxFQUFLLENBQUEsSUFBRyxXQUFhLE9BQUssQ0FBRztBQUN0RCxTQUFHLEVBQUksS0FBRyxDQUFDO0FBQ1gsU0FBRyxFQUFJLEtBQUcsQ0FBQztJQUNiO0FBQUEsQUFFSSxNQUFBLENBQUEsU0FBUSxFQUFJLENBQUEsR0FBSSxVQUFRLEFBQUMsQ0FBQyxFQUFDLENBQUcsSUFBRSxDQUFDLEdBQUcsTUFBTSxBQUFDLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQzNELFNBQU8sQ0FBQSxJQUFHLEFBQUMsQ0FBQyxTQUFRLENBQUcsU0FBTyxDQUFDLENBQUM7RUFDbEMsQ0FBQztBQW9CRCxPQUFLLGFBQWEsRUFBSSxVQUFVLEVBQUMsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUM3QyxPQUFJLFFBQU8sSUFBTSxPQUFPLEtBQUcsQ0FBRztBQUM1QixRQUFFLEVBQUksS0FBRyxDQUFDO0FBQ1YsU0FBRyxFQUFJLEtBQUcsQ0FBQztJQUNiO0FBQUEsQUFFQSxNQUFJLFVBQVEsQUFBQyxDQUFDLEVBQUMsQ0FBRyxJQUFFLENBQUMsR0FBRyxJQUFJLE1BQU0sQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0VBQzNDLENBQUM7QUFrQkQsT0FBSyxTQUFTLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxRQUFPLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDcEQsT0FBSSxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUcsTUFBSSxDQUFHLElBQUUsQ0FBRyxLQUFHLENBQUcsSUFBRSxDQUFHLEtBQUcsQ0FBRyxLQUFHLENBQUcsTUFBSSxDQUFDLFFBQVEsQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFHO0FBQ3hFLFVBQU0sSUFBSSxNQUFJLEFBQUMsQ0FBQyxvQkFBbUIsRUFBSSxTQUFPLENBQUEsQ0FBSSxJQUFFLENBQUMsQ0FBQztJQUN4RDtBQUFBLEFBQ0ksTUFBQSxDQUFBLElBQUcsRUFBSSxJQUFJLFVBQVEsQUFBQyxDQUFDLElBQUcsQUFBQyxDQUFDLEdBQUUsRUFBSSxTQUFPLENBQUEsQ0FBSSxLQUFHLENBQUMsQ0FBRyxJQUFFLENBQUMsQ0FBQztBQUMxRCxPQUFHLE9BQU8sQUFBQyxDQUNQLElBQUcsSUFBTSxDQUFBLElBQUcsQUFBQyxDQUFDLElBQUcsQ0FBRyxTQUFPLENBQUMsQ0FDNUIsQ0FBQSxXQUFVLEVBQUksQ0FBQSxJQUFHLFFBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBQyxDQUFBLENBQUksVUFBUSxDQUFBLENBQUksU0FBTyxDQUFBLENBQUksSUFBRSxDQUFBLENBQUksQ0FBQSxJQUFHLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUNoRixDQUFBLFdBQVUsRUFBSSxDQUFBLElBQUcsUUFBUSxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUEsQ0FBSSxjQUFZLENBQUEsQ0FBSSxTQUFPLENBQUEsQ0FBSSxJQUFFLENBQUEsQ0FBSSxDQUFBLElBQUcsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUUsQ0FBQztFQUM3RixDQUFDO0FBaUJELE9BQUssUUFBUSxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQy9DLE1BQUksVUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxBQUFDLENBQUMsR0FBRSxDQUFHLE1BQUksQ0FBQyxDQUFDO0VBQ25ELENBQUM7QUFpQkQsT0FBSyxZQUFZLEVBQUksVUFBVSxJQUFHLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDOUMsTUFBSSxVQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsSUFBRSxDQUFDLEdBQUcsS0FBSyxLQUFLLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0VBQ3JELENBQUE7QUFpQkEsT0FBSyxlQUFlLEVBQUksVUFBVSxRQUFPLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDdkQsTUFBSSxVQUFRLEFBQUMsQ0FBQyxRQUFPLENBQUcsSUFBRSxDQUFDLEdBQUcsUUFBUSxRQUFRLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztFQUN6RCxDQUFBO0FBTUEsT0FBSyxRQUFRLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDbkMsTUFBSSxVQUFRLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztFQUN0QyxDQUFDO0FBTUQsRUFBQyxRQUFTLE1BQUksQ0FBRSxJQUFHLENBQUcsQ0FBQSxFQUFDLENBQUU7QUFDdkIsU0FBSyxDQUFFLEVBQUMsQ0FBQyxFQUFJLENBQUEsTUFBSyxDQUFFLElBQUcsQ0FBQyxDQUFDO0FBQ3pCLFNBQU8sTUFBSSxDQUFDO0VBQ2QsQ0FBQyxBQUNELENBQUMsT0FBTSxDQUFHLFFBQU0sQ0FBQyxBQUNqQixDQUFDLE9BQU0sQ0FBRyxTQUFPLENBQUMsQ0FBQztBQUNyQixDQUFDO0FBQ0Q7Ozs7QUMxaENBO0FBQUEsS0FBSyxRQUFRLEVBQUksVUFBVSxJQUFHLENBQUcsQ0FBQSxJQUFHLENBQUc7QUFDckMsS0FBRyxPQUFPLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxPQUFNLENBQUc7QUFDcEMsU0FBTyxJQUFJLENBQUEsSUFBRyxVQUFVLEFBQUMsQ0FBQyxHQUFFLENBQUcsUUFBTSxDQUFDLENBQUM7RUFDekMsQ0FBQztBQUNILENBQUM7QUFFRDs7OztBQ05BO0FBQUEsS0FBSyxRQUFRLEVBQUksVUFBVSxJQUFHLENBQUcsQ0FBQSxJQUFHLENBQUc7QUFDckMsQUFBSSxJQUFBLENBQUEsU0FBUSxFQUFJLENBQUEsSUFBRyxVQUFVLENBQUM7QUFFOUIsU0FBUyxXQUFTLENBQUUsQUFBQyxDQUFFO0FBRXJCLFdBQVMsYUFBVyxDQUFDLEFBQUMsQ0FBRTtBQUN0QixTQUFJLElBQUcsV0FBYSxPQUFLLENBQUEsRUFBSyxDQUFBLElBQUcsV0FBYSxPQUFLLENBQUc7QUFDcEQsYUFBTyxJQUFJLFVBQVEsQUFBQyxDQUFDLElBQUcsWUFBWSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUcsS0FBRyxDQUFHLGFBQVcsQ0FBQyxDQUFDO01BQ2xFLEtBQU8sS0FBSSxJQUFHLFdBQWEsUUFBTSxDQUFHO0FBQ2xDLGFBQU8sSUFBSSxVQUFRLEFBQUMsQ0FBQyxJQUFHLEdBQUssS0FBRyxDQUFHLEtBQUcsQ0FBRyxhQUFXLENBQUMsQ0FBQztNQUN4RDtBQUFBLEFBQ0EsV0FBTyxJQUFJLFVBQVEsQUFBQyxDQUFDLElBQUcsQ0FBRyxLQUFHLENBQUcsYUFBVyxDQUFDLENBQUM7SUFDaEQ7QUFBQSxBQUNBLFdBQVMsYUFBVyxDQUFFLEtBQUksQ0FBRztBQU8zQixXQUFLLGVBQWUsQUFBQyxDQUFDLElBQUcsQ0FBRyxTQUFPLENBQUc7QUFDcEMsWUFBSSxDQUFHLE1BQUk7QUFDWCxpQkFBUyxDQUFHLEtBQUc7QUFDZixtQkFBVyxDQUFHLEtBQUc7QUFDakIsZUFBTyxDQUFHLEtBQUc7QUFBQSxNQUNmLENBQUMsQ0FBQztJQUNKO0FBQUEsQUFFQSxTQUFLLGVBQWUsQUFBQyxDQUFDLE1BQUssVUFBVSxDQUFHLFNBQU8sQ0FBRztBQUNoRCxRQUFFLENBQUcsYUFBVztBQUNkLFFBQUUsQ0FBRyxhQUFXO0FBQ2hCLGlCQUFXLENBQUcsS0FBRztBQUFBLElBQ3JCLENBQUMsQ0FBQztBQUVGLEFBQUksTUFBQSxDQUFBLE1BQUssRUFBSSxHQUFDLENBQUM7QUFFZixTQUFLLE1BQU0sRUFBSSxVQUFVLElBQUcsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUN4QyxRQUFJLFVBQVEsQUFBQyxDQUFDLElBQUcsQ0FBRyxJQUFFLENBQUMsR0FBRyxNQUFNLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0FBRUQsU0FBSyxNQUFNLEVBQUksVUFBVSxFQUFDLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDNUMsUUFBSSxVQUFRLEFBQUMsQ0FBQyxFQUFDLENBQUcsSUFBRSxDQUFDLEdBQUcsTUFBTSxBQUFDLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7QUFFRCxTQUFLLE1BQU0sRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUNqQyxRQUFJLFVBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBRyxJQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDbEMsQ0FBQTtBQUdBLFNBQUssSUFBSSxFQUFJLEdBQUMsQ0FBQTtBQUVkLFNBQUssSUFBSSxNQUFNLEVBQUksVUFBVSxJQUFHLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFLENBQUc7QUFDNUMsUUFBSSxVQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsSUFBRSxDQUFDLEdBQUcsSUFBSSxNQUFNLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDO0FBRUQsU0FBSyxJQUFJLE1BQU0sRUFBSSxVQUFVLEVBQUMsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUNoRCxRQUFJLFVBQVEsQUFBQyxDQUFDLEVBQUMsQ0FBRyxJQUFFLENBQUMsR0FBRyxJQUFJLE1BQU0sQUFBQyxDQUFDLElBQUcsQ0FBRyxLQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0FBRUQsU0FBSyxJQUFJLE1BQU0sRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUNyQyxRQUFJLFVBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBRyxJQUFFLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQztJQUN0QyxDQUFBO0FBRUEsU0FBSyxDQUFFLE9BQU0sQ0FBQyxFQUFJLENBQUEsTUFBSyxDQUFFLE9BQU0sQ0FBQyxDQUFDO0FBQ2pDLFNBQUssSUFBSSxDQUFFLE9BQU0sQ0FBQyxFQUFJLENBQUEsTUFBSyxJQUFJLENBQUUsT0FBTSxDQUFDLENBQUM7QUFFekMsU0FBTyxPQUFLLENBQUM7RUFDZjtBQUFBLEFBQUMsRUFBQTtBQUVELEtBQUcsT0FBTyxFQUFJLFdBQVMsQ0FBQztBQUN4QixLQUFHLE9BQU8sRUFBSSxXQUFTLENBQUM7QUFDMUIsQ0FBQztBQUNEOzs7O0FDcEVBO0FBQUEsQUFBSSxFQUFBLENBQUEsYUFBWSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsaUJBQWdCLENBQUMsQ0FBQztBQUM5QyxBQUFJLEVBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUM1QixBQUFJLEVBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBQztBQU9qQyxBQUFJLEVBQUEsQ0FBQSxlQUFjLEVBQUksQ0FBQSxXQUFVLEdBQUssT0FBSyxDQUFDO0FBSzNDLEFBQUksRUFBQSxDQUFBLFlBQVcsRUFBSSxxQ0FBbUMsQ0FBQztBQUd2RCxBQUFJLEVBQUEsQ0FBQSxJQUFHLEVBQUssQ0FBQSxRQUFPLFVBQVUsS0FBSztBQUM5QixRQUFJLEVBQUksQ0FBQSxRQUFPLFVBQVUsTUFBTSxDQUFDO0FBOEJwQyxLQUFLLFFBQVEsRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLGdCQUFlLENBQUc7QUFDOUQsS0FBSSxNQUFPLGlCQUFlLENBQUEsR0FBTSxXQUFTLENBQUc7QUFDMUMsbUJBQWUsRUFBSSxVQUFTLEFBQUMsQ0FBRSxHQUFFLENBQUM7RUFDcEM7QUFBQSxBQUVJLElBQUEsQ0FBQSxpQkFBZ0IsRUFBSTtBQUNwQixTQUFLLENBQUcsT0FBSztBQUNiLG1CQUFlLENBQUcsaUJBQWU7QUFBQSxFQUNyQyxDQUFDO0FBR0QsS0FBSSxDQUFDLEdBQUUsVUFBVSxDQUFHO0FBQ2xCLE1BQUUsVUFBVSxFQUFJLEdBQUMsQ0FBQztFQUNwQjtBQUFBLEFBQ0EsSUFBRSxVQUFVLENBQUUsSUFBRyxDQUFDLEVBQUksa0JBQWdCLENBQUM7QUFFdkMsT0FBSyxlQUFlLEFBQUMsQ0FBQyxHQUFFLENBQUcsS0FBRyxDQUM1QjtBQUFFLE1BQUUsQ0FBRyxVQUFTLEFBQUMsQ0FBRTtBQUNmLHNCQUFnQixpQkFBaUIsS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFFN0MsQUFBSSxRQUFBLENBQUEsTUFBSyxFQUFJLFNBQVMsT0FBSyxDQUFDLEFBQUMsQ0FBRTtBQUM3QixBQUFJLFVBQUEsQ0FBQSxRQUFPLEVBQUksQ0FBQSxJQUFHLEFBQUMsQ0FBQyxJQUFHLENBQUcsT0FBSyxDQUFDLENBQUM7QUFDakMsV0FBSSxRQUFPLEdBQUssQ0FBQSxNQUFLLGFBQWEsSUFBTSxNQUFJO0FBQzFDLGFBQUcsQUFBQyxDQUFDLElBQUcsQ0FBRyxPQUFLLENBQUcsT0FBSyxDQUFDLENBQUM7QUFBQSxBQUN4QixVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsaUJBQWdCLE9BQU8sTUFBTSxBQUFDLENBQUMsSUFBRyxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQzVELGFBQU8sQ0FBQSxNQUFLLElBQU0sVUFBUSxDQUFBLENBQUksS0FBRyxFQUFJLE9BQUssQ0FBQztNQUM3QyxDQUFDO0FBR0QsU0FBSSxlQUFjLENBQUc7QUFFbkIsQUFBSSxVQUFBLENBQUEsU0FBUSxFQUFJLENBQUEsTUFBSyxVQUFVLEVBQUksQ0FBQSxNQUFLLE9BQU8sQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBRXRELGdCQUFRLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDckIsZ0JBQVEsTUFBTSxFQUFJLE1BQUksQ0FBQztNQUN6QixLQUVLO0FBQ0gsQUFBSSxVQUFBLENBQUEsYUFBWSxFQUFJLENBQUEsTUFBSyxvQkFBb0IsQUFBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDO0FBQ25ELG9CQUFZLFFBQVEsQUFBQyxDQUFDLFNBQVUsWUFBVyxDQUFHO0FBQzVDLGFBQUksQ0FBQyxZQUFXLEtBQUssQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFHO0FBQ3BDLEFBQUksY0FBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLE1BQUsseUJBQXlCLEFBQUMsQ0FBQyxHQUFFLENBQUcsYUFBVyxDQUFDLENBQUM7QUFDM0QsaUJBQUssZUFBZSxBQUFDLENBQUMsTUFBSyxDQUFHLGFBQVcsQ0FBRyxHQUFDLENBQUMsQ0FBQztVQUNqRDtBQUFBLFFBQ0YsQ0FBQyxDQUFDO01BQ0o7QUFBQSxBQUVBLGtCQUFZLEFBQUMsQ0FBQyxJQUFHLENBQUcsT0FBSyxDQUFDLENBQUM7QUFDM0IsV0FBTyxPQUFLLENBQUM7SUFDZjtBQUNBLGVBQVcsQ0FBRyxLQUFHO0FBQUEsRUFDckIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNEOzs7O0FDekdBO0FBQUEsQUFBSSxFQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUM7QUEwQmpDLEFBQUksRUFBQSxDQUFBLElBQUcsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBRTVCLEtBQUssUUFBUSxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsTUFBSyxDQUFHO0FBQzVDLElBQUUsQ0FBRSxJQUFHLENBQUMsRUFBSSxVQUFTLEFBQUMsQ0FBRTtBQUN0QixBQUFJLE1BQUEsQ0FBQSxRQUFPLEVBQUksQ0FBQSxJQUFHLEFBQUMsQ0FBQyxJQUFHLENBQUcsT0FBSyxDQUFDLENBQUM7QUFDakMsT0FBSSxRQUFPLEdBQUssQ0FBQSxNQUFLLGFBQWEsSUFBTSxNQUFJO0FBQzFDLFNBQUcsQUFBQyxDQUFDLElBQUcsQ0FBRyxPQUFLLENBQUcsQ0FBQSxHQUFFLENBQUUsSUFBRyxDQUFDLENBQUMsQ0FBQztBQUFBLEFBQzNCLE1BQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxNQUFLLE1BQU0sQUFBQyxDQUFDLElBQUcsQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUMxQyxTQUFPLENBQUEsTUFBSyxJQUFNLFVBQVEsQ0FBQSxDQUFJLEtBQUcsRUFBSSxPQUFLLENBQUM7RUFDN0MsQ0FBQztBQUNILENBQUM7QUFDRDs7OztBQ1pBO0FBQUEsS0FBSyxRQUFRLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxNQUFLLENBQUc7QUFDNUMsT0FBSyxlQUFlLEFBQUMsQ0FBQyxHQUFFLENBQUcsS0FBRyxDQUM1QjtBQUFFLE1BQUUsQ0FBRyxVQUFTLEFBQUMsQ0FBRTtBQUNmLEFBQUksUUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLE1BQUssS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDOUIsV0FBTyxDQUFBLE1BQUssSUFBTSxVQUFRLENBQUEsQ0FBSSxLQUFHLEVBQUksT0FBSyxDQUFDO0lBQzdDO0FBQ0EsZUFBVyxDQUFHLEtBQUc7QUFBQSxFQUNyQixDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0Q7Ozs7QUNoQkE7QUFBQSxLQUFLLFFBQVEsRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLEtBQUksQ0FBRztBQUMxQyxBQUFJLElBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxHQUFFLFFBQVEsR0FBSyxFQUFDLEdBQUUsUUFBUSxFQUFJLENBQUEsTUFBSyxPQUFPLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzlELEtBQUksU0FBUSxPQUFPLElBQU0sRUFBQSxDQUFHO0FBQzFCLFFBQUksQ0FBRSxHQUFFLENBQUMsRUFBSSxNQUFJLENBQUM7RUFDcEIsS0FBTztBQUNMLFNBQU8sQ0FBQSxLQUFJLENBQUUsR0FBRSxDQUFDLENBQUM7RUFDbkI7QUFBQSxBQUNGLENBQUM7QUFDRDs7OztBQ2pCQTtBQUFBLEtBQUssUUFBUSxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHO0FBQ3BDLE9BQU8sQ0FBQSxJQUFHLE9BQU8sRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLElBQUcsQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLEdBQUUsS0FBSyxDQUFDO0FBQzdDLENBQUM7QUFDRDs7OztBQ0FBO0FBQUEsS0FBSyxRQUFRLEVBQUksU0FBUyx3QkFBc0IsQ0FBRSxNQUFLLENBQUc7QUFDeEQsQUFBSSxJQUFBLENBQUEsTUFBSyxFQUFJLEdBQUMsQ0FBQztBQUNmLE1BQVMsR0FBQSxDQUFBLElBQUcsQ0FBQSxFQUFLLE9BQUssQ0FBRztBQUN2QixTQUFLLEtBQUssQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0VBQ25CO0FBQUEsQUFDQSxPQUFPLE9BQUssQ0FBQztBQUNmLENBQUM7QUFDRDs7OztBQ2ZBO0FBQUEsQUFBSSxFQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsUUFBTyxDQUFDO0FBQ3ZCLFlBQVEsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGFBQVksQ0FBQztBQUNqQyxVQUFNLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxXQUFVLENBQUM7QUFDN0IsYUFBUyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsY0FBYSxDQUFDLENBQUM7QUFvQnhDLEtBQUssUUFBUSxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHO0FBQ3BDLEFBQUksSUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLElBQUcsQUFBQyxDQUFDLEdBQUUsQ0FBRyxTQUFPLENBQUM7QUFDM0IsUUFBRSxFQUFJLENBQUEsSUFBRyxBQUFDLENBQUMsR0FBRSxDQUFHLFNBQU8sQ0FBQztBQUN4QixhQUFPLEVBQUksQ0FBQSxJQUFHLENBQUUsQ0FBQSxDQUFDO0FBQ2pCLFdBQUssRUFBSSxDQUFBLFNBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBRyxLQUFHLENBQUM7QUFDNUIsUUFBRSxFQUFJLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsSUFBRyxDQUFFLENBQUEsQ0FBQztBQUMvQixZQUFNLEVBQUksQ0FBQSxJQUFHLEFBQUMsQ0FBQyxHQUFFLENBQUcsVUFBUSxDQUFDLENBQUM7QUFFbEMsS0FBRyxNQUFPLElBQUUsQ0FBQSxHQUFNLFdBQVM7QUFBRyxNQUFFLEVBQUksQ0FBQSxHQUFFLEFBQUMsRUFBQyxDQUFDO0FBQUEsQUFDekMsSUFBRSxFQUFJLENBQUEsR0FBRSxHQUFLLEdBQUMsQ0FBQztBQUNmLElBQUUsRUFBSSxDQUFBLEdBQUUsUUFDQyxBQUFDLENBQUMsVUFBUyxDQUFHLENBQUEsVUFBUyxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsUUFDN0IsQUFBQyxDQUFDLFNBQVEsQ0FBRyxDQUFBLFVBQVMsQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDLFFBQy9CLEFBQUMsQ0FBQyxTQUFRLENBQUcsQ0FBQSxVQUFTLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQyxDQUFDO0FBRTNDLE9BQU8sQ0FBQSxPQUFNLEVBQUksQ0FBQSxPQUFNLEVBQUksS0FBRyxDQUFBLENBQUksSUFBRSxDQUFBLENBQUksSUFBRSxDQUFDO0FBQzdDLENBQUM7QUFDRDs7OztBQ3BDQTtBQUFBLEtBQUssUUFBUSxFQUFJLFVBQVUsSUFBRyxDQUFHO0FBQy9CLEtBQUksSUFBRyxLQUFLO0FBQUcsU0FBTyxDQUFBLElBQUcsS0FBSyxDQUFDO0FBQUEsQUFFM0IsSUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLHdCQUF1QixLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUMvQyxPQUFPLENBQUEsS0FBSSxHQUFLLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFBLENBQUksQ0FBQSxLQUFJLENBQUUsQ0FBQSxDQUFDLEVBQUksR0FBQyxDQUFDO0FBQzFDLENBQUM7QUFDRDs7OztBQ2lCQTtBQUFBLEFBQUksRUFBQSxDQUFBLFlBQVcsRUFBSSxDQUFBLE1BQUssUUFBUSxFQUFJLFVBQVUsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQ3ZELEFBQUksSUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLFNBQVEsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQzVCLE9BQU8sQ0FBQSxhQUFZLEFBQUMsQ0FBQyxNQUFLLENBQUcsSUFBRSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQW9CRCxPQUFTLFVBQVEsQ0FBRyxJQUFHLENBQUc7QUFDeEIsQUFBSSxJQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsSUFBRyxRQUFRLEFBQUMsQ0FBQyxLQUFJLENBQUcsS0FBRyxDQUFDO0FBQzlCLFVBQUksRUFBSSxDQUFBLEdBQUUsTUFBTSxBQUFDLENBQUMsaUJBQWdCLENBQUMsQ0FBQztBQUN4QyxPQUFPLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxTQUFVLEtBQUksQ0FBRztBQUNoQyxBQUFJLE1BQUEsQ0FBQSxFQUFDLEVBQUksYUFBVztBQUNoQixXQUFHLEVBQUksQ0FBQSxFQUFDLEtBQUssQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFBO0FBQ3hCLE9BQUksSUFBRztBQUFHLFdBQU8sRUFBRSxDQUFBLENBQUcsQ0FBQSxVQUFTLEFBQUMsQ0FBQyxJQUFHLENBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBRSxDQUFDOztBQUN0QyxXQUFPLEVBQUUsQ0FBQSxDQUFHLE1BQUksQ0FBRSxDQUFDO0FBQUEsRUFDMUIsQ0FBQyxDQUFDO0FBQ0o7QUFBQSxBQUFDO0FBZ0JELE9BQVMsY0FBWSxDQUFHLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRztBQUNuQyxBQUFJLElBQUEsQ0FBQSxHQUFFLEVBQUksSUFBRTtBQUNSLFFBQUUsQ0FBQztBQUNQLE1BQVMsR0FBQSxDQUFBLENBQUEsRUFBSSxFQUFBO0FBQUcsTUFBQSxFQUFJLENBQUEsTUFBSyxPQUFPLENBQUcsQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFFLENBQUc7QUFDN0MsQUFBSSxNQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsTUFBSyxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBQ3BCLE9BQUksR0FBRSxDQUFHO0FBQ1AsU0FBSSxXQUFVLElBQU0sT0FBTyxLQUFHLEVBQUU7QUFDOUIsVUFBRSxFQUFJLENBQUEsR0FBRSxDQUFFLElBQUcsRUFBRSxDQUFDLENBQUM7U0FDZCxLQUFJLFdBQVUsSUFBTSxPQUFPLEtBQUcsRUFBRTtBQUNuQyxVQUFFLEVBQUksQ0FBQSxHQUFFLENBQUUsSUFBRyxFQUFFLENBQUMsQ0FBQztBQUFBLEFBQ25CLFNBQUksQ0FBQSxHQUFLLEVBQUMsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUFHLFVBQUUsRUFBSSxJQUFFLENBQUM7QUFBQSxJQUM3QixLQUFPO0FBQ0wsUUFBRSxFQUFJLFVBQVEsQ0FBQztJQUNqQjtBQUFBLEVBQ0Y7QUFBQSxBQUNBLE9BQU8sSUFBRSxDQUFDO0FBQ1o7QUFBQSxBQUFDO0FBQ0Q7Ozs7QUNwRkE7QUFBQSxLQUFLLFFBQVEsRUFBSSxTQUFTLGNBQVksQ0FBRSxNQUFLLENBQUc7QUFDOUMsQUFBSSxJQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsTUFBSyxvQkFBb0IsQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBRWhELFNBQVMsWUFBVSxDQUFFLFFBQU8sQ0FBRztBQUM3QixPQUFJLE1BQUssUUFBUSxBQUFDLENBQUMsUUFBTyxDQUFDLENBQUEsR0FBTSxFQUFDLENBQUEsQ0FBRztBQUNuQyxXQUFLLEtBQUssQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDO0lBQ3ZCO0FBQUEsRUFDRjtBQUFBLEFBRUksSUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLE1BQUssZUFBZSxBQUFDLENBQUMsT0FBTSxDQUFDLENBQUM7QUFDMUMsUUFBTyxLQUFJLElBQU0sS0FBRyxDQUFHO0FBQ3JCLFNBQUssb0JBQW9CLEFBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUM7QUFDdEQsUUFBSSxFQUFJLENBQUEsTUFBSyxlQUFlLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztFQUN0QztBQUFBLEFBRUEsT0FBTyxPQUFLLENBQUM7QUFDZixDQUFDO0FBQ0Q7Ozs7QUN6QkE7QUFBQSxBQUFJLEVBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxNQUFLLFFBQVEsRUFBSSxHQUFDLENBQUM7QUFNakMsTUFBTSxLQUFLLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQU1oQyxNQUFNLEtBQUssRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBTWhDLE1BQU0sV0FBVyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsY0FBYSxDQUFDLENBQUM7QUFNNUMsTUFBTSxVQUFVLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxhQUFZLENBQUMsQ0FBQztBQU0xQyxNQUFNLFFBQVEsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0FBTXRDLE1BQU0sV0FBVyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsY0FBYSxDQUFDLENBQUM7QUFNNUMsTUFBTSxLQUFLLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQU1oQyxNQUFNLGNBQWMsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGlCQUFnQixDQUFDLENBQUM7QUFNbEQsTUFBTSxJQUFJLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxVQUFTLENBQUMsQ0FBQztBQU1qQyxNQUFNLGFBQWEsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGdCQUFlLENBQUMsQ0FBQztBQU1oRCxNQUFNLFFBQVEsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0FBTXRDLE1BQU0sWUFBWSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsZUFBYyxDQUFDLENBQUM7QUFNOUMsTUFBTSxVQUFVLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxhQUFZLENBQUMsQ0FBQztBQU0xQyxNQUFNLGtCQUFrQixFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMscUJBQW9CLENBQUMsQ0FBQztBQU0xRCxNQUFNLGdCQUFnQixFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsbUJBQWtCLENBQUMsQ0FBQztBQU10RCxNQUFNLG1CQUFtQixFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsc0JBQXFCLENBQUMsQ0FBQztBQU01RCxNQUFNLHlCQUF5QixFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsNEJBQTJCLENBQUMsQ0FBQztBQUV4RTs7OztBQy9HQTtBQUFBLEFBQUksRUFBQSxDQUFBLE9BQU0sRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0FBQ2xDLEFBQUksRUFBQSxDQUFBLGFBQVksRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGlCQUFnQixDQUFDLENBQUM7QUFDOUMsQUFBSSxFQUFBLENBQUEsdUJBQXNCLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQywyQkFBMEIsQ0FBQyxDQUFDO0FBRWxFLEtBQUssUUFBUSxFQUFJLFFBQU0sQ0FBQztBQWF4QixPQUFTLFFBQU0sQ0FBRSxHQUFFLENBQUcsQ0FBQSxVQUFTLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxNQUFLLENBQUc7QUFDL0MsQUFBSSxJQUFBLENBQUEsR0FBRSxFQUFJO0FBQ1IsYUFBUyxDQUFHLFdBQVM7QUFDckIsT0FBRyxDQUFHLEdBQUM7QUFDUCxVQUFNLENBQUcsVUFBVSxHQUFFLENBQUc7QUFBRSxXQUFPLElBQUUsQ0FBQztJQUFFO0FBQUEsRUFDeEMsQ0FBQztBQUNELE9BQU8sQ0FBQSxXQUFVLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFHLEVBQUMsTUFBTyxNQUFJLENBQUEsR0FBTSxZQUFVLENBQUEsQ0FBSSxFQUFBLEVBQUksTUFBSSxDQUFDLENBQUMsQ0FBQztBQUMxRTtBQUFBLEFBR0ksRUFBQSxDQUFBLFlBQVcsRUFBSSxVQUFVLE1BQUssQ0FBRztBQUNuQyxLQUFJLE1BQU8sWUFBVSxDQUFBLEdBQU0sU0FBTyxDQUFHO0FBQ25DLFNBQU8sQ0FBQSxNQUFLLFdBQWEsWUFBVSxDQUFDO0VBQ3RDLEtBQU87QUFDTCxTQUFPLENBQUEsTUFBSyxHQUNWLENBQUEsTUFBTyxPQUFLLENBQUEsR0FBTSxTQUFPLENBQUEsRUFDekIsQ0FBQSxNQUFLLFNBQVMsSUFBTSxFQUFBLENBQUEsRUFDcEIsQ0FBQSxNQUFPLE9BQUssU0FBUyxDQUFBLEdBQU0sU0FBTyxDQUFDO0VBQ3ZDO0FBQUEsQUFDRixDQUFDO0FBRUQsT0FBUyxZQUFVLENBQUUsR0FBRSxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsWUFBVyxDQUFHO0FBRzdDLEtBQUksS0FBSSxHQUFLLENBQUEsTUFBTyxNQUFJLFFBQVEsQ0FBQSxHQUFNLFdBQVMsQ0FBQSxFQUUzQyxDQUFBLEtBQUksUUFBUSxJQUFNLENBQUEsT0FBTSxRQUFRLENBQUEsRUFFaEMsRUFBQyxDQUFDLEtBQUksWUFBWSxHQUFLLENBQUEsS0FBSSxZQUFZLFVBQVUsSUFBTSxNQUFJLENBQUMsQ0FBRztBQUNqRSxBQUFJLE1BQUEsQ0FBQSxHQUFFLEVBQUksQ0FBQSxLQUFJLFFBQVEsQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQ3JDLE9BQUksTUFBTyxJQUFFLENBQUEsR0FBTSxTQUFPLENBQUc7QUFDM0IsUUFBRSxFQUFJLENBQUEsV0FBVSxBQUFDLENBQUMsR0FBRSxDQUFHLElBQUUsQ0FBRyxhQUFXLENBQUMsQ0FBQztJQUMzQztBQUFBLEFBQ0EsU0FBTyxJQUFFLENBQUM7RUFDWjtBQUFBLEFBR0ksSUFBQSxDQUFBLFNBQVEsRUFBSSxDQUFBLGVBQWMsQUFBQyxDQUFDLEdBQUUsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUMzQyxLQUFJLFNBQVEsQ0FBRztBQUNiLFNBQU8sVUFBUSxDQUFDO0VBQ2xCO0FBQUEsQUFHQSxLQUFJLFlBQVcsQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFHO0FBQ3ZCLE9BQUksV0FBVSxHQUFLLE1BQUksQ0FBRztBQUN4QixXQUFPLENBQUEsS0FBSSxVQUFVLENBQUM7SUFHeEIsS0FBTztBQUVMLFFBQUk7QUFDRixXQUFJLFFBQU8sV0FBVyxDQUFHO0FBQ3ZCLEFBQUksWUFBQSxDQUFBLGFBQVksRUFBSSxJQUFJLGNBQVksQUFBQyxFQUFDLENBQUM7QUFDdkMsZUFBTyxDQUFBLGFBQVksa0JBQWtCLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUMvQyxLQUFPO0FBSUwsQUFBSSxZQUFBLENBQUEsRUFBQyxFQUFJLCtCQUE2QixDQUFDO0FBQ3ZDLEFBQUksWUFBQSxDQUFBLFNBQVEsRUFBSSxDQUFBLFFBQU8sZ0JBQWdCLEFBQUMsQ0FBQyxFQUFDLENBQUcsSUFBRSxDQUFDLENBQUM7QUFFakQsa0JBQVEsWUFBWSxBQUFDLENBQUMsS0FBSSxVQUFVLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdDLGFBQUcsRUFBSSxDQUFBLFNBQVEsVUFBVSxRQUNoQixBQUFDLENBQUMsSUFBRyxDQUFHLENBQUEsR0FBRSxFQUFJLENBQUEsS0FBSSxVQUFVLENBQUEsQ0FBSSxJQUFFLENBQUMsQ0FBQztBQUM3QyxrQkFBUSxVQUFVLEVBQUksR0FBQyxDQUFDO0FBQ3hCLGVBQU8sS0FBRyxDQUFDO1FBQ2I7QUFBQSxNQUNGLENBQUUsT0FBTyxHQUFFLENBQUcsR0FJZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsQUFHSSxJQUFBLENBQUEsV0FBVSxFQUFJLENBQUEsdUJBQXNCLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztBQUNoRCxBQUFJLElBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxHQUFFLFdBQVcsRUFBSSxDQUFBLGFBQVksQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFBLENBQUksWUFBVSxDQUFDO0FBSzlELEtBQUksSUFBRyxPQUFPLElBQU0sRUFBQSxDQUFBLEVBQUssRUFBQyxPQUFNLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQSxFQUFLLEVBQ3hDLENBQUMsSUFBRyxPQUFPLElBQU0sRUFBQSxDQUFBLEVBQUssQ0FBQSxJQUFHLENBQUUsQ0FBQSxDQUFDLElBQU0sUUFBTSxDQUFDLEdBQ3pDLEVBQUMsSUFBRyxPQUFPLElBQU0sRUFBQSxDQUFBLEVBQUssQ0FBQSxJQUFHLENBQUUsQ0FBQSxDQUFDLElBQU0sY0FBWSxDQUFBLEVBQUssQ0FBQSxJQUFHLENBQUUsQ0FBQSxDQUFDLElBQU0sUUFBTSxDQUFDLENBQ3ZFLENBQUMsQ0FBRztBQUNMLE9BQUksTUFBTyxNQUFJLENBQUEsR0FBTSxXQUFTLENBQUc7QUFDL0IsQUFBSSxRQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7QUFDekIsQUFBSSxRQUFBLENBQUEsVUFBUyxFQUFJLENBQUEsSUFBRyxFQUFJLENBQUEsSUFBRyxFQUFJLEtBQUcsQ0FBQSxDQUFJLEdBQUMsQ0FBQztBQUN4QyxXQUFPLENBQUEsR0FBRSxRQUFRLEFBQUMsQ0FBQyxXQUFVLEVBQUksV0FBUyxDQUFBLENBQUksSUFBRSxDQUFHLFVBQVEsQ0FBQyxDQUFDO0lBQy9EO0FBQUEsQUFDQSxPQUFJLFFBQU8sQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFHO0FBQ25CLFdBQU8sQ0FBQSxHQUFFLFFBQVEsQUFBQyxDQUFDLE1BQUssVUFBVSxTQUFTLEtBQUssQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFHLFNBQU8sQ0FBQyxDQUFDO0lBQ3JFO0FBQUEsQUFDQSxPQUFJLE1BQUssQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFHO0FBQ2pCLFdBQU8sQ0FBQSxHQUFFLFFBQVEsQUFBQyxDQUFDLElBQUcsVUFBVSxZQUFZLEtBQUssQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFHLE9BQUssQ0FBQyxDQUFDO0lBQ3BFO0FBQUEsQUFDQSxPQUFJLE9BQU0sQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFHO0FBQ2xCLFdBQU8sQ0FBQSxXQUFVLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztJQUMzQjtBQUFBLEVBQ0Y7QUFBQSxBQUVJLElBQUEsQ0FBQSxJQUFHLEVBQUksR0FBQztBQUFHLFVBQUksRUFBSSxNQUFJO0FBQUcsV0FBSyxFQUFJLEVBQUMsR0FBRSxDQUFHLElBQUUsQ0FBQyxDQUFDO0FBR2pELEtBQUksT0FBTSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUc7QUFDbEIsUUFBSSxFQUFJLEtBQUcsQ0FBQztBQUNaLFNBQUssRUFBSSxFQUFDLEdBQUUsQ0FBRyxJQUFFLENBQUMsQ0FBQztFQUNyQjtBQUFBLEFBR0EsS0FBSSxNQUFPLE1BQUksQ0FBQSxHQUFNLFdBQVMsQ0FBRztBQUMvQixBQUFJLE1BQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztBQUN6QixBQUFJLE1BQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxJQUFHLEVBQUksQ0FBQSxJQUFHLEVBQUksS0FBRyxDQUFBLENBQUksR0FBQyxDQUFDO0FBQ3hDLE9BQUcsRUFBSSxDQUFBLFlBQVcsRUFBSSxXQUFTLENBQUEsQ0FBSSxJQUFFLENBQUM7RUFDeEM7QUFBQSxBQUdBLEtBQUksUUFBTyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUc7QUFDbkIsT0FBRyxFQUFJLENBQUEsR0FBRSxFQUFJLENBQUEsTUFBSyxVQUFVLFNBQVMsS0FBSyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7RUFDcEQ7QUFBQSxBQUdBLEtBQUksTUFBSyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUc7QUFDakIsT0FBRyxFQUFJLENBQUEsR0FBRSxFQUFJLENBQUEsSUFBRyxVQUFVLFlBQVksS0FBSyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7RUFDckQ7QUFBQSxBQUdBLEtBQUksT0FBTSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUc7QUFDbEIsU0FBTyxDQUFBLFdBQVUsQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFDO0VBQzNCO0FBQUEsQUFFQSxLQUFJLElBQUcsT0FBTyxJQUFNLEVBQUEsQ0FBQSxFQUFLLEVBQUMsQ0FBQyxLQUFJLENBQUEsRUFBSyxDQUFBLEtBQUksT0FBTyxHQUFLLEVBQUEsQ0FBQyxDQUFHO0FBQ3RELFNBQU8sQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLEVBQUksS0FBRyxDQUFBLENBQUksQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUM7RUFDckM7QUFBQSxBQUVBLEtBQUksWUFBVyxFQUFJLEVBQUEsQ0FBRztBQUNwQixPQUFJLFFBQU8sQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFHO0FBQ25CLFdBQU8sQ0FBQSxHQUFFLFFBQVEsQUFBQyxDQUFDLE1BQUssVUFBVSxTQUFTLEtBQUssQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFHLFNBQU8sQ0FBQyxDQUFDO0lBQ3JFLEtBQU87QUFDTCxXQUFPLENBQUEsR0FBRSxRQUFRLEFBQUMsQ0FBQyxVQUFTLENBQUcsVUFBUSxDQUFDLENBQUM7SUFDM0M7QUFBQSxFQUNGO0FBQUEsQUFFQSxJQUFFLEtBQUssS0FBSyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7QUFFcEIsQUFBSSxJQUFBLENBQUEsTUFBSyxDQUFDO0FBQ1YsS0FBSSxLQUFJLENBQUc7QUFDVCxTQUFLLEVBQUksQ0FBQSxXQUFVLEFBQUMsQ0FBQyxHQUFFLENBQUcsTUFBSSxDQUFHLGFBQVcsQ0FBRyxZQUFVLENBQUcsS0FBRyxDQUFDLENBQUM7RUFDbkUsS0FBTztBQUNMLFNBQUssRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUMsU0FBUyxHQUFFLENBQUc7QUFDOUIsV0FBTyxDQUFBLGNBQWEsQUFBQyxDQUFDLEdBQUUsQ0FBRyxNQUFJLENBQUcsYUFBVyxDQUFHLFlBQVUsQ0FBRyxJQUFFLENBQUcsTUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQyxDQUFDO0VBQ0o7QUFBQSxBQUVBLElBQUUsS0FBSyxJQUFJLEFBQUMsRUFBQyxDQUFDO0FBRWQsT0FBTyxDQUFBLG9CQUFtQixBQUFDLENBQUMsTUFBSyxDQUFHLEtBQUcsQ0FBRyxPQUFLLENBQUMsQ0FBQztBQUNuRDtBQUFBLEFBR0EsT0FBUyxnQkFBYyxDQUFFLEdBQUUsQ0FBRyxDQUFBLEtBQUksQ0FBRztBQUNuQyxTQUFRLE1BQU8sTUFBSTtBQUNqQixPQUFLLFlBQVU7QUFDYixXQUFPLENBQUEsR0FBRSxRQUFRLEFBQUMsQ0FBQyxXQUFVLENBQUcsWUFBVSxDQUFDLENBQUM7QUFBQSxBQUU5QyxPQUFLLFNBQU87QUFDVixBQUFJLFFBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxJQUFHLEVBQUksQ0FBQSxJQUFHLFVBQVUsQUFBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLEFBQUMsQ0FBQyxRQUFPLENBQUcsR0FBQyxDQUFDLFFBQ2QsQUFBQyxDQUFDLElBQUcsQ0FBRyxNQUFJLENBQUMsUUFDYixBQUFDLENBQUMsTUFBSyxDQUFHLElBQUUsQ0FBQyxDQUFBLENBQUksS0FBRyxDQUFDO0FBQ3JFLFdBQU8sQ0FBQSxHQUFFLFFBQVEsQUFBQyxDQUFDLE1BQUssQ0FBRyxTQUFPLENBQUMsQ0FBQztBQUFBLEFBRXRDLE9BQUssU0FBTztBQUNWLFNBQUksS0FBSSxJQUFNLEVBQUEsQ0FBQSxFQUFLLENBQUEsQ0FBQyxDQUFBLEVBQUUsTUFBSSxDQUFDLElBQU0sRUFBQyxRQUFPLENBQUc7QUFDMUMsYUFBTyxDQUFBLEdBQUUsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFHLFNBQU8sQ0FBQyxDQUFDO01BQ3BDO0FBQUEsQUFDQSxXQUFPLENBQUEsR0FBRSxRQUFRLEFBQUMsQ0FBQyxFQUFDLEVBQUksTUFBSSxDQUFHLFNBQU8sQ0FBQyxDQUFDO0FBQUEsQUFFMUMsT0FBSyxVQUFRO0FBQ1gsV0FBTyxDQUFBLEdBQUUsUUFBUSxBQUFDLENBQUMsRUFBQyxFQUFJLE1BQUksQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUFBLEVBQzdDO0FBRUEsS0FBSSxLQUFJLElBQU0sS0FBRyxDQUFHO0FBQ2xCLFNBQU8sQ0FBQSxHQUFFLFFBQVEsQUFBQyxDQUFDLE1BQUssQ0FBRyxPQUFLLENBQUMsQ0FBQztFQUNwQztBQUFBLEFBQ0Y7QUFBQSxBQUdBLE9BQVMsWUFBVSxDQUFFLEtBQUksQ0FBRztBQUMxQixPQUFPLENBQUEsR0FBRSxFQUFJLENBQUEsS0FBSSxVQUFVLFNBQVMsS0FBSyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUEsQ0FBSSxJQUFFLENBQUM7QUFDekQ7QUFBQSxBQUdBLE9BQVMsWUFBVSxDQUFFLEdBQUUsQ0FBRyxDQUFBLEtBQUksQ0FBRyxDQUFBLFlBQVcsQ0FBRyxDQUFBLFdBQVUsQ0FBRyxDQUFBLElBQUcsQ0FBRztBQUNoRSxBQUFJLElBQUEsQ0FBQSxNQUFLLEVBQUksR0FBQyxDQUFDO0FBQ2YsTUFBUyxHQUFBLENBQUEsQ0FBQSxFQUFJLEVBQUE7QUFBRyxNQUFBLEVBQUksQ0FBQSxLQUFJLE9BQU8sQ0FBRyxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUcsR0FBRSxDQUFBLENBQUc7QUFDNUMsT0FBSSxNQUFLLFVBQVUsZUFBZSxLQUFLLEFBQUMsQ0FBQyxLQUFJLENBQUcsQ0FBQSxNQUFLLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFHO0FBQzFELFdBQUssS0FBSyxBQUFDLENBQUMsY0FBYSxBQUFDLENBQUMsR0FBRSxDQUFHLE1BQUksQ0FBRyxhQUFXLENBQUcsWUFBVSxDQUMzRCxDQUFBLE1BQUssQUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFHLEtBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkIsS0FBTztBQUNMLFdBQUssS0FBSyxBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDakI7QUFBQSxFQUNGO0FBQUEsQUFDQSxLQUFHLFFBQVEsQUFBQyxDQUFDLFNBQVMsR0FBRSxDQUFHO0FBQ3pCLE9BQUksQ0FBQyxHQUFFLE1BQU0sQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFHO0FBQ3ZCLFdBQUssS0FBSyxBQUFDLENBQUMsY0FBYSxBQUFDLENBQUMsR0FBRSxDQUFHLE1BQUksQ0FBRyxhQUFXLENBQUcsWUFBVSxDQUMzRCxJQUFFLENBQUcsS0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqQjtBQUFBLEVBQ0YsQ0FBQyxDQUFDO0FBQ0YsT0FBTyxPQUFLLENBQUM7QUFDZjtBQUFBLEFBR0EsT0FBUyxlQUFhLENBQUUsR0FBRSxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsWUFBVyxDQUFHLENBQUEsV0FBVSxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsS0FBSSxDQUFHO0FBQ3pFLEFBQUksSUFBQSxDQUFBLElBQUc7QUFBRyxRQUFFLENBQUM7QUFDYixLQUFJLEtBQUksaUJBQWlCLENBQUc7QUFDMUIsT0FBSSxLQUFJLGlCQUFpQixBQUFDLENBQUMsR0FBRSxDQUFDLENBQUc7QUFDL0IsU0FBSSxLQUFJLGlCQUFpQixBQUFDLENBQUMsR0FBRSxDQUFDLENBQUc7QUFDL0IsVUFBRSxFQUFJLENBQUEsR0FBRSxRQUFRLEFBQUMsQ0FBQyxpQkFBZ0IsQ0FBRyxVQUFRLENBQUMsQ0FBQztNQUNqRCxLQUFPO0FBQ0wsVUFBRSxFQUFJLENBQUEsR0FBRSxRQUFRLEFBQUMsQ0FBQyxVQUFTLENBQUcsVUFBUSxDQUFDLENBQUM7TUFDMUM7QUFBQSxJQUNGLEtBQU87QUFDTCxTQUFJLEtBQUksaUJBQWlCLEFBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBRztBQUMvQixVQUFFLEVBQUksQ0FBQSxHQUFFLFFBQVEsQUFBQyxDQUFDLFVBQVMsQ0FBRyxVQUFRLENBQUMsQ0FBQztNQUMxQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsQUFDQSxLQUFJLFdBQVUsUUFBUSxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUEsQ0FBSSxFQUFBLENBQUc7QUFDaEMsT0FBRyxFQUFJLENBQUEsR0FBRSxFQUFJLElBQUUsQ0FBQSxDQUFJLElBQUUsQ0FBQztFQUN4QjtBQUFBLEFBQ0EsS0FBSSxDQUFDLEdBQUUsQ0FBRztBQUNSLE9BQUksR0FBRSxLQUFLLFFBQVEsQUFBQyxDQUFDLEtBQUksQ0FBRSxHQUFFLENBQUMsQ0FBQyxDQUFBLENBQUksRUFBQSxDQUFHO0FBQ3BDLFNBQUksWUFBVyxJQUFNLEtBQUcsQ0FBRztBQUN6QixVQUFFLEVBQUksQ0FBQSxXQUFVLEFBQUMsQ0FBQyxHQUFFLENBQUcsQ0FBQSxLQUFJLENBQUUsR0FBRSxDQUFDLENBQUcsS0FBRyxDQUFDLENBQUM7TUFDMUMsS0FBTztBQUNMLFVBQUUsRUFBSSxDQUFBLFdBQVUsQUFBQyxDQUFDLEdBQUUsQ0FBRyxDQUFBLEtBQUksQ0FBRSxHQUFFLENBQUMsQ0FBRyxDQUFBLFlBQVcsRUFBSSxFQUFBLENBQUMsQ0FBQztNQUN0RDtBQUFBLEFBQ0EsU0FBSSxHQUFFLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFBLENBQUksRUFBQyxDQUFBLENBQUc7QUFDMUIsV0FBSSxLQUFJLENBQUc7QUFDVCxZQUFFLEVBQUksQ0FBQSxHQUFFLE1BQU0sQUFBQyxDQUFDLElBQUcsQ0FBQyxJQUFJLEFBQUMsQ0FBQyxTQUFTLElBQUcsQ0FBRztBQUN2QyxpQkFBTyxDQUFBLElBQUcsRUFBSSxLQUFHLENBQUM7VUFDcEIsQ0FBQyxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUMsT0FBTyxBQUFDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDekIsS0FBTztBQUNMLFlBQUUsRUFBSSxDQUFBLElBQUcsRUFBSSxDQUFBLEdBQUUsTUFBTSxBQUFDLENBQUMsSUFBRyxDQUFDLElBQUksQUFBQyxDQUFDLFNBQVMsSUFBRyxDQUFHO0FBQzlDLGlCQUFPLENBQUEsS0FBSSxFQUFJLEtBQUcsQ0FBQztVQUNyQixDQUFDLEtBQUssQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO1FBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRixLQUFPO0FBQ0wsUUFBRSxFQUFJLENBQUEsR0FBRSxRQUFRLEFBQUMsQ0FBQyxZQUFXLENBQUcsVUFBUSxDQUFDLENBQUM7SUFDNUM7QUFBQSxFQUNGO0FBQUEsQUFDQSxLQUFJLE1BQU8sS0FBRyxDQUFBLEdBQU0sWUFBVSxDQUFHO0FBQy9CLE9BQUksS0FBSSxHQUFLLENBQUEsR0FBRSxNQUFNLEFBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBRztBQUMvQixXQUFPLElBQUUsQ0FBQztJQUNaO0FBQUEsQUFDQSxPQUFHLEVBQUksQ0FBQSxJQUFHLFVBQVUsQUFBQyxDQUFDLEVBQUMsRUFBSSxJQUFFLENBQUMsQ0FBQztBQUMvQixPQUFJLElBQUcsTUFBTSxBQUFDLENBQUMsOEJBQTZCLENBQUMsQ0FBRztBQUM5QyxTQUFHLEVBQUksQ0FBQSxJQUFHLE9BQU8sQUFBQyxDQUFDLENBQUEsQ0FBRyxDQUFBLElBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBQyxDQUFDO0FBQ3RDLFNBQUcsRUFBSSxDQUFBLEdBQUUsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFHLE9BQUssQ0FBQyxDQUFDO0lBQ2xDLEtBQU87QUFDTCxTQUFHLEVBQUksQ0FBQSxJQUFHLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBRyxNQUFJLENBQUMsUUFDYixBQUFDLENBQUMsTUFBSyxDQUFHLElBQUUsQ0FBQyxRQUNiLEFBQUMsQ0FBQyxVQUFTLENBQUcsSUFBRSxDQUFDLENBQUM7QUFDcEMsU0FBRyxFQUFJLENBQUEsR0FBRSxRQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsU0FBTyxDQUFDLENBQUM7SUFDcEM7QUFBQSxFQUNGO0FBQUEsQUFFQSxPQUFPLENBQUEsSUFBRyxFQUFJLEtBQUcsQ0FBQSxDQUFJLElBQUUsQ0FBQztBQUMxQjtBQUFBLEFBR0EsT0FBUyxxQkFBbUIsQ0FBRSxNQUFLLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxNQUFLLENBQUc7QUFDbEQsQUFBSSxJQUFBLENBQUEsV0FBVSxFQUFJLEVBQUEsQ0FBQztBQUNuQixBQUFJLElBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxNQUFLLE9BQU8sQUFBQyxDQUFDLFNBQVMsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFHO0FBQzdDLGNBQVUsRUFBRSxDQUFDO0FBQ2IsT0FBSSxHQUFFLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFBLEVBQUssRUFBQTtBQUFHLGdCQUFVLEVBQUUsQ0FBQztBQUFBLEFBQ3pDLFNBQU8sQ0FBQSxJQUFHLEVBQUksQ0FBQSxHQUFFLE9BQU8sQ0FBQSxDQUFJLEVBQUEsQ0FBQztFQUM5QixDQUFHLEVBQUEsQ0FBQyxDQUFDO0FBRUwsS0FBSSxNQUFLLEVBQUksR0FBQyxDQUFHO0FBQ2YsU0FBTyxDQUFBLE1BQUssQ0FBRSxDQUFBLENBQUMsRUFDUixFQUFDLElBQUcsSUFBTSxHQUFDLENBQUEsQ0FBSSxHQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUksTUFBSSxDQUFDLENBQUEsQ0FDaEMsSUFBRSxDQUFBLENBQ0YsQ0FBQSxNQUFLLEtBQUssQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFBLENBQ25CLElBQUUsQ0FBQSxDQUNGLENBQUEsTUFBSyxDQUFFLENBQUEsQ0FBQyxDQUFDO0VBQ2xCO0FBQUEsQUFFQSxPQUFPLENBQUEsTUFBSyxDQUFFLENBQUEsQ0FBQyxFQUFJLEtBQUcsQ0FBQSxDQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsTUFBSyxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQSxDQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsTUFBSyxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBQ3JFO0FBQUEsQUFFQSxPQUFTLFFBQU0sQ0FBRSxFQUFDLENBQUc7QUFDbkIsT0FBTyxDQUFBLEtBQUksUUFBUSxBQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsRUFDaEIsRUFBQyxNQUFPLEdBQUMsQ0FBQSxHQUFNLFNBQU8sQ0FBQSxFQUFLLENBQUEsY0FBYSxBQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsR0FBTSxpQkFBZSxDQUFDLENBQUM7QUFDNUU7QUFBQSxBQUVBLE9BQVMsU0FBTyxDQUFFLEVBQUMsQ0FBRztBQUNwQixPQUFPLENBQUEsTUFBTyxHQUFDLENBQUEsR0FBTSxTQUFPLENBQUEsRUFBSyxDQUFBLGNBQWEsQUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLEdBQU0sa0JBQWdCLENBQUM7QUFDM0U7QUFBQSxBQUVBLE9BQVMsT0FBSyxDQUFFLENBQUEsQ0FBRztBQUNqQixPQUFPLENBQUEsTUFBTyxFQUFBLENBQUEsR0FBTSxTQUFPLENBQUEsRUFBSyxDQUFBLGNBQWEsQUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEdBQU0sZ0JBQWMsQ0FBQztBQUN2RTtBQUFBLEFBRUEsT0FBUyxRQUFNLENBQUUsQ0FBQSxDQUFHO0FBQ2xCLE9BQU8sQ0FBQSxNQUFPLEVBQUEsQ0FBQSxHQUFNLFNBQU8sQ0FBQSxFQUFLLENBQUEsY0FBYSxBQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsR0FBTSxpQkFBZSxDQUFDO0FBQ3hFO0FBQUEsQUFFQSxPQUFTLGVBQWEsQ0FBRSxDQUFBLENBQUc7QUFDekIsT0FBTyxDQUFBLE1BQUssVUFBVSxTQUFTLEtBQUssQUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQzFDO0FBQUE7Ozs7QUNsVUE7QUFBQSxBQUFJLEVBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBQztBQUNsQyxBQUFJLEVBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBQztBQWNqQyxLQUFLLFFBQVEsRUFBSSxVQUFVLEdBQUUsQ0FBRztBQUM5QixBQUFJLElBQUEsQ0FBQSxHQUFFLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxHQUFFLENBQUM7QUFDakIsU0FBRyxFQUFJLENBQUEsTUFBSyxVQUFVLFNBQVMsS0FBSyxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7QUFFOUMsS0FBSSxNQUFLLGtCQUFrQixHQUFLLENBQUEsR0FBRSxPQUFPLEdBQUssQ0FBQSxNQUFLLGtCQUFrQixDQUFHO0FBQ3RFLE9BQUksSUFBRyxJQUFNLG9CQUFrQixDQUFHO0FBQ2hDLFdBQU8sQ0FBQSxDQUFDLEdBQUUsS0FBSyxDQUFBLEVBQUssQ0FBQSxHQUFFLEtBQUssSUFBTSxHQUFDLENBQUEsQ0FDOUIsYUFBVyxFQUNYLENBQUEsYUFBWSxFQUFJLENBQUEsR0FBRSxLQUFLLENBQUEsQ0FBSSxJQUFFLENBQUM7SUFDcEMsS0FBTyxLQUFJLElBQUcsSUFBTSxpQkFBZSxDQUFHO0FBQ3BDLFdBQU8sQ0FBQSxVQUFTLEVBQUksQ0FBQSxHQUFFLE9BQU8sQ0FBQSxDQUFJLE1BQUksQ0FBQztJQUN4QyxLQUFPLEtBQUksSUFBRyxJQUFNLGtCQUFnQixDQUFHO0FBQ3JDLEFBQUksUUFBQSxDQUFBLElBQUcsRUFBSSxDQUFBLE1BQUssS0FBSyxBQUFDLENBQUMsR0FBRSxDQUFDO0FBQ3RCLGFBQUcsRUFBSSxDQUFBLElBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBQSxDQUNuQixDQUFBLElBQUcsT0FBTyxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBQyxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQSxDQUFJLFFBQU0sQ0FBQSxDQUNyQyxDQUFBLElBQUcsS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDckIsV0FBTyxDQUFBLFlBQVcsRUFBSSxLQUFHLENBQUEsQ0FBSSxNQUFJLENBQUM7SUFDcEMsS0FBTztBQUNMLFdBQU8sSUFBRSxDQUFDO0lBQ1o7QUFBQSxFQUNGLEtBQU87QUFDTCxTQUFPLElBQUUsQ0FBQztFQUNaO0FBQUEsQUFDRixDQUFDO0FBQ0Q7Ozs7QUNYQTtBQUFBLEtBQUssUUFBUSxFQUFJLFVBQVUsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsZ0JBQWUsQ0FBRztBQUM5RCxBQUFJLElBQUEsQ0FBQSxpQkFBZ0IsRUFBSSxDQUFBLEdBQUUsVUFBVSxDQUFFLElBQUcsQ0FBQyxDQUFDO0FBRTNDLEFBQUksSUFBQSxDQUFBLGlCQUFnQixFQUFJLENBQUEsaUJBQWdCLGlCQUFpQixDQUFDO0FBQzFELGtCQUFnQixpQkFBaUIsRUFBSSxVQUFTLEFBQUMsQ0FBRTtBQUMvQyxBQUFJLE1BQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxnQkFBZSxBQUFDLENBQUMsaUJBQWdCLENBQUMsS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDM0QsU0FBTyxDQUFBLE1BQUssSUFBTSxVQUFRLENBQUEsQ0FBSSxLQUFHLEVBQUksT0FBSyxDQUFDO0VBQzdDLENBQUM7QUFFRCxBQUFJLElBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxpQkFBZ0IsT0FBTyxDQUFDO0FBQ3RDLGtCQUFnQixPQUFPLEVBQUksVUFBUyxBQUFDLENBQUU7QUFDckMsQUFBSSxNQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsTUFBSyxBQUFDLENBQUMsT0FBTSxDQUFDLE1BQU0sQUFBQyxDQUFDLElBQUcsQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUNuRCxTQUFPLENBQUEsTUFBSyxJQUFNLFVBQVEsQ0FBQSxDQUFJLEtBQUcsRUFBSSxPQUFLLENBQUM7RUFDN0MsQ0FBQztBQUNILENBQUM7QUFDRDs7OztBQ2RBO0FBQUEsS0FBSyxRQUFRLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxNQUFLLENBQUc7QUFDNUMsQUFBSSxJQUFBLENBQUEsT0FBTSxFQUFJLENBQUEsR0FBRSxDQUFFLElBQUcsQ0FBQztBQUNsQixXQUFLLEVBQUksVUFBUyxBQUFDLENBQUU7QUFBRSxhQUFPLEtBQUcsQ0FBQztNQUFFLENBQUM7QUFFekMsS0FBSSxPQUFNLEdBQUssQ0FBQSxVQUFTLElBQU0sT0FBTyxRQUFNO0FBQ3pDLFNBQUssRUFBSSxRQUFNLENBQUM7QUFBQSxBQUVsQixJQUFFLENBQUUsSUFBRyxDQUFDLEVBQUksVUFBUyxBQUFDLENBQUU7QUFDdEIsQUFBSSxNQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsTUFBSyxBQUFDLENBQUMsTUFBSyxDQUFDLE1BQU0sQUFBQyxDQUFDLElBQUcsQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUNsRCxTQUFPLENBQUEsTUFBSyxJQUFNLFVBQVEsQ0FBQSxDQUFJLEtBQUcsRUFBSSxPQUFLLENBQUM7RUFDN0MsQ0FBQTtBQUNGLENBQUM7QUFDRDs7OztBQ1pBO0FBQUEsS0FBSyxRQUFRLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxNQUFLLENBQUc7QUFDNUMsQUFBSSxJQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsTUFBSyx5QkFBeUIsQUFBQyxDQUFDLEdBQUUsQ0FBRyxLQUFHLENBQUM7QUFDaEQsV0FBSyxFQUFJLFVBQVMsQUFBQyxDQUFFLEdBQUMsQ0FBQztBQUUzQixLQUFJLElBQUcsR0FBSyxDQUFBLFVBQVMsSUFBTSxPQUFPLEtBQUcsSUFBSTtBQUN2QyxTQUFLLEVBQUksQ0FBQSxJQUFHLElBQUksQ0FBQTtBQUFBLEFBRWxCLE9BQUssZUFBZSxBQUFDLENBQUMsR0FBRSxDQUFHLEtBQUcsQ0FDNUI7QUFBRSxNQUFFLENBQUcsVUFBUyxBQUFDLENBQUU7QUFDZixBQUFJLFFBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxNQUFLLEFBQUMsQ0FBQyxNQUFLLENBQUMsS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDdEMsV0FBTyxDQUFBLE1BQUssSUFBTSxVQUFRLENBQUEsQ0FBSSxLQUFHLEVBQUksT0FBSyxDQUFDO0lBQzdDO0FBQ0EsZUFBVyxDQUFHLEtBQUc7QUFBQSxFQUNyQixDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0Q7Ozs7QUM1Q0E7QUFBQSxBQUFJLEVBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQVc1QixLQUFLLFFBQVEsRUFBSSxVQUFVLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRztBQUNwQyxBQUFJLElBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxJQUFHLEFBQUMsQ0FBQyxHQUFFLENBQUcsU0FBTyxDQUFDO0FBQzNCLFNBQUcsRUFBSSxDQUFBLElBQUcsQ0FBRSxDQUFBLENBQUMsQ0FBQztBQUNsQixPQUFPLENBQUEsTUFBSyxFQUFJLEVBQUMsSUFBRyxDQUFBLENBQUksS0FBRyxDQUFDO0FBQzlCLENBQUM7QUFDRDs7OztBQ0VBO0FBQUEsS0FBSyxRQUFRLEVBQUksVUFBVSxTQUFRLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxVQUFTLENBQUc7QUFDeEQsQUFBSSxJQUFBLENBQUEsS0FBSSxFQUFJLENBQUEsU0FBUSxRQUFRLEdBQUssRUFBQyxTQUFRLFFBQVEsRUFBSSxDQUFBLE1BQUssT0FBTyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztBQUUxRSxLQUFJLENBQUMsTUFBSyxRQUFRLENBQUc7QUFDbkIsU0FBSyxRQUFRLEVBQUksQ0FBQSxNQUFLLE9BQU8sQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0VBQ3RDO0FBQUEsQUFFQSxXQUFTLEVBQUksQ0FBQSxTQUFRLE9BQU8sSUFBTSxFQUFBLENBQUEsQ0FBSSxXQUFTLEVBQUksS0FBRyxDQUFDO0FBRXZELE1BQVMsR0FBQSxDQUFBLElBQUcsQ0FBQSxFQUFLLE1BQUksQ0FBRztBQUN0QixPQUFJLFVBQVMsR0FDVCxFQUFDLElBQUcsSUFBTSxTQUFPLENBQUEsRUFBSyxDQUFBLElBQUcsSUFBTSxPQUFLLENBQUEsRUFBSyxDQUFBLElBQUcsR0FBSyxVQUFRLENBQUMsQ0FBRztBQUMvRCxXQUFLLFFBQVEsQ0FBRSxJQUFHLENBQUMsRUFBSSxDQUFBLEtBQUksQ0FBRSxJQUFHLENBQUMsQ0FBQztJQUNwQztBQUFBLEVBQ0Y7QUFBQSxBQUNGLENBQUM7QUFDRDs7OztBQ2xDQTtBQUFBLEFBQUksRUFBQSxDQUFBLE9BQU0sRUFBSTtBQUNWLHFCQUFtQixDQUFHLFlBQVU7QUFDaEMsaUJBQWUsQ0FBRyxRQUFNO0FBQ3hCLGdCQUFjLENBQUcsT0FBSztBQUN0QixvQkFBa0IsQ0FBRyxXQUFTO0FBQzlCLGtCQUFnQixDQUFHLFNBQU87QUFDMUIsa0JBQWdCLENBQUcsU0FBTztBQUMxQixrQkFBZ0IsQ0FBRyxTQUFPO0FBQUEsQUFDOUIsQ0FBQztBQW1CRCxLQUFLLFFBQVEsRUFBSSxVQUFVLEdBQUUsQ0FBRztBQUM5QixBQUFJLElBQUEsQ0FBQSxHQUFFLEVBQUksQ0FBQSxNQUFLLFVBQVUsU0FBUyxLQUFLLEFBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQztBQUM3QyxLQUFJLE9BQU0sQ0FBRSxHQUFFLENBQUM7QUFBRyxTQUFPLENBQUEsT0FBTSxDQUFFLEdBQUUsQ0FBQyxDQUFDO0FBQUEsQUFDckMsS0FBSSxHQUFFLElBQU0sS0FBRztBQUFHLFNBQU8sT0FBSyxDQUFDO0FBQUEsQUFDL0IsS0FBSSxHQUFFLElBQU0sVUFBUTtBQUFHLFNBQU8sWUFBVSxDQUFDO0FBQUEsQUFDekMsS0FBSSxHQUFFLElBQU0sQ0FBQSxNQUFLLEFBQUMsQ0FBQyxHQUFFLENBQUM7QUFBRyxTQUFPLFNBQU8sQ0FBQztBQUFBLEFBQ3hDLE9BQU8sT0FBTyxJQUFFLENBQUM7QUFDbkIsQ0FBQztBQUNEOzs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalFBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeC9FQTtBQUFBLE9BQVMsS0FBRyxDQUFFLEdBQUUsQ0FBRyxDQUFBLFNBQVEsQ0FBRyxDQUFBLE1BQUssQ0FBRztBQUNwQyxLQUFHLElBQUksRUFBSSxJQUFFLENBQUM7QUFDZCxLQUFHLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDaEIsS0FBRyxNQUFNLEVBQUksS0FBRyxDQUFDO0FBQ2pCLEtBQUcsT0FBTyxFQUFJLE9BQUssQ0FBQztBQUNwQixLQUFHLFVBQVUsRUFBSSxVQUFRLENBQUM7QUFDNUI7QUFBQSxBQUVBLE9BQVMsT0FBSyxDQUFFLE1BQUssQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLFVBQVMsQ0FBRztBQUUxQyxBQUFJLElBQUEsQ0FBQSxJQUFHLEVBQUksS0FBRyxD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USxDQUFFLElBQUcsQ0FBQyxFQUFJLFFBQU0sQ0FBQztBQUM1QixRQUFBLEVBQUksS0FBRyxDQUFDO01BQ1YsS0FFSztBQUNILGFBQUs7TUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsQUFDRixDQUFDO0FBRUQsS0FBSyxRQUFRLEVBQUksRUFDZixZQUFXLENBQUcsVUFBVSxNQUFLLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxVQUFTLENBQUc7QUFDbEQsU0FBTyxJQUFJLE9BQUssQUFBQyxDQUFDLE1BQUssQ0FBRyxPQUFLLENBQUcsV0FBUyxDQUFDLENBQUE7RUFDOUMsQ0FDRixDQUFBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGNoYWkgPSByZXF1aXJlKCdjaGFpJyk7XG52YXIgYXVkaW9Db250ZXh0ID0gcmVxdWlyZShcImF1ZGlvLWNvbnRleHRcIik7XG52YXIgQmluYXVyYWxGSVIgPSByZXF1aXJlKCcuLi9iaW5hdXJhbC1maXIuZXM2LmpzJylcbnZhciBhc3NlcnQgPSBjaGFpLmFzc2VydDtcblxuXG4vL3dpbmRvdy5BdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0fHx3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXG5cbi8vIEhlcmUgd2UgY3JlYXRlIGEgYnVmZmVyIHRvIGJlIHVzZWQgbGF0ZXIgd2l0aCBvdXIgcGxheWVyXG4vL3ZhciBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG52YXIgdGFyZ2V0Tm9kZSA9IGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbjtcblxuLy8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXhcbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuZGVzY3JpYmUoXCJCaW5hdXJhbEZJUiB0ZXN0c1wiLCBmdW5jdGlvbigpIHtcblxuICB0aGlzLmJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoMSwgNTEyLCA0NDEwMCk7XG4gIHRoaXMuZGF0YSA9IHRoaXMuYnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMuZGF0YVtpXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI7XG4gIH1cblxuICB2YXIgbnVtYmVyT2ZQb3NpdGlvbnMgPSBnZXRSYW5kb21JbnQoMTAwLDIwMCk7XG4gIHRoaXMuaHJ0ZnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlBvc2l0aW9uczsgaSsrKXtcbiAgICB2YXIgdXJsID0gJ2Zha2VVUkwud2F2JztcbiAgICB2YXIgb2JqID0ge1xuICAgICAgYXppbXV0aDogZ2V0UmFuZG9tSW50KDAsOTApLFxuICAgICAgZWxldmF0aW9uOiBnZXRSYW5kb21JbnQoMCw5MCksXG4gICAgICBkaXN0YW5jZTogZ2V0UmFuZG9tSW50KDEsMyksXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGJ1ZmZlcjogdGhpcy5idWZmZXJcbiAgICB9O1xuICAgIHRoaXMuaHJ0ZnMucHVzaChvYmopO1xuICB9XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzZWxmLmJpbmF1cmFsRklSID0gbmV3IEJpbmF1cmFsRklSKCk7XG4gIHNlbGYuYmluYXVyYWxGSVIuY29ubmVjdCh0YXJnZXROb2RlKTtcblxuICBpdCgnc2hvdWxkIHNldCBIUlRGIERhdGFTZXQgY29ycmVjdGx5JywgZnVuY3Rpb24oKXtcbiAgICBzZWxmLmJpbmF1cmFsRklSLkhSVEZEYXRhc2V0ID0gc2VsZi5ocnRmcztcbiAgICBhc3NlcnQuZXF1YWwoc2VsZi5iaW5hdXJhbEZJUi5IUlRGRGF0YXNldCwgc2VsZi5ocnRmcyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZGV0ZWN0IHRoYXQgaXMgY3Jvc3NmYWRpbmcnLCBmdW5jdGlvbigpe1xuICAgIHNlbGYuYmluYXVyYWxGSVIuc2V0UG9zaXRpb24oMCwgMCwgMSk7XG4gICAgYXNzZXJ0LmVxdWFsKHNlbGYuYmluYXVyYWxGSVIuaXNDcm9zc2ZhZGluZygpLCB0cnVlKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzZXQgcG9zaXRpb24gY29ycmVjdGx5JywgZnVuY3Rpb24oKXtcbiAgICBzZWxmLmJpbmF1cmFsRklSLnNldFBvc2l0aW9uKDEwLCAyMCwgMzApO1xuICAgIHZhciBjb29yZCA9IHNlbGYuYmluYXVyYWxGSVIuZ2V0UmVhbENvb3JkaW5hdGVzKDEwLCAyMCwgMzApO1xuICAgIGFzc2VydC5lcXVhbChzZWxmLmJpbmF1cmFsRklSLmdldFBvc2l0aW9uKCkuYXppbXV0aCwgY29vcmQuYXppbXV0aCk7XG4gICAgYXNzZXJ0LmVxdWFsKHNlbGYuYmluYXVyYWxGSVIuZ2V0UG9zaXRpb24oKS5lbGV2YXRpb24sIGNvb3JkLmVsZXZhdGlvbik7XG4gICAgYXNzZXJ0LmVxdWFsKHNlbGYuYmluYXVyYWxGSVIuZ2V0UG9zaXRpb24oKS5kaXN0YW5jZSwgY29vcmQuZGlzdGFuY2UpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHNldCBjcm9zc2ZhZGUgZHVyYXRpb24gY29ycmVjdGx5JywgZnVuY3Rpb24oKXtcbiAgICBzZWxmLmJpbmF1cmFsRklSLnNldENyb3NzZmFkZUR1cmF0aW9uKDMwKTtcbiAgICBhc3NlcnQuZXF1YWwoc2VsZi5iaW5hdXJhbEZJUi5nZXRDcm9zc2ZhZGVEdXJhdGlvbigpLCAzMCk7XG4gIH0pO1xuXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEgPSAoRnVuY3Rpb24oJ3JldHVybiB0aGlzJykpKCk7XG5pZiAoIV9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuX19jb3ZlcmFnZV9fKSB7IF9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuX19jb3ZlcmFnZV9fID0ge307IH1cbl9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEgPSBfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLl9fY292ZXJhZ2VfXztcbmlmICghKF9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEFbJy9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanMnXSkpIHtcbiAgIF9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEFbJy9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanMnXSA9IHtcInBhdGhcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcInNcIjp7XCIxXCI6MCxcIjJcIjowLFwiM1wiOjAsXCI0XCI6MCxcIjVcIjowLFwiNlwiOjAsXCI3XCI6MCxcIjhcIjowLFwiOVwiOjAsXCIxMFwiOjAsXCIxMVwiOjAsXCIxMlwiOjAsXCIxM1wiOjAsXCIxNFwiOjAsXCIxNVwiOjAsXCIxNlwiOjAsXCIxN1wiOjAsXCIxOFwiOjAsXCIxOVwiOjAsXCIyMFwiOjAsXCIyMVwiOjAsXCIyMlwiOjAsXCIyM1wiOjAsXCIyNFwiOjAsXCIyNVwiOjAsXCIyNlwiOjAsXCIyN1wiOjAsXCIyOFwiOjAsXCIyOVwiOjAsXCIzMFwiOjAsXCIzMVwiOjAsXCIzMlwiOjAsXCIzM1wiOjAsXCIzNFwiOjAsXCIzNVwiOjAsXCIzNlwiOjAsXCIzN1wiOjAsXCIzOFwiOjAsXCIzOVwiOjAsXCI0MFwiOjAsXCI0MVwiOjAsXCI0MlwiOjAsXCI0M1wiOjAsXCI0NFwiOjAsXCI0NVwiOjAsXCI0NlwiOjAsXCI0N1wiOjAsXCI0OFwiOjAsXCI0OVwiOjAsXCI1MFwiOjAsXCI1MVwiOjAsXCI1MlwiOjAsXCI1M1wiOjAsXCI1NFwiOjAsXCI1NVwiOjAsXCI1NlwiOjAsXCI1N1wiOjAsXCI1OFwiOjAsXCI1OVwiOjAsXCI2MFwiOjAsXCI2MVwiOjAsXCI2MlwiOjAsXCI2M1wiOjAsXCI2NFwiOjAsXCI2NVwiOjAsXCI2NlwiOjAsXCI2N1wiOjAsXCI2OFwiOjAsXCI2OVwiOjAsXCI3MFwiOjAsXCI3MVwiOjAsXCI3MlwiOjAsXCI3M1wiOjAsXCI3NFwiOjAsXCI3NVwiOjAsXCI3NlwiOjAsXCI3N1wiOjAsXCI3OFwiOjAsXCI3OVwiOjAsXCI4MFwiOjAsXCI4MVwiOjAsXCI4MlwiOjAsXCI4M1wiOjAsXCI4NFwiOjAsXCI4NVwiOjAsXCI4NlwiOjAsXCI4N1wiOjAsXCI4OFwiOjAsXCI4OVwiOjAsXCI5MFwiOjAsXCI5MVwiOjAsXCI5MlwiOjAsXCI5M1wiOjAsXCI5NFwiOjAsXCI5NVwiOjAsXCI5NlwiOjAsXCI5N1wiOjAsXCI5OFwiOjAsXCI5OVwiOjAsXCIxMDBcIjowLFwiMTAxXCI6MCxcIjEwMlwiOjAsXCIxMDNcIjowLFwiMTA0XCI6MCxcIjEwNVwiOjAsXCIxMDZcIjowLFwiMTA3XCI6MCxcIjEwOFwiOjAsXCIxMDlcIjowLFwiMTEwXCI6MCxcIjExMVwiOjAsXCIxMTJcIjowLFwiMTEzXCI6MCxcIjExNFwiOjAsXCIxMTVcIjowLFwiMTE2XCI6MH0sXCJiXCI6e1wiMVwiOlswLDBdLFwiMlwiOlswLDBdLFwiM1wiOlswLDBdLFwiNFwiOlswLDAsMF0sXCI1XCI6WzAsMF0sXCI2XCI6WzAsMF0sXCI3XCI6WzAsMF0sXCI4XCI6WzAsMF0sXCI5XCI6WzAsMF0sXCIxMFwiOlswLDBdfSxcImZcIjp7XCIxXCI6MCxcIjJcIjowLFwiM1wiOjAsXCI0XCI6MCxcIjVcIjowLFwiNlwiOjAsXCI3XCI6MCxcIjhcIjowLFwiOVwiOjAsXCIxMFwiOjAsXCIxMVwiOjAsXCIxMlwiOjAsXCIxM1wiOjAsXCIxNFwiOjAsXCIxNVwiOjAsXCIxNlwiOjAsXCIxN1wiOjAsXCIxOFwiOjAsXCIxOVwiOjAsXCIyMFwiOjAsXCIyMVwiOjAsXCIyMlwiOjAsXCIyM1wiOjAsXCIyNFwiOjB9LFwiZm5NYXBcIjp7XCIxXCI6e1wibmFtZVwiOlwiQmluYXVyYWxGSVJcIixcImxpbmVcIjo0LFwibG9jXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNyxcImNvbHVtblwiOjAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxOSxcImNvbHVtblwiOjE2LFwibmFtZVwiOm51bGx9fX0sXCIyXCI6e1wibmFtZVwiOlwiKGFub255bW91c18yKVwiLFwibGluZVwiOjI2LFwibG9jXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo1NyxcImNvbHVtblwiOjIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo1NyxcImNvbHVtblwiOjE2LFwibmFtZVwiOm51bGx9fX0sXCIzXCI6e1wibmFtZVwiOlwiKGFub255bW91c18zKVwiLFwibGluZVwiOjMxLFwibG9jXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo2OSxcImNvbHVtblwiOjIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo2OSxcImNvbHVtblwiOjE5LFwibmFtZVwiOm51bGx9fX0sXCI0XCI6e1wibmFtZVwiOlwiKGFub255bW91c180KVwiLFwibGluZVwiOjM2LFwibG9jXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo4MixcImNvbHVtblwiOjMxLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6ODIsXCJjb2x1bW5cIjozMSxcIm5hbWVcIjpudWxsfX19LFwiNVwiOntcIm5hbWVcIjpcIihhbm9ueW1vdXNfNSlcIixcImxpbmVcIjo1MCxcImxvY1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6OTksXCJjb2x1bW5cIjoyMCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjk5LFwiY29sdW1uXCI6MjAsXCJuYW1lXCI6bnVsbH19fSxcIjZcIjp7XCJuYW1lXCI6XCIoYW5vbnltb3VzXzYpXCIsXCJsaW5lXCI6NTMsXCJsb2NcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjExMCxcImNvbHVtblwiOjIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMTAsXCJjb2x1bW5cIjoxNyxcIm5hbWVcIjpudWxsfX19LFwiN1wiOntcIm5hbWVcIjpcIihhbm9ueW1vdXNfNylcIixcImxpbmVcIjo1NixcImxvY1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTI0LFwiY29sdW1uXCI6MixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjEyNCxcImNvbHVtblwiOjQ0LFwibmFtZVwiOm51bGx9fX0sXCI4XCI6e1wibmFtZVwiOlwiKGFub255bW91c184KVwiLFwibGluZVwiOjgwLFwibG9jXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNjMsXCJjb2x1bW5cIjoyLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTYzLFwiY29sdW1uXCI6MTgsXCJuYW1lXCI6bnVsbH19fSxcIjlcIjp7XCJuYW1lXCI6XCIoYW5vbnltb3VzXzkpXCIsXCJsaW5lXCI6ODcsXCJsb2NcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE3NixcImNvbHVtblwiOjIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNzYsXCJjb2x1bW5cIjoyNCxcIm5hbWVcIjpudWxsfX19LFwiMTBcIjp7XCJuYW1lXCI6XCIoYW5vbnltb3VzXzEwKVwiLFwibGluZVwiOjEwMSxcImxvY1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjA0LFwiY29sdW1uXCI6MixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIwNCxcImNvbHVtblwiOjMzLFwibmFtZVwiOm51bGx9fX0sXCIxMVwiOntcIm5hbWVcIjpcIihhbm9ueW1vdXNfMTEpXCIsXCJsaW5lXCI6MTA5LFwibG9jXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMTgsXCJjb2x1bW5cIjoyLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjE4LFwiY29sdW1uXCI6MjUsXCJuYW1lXCI6bnVsbH19fSxcIjEyXCI6e1wibmFtZVwiOlwiKGFub255bW91c18xMilcIixcImxpbmVcIjoxMTIsXCJsb2NcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIyNyxcImNvbHVtblwiOjIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMjcsXCJjb2x1bW5cIjoxNixcIm5hbWVcIjpudWxsfX19LFwiMTNcIjp7XCJuYW1lXCI6XCIoYW5vbnltb3VzXzEzKVwiLFwibGluZVwiOjExNSxcImxvY1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjM1LFwiY29sdW1uXCI6MixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIzNSxcImNvbHVtblwiOjE2LFwibmFtZVwiOm51bGx9fX0sXCIxNFwiOntcIm5hbWVcIjpcIihhbm9ueW1vdXNfMTQpXCIsXCJsaW5lXCI6MTIyLFwibG9jXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyNTIsXCJjb2x1bW5cIjoyLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjUyLFwiY29sdW1uXCI6NDAsXCJuYW1lXCI6bnVsbH19fSxcIjE1XCI6e1wibmFtZVwiOlwiKGFub255bW91c18xNSlcIixcImxpbmVcIjoxMjYsXCJsb2NcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI2NSxcImNvbHVtblwiOjIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyNjUsXCJjb2x1bW5cIjo1MyxcIm5hbWVcIjpudWxsfX19LFwiMTZcIjp7XCJuYW1lXCI6XCIoYW5vbnltb3VzXzE2KVwiLFwibGluZVwiOjEzMyxcImxvY1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjgwLFwiY29sdW1uXCI6MixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI4MCxcImNvbHVtblwiOjUxLFwibmFtZVwiOm51bGx9fX0sXCIxN1wiOntcIm5hbWVcIjpcIihhbm9ueW1vdXNfMTcpXCIsXCJsaW5lXCI6MTQxLFwibG9jXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyOTcsXCJjb2x1bW5cIjoyLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6Mjk3LFwiY29sdW1uXCI6NDgsXCJuYW1lXCI6bnVsbH19fSxcIjE4XCI6e1wibmFtZVwiOlwiKGFub255bW91c18xOClcIixcImxpbmVcIjoxNDgsXCJsb2NcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMxMyxcImNvbHVtblwiOjIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMTMsXCJjb2x1bW5cIjoyMCxcIm5hbWVcIjpudWxsfX19LFwiMTlcIjp7XCJuYW1lXCI6XCJDb252b2x2ZXJBdWRpb0dyYXBoXCIsXCJsaW5lXCI6MTU1LFwibG9jXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMjYsXCJjb2x1bW5cIjowLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzI4LFwiY29sdW1uXCI6MTYsXCJuYW1lXCI6bnVsbH19fSxcIjIwXCI6e1wibmFtZVwiOlwiKGFub255bW91c18yMClcIixcImxpbmVcIjoxNjksXCJsb2NcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM0NSxcImNvbHVtblwiOjE0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzQ1LFwiY29sdW1uXCI6MTQsXCJuYW1lXCI6bnVsbH19fSxcIjIxXCI6e1wibmFtZVwiOlwiKGFub255bW91c18yMSlcIixcImxpbmVcIjoxNzIsXCJsb2NcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM0OSxcImNvbHVtblwiOjEzLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzQ5LFwiY29sdW1uXCI6MTMsXCJuYW1lXCI6bnVsbH19fSxcIjIyXCI6e1wibmFtZVwiOlwiKGFub255bW91c18yMilcIixcImxpbmVcIjoxNzUsXCJsb2NcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM1OCxcImNvbHVtblwiOjIwLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzU4LFwiY29sdW1uXCI6MjAsXCJuYW1lXCI6bnVsbH19fSxcIjIzXCI6e1wibmFtZVwiOlwiKGFub255bW91c18yMylcIixcImxpbmVcIjoxNzgsXCJsb2NcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM2OCxcImNvbHVtblwiOjIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozNjgsXCJjb2x1bW5cIjoxNixcIm5hbWVcIjpudWxsfX19LFwiMjRcIjp7XCJuYW1lXCI6XCIoYW5vbnltb3VzXzI0KVwiLFwibGluZVwiOjE4MixcImxvY1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6Mzc5LFwiY29sdW1uXCI6MixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM3OSxcImNvbHVtblwiOjE5LFwibmFtZVwiOm51bGx9fX19LFwic3RhdGVtZW50TWFwXCI6e1wiMVwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTAsXCJjb2x1bW5cIjowLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTAsXCJjb2x1bW5cIjoyNCxcIm5hbWVcIjpudWxsfX0sXCIyXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMSxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMSxcImNvbHVtblwiOjQzLFwibmFtZVwiOm51bGx9fSxcIjNcIjp7XCJzdGFydFwiOntcImxpbmVcIjowLFwiY29sdW1uXCI6MH0sXCJlbmRcIjp7XCJsaW5lXCI6MCxcImNvbHVtblwiOjB9LFwic2tpcFwiOnRydWV9LFwiNFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjAsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjAsXCJjb2x1bW5cIjoyNSxcIm5hbWVcIjpudWxsfX0sXCI1XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMSxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMSxcImNvbHVtblwiOjMwLFwibmFtZVwiOm51bGx9fSxcIjZcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIyLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIyLFwiY29sdW1uXCI6MTgsXCJuYW1lXCI6bnVsbH19LFwiN1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjMsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjMsXCJjb2x1bW5cIjoyMixcIm5hbWVcIjpudWxsfX0sXCI4XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyNCxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyNCxcImNvbHVtblwiOjI2LFwibmFtZVwiOm51bGx9fSxcIjlcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI1LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI1LFwiY29sdW1uXCI6NDQsXCJuYW1lXCI6bnVsbH19LFwiMTBcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI2LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI2LFwiY29sdW1uXCI6MzEsXCJuYW1lXCI6bnVsbH19LFwiMTFcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI3LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI3LFwiY29sdW1uXCI6MzgsXCJuYW1lXCI6bnVsbH19LFwiMTJcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI4LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI4LFwiY29sdW1uXCI6MjYsXCJuYW1lXCI6bnVsbH19LFwiMTNcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI5LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI5LFwiY29sdW1uXCI6MzQsXCJuYW1lXCI6bnVsbH19LFwiMTRcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMwLFwiY29sdW1uXCI6MzksXCJuYW1lXCI6bnVsbH19LFwiMTVcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMyLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMyLFwiY29sdW1uXCI6NDIsXCJuYW1lXCI6bnVsbH19LFwiMTZcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM5LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM5LFwiY29sdW1uXCI6NTAsXCJuYW1lXCI6bnVsbH19LFwiMTdcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQwLFwiY29sdW1uXCI6MzcsXCJuYW1lXCI6bnVsbH19LFwiMThcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQxLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQxLFwiY29sdW1uXCI6NDgsXCJuYW1lXCI6bnVsbH19LFwiMTlcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQzLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQzLFwiY29sdW1uXCI6NTUsXCJuYW1lXCI6bnVsbH19LFwiMjBcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQ0LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQ0LFwiY29sdW1uXCI6NDIsXCJuYW1lXCI6bnVsbH19LFwiMjFcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQ1LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQ1LFwiY29sdW1uXCI6NTMsXCJuYW1lXCI6bnVsbH19LFwiMjJcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQ3LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjQ3LFwiY29sdW1uXCI6MTUsXCJuYW1lXCI6bnVsbH19LFwiMjNcIjp7XCJzdGFydFwiOntcImxpbmVcIjowLFwiY29sdW1uXCI6MH0sXCJlbmRcIjp7XCJsaW5lXCI6MCxcImNvbHVtblwiOjB9LFwic2tpcFwiOnRydWV9LFwiMjRcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjU4LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjU4LFwiY29sdW1uXCI6MzYsXCJuYW1lXCI6bnVsbH19LFwiMjVcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjU5LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjU5LFwiY29sdW1uXCI6NDEsXCJuYW1lXCI6bnVsbH19LFwiMjZcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjYwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjYwLFwiY29sdW1uXCI6MTUsXCJuYW1lXCI6bnVsbH19LFwiMjdcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjcwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjcwLFwiY29sdW1uXCI6MzksXCJuYW1lXCI6bnVsbH19LFwiMjhcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjcxLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjcxLFwiY29sdW1uXCI6NDQsXCJuYW1lXCI6bnVsbH19LFwiMjlcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjcyLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjcyLFwiY29sdW1uXCI6MTUsXCJuYW1lXCI6bnVsbH19LFwiMzBcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjgzLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjgzLFwiY29sdW1uXCI6MzQsXCJuYW1lXCI6bnVsbH19LFwiMzFcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjg0LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjg0LFwiY29sdW1uXCI6NTIsXCJuYW1lXCI6bnVsbH19LFwiMzJcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjg2LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjk1LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX0sXCIzM1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6ODcsXCJjb2x1bW5cIjoxMCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjg3LFwiY29sdW1uXCI6MzYsXCJuYW1lXCI6bnVsbH19LFwiMzRcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjg5LFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo4OSxcImNvbHVtblwiOjU1LFwibmFtZVwiOm51bGx9fSxcIjM1XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo5MCxcImNvbHVtblwiOjEwLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6OTAsXCJjb2x1bW5cIjo1OSxcIm5hbWVcIjpudWxsfX0sXCIzNlwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6OTEsXCJjb2x1bW5cIjoxMCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjkxLFwiY29sdW1uXCI6MTAwLFwibmFtZVwiOm51bGx9fSxcIjM3XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo5MixcImNvbHVtblwiOjYsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo5MixcImNvbHVtblwiOjMwLFwibmFtZVwiOm51bGx9fSxcIjM4XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo5MyxcImNvbHVtblwiOjYsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo5MyxcImNvbHVtblwiOjMwLFwibmFtZVwiOm51bGx9fSxcIjM5XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo5NCxcImNvbHVtblwiOjYsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo5NCxcImNvbHVtblwiOjMwLFwibmFtZVwiOm51bGx9fSxcIjQwXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo5NixcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjo5NixcImNvbHVtblwiOjgyLFwibmFtZVwiOm51bGx9fSxcIjQxXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMDAsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTAwLFwiY29sdW1uXCI6MjcsXCJuYW1lXCI6bnVsbH19LFwiNDJcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjExMixcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMTIsXCJjb2x1bW5cIjo4MyxcIm5hbWVcIjpudWxsfX0sXCI0M1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTI2LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE1NixcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH19LFwiNDRcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjEyOCxcImNvbHVtblwiOjEwLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTI4LFwiY29sdW1uXCI6ODEsXCJuYW1lXCI6bnVsbH19LFwiNDVcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjEzMCxcImNvbHVtblwiOjYsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNTUsXCJjb2x1bW5cIjo2LFwibmFtZVwiOm51bGx9fSxcIjQ2XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMzIsXCJjb2x1bW5cIjo4LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTUyLFwiY29sdW1uXCI6OCxcIm5hbWVcIjpudWxsfX0sXCI0N1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTM0LFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMzksXCJjb2x1bW5cIjoxMCxcIm5hbWVcIjpudWxsfX0sXCI0OFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTM2LFwiY29sdW1uXCI6MTIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMzYsXCJjb2x1bW5cIjo0MixcIm5hbWVcIjpudWxsfX0sXCI0OVwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTM4LFwiY29sdW1uXCI6MTIsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMzgsXCJjb2x1bW5cIjo1MSxcIm5hbWVcIjpudWxsfX0sXCI1MFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTQxLFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNDEsXCJjb2x1bW5cIjo2MSxcIm5hbWVcIjpudWxsfX0sXCI1MVwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTQyLFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNDIsXCJjb2x1bW5cIjo2NSxcIm5hbWVcIjpudWxsfX0sXCI1MlwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTQzLFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNDMsXCJjb2x1bW5cIjo2MyxcIm5hbWVcIjpudWxsfX0sXCI1M1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTQ2LFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNDYsXCJjb2x1bW5cIjo4NixcIm5hbWVcIjpudWxsfX0sXCI1NFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTQ4LFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNDgsXCJjb2x1bW5cIjo2MSxcIm5hbWVcIjpudWxsfX0sXCI1NVwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTQ5LFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNDksXCJjb2x1bW5cIjo2NSxcIm5hbWVcIjpudWxsfX0sXCI1NlwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTUwLFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNTAsXCJjb2x1bW5cIjo2MyxcIm5hbWVcIjpudWxsfX0sXCI1N1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTUxLFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNTEsXCJjb2x1bW5cIjozNixcIm5hbWVcIjpudWxsfX0sXCI1OFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTU0LFwiY29sdW1uXCI6OCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE1NCxcImNvbHVtblwiOjE5LFwibmFtZVwiOm51bGx9fSxcIjU5XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNjUsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTY5LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX0sXCI2MFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTY2LFwiY29sdW1uXCI6NixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE2NixcImNvbHVtblwiOjE3LFwibmFtZVwiOm51bGx9fSxcIjYxXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNjgsXCJjb2x1bW5cIjo2LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTY4LFwiY29sdW1uXCI6MTgsXCJuYW1lXCI6bnVsbH19LFwiNjJcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE3OSxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNzksXCJjb2x1bW5cIjo1MyxcIm5hbWVcIjpudWxsfX0sXCI2M1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTgwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE4MCxcImNvbHVtblwiOjU3LFwibmFtZVwiOm51bGx9fSxcIjY0XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxODEsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTgxLFwiY29sdW1uXCI6NTUsXCJuYW1lXCI6bnVsbH19LFwiNjVcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE4MyxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxODMsXCJjb2x1bW5cIjoxMjEsXCJuYW1lXCI6bnVsbH19LFwiNjZcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE4NSxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxODUsXCJjb2x1bW5cIjoyMixcIm5hbWVcIjpudWxsfX0sXCI2N1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTg4LFwiY29sdW1uXCI6OCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE4OCxcImNvbHVtblwiOjM1LFwibmFtZVwiOm51bGx9fSxcIjY4XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxODksXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTg5LFwiY29sdW1uXCI6NDgsXCJuYW1lXCI6bnVsbH19LFwiNjlcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE5MCxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxOTAsXCJjb2x1bW5cIjozNixcIm5hbWVcIjpudWxsfX0sXCI3MFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTkyLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE5NSxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH19LFwiNzFcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE5MyxcImNvbHVtblwiOjYsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxOTMsXCJjb2x1bW5cIjo0NixcIm5hbWVcIjpudWxsfX0sXCI3MlwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTk0LFwiY29sdW1uXCI6NixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE5NCxcImNvbHVtblwiOjM2LFwibmFtZVwiOm51bGx9fSxcIjczXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMDUsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjExLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX0sXCI3NFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjA3LFwiY29sdW1uXCI6NixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIwNyxcImNvbHVtblwiOjQ2LFwibmFtZVwiOm51bGx9fSxcIjc1XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMDgsXCJjb2x1bW5cIjo2LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjA4LFwiY29sdW1uXCI6MTcsXCJuYW1lXCI6bnVsbH19LFwiNzZcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIxMCxcImNvbHVtblwiOjYsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMTAsXCJjb2x1bW5cIjo0NSxcIm5hbWVcIjpudWxsfX0sXCI3N1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjIwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIyMCxcImNvbHVtblwiOjQwLFwibmFtZVwiOm51bGx9fSxcIjc4XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMjgsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjI4LFwiY29sdW1uXCI6MjQsXCJuYW1lXCI6bnVsbH19LFwiNzlcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIzNyxcImNvbHVtblwiOjgsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMzcsXCJjb2x1bW5cIjoyOCxcIm5hbWVcIjpudWxsfX0sXCI4MFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjM4LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjIzOCxcImNvbHVtblwiOjg3LFwibmFtZVwiOm51bGx9fSxcIjgxXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMzksXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjM5LFwiY29sdW1uXCI6MTIxLFwibmFtZVwiOm51bGx9fSxcIjgyXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyNDEsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjQxLFwiY29sdW1uXCI6OTIsXCJuYW1lXCI6bnVsbH19LFwiODNcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI0MixcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyNDIsXCJjb2x1bW5cIjoxMjYsXCJuYW1lXCI6bnVsbH19LFwiODRcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI1MyxcImNvbHVtblwiOjgsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyNTMsXCJjb2x1bW5cIjo2OCxcIm5hbWVcIjpudWxsfX0sXCI4NVwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjU1LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI1NSxcImNvbHVtblwiOjI1LFwibmFtZVwiOm51bGx9fSxcIjg2XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyNjYsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjcwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX0sXCI4N1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjgxLFwiY29sdW1uXCI6OCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI4MSxcImNvbHVtblwiOjY4LFwibmFtZVwiOm51bGx9fSxcIjg4XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyODMsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6Mjg3LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX0sXCI4OVwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6Mjk5LFwiY29sdW1uXCI6OCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjI5OSxcImNvbHVtblwiOjQ4LFwibmFtZVwiOm51bGx9fSxcIjkwXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMDAsXCJjb2x1bW5cIjo4LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzAwLFwiY29sdW1uXCI6NTIsXCJuYW1lXCI6bnVsbH19LFwiOTFcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMwMixcImNvbHVtblwiOjgsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMDIsXCJjb2x1bW5cIjo5NCxcIm5hbWVcIjpudWxsfX0sXCI5MlwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzA0LFwiY29sdW1uXCI6OCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMwNCxcImNvbHVtblwiOjU3LFwibmFtZVwiOm51bGx9fSxcIjkzXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMDYsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzA2LFwiY29sdW1uXCI6MjEsXCJuYW1lXCI6bnVsbH19LFwiOTRcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMxNCxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMTYsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9fSxcIjk1XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMTUsXCJjb2x1bW5cIjo2LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzE1LFwiY29sdW1uXCI6MzIsXCJuYW1lXCI6bnVsbH19LFwiOTZcIjp7XCJzdGFydFwiOntcImxpbmVcIjowLFwiY29sdW1uXCI6MH0sXCJlbmRcIjp7XCJsaW5lXCI6MCxcImNvbHVtblwiOjB9LFwic2tpcFwiOnRydWV9LFwiOTdcIjp7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMyOSxcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMjksXCJjb2x1bW5cIjo0NSxcIm5hbWVcIjpudWxsfX0sXCI5OFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzMwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjMzMCxcImNvbHVtblwiOjUwLFwibmFtZVwiOm51bGx9fSxcIjk5XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMzEsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzMxLFwiY29sdW1uXCI6MzUsXCJuYW1lXCI6bnVsbH19LFwiMTAwXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMzIsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzMyLFwiY29sdW1uXCI6NDAsXCJuYW1lXCI6bnVsbH19LFwiMTAxXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMzUsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzM1LFwiY29sdW1uXCI6NTcsXCJuYW1lXCI6bnVsbH19LFwiMTAyXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMzYsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzM2LFwiY29sdW1uXCI6NTUsXCJuYW1lXCI6bnVsbH19LFwiMTAzXCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMzcsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzM3LFwiY29sdW1uXCI6NTYsXCJuYW1lXCI6bnVsbH19LFwiMTA0XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMzgsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzM4LFwiY29sdW1uXCI6NTAsXCJuYW1lXCI6bnVsbH19LFwiMTA1XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMzksXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzM5LFwiY29sdW1uXCI6NDIsXCJuYW1lXCI6bnVsbH19LFwiMTA2XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozNDAsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzQwLFwiY29sdW1uXCI6MzIsXCJuYW1lXCI6bnVsbH19LFwiMTA3XCI6e1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozNDIsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzQyLFwiY29sdW1uXCI6MTUsXCJuYW1lXCI6bnVsbH19LFwiMTA4XCI6e1wic3RhcnRcIjp7XCJsaW5lXCI6MCxcImNvbHVtblwiOjB9LFwiZW5kXCI6e1wibGluZVwiOjAsXCJjb2x1bW5cIjowfSxcInNraXBcIjp0cnVlfSxcIjEwOVwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzQ2LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM0NixcImNvbHVtblwiOjI0LFwibmFtZVwiOm51bGx9fSxcIjExMFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzUwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM1MCxcImNvbHVtblwiOjI5LFwibmFtZVwiOm51bGx9fSxcIjExMVwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzU5LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM1OSxcImNvbHVtblwiOjMyLFwibmFtZVwiOm51bGx9fSxcIjExMlwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzY5LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM2OSxcImNvbHVtblwiOjMxLFwibmFtZVwiOm51bGx9fSxcIjExM1wiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzcwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM3MCxcImNvbHVtblwiOjE1LFwibmFtZVwiOm51bGx9fSxcIjExNFwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzgwLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM4MCxcImNvbHVtblwiOjM0LFwibmFtZVwiOm51bGx9fSxcIjExNVwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzgxLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM4MSxcImNvbHVtblwiOjE1LFwibmFtZVwiOm51bGx9fSxcIjExNlwiOntcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6Mzg3LFwiY29sdW1uXCI6MCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjM4NyxcImNvbHVtblwiOjI4LFwibmFtZVwiOm51bGx9fX0sXCJicmFuY2hNYXBcIjp7XCIxXCI6e1wibGluZVwiOjU3LFwidHlwZVwiOlwiaWZcIixcImxvY2F0aW9uc1wiOlt7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjEyNixcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMjYsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9fSx7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjEyNixcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMjYsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9fV19LFwiMlwiOntcImxpbmVcIjo1NyxcInR5cGVcIjpcImJpbmFyeS1leHByXCIsXCJsb2NhdGlvbnNcIjpbe1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMjYsXCJjb2x1bW5cIjo4LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTI2LFwiY29sdW1uXCI6MjksXCJuYW1lXCI6bnVsbH19LHtcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTI2LFwiY29sdW1uXCI6MzQsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMjYsXCJjb2x1bW5cIjo1OCxcIm5hbWVcIjpudWxsfX1dfSxcIjNcIjp7XCJsaW5lXCI6NTksXCJ0eXBlXCI6XCJpZlwiLFwibG9jYXRpb25zXCI6W3tcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTMwLFwiY29sdW1uXCI6NixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjEzMCxcImNvbHVtblwiOjYsXCJuYW1lXCI6bnVsbH19LHtcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTMwLFwiY29sdW1uXCI6NixcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjEzMCxcImNvbHVtblwiOjYsXCJuYW1lXCI6bnVsbH19XX0sXCI0XCI6e1wibGluZVwiOjU5LFwidHlwZVwiOlwiYmluYXJ5LWV4cHJcIixcImxvY2F0aW9uc1wiOlt7XCJzdGFydFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjEzMCxcImNvbHVtblwiOjEwLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTMwLFwiY29sdW1uXCI6NTgsXCJuYW1lXCI6bnVsbH19LHtcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTMwLFwiY29sdW1uXCI6NjMsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMzAsXCJjb2x1bW5cIjoxMTUsXCJuYW1lXCI6bnVsbH19LHtcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTMwLFwiY29sdW1uXCI6MTIwLFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTMwLFwiY29sdW1uXCI6MTczLFwibmFtZVwiOm51bGx9fV19LFwiNVwiOntcImxpbmVcIjo2MCxcInR5cGVcIjpcImlmXCIsXCJsb2NhdGlvbnNcIjpbe1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMzIsXCJjb2x1bW5cIjo4LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTMyLFwiY29sdW1uXCI6OCxcIm5hbWVcIjpudWxsfX0se1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMzIsXCJjb2x1bW5cIjo4LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTMyLFwiY29sdW1uXCI6OCxcIm5hbWVcIjpudWxsfX1dfSxcIjZcIjp7XCJsaW5lXCI6NjEsXCJ0eXBlXCI6XCJpZlwiLFwibG9jYXRpb25zXCI6W3tcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTM0LFwiY29sdW1uXCI6MTAsXCJuYW1lXCI6bnVsbH0sXCJlbmRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMzQsXCJjb2x1bW5cIjoxMCxcIm5hbWVcIjpudWxsfX0se1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxMzQsXCJjb2x1bW5cIjoxMCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjEzNCxcImNvbHVtblwiOjEwLFwibmFtZVwiOm51bGx9fV19LFwiN1wiOntcImxpbmVcIjo4MSxcInR5cGVcIjpcImlmXCIsXCJsb2NhdGlvbnNcIjpbe1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNjUsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTY1LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX0se1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoxNjUsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTY1LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX1dfSxcIjhcIjp7XCJsaW5lXCI6OTYsXCJ0eXBlXCI6XCJpZlwiLFwibG9jYXRpb25zXCI6W3tcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTkyLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE5MixcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH19LHtcInN0YXJ0XCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MTkyLFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfSxcImVuZFwiOntcInNvdXJjZVwiOlwiL1VzZXJzL2dvbGRzem1pZHQvc2FtL3Byby9kZXYvYmluYXVyYWxGSVIvYmluYXVyYWwtZmlyLmVzNi5qc1wiLFwibGluZVwiOjE5MixcImNvbHVtblwiOjQsXCJuYW1lXCI6bnVsbH19XX0sXCI5XCI6e1wibGluZVwiOjEwMixcInR5cGVcIjpcImlmXCIsXCJsb2NhdGlvbnNcIjpbe1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMDUsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjA1LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX0se1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjoyMDUsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MjA1LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX1dfSxcIjEwXCI6e1wibGluZVwiOjE0OSxcInR5cGVcIjpcImlmXCIsXCJsb2NhdGlvbnNcIjpbe1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMTQsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzE0LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX0se1wic3RhcnRcIjp7XCJzb3VyY2VcIjpcIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanNcIixcImxpbmVcIjozMTQsXCJjb2x1bW5cIjo0LFwibmFtZVwiOm51bGx9LFwiZW5kXCI6e1wic291cmNlXCI6XCIvVXNlcnMvZ29sZHN6bWlkdC9zYW0vcHJvL2Rldi9iaW5hdXJhbEZJUi9iaW5hdXJhbC1maXIuZXM2LmpzXCIsXCJsaW5lXCI6MzE0LFwiY29sdW1uXCI6NCxcIm5hbWVcIjpudWxsfX1dfX19O1xufVxuX19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQSA9IF9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEFbJy9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpbmF1cmFsRklSL2JpbmF1cmFsLWZpci5lczYuanMnXTtcbl9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMSddKys7dmFyIGtkdD1yZXF1aXJlKCdrZHQnKTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzInXSsrO3ZhciBhdWRpb0NvbnRleHQ9cmVxdWlyZSgnYXVkaW8tY29udGV4dCcpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMyddKys7dmFyIEJpbmF1cmFsRklSPWZ1bmN0aW9uIEJpbmF1cmFsRklSKCl7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5mWycxJ10rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzQnXSsrO3RoaXMuaHJ0ZkRhdGFzZXQ9W107X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc1J10rKzt0aGlzLmhydGZEYXRhc2V0TGVuZ3RoPTA7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc2J10rKzt0aGlzLnRyZWU9LTE7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc3J10rKzt0aGlzLnBvc2l0aW9uPXt9O19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snOCddKys7dGhpcy5uZXh0UG9zaXRpb249e307X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc5J10rKzt0aGlzLmNoYW5nZVdoZW5GaW5pc2hDcm9zc2ZhZGluZz1mYWxzZTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzEwJ10rKzt0aGlzLmludGVydmFsSUQ9dW5kZWZpbmVkO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMTEnXSsrO3RoaXMuY3Jvc3NmYWRlRHVyYXRpb249MjAvMTAwMDtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzEyJ10rKzt0aGlzLmlucHV0PXVuZGVmaW5lZDtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzEzJ10rKzt0aGlzLm1haW5Db252b2x2ZXI9dW5kZWZpbmVkO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMTQnXSsrO3RoaXMuc2Vjb25kYXJ5Q29udm9sdmVyPXVuZGVmaW5lZDtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzE1J10rKzt0aGlzLmlucHV0PWF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycxNiddKys7dGhpcy5tYWluQ29udm9sdmVyPW5ldyBDb252b2x2ZXJBdWRpb0dyYXBoKCk7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycxNyddKys7dGhpcy5tYWluQ29udm9sdmVyLmdhaW4udmFsdWU9MTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzE4J10rKzt0aGlzLmlucHV0LmNvbm5lY3QodGhpcy5tYWluQ29udm9sdmVyLmlucHV0KTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzE5J10rKzt0aGlzLnNlY29uZGFyeUNvbnZvbHZlcj1uZXcgQ29udm9sdmVyQXVkaW9HcmFwaCgpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMjAnXSsrO3RoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmdhaW4udmFsdWU9MDtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzIxJ10rKzt0aGlzLmlucHV0LmNvbm5lY3QodGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuaW5wdXQpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMjInXSsrO3JldHVybiB0aGlzO307X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycyMyddKys7JHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKEJpbmF1cmFsRklSLHtjb25uZWN0OmZ1bmN0aW9uKG5vZGUpe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnMiddKys7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycyNCddKys7dGhpcy5tYWluQ29udm9sdmVyLmNvbm5lY3Qobm9kZSk7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycyNSddKys7dGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuY29ubmVjdChub2RlKTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzI2J10rKztyZXR1cm4gdGhpczt9LGRpc2Nvbm5lY3Q6ZnVuY3Rpb24obm9kZSl7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5mWyczJ10rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzI3J10rKzt0aGlzLm1haW5Db252b2x2ZXIuZGlzY29ubmVjdChub2RlKTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzI4J10rKzt0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5kaXNjb25uZWN0KG5vZGUpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMjknXSsrO3JldHVybiB0aGlzO30sc2V0IEhSVEZEYXRhc2V0KGhydGZEYXRhc2V0KXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzQnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMzAnXSsrO3RoaXMuaHJ0ZkRhdGFzZXQ9aHJ0ZkRhdGFzZXQ7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyczMSddKys7dGhpcy5ocnRmRGF0YXNldExlbmd0aD10aGlzLmhydGZEYXRhc2V0Lmxlbmd0aDtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzMyJ10rKztmb3IodmFyIGk9MDtpPHRoaXMuaHJ0ZkRhdGFzZXRMZW5ndGg7aSsrKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzMzJ10rKzt2YXIgaHJ0Zj10aGlzLmhydGZEYXRhc2V0W2ldO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMzQnXSsrO3ZhciBhemltdXRoUmFkaWFucz1ocnRmLmF6aW11dGgqTWF0aC5QSS8xODA7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyczNSddKys7dmFyIGVsZXZhdGlvblJhZGlhbnM9aHJ0Zi5lbGV2YXRpb24qTWF0aC5QSS8xODA7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyczNiddKys7dmFyIGNhdGVzaWFuQ29vcmQ9dGhpcy5zcGhlcmljYWxUb0NhcnRlc2lhbihhemltdXRoUmFkaWFucyxlbGV2YXRpb25SYWRpYW5zLGhydGYuZGlzdGFuY2UpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMzcnXSsrO2hydGYueD1jYXRlc2lhbkNvb3JkLng7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyczOCddKys7aHJ0Zi55PWNhdGVzaWFuQ29vcmQueTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzM5J10rKztocnRmLno9Y2F0ZXNpYW5Db29yZC56O31fX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzQwJ10rKzt0aGlzLnRyZWU9a2R0LmNyZWF0ZUtkVHJlZSh0aGlzLmhydGZEYXRhc2V0LHRoaXMuZGlzdGFuY2UsWyd4JywneScsJ3onXSk7fSxnZXQgSFJURkRhdGFzZXQoKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzUnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNDEnXSsrO3JldHVybiB0aGlzLmhydGZEYXRhc2V0O30sZGlzdGFuY2U6ZnVuY3Rpb24oYSxiKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzYnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNDInXSsrO3JldHVybiBNYXRoLnBvdyhhLngtYi54LDIpK01hdGgucG93KGEueS1iLnksMikrTWF0aC5wb3coYS56LWIueiwyKTt9LHNldFBvc2l0aW9uOmZ1bmN0aW9uKGF6aW11dGgsZWxldmF0aW9uLGRpc3RhbmNlKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzcnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNDMnXSsrO2lmKChfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmJbJzInXVswXSsrLGFyZ3VtZW50cy5sZW5ndGg9PT0zKXx8KF9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuYlsnMiddWzFdKyssYXJndW1lbnRzLmxlbmd0aD09PTQpKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmJbJzEnXVswXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNDQnXSsrO3ZhciBuZWFyZXN0UG9zaXRpb249dGhpcy5nZXRSZWFsQ29vcmRpbmF0ZXMoYXppbXV0aCxlbGV2YXRpb24sZGlzdGFuY2UpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNDUnXSsrO2lmKChfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmJbJzQnXVswXSsrLG5lYXJlc3RQb3NpdGlvbi5hemltdXRoIT09dGhpcy5wb3NpdGlvbi5hemltdXRoKXx8KF9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuYlsnNCddWzFdKyssbmVhcmVzdFBvc2l0aW9uLmVsZXZhdGlvbiE9PXRoaXMucG9zaXRpb24uZWxldmF0aW9uKXx8KF9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuYlsnNCddWzJdKyssbmVhcmVzdFBvc2l0aW9uLmRpc3RhbmNlIT09dGhpcy5wb3NpdGlvbi5kaXN0YW5jZSkpe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuYlsnMyddWzBdKys7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc0NiddKys7aWYodGhpcy5pc0Nyb3NzZmFkaW5nKCk9PT10cnVlKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmJbJzUnXVswXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNDcnXSsrO2lmKHRoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nPT09dHJ1ZSl7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5iWyc2J11bMF0rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzQ4J10rKztjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7fWVsc2V7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5iWyc2J11bMV0rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzQ5J10rKzt0aGlzLmNoYW5nZVdoZW5GaW5pc2hDcm9zc2ZhZGluZz10cnVlO31fX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzUwJ10rKzt0aGlzLm5leHRQb3NpdGlvbi5hemltdXRoPW5lYXJlc3RQb3NpdGlvbi5hemltdXRoO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNTEnXSsrO3RoaXMubmV4dFBvc2l0aW9uLmVsZXZhdGlvbj1uZWFyZXN0UG9zaXRpb24uZWxldmF0aW9uO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNTInXSsrO3RoaXMubmV4dFBvc2l0aW9uLmRpc3RhbmNlPW5lYXJlc3RQb3NpdGlvbi5kaXN0YW5jZTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzUzJ10rKzt0aGlzLmludGVydmFsSUQ9d2luZG93LnNldEludGVydmFsKHRoaXMuc2V0TGFzdFBvc2l0aW9uLmJpbmQodGhpcyksMC4wMDUpO31lbHNle19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuYlsnNSddWzFdKys7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc1NCddKys7dGhpcy5uZXh0UG9zaXRpb24uYXppbXV0aD1uZWFyZXN0UG9zaXRpb24uYXppbXV0aDtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzU1J10rKzt0aGlzLm5leHRQb3NpdGlvbi5lbGV2YXRpb249bmVhcmVzdFBvc2l0aW9uLmVsZXZhdGlvbjtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzU2J10rKzt0aGlzLm5leHRQb3NpdGlvbi5kaXN0YW5jZT1uZWFyZXN0UG9zaXRpb24uZGlzdGFuY2U7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc1NyddKys7dGhpcy5yZWFsbHlTdGFydFBvc2l0aW9uKCk7fV9fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNTgnXSsrO3JldHVybiB0aGlzO31lbHNle19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuYlsnMyddWzFdKys7fX1lbHNle19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuYlsnMSddWzFdKys7fX0saXNDcm9zc2ZhZGluZzpmdW5jdGlvbigpe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnOCddKys7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc1OSddKys7aWYodGhpcy5tYWluQ29udm9sdmVyLmdhaW4udmFsdWUhPT0xKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmJbJzcnXVswXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNjAnXSsrO3JldHVybiB0cnVlO31lbHNle19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuYlsnNyddWzFdKys7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc2MSddKys7cmV0dXJuIGZhbHNlO319LHJlYWxseVN0YXJ0UG9zaXRpb246ZnVuY3Rpb24oKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzknXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNjInXSsrO3RoaXMucG9zaXRpb24uYXppbXV0aD10aGlzLm5leHRQb3NpdGlvbi5hemltdXRoO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNjMnXSsrO3RoaXMucG9zaXRpb24uZWxldmF0aW9uPXRoaXMubmV4dFBvc2l0aW9uLmVsZXZhdGlvbjtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzY0J10rKzt0aGlzLnBvc2l0aW9uLmRpc3RhbmNlPXRoaXMubmV4dFBvc2l0aW9uLmRpc3RhbmNlO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNjUnXSsrO3RoaXMuc2Vjb25kYXJ5Q29udm9sdmVyLmJ1ZmZlcj10aGlzLmdldEhSVEYodGhpcy5wb3NpdGlvbi5hemltdXRoLHRoaXMucG9zaXRpb24uZWxldmF0aW9uLHRoaXMucG9zaXRpb24uZGlzdGFuY2UpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNjYnXSsrO3RoaXMuY3Jvc3NmYWRpbmcoKTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzY3J10rKzt2YXIgYWN0aXZlPXRoaXMubWFpbkNvbnZvbHZlcjtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzY4J10rKzt0aGlzLm1haW5Db252b2x2ZXI9dGhpcy5zZWNvbmRhcnlDb252b2x2ZXI7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc2OSddKys7dGhpcy5zZWNvbmRhcnlDb252b2x2ZXI9YWN0aXZlO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNzAnXSsrO2lmKHRoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmJbJzgnXVswXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNzEnXSsrO3RoaXMuY2hhbmdlV2hlbkZpbmlzaENyb3NzZmFkaW5nPWZhbHNlO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNzInXSsrO2NsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTt9ZWxzZXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmJbJzgnXVsxXSsrO319LHNldENyb3NzZmFkZUR1cmF0aW9uOmZ1bmN0aW9uKGR1cmF0aW9uKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzEwJ10rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzczJ10rKztpZihkdXJhdGlvbil7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5iWyc5J11bMF0rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzc0J10rKzt0aGlzLmNyb3NzZmFkZUR1cmF0aW9uPWR1cmF0aW9uLzEwMDA7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc3NSddKys7cmV0dXJuIHRoaXM7fWVsc2V7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5iWyc5J11bMV0rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzc2J10rKzt0aHJvdydDcm9zc2ZhZGVEdXJhdGlvbiBzZXR0aW5nIGVycm9yJzt9fSxnZXRDcm9zc2ZhZGVEdXJhdGlvbjpmdW5jdGlvbigpe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnMTEnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNzcnXSsrO3JldHVybiB0aGlzLmNyb3NzZmFkZUR1cmF0aW9uKjEwMDA7fSxnZXRQb3NpdGlvbjpmdW5jdGlvbigpe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnMTInXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snNzgnXSsrO3JldHVybiB0aGlzLnBvc2l0aW9uO30sY3Jvc3NmYWRpbmc6ZnVuY3Rpb24oKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzEzJ10rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzc5J10rKzt2YXIgZ3VhcmRJbnRlcnZhbD0wLjAyO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snODAnXSsrO3RoaXMubWFpbkNvbnZvbHZlci5nYWluLnNldFZhbHVlQXRUaW1lKDEsYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lK2d1YXJkSW50ZXJ2YWwpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snODEnXSsrO3RoaXMubWFpbkNvbnZvbHZlci5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lK2d1YXJkSW50ZXJ2YWwrdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbik7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc4MiddKys7dGhpcy5zZWNvbmRhcnlDb252b2x2ZXIuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZStndWFyZEludGVydmFsKTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzgzJ10rKzt0aGlzLnNlY29uZGFyeUNvbnZvbHZlci5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDEsYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lK2d1YXJkSW50ZXJ2YWwrdGhpcy5jcm9zc2ZhZGVEdXJhdGlvbik7fSxnZXRIUlRGOmZ1bmN0aW9uKGF6aW11dGgsZWxldmF0aW9uLGRpc3RhbmNlKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzE0J10rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzg0J10rKzt2YXIgbmVhcmVzdD10aGlzLmdldE5lYXJlc3RQb2ludChhemltdXRoLGVsZXZhdGlvbixkaXN0YW5jZSk7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc4NSddKys7cmV0dXJuIG5lYXJlc3QuYnVmZmVyO30sc3BoZXJpY2FsVG9DYXJ0ZXNpYW46ZnVuY3Rpb24oYXppbXV0aCxlbGV2YXRpb24sZGlzdGFuY2Upe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnMTUnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snODYnXSsrO3JldHVybnt4OmRpc3RhbmNlKk1hdGguc2luKGF6aW11dGgpLHk6ZGlzdGFuY2UqTWF0aC5jb3MoYXppbXV0aCksejpkaXN0YW5jZSpNYXRoLnNpbihlbGV2YXRpb24pfTt9LGdldFJlYWxDb29yZGluYXRlczpmdW5jdGlvbihhemltdXRoLGVsZXZhdGlvbixkaXN0YW5jZSl7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5mWycxNiddKys7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc4NyddKys7dmFyIG5lYXJlc3Q9dGhpcy5nZXROZWFyZXN0UG9pbnQoYXppbXV0aCxlbGV2YXRpb24sZGlzdGFuY2UpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snODgnXSsrO3JldHVybnthemltdXRoOm5lYXJlc3QuYXppbXV0aCxlbGV2YXRpb246bmVhcmVzdC5lbGV2YXRpb24sZGlzdGFuY2U6bmVhcmVzdC5kaXN0YW5jZX07fSxnZXROZWFyZXN0UG9pbnQ6ZnVuY3Rpb24oYXppbXV0aCxlbGV2YXRpb24sZGlzdGFuY2Upe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnMTcnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snODknXSsrO3ZhciBhemltdXRoUmFkaWFucz1hemltdXRoKk1hdGguUEkvMTgwO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snOTAnXSsrO3ZhciBlbGV2YXRpb25SYWRpYW5zPWVsZXZhdGlvbipNYXRoLlBJLzE4MDtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzkxJ10rKzt2YXIgY2FydGVzaWFuQ29vcmQ9dGhpcy5zcGhlcmljYWxUb0NhcnRlc2lhbihhemltdXRoUmFkaWFucyxlbGV2YXRpb25SYWRpYW5zLGRpc3RhbmNlKTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzkyJ10rKzt2YXIgbmVhcmVzdD10aGlzLnRyZWUubmVhcmVzdChjYXJ0ZXNpYW5Db29yZCwxKVswXTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzkzJ10rKztyZXR1cm4gbmVhcmVzdFswXTt9LHNldExhc3RQb3NpdGlvbjpmdW5jdGlvbigpe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnMTgnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snOTQnXSsrO2lmKCF0aGlzLmlzQ3Jvc3NmYWRpbmcoKSl7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5iWycxMCddWzBdKys7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc5NSddKys7dGhpcy5yZWFsbHlTdGFydFBvc2l0aW9uKCk7fWVsc2V7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5iWycxMCddWzFdKys7fX19LHt9KTs7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWyc5NiddKys7dmFyIENvbnZvbHZlckF1ZGlvR3JhcGg9ZnVuY3Rpb24gQ29udm9sdmVyQXVkaW9HcmFwaCgpe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnMTknXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snOTcnXSsrO3RoaXMuZ2Fpbk5vZGU9YXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzk4J10rKzt0aGlzLmNvbnZOb2RlPWF1ZGlvQ29udGV4dC5jcmVhdGVDb252b2x2ZXIoKTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzk5J10rKzt0aGlzLmNvbnZOb2RlLm5vcm1hbGl6ZT1mYWxzZTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzEwMCddKys7dGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udk5vZGUpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMTAxJ10rKzt0aGlzLm9zY2lsbGF0b3JOb2RlPWF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKCk7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycxMDInXSsrO3RoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlPWF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycxMDMnXSsrO3RoaXMub3NjaWxsYXRvck5vZGUuY29ubmVjdCh0aGlzLmdhaW5Pc2NpbGxhdG9yTm9kZSk7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycxMDQnXSsrO3RoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycxMDUnXSsrO3RoaXMuZ2Fpbk9zY2lsbGF0b3JOb2RlLmdhaW4udmFsdWU9MDtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzEwNiddKys7dGhpcy5vc2NpbGxhdG9yTm9kZS5zdGFydCgwKTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzEwNyddKys7cmV0dXJuIHRoaXM7fTtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzEwOCddKys7JHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKENvbnZvbHZlckF1ZGlvR3JhcGgse2dldCBpbnB1dCgpe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnMjAnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMTA5J10rKztyZXR1cm4gdGhpcy5nYWluTm9kZTt9LGdldCBnYWluKCl7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5mWycyMSddKys7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycxMTAnXSsrO3JldHVybiB0aGlzLmdhaW5Ob2RlLmdhaW47fSxzZXQgYnVmZmVyKHZhbHVlKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzIyJ10rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzExMSddKys7dGhpcy5jb252Tm9kZS5idWZmZXI9dmFsdWU7fSxjb25uZWN0OmZ1bmN0aW9uKG5vZGUpe19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuZlsnMjMnXSsrO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMTEyJ10rKzt0aGlzLmNvbnZOb2RlLmNvbm5lY3Qobm9kZSk7X19jb3ZfRDlvNGg4U2ZxSkVRcUxZbWl4NEdsQS5zWycxMTMnXSsrO3JldHVybiB0aGlzO30sZGlzY29ubmVjdDpmdW5jdGlvbihub2RlKXtfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLmZbJzI0J10rKztfX2Nvdl9EOW80aDhTZnFKRVFxTFltaXg0R2xBLnNbJzExNCddKys7dGhpcy5jb252Tm9kZS5kaXNjb25uZWN0KG5vZGUpO19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMTE1J10rKztyZXR1cm4gdGhpczt9fSx7fSk7O19fY292X0Q5bzRoOFNmcUpFUXFMWW1peDRHbEEuc1snMTE2J10rKzttb2R1bGUuZXhwb3J0cz1CaW5hdXJhbEZJUjtcbiIsIi8qIENvcHlyaWdodCAyMDEzIENocmlzIFdpbHNvblxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuICAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qIFxuXG5UaGlzIG1vbmtleXBhdGNoIGxpYnJhcnkgaXMgaW50ZW5kZWQgdG8gYmUgaW5jbHVkZWQgaW4gcHJvamVjdHMgdGhhdCBhcmVcbndyaXR0ZW4gdG8gdGhlIHByb3BlciBBdWRpb0NvbnRleHQgc3BlYyAoaW5zdGVhZCBvZiB3ZWJraXRBdWRpb0NvbnRleHQpLCBcbmFuZCB0aGF0IHVzZSB0aGUgbmV3IG5hbWluZyBhbmQgcHJvcGVyIGJpdHMgb2YgdGhlIFdlYiBBdWRpbyBBUEkgKGUuZy4gXG51c2luZyBCdWZmZXJTb3VyY2VOb2RlLnN0YXJ0KCkgaW5zdGVhZCBvZiBCdWZmZXJTb3VyY2VOb2RlLm5vdGVPbigpKSwgYnV0IG1heVxuaGF2ZSB0byBydW4gb24gc3lzdGVtcyB0aGF0IG9ubHkgc3VwcG9ydCB0aGUgZGVwcmVjYXRlZCBiaXRzLlxuXG5UaGlzIGxpYnJhcnkgc2hvdWxkIGJlIGhhcm1sZXNzIHRvIGluY2x1ZGUgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgXG51bnByZWZpeGVkIFwiQXVkaW9Db250ZXh0XCIsIGFuZC9vciBpZiBpdCBzdXBwb3J0cyB0aGUgbmV3IG5hbWVzLiAgXG5cblRoZSBwYXRjaGVzIHRoaXMgbGlicmFyeSBoYW5kbGVzOlxuaWYgd2luZG93LkF1ZGlvQ29udGV4dCBpcyB1bnN1cHBvcnRlZCwgaXQgd2lsbCBiZSBhbGlhc2VkIHRvIHdlYmtpdEF1ZGlvQ29udGV4dCgpLlxuaWYgQXVkaW9CdWZmZXJTb3VyY2VOb2RlLnN0YXJ0KCkgaXMgdW5pbXBsZW1lbnRlZCwgaXQgd2lsbCBiZSByb3V0ZWQgdG8gbm90ZU9uKCkgb3Jcbm5vdGVHcmFpbk9uKCksIGRlcGVuZGluZyBvbiBwYXJhbWV0ZXJzLlxuXG5UaGUgZm9sbG93aW5nIGFsaWFzZXMgb25seSB0YWtlIGVmZmVjdCBpZiB0aGUgbmV3IG5hbWVzIGFyZSBub3QgYWxyZWFkeSBpbiBwbGFjZTpcblxuQXVkaW9CdWZmZXJTb3VyY2VOb2RlLnN0b3AoKSBpcyBhbGlhc2VkIHRvIG5vdGVPZmYoKVxuQXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKSBpcyBhbGlhc2VkIHRvIGNyZWF0ZUdhaW5Ob2RlKClcbkF1ZGlvQ29udGV4dC5jcmVhdGVEZWxheSgpIGlzIGFsaWFzZWQgdG8gY3JlYXRlRGVsYXlOb2RlKClcbkF1ZGlvQ29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoKSBpcyBhbGlhc2VkIHRvIGNyZWF0ZUphdmFTY3JpcHROb2RlKClcbkF1ZGlvQ29udGV4dC5jcmVhdGVQZXJpb2RpY1dhdmUoKSBpcyBhbGlhc2VkIHRvIGNyZWF0ZVdhdmVUYWJsZSgpXG5Pc2NpbGxhdG9yTm9kZS5zdGFydCgpIGlzIGFsaWFzZWQgdG8gbm90ZU9uKClcbk9zY2lsbGF0b3JOb2RlLnN0b3AoKSBpcyBhbGlhc2VkIHRvIG5vdGVPZmYoKVxuT3NjaWxsYXRvck5vZGUuc2V0UGVyaW9kaWNXYXZlKCkgaXMgYWxpYXNlZCB0byBzZXRXYXZlVGFibGUoKVxuQXVkaW9QYXJhbS5zZXRUYXJnZXRBdFRpbWUoKSBpcyBhbGlhc2VkIHRvIHNldFRhcmdldFZhbHVlQXRUaW1lKClcblxuVGhpcyBsaWJyYXJ5IGRvZXMgTk9UIHBhdGNoIHRoZSBlbnVtZXJhdGVkIHR5cGUgY2hhbmdlcywgYXMgaXQgaXMgXG5yZWNvbW1lbmRlZCBpbiB0aGUgc3BlY2lmaWNhdGlvbiB0aGF0IGltcGxlbWVudGF0aW9ucyBzdXBwb3J0IGJvdGggaW50ZWdlclxuYW5kIHN0cmluZyB0eXBlcyBmb3IgQXVkaW9QYW5uZXJOb2RlLnBhbm5pbmdNb2RlbCwgQXVkaW9QYW5uZXJOb2RlLmRpc3RhbmNlTW9kZWwgXG5CaXF1YWRGaWx0ZXJOb2RlLnR5cGUgYW5kIE9zY2lsbGF0b3JOb2RlLnR5cGUuXG5cbiovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZXhwb3J0cywgcGVyZikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gZml4U2V0VGFyZ2V0KHBhcmFtKSB7XG4gICAgaWYgKCFwYXJhbSkgLy8gaWYgTllJLCBqdXN0IHJldHVyblxuICAgICAgcmV0dXJuO1xuICAgIGlmICghcGFyYW0uc2V0VGFyZ2V0QXRUaW1lKVxuICAgICAgcGFyYW0uc2V0VGFyZ2V0QXRUaW1lID0gcGFyYW0uc2V0VGFyZ2V0VmFsdWVBdFRpbWU7IFxuICB9XG5cbiAgaWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgnd2Via2l0QXVkaW9Db250ZXh0JykgJiYgXG4gICAgICAhd2luZG93Lmhhc093blByb3BlcnR5KCdBdWRpb0NvbnRleHQnKSkge1xuICAgIHdpbmRvdy5BdWRpb0NvbnRleHQgPSB3ZWJraXRBdWRpb0NvbnRleHQ7XG5cbiAgICBpZiAoIUF1ZGlvQ29udGV4dC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ2NyZWF0ZUdhaW4nKSlcbiAgICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlR2FpbiA9IEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlR2Fpbk5vZGU7XG4gICAgaWYgKCFBdWRpb0NvbnRleHQucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdjcmVhdGVEZWxheScpKVxuICAgICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVEZWxheSA9IEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlRGVsYXlOb2RlO1xuICAgIGlmICghQXVkaW9Db250ZXh0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnY3JlYXRlU2NyaXB0UHJvY2Vzc29yJykpXG4gICAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmNyZWF0ZVNjcmlwdFByb2Nlc3NvciA9IEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlSmF2YVNjcmlwdE5vZGU7XG4gICAgaWYgKCFBdWRpb0NvbnRleHQucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdjcmVhdGVQZXJpb2RpY1dhdmUnKSlcbiAgICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlUGVyaW9kaWNXYXZlID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVXYXZlVGFibGU7XG5cblxuICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuaW50ZXJuYWxfY3JlYXRlR2FpbiA9IEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlR2FpbjtcbiAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmNyZWF0ZUdhaW4gPSBmdW5jdGlvbigpIHsgXG4gICAgICB2YXIgbm9kZSA9IHRoaXMuaW50ZXJuYWxfY3JlYXRlR2FpbigpO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUuZ2Fpbik7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuXG4gICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5pbnRlcm5hbF9jcmVhdGVEZWxheSA9IEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlRGVsYXk7XG4gICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVEZWxheSA9IGZ1bmN0aW9uKG1heERlbGF5VGltZSkgeyBcbiAgICAgIHZhciBub2RlID0gbWF4RGVsYXlUaW1lID8gdGhpcy5pbnRlcm5hbF9jcmVhdGVEZWxheShtYXhEZWxheVRpbWUpIDogdGhpcy5pbnRlcm5hbF9jcmVhdGVEZWxheSgpO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUuZGVsYXlUaW1lKTtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG5cbiAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmludGVybmFsX2NyZWF0ZUJ1ZmZlclNvdXJjZSA9IEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlQnVmZmVyU291cmNlO1xuICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlQnVmZmVyU291cmNlID0gZnVuY3Rpb24oKSB7IFxuICAgICAgdmFyIG5vZGUgPSB0aGlzLmludGVybmFsX2NyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgaWYgKCFub2RlLnN0YXJ0KSB7XG4gICAgICAgIG5vZGUuc3RhcnQgPSBmdW5jdGlvbiAoIHdoZW4sIG9mZnNldCwgZHVyYXRpb24gKSB7XG4gICAgICAgICAgaWYgKCBvZmZzZXQgfHwgZHVyYXRpb24gKVxuICAgICAgICAgICAgdGhpcy5ub3RlR3JhaW5Pbiggd2hlbiwgb2Zmc2V0LCBkdXJhdGlvbiApO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMubm90ZU9uKCB3aGVuICk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoIW5vZGUuc3RvcClcbiAgICAgICAgbm9kZS5zdG9wID0gbm9kZS5ub3RlT2ZmO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUucGxheWJhY2tSYXRlKTtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG5cbiAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmludGVybmFsX2NyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvciA9IEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yO1xuICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yID0gZnVuY3Rpb24oKSB7IFxuICAgICAgdmFyIG5vZGUgPSB0aGlzLmludGVybmFsX2NyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUudGhyZXNob2xkKTtcbiAgICAgIGZpeFNldFRhcmdldChub2RlLmtuZWUpO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUucmF0aW8pO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUucmVkdWN0aW9uKTtcbiAgICAgIGZpeFNldFRhcmdldChub2RlLmF0dGFjayk7XG4gICAgICBmaXhTZXRUYXJnZXQobm9kZS5yZWxlYXNlKTtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG5cbiAgICBBdWRpb0NvbnRleHQucHJvdG90eXBlLmludGVybmFsX2NyZWF0ZUJpcXVhZEZpbHRlciA9IEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlQmlxdWFkRmlsdGVyO1xuICAgIEF1ZGlvQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlQmlxdWFkRmlsdGVyID0gZnVuY3Rpb24oKSB7IFxuICAgICAgdmFyIG5vZGUgPSB0aGlzLmludGVybmFsX2NyZWF0ZUJpcXVhZEZpbHRlcigpO1xuICAgICAgZml4U2V0VGFyZ2V0KG5vZGUuZnJlcXVlbmN5KTtcbiAgICAgIGZpeFNldFRhcmdldChub2RlLmRldHVuZSk7XG4gICAgICBmaXhTZXRUYXJnZXQobm9kZS5RKTtcbiAgICAgIGZpeFNldFRhcmdldChub2RlLmdhaW4pO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcblxuICAgIGlmIChBdWRpb0NvbnRleHQucHJvdG90eXBlLmhhc093blByb3BlcnR5KCAnY3JlYXRlT3NjaWxsYXRvcicgKSkge1xuICAgICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5pbnRlcm5hbF9jcmVhdGVPc2NpbGxhdG9yID0gQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVPc2NpbGxhdG9yO1xuICAgICAgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVPc2NpbGxhdG9yID0gZnVuY3Rpb24oKSB7IFxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuaW50ZXJuYWxfY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBpZiAoIW5vZGUuc3RhcnQpXG4gICAgICAgICAgbm9kZS5zdGFydCA9IG5vZGUubm90ZU9uOyBcbiAgICAgICAgaWYgKCFub2RlLnN0b3ApXG4gICAgICAgICAgbm9kZS5zdG9wID0gbm9kZS5ub3RlT2ZmO1xuICAgICAgICBpZiAoIW5vZGUuc2V0UGVyaW9kaWNXYXZlKVxuICAgICAgICAgIG5vZGUuc2V0UGVyaW9kaWNXYXZlID0gbm9kZS5zZXRXYXZlVGFibGU7XG4gICAgICAgIGZpeFNldFRhcmdldChub2RlLmZyZXF1ZW5jeSk7XG4gICAgICAgIGZpeFNldFRhcmdldChub2RlLmRldHVuZSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbn0od2luZG93KSk7IiwiLypnbG9iYWxzIEF1ZGlvQ29udGV4dCovXG5yZXF1aXJlKCcuL2FjLW1vbmtleXBhdGNoJyk7XG53aW5kb3cud2F2ZXMgPSB3aW5kb3cud2F2ZXMgfHwge307XG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy53YXZlcy5hdWRpb0NvbnRleHQgPSB3aW5kb3cud2F2ZXMuYXVkaW9Db250ZXh0IHx8IG5ldyBBdWRpb0NvbnRleHQoKTsiLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXMtYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG52YXIga01heExlbmd0aCA9IDB4M2ZmZmZmZmZcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAtIEltcGxlbWVudGF0aW9uIG11c3Qgc3VwcG9ydCBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcy5cbiAqICAgRmlyZWZveCA0LTI5IGxhY2tlZCBzdXBwb3J0LCBmaXhlZCBpbiBGaXJlZm94IDMwKy5cbiAqICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cbiAqXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleSB3aWxsXG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCB3aWxsIHdvcmsgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IChmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgYXJyLmZvbyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH1cbiAgICByZXR1cm4gNDIgPT09IGFyci5mb28oKSAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBuZXcgVWludDhBcnJheSgxKS5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufSkoKVxuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyIChzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKVxuICAgIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pXG5cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdFxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoXG4gIGlmICh0eXBlID09PSAnbnVtYmVyJylcbiAgICBsZW5ndGggPSBzdWJqZWN0ID4gMCA/IHN1YmplY3QgPj4+IDAgOiAwXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0JylcbiAgICAgIHN1YmplY3QgPSBiYXNlNjRjbGVhbihzdWJqZWN0KVxuICAgIGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHN1YmplY3QsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnICYmIHN1YmplY3QgIT09IG51bGwpIHsgLy8gYXNzdW1lIG9iamVjdCBpcyBhcnJheS1saWtlXG4gICAgaWYgKHN1YmplY3QudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShzdWJqZWN0LmRhdGEpKVxuICAgICAgc3ViamVjdCA9IHN1YmplY3QuZGF0YVxuICAgIGxlbmd0aCA9ICtzdWJqZWN0Lmxlbmd0aCA+IDAgPyBNYXRoLmZsb29yKCtzdWJqZWN0Lmxlbmd0aCkgOiAwXG4gIH0gZWxzZVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ211c3Qgc3RhcnQgd2l0aCBudW1iZXIsIGJ1ZmZlciwgYXJyYXkgb3Igc3RyaW5nJylcblxuICBpZiAodGhpcy5sZW5ndGggPiBrTWF4TGVuZ3RoKVxuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG5cbiAgdmFyIGJ1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBQcmVmZXJyZWQ6IFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgYnVmID0gQnVmZmVyLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzXG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aFxuICAgIGJ1Zi5faXNCdWZmZXIgPSB0cnVlXG4gIH1cblxuICB2YXIgaVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgdHlwZW9mIHN1YmplY3QuYnl0ZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBTcGVlZCBvcHRpbWl6YXRpb24gLS0gdXNlIHNldCBpZiB3ZSdyZSBjb3B5aW5nIGZyb20gYSB0eXBlZCBhcnJheVxuICAgIGJ1Zi5fc2V0KHN1YmplY3QpXG4gIH0gZWxzZSBpZiAoaXNBcnJheWlzaChzdWJqZWN0KSkge1xuICAgIC8vIFRyZWF0IGFycmF5LWlzaCBvYmplY3RzIGFzIGEgYnl0ZSBhcnJheVxuICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKylcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdC5yZWFkVUludDgoaSlcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgICAgICBidWZbaV0gPSAoKHN1YmplY3RbaV0gJSAyNTYpICsgMjU2KSAlIDI1NlxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGJ1Zi53cml0ZShzdWJqZWN0LCAwLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgIW5vWmVybykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnVmW2ldID0gMFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW4gJiYgYVtpXSA9PT0gYltpXTsgaSsrKSB7fVxuICBpZiAoaSAhPT0gbGVuKSB7XG4gICAgeCA9IGFbaV1cbiAgICB5ID0gYltpXVxuICB9XG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiAobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0WywgbGVuZ3RoXSknKVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKDApXG4gIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbGlzdFswXVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKHRvdGFsTGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICB0b3RhbExlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxMZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcih0b3RhbExlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICBpdGVtLmNvcHkoYnVmLCBwb3MpXG4gICAgcG9zICs9IGl0ZW0ubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXRcbiAgc3RyID0gc3RyICsgJydcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdyYXcnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAqIDJcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggPj4+IDFcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGhcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbi8vIHByZS1zZXQgZm9yIHZhbHVlcyB0aGF0IG1heSBleGlzdCBpbiB0aGUgZnV0dXJlXG5CdWZmZXIucHJvdG90eXBlLmxlbmd0aCA9IHVuZGVmaW5lZFxuQnVmZmVyLnByb3RvdHlwZS5wYXJlbnQgPSB1bmRlZmluZWRcblxuLy8gdG9TdHJpbmcoZW5jb2RpbmcsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID09PSBJbmZpbml0eSA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcbiAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKGVuZCA8PSBzdGFydCkgcmV0dXJuICcnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gYmluYXJ5U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKVxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAoYikge1xuICBpZighQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heClcbiAgICAgIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYilcbn1cblxuLy8gYGdldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMucmVhZFVJbnQ4KG9mZnNldClcbn1cblxuLy8gYHNldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHYsIG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMud3JpdGVVSW50OCh2LCBvZmZzZXQpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJ5dGUgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKGJ5dGUpKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIGJpbmFyeVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiB1dGYxNmxlV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoLCAyKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHsgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2RpbmdcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIG9mZnNldCA9IGxlbmd0aFxuICAgIGxlbmd0aCA9IHN3YXBcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBiaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHV0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJ1xuICB2YXIgdG1wID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICAgICAgdG1wID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNilcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKVxufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGJpbmFyeVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIGFzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKVxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW47XG4gICAgaWYgKHN0YXJ0IDwgMClcbiAgICAgIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKVxuICAgICAgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KVxuICAgIGVuZCA9IHN0YXJ0XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5fYXVnbWVudCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpKVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgdmFyIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgICByZXR1cm4gbmV3QnVmXG4gIH1cbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApXG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpXG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSlcbiAgICByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2J1ZmZlciBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWx1ZSBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gdmFsdWVcbiAgfSBlbHNlIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbiAgfSBlbHNlIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9IHZhbHVlXG4gIH0gZWxzZSBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Ugb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9IHZhbHVlXG4gIH0gZWxzZSBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSB2YWx1ZVxuICB9IGVsc2Ugb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsdWUgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldF9zdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgc291cmNlID0gdGhpc1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICghdGFyZ2V0X3N0YXJ0KSB0YXJnZXRfc3RhcnQgPSAwXG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAoZW5kIDwgc3RhcnQpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0JylcbiAgaWYgKHRhcmdldF9zdGFydCA8IDAgfHwgdGFyZ2V0X3N0YXJ0ID49IHRhcmdldC5sZW5ndGgpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gc291cmNlLmxlbmd0aCkgdGhyb3cgbmV3IFR5cGVFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwIHx8IGVuZCA+IHNvdXJjZS5sZW5ndGgpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpXG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydClcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0ICsgc3RhcnRcblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldF9zdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0Ll9zZXQodGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLCB0YXJnZXRfc3RhcnQpXG4gIH1cbn1cblxuLy8gZmlsbCh2YWx1ZSwgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGhcblxuICBpZiAoZW5kIDwgc3RhcnQpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuZCA8IHN0YXJ0JylcblxuICAvLyBGaWxsIDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgdGhpc1tpXSA9IHZhbHVlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IHV0ZjhUb0J5dGVzKHZhbHVlLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIHRoaXNbaV0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgICAgcmV0dXJuIChuZXcgQnVmZmVyKHRoaXMpKS5idWZmZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICBidWZbaV0gPSB0aGlzW2ldXG4gICAgICB9XG4gICAgICByZXR1cm4gYnVmLmJ1ZmZlclxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gIH1cbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgQlAgPSBCdWZmZXIucHJvdG90eXBlXG5cbi8qKlxuICogQXVnbWVudCBhIFVpbnQ4QXJyYXkgKmluc3RhbmNlKiAobm90IHRoZSBVaW50OEFycmF5IGNsYXNzISkgd2l0aCBCdWZmZXIgbWV0aG9kc1xuICovXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5jb25zdHJ1Y3RvciA9IEJ1ZmZlclxuICBhcnIuX2lzQnVmZmVyID0gdHJ1ZVxuXG4gIC8vIHNhdmUgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIFVpbnQ4QXJyYXkgZ2V0L3NldCBtZXRob2RzIGJlZm9yZSBvdmVyd3JpdGluZ1xuICBhcnIuX2dldCA9IGFyci5nZXRcbiAgYXJyLl9zZXQgPSBhcnIuc2V0XG5cbiAgLy8gZGVwcmVjYXRlZCwgd2lsbCBiZSByZW1vdmVkIGluIG5vZGUgMC4xMytcbiAgYXJyLmdldCA9IEJQLmdldFxuICBhcnIuc2V0ID0gQlAuc2V0XG5cbiAgYXJyLndyaXRlID0gQlAud3JpdGVcbiAgYXJyLnRvU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvTG9jYWxlU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvSlNPTiA9IEJQLnRvSlNPTlxuICBhcnIuZXF1YWxzID0gQlAuZXF1YWxzXG4gIGFyci5jb21wYXJlID0gQlAuY29tcGFyZVxuICBhcnIuY29weSA9IEJQLmNvcHlcbiAgYXJyLnNsaWNlID0gQlAuc2xpY2VcbiAgYXJyLnJlYWRVSW50OCA9IEJQLnJlYWRVSW50OFxuICBhcnIucmVhZFVJbnQxNkxFID0gQlAucmVhZFVJbnQxNkxFXG4gIGFyci5yZWFkVUludDE2QkUgPSBCUC5yZWFkVUludDE2QkVcbiAgYXJyLnJlYWRVSW50MzJMRSA9IEJQLnJlYWRVSW50MzJMRVxuICBhcnIucmVhZFVJbnQzMkJFID0gQlAucmVhZFVJbnQzMkJFXG4gIGFyci5yZWFkSW50OCA9IEJQLnJlYWRJbnQ4XG4gIGFyci5yZWFkSW50MTZMRSA9IEJQLnJlYWRJbnQxNkxFXG4gIGFyci5yZWFkSW50MTZCRSA9IEJQLnJlYWRJbnQxNkJFXG4gIGFyci5yZWFkSW50MzJMRSA9IEJQLnJlYWRJbnQzMkxFXG4gIGFyci5yZWFkSW50MzJCRSA9IEJQLnJlYWRJbnQzMkJFXG4gIGFyci5yZWFkRmxvYXRMRSA9IEJQLnJlYWRGbG9hdExFXG4gIGFyci5yZWFkRmxvYXRCRSA9IEJQLnJlYWRGbG9hdEJFXG4gIGFyci5yZWFkRG91YmxlTEUgPSBCUC5yZWFkRG91YmxlTEVcbiAgYXJyLnJlYWREb3VibGVCRSA9IEJQLnJlYWREb3VibGVCRVxuICBhcnIud3JpdGVVSW50OCA9IEJQLndyaXRlVUludDhcbiAgYXJyLndyaXRlVUludDE2TEUgPSBCUC53cml0ZVVJbnQxNkxFXG4gIGFyci53cml0ZVVJbnQxNkJFID0gQlAud3JpdGVVSW50MTZCRVxuICBhcnIud3JpdGVVSW50MzJMRSA9IEJQLndyaXRlVUludDMyTEVcbiAgYXJyLndyaXRlVUludDMyQkUgPSBCUC53cml0ZVVJbnQzMkJFXG4gIGFyci53cml0ZUludDggPSBCUC53cml0ZUludDhcbiAgYXJyLndyaXRlSW50MTZMRSA9IEJQLndyaXRlSW50MTZMRVxuICBhcnIud3JpdGVJbnQxNkJFID0gQlAud3JpdGVJbnQxNkJFXG4gIGFyci53cml0ZUludDMyTEUgPSBCUC53cml0ZUludDMyTEVcbiAgYXJyLndyaXRlSW50MzJCRSA9IEJQLndyaXRlSW50MzJCRVxuICBhcnIud3JpdGVGbG9hdExFID0gQlAud3JpdGVGbG9hdExFXG4gIGFyci53cml0ZUZsb2F0QkUgPSBCUC53cml0ZUZsb2F0QkVcbiAgYXJyLndyaXRlRG91YmxlTEUgPSBCUC53cml0ZURvdWJsZUxFXG4gIGFyci53cml0ZURvdWJsZUJFID0gQlAud3JpdGVEb3VibGVCRVxuICBhcnIuZmlsbCA9IEJQLmZpbGxcbiAgYXJyLmluc3BlY3QgPSBCUC5pbnNwZWN0XG4gIGFyci50b0FycmF5QnVmZmVyID0gQlAudG9BcnJheUJ1ZmZlclxuXG4gIHJldHVybiBhcnJcbn1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtel0vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlpc2ggKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8XG4gICAgICBzdWJqZWN0ICYmIHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mIHN1YmplY3QubGVuZ3RoID09PSAnbnVtYmVyJ1xufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGlmIChiIDw9IDB4N0YpIHtcbiAgICAgIGJ5dGVBcnJheS5wdXNoKGIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdGFydCA9IGlcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrXG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkrMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgYnl0ZUFycmF5LnB1c2gocGFyc2VJbnQoaFtqXSwgMTYpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShzdHIpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCwgdW5pdFNpemUpIHtcbiAgaWYgKHVuaXRTaXplKSBsZW5ndGggLT0gbGVuZ3RoICUgdW5pdFNpemU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpXG4gICAgICBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGRlY29kZVV0ZjhDaGFyIChzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSAvLyBVVEYgOCBpbnZhbGlkIGNoYXJcbiAgfVxufVxuIiwidmFyIGxvb2t1cCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblxuOyhmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cbiAgdmFyIEFyciA9ICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgPyBVaW50OEFycmF5XG4gICAgOiBBcnJheVxuXG5cdHZhciBQTFVTICAgPSAnKycuY2hhckNvZGVBdCgwKVxuXHR2YXIgU0xBU0ggID0gJy8nLmNoYXJDb2RlQXQoMClcblx0dmFyIE5VTUJFUiA9ICcwJy5jaGFyQ29kZUF0KDApXG5cdHZhciBMT1dFUiAgPSAnYScuY2hhckNvZGVBdCgwKVxuXHR2YXIgVVBQRVIgID0gJ0EnLmNoYXJDb2RlQXQoMClcblxuXHRmdW5jdGlvbiBkZWNvZGUgKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMClcblx0XHRpZiAoY29kZSA9PT0gUExVUylcblx0XHRcdHJldHVybiA2MiAvLyAnKydcblx0XHRpZiAoY29kZSA9PT0gU0xBU0gpXG5cdFx0XHRyZXR1cm4gNjMgLy8gJy8nXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIpXG5cdFx0XHRyZXR1cm4gLTEgLy9ubyBtYXRjaFxuXHRcdGlmIChjb2RlIDwgTlVNQkVSICsgMTApXG5cdFx0XHRyZXR1cm4gY29kZSAtIE5VTUJFUiArIDI2ICsgMjZcblx0XHRpZiAoY29kZSA8IFVQUEVSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIFVQUEVSXG5cdFx0aWYgKGNvZGUgPCBMT1dFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBMT1dFUiArIDI2XG5cdH1cblxuXHRmdW5jdGlvbiBiNjRUb0J5dGVBcnJheSAoYjY0KSB7XG5cdFx0dmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcblxuXHRcdGlmIChiNjQubGVuZ3RoICUgNCA+IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG5cdFx0fVxuXG5cdFx0Ly8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcblx0XHQvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG5cdFx0Ly8gcmVwcmVzZW50IG9uZSBieXRlXG5cdFx0Ly8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG5cdFx0Ly8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuXHRcdHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cdFx0cGxhY2VIb2xkZXJzID0gJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDIpID8gMiA6ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAxKSA/IDEgOiAwXG5cblx0XHQvLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcblx0XHRhcnIgPSBuZXcgQXJyKGI2NC5sZW5ndGggKiAzIC8gNCAtIHBsYWNlSG9sZGVycylcblxuXHRcdC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcblx0XHRsID0gcGxhY2VIb2xkZXJzID4gMCA/IGI2NC5sZW5ndGggLSA0IDogYjY0Lmxlbmd0aFxuXG5cdFx0dmFyIEwgPSAwXG5cblx0XHRmdW5jdGlvbiBwdXNoICh2KSB7XG5cdFx0XHRhcnJbTCsrXSA9IHZcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDE4KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDEyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpIDw8IDYpIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDMpKVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwMDApID4+IDE2KVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwKSA+PiA4KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA+PiA0KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDEwKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDQpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPj4gMilcblx0XHRcdHB1c2goKHRtcCA+PiA4KSAmIDB4RkYpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFyclxuXHR9XG5cblx0ZnVuY3Rpb24gdWludDhUb0Jhc2U2NCAodWludDgpIHtcblx0XHR2YXIgaSxcblx0XHRcdGV4dHJhQnl0ZXMgPSB1aW50OC5sZW5ndGggJSAzLCAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuXHRcdFx0b3V0cHV0ID0gXCJcIixcblx0XHRcdHRlbXAsIGxlbmd0aFxuXG5cdFx0ZnVuY3Rpb24gZW5jb2RlIChudW0pIHtcblx0XHRcdHJldHVybiBsb29rdXAuY2hhckF0KG51bSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShudW0gPj4gMTggJiAweDNGKSArIGVuY29kZShudW0gPj4gMTIgJiAweDNGKSArIGVuY29kZShudW0gPj4gNiAmIDB4M0YpICsgZW5jb2RlKG51bSAmIDB4M0YpXG5cdFx0fVxuXG5cdFx0Ly8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuXHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IHVpbnQ4Lmxlbmd0aCAtIGV4dHJhQnl0ZXM7IGkgPCBsZW5ndGg7IGkgKz0gMykge1xuXHRcdFx0dGVtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcblx0XHRcdG91dHB1dCArPSB0cmlwbGV0VG9CYXNlNjQodGVtcClcblx0XHR9XG5cblx0XHQvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG5cdFx0c3dpdGNoIChleHRyYUJ5dGVzKSB7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHRlbXAgPSB1aW50OFt1aW50OC5sZW5ndGggLSAxXVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPT0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRlbXAgPSAodWludDhbdWludDgubGVuZ3RoIC0gMl0gPDwgOCkgKyAodWludDhbdWludDgubGVuZ3RoIC0gMV0pXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAxMClcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA+PiA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgMikgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dFxuXHR9XG5cblx0ZXhwb3J0cy50b0J5dGVBcnJheSA9IGI2NFRvQnl0ZUFycmF5XG5cdGV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IHVpbnQ4VG9CYXNlNjRcbn0odHlwZW9mIGV4cG9ydHMgPT09ICd1bmRlZmluZWQnID8gKHRoaXMuYmFzZTY0anMgPSB7fSkgOiBleHBvcnRzKSlcbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sXG4gICAgICBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxLFxuICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcbiAgICAgIGVCaWFzID0gZU1heCA+PiAxLFxuICAgICAgbkJpdHMgPSAtNyxcbiAgICAgIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMCxcbiAgICAgIGQgPSBpc0xFID8gLTEgOiAxLFxuICAgICAgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXTtcblxuICBpICs9IGQ7XG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSk7XG4gIHMgPj49ICgtbkJpdHMpO1xuICBuQml0cyArPSBlTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KTtcblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgZSA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhcztcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpO1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbik7XG4gICAgZSA9IGUgLSBlQmlhcztcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbihidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgYyxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMCksXG4gICAgICBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSksXG4gICAgICBkID0gaXNMRSA/IDEgOiAtMSxcbiAgICAgIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDA7XG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDA7XG4gICAgZSA9IGVNYXg7XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpO1xuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpO1xuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG07XG4gIGVMZW4gKz0gbUxlbjtcbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KTtcblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjg7XG59O1xuIiwiXG4vKipcbiAqIGlzQXJyYXlcbiAqL1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogdG9TdHJpbmdcbiAqL1xuXG52YXIgc3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBXaGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYHZhbGBcbiAqIGlzIGFuIGFycmF5LlxuICpcbiAqIGV4YW1wbGU6XG4gKlxuICogICAgICAgIGlzQXJyYXkoW10pO1xuICogICAgICAgIC8vID4gdHJ1ZVxuICogICAgICAgIGlzQXJyYXkoYXJndW1lbnRzKTtcbiAqICAgICAgICAvLyA+IGZhbHNlXG4gKiAgICAgICAgaXNBcnJheSgnJyk7XG4gKiAgICAgICAgLy8gPiBmYWxzZVxuICpcbiAqIEBwYXJhbSB7bWl4ZWR9IHZhbFxuICogQHJldHVybiB7Ym9vbH1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXkgfHwgZnVuY3Rpb24gKHZhbCkge1xuICByZXR1cm4gISEgdmFsICYmICdbb2JqZWN0IEFycmF5XScgPT0gc3RyLmNhbGwodmFsKTtcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBTcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF0sIHVuaXggdmVyc2lvblxuLy8gJ3Jvb3QnIGlzIGp1c3QgYSBzbGFzaCwgb3Igbm90aGluZy5cbnZhciBzcGxpdFBhdGhSZSA9XG4gICAgL14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC87XG52YXIgc3BsaXRQYXRoID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aFJlLmV4ZWMoZmlsZW5hbWUpLnNsaWNlKDEpO1xufTtcblxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgcGF0aCA9ICcuJztcbiAgfVxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XG4gICAgcGF0aCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9KS5qb2luKCcvJykpO1xufTtcblxuXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufTtcblxuZXhwb3J0cy5zZXAgPSAnLyc7XG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcblxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgcmVzdWx0ID0gc3BsaXRQYXRoKHBhdGgpLFxuICAgICAgcm9vdCA9IHJlc3VsdFswXSxcbiAgICAgIGRpciA9IHJlc3VsdFsxXTtcblxuICBpZiAoIXJvb3QgJiYgIWRpcikge1xuICAgIC8vIE5vIGRpcm5hbWUgd2hhdHNvZXZlclxuICAgIHJldHVybiAnLic7XG4gIH1cblxuICBpZiAoZGlyKSB7XG4gICAgLy8gSXQgaGFzIGEgZGlybmFtZSwgc3RyaXAgdHJhaWxpbmcgc2xhc2hcbiAgICBkaXIgPSBkaXIuc3Vic3RyKDAsIGRpci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIHJldHVybiByb290ICsgZGlyO1xufTtcblxuXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24ocGF0aCwgZXh0KSB7XG4gIHZhciBmID0gc3BsaXRQYXRoKHBhdGgpWzJdO1xuICAvLyBUT0RPOiBtYWtlIHRoaXMgY29tcGFyaXNvbiBjYXNlLWluc2Vuc2l0aXZlIG9uIHdpbmRvd3M/XG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XG4gICAgZiA9IGYuc3Vic3RyKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIGY7XG59O1xuXG5cbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aChwYXRoKVszXTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhbk11dGF0aW9uT2JzZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIHZhciBxdWV1ZSA9IFtdO1xuXG4gICAgaWYgKGNhbk11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIGhpZGRlbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWV1ZUxpc3QgPSBxdWV1ZS5zbGljZSgpO1xuICAgICAgICAgICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHF1ZXVlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoaWRkZW5EaXYsIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuRGl2LnNldEF0dHJpYnV0ZSgneWVzJywgJ25vJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2NoYWknKTtcbiIsIi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnZhciB1c2VkID0gW11cbiAgLCBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLyohXG4gKiBDaGFpIHZlcnNpb25cbiAqL1xuXG5leHBvcnRzLnZlcnNpb24gPSAnMS4xMC4wJztcblxuLyohXG4gKiBBc3NlcnRpb24gRXJyb3JcbiAqL1xuXG5leHBvcnRzLkFzc2VydGlvbkVycm9yID0gcmVxdWlyZSgnYXNzZXJ0aW9uLWVycm9yJyk7XG5cbi8qIVxuICogVXRpbHMgZm9yIHBsdWdpbnMgKG5vdCBleHBvcnRlZClcbiAqL1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vY2hhaS91dGlscycpO1xuXG4vKipcbiAqICMgLnVzZShmdW5jdGlvbilcbiAqXG4gKiBQcm92aWRlcyBhIHdheSB0byBleHRlbmQgdGhlIGludGVybmFscyBvZiBDaGFpXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEByZXR1cm5zIHt0aGlzfSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy51c2UgPSBmdW5jdGlvbiAoZm4pIHtcbiAgaWYgKCF+dXNlZC5pbmRleE9mKGZuKSkge1xuICAgIGZuKHRoaXMsIHV0aWwpO1xuICAgIHVzZWQucHVzaChmbik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qIVxuICogQ29uZmlndXJhdGlvblxuICovXG5cbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NoYWkvY29uZmlnJyk7XG5leHBvcnRzLmNvbmZpZyA9IGNvbmZpZztcblxuLyohXG4gKiBQcmltYXJ5IGBBc3NlcnRpb25gIHByb3RvdHlwZVxuICovXG5cbnZhciBhc3NlcnRpb24gPSByZXF1aXJlKCcuL2NoYWkvYXNzZXJ0aW9uJyk7XG5leHBvcnRzLnVzZShhc3NlcnRpb24pO1xuXG4vKiFcbiAqIENvcmUgQXNzZXJ0aW9uc1xuICovXG5cbnZhciBjb3JlID0gcmVxdWlyZSgnLi9jaGFpL2NvcmUvYXNzZXJ0aW9ucycpO1xuZXhwb3J0cy51c2UoY29yZSk7XG5cbi8qIVxuICogRXhwZWN0IGludGVyZmFjZVxuICovXG5cbnZhciBleHBlY3QgPSByZXF1aXJlKCcuL2NoYWkvaW50ZXJmYWNlL2V4cGVjdCcpO1xuZXhwb3J0cy51c2UoZXhwZWN0KTtcblxuLyohXG4gKiBTaG91bGQgaW50ZXJmYWNlXG4gKi9cblxudmFyIHNob3VsZCA9IHJlcXVpcmUoJy4vY2hhaS9pbnRlcmZhY2Uvc2hvdWxkJyk7XG5leHBvcnRzLnVzZShzaG91bGQpO1xuXG4vKiFcbiAqIEFzc2VydCBpbnRlcmZhY2VcbiAqL1xuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnLi9jaGFpL2ludGVyZmFjZS9hc3NlcnQnKTtcbmV4cG9ydHMudXNlKGFzc2VydCk7XG4iLCIvKiFcbiAqIGNoYWlcbiAqIGh0dHA6Ly9jaGFpanMuY29tXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG52YXIgTk9PUCA9IGZ1bmN0aW9uKCkgeyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfY2hhaSwgdXRpbCkge1xuICAvKiFcbiAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAgICovXG5cbiAgdmFyIEFzc2VydGlvbkVycm9yID0gX2NoYWkuQXNzZXJ0aW9uRXJyb3JcbiAgICAsIGZsYWcgPSB1dGlsLmZsYWc7XG5cbiAgLyohXG4gICAqIE1vZHVsZSBleHBvcnQuXG4gICAqL1xuXG4gIF9jaGFpLkFzc2VydGlvbiA9IEFzc2VydGlvbjtcblxuICAvKiFcbiAgICogQXNzZXJ0aW9uIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIENyZWF0ZXMgb2JqZWN0IGZvciBjaGFpbmluZy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEFzc2VydGlvbiAob2JqLCBtc2csIHN0YWNrKSB7XG4gICAgZmxhZyh0aGlzLCAnc3NmaScsIHN0YWNrIHx8IGFyZ3VtZW50cy5jYWxsZWUpO1xuICAgIGZsYWcodGhpcywgJ29iamVjdCcsIG9iaik7XG4gICAgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXNzZXJ0aW9uLCAnaW5jbHVkZVN0YWNrJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Fzc2VydGlvbi5pbmNsdWRlU3RhY2sgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLmluY2x1ZGVTdGFjayBpbnN0ZWFkLicpO1xuICAgICAgcmV0dXJuIGNvbmZpZy5pbmNsdWRlU3RhY2s7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Fzc2VydGlvbi5pbmNsdWRlU3RhY2sgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLmluY2x1ZGVTdGFjayBpbnN0ZWFkLicpO1xuICAgICAgY29uZmlnLmluY2x1ZGVTdGFjayA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFzc2VydGlvbiwgJ3Nob3dEaWZmJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Fzc2VydGlvbi5zaG93RGlmZiBpcyBkZXByZWNhdGVkLCB1c2UgY2hhaS5jb25maWcuc2hvd0RpZmYgaW5zdGVhZC4nKTtcbiAgICAgIHJldHVybiBjb25maWcuc2hvd0RpZmY7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Fzc2VydGlvbi5zaG93RGlmZiBpcyBkZXByZWNhdGVkLCB1c2UgY2hhaS5jb25maWcuc2hvd0RpZmYgaW5zdGVhZC4nKTtcbiAgICAgIGNvbmZpZy5zaG93RGlmZiA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5ID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgdXRpbC5hZGRQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4pO1xuICB9O1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgICB1dGlsLmFkZE1ldGhvZCh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4pO1xuICB9O1xuXG4gIEFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QgPSBmdW5jdGlvbiAobmFtZSwgZm4sIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgICB1dGlsLmFkZENoYWluYWJsZU1ldGhvZCh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4sIGNoYWluaW5nQmVoYXZpb3IpO1xuICB9O1xuXG4gIEFzc2VydGlvbi5hZGRDaGFpbmFibGVOb29wID0gZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICB1dGlsLmFkZENoYWluYWJsZU1ldGhvZCh0aGlzLnByb3RvdHlwZSwgbmFtZSwgTk9PUCwgZm4pO1xuICB9O1xuXG4gIEFzc2VydGlvbi5vdmVyd3JpdGVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIHV0aWwub3ZlcndyaXRlUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfTtcblxuICBBc3NlcnRpb24ub3ZlcndyaXRlTWV0aG9kID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgdXRpbC5vdmVyd3JpdGVNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfTtcblxuICBBc3NlcnRpb24ub3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kID0gZnVuY3Rpb24gKG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKSB7XG4gICAgdXRpbC5vdmVyd3JpdGVDaGFpbmFibGVNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKTtcbiAgfTtcblxuICAvKiFcbiAgICogIyMjIC5hc3NlcnQoZXhwcmVzc2lvbiwgbWVzc2FnZSwgbmVnYXRlTWVzc2FnZSwgZXhwZWN0ZWQsIGFjdHVhbClcbiAgICpcbiAgICogRXhlY3V0ZXMgYW4gZXhwcmVzc2lvbiBhbmQgY2hlY2sgZXhwZWN0YXRpb25zLiBUaHJvd3MgQXNzZXJ0aW9uRXJyb3IgZm9yIHJlcG9ydGluZyBpZiB0ZXN0IGRvZXNuJ3QgcGFzcy5cbiAgICpcbiAgICogQG5hbWUgYXNzZXJ0XG4gICAqIEBwYXJhbSB7UGhpbG9zb3BoaWNhbH0gZXhwcmVzc2lvbiB0byBiZSB0ZXN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmcgb3IgRnVuY3Rpb259IG1lc3NhZ2Ugb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiBmYWlsc1xuICAgKiBAcGFyYW0ge1N0cmluZyBvciBGdW5jdGlvbn0gbmVnYXRlZE1lc3NhZ2Ugb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIG5lZ2F0ZWRNZXNzYWdlIHRvIGRpc3BsYXkgaWYgbmVnYXRlZCBleHByZXNzaW9uIGZhaWxzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkIHZhbHVlIChyZW1lbWJlciB0byBjaGVjayBmb3IgbmVnYXRpb24pXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGFjdHVhbCAob3B0aW9uYWwpIHdpbGwgZGVmYXVsdCB0byBgdGhpcy5vYmpgXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBBc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCA9IGZ1bmN0aW9uIChleHByLCBtc2csIG5lZ2F0ZU1zZywgZXhwZWN0ZWQsIF9hY3R1YWwsIHNob3dEaWZmKSB7XG4gICAgdmFyIG9rID0gdXRpbC50ZXN0KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHRydWUgIT09IHNob3dEaWZmKSBzaG93RGlmZiA9IGZhbHNlO1xuICAgIGlmICh0cnVlICE9PSBjb25maWcuc2hvd0RpZmYpIHNob3dEaWZmID0gZmFsc2U7XG5cbiAgICBpZiAoIW9rKSB7XG4gICAgICB2YXIgbXNnID0gdXRpbC5nZXRNZXNzYWdlKHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgLCBhY3R1YWwgPSB1dGlsLmdldEFjdHVhbCh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG1zZywge1xuICAgICAgICAgIGFjdHVhbDogYWN0dWFsXG4gICAgICAgICwgZXhwZWN0ZWQ6IGV4cGVjdGVkXG4gICAgICAgICwgc2hvd0RpZmY6IHNob3dEaWZmXG4gICAgICB9LCAoY29uZmlnLmluY2x1ZGVTdGFjaykgPyB0aGlzLmFzc2VydCA6IGZsYWcodGhpcywgJ3NzZmknKSk7XG4gICAgfVxuICB9O1xuXG4gIC8qIVxuICAgKiAjIyMgLl9vYmpcbiAgICpcbiAgICogUXVpY2sgcmVmZXJlbmNlIHRvIHN0b3JlZCBgYWN0dWFsYCB2YWx1ZSBmb3IgcGx1Z2luIGRldmVsb3BlcnMuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXNzZXJ0aW9uLnByb3RvdHlwZSwgJ19vYmonLFxuICAgIHsgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICAgIH1cbiAgICAsIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnLCB2YWwpO1xuICAgICAgfVxuICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvKipcbiAgICogIyMjIGNvbmZpZy5pbmNsdWRlU3RhY2tcbiAgICpcbiAgICogVXNlciBjb25maWd1cmFibGUgcHJvcGVydHksIGluZmx1ZW5jZXMgd2hldGhlciBzdGFjayB0cmFjZVxuICAgKiBpcyBpbmNsdWRlZCBpbiBBc3NlcnRpb24gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdCBvZiBmYWxzZVxuICAgKiBzdXBwcmVzc2VzIHN0YWNrIHRyYWNlIGluIHRoZSBlcnJvciBtZXNzYWdlLlxuICAgKlxuICAgKiAgICAgY2hhaS5jb25maWcuaW5jbHVkZVN0YWNrID0gdHJ1ZTsgIC8vIGVuYWJsZSBzdGFjayBvbiBlcnJvclxuICAgKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gICBpbmNsdWRlU3RhY2s6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLnNob3dEaWZmXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBpbmZsdWVuY2VzIHdoZXRoZXIgb3Igbm90XG4gICAqIHRoZSBgc2hvd0RpZmZgIGZsYWcgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSB0aHJvd25cbiAgICogQXNzZXJ0aW9uRXJyb3JzLiBgZmFsc2VgIHdpbGwgYWx3YXlzIGJlIGBmYWxzZWA7IGB0cnVlYFxuICAgKiB3aWxsIGJlIHRydWUgd2hlbiB0aGUgYXNzZXJ0aW9uIGhhcyByZXF1ZXN0ZWQgYSBkaWZmXG4gICAqIGJlIHNob3duLlxuICAgKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHNob3dEaWZmOiB0cnVlLFxuXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLnRydW5jYXRlVGhyZXNob2xkXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBzZXRzIGxlbmd0aCB0aHJlc2hvbGQgZm9yIGFjdHVhbCBhbmRcbiAgICogZXhwZWN0ZWQgdmFsdWVzIGluIGFzc2VydGlvbiBlcnJvcnMuIElmIHRoaXMgdGhyZXNob2xkIGlzIGV4Y2VlZGVkLFxuICAgKiB0aGUgdmFsdWUgaXMgdHJ1bmNhdGVkLlxuICAgKlxuICAgKiBTZXQgaXQgdG8gemVybyBpZiB5b3Ugd2FudCB0byBkaXNhYmxlIHRydW5jYXRpbmcgYWx0b2dldGhlci5cbiAgICpcbiAgICogICAgIGNoYWkuY29uZmlnLnRydW5jYXRlVGhyZXNob2xkID0gMDsgIC8vIGRpc2FibGUgdHJ1bmNhdGluZ1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdHJ1bmNhdGVUaHJlc2hvbGQ6IDQwXG5cbn07XG4iLCIvKiFcbiAqIGNoYWlcbiAqIGh0dHA6Ly9jaGFpanMuY29tXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY2hhaSwgXykge1xuICB2YXIgQXNzZXJ0aW9uID0gY2hhaS5Bc3NlcnRpb25cbiAgICAsIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuICAgICwgZmxhZyA9IF8uZmxhZztcblxuICAvKipcbiAgICogIyMjIExhbmd1YWdlIENoYWluc1xuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGFyZSBwcm92aWRlZCBhcyBjaGFpbmFibGUgZ2V0dGVycyB0b1xuICAgKiBpbXByb3ZlIHRoZSByZWFkYWJpbGl0eSBvZiB5b3VyIGFzc2VydGlvbnMuIFRoZXlcbiAgICogZG8gbm90IHByb3ZpZGUgdGVzdGluZyBjYXBhYmlsaXRpZXMgdW5sZXNzIHRoZXlcbiAgICogaGF2ZSBiZWVuIG92ZXJ3cml0dGVuIGJ5IGEgcGx1Z2luLlxuICAgKlxuICAgKiAqKkNoYWlucyoqXG4gICAqXG4gICAqIC0gdG9cbiAgICogLSBiZVxuICAgKiAtIGJlZW5cbiAgICogLSBpc1xuICAgKiAtIHRoYXRcbiAgICogLSBhbmRcbiAgICogLSBoYXNcbiAgICogLSBoYXZlXG4gICAqIC0gd2l0aFxuICAgKiAtIGF0XG4gICAqIC0gb2ZcbiAgICogLSBzYW1lXG4gICAqXG4gICAqIEBuYW1lIGxhbmd1YWdlIGNoYWluc1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBbICd0bycsICdiZScsICdiZWVuJ1xuICAsICdpcycsICdhbmQnLCAnaGFzJywgJ2hhdmUnXG4gICwgJ3dpdGgnLCAndGhhdCcsICdhdCdcbiAgLCAnb2YnLCAnc2FtZScgXS5mb3JFYWNoKGZ1bmN0aW9uIChjaGFpbikge1xuICAgIEFzc2VydGlvbi5hZGRQcm9wZXJ0eShjaGFpbiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFxuICAgKlxuICAgKiBOZWdhdGVzIGFueSBvZiBhc3NlcnRpb25zIGZvbGxvd2luZyBpbiB0aGUgY2hhaW4uXG4gICAqXG4gICAqICAgICBleHBlY3QoZm9vKS50by5ub3QuZXF1YWwoJ2JhcicpO1xuICAgKiAgICAgZXhwZWN0KGdvb2RGbikudG8ubm90LnRocm93KEVycm9yKTtcbiAgICogICAgIGV4cGVjdCh7IGZvbzogJ2JheicgfSkudG8uaGF2ZS5wcm9wZXJ0eSgnZm9vJylcbiAgICogICAgICAgLmFuZC5ub3QuZXF1YWwoJ2JhcicpO1xuICAgKlxuICAgKiBAbmFtZSBub3RcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdub3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgZmxhZyh0aGlzLCAnbmVnYXRlJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBcbiAgICpcbiAgICogU2V0cyB0aGUgYGRlZXBgIGZsYWcsIGxhdGVyIHVzZWQgYnkgdGhlIGBlcXVhbGAgYW5kXG4gICAqIGBwcm9wZXJ0eWAgYXNzZXJ0aW9ucy5cbiAgICpcbiAgICogICAgIGV4cGVjdChmb28pLnRvLmRlZXAuZXF1YWwoeyBiYXI6ICdiYXonIH0pO1xuICAgKiAgICAgZXhwZWN0KHsgZm9vOiB7IGJhcjogeyBiYXo6ICdxdXV4JyB9IH0gfSlcbiAgICogICAgICAgLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eSgnZm9vLmJhci5iYXonLCAncXV1eCcpO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnZGVlcCcsIGZ1bmN0aW9uICgpIHtcbiAgICBmbGFnKHRoaXMsICdkZWVwJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmEodHlwZSlcbiAgICpcbiAgICogVGhlIGBhYCBhbmQgYGFuYCBhc3NlcnRpb25zIGFyZSBhbGlhc2VzIHRoYXQgY2FuIGJlXG4gICAqIHVzZWQgZWl0aGVyIGFzIGxhbmd1YWdlIGNoYWlucyBvciB0byBhc3NlcnQgYSB2YWx1ZSdzXG4gICAqIHR5cGUuXG4gICAqXG4gICAqICAgICAvLyB0eXBlb2ZcbiAgICogICAgIGV4cGVjdCgndGVzdCcpLnRvLmJlLmEoJ3N0cmluZycpO1xuICAgKiAgICAgZXhwZWN0KHsgZm9vOiAnYmFyJyB9KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAqICAgICBleHBlY3QobnVsbCkudG8uYmUuYSgnbnVsbCcpO1xuICAgKiAgICAgZXhwZWN0KHVuZGVmaW5lZCkudG8uYmUuYW4oJ3VuZGVmaW5lZCcpO1xuICAgKlxuICAgKiAgICAgLy8gbGFuZ3VhZ2UgY2hhaW5cbiAgICogICAgIGV4cGVjdChmb28pLnRvLmJlLmFuLmluc3RhbmNlb2YoRm9vKTtcbiAgICpcbiAgICogQG5hbWUgYVxuICAgKiBAYWxpYXMgYW5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhbiAodHlwZSwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgYXJ0aWNsZSA9IH5bICdhJywgJ2UnLCAnaScsICdvJywgJ3UnIF0uaW5kZXhPZih0eXBlLmNoYXJBdCgwKSkgPyAnYW4gJyA6ICdhICc7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgdHlwZSA9PT0gXy50eXBlKG9iailcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgJyArIGFydGljbGUgKyB0eXBlXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSAnICsgYXJ0aWNsZSArIHR5cGVcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnYW4nLCBhbik7XG4gIEFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoJ2EnLCBhbik7XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jbHVkZSh2YWx1ZSlcbiAgICpcbiAgICogVGhlIGBpbmNsdWRlYCBhbmQgYGNvbnRhaW5gIGFzc2VydGlvbnMgY2FuIGJlIHVzZWQgYXMgZWl0aGVyIHByb3BlcnR5XG4gICAqIGJhc2VkIGxhbmd1YWdlIGNoYWlucyBvciBhcyBtZXRob2RzIHRvIGFzc2VydCB0aGUgaW5jbHVzaW9uIG9mIGFuIG9iamVjdFxuICAgKiBpbiBhbiBhcnJheSBvciBhIHN1YnN0cmluZyBpbiBhIHN0cmluZy4gV2hlbiB1c2VkIGFzIGxhbmd1YWdlIGNoYWlucyxcbiAgICogdGhleSB0b2dnbGUgdGhlIGBjb250YWluYCBmbGFnIGZvciB0aGUgYGtleXNgIGFzc2VydGlvbi5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwyLDNdKS50by5pbmNsdWRlKDIpO1xuICAgKiAgICAgZXhwZWN0KCdmb29iYXInKS50by5jb250YWluKCdmb28nKTtcbiAgICogICAgIGV4cGVjdCh7IGZvbzogJ2JhcicsIGhlbGxvOiAndW5pdmVyc2UnIH0pLnRvLmluY2x1ZGUua2V5cygnZm9vJyk7XG4gICAqXG4gICAqIEBuYW1lIGluY2x1ZGVcbiAgICogQGFsaWFzIGNvbnRhaW5cbiAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfE51bWJlcn0gb2JqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IgKCkge1xuICAgIGZsYWcodGhpcywgJ2NvbnRhaW5zJywgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbmNsdWRlICh2YWwsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICB2YXIgZXhwZWN0ZWQgPSBmYWxzZTtcbiAgICBpZiAoXy50eXBlKG9iaikgPT09ICdhcnJheScgJiYgXy50eXBlKHZhbCkgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgICAgICBpZiAoXy5lcWwob2JqW2ldLCB2YWwpKSB7XG4gICAgICAgICAgZXhwZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChfLnR5cGUodmFsKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICghZmxhZyh0aGlzLCAnbmVnYXRlJykpIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiB2YWwpIG5ldyBBc3NlcnRpb24ob2JqKS5wcm9wZXJ0eShrLCB2YWxba10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgc3Vic2V0ID0ge31cbiAgICAgIGZvciAodmFyIGsgaW4gdmFsKSBzdWJzZXRba10gPSBvYmpba11cbiAgICAgIGV4cGVjdGVkID0gXy5lcWwoc3Vic2V0LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBlY3RlZCA9IG9iaiAmJiB+b2JqLmluZGV4T2YodmFsKVxuICAgIH1cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgZXhwZWN0ZWRcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaW5jbHVkZSAnICsgXy5pbnNwZWN0KHZhbClcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGluY2x1ZGUgJyArIF8uaW5zcGVjdCh2YWwpKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoJ2luY2x1ZGUnLCBpbmNsdWRlLCBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvcik7XG4gIEFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoJ2NvbnRhaW4nLCBpbmNsdWRlLCBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvcik7XG5cbiAgLyoqXG4gICAqICMjIyAub2tcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgdHJ1dGh5LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdldmVydGhpbmcnKS50by5iZS5vaztcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5vaztcbiAgICogICAgIGV4cGVjdChmYWxzZSkudG8ubm90LmJlLm9rO1xuICAgKiAgICAgZXhwZWN0KHVuZGVmaW5lZCkudG8ubm90LmJlLm9rO1xuICAgKiAgICAgZXhwZWN0KG51bGwpLnRvLm5vdC5iZS5vaztcbiAgICpcbiAgICogQ2FuIGFsc28gYmUgdXNlZCBhcyBhIGZ1bmN0aW9uLCB3aGljaCBwcmV2ZW50cyBzb21lIGxpbnRlciBlcnJvcnMuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2V2ZXJ0aGluZycpLnRvLmJlLm9rKCk7XG4gICAqICAgICBcbiAgICogQG5hbWUgb2tcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU5vb3AoJ29rJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB0cnV0aHknXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGZhbHN5Jyk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLnRydWVcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYHRydWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHRydWUpLnRvLmJlLnRydWU7XG4gICAqICAgICBleHBlY3QoMSkudG8ubm90LmJlLnRydWU7XG4gICAqXG4gICAqIENhbiBhbHNvIGJlIHVzZWQgYXMgYSBmdW5jdGlvbiwgd2hpY2ggcHJldmVudHMgc29tZSBsaW50ZXIgZXJyb3JzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHRydWUpLnRvLmJlLnRydWUoKTtcbiAgICpcbiAgICogQG5hbWUgdHJ1ZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTm9vcCgndHJ1ZScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgdHJ1ZSA9PT0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgdHJ1ZSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgZmFsc2UnXG4gICAgICAsIHRoaXMubmVnYXRlID8gZmFsc2UgOiB0cnVlXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuZmFsc2VcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYGZhbHNlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdChmYWxzZSkudG8uYmUuZmFsc2U7XG4gICAqICAgICBleHBlY3QoMCkudG8ubm90LmJlLmZhbHNlO1xuICAgKlxuICAgKiBDYW4gYWxzbyBiZSB1c2VkIGFzIGEgZnVuY3Rpb24sIHdoaWNoIHByZXZlbnRzIHNvbWUgbGludGVyIGVycm9ycy5cbiAgICpcbiAgICogICAgIGV4cGVjdChmYWxzZSkudG8uYmUuZmFsc2UoKTtcbiAgICpcbiAgICogQG5hbWUgZmFsc2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU5vb3AoJ2ZhbHNlJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBmYWxzZSA9PT0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgZmFsc2UnXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIHRydWUnXG4gICAgICAsIHRoaXMubmVnYXRlID8gdHJ1ZSA6IGZhbHNlXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAubnVsbFxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBgbnVsbGAuXG4gICAqXG4gICAqICAgICBleHBlY3QobnVsbCkudG8uYmUubnVsbDtcbiAgICogICAgIGV4cGVjdCh1bmRlZmluZWQpLm5vdC50by5iZS5udWxsO1xuICAgKlxuICAgKiBDYW4gYWxzbyBiZSB1c2VkIGFzIGEgZnVuY3Rpb24sIHdoaWNoIHByZXZlbnRzIHNvbWUgbGludGVyIGVycm9ycy5cbiAgICpcbiAgICogICAgIGV4cGVjdChudWxsKS50by5iZS5udWxsKCk7XG4gICAqXG4gICAqIEBuYW1lIG51bGxcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU5vb3AoJ251bGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIG51bGwgPT09IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIG51bGwnXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBudWxsJ1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLnVuZGVmaW5lZFxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh1bmRlZmluZWQpLnRvLmJlLnVuZGVmaW5lZDtcbiAgICogICAgIGV4cGVjdChudWxsKS50by5ub3QuYmUudW5kZWZpbmVkO1xuICAgKlxuICAgKiBDYW4gYWxzbyBiZSB1c2VkIGFzIGEgZnVuY3Rpb24sIHdoaWNoIHByZXZlbnRzIHNvbWUgbGludGVyIGVycm9ycy5cbiAgICpcbiAgICogICAgIGV4cGVjdCh1bmRlZmluZWQpLnRvLmJlLnVuZGVmaW5lZCgpO1xuICAgKlxuICAgKiBAbmFtZSB1bmRlZmluZWRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU5vb3AoJ3VuZGVmaW5lZCcsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgdW5kZWZpbmVkID09PSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB1bmRlZmluZWQnXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSB1bmRlZmluZWQnXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuZXhpc3RcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgbmVpdGhlciBgbnVsbGAgbm9yIGB1bmRlZmluZWRgLlxuICAgKlxuICAgKiAgICAgdmFyIGZvbyA9ICdoaSdcbiAgICogICAgICAgLCBiYXIgPSBudWxsXG4gICAqICAgICAgICwgYmF6O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGZvbykudG8uZXhpc3Q7XG4gICAqICAgICBleHBlY3QoYmFyKS50by5ub3QuZXhpc3Q7XG4gICAqICAgICBleHBlY3QoYmF6KS50by5ub3QuZXhpc3Q7XG4gICAqXG4gICAqIENhbiBhbHNvIGJlIHVzZWQgYXMgYSBmdW5jdGlvbiwgd2hpY2ggcHJldmVudHMgc29tZSBsaW50ZXIgZXJyb3JzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZvbykudG8uZXhpc3QoKTtcbiAgICpcbiAgICogQG5hbWUgZXhpc3RcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU5vb3AoJ2V4aXN0JywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBudWxsICE9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGV4aXN0J1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXhpc3QnXG4gICAgKTtcbiAgfSk7XG5cblxuICAvKipcbiAgICogIyMjIC5lbXB0eVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCdzIGxlbmd0aCBpcyBgMGAuIEZvciBhcnJheXMsIGl0IGNoZWNrc1xuICAgKiB0aGUgYGxlbmd0aGAgcHJvcGVydHkuIEZvciBvYmplY3RzLCBpdCBnZXRzIHRoZSBjb3VudCBvZlxuICAgKiBlbnVtZXJhYmxlIGtleXMuXG4gICAqXG4gICAqICAgICBleHBlY3QoW10pLnRvLmJlLmVtcHR5O1xuICAgKiAgICAgZXhwZWN0KCcnKS50by5iZS5lbXB0eTtcbiAgICogICAgIGV4cGVjdCh7fSkudG8uYmUuZW1wdHk7XG4gICAqXG4gICAqIENhbiBhbHNvIGJlIHVzZWQgYXMgYSBmdW5jdGlvbiwgd2hpY2ggcHJldmVudHMgc29tZSBsaW50ZXIgZXJyb3JzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFtdKS50by5iZS5lbXB0eSgpO1xuICAgKlxuICAgKiBAbmFtZSBlbXB0eVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTm9vcCgnZW1wdHknLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGV4cGVjdGVkID0gb2JqO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSB8fCAnc3RyaW5nJyA9PT0gdHlwZW9mIG9iamVjdCkge1xuICAgICAgZXhwZWN0ZWQgPSBvYmoubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGV4cGVjdGVkID0gT2JqZWN0LmtleXMob2JqKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICFleHBlY3RlZFxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBlbXB0eSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIGVtcHR5J1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmFyZ3VtZW50c1xuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhbiBhcmd1bWVudHMgb2JqZWN0LlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gdGVzdCAoKSB7XG4gICAqICAgICAgIGV4cGVjdChhcmd1bWVudHMpLnRvLmJlLmFyZ3VtZW50cztcbiAgICogICAgIH1cbiAgICpcbiAgICogQ2FuIGFsc28gYmUgdXNlZCBhcyBhIGZ1bmN0aW9uLCB3aGljaCBwcmV2ZW50cyBzb21lIGxpbnRlciBlcnJvcnMuXG4gICAqXG4gICAqICAgICBmdW5jdGlvbiB0ZXN0ICgpIHtcbiAgICogICAgICAgZXhwZWN0KGFyZ3VtZW50cykudG8uYmUuYXJndW1lbnRzKCk7XG4gICAqICAgICB9XG4gICAqXG4gICAqIEBuYW1lIGFyZ3VtZW50c1xuICAgKiBAYWxpYXMgQXJndW1lbnRzXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNoZWNrQXJndW1lbnRzICgpIHtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAnW29iamVjdCBBcmd1bWVudHNdJyA9PT0gdHlwZVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhcmd1bWVudHMgYnV0IGdvdCAnICsgdHlwZVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgYXJndW1lbnRzJ1xuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTm9vcCgnYXJndW1lbnRzJywgY2hlY2tBcmd1bWVudHMpO1xuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTm9vcCgnQXJndW1lbnRzJywgY2hlY2tBcmd1bWVudHMpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmVxdWFsKHZhbHVlKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBzdHJpY3RseSBlcXVhbCAoYD09PWApIHRvIGB2YWx1ZWAuXG4gICAqIEFsdGVybmF0ZWx5LCBpZiB0aGUgYGRlZXBgIGZsYWcgaXMgc2V0LCBhc3NlcnRzIHRoYXRcbiAgICogdGhlIHRhcmdldCBpcyBkZWVwbHkgZXF1YWwgdG8gYHZhbHVlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnaGVsbG8nKS50by5lcXVhbCgnaGVsbG8nKTtcbiAgICogICAgIGV4cGVjdCg0MikudG8uZXF1YWwoNDIpO1xuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5lcXVhbCh0cnVlKTtcbiAgICogICAgIGV4cGVjdCh7IGZvbzogJ2JhcicgfSkudG8ubm90LmVxdWFsKHsgZm9vOiAnYmFyJyB9KTtcbiAgICogICAgIGV4cGVjdCh7IGZvbzogJ2JhcicgfSkudG8uZGVlcC5lcXVhbCh7IGZvbzogJ2JhcicgfSk7XG4gICAqXG4gICAqIEBuYW1lIGVxdWFsXG4gICAqIEBhbGlhcyBlcXVhbHNcbiAgICogQGFsaWFzIGVxXG4gICAqIEBhbGlhcyBkZWVwLmVxdWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0RXF1YWwgKHZhbCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuICAgIGlmIChmbGFnKHRoaXMsICdkZWVwJykpIHtcbiAgICAgIHJldHVybiB0aGlzLmVxbCh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICB2YWwgPT09IG9ialxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGVxdWFsICN7ZXhwfSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3tleHB9J1xuICAgICAgICAsIHZhbFxuICAgICAgICAsIHRoaXMuX29ialxuICAgICAgICAsIHRydWVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXF1YWwnLCBhc3NlcnRFcXVhbCk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2VxdWFscycsIGFzc2VydEVxdWFsKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXEnLCBhc3NlcnRFcXVhbCk7XG5cbiAgLyoqXG4gICAqICMjIyAuZXFsKHZhbHVlKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBkZWVwbHkgZXF1YWwgdG8gYHZhbHVlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7IGZvbzogJ2JhcicgfSkudG8uZXFsKHsgZm9vOiAnYmFyJyB9KTtcbiAgICogICAgIGV4cGVjdChbIDEsIDIsIDMgXSkudG8uZXFsKFsgMSwgMiwgMyBdKTtcbiAgICpcbiAgICogQG5hbWUgZXFsXG4gICAqIEBhbGlhcyBlcWxzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0RXFsKG9iaiwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIF8uZXFsKG9iaiwgZmxhZyh0aGlzLCAnb2JqZWN0JykpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGRlZXBseSBlcXVhbCAje2V4cH0nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBkZWVwbHkgZXF1YWwgI3tleHB9J1xuICAgICAgLCBvYmpcbiAgICAgICwgdGhpcy5fb2JqXG4gICAgICAsIHRydWVcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXFsJywgYXNzZXJ0RXFsKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXFscycsIGFzc2VydEVxbCk7XG5cbiAgLyoqXG4gICAqICMjIyAuYWJvdmUodmFsdWUpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGdyZWF0ZXIgdGhhbiBgdmFsdWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEwKS50by5iZS5hYm92ZSg1KTtcbiAgICpcbiAgICogQ2FuIGFsc28gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGBsZW5ndGhgIHRvXG4gICAqIGFzc2VydCBhIG1pbmltdW0gbGVuZ3RoLiBUaGUgYmVuZWZpdCBiZWluZyBhXG4gICAqIG1vcmUgaW5mb3JtYXRpdmUgZXJyb3IgbWVzc2FnZSB0aGFuIGlmIHRoZSBsZW5ndGhcbiAgICogd2FzIHN1cHBsaWVkIGRpcmVjdGx5LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aC5hYm92ZSgyKTtcbiAgICogICAgIGV4cGVjdChbIDEsIDIsIDMgXSkudG8uaGF2ZS5sZW5ndGguYWJvdmUoMik7XG4gICAqXG4gICAqIEBuYW1lIGFib3ZlXG4gICAqIEBhbGlhcyBndFxuICAgKiBAYWxpYXMgZ3JlYXRlclRoYW5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0QWJvdmUgKG4sIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICBpZiAoZmxhZyh0aGlzLCAnZG9MZW5ndGgnKSkge1xuICAgICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8uaGF2ZS5wcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gICAgICB2YXIgbGVuID0gb2JqLmxlbmd0aDtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGxlbiA+IG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgbGVuZ3RoIGFib3ZlICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBhIGxlbmd0aCBhYm92ZSAje2V4cH0nXG4gICAgICAgICwgblxuICAgICAgICAsIGxlblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgb2JqID4gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFib3ZlICcgKyBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYXQgbW9zdCAnICsgblxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdhYm92ZScsIGFzc2VydEFib3ZlKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZ3QnLCBhc3NlcnRBYm92ZSk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2dyZWF0ZXJUaGFuJywgYXNzZXJ0QWJvdmUpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmxlYXN0KHZhbHVlKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gYHZhbHVlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxMCkudG8uYmUuYXQubGVhc3QoMTApO1xuICAgKlxuICAgKiBDYW4gYWxzbyBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYGxlbmd0aGAgdG9cbiAgICogYXNzZXJ0IGEgbWluaW11bSBsZW5ndGguIFRoZSBiZW5lZml0IGJlaW5nIGFcbiAgICogbW9yZSBpbmZvcm1hdGl2ZSBlcnJvciBtZXNzYWdlIHRoYW4gaWYgdGhlIGxlbmd0aFxuICAgKiB3YXMgc3VwcGxpZWQgZGlyZWN0bHkuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoLm9mLmF0LmxlYXN0KDIpO1xuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgMyBdKS50by5oYXZlLmxlbmd0aC5vZi5hdC5sZWFzdCgzKTtcbiAgICpcbiAgICogQG5hbWUgbGVhc3RcbiAgICogQGFsaWFzIGd0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRMZWFzdCAobiwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuICAgIGlmIChmbGFnKHRoaXMsICdkb0xlbmd0aCcpKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICAgIHZhciBsZW4gPSBvYmoubGVuZ3RoO1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgbGVuID49IG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgbGVuZ3RoIGF0IGxlYXN0ICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgbGVuZ3RoIGJlbG93ICN7ZXhwfSdcbiAgICAgICAgLCBuXG4gICAgICAgICwgbGVuXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBvYmogPj0gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGF0IGxlYXN0ICcgKyBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYmVsb3cgJyArIG5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbGVhc3QnLCBhc3NlcnRMZWFzdCk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2d0ZScsIGFzc2VydExlYXN0KTtcblxuICAvKipcbiAgICogIyMjIC5iZWxvdyh2YWx1ZSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgbGVzcyB0aGFuIGB2YWx1ZWAuXG4gICAqXG4gICAqICAgICBleHBlY3QoNSkudG8uYmUuYmVsb3coMTApO1xuICAgKlxuICAgKiBDYW4gYWxzbyBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYGxlbmd0aGAgdG9cbiAgICogYXNzZXJ0IGEgbWF4aW11bSBsZW5ndGguIFRoZSBiZW5lZml0IGJlaW5nIGFcbiAgICogbW9yZSBpbmZvcm1hdGl2ZSBlcnJvciBtZXNzYWdlIHRoYW4gaWYgdGhlIGxlbmd0aFxuICAgKiB3YXMgc3VwcGxpZWQgZGlyZWN0bHkuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoLmJlbG93KDQpO1xuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgMyBdKS50by5oYXZlLmxlbmd0aC5iZWxvdyg0KTtcbiAgICpcbiAgICogQG5hbWUgYmVsb3dcbiAgICogQGFsaWFzIGx0XG4gICAqIEBhbGlhcyBsZXNzVGhhblxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRCZWxvdyAobiwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuICAgIGlmIChmbGFnKHRoaXMsICdkb0xlbmd0aCcpKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICAgIHZhciBsZW4gPSBvYmoubGVuZ3RoO1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgbGVuIDwgblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBsZW5ndGggYmVsb3cgI3tleHB9IGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgbGVuZ3RoIGJlbG93ICN7ZXhwfSdcbiAgICAgICAgLCBuXG4gICAgICAgICwgbGVuXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBvYmogPCBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYmVsb3cgJyArIG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBsZWFzdCAnICsgblxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdiZWxvdycsIGFzc2VydEJlbG93KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbHQnLCBhc3NlcnRCZWxvdyk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2xlc3NUaGFuJywgYXNzZXJ0QmVsb3cpO1xuXG4gIC8qKlxuICAgKiAjIyMgLm1vc3QodmFsdWUpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgdmFsdWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDUpLnRvLmJlLmF0Lm1vc3QoNSk7XG4gICAqXG4gICAqIENhbiBhbHNvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgbGVuZ3RoYCB0b1xuICAgKiBhc3NlcnQgYSBtYXhpbXVtIGxlbmd0aC4gVGhlIGJlbmVmaXQgYmVpbmcgYVxuICAgKiBtb3JlIGluZm9ybWF0aXZlIGVycm9yIG1lc3NhZ2UgdGhhbiBpZiB0aGUgbGVuZ3RoXG4gICAqIHdhcyBzdXBwbGllZCBkaXJlY3RseS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGgub2YuYXQubW9zdCg0KTtcbiAgICogICAgIGV4cGVjdChbIDEsIDIsIDMgXSkudG8uaGF2ZS5sZW5ndGgub2YuYXQubW9zdCgzKTtcbiAgICpcbiAgICogQG5hbWUgbW9zdFxuICAgKiBAYWxpYXMgbHRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydE1vc3QgKG4sIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICBpZiAoZmxhZyh0aGlzLCAnZG9MZW5ndGgnKSkge1xuICAgICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8uaGF2ZS5wcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gICAgICB2YXIgbGVuID0gb2JqLmxlbmd0aDtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGxlbiA8PSBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIGxlbmd0aCBhdCBtb3N0ICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgbGVuZ3RoIGFib3ZlICN7ZXhwfSdcbiAgICAgICAgLCBuXG4gICAgICAgICwgbGVuXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBvYmogPD0gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGF0IG1vc3QgJyArIG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhYm92ZSAnICsgblxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdtb3N0JywgYXNzZXJ0TW9zdCk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2x0ZScsIGFzc2VydE1vc3QpO1xuXG4gIC8qKlxuICAgKiAjIyMgLndpdGhpbihzdGFydCwgZmluaXNoKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyB3aXRoaW4gYSByYW5nZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCg3KS50by5iZS53aXRoaW4oNSwxMCk7XG4gICAqXG4gICAqIENhbiBhbHNvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgbGVuZ3RoYCB0b1xuICAgKiBhc3NlcnQgYSBsZW5ndGggcmFuZ2UuIFRoZSBiZW5lZml0IGJlaW5nIGFcbiAgICogbW9yZSBpbmZvcm1hdGl2ZSBlcnJvciBtZXNzYWdlIHRoYW4gaWYgdGhlIGxlbmd0aFxuICAgKiB3YXMgc3VwcGxpZWQgZGlyZWN0bHkuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoLndpdGhpbigyLDQpO1xuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgMyBdKS50by5oYXZlLmxlbmd0aC53aXRoaW4oMiw0KTtcbiAgICpcbiAgICogQG5hbWUgd2l0aGluXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCBsb3dlcmJvdW5kIGluY2x1c2l2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZmluaXNoIHVwcGVyYm91bmQgaW5jbHVzaXZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnd2l0aGluJywgZnVuY3Rpb24gKHN0YXJ0LCBmaW5pc2gsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCByYW5nZSA9IHN0YXJ0ICsgJy4uJyArIGZpbmlzaDtcbiAgICBpZiAoZmxhZyh0aGlzLCAnZG9MZW5ndGgnKSkge1xuICAgICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8uaGF2ZS5wcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gICAgICB2YXIgbGVuID0gb2JqLmxlbmd0aDtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGxlbiA+PSBzdGFydCAmJiBsZW4gPD0gZmluaXNoXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIGxlbmd0aCB3aXRoaW4gJyArIHJhbmdlXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBsZW5ndGggd2l0aGluICcgKyByYW5nZVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgb2JqID49IHN0YXJ0ICYmIG9iaiA8PSBmaW5pc2hcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB3aXRoaW4gJyArIHJhbmdlXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIHdpdGhpbiAnICsgcmFuZ2VcbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5pbnN0YW5jZW9mKGNvbnN0cnVjdG9yKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhbiBpbnN0YW5jZSBvZiBgY29uc3RydWN0b3JgLlxuICAgKlxuICAgKiAgICAgdmFyIFRlYSA9IGZ1bmN0aW9uIChuYW1lKSB7IHRoaXMubmFtZSA9IG5hbWU7IH1cbiAgICogICAgICAgLCBDaGFpID0gbmV3IFRlYSgnY2hhaScpO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KENoYWkpLnRvLmJlLmFuLmluc3RhbmNlb2YoVGVhKTtcbiAgICogICAgIGV4cGVjdChbIDEsIDIsIDMgXSkudG8uYmUuaW5zdGFuY2VvZihBcnJheSk7XG4gICAqXG4gICAqIEBuYW1lIGluc3RhbmNlb2ZcbiAgICogQHBhcmFtIHtDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYWxpYXMgaW5zdGFuY2VPZlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRJbnN0YW5jZU9mIChjb25zdHJ1Y3RvciwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG5hbWUgPSBfLmdldE5hbWUoY29uc3RydWN0b3IpO1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnKSBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFuIGluc3RhbmNlIG9mICcgKyBuYW1lXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBhbiBpbnN0YW5jZSBvZiAnICsgbmFtZVxuICAgICk7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnaW5zdGFuY2VvZicsIGFzc2VydEluc3RhbmNlT2YpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdpbnN0YW5jZU9mJywgYXNzZXJ0SW5zdGFuY2VPZik7XG5cbiAgLyoqXG4gICAqICMjIyAucHJvcGVydHkobmFtZSwgW3ZhbHVlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaGFzIGEgcHJvcGVydHkgYG5hbWVgLCBvcHRpb25hbGx5IGFzc2VydGluZyB0aGF0XG4gICAqIHRoZSB2YWx1ZSBvZiB0aGF0IHByb3BlcnR5IGlzIHN0cmljdGx5IGVxdWFsIHRvICBgdmFsdWVgLlxuICAgKiBJZiB0aGUgYGRlZXBgIGZsYWcgaXMgc2V0LCB5b3UgY2FuIHVzZSBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvciBkZWVwXG4gICAqIHJlZmVyZW5jZXMgaW50byBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAqXG4gICAqICAgICAvLyBzaW1wbGUgcmVmZXJlbmNpbmdcbiAgICogICAgIHZhciBvYmogPSB7IGZvbzogJ2JhcicgfTtcbiAgICogICAgIGV4cGVjdChvYmopLnRvLmhhdmUucHJvcGVydHkoJ2ZvbycpO1xuICAgKiAgICAgZXhwZWN0KG9iaikudG8uaGF2ZS5wcm9wZXJ0eSgnZm9vJywgJ2JhcicpO1xuICAgKlxuICAgKiAgICAgLy8gZGVlcCByZWZlcmVuY2luZ1xuICAgKiAgICAgdmFyIGRlZXBPYmogPSB7XG4gICAqICAgICAgICAgZ3JlZW46IHsgdGVhOiAnbWF0Y2hhJyB9XG4gICAqICAgICAgICwgdGVhczogWyAnY2hhaScsICdtYXRjaGEnLCB7IHRlYTogJ2tvbmFjaGEnIH0gXVxuICAgKiAgICAgfTtcblxuICAgKiAgICAgZXhwZWN0KGRlZXBPYmopLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eSgnZ3JlZW4udGVhJywgJ21hdGNoYScpO1xuICAgKiAgICAgZXhwZWN0KGRlZXBPYmopLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eSgndGVhc1sxXScsICdtYXRjaGEnKTtcbiAgICogICAgIGV4cGVjdChkZWVwT2JqKS50by5oYXZlLmRlZXAucHJvcGVydHkoJ3RlYXNbMl0udGVhJywgJ2tvbmFjaGEnKTtcbiAgICpcbiAgICogWW91IGNhbiBhbHNvIHVzZSBhbiBhcnJheSBhcyB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgYSBgZGVlcC5wcm9wZXJ0eWBcbiAgICogYXNzZXJ0aW9uLCBvciB0cmF2ZXJzZSBuZXN0ZWQgYXJyYXlzLlxuICAgKlxuICAgKiAgICAgdmFyIGFyciA9IFtcbiAgICogICAgICAgICBbICdjaGFpJywgJ21hdGNoYScsICdrb25hY2hhJyBdXG4gICAqICAgICAgICwgWyB7IHRlYTogJ2NoYWknIH1cbiAgICogICAgICAgICAsIHsgdGVhOiAnbWF0Y2hhJyB9XG4gICAqICAgICAgICAgLCB7IHRlYTogJ2tvbmFjaGEnIH0gXVxuICAgKiAgICAgXTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhcnIpLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eSgnWzBdWzFdJywgJ21hdGNoYScpO1xuICAgKiAgICAgZXhwZWN0KGFycikudG8uaGF2ZS5kZWVwLnByb3BlcnR5KCdbMV1bMl0udGVhJywgJ2tvbmFjaGEnKTtcbiAgICpcbiAgICogRnVydGhlcm1vcmUsIGBwcm9wZXJ0eWAgY2hhbmdlcyB0aGUgc3ViamVjdCBvZiB0aGUgYXNzZXJ0aW9uXG4gICAqIHRvIGJlIHRoZSB2YWx1ZSBvZiB0aGF0IHByb3BlcnR5IGZyb20gdGhlIG9yaWdpbmFsIG9iamVjdC4gVGhpc1xuICAgKiBwZXJtaXRzIGZvciBmdXJ0aGVyIGNoYWluYWJsZSBhc3NlcnRpb25zIG9uIHRoYXQgcHJvcGVydHkuXG4gICAqXG4gICAqICAgICBleHBlY3Qob2JqKS50by5oYXZlLnByb3BlcnR5KCdmb28nKVxuICAgKiAgICAgICAudGhhdC5pcy5hKCdzdHJpbmcnKTtcbiAgICogICAgIGV4cGVjdChkZWVwT2JqKS50by5oYXZlLnByb3BlcnR5KCdncmVlbicpXG4gICAqICAgICAgIC50aGF0LmlzLmFuKCdvYmplY3QnKVxuICAgKiAgICAgICAudGhhdC5kZWVwLmVxdWFscyh7IHRlYTogJ21hdGNoYScgfSk7XG4gICAqICAgICBleHBlY3QoZGVlcE9iaikudG8uaGF2ZS5wcm9wZXJ0eSgndGVhcycpXG4gICAqICAgICAgIC50aGF0LmlzLmFuKCdhcnJheScpXG4gICAqICAgICAgIC53aXRoLmRlZXAucHJvcGVydHkoJ1syXScpXG4gICAqICAgICAgICAgLnRoYXQuZGVlcC5lcXVhbHMoeyB0ZWE6ICdrb25hY2hhJyB9KTtcbiAgICpcbiAgICogQG5hbWUgcHJvcGVydHlcbiAgICogQGFsaWFzIGRlZXAucHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgKG9wdGlvbmFsKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEByZXR1cm5zIHZhbHVlIG9mIHByb3BlcnR5IGZvciBjaGFpbmluZ1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdwcm9wZXJ0eScsIGZ1bmN0aW9uIChuYW1lLCB2YWwsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBmbGFnKHRoaXMsICdkZWVwJykgPyAnZGVlcCBwcm9wZXJ0eSAnIDogJ3Byb3BlcnR5ICdcbiAgICAgICwgbmVnYXRlID0gZmxhZyh0aGlzLCAnbmVnYXRlJylcbiAgICAgICwgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgdmFsdWUgPSBmbGFnKHRoaXMsICdkZWVwJylcbiAgICAgICAgPyBfLmdldFBhdGhWYWx1ZShuYW1lLCBvYmopXG4gICAgICAgIDogb2JqW25hbWVdO1xuXG4gICAgaWYgKG5lZ2F0ZSAmJiB1bmRlZmluZWQgIT09IHZhbCkge1xuICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgbXNnID0gKG1zZyAhPSBudWxsKSA/IG1zZyArICc6ICcgOiAnJztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyArIF8uaW5zcGVjdChvYmopICsgJyBoYXMgbm8gJyArIGRlc2NyaXB0b3IgKyBfLmluc3BlY3QobmFtZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICB1bmRlZmluZWQgIT09IHZhbHVlXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhICcgKyBkZXNjcmlwdG9yICsgXy5pbnNwZWN0KG5hbWUpXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgJyArIGRlc2NyaXB0b3IgKyBfLmluc3BlY3QobmFtZSkpO1xuICAgIH1cblxuICAgIGlmICh1bmRlZmluZWQgIT09IHZhbCkge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgdmFsID09PSB2YWx1ZVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSAnICsgZGVzY3JpcHRvciArIF8uaW5zcGVjdChuYW1lKSArICcgb2YgI3tleHB9LCBidXQgZ290ICN7YWN0fSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBhICcgKyBkZXNjcmlwdG9yICsgXy5pbnNwZWN0KG5hbWUpICsgJyBvZiAje2FjdH0nXG4gICAgICAgICwgdmFsXG4gICAgICAgICwgdmFsdWVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZmxhZyh0aGlzLCAnb2JqZWN0JywgdmFsdWUpO1xuICB9KTtcblxuXG4gIC8qKlxuICAgKiAjIyMgLm93blByb3BlcnR5KG5hbWUpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGhhcyBhbiBvd24gcHJvcGVydHkgYG5hbWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCd0ZXN0JykudG8uaGF2ZS5vd25Qcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gICAqXG4gICAqIEBuYW1lIG93blByb3BlcnR5XG4gICAqIEBhbGlhcyBoYXZlT3duUHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRPd25Qcm9wZXJ0eSAobmFtZSwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBvYmouaGFzT3duUHJvcGVydHkobmFtZSlcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBvd24gcHJvcGVydHkgJyArIF8uaW5zcGVjdChuYW1lKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBvd24gcHJvcGVydHkgJyArIF8uaW5zcGVjdChuYW1lKVxuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdvd25Qcm9wZXJ0eScsIGFzc2VydE93blByb3BlcnR5KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnaGF2ZU93blByb3BlcnR5JywgYXNzZXJ0T3duUHJvcGVydHkpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmxlbmd0aCh2YWx1ZSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQncyBgbGVuZ3RoYCBwcm9wZXJ0eSBoYXNcbiAgICogdGhlIGV4cGVjdGVkIHZhbHVlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoKDMpO1xuICAgKiAgICAgZXhwZWN0KCdmb29iYXInKS50by5oYXZlLmxlbmd0aCg2KTtcbiAgICpcbiAgICogQ2FuIGFsc28gYmUgdXNlZCBhcyBhIGNoYWluIHByZWN1cnNvciB0byBhIHZhbHVlXG4gICAqIGNvbXBhcmlzb24gZm9yIHRoZSBsZW5ndGggcHJvcGVydHkuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoLmFib3ZlKDIpO1xuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgMyBdKS50by5oYXZlLmxlbmd0aC5hYm92ZSgyKTtcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGguYmVsb3coNCk7XG4gICAqICAgICBleHBlY3QoWyAxLCAyLCAzIF0pLnRvLmhhdmUubGVuZ3RoLmJlbG93KDQpO1xuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aC53aXRoaW4oMiw0KTtcbiAgICogICAgIGV4cGVjdChbIDEsIDIsIDMgXSkudG8uaGF2ZS5sZW5ndGgud2l0aGluKDIsNCk7XG4gICAqXG4gICAqIEBuYW1lIGxlbmd0aFxuICAgKiBAYWxpYXMgbGVuZ3RoT2ZcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydExlbmd0aENoYWluICgpIHtcbiAgICBmbGFnKHRoaXMsICdkb0xlbmd0aCcsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNzZXJ0TGVuZ3RoIChuLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8uaGF2ZS5wcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gICAgdmFyIGxlbiA9IG9iai5sZW5ndGg7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgbGVuID09IG5cbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIGxlbmd0aCBvZiAje2V4cH0gYnV0IGdvdCAje2FjdH0nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgbGVuZ3RoIG9mICN7YWN0fSdcbiAgICAgICwgblxuICAgICAgLCBsZW5cbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnbGVuZ3RoJywgYXNzZXJ0TGVuZ3RoLCBhc3NlcnRMZW5ndGhDaGFpbik7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2xlbmd0aE9mJywgYXNzZXJ0TGVuZ3RoKTtcblxuICAvKipcbiAgICogIyMjIC5tYXRjaChyZWdleHApXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IG1hdGNoZXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicpLnRvLm1hdGNoKC9eZm9vLyk7XG4gICAqXG4gICAqIEBuYW1lIG1hdGNoXG4gICAqIEBwYXJhbSB7UmVnRXhwfSBSZWd1bGFyRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ21hdGNoJywgZnVuY3Rpb24gKHJlLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIHJlLmV4ZWMob2JqKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBtYXRjaCAnICsgcmVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gbm90IHRvIG1hdGNoICcgKyByZVxuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLnN0cmluZyhzdHJpbmcpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgc3RyaW5nIHRhcmdldCBjb250YWlucyBhbm90aGVyIHN0cmluZy5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vYmFyJykudG8uaGF2ZS5zdHJpbmcoJ2JhcicpO1xuICAgKlxuICAgKiBAbmFtZSBzdHJpbmdcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3N0cmluZycsIGZ1bmN0aW9uIChzdHIsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS5pcy5hKCdzdHJpbmcnKTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB+b2JqLmluZGV4T2Yoc3RyKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBjb250YWluICcgKyBfLmluc3BlY3Qoc3RyKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgY29udGFpbiAnICsgXy5pbnNwZWN0KHN0cilcbiAgICApO1xuICB9KTtcblxuXG4gIC8qKlxuICAgKiAjIyMgLmtleXMoa2V5MSwgW2tleTJdLCBbLi4uXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaGFzIGV4YWN0bHkgdGhlIGdpdmVuIGtleXMsIG9yXG4gICAqIGFzc2VydHMgdGhlIGluY2x1c2lvbiBvZiBzb21lIGtleXMgd2hlbiB1c2luZyB0aGVcbiAgICogYGluY2x1ZGVgIG9yIGBjb250YWluYCBtb2RpZmllcnMuXG4gICAqXG4gICAqICAgICBleHBlY3QoeyBmb286IDEsIGJhcjogMiB9KS50by5oYXZlLmtleXMoWydmb28nLCAnYmFyJ10pO1xuICAgKiAgICAgZXhwZWN0KHsgZm9vOiAxLCBiYXI6IDIsIGJhejogMyB9KS50by5jb250YWluLmtleXMoJ2ZvbycsICdiYXInKTtcbiAgICpcbiAgICogQG5hbWUga2V5c1xuICAgKiBAYWxpYXMga2V5XG4gICAqIEBwYXJhbSB7U3RyaW5nLi4ufEFycmF5fSBrZXlzXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydEtleXMgKGtleXMpIHtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgc3RyXG4gICAgICAsIG9rID0gdHJ1ZTtcblxuICAgIGtleXMgPSBrZXlzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgID8ga2V5c1xuICAgICAgOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgaWYgKCFrZXlzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCdrZXlzIHJlcXVpcmVkJyk7XG5cbiAgICB2YXIgYWN0dWFsID0gT2JqZWN0LmtleXMob2JqKVxuICAgICAgLCBleHBlY3RlZCA9IGtleXNcbiAgICAgICwgbGVuID0ga2V5cy5sZW5ndGg7XG5cbiAgICAvLyBJbmNsdXNpb25cbiAgICBvayA9IGtleXMuZXZlcnkoZnVuY3Rpb24oa2V5KXtcbiAgICAgIHJldHVybiB+YWN0dWFsLmluZGV4T2Yoa2V5KTtcbiAgICB9KTtcblxuICAgIC8vIFN0cmljdFxuICAgIGlmICghZmxhZyh0aGlzLCAnbmVnYXRlJykgJiYgIWZsYWcodGhpcywgJ2NvbnRhaW5zJykpIHtcbiAgICAgIG9rID0gb2sgJiYga2V5cy5sZW5ndGggPT0gYWN0dWFsLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvLyBLZXkgc3RyaW5nXG4gICAgaWYgKGxlbiA+IDEpIHtcbiAgICAgIGtleXMgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpe1xuICAgICAgICByZXR1cm4gXy5pbnNwZWN0KGtleSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBsYXN0ID0ga2V5cy5wb3AoKTtcbiAgICAgIHN0ciA9IGtleXMuam9pbignLCAnKSArICcsIGFuZCAnICsgbGFzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gXy5pbnNwZWN0KGtleXNbMF0pO1xuICAgIH1cblxuICAgIC8vIEZvcm1cbiAgICBzdHIgPSAobGVuID4gMSA/ICdrZXlzICcgOiAna2V5ICcpICsgc3RyO1xuXG4gICAgLy8gSGF2ZSAvIGluY2x1ZGVcbiAgICBzdHIgPSAoZmxhZyh0aGlzLCAnY29udGFpbnMnKSA/ICdjb250YWluICcgOiAnaGF2ZSAnKSArIHN0cjtcblxuICAgIC8vIEFzc2VydGlvblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBva1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byAnICsgc3RyXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCAnICsgc3RyXG4gICAgICAsIGV4cGVjdGVkLnNvcnQoKVxuICAgICAgLCBhY3R1YWwuc29ydCgpXG4gICAgICAsIHRydWVcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgna2V5cycsIGFzc2VydEtleXMpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdrZXknLCBhc3NlcnRLZXlzKTtcblxuICAvKipcbiAgICogIyMjIC50aHJvdyhjb25zdHJ1Y3RvcilcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSBmdW5jdGlvbiB0YXJnZXQgd2lsbCB0aHJvdyBhIHNwZWNpZmljIGVycm9yLCBvciBzcGVjaWZpYyB0eXBlIG9mIGVycm9yXG4gICAqIChhcyBkZXRlcm1pbmVkIHVzaW5nIGBpbnN0YW5jZW9mYCksIG9wdGlvbmFsbHkgd2l0aCBhIFJlZ0V4cCBvciBzdHJpbmcgaW5jbHVzaW9uIHRlc3RcbiAgICogZm9yIHRoZSBlcnJvcidzIG1lc3NhZ2UuXG4gICAqXG4gICAqICAgICB2YXIgZXJyID0gbmV3IFJlZmVyZW5jZUVycm9yKCdUaGlzIGlzIGEgYmFkIGZ1bmN0aW9uLicpO1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBlcnI7IH1cbiAgICogICAgIGV4cGVjdChmbikudG8udGhyb3coUmVmZXJlbmNlRXJyb3IpO1xuICAgKiAgICAgZXhwZWN0KGZuKS50by50aHJvdyhFcnJvcik7XG4gICAqICAgICBleHBlY3QoZm4pLnRvLnRocm93KC9iYWQgZnVuY3Rpb24vKTtcbiAgICogICAgIGV4cGVjdChmbikudG8ubm90LnRocm93KCdnb29kIGZ1bmN0aW9uJyk7XG4gICAqICAgICBleHBlY3QoZm4pLnRvLnRocm93KFJlZmVyZW5jZUVycm9yLCAvYmFkIGZ1bmN0aW9uLyk7XG4gICAqICAgICBleHBlY3QoZm4pLnRvLnRocm93KGVycik7XG4gICAqICAgICBleHBlY3QoZm4pLnRvLm5vdC50aHJvdyhuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlLicpKTtcbiAgICpcbiAgICogUGxlYXNlIG5vdGUgdGhhdCB3aGVuIGEgdGhyb3cgZXhwZWN0YXRpb24gaXMgbmVnYXRlZCwgaXQgd2lsbCBjaGVjayBlYWNoXG4gICAqIHBhcmFtZXRlciBpbmRlcGVuZGVudGx5LCBzdGFydGluZyB3aXRoIGVycm9yIGNvbnN0cnVjdG9yIHR5cGUuIFRoZSBhcHByb3ByaWF0ZSB3YXlcbiAgICogdG8gY2hlY2sgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYSB0eXBlIG9mIGVycm9yIGJ1dCBmb3IgYSBtZXNzYWdlIHRoYXQgZG9lcyBub3QgbWF0Y2hcbiAgICogaXMgdG8gdXNlIGBhbmRgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZuKS50by50aHJvdyhSZWZlcmVuY2VFcnJvcilcbiAgICogICAgICAgIC5hbmQubm90LnRocm93KC9nb29kIGZ1bmN0aW9uLyk7XG4gICAqXG4gICAqIEBuYW1lIHRocm93XG4gICAqIEBhbGlhcyB0aHJvd3NcbiAgICogQGFsaWFzIFRocm93XG4gICAqIEBwYXJhbSB7RXJyb3JDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBleHBlY3RlZCBlcnJvciBtZXNzYWdlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvciNFcnJvcl90eXBlc1xuICAgKiBAcmV0dXJucyBlcnJvciBmb3IgY2hhaW5pbmcgKG51bGwgaWYgbm8gZXJyb3IpXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydFRocm93cyAoY29uc3RydWN0b3IsIGVyck1zZywgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2cpLmlzLmEoJ2Z1bmN0aW9uJyk7XG5cbiAgICB2YXIgdGhyb3duID0gZmFsc2VcbiAgICAgICwgZGVzaXJlZEVycm9yID0gbnVsbFxuICAgICAgLCBuYW1lID0gbnVsbFxuICAgICAgLCB0aHJvd25FcnJvciA9IG51bGw7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZXJyTXNnID0gbnVsbDtcbiAgICAgIGNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKGNvbnN0cnVjdG9yICYmIChjb25zdHJ1Y3RvciBpbnN0YW5jZW9mIFJlZ0V4cCB8fCAnc3RyaW5nJyA9PT0gdHlwZW9mIGNvbnN0cnVjdG9yKSkge1xuICAgICAgZXJyTXNnID0gY29uc3RydWN0b3I7XG4gICAgICBjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChjb25zdHJ1Y3RvciAmJiBjb25zdHJ1Y3RvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBkZXNpcmVkRXJyb3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIGNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgIGVyck1zZyA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG5hbWUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUubmFtZSB8fCBjb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgaWYgKG5hbWUgPT09ICdFcnJvcicgJiYgY29uc3RydWN0b3IgIT09IEVycm9yKSB7XG4gICAgICAgIG5hbWUgPSAobmV3IGNvbnN0cnVjdG9yKCkpLm5hbWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgb2JqKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBmaXJzdCwgY2hlY2sgZGVzaXJlZCBlcnJvclxuICAgICAgaWYgKGRlc2lyZWRFcnJvcikge1xuICAgICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICAgIGVyciA9PT0gZGVzaXJlZEVycm9yXG4gICAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyAje2V4cH0gYnV0ICN7YWN0fSB3YXMgdGhyb3duJ1xuICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICN7ZXhwfSdcbiAgICAgICAgICAsIChkZXNpcmVkRXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGRlc2lyZWRFcnJvci50b1N0cmluZygpIDogZGVzaXJlZEVycm9yKVxuICAgICAgICAgICwgKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLnRvU3RyaW5nKCkgOiBlcnIpXG4gICAgICAgICk7XG5cbiAgICAgICAgZmxhZyh0aGlzLCAnb2JqZWN0JywgZXJyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIG5leHQsIGNoZWNrIGNvbnN0cnVjdG9yXG4gICAgICBpZiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgICBlcnIgaW5zdGFuY2VvZiBjb25zdHJ1Y3RvclxuICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgI3tleHB9IGJ1dCAje2FjdH0gd2FzIHRocm93bidcbiAgICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyAje2V4cH0gYnV0ICN7YWN0fSB3YXMgdGhyb3duJ1xuICAgICAgICAgICwgbmFtZVxuICAgICAgICAgICwgKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLnRvU3RyaW5nKCkgOiBlcnIpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFlcnJNc2cpIHtcbiAgICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnLCBlcnIpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG5leHQsIGNoZWNrIG1lc3NhZ2VcbiAgICAgIHZhciBtZXNzYWdlID0gJ29iamVjdCcgPT09IF8udHlwZShlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyclxuICAgICAgICA/IGVyci5tZXNzYWdlXG4gICAgICAgIDogJycgKyBlcnI7XG5cbiAgICAgIGlmICgobWVzc2FnZSAhPSBudWxsKSAmJiBlcnJNc2cgJiYgZXJyTXNnIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgICAgZXJyTXNnLmV4ZWMobWVzc2FnZSlcbiAgICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIHRocm93IGVycm9yIG1hdGNoaW5nICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIHRocm93IGVycm9yIG5vdCBtYXRjaGluZyAje2V4cH0nXG4gICAgICAgICAgLCBlcnJNc2dcbiAgICAgICAgICAsIG1lc3NhZ2VcbiAgICAgICAgKTtcblxuICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnLCBlcnIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSBpZiAoKG1lc3NhZ2UgIT0gbnVsbCkgJiYgZXJyTXNnICYmICdzdHJpbmcnID09PSB0eXBlb2YgZXJyTXNnKSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgICAgfm1lc3NhZ2UuaW5kZXhPZihlcnJNc2cpXG4gICAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyBlcnJvciBpbmNsdWRpbmcgI3tleHB9IGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgZXJyb3Igbm90IGluY2x1ZGluZyAje2FjdH0nXG4gICAgICAgICAgLCBlcnJNc2dcbiAgICAgICAgICAsIG1lc3NhZ2VcbiAgICAgICAgKTtcblxuICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnLCBlcnIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93biA9IHRydWU7XG4gICAgICAgIHRocm93bkVycm9yID0gZXJyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhY3R1YWxseUdvdCA9ICcnXG4gICAgICAsIGV4cGVjdGVkVGhyb3duID0gbmFtZSAhPT0gbnVsbFxuICAgICAgICA/IG5hbWVcbiAgICAgICAgOiBkZXNpcmVkRXJyb3JcbiAgICAgICAgICA/ICcje2V4cH0nIC8vXy5pbnNwZWN0KGRlc2lyZWRFcnJvcilcbiAgICAgICAgICA6ICdhbiBlcnJvcic7XG5cbiAgICBpZiAodGhyb3duKSB7XG4gICAgICBhY3R1YWxseUdvdCA9ICcgYnV0ICN7YWN0fSB3YXMgdGhyb3duJ1xuICAgIH1cblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB0aHJvd24gPT09IHRydWVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgJyArIGV4cGVjdGVkVGhyb3duICsgYWN0dWFsbHlHb3RcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICcgKyBleHBlY3RlZFRocm93biArIGFjdHVhbGx5R290XG4gICAgICAsIChkZXNpcmVkRXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGRlc2lyZWRFcnJvci50b1N0cmluZygpIDogZGVzaXJlZEVycm9yKVxuICAgICAgLCAodGhyb3duRXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IHRocm93bkVycm9yLnRvU3RyaW5nKCkgOiB0aHJvd25FcnJvcilcbiAgICApO1xuXG4gICAgZmxhZyh0aGlzLCAnb2JqZWN0JywgdGhyb3duRXJyb3IpO1xuICB9O1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3Rocm93JywgYXNzZXJ0VGhyb3dzKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgndGhyb3dzJywgYXNzZXJ0VGhyb3dzKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnVGhyb3cnLCBhc3NlcnRUaHJvd3MpO1xuXG4gIC8qKlxuICAgKiAjIyMgLnJlc3BvbmRUbyhtZXRob2QpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgb2JqZWN0IG9yIGNsYXNzIHRhcmdldCB3aWxsIHJlc3BvbmQgdG8gYSBtZXRob2QuXG4gICAqXG4gICAqICAgICBLbGFzcy5wcm90b3R5cGUuYmFyID0gZnVuY3Rpb24oKXt9O1xuICAgKiAgICAgZXhwZWN0KEtsYXNzKS50by5yZXNwb25kVG8oJ2JhcicpO1xuICAgKiAgICAgZXhwZWN0KG9iaikudG8ucmVzcG9uZFRvKCdiYXInKTtcbiAgICpcbiAgICogVG8gY2hlY2sgaWYgYSBjb25zdHJ1Y3RvciB3aWxsIHJlc3BvbmQgdG8gYSBzdGF0aWMgZnVuY3Rpb24sXG4gICAqIHNldCB0aGUgYGl0c2VsZmAgZmxhZy5cbiAgICpcbiAgICogICAgIEtsYXNzLmJheiA9IGZ1bmN0aW9uKCl7fTtcbiAgICogICAgIGV4cGVjdChLbGFzcykuaXRzZWxmLnRvLnJlc3BvbmRUbygnYmF6Jyk7XG4gICAqXG4gICAqIEBuYW1lIHJlc3BvbmRUb1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgncmVzcG9uZFRvJywgZnVuY3Rpb24gKG1ldGhvZCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGl0c2VsZiA9IGZsYWcodGhpcywgJ2l0c2VsZicpXG4gICAgICAsIGNvbnRleHQgPSAoJ2Z1bmN0aW9uJyA9PT0gXy50eXBlKG9iaikgJiYgIWl0c2VsZilcbiAgICAgICAgPyBvYmoucHJvdG90eXBlW21ldGhvZF1cbiAgICAgICAgOiBvYmpbbWV0aG9kXTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAnZnVuY3Rpb24nID09PSB0eXBlb2YgY29udGV4dFxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byByZXNwb25kIHRvICcgKyBfLmluc3BlY3QobWV0aG9kKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgcmVzcG9uZCB0byAnICsgXy5pbnNwZWN0KG1ldGhvZClcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5pdHNlbGZcbiAgICpcbiAgICogU2V0cyB0aGUgYGl0c2VsZmAgZmxhZywgbGF0ZXIgdXNlZCBieSB0aGUgYHJlc3BvbmRUb2AgYXNzZXJ0aW9uLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gRm9vKCkge31cbiAgICogICAgIEZvby5iYXIgPSBmdW5jdGlvbigpIHt9XG4gICAqICAgICBGb28ucHJvdG90eXBlLmJheiA9IGZ1bmN0aW9uKCkge31cbiAgICpcbiAgICogICAgIGV4cGVjdChGb28pLml0c2VsZi50by5yZXNwb25kVG8oJ2JhcicpO1xuICAgKiAgICAgZXhwZWN0KEZvbykuaXRzZWxmLm5vdC50by5yZXNwb25kVG8oJ2JheicpO1xuICAgKlxuICAgKiBAbmFtZSBpdHNlbGZcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdpdHNlbGYnLCBmdW5jdGlvbiAoKSB7XG4gICAgZmxhZyh0aGlzLCAnaXRzZWxmJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLnNhdGlzZnkobWV0aG9kKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBwYXNzZXMgYSBnaXZlbiB0cnV0aCB0ZXN0LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLnNhdGlzZnkoZnVuY3Rpb24obnVtKSB7IHJldHVybiBudW0gPiAwOyB9KTtcbiAgICpcbiAgICogQG5hbWUgc2F0aXNmeVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtYXRjaGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnc2F0aXNmeScsIGZ1bmN0aW9uIChtYXRjaGVyLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgdmFyIHJlc3VsdCA9IG1hdGNoZXIob2JqKTtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgcmVzdWx0XG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIHNhdGlzZnkgJyArIF8ub2JqRGlzcGxheShtYXRjaGVyKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3Qgc2F0aXNmeScgKyBfLm9iakRpc3BsYXkobWF0Y2hlcilcbiAgICAgICwgdGhpcy5uZWdhdGUgPyBmYWxzZSA6IHRydWVcbiAgICAgICwgcmVzdWx0XG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuY2xvc2VUbyhleHBlY3RlZCwgZGVsdGEpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIGBleHBlY3RlZGAsIHRvIHdpdGhpbiBhICsvLSBgZGVsdGFgIHJhbmdlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEuNSkudG8uYmUuY2xvc2VUbygxLCAwLjUpO1xuICAgKlxuICAgKiBAbmFtZSBjbG9zZVRvXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdjbG9zZVRvJywgZnVuY3Rpb24gKGV4cGVjdGVkLCBkZWx0YSwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuXG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykuaXMuYSgnbnVtYmVyJyk7XG4gICAgaWYgKF8udHlwZShleHBlY3RlZCkgIT09ICdudW1iZXInIHx8IF8udHlwZShkZWx0YSkgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBhcmd1bWVudHMgdG8gY2xvc2VUbyBtdXN0IGJlIG51bWJlcnMnKTtcbiAgICB9XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgTWF0aC5hYnMob2JqIC0gZXhwZWN0ZWQpIDw9IGRlbHRhXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGNsb3NlIHRvICcgKyBleHBlY3RlZCArICcgKy8tICcgKyBkZWx0YVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgY2xvc2UgdG8gJyArIGV4cGVjdGVkICsgJyArLy0gJyArIGRlbHRhXG4gICAgKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gaXNTdWJzZXRPZihzdWJzZXQsIHN1cGVyc2V0LCBjbXApIHtcbiAgICByZXR1cm4gc3Vic2V0LmV2ZXJ5KGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgIGlmICghY21wKSByZXR1cm4gc3VwZXJzZXQuaW5kZXhPZihlbGVtKSAhPT0gLTE7XG5cbiAgICAgIHJldHVybiBzdXBlcnNldC5zb21lKGZ1bmN0aW9uKGVsZW0yKSB7XG4gICAgICAgIHJldHVybiBjbXAoZWxlbSwgZWxlbTIpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm1lbWJlcnMoc2V0KVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhIHN1cGVyc2V0IG9mIGBzZXRgLFxuICAgKiBvciB0aGF0IHRoZSB0YXJnZXQgYW5kIGBzZXRgIGhhdmUgdGhlIHNhbWUgc3RyaWN0bHktZXF1YWwgKD09PSkgbWVtYmVycy5cbiAgICogQWx0ZXJuYXRlbHksIGlmIHRoZSBgZGVlcGAgZmxhZyBpcyBzZXQsIHNldCBtZW1iZXJzIGFyZSBjb21wYXJlZCBmb3IgZGVlcFxuICAgKiBlcXVhbGl0eS5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmluY2x1ZGUubWVtYmVycyhbMywgMl0pO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8ubm90LmluY2x1ZGUubWVtYmVycyhbMywgMiwgOF0pO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KFs0LCAyXSkudG8uaGF2ZS5tZW1iZXJzKFsyLCA0XSk7XG4gICAqICAgICBleHBlY3QoWzUsIDJdKS50by5ub3QuaGF2ZS5tZW1iZXJzKFs1LCAyLCAxXSk7XG4gICAqXG4gICAqICAgICBleHBlY3QoW3sgaWQ6IDEgfV0pLnRvLmRlZXAuaW5jbHVkZS5tZW1iZXJzKFt7IGlkOiAxIH1dKTtcbiAgICpcbiAgICogQG5hbWUgbWVtYmVyc1xuICAgKiBAcGFyYW0ge0FycmF5fSBzZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdtZW1iZXJzJywgZnVuY3Rpb24gKHN1YnNldCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuXG4gICAgbmV3IEFzc2VydGlvbihvYmopLnRvLmJlLmFuKCdhcnJheScpO1xuICAgIG5ldyBBc3NlcnRpb24oc3Vic2V0KS50by5iZS5hbignYXJyYXknKTtcblxuICAgIHZhciBjbXAgPSBmbGFnKHRoaXMsICdkZWVwJykgPyBfLmVxbCA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChmbGFnKHRoaXMsICdjb250YWlucycpKSB7XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnQoXG4gICAgICAgICAgaXNTdWJzZXRPZihzdWJzZXQsIG9iaiwgY21wKVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGEgc3VwZXJzZXQgb2YgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBhIHN1cGVyc2V0IG9mICN7YWN0fSdcbiAgICAgICAgLCBvYmpcbiAgICAgICAgLCBzdWJzZXRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIGlzU3Vic2V0T2Yob2JqLCBzdWJzZXQsIGNtcCkgJiYgaXNTdWJzZXRPZihzdWJzZXQsIG9iaiwgY21wKVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgdGhlIHNhbWUgbWVtYmVycyBhcyAje2FjdH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgdGhlIHNhbWUgbWVtYmVycyBhcyAje2FjdH0nXG4gICAgICAgICwgb2JqXG4gICAgICAgICwgc3Vic2V0XG4gICAgKTtcbiAgfSk7XG59O1xuIiwiLyohXG4gKiBjaGFpXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjaGFpLCB1dGlsKSB7XG5cbiAgLyohXG4gICAqIENoYWkgZGVwZW5kZW5jaWVzLlxuICAgKi9cblxuICB2YXIgQXNzZXJ0aW9uID0gY2hhaS5Bc3NlcnRpb25cbiAgICAsIGZsYWcgPSB1dGlsLmZsYWc7XG5cbiAgLyohXG4gICAqIE1vZHVsZSBleHBvcnQuXG4gICAqL1xuXG4gIC8qKlxuICAgKiAjIyMgYXNzZXJ0KGV4cHJlc3Npb24sIG1lc3NhZ2UpXG4gICAqXG4gICAqIFdyaXRlIHlvdXIgb3duIHRlc3QgZXhwcmVzc2lvbnMuXG4gICAqXG4gICAqICAgICBhc3NlcnQoJ2ZvbycgIT09ICdiYXInLCAnZm9vIGlzIG5vdCBiYXInKTtcbiAgICogICAgIGFzc2VydChBcnJheS5pc0FycmF5KFtdKSwgJ2VtcHR5IGFycmF5cyBhcmUgYXJyYXlzJyk7XG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cHJlc3Npb24gdG8gdGVzdCBmb3IgdHJ1dGhpbmVzc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSB0byBkaXNwbGF5IG9uIGVycm9yXG4gICAqIEBuYW1lIGFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB2YXIgYXNzZXJ0ID0gY2hhaS5hc3NlcnQgPSBmdW5jdGlvbiAoZXhwcmVzcywgZXJybXNnKSB7XG4gICAgdmFyIHRlc3QgPSBuZXcgQXNzZXJ0aW9uKG51bGwsIG51bGwsIGNoYWkuYXNzZXJ0KTtcbiAgICB0ZXN0LmFzc2VydChcbiAgICAgICAgZXhwcmVzc1xuICAgICAgLCBlcnJtc2dcbiAgICAgICwgJ1sgbmVnYXRpb24gbWVzc2FnZSB1bmF2YWlsYWJsZSBdJ1xuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0sIFtvcGVyYXRvcl0pXG4gICAqXG4gICAqIFRocm93IGEgZmFpbHVyZS4gTm9kZS5qcyBgYXNzZXJ0YCBtb2R1bGUtY29tcGF0aWJsZS5cbiAgICpcbiAgICogQG5hbWUgZmFpbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wZXJhdG9yXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5mYWlsID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yKSB7XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ2Fzc2VydC5mYWlsKCknO1xuICAgIHRocm93IG5ldyBjaGFpLkFzc2VydGlvbkVycm9yKG1lc3NhZ2UsIHtcbiAgICAgICAgYWN0dWFsOiBhY3R1YWxcbiAgICAgICwgZXhwZWN0ZWQ6IGV4cGVjdGVkXG4gICAgICAsIG9wZXJhdG9yOiBvcGVyYXRvclxuICAgIH0sIGFzc2VydC5mYWlsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5vayhvYmplY3QsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIHRydXRoeS5cbiAgICpcbiAgICogICAgIGFzc2VydC5vaygnZXZlcnl0aGluZycsICdldmVyeXRoaW5nIGlzIG9rJyk7XG4gICAqICAgICBhc3NlcnQub2soZmFsc2UsICd0aGlzIHdpbGwgZmFpbCcpO1xuICAgKlxuICAgKiBAbmFtZSBva1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3QgdG8gdGVzdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQub2sgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS5pcy5vaztcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RPayhvYmplY3QsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIGZhbHN5LlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdE9rKCdldmVyeXRoaW5nJywgJ3RoaXMgd2lsbCBmYWlsJyk7XG4gICAqICAgICBhc3NlcnQubm90T2soZmFsc2UsICd0aGlzIHdpbGwgcGFzcycpO1xuICAgKlxuICAgKiBAbmFtZSBub3RPa1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3QgdG8gdGVzdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90T2sgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS5pcy5ub3Qub2s7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIG5vbi1zdHJpY3QgZXF1YWxpdHkgKGA9PWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmVxdWFsKDMsICczJywgJz09IGNvZXJjZXMgdmFsdWVzIHRvIHN0cmluZ3MnKTtcbiAgICpcbiAgICogQG5hbWUgZXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgdmFyIHRlc3QgPSBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuZXF1YWwpO1xuXG4gICAgdGVzdC5hc3NlcnQoXG4gICAgICAgIGV4cCA9PSBmbGFnKHRlc3QsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBlcXVhbCAje2V4cH0nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBlcXVhbCAje2FjdH0nXG4gICAgICAsIGV4cFxuICAgICAgLCBhY3RcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyBub24tc3RyaWN0IGluZXF1YWxpdHkgKGAhPWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdEVxdWFsKDMsIDQsICd0aGVzZSBudW1iZXJzIGFyZSBub3QgZXF1YWwnKTtcbiAgICpcbiAgICogQG5hbWUgbm90RXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgdmFyIHRlc3QgPSBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQubm90RXF1YWwpO1xuXG4gICAgdGVzdC5hc3NlcnQoXG4gICAgICAgIGV4cCAhPSBmbGFnKHRlc3QsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3tleHB9J1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBlcXVhbCAje2FjdH0nXG4gICAgICAsIGV4cFxuICAgICAgLCBhY3RcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyBzdHJpY3QgZXF1YWxpdHkgKGA9PT1gKSBvZiBgYWN0dWFsYCBhbmQgYGV4cGVjdGVkYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0cnVlLCB0cnVlLCAndGhlc2UgYm9vbGVhbnMgYXJlIHN0cmljdGx5IGVxdWFsJyk7XG4gICAqXG4gICAqIEBuYW1lIHN0cmljdEVxdWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGFjdHVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbiAoYWN0LCBleHAsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oYWN0LCBtc2cpLnRvLmVxdWFsKGV4cCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHN0cmljdCBpbmVxdWFsaXR5IChgIT09YCkgb2YgYGFjdHVhbGAgYW5kIGBleHBlY3RlZGAuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90U3RyaWN0RXF1YWwoMywgJzMnLCAnbm8gY29lcmNpb24gZm9yIHN0cmljdCBlcXVhbGl0eScpO1xuICAgKlxuICAgKiBAbmFtZSBub3RTdHJpY3RFcXVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24gKGFjdCwgZXhwLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnKS50by5ub3QuZXF1YWwoZXhwKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYGFjdHVhbGAgaXMgZGVlcGx5IGVxdWFsIHRvIGBleHBlY3RlZGAuXG4gICAqXG4gICAqICAgICBhc3NlcnQuZGVlcEVxdWFsKHsgdGVhOiAnZ3JlZW4nIH0sIHsgdGVhOiAnZ3JlZW4nIH0pO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwRXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kZWVwRXF1YWwgPSBmdW5jdGlvbiAoYWN0LCBleHAsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oYWN0LCBtc2cpLnRvLmVxbChleHApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydCB0aGF0IGBhY3R1YWxgIGlzIG5vdCBkZWVwbHkgZXF1YWwgdG8gYGV4cGVjdGVkYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3REZWVwRXF1YWwoeyB0ZWE6ICdncmVlbicgfSwgeyB0ZWE6ICdqYXNtaW5lJyB9KTtcbiAgICpcbiAgICogQG5hbWUgbm90RGVlcEVxdWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGFjdHVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24gKGFjdCwgZXhwLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnKS50by5ub3QuZXFsKGV4cCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNUcnVlKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIHRydWUuXG4gICAqXG4gICAqICAgICB2YXIgdGVhU2VydmVkID0gdHJ1ZTtcbiAgICogICAgIGFzc2VydC5pc1RydWUodGVhU2VydmVkLCAndGhlIHRlYSBoYXMgYmVlbiBzZXJ2ZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNUcnVlXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc1RydWUgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS5pc1sndHJ1ZSddO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzRmFsc2UodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgZmFsc2UuXG4gICAqXG4gICAqICAgICB2YXIgdGVhU2VydmVkID0gZmFsc2U7XG4gICAqICAgICBhc3NlcnQuaXNGYWxzZSh0ZWFTZXJ2ZWQsICdubyB0ZWEgeWV0PyBobW0uLi4nKTtcbiAgICpcbiAgICogQG5hbWUgaXNGYWxzZVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNGYWxzZSA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLmlzWydmYWxzZSddO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTnVsbCh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBudWxsLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzTnVsbChlcnIsICd0aGVyZSB3YXMgbm8gZXJyb3InKTtcbiAgICpcbiAgICogQG5hbWUgaXNOdWxsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc051bGwgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5lcXVhbChudWxsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdE51bGwodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgbm90IG51bGwuXG4gICAqXG4gICAqICAgICB2YXIgdGVhID0gJ3Rhc3R5IGNoYWknO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90TnVsbCh0ZWEsICdncmVhdCwgdGltZSBmb3IgdGVhIScpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdE51bGxcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90TnVsbCA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5lcXVhbChudWxsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc1VuZGVmaW5lZCh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogICAgIHZhciB0ZWE7XG4gICAqICAgICBhc3NlcnQuaXNVbmRlZmluZWQodGVhLCAnbm8gdGVhIGRlZmluZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNVbmRlZmluZWRcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzVW5kZWZpbmVkID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8uZXF1YWwodW5kZWZpbmVkKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc0RlZmluZWQodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgbm90IGB1bmRlZmluZWRgLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYSA9ICdjdXAgb2YgY2hhaSc7XG4gICAqICAgICBhc3NlcnQuaXNEZWZpbmVkKHRlYSwgJ3RlYSBoYXMgYmVlbiBkZWZpbmVkJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzRGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNEZWZpbmVkID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8ubm90LmVxdWFsKHVuZGVmaW5lZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNGdW5jdGlvbih2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gc2VydmVUZWEoKSB7IHJldHVybiAnY3VwIG9mIHRlYSc7IH07XG4gICAqICAgICBhc3NlcnQuaXNGdW5jdGlvbihzZXJ2ZVRlYSwgJ2dyZWF0LCB3ZSBjYW4gaGF2ZSB0ZWEgbm93Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzRnVuY3Rpb25cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5iZS5hKCdmdW5jdGlvbicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90RnVuY3Rpb24odmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgX25vdF8gYSBmdW5jdGlvbi5cbiAgICpcbiAgICogICAgIHZhciBzZXJ2ZVRlYSA9IFsgJ2hlYXQnLCAncG91cicsICdzaXAnIF07XG4gICAqICAgICBhc3NlcnQuaXNOb3RGdW5jdGlvbihzZXJ2ZVRlYSwgJ2dyZWF0LCB3ZSBoYXZlIGxpc3RlZCB0aGUgc3RlcHMnKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RGdW5jdGlvblxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5iZS5hKCdmdW5jdGlvbicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzT2JqZWN0KHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGFuIG9iamVjdCAoYXMgcmV2ZWFsZWQgYnlcbiAgICogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgKS5cbiAgICpcbiAgICogICAgIHZhciBzZWxlY3Rpb24gPSB7IG5hbWU6ICdDaGFpJywgc2VydmU6ICd3aXRoIHNwaWNlcycgfTtcbiAgICogICAgIGFzc2VydC5pc09iamVjdChzZWxlY3Rpb24sICd0ZWEgc2VsZWN0aW9uIGlzIGFuIG9iamVjdCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc09iamVjdFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNPYmplY3QgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5iZS5hKCdvYmplY3QnKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdE9iamVjdCh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBfbm90XyBhbiBvYmplY3QuXG4gICAqXG4gICAqICAgICB2YXIgc2VsZWN0aW9uID0gJ2NoYWknXG4gICAqICAgICBhc3NlcnQuaXNOb3RPYmplY3Qoc2VsZWN0aW9uLCAndGVhIHNlbGVjdGlvbiBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAqICAgICBhc3NlcnQuaXNOb3RPYmplY3QobnVsbCwgJ251bGwgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdE9iamVjdFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RPYmplY3QgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuYmUuYSgnb2JqZWN0Jyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNBcnJheSh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhbiBhcnJheS5cbiAgICpcbiAgICogICAgIHZhciBtZW51ID0gWyAnZ3JlZW4nLCAnY2hhaScsICdvb2xvbmcnIF07XG4gICAqICAgICBhc3NlcnQuaXNBcnJheShtZW51LCAnd2hhdCBraW5kIG9mIHRlYSBkbyB3ZSB3YW50PycpO1xuICAgKlxuICAgKiBAbmFtZSBpc0FycmF5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0FycmF5ID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8uYmUuYW4oJ2FycmF5Jyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RBcnJheSh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBfbm90XyBhbiBhcnJheS5cbiAgICpcbiAgICogICAgIHZhciBtZW51ID0gJ2dyZWVufGNoYWl8b29sb25nJztcbiAgICogICAgIGFzc2VydC5pc05vdEFycmF5KG1lbnUsICd3aGF0IGtpbmQgb2YgdGVhIGRvIHdlIHdhbnQ/Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90QXJyYXlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90QXJyYXkgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuYmUuYW4oJ2FycmF5Jyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNTdHJpbmcodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgYSBzdHJpbmcuXG4gICAqXG4gICAqICAgICB2YXIgdGVhT3JkZXIgPSAnY2hhaSc7XG4gICAqICAgICBhc3NlcnQuaXNTdHJpbmcodGVhT3JkZXIsICdvcmRlciBwbGFjZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNTdHJpbmdcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzU3RyaW5nID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8uYmUuYSgnc3RyaW5nJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RTdHJpbmcodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgX25vdF8gYSBzdHJpbmcuXG4gICAqXG4gICAqICAgICB2YXIgdGVhT3JkZXIgPSA0O1xuICAgKiAgICAgYXNzZXJ0LmlzTm90U3RyaW5nKHRlYU9yZGVyLCAnb3JkZXIgcGxhY2VkJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90U3RyaW5nXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdFN0cmluZyA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5iZS5hKCdzdHJpbmcnKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc051bWJlcih2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhIG51bWJlci5cbiAgICpcbiAgICogICAgIHZhciBjdXBzID0gMjtcbiAgICogICAgIGFzc2VydC5pc051bWJlcihjdXBzLCAnaG93IG1hbnkgY3VwcycpO1xuICAgKlxuICAgKiBAbmFtZSBpc051bWJlclxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTnVtYmVyID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8uYmUuYSgnbnVtYmVyJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3ROdW1iZXIodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgX25vdF8gYSBudW1iZXIuXG4gICAqXG4gICAqICAgICB2YXIgY3VwcyA9ICcyIGN1cHMgcGxlYXNlJztcbiAgICogICAgIGFzc2VydC5pc05vdE51bWJlcihjdXBzLCAnaG93IG1hbnkgY3VwcycpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdE51bWJlclxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3ROdW1iZXIgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuYmUuYSgnbnVtYmVyJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNCb29sZWFuKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGEgYm9vbGVhbi5cbiAgICpcbiAgICogICAgIHZhciB0ZWFSZWFkeSA9IHRydWVcbiAgICogICAgICAgLCB0ZWFTZXJ2ZWQgPSBmYWxzZTtcbiAgICpcbiAgICogICAgIGFzc2VydC5pc0Jvb2xlYW4odGVhUmVhZHksICdpcyB0aGUgdGVhIHJlYWR5Jyk7XG4gICAqICAgICBhc3NlcnQuaXNCb29sZWFuKHRlYVNlcnZlZCwgJ2hhcyB0ZWEgYmVlbiBzZXJ2ZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNCb29sZWFuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0Jvb2xlYW4gPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5iZS5hKCdib29sZWFuJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RCb29sZWFuKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIF9ub3RfIGEgYm9vbGVhbi5cbiAgICpcbiAgICogICAgIHZhciB0ZWFSZWFkeSA9ICd5ZXAnXG4gICAqICAgICAgICwgdGVhU2VydmVkID0gJ25vcGUnO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzTm90Qm9vbGVhbih0ZWFSZWFkeSwgJ2lzIHRoZSB0ZWEgcmVhZHknKTtcbiAgICogICAgIGFzc2VydC5pc05vdEJvb2xlYW4odGVhU2VydmVkLCAnaGFzIHRlYSBiZWVuIHNlcnZlZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdEJvb2xlYW5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90Qm9vbGVhbiA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5iZS5hKCdib29sZWFuJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAudHlwZU9mKHZhbHVlLCBuYW1lLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgJ3MgdHlwZSBpcyBgbmFtZWAsIGFzIGRldGVybWluZWQgYnlcbiAgICogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnR5cGVPZih7IHRlYTogJ2NoYWknIH0sICdvYmplY3QnLCAnd2UgaGF2ZSBhbiBvYmplY3QnKTtcbiAgICogICAgIGFzc2VydC50eXBlT2YoWydjaGFpJywgJ2phc21pbmUnXSwgJ2FycmF5JywgJ3dlIGhhdmUgYW4gYXJyYXknKTtcbiAgICogICAgIGFzc2VydC50eXBlT2YoJ3RlYScsICdzdHJpbmcnLCAnd2UgaGF2ZSBhIHN0cmluZycpO1xuICAgKiAgICAgYXNzZXJ0LnR5cGVPZigvdGVhLywgJ3JlZ2V4cCcsICd3ZSBoYXZlIGEgcmVndWxhciBleHByZXNzaW9uJyk7XG4gICAqICAgICBhc3NlcnQudHlwZU9mKG51bGwsICdudWxsJywgJ3dlIGhhdmUgYSBudWxsJyk7XG4gICAqICAgICBhc3NlcnQudHlwZU9mKHVuZGVmaW5lZCwgJ3VuZGVmaW5lZCcsICd3ZSBoYXZlIGFuIHVuZGVmaW5lZCcpO1xuICAgKlxuICAgKiBAbmFtZSB0eXBlT2ZcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnR5cGVPZiA9IGZ1bmN0aW9uICh2YWwsIHR5cGUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLmJlLmEodHlwZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90VHlwZU9mKHZhbHVlLCBuYW1lLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgJ3MgdHlwZSBpcyBfbm90XyBgbmFtZWAsIGFzIGRldGVybWluZWQgYnlcbiAgICogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdFR5cGVPZigndGVhJywgJ251bWJlcicsICdzdHJpbmdzIGFyZSBub3QgbnVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBub3RUeXBlT2ZcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVvZiBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RUeXBlT2YgPSBmdW5jdGlvbiAodmFsLCB0eXBlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuYmUuYSh0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pbnN0YW5jZU9mKG9iamVjdCwgY29uc3RydWN0b3IsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgYW4gaW5zdGFuY2Ugb2YgYGNvbnN0cnVjdG9yYC5cbiAgICpcbiAgICogICAgIHZhciBUZWEgPSBmdW5jdGlvbiAobmFtZSkgeyB0aGlzLm5hbWUgPSBuYW1lOyB9XG4gICAqICAgICAgICwgY2hhaSA9IG5ldyBUZWEoJ2NoYWknKTtcbiAgICpcbiAgICogICAgIGFzc2VydC5pbnN0YW5jZU9mKGNoYWksIFRlYSwgJ2NoYWkgaXMgYW4gaW5zdGFuY2Ugb2YgdGVhJyk7XG4gICAqXG4gICAqIEBuYW1lIGluc3RhbmNlT2ZcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge0NvbnN0cnVjdG9yfSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaW5zdGFuY2VPZiA9IGZ1bmN0aW9uICh2YWwsIHR5cGUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLmJlLmluc3RhbmNlT2YodHlwZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90SW5zdGFuY2VPZihvYmplY3QsIGNvbnN0cnVjdG9yLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgYHZhbHVlYCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgYGNvbnN0cnVjdG9yYC5cbiAgICpcbiAgICogICAgIHZhciBUZWEgPSBmdW5jdGlvbiAobmFtZSkgeyB0aGlzLm5hbWUgPSBuYW1lOyB9XG4gICAqICAgICAgICwgY2hhaSA9IG5ldyBTdHJpbmcoJ2NoYWknKTtcbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RJbnN0YW5jZU9mKGNoYWksIFRlYSwgJ2NoYWkgaXMgbm90IGFuIGluc3RhbmNlIG9mIHRlYScpO1xuICAgKlxuICAgKiBAbmFtZSBub3RJbnN0YW5jZU9mXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdEluc3RhbmNlT2YgPSBmdW5jdGlvbiAodmFsLCB0eXBlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuYmUuaW5zdGFuY2VPZih0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pbmNsdWRlKGhheXN0YWNrLCBuZWVkbGUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBoYXlzdGFja2AgaW5jbHVkZXMgYG5lZWRsZWAuIFdvcmtzXG4gICAqIGZvciBzdHJpbmdzIGFuZCBhcnJheXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaW5jbHVkZSgnZm9vYmFyJywgJ2JhcicsICdmb29iYXIgY29udGFpbnMgc3RyaW5nIFwiYmFyXCInKTtcbiAgICogICAgIGFzc2VydC5pbmNsdWRlKFsgMSwgMiwgMyBdLCAzLCAnYXJyYXkgY29udGFpbnMgdmFsdWUnKTtcbiAgICpcbiAgICogQG5hbWUgaW5jbHVkZVxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gbmVlZGxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pbmNsdWRlID0gZnVuY3Rpb24gKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQuaW5jbHVkZSkuaW5jbHVkZShpbmMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdEluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYGhheXN0YWNrYCBkb2VzIG5vdCBpbmNsdWRlIGBuZWVkbGVgLiBXb3Jrc1xuICAgKiBmb3Igc3RyaW5ncyBhbmQgYXJyYXlzLlxuICAgKmlcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlKCdmb29iYXInLCAnYmF6JywgJ3N0cmluZyBub3QgaW5jbHVkZSBzdWJzdHJpbmcnKTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlKFsgMSwgMiwgMyBdLCA0LCAnYXJyYXkgbm90IGluY2x1ZGUgY29udGFpbiB2YWx1ZScpO1xuICAgKlxuICAgKiBAbmFtZSBub3RJbmNsdWRlXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBoYXlzdGFja1xuICAgKiBAcGFyYW0ge01peGVkfSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdEluY2x1ZGUgPSBmdW5jdGlvbiAoZXhwLCBpbmMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3RJbmNsdWRlKS5ub3QuaW5jbHVkZShpbmMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm1hdGNoKHZhbHVlLCByZWdleHAsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgbWF0Y2hlcyB0aGUgcmVndWxhciBleHByZXNzaW9uIGByZWdleHBgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm1hdGNoKCdmb29iYXInLCAvXmZvby8sICdyZWdleHAgbWF0Y2hlcycpO1xuICAgKlxuICAgKiBAbmFtZSBtYXRjaFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXhwXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5tYXRjaCA9IGZ1bmN0aW9uIChleHAsIHJlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnKS50by5tYXRjaChyZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90TWF0Y2godmFsdWUsIHJlZ2V4cCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBkb2VzIG5vdCBtYXRjaCB0aGUgcmVndWxhciBleHByZXNzaW9uIGByZWdleHBgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdE1hdGNoKCdmb29iYXInLCAvXmZvby8sICdyZWdleHAgZG9lcyBub3QgbWF0Y2gnKTtcbiAgICpcbiAgICogQG5hbWUgbm90TWF0Y2hcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90TWF0Y2ggPSBmdW5jdGlvbiAoZXhwLCByZSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZykudG8ubm90Lm1hdGNoKHJlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5wcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnByb3BlcnR5KHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RlYScpO1xuICAgKlxuICAgKiBAbmFtZSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQucHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGRvZXMgX25vdF8gaGF2ZSBhIHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWAuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90UHJvcGVydHkoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAnY29mZmVlJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdFByb3BlcnR5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2cpLnRvLm5vdC5oYXZlLnByb3BlcnR5KHByb3ApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBQcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgLCB3aGljaCBjYW4gYmUgYVxuICAgKiBzdHJpbmcgdXNpbmcgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiBmb3IgZGVlcCByZWZlcmVuY2UuXG4gICAqXG4gICAqICAgICBhc3NlcnQuZGVlcFByb3BlcnR5KHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RlYS5ncmVlbicpO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwUHJvcGVydHlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2cpLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eShwcm9wKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3REZWVwUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgZG9lcyBfbm90XyBoYXZlIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCwgd2hpY2hcbiAgICogY2FuIGJlIGEgc3RyaW5nIHVzaW5nIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yIGRlZXAgcmVmZXJlbmNlLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBQcm9wZXJ0eSh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfX0sICd0ZWEub29sb25nJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdERlZXBQcm9wZXJ0eVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RGVlcFByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8ubm90LmhhdmUuZGVlcC5wcm9wZXJ0eShwcm9wKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5wcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCB3aXRoIHZhbHVlIGdpdmVuXG4gICAqIGJ5IGB2YWx1ZWAuXG4gICAqXG4gICAqICAgICBhc3NlcnQucHJvcGVydHlWYWwoeyB0ZWE6ICdpcyBnb29kJyB9LCAndGVhJywgJ2lzIGdvb2QnKTtcbiAgICpcbiAgICogQG5hbWUgcHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnByb3BlcnR5VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KHByb3AsIHZhbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAucHJvcGVydHlOb3RWYWwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhIHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWAsIGJ1dCB3aXRoIGEgdmFsdWVcbiAgICogZGlmZmVyZW50IGZyb20gdGhhdCBnaXZlbiBieSBgdmFsdWVgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnByb3BlcnR5Tm90VmFsKHsgdGVhOiAnaXMgZ29vZCcgfSwgJ3RlYScsICdpcyBiYWQnKTtcbiAgICpcbiAgICogQG5hbWUgcHJvcGVydHlOb3RWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnByb3BlcnR5Tm90VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5ub3QuaGF2ZS5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBQcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCB3aXRoIHZhbHVlIGdpdmVuXG4gICAqIGJ5IGB2YWx1ZWAuIGBwcm9wZXJ0eWAgY2FuIHVzZSBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvciBkZWVwXG4gICAqIHJlZmVyZW5jZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5kZWVwUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAndGVhLmdyZWVuJywgJ21hdGNoYScpO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwUHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8uaGF2ZS5kZWVwLnByb3BlcnR5KHByb3AsIHZhbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZGVlcFByb3BlcnR5Tm90VmFsKG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgLCBidXQgd2l0aCBhIHZhbHVlXG4gICAqIGRpZmZlcmVudCBmcm9tIHRoYXQgZ2l2ZW4gYnkgYHZhbHVlYC4gYHByb3BlcnR5YCBjYW4gdXNlIGRvdC0gYW5kXG4gICAqIGJyYWNrZXQtbm90YXRpb24gZm9yIGRlZXAgcmVmZXJlbmNlLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmRlZXBQcm9wZXJ0eU5vdFZhbCh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfX0sICd0ZWEuZ3JlZW4nLCAna29uYWNoYScpO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwUHJvcGVydHlOb3RWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBQcm9wZXJ0eU5vdFZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8ubm90LmhhdmUuZGVlcC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmxlbmd0aE9mKG9iamVjdCwgbGVuZ3RoLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBgbGVuZ3RoYCBwcm9wZXJ0eSB3aXRoIHRoZSBleHBlY3RlZCB2YWx1ZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5sZW5ndGhPZihbMSwyLDNdLCAzLCAnYXJyYXkgaGFzIGxlbmd0aCBvZiAzJyk7XG4gICAqICAgICBhc3NlcnQubGVuZ3RoT2YoJ2Zvb2JhcicsIDUsICdzdHJpbmcgaGFzIGxlbmd0aCBvZiA2Jyk7XG4gICAqXG4gICAqIEBuYW1lIGxlbmd0aE9mXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5sZW5ndGhPZiA9IGZ1bmN0aW9uIChleHAsIGxlbiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZykudG8uaGF2ZS5sZW5ndGgobGVuKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC50aHJvd3MoZnVuY3Rpb24sIFtjb25zdHJ1Y3Rvci9zdHJpbmcvcmVnZXhwXSwgW3N0cmluZy9yZWdleHBdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgZnVuY3Rpb25gIHdpbGwgdGhyb3cgYW4gZXJyb3IgdGhhdCBpcyBhbiBpbnN0YW5jZSBvZlxuICAgKiBgY29uc3RydWN0b3JgLCBvciBhbHRlcm5hdGVseSB0aGF0IGl0IHdpbGwgdGhyb3cgYW4gZXJyb3Igd2l0aCBtZXNzYWdlXG4gICAqIG1hdGNoaW5nIGByZWdleHBgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnRocm93KGZuLCAnZnVuY3Rpb24gdGhyb3dzIGEgcmVmZXJlbmNlIGVycm9yJyk7XG4gICAqICAgICBhc3NlcnQudGhyb3coZm4sIC9mdW5jdGlvbiB0aHJvd3MgYSByZWZlcmVuY2UgZXJyb3IvKTtcbiAgICogICAgIGFzc2VydC50aHJvdyhmbiwgUmVmZXJlbmNlRXJyb3IpO1xuICAgKiAgICAgYXNzZXJ0LnRocm93KGZuLCBSZWZlcmVuY2VFcnJvciwgJ2Z1bmN0aW9uIHRocm93cyBhIHJlZmVyZW5jZSBlcnJvcicpO1xuICAgKiAgICAgYXNzZXJ0LnRocm93KGZuLCBSZWZlcmVuY2VFcnJvciwgL2Z1bmN0aW9uIHRocm93cyBhIHJlZmVyZW5jZSBlcnJvci8pO1xuICAgKlxuICAgKiBAbmFtZSB0aHJvd3NcbiAgICogQGFsaWFzIHRocm93XG4gICAqIEBhbGlhcyBUaHJvd1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0Vycm9yQ29uc3RydWN0b3J9IGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7UmVnRXhwfSByZWdleHBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvciNFcnJvcl90eXBlc1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuVGhyb3cgPSBmdW5jdGlvbiAoZm4sIGVycnQsIGVycnMsIG1zZykge1xuICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGVycnQgfHwgZXJydCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgZXJycyA9IGVycnQ7XG4gICAgICBlcnJ0ID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgYXNzZXJ0RXJyID0gbmV3IEFzc2VydGlvbihmbiwgbXNnKS50by5UaHJvdyhlcnJ0LCBlcnJzKTtcbiAgICByZXR1cm4gZmxhZyhhc3NlcnRFcnIsICdvYmplY3QnKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kb2VzTm90VGhyb3coZnVuY3Rpb24sIFtjb25zdHJ1Y3Rvci9yZWdleHBdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgZnVuY3Rpb25gIHdpbGwgX25vdF8gdGhyb3cgYW4gZXJyb3IgdGhhdCBpcyBhbiBpbnN0YW5jZSBvZlxuICAgKiBgY29uc3RydWN0b3JgLCBvciBhbHRlcm5hdGVseSB0aGF0IGl0IHdpbGwgbm90IHRocm93IGFuIGVycm9yIHdpdGggbWVzc2FnZVxuICAgKiBtYXRjaGluZyBgcmVnZXhwYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5kb2VzTm90VGhyb3coZm4sIEVycm9yLCAnZnVuY3Rpb24gZG9lcyBub3QgdGhyb3cnKTtcbiAgICpcbiAgICogQG5hbWUgZG9lc05vdFRocm93XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RXJyb3JDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Vycm9yI0Vycm9yX3R5cGVzXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbiAoZm4sIHR5cGUsIG1zZykge1xuICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHR5cGUpIHtcbiAgICAgIG1zZyA9IHR5cGU7XG4gICAgICB0eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2cpLnRvLm5vdC5UaHJvdyh0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5vcGVyYXRvcih2YWwxLCBvcGVyYXRvciwgdmFsMiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBDb21wYXJlcyB0d28gdmFsdWVzIHVzaW5nIGBvcGVyYXRvcmAuXG4gICAqXG4gICAqICAgICBhc3NlcnQub3BlcmF0b3IoMSwgJzwnLCAyLCAnZXZlcnl0aGluZyBpcyBvaycpO1xuICAgKiAgICAgYXNzZXJ0Lm9wZXJhdG9yKDEsICc+JywgMiwgJ3RoaXMgd2lsbCBmYWlsJyk7XG4gICAqXG4gICAqIEBuYW1lIG9wZXJhdG9yXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbDFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wZXJhdG9yXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbDJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm9wZXJhdG9yID0gZnVuY3Rpb24gKHZhbCwgb3BlcmF0b3IsIHZhbDIsIG1zZykge1xuICAgIGlmICghflsnPT0nLCAnPT09JywgJz4nLCAnPj0nLCAnPCcsICc8PScsICchPScsICchPT0nXS5pbmRleE9mKG9wZXJhdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG9wZXJhdG9yIFwiJyArIG9wZXJhdG9yICsgJ1wiJyk7XG4gICAgfVxuICAgIHZhciB0ZXN0ID0gbmV3IEFzc2VydGlvbihldmFsKHZhbCArIG9wZXJhdG9yICsgdmFsMiksIG1zZyk7XG4gICAgdGVzdC5hc3NlcnQoXG4gICAgICAgIHRydWUgPT09IGZsYWcodGVzdCwgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAnICsgdXRpbC5pbnNwZWN0KHZhbCkgKyAnIHRvIGJlICcgKyBvcGVyYXRvciArICcgJyArIHV0aWwuaW5zcGVjdCh2YWwyKVxuICAgICAgLCAnZXhwZWN0ZWQgJyArIHV0aWwuaW5zcGVjdCh2YWwpICsgJyB0byBub3QgYmUgJyArIG9wZXJhdG9yICsgJyAnICsgdXRpbC5pbnNwZWN0KHZhbDIpICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuY2xvc2VUbyhhY3R1YWwsIGV4cGVjdGVkLCBkZWx0YSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCBgZXhwZWN0ZWRgLCB0byB3aXRoaW4gYSArLy0gYGRlbHRhYCByYW5nZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5jbG9zZVRvKDEuNSwgMSwgMC41LCAnbnVtYmVycyBhcmUgY2xvc2UnKTtcbiAgICpcbiAgICogQG5hbWUgY2xvc2VUb1xuICAgKiBAcGFyYW0ge051bWJlcn0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmNsb3NlVG8gPSBmdW5jdGlvbiAoYWN0LCBleHAsIGRlbHRhLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnKS50by5iZS5jbG9zZVRvKGV4cCwgZGVsdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLnNhbWVNZW1iZXJzKHNldDEsIHNldDIsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzZXQxYCBhbmQgYHNldDJgIGhhdmUgdGhlIHNhbWUgbWVtYmVycy5cbiAgICogT3JkZXIgaXMgbm90IHRha2VuIGludG8gYWNjb3VudC5cbiAgICpcbiAgICogICAgIGFzc2VydC5zYW1lTWVtYmVycyhbIDEsIDIsIDMgXSwgWyAyLCAxLCAzIF0sICdzYW1lIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgc2FtZU1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MVxuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5zYW1lTWVtYmVycyA9IGZ1bmN0aW9uIChzZXQxLCBzZXQyLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHNldDEsIG1zZykudG8uaGF2ZS5zYW1lLm1lbWJlcnMoc2V0Mik7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5pbmNsdWRlTWVtYmVycyhzdXBlcnNldCwgc3Vic2V0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc3Vic2V0YCBpcyBpbmNsdWRlZCBpbiBgc3VwZXJzZXRgLlxuICAgKiBPcmRlciBpcyBub3QgdGFrZW4gaW50byBhY2NvdW50LlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmluY2x1ZGVNZW1iZXJzKFsgMSwgMiwgMyBdLCBbIDIsIDEgXSwgJ2luY2x1ZGUgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBpbmNsdWRlTWVtYmVyc1xuICAgKiBAcGFyYW0ge0FycmF5fSBzdXBlcnNldFxuICAgKiBAcGFyYW0ge0FycmF5fSBzdWJzZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmluY2x1ZGVNZW1iZXJzID0gZnVuY3Rpb24gKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc3VwZXJzZXQsIG1zZykudG8uaW5jbHVkZS5tZW1iZXJzKHN1YnNldCk7XG4gIH1cblxuICAvKiFcbiAgICogVW5kb2N1bWVudGVkIC8gdW50ZXN0ZWRcbiAgICovXG5cbiAgYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuYmUub2s7XG4gIH07XG5cbiAgLyohXG4gICAqIEFsaWFzZXMuXG4gICAqL1xuXG4gIChmdW5jdGlvbiBhbGlhcyhuYW1lLCBhcyl7XG4gICAgYXNzZXJ0W2FzXSA9IGFzc2VydFtuYW1lXTtcbiAgICByZXR1cm4gYWxpYXM7XG4gIH0pXG4gICgnVGhyb3cnLCAndGhyb3cnKVxuICAoJ1Rocm93JywgJ3Rocm93cycpO1xufTtcbiIsIi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNoYWksIHV0aWwpIHtcbiAgY2hhaS5leHBlY3QgPSBmdW5jdGlvbiAodmFsLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBjaGFpLkFzc2VydGlvbih2YWwsIG1lc3NhZ2UpO1xuICB9O1xufTtcblxuIiwiLyohXG4gKiBjaGFpXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY2hhaSwgdXRpbCkge1xuICB2YXIgQXNzZXJ0aW9uID0gY2hhaS5Bc3NlcnRpb247XG5cbiAgZnVuY3Rpb24gbG9hZFNob3VsZCAoKSB7XG4gICAgLy8gZXhwbGljaXRseSBkZWZpbmUgdGhpcyBtZXRob2QgYXMgZnVuY3Rpb24gYXMgdG8gaGF2ZSBpdCdzIG5hbWUgdG8gaW5jbHVkZSBhcyBgc3NmaWBcbiAgICBmdW5jdGlvbiBzaG91bGRHZXR0ZXIoKSB7XG4gICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFN0cmluZyB8fCB0aGlzIGluc3RhbmNlb2YgTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKHRoaXMuY29uc3RydWN0b3IodGhpcyksIG51bGwsIHNob3VsZEdldHRlcik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBCb29sZWFuKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKHRoaXMgPT0gdHJ1ZSwgbnVsbCwgc2hvdWxkR2V0dGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKHRoaXMsIG51bGwsIHNob3VsZEdldHRlcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNob3VsZFNldHRlcih2YWx1ZSkge1xuICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFpanMvY2hhaS9pc3N1ZXMvODY6IHRoaXMgbWFrZXNcbiAgICAgIC8vIGB3aGF0ZXZlci5zaG91bGQgPSBzb21lVmFsdWVgIGFjdHVhbGx5IHNldCBgc29tZVZhbHVlYCwgd2hpY2ggaXNcbiAgICAgIC8vIGVzcGVjaWFsbHkgdXNlZnVsIGZvciBgZ2xvYmFsLnNob3VsZCA9IHJlcXVpcmUoJ2NoYWknKS5zaG91bGQoKWAuXG4gICAgICAvL1xuICAgICAgLy8gTm90ZSB0aGF0IHdlIGhhdmUgdG8gdXNlIFtbRGVmaW5lUHJvcGVydHldXSBpbnN0ZWFkIG9mIFtbUHV0XV1cbiAgICAgIC8vIHNpbmNlIG90aGVyd2lzZSB3ZSB3b3VsZCB0cmlnZ2VyIHRoaXMgdmVyeSBzZXR0ZXIhXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Nob3VsZCcsIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gbW9kaWZ5IE9iamVjdC5wcm90b3R5cGUgdG8gaGF2ZSBgc2hvdWxkYFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2hvdWxkJywge1xuICAgICAgc2V0OiBzaG91bGRTZXR0ZXJcbiAgICAgICwgZ2V0OiBzaG91bGRHZXR0ZXJcbiAgICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICB2YXIgc2hvdWxkID0ge307XG5cbiAgICBzaG91bGQuZXF1YWwgPSBmdW5jdGlvbiAodmFsMSwgdmFsMiwgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHZhbDEsIG1zZykudG8uZXF1YWwodmFsMik7XG4gICAgfTtcblxuICAgIHNob3VsZC5UaHJvdyA9IGZ1bmN0aW9uIChmbiwgZXJydCwgZXJycywgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2cpLnRvLlRocm93KGVycnQsIGVycnMpO1xuICAgIH07XG5cbiAgICBzaG91bGQuZXhpc3QgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLmV4aXN0O1xuICAgIH1cblxuICAgIC8vIG5lZ2F0aW9uXG4gICAgc2hvdWxkLm5vdCA9IHt9XG5cbiAgICBzaG91bGQubm90LmVxdWFsID0gZnVuY3Rpb24gKHZhbDEsIHZhbDIsIG1zZykge1xuICAgICAgbmV3IEFzc2VydGlvbih2YWwxLCBtc2cpLnRvLm5vdC5lcXVhbCh2YWwyKTtcbiAgICB9O1xuXG4gICAgc2hvdWxkLm5vdC5UaHJvdyA9IGZ1bmN0aW9uIChmbiwgZXJydCwgZXJycywgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2cpLnRvLm5vdC5UaHJvdyhlcnJ0LCBlcnJzKTtcbiAgICB9O1xuXG4gICAgc2hvdWxkLm5vdC5leGlzdCA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8ubm90LmV4aXN0O1xuICAgIH1cblxuICAgIHNob3VsZFsndGhyb3cnXSA9IHNob3VsZFsnVGhyb3cnXTtcbiAgICBzaG91bGQubm90Wyd0aHJvdyddID0gc2hvdWxkLm5vdFsnVGhyb3cnXTtcblxuICAgIHJldHVybiBzaG91bGQ7XG4gIH07XG5cbiAgY2hhaS5zaG91bGQgPSBsb2FkU2hvdWxkO1xuICBjaGFpLlNob3VsZCA9IGxvYWRTaG91bGQ7XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gYWRkQ2hhaW5pbmdNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG5cbnZhciB0cmFuc2ZlckZsYWdzID0gcmVxdWlyZSgnLi90cmFuc2ZlckZsYWdzJyk7XG52YXIgZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xuXG4vKiFcbiAqIE1vZHVsZSB2YXJpYWJsZXNcbiAqL1xuXG4vLyBDaGVjayB3aGV0aGVyIGBfX3Byb3RvX19gIGlzIHN1cHBvcnRlZFxudmFyIGhhc1Byb3RvU3VwcG9ydCA9ICdfX3Byb3RvX18nIGluIE9iamVjdDtcblxuLy8gV2l0aG91dCBgX19wcm90b19fYCBzdXBwb3J0LCB0aGlzIG1vZHVsZSB3aWxsIG5lZWQgdG8gYWRkIHByb3BlcnRpZXMgdG8gYSBmdW5jdGlvbi5cbi8vIEhvd2V2ZXIsIHNvbWUgRnVuY3Rpb24ucHJvdG90eXBlIG1ldGhvZHMgY2Fubm90IGJlIG92ZXJ3cml0dGVuLFxuLy8gYW5kIHRoZXJlIHNlZW1zIG5vIGVhc3kgY3Jvc3MtcGxhdGZvcm0gd2F5IHRvIGRldGVjdCB0aGVtIChAc2VlIGNoYWlqcy9jaGFpL2lzc3Vlcy82OSkuXG52YXIgZXhjbHVkZU5hbWVzID0gL14oPzpsZW5ndGh8bmFtZXxhcmd1bWVudHN8Y2FsbGVyKSQvO1xuXG4vLyBDYWNoZSBgRnVuY3Rpb25gIHByb3BlcnRpZXNcbnZhciBjYWxsICA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsLFxuICAgIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vKipcbiAqICMjIyBhZGRDaGFpbmFibGVNZXRob2QgKGN0eCwgbmFtZSwgbWV0aG9kLCBjaGFpbmluZ0JlaGF2aW9yKVxuICpcbiAqIEFkZHMgYSBtZXRob2QgdG8gYW4gb2JqZWN0LCBzdWNoIHRoYXQgdGhlIG1ldGhvZCBjYW4gYWxzbyBiZSBjaGFpbmVkLlxuICpcbiAqICAgICB1dGlscy5hZGRDaGFpbmFibGVNZXRob2QoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnZm9vJywgZnVuY3Rpb24gKHN0cikge1xuICogICAgICAgdmFyIG9iaiA9IHV0aWxzLmZsYWcodGhpcywgJ29iamVjdCcpO1xuICogICAgICAgbmV3IGNoYWkuQXNzZXJ0aW9uKG9iaikudG8uYmUuZXF1YWwoc3RyKTtcbiAqICAgICB9KTtcbiAqXG4gKiBDYW4gYWxzbyBiZSBhY2Nlc3NlZCBkaXJlY3RseSBmcm9tIGBjaGFpLkFzc2VydGlvbmAuXG4gKlxuICogICAgIGNoYWkuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnZm9vJywgZm4sIGNoYWluaW5nQmVoYXZpb3IpO1xuICpcbiAqIFRoZSByZXN1bHQgY2FuIHRoZW4gYmUgdXNlZCBhcyBib3RoIGEgbWV0aG9kIGFzc2VydGlvbiwgZXhlY3V0aW5nIGJvdGggYG1ldGhvZGAgYW5kXG4gKiBgY2hhaW5pbmdCZWhhdmlvcmAsIG9yIGFzIGEgbGFuZ3VhZ2UgY2hhaW4sIHdoaWNoIG9ubHkgZXhlY3V0ZXMgYGNoYWluaW5nQmVoYXZpb3JgLlxuICpcbiAqICAgICBleHBlY3QoZm9vU3RyKS50by5iZS5mb28oJ2JhcicpO1xuICogICAgIGV4cGVjdChmb29TdHIpLnRvLmJlLmZvby5lcXVhbCgnZm9vJyk7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBvYmplY3QgdG8gd2hpY2ggdGhlIG1ldGhvZCBpcyBhZGRlZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgbWV0aG9kIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIGBuYW1lYCwgd2hlbiBjYWxsZWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoYWluaW5nQmVoYXZpb3IgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkXG4gKiBAbmFtZSBhZGRDaGFpbmFibGVNZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBtZXRob2QsIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgaWYgKHR5cGVvZiBjaGFpbmluZ0JlaGF2aW9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgY2hhaW5pbmdCZWhhdmlvciA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgfVxuXG4gIHZhciBjaGFpbmFibGVCZWhhdmlvciA9IHtcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgLCBjaGFpbmluZ0JlaGF2aW9yOiBjaGFpbmluZ0JlaGF2aW9yXG4gIH07XG5cbiAgLy8gc2F2ZSB0aGUgbWV0aG9kcyBzbyB3ZSBjYW4gb3ZlcndyaXRlIHRoZW0gbGF0ZXIsIGlmIHdlIG5lZWQgdG8uXG4gIGlmICghY3R4Ll9fbWV0aG9kcykge1xuICAgIGN0eC5fX21ldGhvZHMgPSB7fTtcbiAgfVxuICBjdHguX19tZXRob2RzW25hbWVdID0gY2hhaW5hYmxlQmVoYXZpb3I7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgbmFtZSxcbiAgICB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yLmNhbGwodGhpcyk7XG5cbiAgICAgICAgdmFyIGFzc2VydCA9IGZ1bmN0aW9uIGFzc2VydCgpIHtcbiAgICAgICAgICB2YXIgb2xkX3NzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJyk7XG4gICAgICAgICAgaWYgKG9sZF9zc2ZpICYmIGNvbmZpZy5pbmNsdWRlU3RhY2sgPT09IGZhbHNlKVxuICAgICAgICAgICAgZmxhZyh0aGlzLCAnc3NmaScsIGFzc2VydCk7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGNoYWluYWJsZUJlaGF2aW9yLm1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVXNlIGBfX3Byb3RvX19gIGlmIGF2YWlsYWJsZVxuICAgICAgICBpZiAoaGFzUHJvdG9TdXBwb3J0KSB7XG4gICAgICAgICAgLy8gSW5oZXJpdCBhbGwgcHJvcGVydGllcyBmcm9tIHRoZSBvYmplY3QgYnkgcmVwbGFjaW5nIHRoZSBgRnVuY3Rpb25gIHByb3RvdHlwZVxuICAgICAgICAgIHZhciBwcm90b3R5cGUgPSBhc3NlcnQuX19wcm90b19fID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBgY2FsbGAgYW5kIGBhcHBseWAgbWV0aG9kcyBmcm9tIGBGdW5jdGlvbmBcbiAgICAgICAgICBwcm90b3R5cGUuY2FsbCA9IGNhbGw7XG4gICAgICAgICAgcHJvdG90eXBlLmFwcGx5ID0gYXBwbHk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCByZWRlZmluZSBhbGwgcHJvcGVydGllcyAoc2xvdyEpXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBhc3NlcnRlck5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3R4KTtcbiAgICAgICAgICBhc3NlcnRlck5hbWVzLmZvckVhY2goZnVuY3Rpb24gKGFzc2VydGVyTmFtZSkge1xuICAgICAgICAgICAgaWYgKCFleGNsdWRlTmFtZXMudGVzdChhc3NlcnRlck5hbWUpKSB7XG4gICAgICAgICAgICAgIHZhciBwZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBhc3NlcnRlck5hbWUpO1xuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXNzZXJ0LCBhc3NlcnRlck5hbWUsIHBkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgYXNzZXJ0KTtcbiAgICAgICAgcmV0dXJuIGFzc2VydDtcbiAgICAgIH1cbiAgICAsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBhZGRNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuLyoqXG4gKiAjIyMgLmFkZE1ldGhvZCAoY3R4LCBuYW1lLCBtZXRob2QpXG4gKlxuICogQWRkcyBhIG1ldGhvZCB0byB0aGUgcHJvdG90eXBlIG9mIGFuIG9iamVjdC5cbiAqXG4gKiAgICAgdXRpbHMuYWRkTWV0aG9kKGNoYWkuQXNzZXJ0aW9uLnByb3RvdHlwZSwgJ2ZvbycsIGZ1bmN0aW9uIChzdHIpIHtcbiAqICAgICAgIHZhciBvYmogPSB1dGlscy5mbGFnKHRoaXMsICdvYmplY3QnKTtcbiAqICAgICAgIG5ldyBjaGFpLkFzc2VydGlvbihvYmopLnRvLmJlLmVxdWFsKHN0cik7XG4gKiAgICAgfSk7XG4gKlxuICogQ2FuIGFsc28gYmUgYWNjZXNzZWQgZGlyZWN0bHkgZnJvbSBgY2hhaS5Bc3NlcnRpb25gLlxuICpcbiAqICAgICBjaGFpLkFzc2VydGlvbi5hZGRNZXRob2QoJ2ZvbycsIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChmb29TdHIpLnRvLmJlLmZvbygnYmFyJyk7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBvYmplY3QgdG8gd2hpY2ggdGhlIG1ldGhvZCBpcyBhZGRlZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgbWV0aG9kIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIG5hbWVcbiAqIEBuYW1lIGFkZE1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBtZXRob2QpIHtcbiAgY3R4W25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvbGRfc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKTtcbiAgICBpZiAob2xkX3NzZmkgJiYgY29uZmlnLmluY2x1ZGVTdGFjayA9PT0gZmFsc2UpXG4gICAgICBmbGFnKHRoaXMsICdzc2ZpJywgY3R4W25hbWVdKTtcbiAgICB2YXIgcmVzdWx0ID0gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gdGhpcyA6IHJlc3VsdDtcbiAgfTtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBhZGRQcm9wZXJ0eSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgYWRkUHJvcGVydHkgKGN0eCwgbmFtZSwgZ2V0dGVyKVxuICpcbiAqIEFkZHMgYSBwcm9wZXJ0eSB0byB0aGUgcHJvdG90eXBlIG9mIGFuIG9iamVjdC5cbiAqXG4gKiAgICAgdXRpbHMuYWRkUHJvcGVydHkoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnZm9vJywgZnVuY3Rpb24gKCkge1xuICogICAgICAgdmFyIG9iaiA9IHV0aWxzLmZsYWcodGhpcywgJ29iamVjdCcpO1xuICogICAgICAgbmV3IGNoYWkuQXNzZXJ0aW9uKG9iaikudG8uYmUuaW5zdGFuY2VvZihGb28pO1xuICogICAgIH0pO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24uYWRkUHJvcGVydHkoJ2ZvbycsIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChteUZvbykudG8uYmUuZm9vO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHRvIHdoaWNoIHRoZSBwcm9wZXJ0eSBpcyBhZGRlZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgcHJvcGVydHkgdG8gYWRkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBnZXR0ZXIgZnVuY3Rpb24gdG8gYmUgdXNlZCBmb3IgbmFtZVxuICogQG5hbWUgYWRkUHJvcGVydHlcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBnZXR0ZXIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgbmFtZSxcbiAgICB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZ2V0dGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICB9XG4gICAgLCBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gZmxhZyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgZmxhZyhvYmplY3QgLGtleSwgW3ZhbHVlXSlcbiAqXG4gKiBHZXQgb3Igc2V0IGEgZmxhZyB2YWx1ZSBvbiBhbiBvYmplY3QuIElmIGFcbiAqIHZhbHVlIGlzIHByb3ZpZGVkIGl0IHdpbGwgYmUgc2V0LCBlbHNlIGl0IHdpbGxcbiAqIHJldHVybiB0aGUgY3VycmVudGx5IHNldCB2YWx1ZSBvciBgdW5kZWZpbmVkYCBpZlxuICogdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gKlxuICogICAgIHV0aWxzLmZsYWcodGhpcywgJ2ZvbycsICdiYXInKTsgLy8gc2V0dGVyXG4gKiAgICAgdXRpbHMuZmxhZyh0aGlzLCAnZm9vJyk7IC8vIGdldHRlciwgcmV0dXJucyBgYmFyYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgKGNvbnN0cnVjdGVkIEFzc2VydGlvblxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgKG9wdGlvbmFsKVxuICogQG5hbWUgZmxhZ1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIHZhciBmbGFncyA9IG9iai5fX2ZsYWdzIHx8IChvYmouX19mbGFncyA9IE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGZsYWdzW2tleV0gPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmxhZ3Nba2V5XTtcbiAgfVxufTtcbiIsIi8qIVxuICogQ2hhaSAtIGdldEFjdHVhbCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIGdldEFjdHVhbChvYmplY3QsIFthY3R1YWxdKVxuICpcbiAqIFJldHVybnMgdGhlIGBhY3R1YWxgIHZhbHVlIGZvciBhbiBBc3NlcnRpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IChjb25zdHJ1Y3RlZCBBc3NlcnRpb24pXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCBhcmd1bWVudHNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIGFyZ3MpIHtcbiAgcmV0dXJuIGFyZ3MubGVuZ3RoID4gNCA/IGFyZ3NbNF0gOiBvYmouX29iajtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBnZXRFbnVtZXJhYmxlUHJvcGVydGllcyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgLmdldEVudW1lcmFibGVQcm9wZXJ0aWVzKG9iamVjdClcbiAqXG4gKiBUaGlzIGFsbG93cyB0aGUgcmV0cmlldmFsIG9mIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LFxuICogaW5oZXJpdGVkIG9yIG5vdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbmFtZSBnZXRFbnVtZXJhYmxlUHJvcGVydGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldEVudW1lcmFibGVQcm9wZXJ0aWVzKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIG5hbWUgaW4gb2JqZWN0KSB7XG4gICAgcmVzdWx0LnB1c2gobmFtZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBtZXNzYWdlIGNvbXBvc2l0aW9uIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIE1vZHVsZSBkZXBlbmRhbmNpZXNcbiAqL1xuXG52YXIgZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpXG4gICwgZ2V0QWN0dWFsID0gcmVxdWlyZSgnLi9nZXRBY3R1YWwnKVxuICAsIGluc3BlY3QgPSByZXF1aXJlKCcuL2luc3BlY3QnKVxuICAsIG9iakRpc3BsYXkgPSByZXF1aXJlKCcuL29iakRpc3BsYXknKTtcblxuLyoqXG4gKiAjIyMgLmdldE1lc3NhZ2Uob2JqZWN0LCBtZXNzYWdlLCBuZWdhdGVNZXNzYWdlKVxuICpcbiAqIENvbnN0cnVjdCB0aGUgZXJyb3IgbWVzc2FnZSBiYXNlZCBvbiBmbGFnc1xuICogYW5kIHRlbXBsYXRlIHRhZ3MuIFRlbXBsYXRlIHRhZ3Mgd2lsbCByZXR1cm5cbiAqIGEgc3RyaW5naWZpZWQgaW5zcGVjdGlvbiBvZiB0aGUgb2JqZWN0IHJlZmVyZW5jZWQuXG4gKlxuICogTWVzc2FnZSB0ZW1wbGF0ZSB0YWdzOlxuICogLSBgI3t0aGlzfWAgY3VycmVudCBhc3NlcnRlZCBvYmplY3RcbiAqIC0gYCN7YWN0fWAgYWN0dWFsIHZhbHVlXG4gKiAtIGAje2V4cH1gIGV4cGVjdGVkIHZhbHVlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCAoY29uc3RydWN0ZWQgQXNzZXJ0aW9uKVxuICogQHBhcmFtIHtBcmd1bWVudHN9IGNoYWkuQXNzZXJ0aW9uLnByb3RvdHlwZS5hc3NlcnQgYXJndW1lbnRzXG4gKiBAbmFtZSBnZXRNZXNzYWdlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgYXJncykge1xuICB2YXIgbmVnYXRlID0gZmxhZyhvYmosICduZWdhdGUnKVxuICAgICwgdmFsID0gZmxhZyhvYmosICdvYmplY3QnKVxuICAgICwgZXhwZWN0ZWQgPSBhcmdzWzNdXG4gICAgLCBhY3R1YWwgPSBnZXRBY3R1YWwob2JqLCBhcmdzKVxuICAgICwgbXNnID0gbmVnYXRlID8gYXJnc1syXSA6IGFyZ3NbMV1cbiAgICAsIGZsYWdNc2cgPSBmbGFnKG9iaiwgJ21lc3NhZ2UnKTtcblxuICBpZih0eXBlb2YgbXNnID09PSBcImZ1bmN0aW9uXCIpIG1zZyA9IG1zZygpO1xuICBtc2cgPSBtc2cgfHwgJyc7XG4gIG1zZyA9IG1zZ1xuICAgIC5yZXBsYWNlKC8je3RoaXN9L2csIG9iakRpc3BsYXkodmFsKSlcbiAgICAucmVwbGFjZSgvI3thY3R9L2csIG9iakRpc3BsYXkoYWN0dWFsKSlcbiAgICAucmVwbGFjZSgvI3tleHB9L2csIG9iakRpc3BsYXkoZXhwZWN0ZWQpKTtcblxuICByZXR1cm4gZmxhZ01zZyA/IGZsYWdNc2cgKyAnOiAnICsgbXNnIDogbXNnO1xufTtcbiIsIi8qIVxuICogQ2hhaSAtIGdldE5hbWUgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyBnZXROYW1lKGZ1bmMpXG4gKlxuICogR2V0cyB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uLCBpbiBhIGNyb3NzLWJyb3dzZXIgd2F5LlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGEgZnVuY3Rpb24gKHVzdWFsbHkgYSBjb25zdHJ1Y3RvcilcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gIGlmIChmdW5jLm5hbWUpIHJldHVybiBmdW5jLm5hbWU7XG5cbiAgdmFyIG1hdGNoID0gL15cXHM/ZnVuY3Rpb24gKFteKF0qKVxcKC8uZXhlYyhmdW5jKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdID8gbWF0Y2hbMV0gOiBcIlwiO1xufTtcbiIsIi8qIVxuICogQ2hhaSAtIGdldFBhdGhWYWx1ZSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbG9naWNhbHBhcmFkb3gvZmlsdHJcbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5nZXRQYXRoVmFsdWUocGF0aCwgb2JqZWN0KVxuICpcbiAqIFRoaXMgYWxsb3dzIHRoZSByZXRyaWV2YWwgb2YgdmFsdWVzIGluIGFuXG4gKiBvYmplY3QgZ2l2ZW4gYSBzdHJpbmcgcGF0aC5cbiAqXG4gKiAgICAgdmFyIG9iaiA9IHtcbiAqICAgICAgICAgcHJvcDE6IHtcbiAqICAgICAgICAgICAgIGFycjogWydhJywgJ2InLCAnYyddXG4gKiAgICAgICAgICAgLCBzdHI6ICdIZWxsbydcbiAqICAgICAgICAgfVxuICogICAgICAgLCBwcm9wMjoge1xuICogICAgICAgICAgICAgYXJyOiBbIHsgbmVzdGVkOiAnVW5pdmVyc2UnIH0gXVxuICogICAgICAgICAgICwgc3RyOiAnSGVsbG8gYWdhaW4hJ1xuICogICAgICAgICB9XG4gKiAgICAgfVxuICpcbiAqIFRoZSBmb2xsb3dpbmcgd291bGQgYmUgdGhlIHJlc3VsdHMuXG4gKlxuICogICAgIGdldFBhdGhWYWx1ZSgncHJvcDEuc3RyJywgb2JqKTsgLy8gSGVsbG9cbiAqICAgICBnZXRQYXRoVmFsdWUoJ3Byb3AxLmF0dFsyXScsIG9iaik7IC8vIGJcbiAqICAgICBnZXRQYXRoVmFsdWUoJ3Byb3AyLmFyclswXS5uZXN0ZWQnLCBvYmopOyAvLyBVbml2ZXJzZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSB2YWx1ZSBvciBgdW5kZWZpbmVkYFxuICogQG5hbWUgZ2V0UGF0aFZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnZhciBnZXRQYXRoVmFsdWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXRoLCBvYmopIHtcbiAgdmFyIHBhcnNlZCA9IHBhcnNlUGF0aChwYXRoKTtcbiAgcmV0dXJuIF9nZXRQYXRoVmFsdWUocGFyc2VkLCBvYmopO1xufTtcblxuLyohXG4gKiAjIyBwYXJzZVBhdGgocGF0aClcbiAqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdXNlZCB0byBwYXJzZSBzdHJpbmcgb2JqZWN0XG4gKiBwYXRocy4gVXNlIGluIGNvbmp1bmN0aW9uIHdpdGggYF9nZXRQYXRoVmFsdWVgLlxuICpcbiAqICAgICAgdmFyIHBhcnNlZCA9IHBhcnNlUGF0aCgnbXlvYmplY3QucHJvcGVydHkuc3VicHJvcCcpO1xuICpcbiAqICMjIyBQYXRoczpcbiAqXG4gKiAqIENhbiBiZSBhcyBuZWFyIGluZmluaXRlbHkgZGVlcCBhbmQgbmVzdGVkXG4gKiAqIEFycmF5cyBhcmUgYWxzbyB2YWxpZCB1c2luZyB0aGUgZm9ybWFsIGBteW9iamVjdC5kb2N1bWVudFszXS5wcm9wZXJ0eWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqIEByZXR1cm5zIHtPYmplY3R9IHBhcnNlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VQYXRoIChwYXRoKSB7XG4gIHZhciBzdHIgPSBwYXRoLnJlcGxhY2UoL1xcWy9nLCAnLlsnKVxuICAgICwgcGFydHMgPSBzdHIubWF0Y2goLyhcXFxcXFwufFteLl0rPykrL2cpO1xuICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciByZSA9IC9cXFsoXFxkKylcXF0kL1xuICAgICAgLCBtQXJyID0gcmUuZXhlYyh2YWx1ZSlcbiAgICBpZiAobUFycikgcmV0dXJuIHsgaTogcGFyc2VGbG9hdChtQXJyWzFdKSB9O1xuICAgIGVsc2UgcmV0dXJuIHsgcDogdmFsdWUgfTtcbiAgfSk7XG59O1xuXG4vKiFcbiAqICMjIF9nZXRQYXRoVmFsdWUocGFyc2VkLCBvYmopXG4gKlxuICogSGVscGVyIGNvbXBhbmlvbiBmdW5jdGlvbiBmb3IgYC5wYXJzZVBhdGhgIHRoYXQgcmV0dXJuc1xuICogdGhlIHZhbHVlIGxvY2F0ZWQgYXQgdGhlIHBhcnNlZCBhZGRyZXNzLlxuICpcbiAqICAgICAgdmFyIHZhbHVlID0gZ2V0UGF0aFZhbHVlKHBhcnNlZCwgb2JqKTtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyc2VkIGRlZmluaXRpb24gZnJvbSBgcGFyc2VQYXRoYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdG8gc2VhcmNoIGFnYWluc3RcbiAqIEByZXR1cm5zIHtPYmplY3R8VW5kZWZpbmVkfSB2YWx1ZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gX2dldFBhdGhWYWx1ZSAocGFyc2VkLCBvYmopIHtcbiAgdmFyIHRtcCA9IG9ialxuICAgICwgcmVzO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHBhcnNlZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgcGFydCA9IHBhcnNlZFtpXTtcbiAgICBpZiAodG1wKSB7XG4gICAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBwYXJ0LnApXG4gICAgICAgIHRtcCA9IHRtcFtwYXJ0LnBdO1xuICAgICAgZWxzZSBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBwYXJ0LmkpXG4gICAgICAgIHRtcCA9IHRtcFtwYXJ0LmldO1xuICAgICAgaWYgKGkgPT0gKGwgLSAxKSkgcmVzID0gdG1wO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gZ2V0UHJvcGVydGllcyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgLmdldFByb3BlcnRpZXMob2JqZWN0KVxuICpcbiAqIFRoaXMgYWxsb3dzIHRoZSByZXRyaWV2YWwgb2YgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LCBlbnVtZXJhYmxlIG9yIG5vdCxcbiAqIGluaGVyaXRlZCBvciBub3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICogQHJldHVybnMge0FycmF5fVxuICogQG5hbWUgZ2V0UHJvcGVydGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFByb3BlcnRpZXMob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzdWJqZWN0KTtcblxuICBmdW5jdGlvbiBhZGRQcm9wZXJ0eShwcm9wZXJ0eSkge1xuICAgIGlmIChyZXN1bHQuaW5kZXhPZihwcm9wZXJ0eSkgPT09IC0xKSB7XG4gICAgICByZXN1bHQucHVzaChwcm9wZXJ0eSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHN1YmplY3QpO1xuICB3aGlsZSAocHJvdG8gIT09IG51bGwpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuZm9yRWFjaChhZGRQcm9wZXJ0eSk7XG4gICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKiFcbiAqIGNoYWlcbiAqIENvcHlyaWdodChjKSAyMDExIEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBNYWluIGV4cG9ydHNcbiAqL1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8qIVxuICogdGVzdCB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy50ZXN0ID0gcmVxdWlyZSgnLi90ZXN0Jyk7XG5cbi8qIVxuICogdHlwZSB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy50eXBlID0gcmVxdWlyZSgnLi90eXBlJyk7XG5cbi8qIVxuICogbWVzc2FnZSB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy5nZXRNZXNzYWdlID0gcmVxdWlyZSgnLi9nZXRNZXNzYWdlJyk7XG5cbi8qIVxuICogYWN0dWFsIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLmdldEFjdHVhbCA9IHJlcXVpcmUoJy4vZ2V0QWN0dWFsJyk7XG5cbi8qIVxuICogSW5zcGVjdCB1dGlsXG4gKi9cblxuZXhwb3J0cy5pbnNwZWN0ID0gcmVxdWlyZSgnLi9pbnNwZWN0Jyk7XG5cbi8qIVxuICogT2JqZWN0IERpc3BsYXkgdXRpbFxuICovXG5cbmV4cG9ydHMub2JqRGlzcGxheSA9IHJlcXVpcmUoJy4vb2JqRGlzcGxheScpO1xuXG4vKiFcbiAqIEZsYWcgdXRpbGl0eVxuICovXG5cbmV4cG9ydHMuZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xuXG4vKiFcbiAqIEZsYWcgdHJhbnNmZXJyaW5nIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLnRyYW5zZmVyRmxhZ3MgPSByZXF1aXJlKCcuL3RyYW5zZmVyRmxhZ3MnKTtcblxuLyohXG4gKiBEZWVwIGVxdWFsIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLmVxbCA9IHJlcXVpcmUoJ2RlZXAtZXFsJyk7XG5cbi8qIVxuICogRGVlcCBwYXRoIHZhbHVlXG4gKi9cblxuZXhwb3J0cy5nZXRQYXRoVmFsdWUgPSByZXF1aXJlKCcuL2dldFBhdGhWYWx1ZScpO1xuXG4vKiFcbiAqIEZ1bmN0aW9uIG5hbWVcbiAqL1xuXG5leHBvcnRzLmdldE5hbWUgPSByZXF1aXJlKCcuL2dldE5hbWUnKTtcblxuLyohXG4gKiBhZGQgUHJvcGVydHlcbiAqL1xuXG5leHBvcnRzLmFkZFByb3BlcnR5ID0gcmVxdWlyZSgnLi9hZGRQcm9wZXJ0eScpO1xuXG4vKiFcbiAqIGFkZCBNZXRob2RcbiAqL1xuXG5leHBvcnRzLmFkZE1ldGhvZCA9IHJlcXVpcmUoJy4vYWRkTWV0aG9kJyk7XG5cbi8qIVxuICogb3ZlcndyaXRlIFByb3BlcnR5XG4gKi9cblxuZXhwb3J0cy5vdmVyd3JpdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vb3ZlcndyaXRlUHJvcGVydHknKTtcblxuLyohXG4gKiBvdmVyd3JpdGUgTWV0aG9kXG4gKi9cblxuZXhwb3J0cy5vdmVyd3JpdGVNZXRob2QgPSByZXF1aXJlKCcuL292ZXJ3cml0ZU1ldGhvZCcpO1xuXG4vKiFcbiAqIEFkZCBhIGNoYWluYWJsZSBtZXRob2RcbiAqL1xuXG5leHBvcnRzLmFkZENoYWluYWJsZU1ldGhvZCA9IHJlcXVpcmUoJy4vYWRkQ2hhaW5hYmxlTWV0aG9kJyk7XG5cbi8qIVxuICogT3ZlcndyaXRlIGNoYWluYWJsZSBtZXRob2RcbiAqL1xuXG5leHBvcnRzLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCA9IHJlcXVpcmUoJy4vb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kJyk7XG5cbiIsIi8vIFRoaXMgaXMgKGFsbW9zdCkgZGlyZWN0bHkgZnJvbSBOb2RlLmpzIHV0aWxzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvYmxvYi9mOGMzMzVkMGNhZjQ3ZjE2ZDMxNDEzZjg5YWEyOGVkYTM4NzhlM2FhL2xpYi91dGlsLmpzXG5cbnZhciBnZXROYW1lID0gcmVxdWlyZSgnLi9nZXROYW1lJyk7XG52YXIgZ2V0UHJvcGVydGllcyA9IHJlcXVpcmUoJy4vZ2V0UHJvcGVydGllcycpO1xudmFyIGdldEVudW1lcmFibGVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9nZXRFbnVtZXJhYmxlUHJvcGVydGllcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGluc3BlY3Q7XG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc2hvd0hpZGRlbiBGbGFnIHRoYXQgc2hvd3MgaGlkZGVuIChub3QgZW51bWVyYWJsZSlcbiAqICAgIHByb3BlcnRpZXMgb2Ygb2JqZWN0cy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZXB0aCBEZXB0aCBpbiB3aGljaCB0byBkZXNjZW5kIGluIG9iamVjdC4gRGVmYXVsdCBpcyAyLlxuICogQHBhcmFtIHtCb29sZWFufSBjb2xvcnMgRmxhZyB0byB0dXJuIG9uIEFOU0kgZXNjYXBlIGNvZGVzIHRvIGNvbG9yIHRoZVxuICogICAgb3V0cHV0LiBEZWZhdWx0IGlzIGZhbHNlIChubyBjb2xvcmluZykuXG4gKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKSB7XG4gIHZhciBjdHggPSB7XG4gICAgc2hvd0hpZGRlbjogc2hvd0hpZGRlbixcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBzdHI7IH1cbiAgfTtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCAodHlwZW9mIGRlcHRoID09PSAndW5kZWZpbmVkJyA/IDIgOiBkZXB0aCkpO1xufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgb2JqZWN0IGlzIGEgRE9NIGVsZW1lbnQuXG52YXIgaXNET01FbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICBpZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqZWN0ICYmXG4gICAgICB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0Lm5vZGVUeXBlID09PSAxICYmXG4gICAgICB0eXBlb2Ygb2JqZWN0Lm5vZGVOYW1lID09PSAnc3RyaW5nJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUuaW5zcGVjdCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcyk7XG4gICAgaWYgKHR5cGVvZiByZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gSWYgdGhpcyBpcyBhIERPTSBlbGVtZW50LCB0cnkgdG8gZ2V0IHRoZSBvdXRlciBIVE1MLlxuICBpZiAoaXNET01FbGVtZW50KHZhbHVlKSkge1xuICAgIGlmICgnb3V0ZXJIVE1MJyBpbiB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLm91dGVySFRNTDtcbiAgICAgIC8vIFRoaXMgdmFsdWUgZG9lcyBub3QgaGF2ZSBhbiBvdXRlckhUTUwgYXR0cmlidXRlLFxuICAgICAgLy8gICBpdCBjb3VsZCBzdGlsbCBiZSBhbiBYTUwgZWxlbWVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBdHRlbXB0IHRvIHNlcmlhbGl6ZSBpdFxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnhtbFZlcnNpb24pIHtcbiAgICAgICAgICB2YXIgeG1sU2VyaWFsaXplciA9IG5ldyBYTUxTZXJpYWxpemVyKCk7XG4gICAgICAgICAgcmV0dXJuIHhtbFNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEZpcmVmb3ggMTEtIGRvIG5vdCBzdXBwb3J0IG91dGVySFRNTFxuICAgICAgICAgIC8vICAgSXQgZG9lcywgaG93ZXZlciwgc3VwcG9ydCBpbm5lckhUTUxcbiAgICAgICAgICAvLyAgIFVzZSB0aGUgZm9sbG93aW5nIHRvIHJlbmRlciB0aGUgZWxlbWVudFxuICAgICAgICAgIHZhciBucyA9IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiO1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMsICdfJyk7XG5cbiAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodmFsdWUuY2xvbmVOb2RlKGZhbHNlKSk7XG4gICAgICAgICAgaHRtbCA9IGNvbnRhaW5lci5pbm5lckhUTUxcbiAgICAgICAgICAgIC5yZXBsYWNlKCc+PCcsICc+JyArIHZhbHVlLmlubmVySFRNTCArICc8Jyk7XG4gICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSBhIG5vbi1uYXRpdmUgRE9NIGltcGxlbWVudGF0aW9uLFxuICAgICAgICAvLyAgIGNvbnRpbnVlIHdpdGggdGhlIG5vcm1hbCBmbG93OlxuICAgICAgICAvLyAgIHByaW50aW5nIHRoZSBlbGVtZW50IGFzIGlmIGl0IGlzIGFuIG9iamVjdC5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciB2aXNpYmxlS2V5cyA9IGdldEVudW1lcmFibGVQcm9wZXJ0aWVzKHZhbHVlKTtcbiAgdmFyIGtleXMgPSBjdHguc2hvd0hpZGRlbiA/IGdldFByb3BlcnRpZXModmFsdWUpIDogdmlzaWJsZUtleXM7XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICAvLyBJbiBJRSwgZXJyb3JzIGhhdmUgYSBzaW5nbGUgYHN0YWNrYCBwcm9wZXJ0eSwgb3IgaWYgdGhleSBhcmUgdmFuaWxsYSBgRXJyb3JgLFxuICAvLyBhIGBzdGFja2AgcGx1cyBgZGVzY3JpcHRpb25gIHByb3BlcnR5OyBpZ25vcmUgdGhvc2UgZm9yIGNvbnNpc3RlbmN5LlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgfHwgKGlzRXJyb3IodmFsdWUpICYmIChcbiAgICAgIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSAnc3RhY2snKSB8fFxuICAgICAgKGtleXMubGVuZ3RoID09PSAyICYmIGtleXNbMF0gPT09ICdkZXNjcmlwdGlvbicgJiYga2V5c1sxXSA9PT0gJ3N0YWNrJylcbiAgICAgKSkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgbmFtZSA9IGdldE5hbWUodmFsdWUpO1xuICAgICAgdmFyIG5hbWVTdWZmaXggPSBuYW1lID8gJzogJyArIG5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWVTdWZmaXggKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBuYW1lID0gZ2V0TmFtZSh2YWx1ZSk7XG4gICAgdmFyIG5hbWVTdWZmaXggPSBuYW1lID8gJzogJyArIG5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbmFtZVN1ZmZpeCArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG5cbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGlmICh2YWx1ZSA9PT0gMCAmJiAoMS92YWx1ZSkgPT09IC1JbmZpbml0eSkge1xuICAgICAgICByZXR1cm4gY3R4LnN0eWxpemUoJy0wJywgJ251bWJlcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIH1cbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHI7XG4gIGlmICh2YWx1ZS5fX2xvb2t1cEdldHRlcl9fKSB7XG4gICAgaWYgKHZhbHVlLl9fbG9va3VwR2V0dGVyX18oa2V5KSkge1xuICAgICAgaWYgKHZhbHVlLl9fbG9va3VwU2V0dGVyX18oa2V5KSkge1xuICAgICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh2YWx1ZS5fX2xvb2t1cFNldHRlcl9fKGtleSkpIHtcbiAgICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHZpc2libGVLZXlzLmluZGV4T2Yoa2V5KSA8IDApIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YodmFsdWVba2V5XSkgPCAwKSB7XG4gICAgICBpZiAocmVjdXJzZVRpbWVzID09PSBudWxsKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgdmFsdWVba2V5XSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlW2tleV0sIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpIHx8XG4gICAgICAgICAodHlwZW9mIGFyID09PSAnb2JqZWN0JyAmJiBvYmplY3RUb1N0cmluZyhhcikgPT09ICdbb2JqZWN0IEFycmF5XScpO1xufVxuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gdHlwZW9mIHJlID09PSAnb2JqZWN0JyAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gdHlwZW9mIGQgPT09ICdvYmplY3QnICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gdHlwZW9mIGUgPT09ICdvYmplY3QnICYmIG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nO1xufVxuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG4iLCIvKiFcbiAqIENoYWkgLSBmbGFnIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIE1vZHVsZSBkZXBlbmRhbmNpZXNcbiAqL1xuXG52YXIgaW5zcGVjdCA9IHJlcXVpcmUoJy4vaW5zcGVjdCcpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xuXG4vKipcbiAqICMjIyAub2JqRGlzcGxheSAob2JqZWN0KVxuICpcbiAqIERldGVybWluZXMgaWYgYW4gb2JqZWN0IG9yIGFuIGFycmF5IG1hdGNoZXNcbiAqIGNyaXRlcmlhIHRvIGJlIGluc3BlY3RlZCBpbi1saW5lIGZvciBlcnJvclxuICogbWVzc2FnZXMgb3Igc2hvdWxkIGJlIHRydW5jYXRlZC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBqYXZhc2NyaXB0IG9iamVjdCB0byBpbnNwZWN0XG4gKiBAbmFtZSBvYmpEaXNwbGF5XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICB2YXIgc3RyID0gaW5zcGVjdChvYmopXG4gICAgLCB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG5cbiAgaWYgKGNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZCAmJiBzdHIubGVuZ3RoID49IGNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZCkge1xuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICByZXR1cm4gIW9iai5uYW1lIHx8IG9iai5uYW1lID09PSAnJ1xuICAgICAgICA/ICdbRnVuY3Rpb25dJ1xuICAgICAgICA6ICdbRnVuY3Rpb246ICcgKyBvYmoubmFtZSArICddJztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybiAnWyBBcnJheSgnICsgb2JqLmxlbmd0aCArICcpIF0nO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKVxuICAgICAgICAsIGtzdHIgPSBrZXlzLmxlbmd0aCA+IDJcbiAgICAgICAgICA/IGtleXMuc3BsaWNlKDAsIDIpLmpvaW4oJywgJykgKyAnLCAuLi4nXG4gICAgICAgICAgOiBrZXlzLmpvaW4oJywgJyk7XG4gICAgICByZXR1cm4gJ3sgT2JqZWN0ICgnICsga3N0ciArICcpIH0nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2QgKGN0eCwgbmFtZSwgZm4pXG4gKlxuICogT3ZlcndpdGVzIGFuIGFscmVhZHkgZXhpc3RpbmcgY2hhaW5hYmxlIG1ldGhvZFxuICogYW5kIHByb3ZpZGVzIGFjY2VzcyB0byB0aGUgcHJldmlvdXMgZnVuY3Rpb24gb3JcbiAqIHByb3BlcnR5LiAgTXVzdCByZXR1cm4gZnVuY3Rpb25zIHRvIGJlIHVzZWQgZm9yXG4gKiBuYW1lLlxuICpcbiAqICAgICB1dGlscy5vdmVyd3JpdGVDaGFpbmFibGVNZXRob2QoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnbGVuZ3RoJyxcbiAqICAgICAgIGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAqICAgICAgIH1cbiAqICAgICAsIGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAqICAgICAgIH1cbiAqICAgICApO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24ub3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kKCdmb28nLCBmbiwgZm4pO1xuICpcbiAqIFRoZW4gY2FuIGJlIHVzZWQgYXMgYW55IG90aGVyIGFzc2VydGlvbi5cbiAqXG4gKiAgICAgZXhwZWN0KG15Rm9vKS50by5oYXZlLmxlbmd0aCgzKTtcbiAqICAgICBleHBlY3QobXlGb28pLnRvLmhhdmUubGVuZ3RoLmFib3ZlKDMpO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHdob3NlIG1ldGhvZCAvIHByb3BlcnR5IGlzIHRvIGJlIG92ZXJ3cml0dGVuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBvZiBtZXRob2QgLyBwcm9wZXJ0eSB0byBvdmVyd3JpdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGFpbmluZ0JlaGF2aW9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIHByb3BlcnR5XG4gKiBAbmFtZSBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBtZXRob2QsIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgdmFyIGNoYWluYWJsZUJlaGF2aW9yID0gY3R4Ll9fbWV0aG9kc1tuYW1lXTtcblxuICB2YXIgX2NoYWluaW5nQmVoYXZpb3IgPSBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yO1xuICBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBjaGFpbmluZ0JlaGF2aW9yKF9jaGFpbmluZ0JlaGF2aW9yKS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IHRoaXMgOiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyIF9tZXRob2QgPSBjaGFpbmFibGVCZWhhdmlvci5tZXRob2Q7XG4gIGNoYWluYWJsZUJlaGF2aW9yLm1ldGhvZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gbWV0aG9kKF9tZXRob2QpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gdGhpcyA6IHJlc3VsdDtcbiAgfTtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBvdmVyd3JpdGVNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIG92ZXJ3cml0ZU1ldGhvZCAoY3R4LCBuYW1lLCBmbilcbiAqXG4gKiBPdmVyd2l0ZXMgYW4gYWxyZWFkeSBleGlzdGluZyBtZXRob2QgYW5kIHByb3ZpZGVzXG4gKiBhY2Nlc3MgdG8gcHJldmlvdXMgZnVuY3Rpb24uIE11c3QgcmV0dXJuIGZ1bmN0aW9uXG4gKiB0byBiZSB1c2VkIGZvciBuYW1lLlxuICpcbiAqICAgICB1dGlscy5vdmVyd3JpdGVNZXRob2QoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnZXF1YWwnLCBmdW5jdGlvbiAoX3N1cGVyKSB7XG4gKiAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0cikge1xuICogICAgICAgICB2YXIgb2JqID0gdXRpbHMuZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gKiAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBGb28pIHtcbiAqICAgICAgICAgICBuZXcgY2hhaS5Bc3NlcnRpb24ob2JqLnZhbHVlKS50by5lcXVhbChzdHIpO1xuICogICAgICAgICB9IGVsc2Uge1xuICogICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICogICAgICAgICB9XG4gKiAgICAgICB9XG4gKiAgICAgfSk7XG4gKlxuICogQ2FuIGFsc28gYmUgYWNjZXNzZWQgZGlyZWN0bHkgZnJvbSBgY2hhaS5Bc3NlcnRpb25gLlxuICpcbiAqICAgICBjaGFpLkFzc2VydGlvbi5vdmVyd3JpdGVNZXRob2QoJ2ZvbycsIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChteUZvbykudG8uZXF1YWwoJ2JhcicpO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHdob3NlIG1ldGhvZCBpcyB0byBiZSBvdmVyd3JpdHRlblxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgbWV0aG9kIHRvIG92ZXJ3cml0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIG5hbWVcbiAqIEBuYW1lIG92ZXJ3cml0ZU1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjdHgsIG5hbWUsIG1ldGhvZCkge1xuICB2YXIgX21ldGhvZCA9IGN0eFtuYW1lXVxuICAgICwgX3N1cGVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxuICBpZiAoX21ldGhvZCAmJiAnZnVuY3Rpb24nID09PSB0eXBlb2YgX21ldGhvZClcbiAgICBfc3VwZXIgPSBfbWV0aG9kO1xuXG4gIGN0eFtuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gbWV0aG9kKF9zdXBlcikuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyB0aGlzIDogcmVzdWx0O1xuICB9XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gb3ZlcndyaXRlUHJvcGVydHkgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIG92ZXJ3cml0ZVByb3BlcnR5IChjdHgsIG5hbWUsIGZuKVxuICpcbiAqIE92ZXJ3aXRlcyBhbiBhbHJlYWR5IGV4aXN0aW5nIHByb3BlcnR5IGdldHRlciBhbmQgcHJvdmlkZXNcbiAqIGFjY2VzcyB0byBwcmV2aW91cyB2YWx1ZS4gTXVzdCByZXR1cm4gZnVuY3Rpb24gdG8gdXNlIGFzIGdldHRlci5cbiAqXG4gKiAgICAgdXRpbHMub3ZlcndyaXRlUHJvcGVydHkoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnb2snLCBmdW5jdGlvbiAoX3N1cGVyKSB7XG4gKiAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICogICAgICAgICB2YXIgb2JqID0gdXRpbHMuZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gKiAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBGb28pIHtcbiAqICAgICAgICAgICBuZXcgY2hhaS5Bc3NlcnRpb24ob2JqLm5hbWUpLnRvLmVxdWFsKCdiYXInKTtcbiAqICAgICAgICAgfSBlbHNlIHtcbiAqICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAqICAgICAgICAgfVxuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqXG4gKiBDYW4gYWxzbyBiZSBhY2Nlc3NlZCBkaXJlY3RseSBmcm9tIGBjaGFpLkFzc2VydGlvbmAuXG4gKlxuICogICAgIGNoYWkuQXNzZXJ0aW9uLm92ZXJ3cml0ZVByb3BlcnR5KCdmb28nLCBmbik7XG4gKlxuICogVGhlbiBjYW4gYmUgdXNlZCBhcyBhbnkgb3RoZXIgYXNzZXJ0aW9uLlxuICpcbiAqICAgICBleHBlY3QobXlGb28pLnRvLmJlLm9rO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHdob3NlIHByb3BlcnR5IGlzIHRvIGJlIG92ZXJ3cml0dGVuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBvZiBwcm9wZXJ0eSB0byBvdmVyd3JpdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGdldHRlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBnZXR0ZXIgZnVuY3Rpb24gdG8gYmUgdXNlZCBmb3IgbmFtZVxuICogQG5hbWUgb3ZlcndyaXRlUHJvcGVydHlcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBnZXR0ZXIpIHtcbiAgdmFyIF9nZXQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGN0eCwgbmFtZSlcbiAgICAsIF9zdXBlciA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gIGlmIChfZ2V0ICYmICdmdW5jdGlvbicgPT09IHR5cGVvZiBfZ2V0LmdldClcbiAgICBfc3VwZXIgPSBfZ2V0LmdldFxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIG5hbWUsXG4gICAgeyBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGdldHRlcihfc3VwZXIpLmNhbGwodGhpcyk7XG4gICAgICAgIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICB9XG4gICAgLCBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gdGVzdCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBNb2R1bGUgZGVwZW5kYW5jaWVzXG4gKi9cblxudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcblxuLyoqXG4gKiAjIHRlc3Qob2JqZWN0LCBleHByZXNzaW9uKVxuICpcbiAqIFRlc3QgYW5kIG9iamVjdCBmb3IgZXhwcmVzc2lvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IChjb25zdHJ1Y3RlZCBBc3NlcnRpb24pXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCBhcmd1bWVudHNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIGFyZ3MpIHtcbiAgdmFyIG5lZ2F0ZSA9IGZsYWcob2JqLCAnbmVnYXRlJylcbiAgICAsIGV4cHIgPSBhcmdzWzBdO1xuICByZXR1cm4gbmVnYXRlID8gIWV4cHIgOiBleHByO1xufTtcbiIsIi8qIVxuICogQ2hhaSAtIHRyYW5zZmVyRmxhZ3MgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIHRyYW5zZmVyRmxhZ3MoYXNzZXJ0aW9uLCBvYmplY3QsIGluY2x1ZGVBbGwgPSB0cnVlKVxuICpcbiAqIFRyYW5zZmVyIGFsbCB0aGUgZmxhZ3MgZm9yIGBhc3NlcnRpb25gIHRvIGBvYmplY3RgLiBJZlxuICogYGluY2x1ZGVBbGxgIGlzIHNldCB0byBgZmFsc2VgLCB0aGVuIHRoZSBiYXNlIENoYWlcbiAqIGFzc2VydGlvbiBmbGFncyAobmFtZWx5IGBvYmplY3RgLCBgc3NmaWAsIGFuZCBgbWVzc2FnZWApXG4gKiB3aWxsIG5vdCBiZSB0cmFuc2ZlcnJlZC5cbiAqXG4gKlxuICogICAgIHZhciBuZXdBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKCk7XG4gKiAgICAgdXRpbHMudHJhbnNmZXJGbGFncyhhc3NlcnRpb24sIG5ld0Fzc2VydGlvbik7XG4gKlxuICogICAgIHZhciBhbm90aGVyQXNzZXJpdG9uID0gbmV3IEFzc2VydGlvbihteU9iaik7XG4gKiAgICAgdXRpbHMudHJhbnNmZXJGbGFncyhhc3NlcnRpb24sIGFub3RoZXJBc3NlcnRpb24sIGZhbHNlKTtcbiAqXG4gKiBAcGFyYW0ge0Fzc2VydGlvbn0gYXNzZXJ0aW9uIHRoZSBhc3NlcnRpb24gdG8gdHJhbnNmZXIgdGhlIGZsYWdzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdGhlIG9iamVjdCB0byB0cmFuc2ZlciB0aGUgZmxhZ3MgdG9vOyB1c3VhbGx5IGEgbmV3IGFzc2VydGlvblxuICogQHBhcmFtIHtCb29sZWFufSBpbmNsdWRlQWxsXG4gKiBAbmFtZSBnZXRBbGxGbGFnc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXNzZXJ0aW9uLCBvYmplY3QsIGluY2x1ZGVBbGwpIHtcbiAgdmFyIGZsYWdzID0gYXNzZXJ0aW9uLl9fZmxhZ3MgfHwgKGFzc2VydGlvbi5fX2ZsYWdzID0gT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbiAgaWYgKCFvYmplY3QuX19mbGFncykge1xuICAgIG9iamVjdC5fX2ZsYWdzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuXG4gIGluY2x1ZGVBbGwgPSBhcmd1bWVudHMubGVuZ3RoID09PSAzID8gaW5jbHVkZUFsbCA6IHRydWU7XG5cbiAgZm9yICh2YXIgZmxhZyBpbiBmbGFncykge1xuICAgIGlmIChpbmNsdWRlQWxsIHx8XG4gICAgICAgIChmbGFnICE9PSAnb2JqZWN0JyAmJiBmbGFnICE9PSAnc3NmaScgJiYgZmxhZyAhPSAnbWVzc2FnZScpKSB7XG4gICAgICBvYmplY3QuX19mbGFnc1tmbGFnXSA9IGZsYWdzW2ZsYWddO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qIVxuICogQ2hhaSAtIHR5cGUgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogRGV0ZWN0YWJsZSBqYXZhc2NyaXB0IG5hdGl2ZXNcbiAqL1xuXG52YXIgbmF0aXZlcyA9IHtcbiAgICAnW29iamVjdCBBcmd1bWVudHNdJzogJ2FyZ3VtZW50cydcbiAgLCAnW29iamVjdCBBcnJheV0nOiAnYXJyYXknXG4gICwgJ1tvYmplY3QgRGF0ZV0nOiAnZGF0ZSdcbiAgLCAnW29iamVjdCBGdW5jdGlvbl0nOiAnZnVuY3Rpb24nXG4gICwgJ1tvYmplY3QgTnVtYmVyXSc6ICdudW1iZXInXG4gICwgJ1tvYmplY3QgUmVnRXhwXSc6ICdyZWdleHAnXG4gICwgJ1tvYmplY3QgU3RyaW5nXSc6ICdzdHJpbmcnXG59O1xuXG4vKipcbiAqICMjIyB0eXBlKG9iamVjdClcbiAqXG4gKiBCZXR0ZXIgaW1wbGVtZW50YXRpb24gb2YgYHR5cGVvZmAgZGV0ZWN0aW9uIHRoYXQgY2FuXG4gKiBiZSB1c2VkIGNyb3NzLWJyb3dzZXIuIEhhbmRsZXMgdGhlIGluY29uc2lzdGVuY2llcyBvZlxuICogQXJyYXksIGBudWxsYCwgYW5kIGB1bmRlZmluZWRgIGRldGVjdGlvbi5cbiAqXG4gKiAgICAgdXRpbHMudHlwZSh7fSkgLy8gJ29iamVjdCdcbiAqICAgICB1dGlscy50eXBlKG51bGwpIC8vIGBudWxsJ1xuICogICAgIHV0aWxzLnR5cGUodW5kZWZpbmVkKSAvLyBgdW5kZWZpbmVkYFxuICogICAgIHV0aWxzLnR5cGUoW10pIC8vIGBhcnJheWBcbiAqXG4gKiBAcGFyYW0ge01peGVkfSBvYmplY3QgdG8gZGV0ZWN0IHR5cGUgb2ZcbiAqIEBuYW1lIHR5cGVcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICB2YXIgc3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG4gIGlmIChuYXRpdmVzW3N0cl0pIHJldHVybiBuYXRpdmVzW3N0cl07XG4gIGlmIChvYmogPT09IG51bGwpIHJldHVybiAnbnVsbCc7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuICd1bmRlZmluZWQnO1xuICBpZiAob2JqID09PSBPYmplY3Qob2JqKSkgcmV0dXJuICdvYmplY3QnO1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn07XG4iLCIvKiFcbiAqIGFzc2VydGlvbi1lcnJvclxuICogQ29weXJpZ2h0KGMpIDIwMTMgSmFrZSBMdWVyIDxqYWtlQHF1YWxpYW5jeS5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogb25lIG9iamVjdCB0byBhbm90aGVyIGV4Y2x1ZGluZyBhbnkgb3JpZ2luYWxseVxuICogbGlzdGVkLiBSZXR1cm5lZCBmdW5jdGlvbiB3aWxsIGNyZWF0ZSBhIG5ldyBge31gLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBleGNsdWRlZCBwcm9wZXJ0aWVzIC4uLlxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cblxuZnVuY3Rpb24gZXhjbHVkZSAoKSB7XG4gIHZhciBleGNsdWRlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICBmdW5jdGlvbiBleGNsdWRlUHJvcHMgKHJlcywgb2JqKSB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICghfmV4Y2x1ZGVzLmluZGV4T2Yoa2V5KSkgcmVzW2tleV0gPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBleHRlbmRFeGNsdWRlICgpIHtcbiAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgICAgLCBpID0gMFxuICAgICAgLCByZXMgPSB7fTtcblxuICAgIGZvciAoOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgZXhjbHVkZVByb3BzKHJlcywgYXJnc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbn07XG5cbi8qIVxuICogUHJpbWFyeSBFeHBvcnRzXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBBc3NlcnRpb25FcnJvcjtcblxuLyoqXG4gKiAjIyMgQXNzZXJ0aW9uRXJyb3JcbiAqXG4gKiBBbiBleHRlbnNpb24gb2YgdGhlIEphdmFTY3JpcHQgYEVycm9yYCBjb25zdHJ1Y3RvciBmb3JcbiAqIGFzc2VydGlvbiBhbmQgdmFsaWRhdGlvbiBzY2VuYXJpb3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIHRvIGluY2x1ZGUgKG9wdGlvbmFsKVxuICogQHBhcmFtIHtjYWxsZWV9IHN0YXJ0IHN0YWNrIGZ1bmN0aW9uIChvcHRpb25hbClcbiAqL1xuXG5mdW5jdGlvbiBBc3NlcnRpb25FcnJvciAobWVzc2FnZSwgX3Byb3BzLCBzc2YpIHtcbiAgdmFyIGV4dGVuZCA9IGV4Y2x1ZGUoJ25hbWUnLCAnbWVzc2FnZScsICdzdGFjaycsICdjb25zdHJ1Y3RvcicsICd0b0pTT04nKVxuICAgICwgcHJvcHMgPSBleHRlbmQoX3Byb3BzIHx8IHt9KTtcblxuICAvLyBkZWZhdWx0IHZhbHVlc1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8ICdVbnNwZWNpZmllZCBBc3NlcnRpb25FcnJvcic7XG4gIHRoaXMuc2hvd0RpZmYgPSBmYWxzZTtcblxuICAvLyBjb3B5IGZyb20gcHJvcGVydGllc1xuICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICB0aGlzW2tleV0gPSBwcm9wc1trZXldO1xuICB9XG5cbiAgLy8gY2FwdHVyZSBzdGFjayB0cmFjZVxuICBzc2YgPSBzc2YgfHwgYXJndW1lbnRzLmNhbGxlZTtcbiAgaWYgKHNzZiAmJiBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHNzZik7XG4gIH1cbn1cblxuLyohXG4gKiBJbmhlcml0IGZyb20gRXJyb3IucHJvdG90eXBlXG4gKi9cblxuQXNzZXJ0aW9uRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuXG4vKiFcbiAqIFN0YXRpY2FsbHkgc2V0IG5hbWVcbiAqL1xuXG5Bc3NlcnRpb25FcnJvci5wcm90b3R5cGUubmFtZSA9ICdBc3NlcnRpb25FcnJvcic7XG5cbi8qIVxuICogRW5zdXJlIGNvcnJlY3QgY29uc3RydWN0b3JcbiAqL1xuXG5Bc3NlcnRpb25FcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBc3NlcnRpb25FcnJvcjtcblxuLyoqXG4gKiBBbGxvdyBlcnJvcnMgdG8gYmUgY29udmVydGVkIHRvIEpTT04gZm9yIHN0YXRpYyB0cmFuc2Zlci5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGluY2x1ZGUgc3RhY2sgKGRlZmF1bHQ6IGB0cnVlYClcbiAqIEByZXR1cm4ge09iamVjdH0gb2JqZWN0IHRoYXQgY2FuIGJlIGBKU09OLnN0cmluZ2lmeWBcbiAqL1xuXG5Bc3NlcnRpb25FcnJvci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKHN0YWNrKSB7XG4gIHZhciBleHRlbmQgPSBleGNsdWRlKCdjb25zdHJ1Y3RvcicsICd0b0pTT04nLCAnc3RhY2snKVxuICAgICwgcHJvcHMgPSBleHRlbmQoeyBuYW1lOiB0aGlzLm5hbWUgfSwgdGhpcyk7XG5cbiAgLy8gaW5jbHVkZSBzdGFjayBpZiBleGlzdHMgYW5kIG5vdCB0dXJuZWQgb2ZmXG4gIGlmIChmYWxzZSAhPT0gc3RhY2sgJiYgdGhpcy5zdGFjaykge1xuICAgIHByb3BzLnN0YWNrID0gdGhpcy5zdGFjaztcbiAgfVxuXG4gIHJldHVybiBwcm9wcztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2VxbCcpO1xuIiwiLyohXG4gKiBkZWVwLWVxbFxuICogQ29weXJpZ2h0KGMpIDIwMTMgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgdHlwZSA9IHJlcXVpcmUoJ3R5cGUtZGV0ZWN0Jyk7XG5cbi8qIVxuICogQnVmZmVyLmlzQnVmZmVyIGJyb3dzZXIgc2hpbVxuICovXG5cbnZhciBCdWZmZXI7XG50cnkgeyBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7IH1cbmNhdGNoKGV4KSB7XG4gIEJ1ZmZlciA9IHt9O1xuICBCdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9XG59XG5cbi8qIVxuICogUHJpbWFyeSBFeHBvcnRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZXBFcXVhbDtcblxuLyoqXG4gKiBBc3NlcnQgc3VwZXItc3RyaWN0IChlZ2FsKSBlcXVhbGl0eSBiZXR3ZWVuXG4gKiB0d28gb2JqZWN0cyBvZiBhbnkgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBhXG4gKiBAcGFyYW0ge01peGVkfSBiXG4gKiBAcGFyYW0ge0FycmF5fSBtZW1vaXNlZCAob3B0aW9uYWwpXG4gKiBAcmV0dXJuIHtCb29sZWFufSBlcXVhbCBtYXRjaFxuICovXG5cbmZ1bmN0aW9uIGRlZXBFcXVhbChhLCBiLCBtKSB7XG4gIGlmIChzYW1lVmFsdWUoYSwgYikpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICgnZGF0ZScgPT09IHR5cGUoYSkpIHtcbiAgICByZXR1cm4gZGF0ZUVxdWFsKGEsIGIpO1xuICB9IGVsc2UgaWYgKCdyZWdleHAnID09PSB0eXBlKGEpKSB7XG4gICAgcmV0dXJuIHJlZ2V4cEVxdWFsKGEsIGIpO1xuICB9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihhKSkge1xuICAgIHJldHVybiBidWZmZXJFcXVhbChhLCBiKTtcbiAgfSBlbHNlIGlmICgnYXJndW1lbnRzJyA9PT0gdHlwZShhKSkge1xuICAgIHJldHVybiBhcmd1bWVudHNFcXVhbChhLCBiLCBtKTtcbiAgfSBlbHNlIGlmICghdHlwZUVxdWFsKGEsIGIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKCgnb2JqZWN0JyAhPT0gdHlwZShhKSAmJiAnb2JqZWN0JyAhPT0gdHlwZShiKSlcbiAgJiYgKCdhcnJheScgIT09IHR5cGUoYSkgJiYgJ2FycmF5JyAhPT0gdHlwZShiKSkpIHtcbiAgICByZXR1cm4gc2FtZVZhbHVlKGEsIGIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmplY3RFcXVhbChhLCBiLCBtKTtcbiAgfVxufVxuXG4vKiFcbiAqIFN0cmljdCAoZWdhbCkgZXF1YWxpdHkgdGVzdC4gRW5zdXJlcyB0aGF0IE5hTiBhbHdheXNcbiAqIGVxdWFscyBOYU4gYW5kIGAtMGAgZG9lcyBub3QgZXF1YWwgYCswYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBhXG4gKiBAcGFyYW0ge01peGVkfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufSBlcXVhbCBtYXRjaFxuICovXG5cbmZ1bmN0aW9uIHNhbWVWYWx1ZShhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gYSAhPT0gMCB8fCAxIC8gYSA9PT0gMSAvIGI7XG4gIHJldHVybiBhICE9PSBhICYmIGIgIT09IGI7XG59XG5cbi8qIVxuICogQ29tcGFyZSB0aGUgdHlwZXMgb2YgdHdvIGdpdmVuIG9iamVjdHMgYW5kXG4gKiByZXR1cm4gaWYgdGhleSBhcmUgZXF1YWwuIE5vdGUgdGhhdCBhbiBBcnJheVxuICogaGFzIGEgdHlwZSBvZiBgYXJyYXlgIChub3QgYG9iamVjdGApIGFuZCBhcmd1bWVudHNcbiAqIGhhdmUgYSB0eXBlIG9mIGBhcmd1bWVudHNgIChub3QgYGFycmF5YC9gb2JqZWN0YCkuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gYVxuICogQHBhcmFtIHtNaXhlZH0gYlxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKi9cblxuZnVuY3Rpb24gdHlwZUVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIHR5cGUoYSkgPT09IHR5cGUoYik7XG59XG5cbi8qIVxuICogQ29tcGFyZSB0d28gRGF0ZSBvYmplY3RzIGJ5IGFzc2VydGluZyB0aGF0XG4gKiB0aGUgdGltZSB2YWx1ZXMgYXJlIGVxdWFsIHVzaW5nIGBzYXZlVmFsdWVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gYVxuICogQHBhcmFtIHtEYXRlfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuXG5mdW5jdGlvbiBkYXRlRXF1YWwoYSwgYikge1xuICBpZiAoJ2RhdGUnICE9PSB0eXBlKGIpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBzYW1lVmFsdWUoYS5nZXRUaW1lKCksIGIuZ2V0VGltZSgpKTtcbn1cblxuLyohXG4gKiBDb21wYXJlIHR3byByZWd1bGFyIGV4cHJlc3Npb25zIGJ5IGNvbnZlcnRpbmcgdGhlbVxuICogdG8gc3RyaW5nIGFuZCBjaGVja2luZyBmb3IgYHNhbWVWYWx1ZWAuXG4gKlxuICogQHBhcmFtIHtSZWdFeHB9IGFcbiAqIEBwYXJhbSB7UmVnRXhwfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuXG5mdW5jdGlvbiByZWdleHBFcXVhbChhLCBiKSB7XG4gIGlmICgncmVnZXhwJyAhPT0gdHlwZShiKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gc2FtZVZhbHVlKGEudG9TdHJpbmcoKSwgYi50b1N0cmluZygpKTtcbn1cblxuLyohXG4gKiBBc3NlcnQgZGVlcCBlcXVhbGl0eSBvZiB0d28gYGFyZ3VtZW50c2Agb2JqZWN0cy5cbiAqIFVuZm9ydHVuYXRlbHksIHRoZXNlIG11c3QgYmUgc2xpY2VkIHRvIGFycmF5c1xuICogcHJpb3IgdG8gdGVzdCB0byBlbnN1cmUgbm8gYmFkIGJlaGF2aW9yLlxuICpcbiAqIEBwYXJhbSB7QXJndW1lbnRzfSBhXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gYlxuICogQHBhcmFtIHtBcnJheX0gbWVtb2l6ZSAob3B0aW9uYWwpXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuXG5mdW5jdGlvbiBhcmd1bWVudHNFcXVhbChhLCBiLCBtKSB7XG4gIGlmICgnYXJndW1lbnRzJyAhPT0gdHlwZShiKSkgcmV0dXJuIGZhbHNlO1xuICBhID0gW10uc2xpY2UuY2FsbChhKTtcbiAgYiA9IFtdLnNsaWNlLmNhbGwoYik7XG4gIHJldHVybiBkZWVwRXF1YWwoYSwgYiwgbSk7XG59XG5cbi8qIVxuICogR2V0IGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBhIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHJldHVybiB7QXJyYXl9IHByb3BlcnR5IG5hbWVzXG4gKi9cblxuZnVuY3Rpb24gZW51bWVyYWJsZShhKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIGEpIHJlcy5wdXNoKGtleSk7XG4gIHJldHVybiByZXM7XG59XG5cbi8qIVxuICogU2ltcGxlIGVxdWFsaXR5IGZvciBmbGF0IGl0ZXJhYmxlIG9iamVjdHNcbiAqIHN1Y2ggYXMgQXJyYXlzIG9yIE5vZGUuanMgYnVmZmVycy5cbiAqXG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBhXG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuXG5mdW5jdGlvbiBpdGVyYWJsZUVxdWFsKGEsIGIpIHtcbiAgaWYgKGEubGVuZ3RoICE9PSAgYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICB2YXIgaSA9IDA7XG4gIHZhciBtYXRjaCA9IHRydWU7XG5cbiAgZm9yICg7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIG1hdGNoID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWF0Y2g7XG59XG5cbi8qIVxuICogRXh0ZW5zaW9uIHRvIGBpdGVyYWJsZUVxdWFsYCBzcGVjaWZpY2FsbHlcbiAqIGZvciBOb2RlLmpzIEJ1ZmZlcnMuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGFcbiAqIEBwYXJhbSB7TWl4ZWR9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5cbmZ1bmN0aW9uIGJ1ZmZlckVxdWFsKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwoYSwgYik7XG59XG5cbi8qIVxuICogQmxvY2sgZm9yIGBvYmplY3RFcXVhbGAgZW5zdXJpbmcgbm9uLWV4aXN0aW5nXG4gKiB2YWx1ZXMgZG9uJ3QgZ2V0IGluLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKi9cblxuZnVuY3Rpb24gaXNWYWx1ZShhKSB7XG4gIHJldHVybiBhICE9PSBudWxsICYmIGEgIT09IHVuZGVmaW5lZDtcbn1cblxuLyohXG4gKiBSZWN1cnNpdmVseSBjaGVjayB0aGUgZXF1YWxpdHkgb2YgdHdvIG9iamVjdHMuXG4gKiBPbmNlIGJhc2ljIHNhbWVuZXNzIGhhcyBiZWVuIGVzdGFibGlzaGVkIGl0IHdpbGxcbiAqIGRlZmVyIHRvIGBkZWVwRXF1YWxgIGZvciBlYWNoIGVudW1lcmFibGUga2V5XG4gKiBpbiB0aGUgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGFcbiAqIEBwYXJhbSB7TWl4ZWR9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5cbmZ1bmN0aW9uIG9iamVjdEVxdWFsKGEsIGIsIG0pIHtcbiAgaWYgKCFpc1ZhbHVlKGEpIHx8ICFpc1ZhbHVlKGIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBpO1xuICBpZiAobSkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoKG1baV1bMF0gPT09IGEgJiYgbVtpXVsxXSA9PT0gYilcbiAgICAgIHx8ICAobVtpXVswXSA9PT0gYiAmJiBtW2ldWzFdID09PSBhKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbSA9IFtdO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB2YXIga2EgPSBlbnVtZXJhYmxlKGEpO1xuICAgIHZhciBrYiA9IGVudW1lcmFibGUoYik7XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG5cbiAgaWYgKCFpdGVyYWJsZUVxdWFsKGthLCBrYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBtLnB1c2goWyBhLCBiIF0pO1xuXG4gIHZhciBrZXk7XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL3R5cGUnKTtcbiIsIi8qIVxuICogdHlwZS1kZXRlY3RcbiAqIENvcHlyaWdodChjKSAyMDEzIGpha2UgbHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBQcmltYXJ5IEV4cG9ydHNcbiAqL1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZ2V0VHlwZTtcblxuLyohXG4gKiBEZXRlY3RhYmxlIGphdmFzY3JpcHQgbmF0aXZlc1xuICovXG5cbnZhciBuYXRpdmVzID0ge1xuICAgICdbb2JqZWN0IEFycmF5XSc6ICdhcnJheSdcbiAgLCAnW29iamVjdCBSZWdFeHBdJzogJ3JlZ2V4cCdcbiAgLCAnW29iamVjdCBGdW5jdGlvbl0nOiAnZnVuY3Rpb24nXG4gICwgJ1tvYmplY3QgQXJndW1lbnRzXSc6ICdhcmd1bWVudHMnXG4gICwgJ1tvYmplY3QgRGF0ZV0nOiAnZGF0ZSdcbn07XG5cbi8qKlxuICogIyMjIHR5cGVPZiAob2JqKVxuICpcbiAqIFVzZSBzZXZlcmFsIGRpZmZlcmVudCB0ZWNobmlxdWVzIHRvIGRldGVybWluZVxuICogdGhlIHR5cGUgb2Ygb2JqZWN0IGJlaW5nIHRlc3RlZC5cbiAqXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtTdHJpbmd9IG9iamVjdCB0eXBlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGdldFR5cGUgKG9iaikge1xuICB2YXIgc3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG4gIGlmIChuYXRpdmVzW3N0cl0pIHJldHVybiBuYXRpdmVzW3N0cl07XG4gIGlmIChvYmogPT09IG51bGwpIHJldHVybiAnbnVsbCc7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuICd1bmRlZmluZWQnO1xuICBpZiAob2JqID09PSBPYmplY3Qob2JqKSkgcmV0dXJuICdvYmplY3QnO1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn1cblxuZXhwb3J0cy5MaWJyYXJ5ID0gTGlicmFyeTtcblxuLyoqXG4gKiAjIyMgTGlicmFyeVxuICpcbiAqIENyZWF0ZSBhIHJlcG9zaXRvcnkgZm9yIGN1c3RvbSB0eXBlIGRldGVjdGlvbi5cbiAqXG4gKiBgYGBqc1xuICogdmFyIGxpYiA9IG5ldyB0eXBlLkxpYnJhcnk7XG4gKiBgYGBcbiAqXG4gKi9cblxuZnVuY3Rpb24gTGlicmFyeSAoKSB7XG4gIHRoaXMudGVzdHMgPSB7fTtcbn1cblxuLyoqXG4gKiAjIyMjIC5vZiAob2JqKVxuICpcbiAqIEV4cG9zZSByZXBsYWNlbWVudCBgdHlwZW9mYCBkZXRlY3Rpb24gdG8gdGhlIGxpYnJhcnkuXG4gKlxuICogYGBganNcbiAqIGlmICgnc3RyaW5nJyA9PT0gbGliLm9mKCdoZWxsbyB3b3JsZCcpKSB7XG4gKiAgIC8vIC4uLlxuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0IHRvIHRlc3RcbiAqIEByZXR1cm4ge1N0cmluZ30gdHlwZVxuICovXG5cbkxpYnJhcnkucHJvdG90eXBlLm9mID0gZ2V0VHlwZTtcblxuLyoqXG4gKiAjIyMjIC5kZWZpbmUgKHR5cGUsIHRlc3QpXG4gKlxuICogQWRkIGEgdGVzdCB0byBmb3IgdGhlIGAudGVzdCgpYCBhc3NlcnRpb24uXG4gKlxuICogQ2FuIGJlIGRlZmluZWQgYXMgYSByZWd1bGFyIGV4cHJlc3Npb246XG4gKlxuICogYGBganNcbiAqIGxpYi5kZWZpbmUoJ2ludCcsIC9eWzAtOV0rJC8pO1xuICogYGBgXG4gKlxuICogLi4uIG9yIGFzIGEgZnVuY3Rpb246XG4gKlxuICogYGBganNcbiAqIGxpYi5kZWZpbmUoJ2JsbicsIGZ1bmN0aW9uIChvYmopIHtcbiAqICAgaWYgKCdib29sZWFuJyA9PT0gbGliLm9mKG9iaikpIHJldHVybiB0cnVlO1xuICogICB2YXIgYmxucyA9IFsgJ3llcycsICdubycsICd0cnVlJywgJ2ZhbHNlJywgMSwgMCBdO1xuICogICBpZiAoJ3N0cmluZycgPT09IGxpYi5vZihvYmopKSBvYmogPSBvYmoudG9Mb3dlckNhc2UoKTtcbiAqICAgcmV0dXJuICEhIH5ibG5zLmluZGV4T2Yob2JqKTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7UmVnRXhwfEZ1bmN0aW9ufSB0ZXN0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkxpYnJhcnkucHJvdG90eXBlLmRlZmluZSA9IGZ1bmN0aW9uICh0eXBlLCB0ZXN0KSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSByZXR1cm4gdGhpcy50ZXN0c1t0eXBlXTtcbiAgdGhpcy50ZXN0c1t0eXBlXSA9IHRlc3Q7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiAjIyMjIC50ZXN0IChvYmosIHRlc3QpXG4gKlxuICogQXNzZXJ0IHRoYXQgYW4gb2JqZWN0IGlzIG9mIHR5cGUuIFdpbGwgZmlyc3RcbiAqIGNoZWNrIG5hdGl2ZXMsIGFuZCBpZiB0aGF0IGRvZXMgbm90IHBhc3MgaXQgd2lsbFxuICogdXNlIHRoZSB1c2VyIGRlZmluZWQgY3VzdG9tIHRlc3RzLlxuICpcbiAqIGBgYGpzXG4gKiBhc3NlcnQobGliLnRlc3QoJzEnLCAnaW50JykpO1xuICogYXNzZXJ0KGxpYi50ZXN0KCd5ZXMnLCAnYmxuJykpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkxpYnJhcnkucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbiAob2JqLCB0eXBlKSB7XG4gIGlmICh0eXBlID09PSBnZXRUeXBlKG9iaikpIHJldHVybiB0cnVlO1xuICB2YXIgdGVzdCA9IHRoaXMudGVzdHNbdHlwZV07XG5cbiAgaWYgKHRlc3QgJiYgJ3JlZ2V4cCcgPT09IGdldFR5cGUodGVzdCkpIHtcbiAgICByZXR1cm4gdGVzdC50ZXN0KG9iaik7XG4gIH0gZWxzZSBpZiAodGVzdCAmJiAnZnVuY3Rpb24nID09PSBnZXRUeXBlKHRlc3QpKSB7XG4gICAgcmV0dXJuIHRlc3Qob2JqKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1R5cGUgdGVzdCBcIicgKyB0eXBlICsgJ1wiIG5vdCBkZWZpbmVkIG9yIGludmFsaWQuJyk7XG4gIH1cbn07XG4iLCIoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKGdsb2JhbC4kdHJhY2V1clJ1bnRpbWUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyICRPYmplY3QgPSBPYmplY3Q7XG4gIHZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuICB2YXIgJGNyZWF0ZSA9ICRPYmplY3QuY3JlYXRlO1xuICB2YXIgJGRlZmluZVByb3BlcnRpZXMgPSAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXM7XG4gIHZhciAkZGVmaW5lUHJvcGVydHkgPSAkT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGZyZWV6ZSA9ICRPYmplY3QuZnJlZXplO1xuICB2YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICB2YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG4gIHZhciAka2V5cyA9ICRPYmplY3Qua2V5cztcbiAgdmFyICRoYXNPd25Qcm9wZXJ0eSA9ICRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgJHRvU3RyaW5nID0gJE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciAkcHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG4gIHZhciAkc2VhbCA9IE9iamVjdC5zZWFsO1xuICB2YXIgJGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG4gIGZ1bmN0aW9uIG5vbkVudW0odmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH07XG4gIH1cbiAgdmFyIG1ldGhvZCA9IG5vbkVudW07XG4gIHZhciBjb3VudGVyID0gMDtcbiAgZnVuY3Rpb24gbmV3VW5pcXVlU3RyaW5nKCkge1xuICAgIHJldHVybiAnX18kJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDFlOSkgKyAnJCcgKyArK2NvdW50ZXIgKyAnJF9fJztcbiAgfVxuICB2YXIgc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eSA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICB2YXIgc3ltYm9sRGVzY3JpcHRpb25Qcm9wZXJ0eSA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICB2YXIgc3ltYm9sRGF0YVByb3BlcnR5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gIHZhciBzeW1ib2xWYWx1ZXMgPSAkY3JlYXRlKG51bGwpO1xuICB2YXIgcHJpdmF0ZU5hbWVzID0gJGNyZWF0ZShudWxsKTtcbiAgZnVuY3Rpb24gaXNQcml2YXRlTmFtZShzKSB7XG4gICAgcmV0dXJuIHByaXZhdGVOYW1lc1tzXTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVQcml2YXRlTmFtZSgpIHtcbiAgICB2YXIgcyA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICAgIHByaXZhdGVOYW1lc1tzXSA9IHRydWU7XG4gICAgcmV0dXJuIHM7XG4gIH1cbiAgZnVuY3Rpb24gaXNTaGltU3ltYm9sKHN5bWJvbCkge1xuICAgIHJldHVybiB0eXBlb2Ygc3ltYm9sID09PSAnb2JqZWN0JyAmJiBzeW1ib2wgaW5zdGFuY2VvZiBTeW1ib2xWYWx1ZTtcbiAgfVxuICBmdW5jdGlvbiB0eXBlT2Yodikge1xuICAgIGlmIChpc1NoaW1TeW1ib2wodikpXG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgcmV0dXJuIHR5cGVvZiB2O1xuICB9XG4gIGZ1bmN0aW9uIFN5bWJvbChkZXNjcmlwdGlvbikge1xuICAgIHZhciB2YWx1ZSA9IG5ldyBTeW1ib2xWYWx1ZShkZXNjcmlwdGlvbik7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFN5bWJvbCkpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU3ltYm9sIGNhbm5vdCBiZSBuZXdcXCdlZCcpO1xuICB9XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2wucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCBub25FbnVtKFN5bWJvbCkpO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgbWV0aG9kKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzeW1ib2xWYWx1ZSA9IHRoaXNbc3ltYm9sRGF0YVByb3BlcnR5XTtcbiAgICBpZiAoIWdldE9wdGlvbignc3ltYm9scycpKVxuICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIGlmICghc3ltYm9sVmFsdWUpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0NvbnZlcnNpb24gZnJvbSBzeW1ib2wgdG8gc3RyaW5nJyk7XG4gICAgdmFyIGRlc2MgPSBzeW1ib2xWYWx1ZVtzeW1ib2xEZXNjcmlwdGlvblByb3BlcnR5XTtcbiAgICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKVxuICAgICAgZGVzYyA9ICcnO1xuICAgIHJldHVybiAnU3ltYm9sKCcgKyBkZXNjICsgJyknO1xuICB9KSk7XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2wucHJvdG90eXBlLCAndmFsdWVPZicsIG1ldGhvZChmdW5jdGlvbigpIHtcbiAgICB2YXIgc3ltYm9sVmFsdWUgPSB0aGlzW3N5bWJvbERhdGFQcm9wZXJ0eV07XG4gICAgaWYgKCFzeW1ib2xWYWx1ZSlcbiAgICAgIHRocm93IFR5cGVFcnJvcignQ29udmVyc2lvbiBmcm9tIHN5bWJvbCB0byBzdHJpbmcnKTtcbiAgICBpZiAoIWdldE9wdGlvbignc3ltYm9scycpKVxuICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIHJldHVybiBzeW1ib2xWYWx1ZTtcbiAgfSkpO1xuICBmdW5jdGlvbiBTeW1ib2xWYWx1ZShkZXNjcmlwdGlvbikge1xuICAgIHZhciBrZXkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgICAkZGVmaW5lUHJvcGVydHkodGhpcywgc3ltYm9sRGF0YVByb3BlcnR5LCB7dmFsdWU6IHRoaXN9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkodGhpcywgc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eSwge3ZhbHVlOiBrZXl9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkodGhpcywgc3ltYm9sRGVzY3JpcHRpb25Qcm9wZXJ0eSwge3ZhbHVlOiBkZXNjcmlwdGlvbn0pO1xuICAgIGZyZWV6ZSh0aGlzKTtcbiAgICBzeW1ib2xWYWx1ZXNba2V5XSA9IHRoaXM7XG4gIH1cbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbFZhbHVlLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgbm9uRW51bShTeW1ib2wpKTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbFZhbHVlLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywge1xuICAgIHZhbHVlOiBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLFxuICAgIGVudW1lcmFibGU6IGZhbHNlXG4gIH0pO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sVmFsdWUucHJvdG90eXBlLCAndmFsdWVPZicsIHtcbiAgICB2YWx1ZTogU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mLFxuICAgIGVudW1lcmFibGU6IGZhbHNlXG4gIH0pO1xuICB2YXIgaGFzaFByb3BlcnR5ID0gY3JlYXRlUHJpdmF0ZU5hbWUoKTtcbiAgdmFyIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IgPSB7dmFsdWU6IHVuZGVmaW5lZH07XG4gIHZhciBoYXNoT2JqZWN0UHJvcGVydGllcyA9IHtcbiAgICBoYXNoOiB7dmFsdWU6IHVuZGVmaW5lZH0sXG4gICAgc2VsZjoge3ZhbHVlOiB1bmRlZmluZWR9XG4gIH07XG4gIHZhciBoYXNoQ291bnRlciA9IDA7XG4gIGZ1bmN0aW9uIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KSB7XG4gICAgdmFyIGhhc2hPYmplY3QgPSBvYmplY3RbaGFzaFByb3BlcnR5XTtcbiAgICBpZiAoaGFzaE9iamVjdCAmJiBoYXNoT2JqZWN0LnNlbGYgPT09IG9iamVjdClcbiAgICAgIHJldHVybiBoYXNoT2JqZWN0O1xuICAgIGlmICgkaXNFeHRlbnNpYmxlKG9iamVjdCkpIHtcbiAgICAgIGhhc2hPYmplY3RQcm9wZXJ0aWVzLmhhc2gudmFsdWUgPSBoYXNoQ291bnRlcisrO1xuICAgICAgaGFzaE9iamVjdFByb3BlcnRpZXMuc2VsZi52YWx1ZSA9IG9iamVjdDtcbiAgICAgIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IudmFsdWUgPSAkY3JlYXRlKG51bGwsIGhhc2hPYmplY3RQcm9wZXJ0aWVzKTtcbiAgICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGhhc2hQcm9wZXJ0eSwgaGFzaFByb3BlcnR5RGVzY3JpcHRvcik7XG4gICAgICByZXR1cm4gaGFzaFByb3BlcnR5RGVzY3JpcHRvci52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBmcmVlemUob2JqZWN0KSB7XG4gICAgZ2V0T3duSGFzaE9iamVjdChvYmplY3QpO1xuICAgIHJldHVybiAkZnJlZXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnMob2JqZWN0KSB7XG4gICAgZ2V0T3duSGFzaE9iamVjdChvYmplY3QpO1xuICAgIHJldHVybiAkcHJldmVudEV4dGVuc2lvbnMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICBmdW5jdGlvbiBzZWFsKG9iamVjdCkge1xuICAgIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KTtcbiAgICByZXR1cm4gJHNlYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICBmcmVlemUoU3ltYm9sVmFsdWUucHJvdG90eXBlKTtcbiAgZnVuY3Rpb24gaXNTeW1ib2xTdHJpbmcocykge1xuICAgIHJldHVybiBzeW1ib2xWYWx1ZXNbc10gfHwgcHJpdmF0ZU5hbWVzW3NdO1xuICB9XG4gIGZ1bmN0aW9uIHRvUHJvcGVydHkobmFtZSkge1xuICAgIGlmIChpc1NoaW1TeW1ib2wobmFtZSkpXG4gICAgICByZXR1cm4gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICBmdW5jdGlvbiByZW1vdmVTeW1ib2xLZXlzKGFycmF5KSB7XG4gICAgdmFyIHJ2ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFpc1N5bWJvbFN0cmluZyhhcnJheVtpXSkpIHtcbiAgICAgICAgcnYucHVzaChhcnJheVtpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydjtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCkge1xuICAgIHJldHVybiByZW1vdmVTeW1ib2xLZXlzKCRnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCkpO1xuICB9XG4gIGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gICAgcmV0dXJuIHJlbW92ZVN5bWJvbEtleXMoJGtleXMob2JqZWN0KSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCkge1xuICAgIHZhciBydiA9IFtdO1xuICAgIHZhciBuYW1lcyA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHN5bWJvbCA9IHN5bWJvbFZhbHVlc1tuYW1lc1tpXV07XG4gICAgICBpZiAoc3ltYm9sKSB7XG4gICAgICAgIHJ2LnB1c2goc3ltYm9sKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ2O1xuICB9XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIG5hbWUpIHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHRvUHJvcGVydHkobmFtZSkpO1xuICB9XG4gIGZ1bmN0aW9uIGhhc093blByb3BlcnR5KG5hbWUpIHtcbiAgICByZXR1cm4gJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgdG9Qcm9wZXJ0eShuYW1lKSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T3B0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZ2xvYmFsLnRyYWNldXIgJiYgZ2xvYmFsLnRyYWNldXIub3B0aW9uc1tuYW1lXTtcbiAgfVxuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgICBpZiAoaXNTaGltU3ltYm9sKG5hbWUpKSB7XG4gICAgICBuYW1lID0gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICB9XG4gICAgJGRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE9iamVjdChPYmplY3QpIHtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknLCB7dmFsdWU6IGRlZmluZVByb3BlcnR5fSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2dldE93blByb3BlcnR5TmFtZXMnLCB7dmFsdWU6IGdldE93blByb3BlcnR5TmFtZXN9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywge3ZhbHVlOiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3J9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ2hhc093blByb3BlcnR5Jywge3ZhbHVlOiBoYXNPd25Qcm9wZXJ0eX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdmcmVlemUnLCB7dmFsdWU6IGZyZWV6ZX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdwcmV2ZW50RXh0ZW5zaW9ucycsIHt2YWx1ZTogcHJldmVudEV4dGVuc2lvbnN9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnc2VhbCcsIHt2YWx1ZTogc2VhbH0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdrZXlzJywge3ZhbHVlOiBrZXlzfSk7XG4gIH1cbiAgZnVuY3Rpb24gZXhwb3J0U3RhcihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMoYXJndW1lbnRzW2ldKTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbmFtZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lc1tqXTtcbiAgICAgICAgaWYgKGlzU3ltYm9sU3RyaW5nKG5hbWUpKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAoZnVuY3Rpb24obW9kLCBuYW1lKSB7XG4gICAgICAgICAgJGRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1vZFtuYW1lXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKGFyZ3VtZW50c1tpXSwgbmFtZXNbal0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAhPSBudWxsICYmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbicpO1xuICB9XG4gIGZ1bmN0aW9uIHRvT2JqZWN0KHgpIHtcbiAgICBpZiAoeCA9PSBudWxsKVxuICAgICAgdGhyb3cgJFR5cGVFcnJvcigpO1xuICAgIHJldHVybiAkT2JqZWN0KHgpO1xuICB9XG4gIGZ1bmN0aW9uIGNoZWNrT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSB7XG4gICAgaWYgKGFyZ3VtZW50ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gYW4gT2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiBhcmd1bWVudDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbFN5bWJvbChnbG9iYWwsIFN5bWJvbCkge1xuICAgIGlmICghZ2xvYmFsLlN5bWJvbCkge1xuICAgICAgZ2xvYmFsLlN5bWJvbCA9IFN5bWJvbDtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4gICAgfVxuICAgIGlmICghZ2xvYmFsLlN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgZ2xvYmFsLlN5bWJvbC5pdGVyYXRvciA9IFN5bWJvbCgnU3ltYm9sLml0ZXJhdG9yJyk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHNldHVwR2xvYmFscyhnbG9iYWwpIHtcbiAgICBwb2x5ZmlsbFN5bWJvbChnbG9iYWwsIFN5bWJvbCk7XG4gICAgZ2xvYmFsLlJlZmxlY3QgPSBnbG9iYWwuUmVmbGVjdCB8fCB7fTtcbiAgICBnbG9iYWwuUmVmbGVjdC5nbG9iYWwgPSBnbG9iYWwuUmVmbGVjdC5nbG9iYWwgfHwgZ2xvYmFsO1xuICAgIHBvbHlmaWxsT2JqZWN0KGdsb2JhbC5PYmplY3QpO1xuICB9XG4gIHNldHVwR2xvYmFscyhnbG9iYWwpO1xuICBnbG9iYWwuJHRyYWNldXJSdW50aW1lID0ge1xuICAgIGNoZWNrT2JqZWN0Q29lcmNpYmxlOiBjaGVja09iamVjdENvZXJjaWJsZSxcbiAgICBjcmVhdGVQcml2YXRlTmFtZTogY3JlYXRlUHJpdmF0ZU5hbWUsXG4gICAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gICAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgICBleHBvcnRTdGFyOiBleHBvcnRTdGFyLFxuICAgIGdldE93bkhhc2hPYmplY3Q6IGdldE93bkhhc2hPYmplY3QsXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAgIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAgIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgICBpc1ByaXZhdGVOYW1lOiBpc1ByaXZhdGVOYW1lLFxuICAgIGlzU3ltYm9sU3RyaW5nOiBpc1N5bWJvbFN0cmluZyxcbiAgICBrZXlzOiAka2V5cyxcbiAgICBzZXR1cEdsb2JhbHM6IHNldHVwR2xvYmFscyxcbiAgICB0b09iamVjdDogdG9PYmplY3QsXG4gICAgdG9Qcm9wZXJ0eTogdG9Qcm9wZXJ0eSxcbiAgICB0eXBlb2Y6IHR5cGVPZlxuICB9O1xufSkodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzKTtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGF0aDtcbiAgZnVuY3Rpb24gcmVsYXRpdmVSZXF1aXJlKGNhbGxlclBhdGgsIHJlcXVpcmVkUGF0aCkge1xuICAgIHBhdGggPSBwYXRoIHx8IHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJyAmJiByZXF1aXJlKCdwYXRoJyk7XG4gICAgZnVuY3Rpb24gaXNEaXJlY3RvcnkocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguc2xpY2UoLTEpID09PSAnLyc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGhbMF0gPT09ICcvJztcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNSZWxhdGl2ZShwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aFswXSA9PT0gJy4nO1xuICAgIH1cbiAgICBpZiAoaXNEaXJlY3RvcnkocmVxdWlyZWRQYXRoKSB8fCBpc0Fic29sdXRlKHJlcXVpcmVkUGF0aCkpXG4gICAgICByZXR1cm47XG4gICAgcmV0dXJuIGlzUmVsYXRpdmUocmVxdWlyZWRQYXRoKSA/IHJlcXVpcmUocGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShjYWxsZXJQYXRoKSwgcmVxdWlyZWRQYXRoKSkgOiByZXF1aXJlKHJlcXVpcmVkUGF0aCk7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLnJlcXVpcmUgPSByZWxhdGl2ZVJlcXVpcmU7XG59KSgpO1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIGZ1bmN0aW9uIHNwcmVhZCgpIHtcbiAgICB2YXIgcnYgPSBbXSxcbiAgICAgICAgaiA9IDAsXG4gICAgICAgIGl0ZXJSZXN1bHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZVRvU3ByZWFkID0gJHRyYWNldXJSdW50aW1lLmNoZWNrT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50c1tpXSk7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlVG9TcHJlYWRbJHRyYWNldXJSdW50aW1lLnRvUHJvcGVydHkoU3ltYm9sLml0ZXJhdG9yKV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IHNwcmVhZCBub24taXRlcmFibGUgb2JqZWN0LicpO1xuICAgICAgfVxuICAgICAgdmFyIGl0ZXIgPSB2YWx1ZVRvU3ByZWFkWyR0cmFjZXVyUnVudGltZS50b1Byb3BlcnR5KFN5bWJvbC5pdGVyYXRvcildKCk7XG4gICAgICB3aGlsZSAoIShpdGVyUmVzdWx0ID0gaXRlci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgcnZbaisrXSA9IGl0ZXJSZXN1bHQudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydjtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuc3ByZWFkID0gc3ByZWFkO1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgJE9iamVjdCA9IE9iamVjdDtcbiAgdmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4gIHZhciAkY3JlYXRlID0gJE9iamVjdC5jcmVhdGU7XG4gIHZhciAkZGVmaW5lUHJvcGVydGllcyA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gIHZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgJGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgJF9fMCA9IE9iamVjdCxcbiAgICAgIGdldE93blByb3BlcnR5TmFtZXMgPSAkX18wLmdldE93blByb3BlcnR5TmFtZXMsXG4gICAgICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSAkX18wLmdldE93blByb3BlcnR5U3ltYm9scztcbiAgZnVuY3Rpb24gc3VwZXJEZXNjcmlwdG9yKGhvbWVPYmplY3QsIG5hbWUpIHtcbiAgICB2YXIgcHJvdG8gPSAkZ2V0UHJvdG90eXBlT2YoaG9tZU9iamVjdCk7XG4gICAgZG8ge1xuICAgICAgdmFyIHJlc3VsdCA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIG5hbWUpO1xuICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIHByb3RvID0gJGdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICB9IHdoaWxlIChwcm90byk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBzdXBlckNvbnN0cnVjdG9yKGN0b3IpIHtcbiAgICByZXR1cm4gY3Rvci5fX3Byb3RvX187XG4gIH1cbiAgZnVuY3Rpb24gc3VwZXJDYWxsKHNlbGYsIGhvbWVPYmplY3QsIG5hbWUsIGFyZ3MpIHtcbiAgICByZXR1cm4gc3VwZXJHZXQoc2VsZiwgaG9tZU9iamVjdCwgbmFtZSkuYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cbiAgZnVuY3Rpb24gc3VwZXJHZXQoc2VsZiwgaG9tZU9iamVjdCwgbmFtZSkge1xuICAgIHZhciBkZXNjcmlwdG9yID0gc3VwZXJEZXNjcmlwdG9yKGhvbWVPYmplY3QsIG5hbWUpO1xuICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICBpZiAoIWRlc2NyaXB0b3IuZ2V0KVxuICAgICAgICByZXR1cm4gZGVzY3JpcHRvci52YWx1ZTtcbiAgICAgIHJldHVybiBkZXNjcmlwdG9yLmdldC5jYWxsKHNlbGYpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHN1cGVyU2V0KHNlbGYsIGhvbWVPYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBzdXBlckRlc2NyaXB0b3IoaG9tZU9iamVjdCwgbmFtZSk7XG4gICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0LmNhbGwoc2VsZiwgdmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB0aHJvdyAkVHlwZUVycm9yKChcInN1cGVyIGhhcyBubyBzZXR0ZXIgJ1wiICsgbmFtZSArIFwiJy5cIikpO1xuICB9XG4gIGZ1bmN0aW9uIGdldERlc2NyaXB0b3JzKG9iamVjdCkge1xuICAgIHZhciBkZXNjcmlwdG9ycyA9IHt9O1xuICAgIHZhciBuYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgZGVzY3JpcHRvcnNbbmFtZV0gPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgbmFtZSk7XG4gICAgfVxuICAgIHZhciBzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3ltYm9sID0gc3ltYm9sc1tpXTtcbiAgICAgIGRlc2NyaXB0b3JzWyR0cmFjZXVyUnVudGltZS50b1Byb3BlcnR5KHN5bWJvbCldID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsICR0cmFjZXVyUnVudGltZS50b1Byb3BlcnR5KHN5bWJvbCkpO1xuICAgIH1cbiAgICByZXR1cm4gZGVzY3JpcHRvcnM7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlQ2xhc3MoY3Rvciwgb2JqZWN0LCBzdGF0aWNPYmplY3QsIHN1cGVyQ2xhc3MpIHtcbiAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCAnY29uc3RydWN0b3InLCB7XG4gICAgICB2YWx1ZTogY3RvcixcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDMpIHtcbiAgICAgIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgY3Rvci5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSAkY3JlYXRlKGdldFByb3RvUGFyZW50KHN1cGVyQ2xhc3MpLCBnZXREZXNjcmlwdG9ycyhvYmplY3QpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBvYmplY3Q7XG4gICAgfVxuICAgICRkZWZpbmVQcm9wZXJ0eShjdG9yLCAncHJvdG90eXBlJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgIH0pO1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydGllcyhjdG9yLCBnZXREZXNjcmlwdG9ycyhzdGF0aWNPYmplY3QpKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRQcm90b1BhcmVudChzdXBlckNsYXNzKSB7XG4gICAgaWYgKHR5cGVvZiBzdXBlckNsYXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gc3VwZXJDbGFzcy5wcm90b3R5cGU7XG4gICAgICBpZiAoJE9iamVjdChwcm90b3R5cGUpID09PSBwcm90b3R5cGUgfHwgcHJvdG90eXBlID09PSBudWxsKVxuICAgICAgICByZXR1cm4gc3VwZXJDbGFzcy5wcm90b3R5cGU7XG4gICAgICB0aHJvdyBuZXcgJFR5cGVFcnJvcignc3VwZXIgcHJvdG90eXBlIG11c3QgYmUgYW4gT2JqZWN0IG9yIG51bGwnKTtcbiAgICB9XG4gICAgaWYgKHN1cGVyQ2xhc3MgPT09IG51bGwpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB0aHJvdyBuZXcgJFR5cGVFcnJvcigoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MgKyBcIi5cIikpO1xuICB9XG4gIGZ1bmN0aW9uIGRlZmF1bHRTdXBlckNhbGwoc2VsZiwgaG9tZU9iamVjdCwgYXJncykge1xuICAgIGlmICgkZ2V0UHJvdG90eXBlT2YoaG9tZU9iamVjdCkgIT09IG51bGwpXG4gICAgICBzdXBlckNhbGwoc2VsZiwgaG9tZU9iamVjdCwgJ2NvbnN0cnVjdG9yJywgYXJncyk7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzID0gY3JlYXRlQ2xhc3M7XG4gICR0cmFjZXVyUnVudGltZS5kZWZhdWx0U3VwZXJDYWxsID0gZGVmYXVsdFN1cGVyQ2FsbDtcbiAgJHRyYWNldXJSdW50aW1lLnN1cGVyQ2FsbCA9IHN1cGVyQ2FsbDtcbiAgJHRyYWNldXJSdW50aW1lLnN1cGVyQ29uc3RydWN0b3IgPSBzdXBlckNvbnN0cnVjdG9yO1xuICAkdHJhY2V1clJ1bnRpbWUuc3VwZXJHZXQgPSBzdXBlckdldDtcbiAgJHRyYWNldXJSdW50aW1lLnN1cGVyU2V0ID0gc3VwZXJTZXQ7XG59KSgpO1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICh0eXBlb2YgJHRyYWNldXJSdW50aW1lICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcigndHJhY2V1ciBydW50aW1lIG5vdCBmb3VuZC4nKTtcbiAgfVxuICB2YXIgY3JlYXRlUHJpdmF0ZU5hbWUgPSAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlUHJpdmF0ZU5hbWU7XG4gIHZhciAkZGVmaW5lUHJvcGVydGllcyA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG4gIHZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuICBmdW5jdGlvbiBub25FbnVtKHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9O1xuICB9XG4gIHZhciBTVF9ORVdCT1JOID0gMDtcbiAgdmFyIFNUX0VYRUNVVElORyA9IDE7XG4gIHZhciBTVF9TVVNQRU5ERUQgPSAyO1xuICB2YXIgU1RfQ0xPU0VEID0gMztcbiAgdmFyIEVORF9TVEFURSA9IC0yO1xuICB2YXIgUkVUSFJPV19TVEFURSA9IC0zO1xuICBmdW5jdGlvbiBnZXRJbnRlcm5hbEVycm9yKHN0YXRlKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcignVHJhY2V1ciBjb21waWxlciBidWc6IGludmFsaWQgc3RhdGUgaW4gc3RhdGUgbWFjaGluZTogJyArIHN0YXRlKTtcbiAgfVxuICBmdW5jdGlvbiBHZW5lcmF0b3JDb250ZXh0KCkge1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMuR1N0YXRlID0gU1RfTkVXQk9STjtcbiAgICB0aGlzLnN0b3JlZEV4Y2VwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpbmFsbHlGYWxsVGhyb3VnaCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNlbnRfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucmV0dXJuVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy50cnlTdGFja18gPSBbXTtcbiAgfVxuICBHZW5lcmF0b3JDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBwdXNoVHJ5OiBmdW5jdGlvbihjYXRjaFN0YXRlLCBmaW5hbGx5U3RhdGUpIHtcbiAgICAgIGlmIChmaW5hbGx5U3RhdGUgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGZpbmFsbHlGYWxsVGhyb3VnaCA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeVN0YWNrXy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmICh0aGlzLnRyeVN0YWNrX1tpXS5jYXRjaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmaW5hbGx5RmFsbFRocm91Z2ggPSB0aGlzLnRyeVN0YWNrX1tpXS5jYXRjaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWxseUZhbGxUaHJvdWdoID09PSBudWxsKVxuICAgICAgICAgIGZpbmFsbHlGYWxsVGhyb3VnaCA9IFJFVEhST1dfU1RBVEU7XG4gICAgICAgIHRoaXMudHJ5U3RhY2tfLnB1c2goe1xuICAgICAgICAgIGZpbmFsbHk6IGZpbmFsbHlTdGF0ZSxcbiAgICAgICAgICBmaW5hbGx5RmFsbFRocm91Z2g6IGZpbmFsbHlGYWxsVGhyb3VnaFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjYXRjaFN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudHJ5U3RhY2tfLnB1c2goe2NhdGNoOiBjYXRjaFN0YXRlfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwb3BUcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy50cnlTdGFja18ucG9wKCk7XG4gICAgfSxcbiAgICBnZXQgc2VudCgpIHtcbiAgICAgIHRoaXMubWF5YmVUaHJvdygpO1xuICAgICAgcmV0dXJuIHRoaXMuc2VudF87XG4gICAgfSxcbiAgICBzZXQgc2VudCh2KSB7XG4gICAgICB0aGlzLnNlbnRfID0gdjtcbiAgICB9LFxuICAgIGdldCBzZW50SWdub3JlVGhyb3coKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZW50XztcbiAgICB9LFxuICAgIG1heWJlVGhyb3c6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuYWN0aW9uID09PSAndGhyb3cnKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gJ25leHQnO1xuICAgICAgICB0aHJvdyB0aGlzLnNlbnRfO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICBjYXNlIEVORF9TVEFURTpcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY2FzZSBSRVRIUk9XX1NUQVRFOlxuICAgICAgICAgIHRocm93IHRoaXMuc3RvcmVkRXhjZXB0aW9uO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IGdldEludGVybmFsRXJyb3IodGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVFeGNlcHRpb246IGZ1bmN0aW9uKGV4KSB7XG4gICAgICB0aGlzLkdTdGF0ZSA9IFNUX0NMT1NFRDtcbiAgICAgIHRoaXMuc3RhdGUgPSBFTkRfU1RBVEU7XG4gICAgICB0aHJvdyBleDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIG5leHRPclRocm93KGN0eCwgbW92ZU5leHQsIGFjdGlvbiwgeCkge1xuICAgIHN3aXRjaCAoY3R4LkdTdGF0ZSkge1xuICAgICAgY2FzZSBTVF9FWEVDVVRJTkc6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigoXCJcXFwiXCIgKyBhY3Rpb24gKyBcIlxcXCIgb24gZXhlY3V0aW5nIGdlbmVyYXRvclwiKSk7XG4gICAgICBjYXNlIFNUX0NMT1NFRDpcbiAgICAgICAgaWYgKGFjdGlvbiA9PSAnbmV4dCcpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRvbmU6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IHg7XG4gICAgICBjYXNlIFNUX05FV0JPUk46XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICd0aHJvdycpIHtcbiAgICAgICAgICBjdHguR1N0YXRlID0gU1RfQ0xPU0VEO1xuICAgICAgICAgIHRocm93IHg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aHJvdyAkVHlwZUVycm9yKCdTZW50IHZhbHVlIHRvIG5ld2Jvcm4gZ2VuZXJhdG9yJyk7XG4gICAgICBjYXNlIFNUX1NVU1BFTkRFRDpcbiAgICAgICAgY3R4LkdTdGF0ZSA9IFNUX0VYRUNVVElORztcbiAgICAgICAgY3R4LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgY3R4LnNlbnQgPSB4O1xuICAgICAgICB2YXIgdmFsdWUgPSBtb3ZlTmV4dChjdHgpO1xuICAgICAgICB2YXIgZG9uZSA9IHZhbHVlID09PSBjdHg7XG4gICAgICAgIGlmIChkb25lKVxuICAgICAgICAgIHZhbHVlID0gY3R4LnJldHVyblZhbHVlO1xuICAgICAgICBjdHguR1N0YXRlID0gZG9uZSA/IFNUX0NMT1NFRCA6IFNUX1NVU1BFTkRFRDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgZG9uZTogZG9uZVxuICAgICAgICB9O1xuICAgIH1cbiAgfVxuICB2YXIgY3R4TmFtZSA9IGNyZWF0ZVByaXZhdGVOYW1lKCk7XG4gIHZhciBtb3ZlTmV4dE5hbWUgPSBjcmVhdGVQcml2YXRlTmFtZSgpO1xuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICRkZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgbm9uRW51bShHZW5lcmF0b3JGdW5jdGlvbikpO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIG5leHQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHJldHVybiBuZXh0T3JUaHJvdyh0aGlzW2N0eE5hbWVdLCB0aGlzW21vdmVOZXh0TmFtZV0sICduZXh0Jywgdik7XG4gICAgfSxcbiAgICB0aHJvdzogZnVuY3Rpb24odikge1xuICAgICAgcmV0dXJuIG5leHRPclRocm93KHRoaXNbY3R4TmFtZV0sIHRoaXNbbW92ZU5leHROYW1lXSwgJ3Rocm93Jywgdik7XG4gICAgfVxuICB9O1xuICAkZGVmaW5lUHJvcGVydGllcyhHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge2VudW1lcmFibGU6IGZhbHNlfSxcbiAgICBuZXh0OiB7ZW51bWVyYWJsZTogZmFsc2V9LFxuICAgIHRocm93OiB7ZW51bWVyYWJsZTogZmFsc2V9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlLCBTeW1ib2wuaXRlcmF0b3IsIG5vbkVudW0oZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pKTtcbiAgZnVuY3Rpb24gY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoaW5uZXJGdW5jdGlvbiwgZnVuY3Rpb25PYmplY3QsIHNlbGYpIHtcbiAgICB2YXIgbW92ZU5leHQgPSBnZXRNb3ZlTmV4dChpbm5lckZ1bmN0aW9uLCBzZWxmKTtcbiAgICB2YXIgY3R4ID0gbmV3IEdlbmVyYXRvckNvbnRleHQoKTtcbiAgICB2YXIgb2JqZWN0ID0gJGNyZWF0ZShmdW5jdGlvbk9iamVjdC5wcm90b3R5cGUpO1xuICAgIG9iamVjdFtjdHhOYW1lXSA9IGN0eDtcbiAgICBvYmplY3RbbW92ZU5leHROYW1lXSA9IG1vdmVOZXh0O1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uT2JqZWN0KSB7XG4gICAgZnVuY3Rpb25PYmplY3QucHJvdG90eXBlID0gJGNyZWF0ZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUpO1xuICAgIGZ1bmN0aW9uT2JqZWN0Ll9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgIHJldHVybiBmdW5jdGlvbk9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBBc3luY0Z1bmN0aW9uQ29udGV4dCgpIHtcbiAgICBHZW5lcmF0b3JDb250ZXh0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5lcnIgPSB1bmRlZmluZWQ7XG4gICAgdmFyIGN0eCA9IHRoaXM7XG4gICAgY3R4LnJlc3VsdCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY3R4LnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgY3R4LnJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcbiAgfVxuICBBc3luY0Z1bmN0aW9uQ29udGV4dC5wcm90b3R5cGUgPSAkY3JlYXRlKEdlbmVyYXRvckNvbnRleHQucHJvdG90eXBlKTtcbiAgQXN5bmNGdW5jdGlvbkNvbnRleHQucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgY2FzZSBFTkRfU1RBVEU6XG4gICAgICAgIHRoaXMucmVzb2x2ZSh0aGlzLnJldHVyblZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJFVEhST1dfU1RBVEU6XG4gICAgICAgIHRoaXMucmVqZWN0KHRoaXMuc3RvcmVkRXhjZXB0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnJlamVjdChnZXRJbnRlcm5hbEVycm9yKHRoaXMuc3RhdGUpKTtcbiAgICB9XG4gIH07XG4gIEFzeW5jRnVuY3Rpb25Db250ZXh0LnByb3RvdHlwZS5oYW5kbGVFeGNlcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0YXRlID0gUkVUSFJPV19TVEFURTtcbiAgfTtcbiAgZnVuY3Rpb24gYXN5bmNXcmFwKGlubmVyRnVuY3Rpb24sIHNlbGYpIHtcbiAgICB2YXIgbW92ZU5leHQgPSBnZXRNb3ZlTmV4dChpbm5lckZ1bmN0aW9uLCBzZWxmKTtcbiAgICB2YXIgY3R4ID0gbmV3IEFzeW5jRnVuY3Rpb25Db250ZXh0KCk7XG4gICAgY3R4LmNyZWF0ZUNhbGxiYWNrID0gZnVuY3Rpb24obmV3U3RhdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBjdHguc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgY3R4LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIG1vdmVOZXh0KGN0eCk7XG4gICAgICB9O1xuICAgIH07XG4gICAgY3R4LmVycmJhY2sgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGhhbmRsZUNhdGNoKGN0eCwgZXJyKTtcbiAgICAgIG1vdmVOZXh0KGN0eCk7XG4gICAgfTtcbiAgICBtb3ZlTmV4dChjdHgpO1xuICAgIHJldHVybiBjdHgucmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIGdldE1vdmVOZXh0KGlubmVyRnVuY3Rpb24sIHNlbGYpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY3R4KSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBpbm5lckZ1bmN0aW9uLmNhbGwoc2VsZiwgY3R4KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBoYW5kbGVDYXRjaChjdHgsIGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlQ2F0Y2goY3R4LCBleCkge1xuICAgIGN0eC5zdG9yZWRFeGNlcHRpb24gPSBleDtcbiAgICB2YXIgbGFzdCA9IGN0eC50cnlTdGFja19bY3R4LnRyeVN0YWNrXy5sZW5ndGggLSAxXTtcbiAgICBpZiAoIWxhc3QpIHtcbiAgICAgIGN0eC5oYW5kbGVFeGNlcHRpb24oZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjdHguc3RhdGUgPSBsYXN0LmNhdGNoICE9PSB1bmRlZmluZWQgPyBsYXN0LmNhdGNoIDogbGFzdC5maW5hbGx5O1xuICAgIGlmIChsYXN0LmZpbmFsbHlGYWxsVGhyb3VnaCAhPT0gdW5kZWZpbmVkKVxuICAgICAgY3R4LmZpbmFsbHlGYWxsVGhyb3VnaCA9IGxhc3QuZmluYWxseUZhbGxUaHJvdWdoO1xuICB9XG4gICR0cmFjZXVyUnVudGltZS5hc3luY1dyYXAgPSBhc3luY1dyYXA7XG4gICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24gPSBpbml0R2VuZXJhdG9yRnVuY3Rpb247XG4gICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZSA9IGNyZWF0ZUdlbmVyYXRvckluc3RhbmNlO1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gYnVpbGRGcm9tRW5jb2RlZFBhcnRzKG9wdF9zY2hlbWUsIG9wdF91c2VySW5mbywgb3B0X2RvbWFpbiwgb3B0X3BvcnQsIG9wdF9wYXRoLCBvcHRfcXVlcnlEYXRhLCBvcHRfZnJhZ21lbnQpIHtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgaWYgKG9wdF9zY2hlbWUpIHtcbiAgICAgIG91dC5wdXNoKG9wdF9zY2hlbWUsICc6Jyk7XG4gICAgfVxuICAgIGlmIChvcHRfZG9tYWluKSB7XG4gICAgICBvdXQucHVzaCgnLy8nKTtcbiAgICAgIGlmIChvcHRfdXNlckluZm8pIHtcbiAgICAgICAgb3V0LnB1c2gob3B0X3VzZXJJbmZvLCAnQCcpO1xuICAgICAgfVxuICAgICAgb3V0LnB1c2gob3B0X2RvbWFpbik7XG4gICAgICBpZiAob3B0X3BvcnQpIHtcbiAgICAgICAgb3V0LnB1c2goJzonLCBvcHRfcG9ydCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRfcGF0aCkge1xuICAgICAgb3V0LnB1c2gob3B0X3BhdGgpO1xuICAgIH1cbiAgICBpZiAob3B0X3F1ZXJ5RGF0YSkge1xuICAgICAgb3V0LnB1c2goJz8nLCBvcHRfcXVlcnlEYXRhKTtcbiAgICB9XG4gICAgaWYgKG9wdF9mcmFnbWVudCkge1xuICAgICAgb3V0LnB1c2goJyMnLCBvcHRfZnJhZ21lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICB9XG4gIDtcbiAgdmFyIHNwbGl0UmUgPSBuZXcgUmVnRXhwKCdeJyArICcoPzonICsgJyhbXjovPyMuXSspJyArICc6KT8nICsgJyg/Oi8vJyArICcoPzooW14vPyNdKilAKT8nICsgJyhbXFxcXHdcXFxcZFxcXFwtXFxcXHUwMTAwLVxcXFx1ZmZmZi4lXSopJyArICcoPzo6KFswLTldKykpPycgKyAnKT8nICsgJyhbXj8jXSspPycgKyAnKD86XFxcXD8oW14jXSopKT8nICsgJyg/OiMoLiopKT8nICsgJyQnKTtcbiAgdmFyIENvbXBvbmVudEluZGV4ID0ge1xuICAgIFNDSEVNRTogMSxcbiAgICBVU0VSX0lORk86IDIsXG4gICAgRE9NQUlOOiAzLFxuICAgIFBPUlQ6IDQsXG4gICAgUEFUSDogNSxcbiAgICBRVUVSWV9EQVRBOiA2LFxuICAgIEZSQUdNRU5UOiA3XG4gIH07XG4gIGZ1bmN0aW9uIHNwbGl0KHVyaSkge1xuICAgIHJldHVybiAodXJpLm1hdGNoKHNwbGl0UmUpKTtcbiAgfVxuICBmdW5jdGlvbiByZW1vdmVEb3RTZWdtZW50cyhwYXRoKSB7XG4gICAgaWYgKHBhdGggPT09ICcvJylcbiAgICAgIHJldHVybiAnLyc7XG4gICAgdmFyIGxlYWRpbmdTbGFzaCA9IHBhdGhbMF0gPT09ICcvJyA/ICcvJyA6ICcnO1xuICAgIHZhciB0cmFpbGluZ1NsYXNoID0gcGF0aC5zbGljZSgtMSkgPT09ICcvJyA/ICcvJyA6ICcnO1xuICAgIHZhciBzZWdtZW50cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgdmFyIHVwID0gMDtcbiAgICBmb3IgKHZhciBwb3MgPSAwOyBwb3MgPCBzZWdtZW50cy5sZW5ndGg7IHBvcysrKSB7XG4gICAgICB2YXIgc2VnbWVudCA9IHNlZ21lbnRzW3Bvc107XG4gICAgICBzd2l0Y2ggKHNlZ21lbnQpIHtcbiAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy4uJzpcbiAgICAgICAgICBpZiAob3V0Lmxlbmd0aClcbiAgICAgICAgICAgIG91dC5wb3AoKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB1cCsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG91dC5wdXNoKHNlZ21lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWxlYWRpbmdTbGFzaCkge1xuICAgICAgd2hpbGUgKHVwLS0gPiAwKSB7XG4gICAgICAgIG91dC51bnNoaWZ0KCcuLicpO1xuICAgICAgfVxuICAgICAgaWYgKG91dC5sZW5ndGggPT09IDApXG4gICAgICAgIG91dC5wdXNoKCcuJyk7XG4gICAgfVxuICAgIHJldHVybiBsZWFkaW5nU2xhc2ggKyBvdXQuam9pbignLycpICsgdHJhaWxpbmdTbGFzaDtcbiAgfVxuICBmdW5jdGlvbiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cykge1xuICAgIHZhciBwYXRoID0gcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF0gfHwgJyc7XG4gICAgcGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHBhdGgpO1xuICAgIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdID0gcGF0aDtcbiAgICByZXR1cm4gYnVpbGRGcm9tRW5jb2RlZFBhcnRzKHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlVTRVJfSU5GT10sIHBhcnRzW0NvbXBvbmVudEluZGV4LkRPTUFJTl0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlBPUlRdLCBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXSwgcGFydHNbQ29tcG9uZW50SW5kZXguUVVFUllfREFUQV0sIHBhcnRzW0NvbXBvbmVudEluZGV4LkZSQUdNRU5UXSk7XG4gIH1cbiAgZnVuY3Rpb24gY2Fub25pY2FsaXplVXJsKHVybCkge1xuICAgIHZhciBwYXJ0cyA9IHNwbGl0KHVybCk7XG4gICAgcmV0dXJuIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKTtcbiAgfVxuICBmdW5jdGlvbiByZXNvbHZlVXJsKGJhc2UsIHVybCkge1xuICAgIHZhciBwYXJ0cyA9IHNwbGl0KHVybCk7XG4gICAgdmFyIGJhc2VQYXJ0cyA9IHNwbGl0KGJhc2UpO1xuICAgIGlmIChwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdKSB7XG4gICAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdID0gYmFzZVBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV07XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSBDb21wb25lbnRJbmRleC5TQ0hFTUU7IGkgPD0gQ29tcG9uZW50SW5kZXguUE9SVDsgaSsrKSB7XG4gICAgICBpZiAoIXBhcnRzW2ldKSB7XG4gICAgICAgIHBhcnRzW2ldID0gYmFzZVBhcnRzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF1bMF0gPT0gJy8nKSB7XG4gICAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICAgIH1cbiAgICB2YXIgcGF0aCA9IGJhc2VQYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXTtcbiAgICB2YXIgaW5kZXggPSBwYXRoLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgcGF0aCA9IHBhdGguc2xpY2UoMCwgaW5kZXggKyAxKSArIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdO1xuICAgIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdID0gcGF0aDtcbiAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICB9XG4gIGZ1bmN0aW9uIGlzQWJzb2x1dGUobmFtZSkge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAobmFtZVswXSA9PT0gJy8nKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgdmFyIHBhcnRzID0gc3BsaXQobmFtZSk7XG4gICAgaWYgKHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0pXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLmNhbm9uaWNhbGl6ZVVybCA9IGNhbm9uaWNhbGl6ZVVybDtcbiAgJHRyYWNldXJSdW50aW1lLmlzQWJzb2x1dGUgPSBpc0Fic29sdXRlO1xuICAkdHJhY2V1clJ1bnRpbWUucmVtb3ZlRG90U2VnbWVudHMgPSByZW1vdmVEb3RTZWdtZW50cztcbiAgJHRyYWNldXJSdW50aW1lLnJlc29sdmVVcmwgPSByZXNvbHZlVXJsO1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgdHlwZXMgPSB7XG4gICAgYW55OiB7bmFtZTogJ2FueSd9LFxuICAgIGJvb2xlYW46IHtuYW1lOiAnYm9vbGVhbid9LFxuICAgIG51bWJlcjoge25hbWU6ICdudW1iZXInfSxcbiAgICBzdHJpbmc6IHtuYW1lOiAnc3RyaW5nJ30sXG4gICAgc3ltYm9sOiB7bmFtZTogJ3N5bWJvbCd9LFxuICAgIHZvaWQ6IHtuYW1lOiAndm9pZCd9XG4gIH07XG4gIHZhciBHZW5lcmljVHlwZSA9IGZ1bmN0aW9uIEdlbmVyaWNUeXBlKHR5cGUsIGFyZ3VtZW50VHlwZXMpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuYXJndW1lbnRUeXBlcyA9IGFyZ3VtZW50VHlwZXM7XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKEdlbmVyaWNUeXBlLCB7fSwge30pO1xuICB2YXIgdHlwZVJlZ2lzdGVyID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgZnVuY3Rpb24gZ2VuZXJpY1R5cGUodHlwZSkge1xuICAgIGZvciAodmFyIGFyZ3VtZW50VHlwZXMgPSBbXSxcbiAgICAgICAgJF9fMSA9IDE7ICRfXzEgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18xKyspXG4gICAgICBhcmd1bWVudFR5cGVzWyRfXzEgLSAxXSA9IGFyZ3VtZW50c1skX18xXTtcbiAgICB2YXIgdHlwZU1hcCA9IHR5cGVSZWdpc3RlcjtcbiAgICB2YXIga2V5ID0gJHRyYWNldXJSdW50aW1lLmdldE93bkhhc2hPYmplY3QodHlwZSkuaGFzaDtcbiAgICBpZiAoIXR5cGVNYXBba2V5XSkge1xuICAgICAgdHlwZU1hcFtrZXldID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgdHlwZU1hcCA9IHR5cGVNYXBba2V5XTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50VHlwZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBrZXkgPSAkdHJhY2V1clJ1bnRpbWUuZ2V0T3duSGFzaE9iamVjdChhcmd1bWVudFR5cGVzW2ldKS5oYXNoO1xuICAgICAgaWYgKCF0eXBlTWFwW2tleV0pIHtcbiAgICAgICAgdHlwZU1hcFtrZXldID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIH1cbiAgICAgIHR5cGVNYXAgPSB0eXBlTWFwW2tleV07XG4gICAgfVxuICAgIHZhciB0YWlsID0gYXJndW1lbnRUeXBlc1thcmd1bWVudFR5cGVzLmxlbmd0aCAtIDFdO1xuICAgIGtleSA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25IYXNoT2JqZWN0KHRhaWwpLmhhc2g7XG4gICAgaWYgKCF0eXBlTWFwW2tleV0pIHtcbiAgICAgIHR5cGVNYXBba2V5XSA9IG5ldyBHZW5lcmljVHlwZSh0eXBlLCBhcmd1bWVudFR5cGVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVNYXBba2V5XTtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuR2VuZXJpY1R5cGUgPSBHZW5lcmljVHlwZTtcbiAgJHRyYWNldXJSdW50aW1lLmdlbmVyaWNUeXBlID0gZ2VuZXJpY1R5cGU7XG4gICR0cmFjZXVyUnVudGltZS50eXBlID0gdHlwZXM7XG59KSgpO1xuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciAkX18yID0gJHRyYWNldXJSdW50aW1lLFxuICAgICAgY2Fub25pY2FsaXplVXJsID0gJF9fMi5jYW5vbmljYWxpemVVcmwsXG4gICAgICByZXNvbHZlVXJsID0gJF9fMi5yZXNvbHZlVXJsLFxuICAgICAgaXNBYnNvbHV0ZSA9ICRfXzIuaXNBYnNvbHV0ZTtcbiAgdmFyIG1vZHVsZUluc3RhbnRpYXRvcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgYmFzZVVSTDtcbiAgaWYgKGdsb2JhbC5sb2NhdGlvbiAmJiBnbG9iYWwubG9jYXRpb24uaHJlZilcbiAgICBiYXNlVVJMID0gcmVzb2x2ZVVybChnbG9iYWwubG9jYXRpb24uaHJlZiwgJy4vJyk7XG4gIGVsc2VcbiAgICBiYXNlVVJMID0gJyc7XG4gIHZhciBVbmNvYXRlZE1vZHVsZUVudHJ5ID0gZnVuY3Rpb24gVW5jb2F0ZWRNb2R1bGVFbnRyeSh1cmwsIHVuY29hdGVkTW9kdWxlKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy52YWx1ZV8gPSB1bmNvYXRlZE1vZHVsZTtcbiAgfTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoVW5jb2F0ZWRNb2R1bGVFbnRyeSwge30sIHt9KTtcbiAgdmFyIE1vZHVsZUV2YWx1YXRpb25FcnJvciA9IGZ1bmN0aW9uIE1vZHVsZUV2YWx1YXRpb25FcnJvcihlcnJvbmVvdXNNb2R1bGVOYW1lLCBjYXVzZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyB0aGlzLnN0cmlwQ2F1c2UoY2F1c2UpICsgJyBpbiAnICsgZXJyb25lb3VzTW9kdWxlTmFtZTtcbiAgICBpZiAoIShjYXVzZSBpbnN0YW5jZW9mICRNb2R1bGVFdmFsdWF0aW9uRXJyb3IpICYmIGNhdXNlLnN0YWNrKVxuICAgICAgdGhpcy5zdGFjayA9IHRoaXMuc3RyaXBTdGFjayhjYXVzZS5zdGFjayk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5zdGFjayA9ICcnO1xuICB9O1xuICB2YXIgJE1vZHVsZUV2YWx1YXRpb25FcnJvciA9IE1vZHVsZUV2YWx1YXRpb25FcnJvcjtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoTW9kdWxlRXZhbHVhdGlvbkVycm9yLCB7XG4gICAgc3RyaXBFcnJvcjogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbGFjZSgvLipFcnJvcjovLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnOicpO1xuICAgIH0sXG4gICAgc3RyaXBDYXVzZTogZnVuY3Rpb24oY2F1c2UpIHtcbiAgICAgIGlmICghY2F1c2UpXG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIGlmICghY2F1c2UubWVzc2FnZSlcbiAgICAgICAgcmV0dXJuIGNhdXNlICsgJyc7XG4gICAgICByZXR1cm4gdGhpcy5zdHJpcEVycm9yKGNhdXNlLm1lc3NhZ2UpO1xuICAgIH0sXG4gICAgbG9hZGVkQnk6IGZ1bmN0aW9uKG1vZHVsZU5hbWUpIHtcbiAgICAgIHRoaXMuc3RhY2sgKz0gJ1xcbiBsb2FkZWQgYnkgJyArIG1vZHVsZU5hbWU7XG4gICAgfSxcbiAgICBzdHJpcFN0YWNrOiBmdW5jdGlvbihjYXVzZVN0YWNrKSB7XG4gICAgICB2YXIgc3RhY2sgPSBbXTtcbiAgICAgIGNhdXNlU3RhY2suc3BsaXQoJ1xcbicpLnNvbWUoKGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgICAgIGlmICgvVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IvLnRlc3QoZnJhbWUpKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBzdGFjay5wdXNoKGZyYW1lKTtcbiAgICAgIH0pKTtcbiAgICAgIHN0YWNrWzBdID0gdGhpcy5zdHJpcEVycm9yKHN0YWNrWzBdKTtcbiAgICAgIHJldHVybiBzdGFjay5qb2luKCdcXG4nKTtcbiAgICB9XG4gIH0sIHt9LCBFcnJvcik7XG4gIGZ1bmN0aW9uIGJlZm9yZUxpbmVzKGxpbmVzLCBudW1iZXIpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGZpcnN0ID0gbnVtYmVyIC0gMztcbiAgICBpZiAoZmlyc3QgPCAwKVxuICAgICAgZmlyc3QgPSAwO1xuICAgIGZvciAodmFyIGkgPSBmaXJzdDsgaSA8IG51bWJlcjsgaSsrKSB7XG4gICAgICByZXN1bHQucHVzaChsaW5lc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gYWZ0ZXJMaW5lcyhsaW5lcywgbnVtYmVyKSB7XG4gICAgdmFyIGxhc3QgPSBudW1iZXIgKyAxO1xuICAgIGlmIChsYXN0ID4gbGluZXMubGVuZ3RoIC0gMSlcbiAgICAgIGxhc3QgPSBsaW5lcy5sZW5ndGggLSAxO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gbnVtYmVyOyBpIDw9IGxhc3Q7IGkrKykge1xuICAgICAgcmVzdWx0LnB1c2gobGluZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIGNvbHVtblNwYWNpbmcoY29sdW1ucykge1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbHVtbnMgLSAxOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSAnLSc7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmFyIFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yID0gZnVuY3Rpb24gVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IodXJsLCBmdW5jKSB7XG4gICAgJHRyYWNldXJSdW50aW1lLnN1cGVyQ29uc3RydWN0b3IoJFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKS5jYWxsKHRoaXMsIHVybCwgbnVsbCk7XG4gICAgdGhpcy5mdW5jID0gZnVuYztcbiAgfTtcbiAgdmFyICRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciA9IFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yO1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciwge2dldFVuY29hdGVkTW9kdWxlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlXylcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlbGF0aXZlUmVxdWlyZTtcbiAgICAgICAgaWYgKHR5cGVvZiAkdHJhY2V1clJ1bnRpbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlbGF0aXZlUmVxdWlyZSA9ICR0cmFjZXVyUnVudGltZS5yZXF1aXJlLmJpbmQobnVsbCwgdGhpcy51cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXyA9IHRoaXMuZnVuYy5jYWxsKGdsb2JhbCwgcmVsYXRpdmVSZXF1aXJlKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGlmIChleCBpbnN0YW5jZW9mIE1vZHVsZUV2YWx1YXRpb25FcnJvcikge1xuICAgICAgICAgIGV4LmxvYWRlZEJ5KHRoaXMudXJsKTtcbiAgICAgICAgICB0aHJvdyBleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXguc3RhY2spIHtcbiAgICAgICAgICB2YXIgbGluZXMgPSB0aGlzLmZ1bmMudG9TdHJpbmcoKS5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgdmFyIGV2YWxlZCA9IFtdO1xuICAgICAgICAgIGV4LnN0YWNrLnNwbGl0KCdcXG4nKS5zb21lKGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgICAgICAgICBpZiAoZnJhbWUuaW5kZXhPZignVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IuZ2V0VW5jb2F0ZWRNb2R1bGUnKSA+IDApXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgdmFyIG0gPSAvKGF0XFxzW15cXHNdKlxccykuKj46KFxcZCopOihcXGQqKVxcKS8uZXhlYyhmcmFtZSk7XG4gICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICB2YXIgbGluZSA9IHBhcnNlSW50KG1bMl0sIDEwKTtcbiAgICAgICAgICAgICAgZXZhbGVkID0gZXZhbGVkLmNvbmNhdChiZWZvcmVMaW5lcyhsaW5lcywgbGluZSkpO1xuICAgICAgICAgICAgICBldmFsZWQucHVzaChjb2x1bW5TcGFjaW5nKG1bM10pICsgJ14nKTtcbiAgICAgICAgICAgICAgZXZhbGVkID0gZXZhbGVkLmNvbmNhdChhZnRlckxpbmVzKGxpbmVzLCBsaW5lKSk7XG4gICAgICAgICAgICAgIGV2YWxlZC5wdXNoKCc9ID0gPSA9ID0gPSA9ID0gPScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXZhbGVkLnB1c2goZnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGV4LnN0YWNrID0gZXZhbGVkLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBNb2R1bGVFdmFsdWF0aW9uRXJyb3IodGhpcy51cmwsIGV4KTtcbiAgICAgIH1cbiAgICB9fSwge30sIFVuY29hdGVkTW9kdWxlRW50cnkpO1xuICBmdW5jdGlvbiBnZXRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihuYW1lKSB7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgcmV0dXJuO1xuICAgIHZhciB1cmwgPSBNb2R1bGVTdG9yZS5ub3JtYWxpemUobmFtZSk7XG4gICAgcmV0dXJuIG1vZHVsZUluc3RhbnRpYXRvcnNbdXJsXTtcbiAgfVxuICA7XG4gIHZhciBtb2R1bGVJbnN0YW5jZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgbGl2ZU1vZHVsZVNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIE1vZHVsZSh1bmNvYXRlZE1vZHVsZSkge1xuICAgIHZhciBpc0xpdmUgPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIGNvYXRlZE1vZHVsZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModW5jb2F0ZWRNb2R1bGUpLmZvckVhY2goKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBnZXR0ZXIsXG4gICAgICAgICAgdmFsdWU7XG4gICAgICBpZiAoaXNMaXZlID09PSBsaXZlTW9kdWxlU2VudGluZWwpIHtcbiAgICAgICAgdmFyIGRlc2NyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih1bmNvYXRlZE1vZHVsZSwgbmFtZSk7XG4gICAgICAgIGlmIChkZXNjci5nZXQpXG4gICAgICAgICAgZ2V0dGVyID0gZGVzY3IuZ2V0O1xuICAgICAgfVxuICAgICAgaWYgKCFnZXR0ZXIpIHtcbiAgICAgICAgdmFsdWUgPSB1bmNvYXRlZE1vZHVsZVtuYW1lXTtcbiAgICAgICAgZ2V0dGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvYXRlZE1vZHVsZSwgbmFtZSwge1xuICAgICAgICBnZXQ6IGdldHRlcixcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyhjb2F0ZWRNb2R1bGUpO1xuICAgIHJldHVybiBjb2F0ZWRNb2R1bGU7XG4gIH1cbiAgdmFyIE1vZHVsZVN0b3JlID0ge1xuICAgIG5vcm1hbGl6ZTogZnVuY3Rpb24obmFtZSwgcmVmZXJlck5hbWUsIHJlZmVyZXJBZGRyZXNzKSB7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtb2R1bGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nLCBub3QgJyArIHR5cGVvZiBuYW1lKTtcbiAgICAgIGlmIChpc0Fic29sdXRlKG5hbWUpKVxuICAgICAgICByZXR1cm4gY2Fub25pY2FsaXplVXJsKG5hbWUpO1xuICAgICAgaWYgKC9bXlxcLl1cXC9cXC5cXC5cXC8vLnRlc3QobmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtb2R1bGUgbmFtZSBlbWJlZHMgLy4uLzogJyArIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWVbMF0gPT09ICcuJyAmJiByZWZlcmVyTmFtZSlcbiAgICAgICAgcmV0dXJuIHJlc29sdmVVcmwocmVmZXJlck5hbWUsIG5hbWUpO1xuICAgICAgcmV0dXJuIGNhbm9uaWNhbGl6ZVVybChuYW1lKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24obm9ybWFsaXplZE5hbWUpIHtcbiAgICAgIHZhciBtID0gZ2V0VW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3Iobm9ybWFsaXplZE5hbWUpO1xuICAgICAgaWYgKCFtKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgdmFyIG1vZHVsZUluc3RhbmNlID0gbW9kdWxlSW5zdGFuY2VzW20udXJsXTtcbiAgICAgIGlmIChtb2R1bGVJbnN0YW5jZSlcbiAgICAgICAgcmV0dXJuIG1vZHVsZUluc3RhbmNlO1xuICAgICAgbW9kdWxlSW5zdGFuY2UgPSBNb2R1bGUobS5nZXRVbmNvYXRlZE1vZHVsZSgpLCBsaXZlTW9kdWxlU2VudGluZWwpO1xuICAgICAgcmV0dXJuIG1vZHVsZUluc3RhbmNlc1ttLnVybF0gPSBtb2R1bGVJbnN0YW5jZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24obm9ybWFsaXplZE5hbWUsIG1vZHVsZSkge1xuICAgICAgbm9ybWFsaXplZE5hbWUgPSBTdHJpbmcobm9ybWFsaXplZE5hbWUpO1xuICAgICAgbW9kdWxlSW5zdGFudGlhdG9yc1tub3JtYWxpemVkTmFtZV0gPSBuZXcgVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3Iobm9ybWFsaXplZE5hbWUsIChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1vZHVsZTtcbiAgICAgIH0pKTtcbiAgICAgIG1vZHVsZUluc3RhbmNlc1tub3JtYWxpemVkTmFtZV0gPSBtb2R1bGU7XG4gICAgfSxcbiAgICBnZXQgYmFzZVVSTCgpIHtcbiAgICAgIHJldHVybiBiYXNlVVJMO1xuICAgIH0sXG4gICAgc2V0IGJhc2VVUkwodikge1xuICAgICAgYmFzZVVSTCA9IFN0cmluZyh2KTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyTW9kdWxlOiBmdW5jdGlvbihuYW1lLCBkZXBzLCBmdW5jKSB7XG4gICAgICB2YXIgbm9ybWFsaXplZE5hbWUgPSBNb2R1bGVTdG9yZS5ub3JtYWxpemUobmFtZSk7XG4gICAgICBpZiAobW9kdWxlSW5zdGFudGlhdG9yc1tub3JtYWxpemVkTmFtZV0pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZHVwbGljYXRlIG1vZHVsZSBuYW1lZCAnICsgbm9ybWFsaXplZE5hbWUpO1xuICAgICAgbW9kdWxlSW5zdGFudGlhdG9yc1tub3JtYWxpemVkTmFtZV0gPSBuZXcgVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3Iobm9ybWFsaXplZE5hbWUsIGZ1bmMpO1xuICAgIH0sXG4gICAgYnVuZGxlU3RvcmU6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgcmVnaXN0ZXI6IGZ1bmN0aW9uKG5hbWUsIGRlcHMsIGZ1bmMpIHtcbiAgICAgIGlmICghZGVwcyB8fCAhZGVwcy5sZW5ndGggJiYgIWZ1bmMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJNb2R1bGUobmFtZSwgZGVwcywgZnVuYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJ1bmRsZVN0b3JlW25hbWVdID0ge1xuICAgICAgICAgIGRlcHM6IGRlcHMsXG4gICAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgJF9fMCA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIHZhciBkZXBNYXAgPSB7fTtcbiAgICAgICAgICAgIGRlcHMuZm9yRWFjaCgoZnVuY3Rpb24oZGVwLCBpbmRleCkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVwTWFwW2RlcF0gPSAkX18wW2luZGV4XTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHZhciByZWdpc3RyeUVudHJ5ID0gZnVuYy5jYWxsKHRoaXMsIGRlcE1hcCk7XG4gICAgICAgICAgICByZWdpc3RyeUVudHJ5LmV4ZWN1dGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiByZWdpc3RyeUVudHJ5LmV4cG9ydHM7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QW5vbnltb3VzTW9kdWxlOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICByZXR1cm4gbmV3IE1vZHVsZShmdW5jLmNhbGwoZ2xvYmFsKSwgbGl2ZU1vZHVsZVNlbnRpbmVsKTtcbiAgICB9LFxuICAgIGdldEZvclRlc3Rpbmc6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgIGlmICghdGhpcy50ZXN0aW5nUHJlZml4Xykge1xuICAgICAgICBPYmplY3Qua2V5cyhtb2R1bGVJbnN0YW5jZXMpLnNvbWUoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHZhciBtID0gLyh0cmFjZXVyQFteXFwvXSpcXC8pLy5leGVjKGtleSk7XG4gICAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgICRfXzAudGVzdGluZ1ByZWZpeF8gPSBtWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5nZXQodGhpcy50ZXN0aW5nUHJlZml4XyArIG5hbWUpO1xuICAgIH1cbiAgfTtcbiAgdmFyIG1vZHVsZVN0b3JlTW9kdWxlID0gbmV3IE1vZHVsZSh7TW9kdWxlU3RvcmU6IE1vZHVsZVN0b3JlfSk7XG4gIE1vZHVsZVN0b3JlLnNldCgnQHRyYWNldXIvc3JjL3J1bnRpbWUvTW9kdWxlU3RvcmUnLCBtb2R1bGVTdG9yZU1vZHVsZSk7XG4gIE1vZHVsZVN0b3JlLnNldCgnQHRyYWNldXIvc3JjL3J1bnRpbWUvTW9kdWxlU3RvcmUuanMnLCBtb2R1bGVTdG9yZU1vZHVsZSk7XG4gIHZhciBzZXR1cEdsb2JhbHMgPSAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzO1xuICAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzID0gZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICAgc2V0dXBHbG9iYWxzKGdsb2JhbCk7XG4gIH07XG4gICR0cmFjZXVyUnVudGltZS5Nb2R1bGVTdG9yZSA9IE1vZHVsZVN0b3JlO1xuICBnbG9iYWwuU3lzdGVtID0ge1xuICAgIHJlZ2lzdGVyOiBNb2R1bGVTdG9yZS5yZWdpc3Rlci5iaW5kKE1vZHVsZVN0b3JlKSxcbiAgICByZWdpc3Rlck1vZHVsZTogTW9kdWxlU3RvcmUucmVnaXN0ZXJNb2R1bGUuYmluZChNb2R1bGVTdG9yZSksXG4gICAgZ2V0OiBNb2R1bGVTdG9yZS5nZXQsXG4gICAgc2V0OiBNb2R1bGVTdG9yZS5zZXQsXG4gICAgbm9ybWFsaXplOiBNb2R1bGVTdG9yZS5ub3JtYWxpemVcbiAgfTtcbiAgJHRyYWNldXJSdW50aW1lLmdldE1vZHVsZUltcGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGluc3RhbnRpYXRvciA9IGdldFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5hbWUpO1xuICAgIHJldHVybiBpbnN0YW50aWF0b3IgJiYgaW5zdGFudGlhdG9yLmdldFVuY29hdGVkTW9kdWxlKCk7XG4gIH07XG59KSh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuU3lzdGVtLnJlZ2lzdGVyTW9kdWxlKFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHMuanNcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHMuanNcIjtcbiAgdmFyICRjZWlsID0gTWF0aC5jZWlsO1xuICB2YXIgJGZsb29yID0gTWF0aC5mbG9vcjtcbiAgdmFyICRpc0Zpbml0ZSA9IGlzRmluaXRlO1xuICB2YXIgJGlzTmFOID0gaXNOYU47XG4gIHZhciAkcG93ID0gTWF0aC5wb3c7XG4gIHZhciAkbWluID0gTWF0aC5taW47XG4gIHZhciB0b09iamVjdCA9ICR0cmFjZXVyUnVudGltZS50b09iamVjdDtcbiAgZnVuY3Rpb24gdG9VaW50MzIoeCkge1xuICAgIHJldHVybiB4ID4+PiAwO1xuICB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAmJiAodHlwZW9mIHggPT09ICdvYmplY3QnIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKTtcbiAgfVxuICBmdW5jdGlvbiBpc0NhbGxhYmxlKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG4gIH1cbiAgZnVuY3Rpb24gaXNOdW1iZXIoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ251bWJlcic7XG4gIH1cbiAgZnVuY3Rpb24gdG9JbnRlZ2VyKHgpIHtcbiAgICB4ID0gK3g7XG4gICAgaWYgKCRpc05hTih4KSlcbiAgICAgIHJldHVybiAwO1xuICAgIGlmICh4ID09PSAwIHx8ICEkaXNGaW5pdGUoeCkpXG4gICAgICByZXR1cm4geDtcbiAgICByZXR1cm4geCA+IDAgPyAkZmxvb3IoeCkgOiAkY2VpbCh4KTtcbiAgfVxuICB2YXIgTUFYX1NBRkVfTEVOR1RIID0gJHBvdygyLCA1MykgLSAxO1xuICBmdW5jdGlvbiB0b0xlbmd0aCh4KSB7XG4gICAgdmFyIGxlbiA9IHRvSW50ZWdlcih4KTtcbiAgICByZXR1cm4gbGVuIDwgMCA/IDAgOiAkbWluKGxlbiwgTUFYX1NBRkVfTEVOR1RIKTtcbiAgfVxuICBmdW5jdGlvbiBjaGVja0l0ZXJhYmxlKHgpIHtcbiAgICByZXR1cm4gIWlzT2JqZWN0KHgpID8gdW5kZWZpbmVkIDogeFtTeW1ib2wuaXRlcmF0b3JdO1xuICB9XG4gIGZ1bmN0aW9uIGlzQ29uc3RydWN0b3IoeCkge1xuICAgIHJldHVybiBpc0NhbGxhYmxlKHgpO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHZhbHVlLCBkb25lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGRvbmU6IGRvbmVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwgZGVzY3IpIHtcbiAgICBpZiAoIShuYW1lIGluIG9iamVjdCkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVEZWZpbmVNZXRob2Qob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlRGVmaW5lQ29uc3Qob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVBZGRGdW5jdGlvbnMob2JqZWN0LCBmdW5jdGlvbnMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmN0aW9ucy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgdmFyIG5hbWUgPSBmdW5jdGlvbnNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBmdW5jdGlvbnNbaSArIDFdO1xuICAgICAgbWF5YmVEZWZpbmVNZXRob2Qob2JqZWN0LCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQWRkQ29uc3RzKG9iamVjdCwgY29uc3RzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25zdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHZhciBuYW1lID0gY29uc3RzW2ldO1xuICAgICAgdmFyIHZhbHVlID0gY29uc3RzW2kgKyAxXTtcbiAgICAgIG1heWJlRGVmaW5lQ29uc3Qob2JqZWN0LCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQWRkSXRlcmF0b3Iob2JqZWN0LCBmdW5jLCBTeW1ib2wpIHtcbiAgICBpZiAoIVN5bWJvbCB8fCAhU3ltYm9sLml0ZXJhdG9yIHx8IG9iamVjdFtTeW1ib2wuaXRlcmF0b3JdKVxuICAgICAgcmV0dXJuO1xuICAgIGlmIChvYmplY3RbJ0BAaXRlcmF0b3InXSlcbiAgICAgIGZ1bmMgPSBvYmplY3RbJ0BAaXRlcmF0b3InXTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICAgIHZhbHVlOiBmdW5jLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIHZhciBwb2x5ZmlsbHMgPSBbXTtcbiAgZnVuY3Rpb24gcmVnaXN0ZXJQb2x5ZmlsbChmdW5jKSB7XG4gICAgcG9seWZpbGxzLnB1c2goZnVuYyk7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxBbGwoZ2xvYmFsKSB7XG4gICAgcG9seWZpbGxzLmZvckVhY2goKGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmKGdsb2JhbCk7XG4gICAgfSkpO1xuICB9XG4gIHJldHVybiB7XG4gICAgZ2V0IHRvT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIHRvT2JqZWN0O1xuICAgIH0sXG4gICAgZ2V0IHRvVWludDMyKCkge1xuICAgICAgcmV0dXJuIHRvVWludDMyO1xuICAgIH0sXG4gICAgZ2V0IGlzT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIGlzT2JqZWN0O1xuICAgIH0sXG4gICAgZ2V0IGlzQ2FsbGFibGUoKSB7XG4gICAgICByZXR1cm4gaXNDYWxsYWJsZTtcbiAgICB9LFxuICAgIGdldCBpc051bWJlcigpIHtcbiAgICAgIHJldHVybiBpc051bWJlcjtcbiAgICB9LFxuICAgIGdldCB0b0ludGVnZXIoKSB7XG4gICAgICByZXR1cm4gdG9JbnRlZ2VyO1xuICAgIH0sXG4gICAgZ2V0IHRvTGVuZ3RoKCkge1xuICAgICAgcmV0dXJuIHRvTGVuZ3RoO1xuICAgIH0sXG4gICAgZ2V0IGNoZWNrSXRlcmFibGUoKSB7XG4gICAgICByZXR1cm4gY2hlY2tJdGVyYWJsZTtcbiAgICB9LFxuICAgIGdldCBpc0NvbnN0cnVjdG9yKCkge1xuICAgICAgcmV0dXJuIGlzQ29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBnZXQgY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3Q7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVEZWZpbmUoKSB7XG4gICAgICByZXR1cm4gbWF5YmVEZWZpbmU7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVEZWZpbmVNZXRob2QoKSB7XG4gICAgICByZXR1cm4gbWF5YmVEZWZpbmVNZXRob2Q7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVEZWZpbmVDb25zdCgpIHtcbiAgICAgIHJldHVybiBtYXliZURlZmluZUNvbnN0O1xuICAgIH0sXG4gICAgZ2V0IG1heWJlQWRkRnVuY3Rpb25zKCkge1xuICAgICAgcmV0dXJuIG1heWJlQWRkRnVuY3Rpb25zO1xuICAgIH0sXG4gICAgZ2V0IG1heWJlQWRkQ29uc3RzKCkge1xuICAgICAgcmV0dXJuIG1heWJlQWRkQ29uc3RzO1xuICAgIH0sXG4gICAgZ2V0IG1heWJlQWRkSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gbWF5YmVBZGRJdGVyYXRvcjtcbiAgICB9LFxuICAgIGdldCByZWdpc3RlclBvbHlmaWxsKCkge1xuICAgICAgcmV0dXJuIHJlZ2lzdGVyUG9seWZpbGw7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxBbGwoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxBbGw7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXJNb2R1bGUoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9NYXAuanNcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwLmpzXCI7XG4gIHZhciAkX18wID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzLmpzXCIpLFxuICAgICAgaXNPYmplY3QgPSAkX18wLmlzT2JqZWN0LFxuICAgICAgbWF5YmVBZGRJdGVyYXRvciA9ICRfXzAubWF5YmVBZGRJdGVyYXRvcixcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX18wLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciBnZXRPd25IYXNoT2JqZWN0ID0gJHRyYWNldXJSdW50aW1lLmdldE93bkhhc2hPYmplY3Q7XG4gIHZhciAkaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgZGVsZXRlZFNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIGxvb2t1cEluZGV4KG1hcCwga2V5KSB7XG4gICAgaWYgKGlzT2JqZWN0KGtleSkpIHtcbiAgICAgIHZhciBoYXNoT2JqZWN0ID0gZ2V0T3duSGFzaE9iamVjdChrZXkpO1xuICAgICAgcmV0dXJuIGhhc2hPYmplY3QgJiYgbWFwLm9iamVjdEluZGV4X1toYXNoT2JqZWN0Lmhhc2hdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXG4gICAgICByZXR1cm4gbWFwLnN0cmluZ0luZGV4X1trZXldO1xuICAgIHJldHVybiBtYXAucHJpbWl0aXZlSW5kZXhfW2tleV07XG4gIH1cbiAgZnVuY3Rpb24gaW5pdE1hcChtYXApIHtcbiAgICBtYXAuZW50cmllc18gPSBbXTtcbiAgICBtYXAub2JqZWN0SW5kZXhfID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBtYXAuc3RyaW5nSW5kZXhfID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBtYXAucHJpbWl0aXZlSW5kZXhfID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBtYXAuZGVsZXRlZENvdW50XyA9IDA7XG4gIH1cbiAgdmFyIE1hcCA9IGZ1bmN0aW9uIE1hcCgpIHtcbiAgICB2YXIgaXRlcmFibGUgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKCFpc09iamVjdCh0aGlzKSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01hcCBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHR5cGUnKTtcbiAgICBpZiAoJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ2VudHJpZXNfJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01hcCBjYW4gbm90IGJlIHJlZW50cmFudGx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIGluaXRNYXAodGhpcyk7XG4gICAgaWYgKGl0ZXJhYmxlICE9PSBudWxsICYmIGl0ZXJhYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAodmFyICRfXzIgPSBpdGVyYWJsZVskdHJhY2V1clJ1bnRpbWUudG9Qcm9wZXJ0eShTeW1ib2wuaXRlcmF0b3IpXSgpLFxuICAgICAgICAgICRfXzM7ICEoJF9fMyA9ICRfXzIubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgdmFyICRfXzQgPSAkX18zLnZhbHVlLFxuICAgICAgICAgICAga2V5ID0gJF9fNFswXSxcbiAgICAgICAgICAgIHZhbHVlID0gJF9fNFsxXTtcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShNYXAsIHtcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVudHJpZXNfLmxlbmd0aCAvIDIgLSB0aGlzLmRlbGV0ZWRDb3VudF87XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIGluZGV4ID0gbG9va3VwSW5kZXgodGhpcywga2V5KTtcbiAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgb2JqZWN0TW9kZSA9IGlzT2JqZWN0KGtleSk7XG4gICAgICB2YXIgc3RyaW5nTW9kZSA9IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnO1xuICAgICAgdmFyIGluZGV4ID0gbG9va3VwSW5kZXgodGhpcywga2V5KTtcbiAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXggKyAxXSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLmVudHJpZXNfLmxlbmd0aDtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleF0gPSBrZXk7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXggKyAxXSA9IHZhbHVlO1xuICAgICAgICBpZiAob2JqZWN0TW9kZSkge1xuICAgICAgICAgIHZhciBoYXNoT2JqZWN0ID0gZ2V0T3duSGFzaE9iamVjdChrZXkpO1xuICAgICAgICAgIHZhciBoYXNoID0gaGFzaE9iamVjdC5oYXNoO1xuICAgICAgICAgIHRoaXMub2JqZWN0SW5kZXhfW2hhc2hdID0gaW5kZXg7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyaW5nTW9kZSkge1xuICAgICAgICAgIHRoaXMuc3RyaW5nSW5kZXhfW2tleV0gPSBpbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByaW1pdGl2ZUluZGV4X1trZXldID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgaGFzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBsb29rdXBJbmRleCh0aGlzLCBrZXkpICE9PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBkZWxldGU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIG9iamVjdE1vZGUgPSBpc09iamVjdChrZXkpO1xuICAgICAgdmFyIHN0cmluZ01vZGUgPSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJztcbiAgICAgIHZhciBpbmRleDtcbiAgICAgIHZhciBoYXNoO1xuICAgICAgaWYgKG9iamVjdE1vZGUpIHtcbiAgICAgICAgdmFyIGhhc2hPYmplY3QgPSBnZXRPd25IYXNoT2JqZWN0KGtleSk7XG4gICAgICAgIGlmIChoYXNoT2JqZWN0KSB7XG4gICAgICAgICAgaW5kZXggPSB0aGlzLm9iamVjdEluZGV4X1toYXNoID0gaGFzaE9iamVjdC5oYXNoXTtcbiAgICAgICAgICBkZWxldGUgdGhpcy5vYmplY3RJbmRleF9baGFzaF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc3RyaW5nTW9kZSkge1xuICAgICAgICBpbmRleCA9IHRoaXMuc3RyaW5nSW5kZXhfW2tleV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLnN0cmluZ0luZGV4X1trZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLnByaW1pdGl2ZUluZGV4X1trZXldO1xuICAgICAgICBkZWxldGUgdGhpcy5wcmltaXRpdmVJbmRleF9ba2V5XTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXhdID0gZGVsZXRlZFNlbnRpbmVsO1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4ICsgMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZGVsZXRlZENvdW50XysrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgIGluaXRNYXAodGhpcyk7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbihjYWxsYmFja0ZuKSB7XG4gICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbnRyaWVzXy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5lbnRyaWVzX1tpICsgMV07XG4gICAgICAgIGlmIChrZXkgPT09IGRlbGV0ZWRTZW50aW5lbClcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY2FsbGJhY2tGbi5jYWxsKHRoaXNBcmcsIHZhbHVlLCBrZXksIHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW50cmllczogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX181KCkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoaSA8IHRoaXMuZW50cmllc18ubGVuZ3RoKSA/IDggOiAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKSA/IDQgOiA2O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHgubWF5YmVUaHJvdygpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gNDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX181LCB0aGlzKTtcbiAgICB9KSxcbiAgICBrZXlzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzYoKSB7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChpIDwgdGhpcy5lbnRyaWVzXy5sZW5ndGgpID8gOCA6IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICBrZXkgPSB0aGlzLmVudHJpZXNfW2ldO1xuICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZW50cmllc19baSArIDFdO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoa2V5ID09PSBkZWxldGVkU2VudGluZWwpID8gNCA6IDY7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMjtcbiAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5tYXliZVRocm93KCk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzYsIHRoaXMpO1xuICAgIH0pLFxuICAgIHZhbHVlczogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX183KCkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoaSA8IHRoaXMuZW50cmllc18ubGVuZ3RoKSA/IDggOiAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKSA/IDQgOiA2O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5tYXliZVRocm93KCk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzcsIHRoaXMpO1xuICAgIH0pXG4gIH0sIHt9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1hcC5wcm90b3R5cGUsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogTWFwLnByb3RvdHlwZS5lbnRyaWVzXG4gIH0pO1xuICBmdW5jdGlvbiBwb2x5ZmlsbE1hcChnbG9iYWwpIHtcbiAgICB2YXIgJF9fNCA9IGdsb2JhbCxcbiAgICAgICAgT2JqZWN0ID0gJF9fNC5PYmplY3QsXG4gICAgICAgIFN5bWJvbCA9ICRfXzQuU3ltYm9sO1xuICAgIGlmICghZ2xvYmFsLk1hcClcbiAgICAgIGdsb2JhbC5NYXAgPSBNYXA7XG4gICAgdmFyIG1hcFByb3RvdHlwZSA9IGdsb2JhbC5NYXAucHJvdG90eXBlO1xuICAgIGlmIChtYXBQcm90b3R5cGUuZW50cmllcyA9PT0gdW5kZWZpbmVkKVxuICAgICAgZ2xvYmFsLk1hcCA9IE1hcDtcbiAgICBpZiAobWFwUHJvdG90eXBlLmVudHJpZXMpIHtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IobWFwUHJvdG90eXBlLCBtYXBQcm90b3R5cGUuZW50cmllcywgU3ltYm9sKTtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBnbG9iYWwuTWFwKCkuZW50cmllcygpKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSwgU3ltYm9sKTtcbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbE1hcCk7XG4gIHJldHVybiB7XG4gICAgZ2V0IE1hcCgpIHtcbiAgICAgIHJldHVybiBNYXA7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxNYXAoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxNYXA7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwLmpzXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXJNb2R1bGUoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9TZXQuanNcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU2V0LmpzXCI7XG4gIHZhciAkX18wID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzLmpzXCIpLFxuICAgICAgaXNPYmplY3QgPSAkX18wLmlzT2JqZWN0LFxuICAgICAgbWF5YmVBZGRJdGVyYXRvciA9ICRfXzAubWF5YmVBZGRJdGVyYXRvcixcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX18wLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciBNYXAgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwLmpzXCIpLk1hcDtcbiAgdmFyIGdldE93bkhhc2hPYmplY3QgPSAkdHJhY2V1clJ1bnRpbWUuZ2V0T3duSGFzaE9iamVjdDtcbiAgdmFyICRoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZ1bmN0aW9uIGluaXRTZXQoc2V0KSB7XG4gICAgc2V0Lm1hcF8gPSBuZXcgTWFwKCk7XG4gIH1cbiAgdmFyIFNldCA9IGZ1bmN0aW9uIFNldCgpIHtcbiAgICB2YXIgaXRlcmFibGUgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKCFpc09iamVjdCh0aGlzKSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NldCBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHR5cGUnKTtcbiAgICBpZiAoJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ21hcF8nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2V0IGNhbiBub3QgYmUgcmVlbnRyYW50bHkgaW5pdGlhbGlzZWQnKTtcbiAgICB9XG4gICAgaW5pdFNldCh0aGlzKTtcbiAgICBpZiAoaXRlcmFibGUgIT09IG51bGwgJiYgaXRlcmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yICh2YXIgJF9fNCA9IGl0ZXJhYmxlWyR0cmFjZXVyUnVudGltZS50b1Byb3BlcnR5KFN5bWJvbC5pdGVyYXRvcildKCksXG4gICAgICAgICAgJF9fNTsgISgkX181ID0gJF9fNC5uZXh0KCkpLmRvbmU7ICkge1xuICAgICAgICB2YXIgaXRlbSA9ICRfXzUudmFsdWU7XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLmFkZChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoU2V0LCB7XG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLnNpemU7XG4gICAgfSxcbiAgICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5oYXMoa2V5KTtcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICB0aGlzLm1hcF8uc2V0KGtleSwga2V5KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZGVsZXRlOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uZGVsZXRlKGtleSk7XG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLmNsZWFyKCk7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbihjYWxsYmFja0ZuKSB7XG4gICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIHZhciAkX18yID0gdGhpcztcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uZm9yRWFjaCgoZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICBjYWxsYmFja0ZuLmNhbGwodGhpc0FyZywga2V5LCBrZXksICRfXzIpO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgdmFsdWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzcoKSB7XG4gICAgICB2YXIgJF9fOCxcbiAgICAgICAgICAkX185O1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAkX184ID0gdGhpcy5tYXBfLmtleXMoKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICAgICRjdHguc2VudCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgJGN0eC5hY3Rpb24gPSAnbmV4dCc7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAkX185ID0gJF9fOFskY3R4LmFjdGlvbl0oJGN0eC5zZW50SWdub3JlVGhyb3cpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoJF9fOS5kb25lKSA/IDMgOiAyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgJGN0eC5zZW50ID0gJF9fOS52YWx1ZTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICByZXR1cm4gJF9fOS52YWx1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzcsIHRoaXMpO1xuICAgIH0pLFxuICAgIGVudHJpZXM6ICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb24gJF9fMTAoKSB7XG4gICAgICB2YXIgJF9fMTEsXG4gICAgICAgICAgJF9fMTI7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICRfXzExID0gdGhpcy5tYXBfLmVudHJpZXMoKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICAgICRjdHguc2VudCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgJGN0eC5hY3Rpb24gPSAnbmV4dCc7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAkX18xMiA9ICRfXzExWyRjdHguYWN0aW9uXSgkY3R4LnNlbnRJZ25vcmVUaHJvdyk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9ICgkX18xMi5kb25lKSA/IDMgOiAyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgJGN0eC5zZW50ID0gJF9fMTIudmFsdWU7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgcmV0dXJuICRfXzEyLnZhbHVlO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fMTAsIHRoaXMpO1xuICAgIH0pXG4gIH0sIHt9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNldC5wcm90b3R5cGUsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogU2V0LnByb3RvdHlwZS52YWx1ZXNcbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXQucHJvdG90eXBlLCAna2V5cycsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IFNldC5wcm90b3R5cGUudmFsdWVzXG4gIH0pO1xuICBmdW5jdGlvbiBwb2x5ZmlsbFNldChnbG9iYWwpIHtcbiAgICB2YXIgJF9fNiA9IGdsb2JhbCxcbiAgICAgICAgT2JqZWN0ID0gJF9fNi5PYmplY3QsXG4gICAgICAgIFN5bWJvbCA9ICRfXzYuU3ltYm9sO1xuICAgIGlmICghZ2xvYmFsLlNldClcbiAgICAgIGdsb2JhbC5TZXQgPSBTZXQ7XG4gICAgdmFyIHNldFByb3RvdHlwZSA9IGdsb2JhbC5TZXQucHJvdG90eXBlO1xuICAgIGlmIChzZXRQcm90b3R5cGUudmFsdWVzKSB7XG4gICAgICBtYXliZUFkZEl0ZXJhdG9yKHNldFByb3RvdHlwZSwgc2V0UHJvdG90eXBlLnZhbHVlcywgU3ltYm9sKTtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBnbG9iYWwuU2V0KCkudmFsdWVzKCkpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LCBTeW1ib2wpO1xuICAgIH1cbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsU2V0KTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgU2V0KCkge1xuICAgICAgcmV0dXJuIFNldDtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbFNldCgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbFNldDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9TZXQuanNcIiArICcnKTtcblN5c3RlbS5yZWdpc3Rlck1vZHVsZShcInRyYWNldXItcnVudGltZUAwLjAuNzkvbm9kZV9tb2R1bGVzL3JzdnAvbGliL3JzdnAvYXNhcC5qc1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L25vZGVfbW9kdWxlcy9yc3ZwL2xpYi9yc3ZwL2FzYXAuanNcIjtcbiAgdmFyIGxlbiA9IDA7XG4gIGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xuICAgIHF1ZXVlW2xlbl0gPSBjYWxsYmFjaztcbiAgICBxdWV1ZVtsZW4gKyAxXSA9IGFyZztcbiAgICBsZW4gKz0gMjtcbiAgICBpZiAobGVuID09PSAyKSB7XG4gICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgfVxuICB9XG4gIHZhciAkX19kZWZhdWx0ID0gYXNhcDtcbiAgdmFyIGJyb3dzZXJHbG9iYWwgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDoge307XG4gIHZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG4gIHZhciBpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG4gIGZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgbm9kZS5kYXRhID0gKGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gdXNlU2V0VGltZW91dCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZsdXNoLCAxKTtcbiAgICB9O1xuICB9XG4gIHZhciBxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgICAgdmFyIGNhbGxiYWNrID0gcXVldWVbaV07XG4gICAgICB2YXIgYXJnID0gcXVldWVbaSArIDFdO1xuICAgICAgY2FsbGJhY2soYXJnKTtcbiAgICAgIHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgICAgcXVldWVbaSArIDFdID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBsZW4gPSAwO1xuICB9XG4gIHZhciBzY2hlZHVsZUZsdXNoO1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHt9LnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIHNjaGVkdWxlRmx1c2ggPSB1c2VOZXh0VGljaygpO1xuICB9IGVsc2UgaWYgKEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbiAgfSBlbHNlIGlmIChpc1dvcmtlcikge1xuICAgIHNjaGVkdWxlRmx1c2ggPSB1c2VNZXNzYWdlQ2hhbm5lbCgpO1xuICB9IGVsc2Uge1xuICAgIHNjaGVkdWxlRmx1c2ggPSB1c2VTZXRUaW1lb3V0KCk7XG4gIH1cbiAgcmV0dXJuIHtnZXQgZGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiAkX19kZWZhdWx0O1xuICAgIH19O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXJNb2R1bGUoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9Qcm9taXNlLmpzXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1Byb21pc2UuanNcIjtcbiAgdmFyIGFzeW5jID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNzkvbm9kZV9tb2R1bGVzL3JzdnAvbGliL3JzdnAvYXNhcC5qc1wiKS5kZWZhdWx0O1xuICB2YXIgcmVnaXN0ZXJQb2x5ZmlsbCA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlscy5qc1wiKS5yZWdpc3RlclBvbHlmaWxsO1xuICB2YXIgcHJvbWlzZVJhdyA9IHt9O1xuICBmdW5jdGlvbiBpc1Byb21pc2UoeCkge1xuICAgIHJldHVybiB4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4LnN0YXR1c18gIT09IHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBpZFJlc29sdmVIYW5kbGVyKHgpIHtcbiAgICByZXR1cm4geDtcbiAgfVxuICBmdW5jdGlvbiBpZFJlamVjdEhhbmRsZXIoeCkge1xuICAgIHRocm93IHg7XG4gIH1cbiAgZnVuY3Rpb24gY2hhaW4ocHJvbWlzZSkge1xuICAgIHZhciBvblJlc29sdmUgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDogaWRSZXNvbHZlSGFuZGxlcjtcbiAgICB2YXIgb25SZWplY3QgPSBhcmd1bWVudHNbMl0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzJdIDogaWRSZWplY3RIYW5kbGVyO1xuICAgIHZhciBkZWZlcnJlZCA9IGdldERlZmVycmVkKHByb21pc2UuY29uc3RydWN0b3IpO1xuICAgIHN3aXRjaCAocHJvbWlzZS5zdGF0dXNfKSB7XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yO1xuICAgICAgY2FzZSAwOlxuICAgICAgICBwcm9taXNlLm9uUmVzb2x2ZV8ucHVzaChvblJlc29sdmUsIGRlZmVycmVkKTtcbiAgICAgICAgcHJvbWlzZS5vblJlamVjdF8ucHVzaChvblJlamVjdCwgZGVmZXJyZWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKzE6XG4gICAgICAgIHByb21pc2VFbnF1ZXVlKHByb21pc2UudmFsdWVfLCBbb25SZXNvbHZlLCBkZWZlcnJlZF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIHByb21pc2VFbnF1ZXVlKHByb21pc2UudmFsdWVfLCBbb25SZWplY3QsIGRlZmVycmVkXSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfVxuICBmdW5jdGlvbiBnZXREZWZlcnJlZChDKSB7XG4gICAgaWYgKHRoaXMgPT09ICRQcm9taXNlKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHByb21pc2VJbml0KG5ldyAkUHJvbWlzZShwcm9taXNlUmF3KSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBwcm9taXNlLFxuICAgICAgICByZXNvbHZlOiAoZnVuY3Rpb24oeCkge1xuICAgICAgICAgIHByb21pc2VSZXNvbHZlKHByb21pc2UsIHgpO1xuICAgICAgICB9KSxcbiAgICAgICAgcmVqZWN0OiAoZnVuY3Rpb24ocikge1xuICAgICAgICAgIHByb21pc2VSZWplY3QocHJvbWlzZSwgcik7XG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICByZXN1bHQucHJvbWlzZSA9IG5ldyBDKChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVzdWx0LnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICByZXN1bHQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZVNldChwcm9taXNlLCBzdGF0dXMsIHZhbHVlLCBvblJlc29sdmUsIG9uUmVqZWN0KSB7XG4gICAgcHJvbWlzZS5zdGF0dXNfID0gc3RhdHVzO1xuICAgIHByb21pc2UudmFsdWVfID0gdmFsdWU7XG4gICAgcHJvbWlzZS5vblJlc29sdmVfID0gb25SZXNvbHZlO1xuICAgIHByb21pc2Uub25SZWplY3RfID0gb25SZWplY3Q7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZUluaXQocHJvbWlzZSkge1xuICAgIHJldHVybiBwcm9taXNlU2V0KHByb21pc2UsIDAsIHVuZGVmaW5lZCwgW10sIFtdKTtcbiAgfVxuICB2YXIgUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UocmVzb2x2ZXIpIHtcbiAgICBpZiAocmVzb2x2ZXIgPT09IHByb21pc2VSYXcpXG4gICAgICByZXR1cm47XG4gICAgaWYgKHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gICAgdmFyIHByb21pc2UgPSBwcm9taXNlSW5pdCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgcmVzb2x2ZXIoKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcHJvbWlzZVJlc29sdmUocHJvbWlzZSwgeCk7XG4gICAgICB9KSwgKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgcHJvbWlzZVJlamVjdChwcm9taXNlLCByKTtcbiAgICAgIH0pKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBwcm9taXNlUmVqZWN0KHByb21pc2UsIGUpO1xuICAgIH1cbiAgfTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoUHJvbWlzZSwge1xuICAgIGNhdGNoOiBmdW5jdGlvbihvblJlamVjdCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0KTtcbiAgICB9LFxuICAgIHRoZW46IGZ1bmN0aW9uKG9uUmVzb2x2ZSwgb25SZWplY3QpIHtcbiAgICAgIGlmICh0eXBlb2Ygb25SZXNvbHZlICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICBvblJlc29sdmUgPSBpZFJlc29sdmVIYW5kbGVyO1xuICAgICAgaWYgKHR5cGVvZiBvblJlamVjdCAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgb25SZWplY3QgPSBpZFJlamVjdEhhbmRsZXI7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNoYWluKHRoaXMsIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgeCA9IHByb21pc2VDb2VyY2UoY29uc3RydWN0b3IsIHgpO1xuICAgICAgICByZXR1cm4geCA9PT0gdGhhdCA/IG9uUmVqZWN0KG5ldyBUeXBlRXJyb3IpIDogaXNQcm9taXNlKHgpID8geC50aGVuKG9uUmVzb2x2ZSwgb25SZWplY3QpIDogb25SZXNvbHZlKHgpO1xuICAgICAgfSwgb25SZWplY3QpO1xuICAgIH1cbiAgfSwge1xuICAgIHJlc29sdmU6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICh0aGlzID09PSAkUHJvbWlzZSkge1xuICAgICAgICBpZiAoaXNQcm9taXNlKHgpKSB7XG4gICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb21pc2VTZXQobmV3ICRQcm9taXNlKHByb21pc2VSYXcpLCArMSwgeCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVzb2x2ZSh4KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZWplY3Q6IGZ1bmN0aW9uKHIpIHtcbiAgICAgIGlmICh0aGlzID09PSAkUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVNldChuZXcgJFByb21pc2UocHJvbWlzZVJhdyksIC0xLCByKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcygoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVqZWN0KHIpO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGw6IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIGRlZmVycmVkID0gZ2V0RGVmZXJyZWQodGhpcyk7XG4gICAgICB2YXIgcmVzb2x1dGlvbnMgPSBbXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBjb3VudCA9IHZhbHVlcy5sZW5ndGg7XG4gICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzb2x1dGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUodmFsdWVzW2ldKS50aGVuKGZ1bmN0aW9uKGksIHgpIHtcbiAgICAgICAgICAgICAgcmVzb2x1dGlvbnNbaV0gPSB4O1xuICAgICAgICAgICAgICBpZiAoLS1jb3VudCA9PT0gMClcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc29sdXRpb25zKTtcbiAgICAgICAgICAgIH0uYmluZCh1bmRlZmluZWQsIGkpLCAoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qocik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH0sXG4gICAgcmFjZTogZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZCh0aGlzKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5yZXNvbHZlKHZhbHVlc1tpXSkudGhlbigoZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh4KTtcbiAgICAgICAgICB9KSwgKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxuICB9KTtcbiAgdmFyICRQcm9taXNlID0gUHJvbWlzZTtcbiAgdmFyICRQcm9taXNlUmVqZWN0ID0gJFByb21pc2UucmVqZWN0O1xuICBmdW5jdGlvbiBwcm9taXNlUmVzb2x2ZShwcm9taXNlLCB4KSB7XG4gICAgcHJvbWlzZURvbmUocHJvbWlzZSwgKzEsIHgsIHByb21pc2Uub25SZXNvbHZlXyk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZVJlamVjdChwcm9taXNlLCByKSB7XG4gICAgcHJvbWlzZURvbmUocHJvbWlzZSwgLTEsIHIsIHByb21pc2Uub25SZWplY3RfKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlRG9uZShwcm9taXNlLCBzdGF0dXMsIHZhbHVlLCByZWFjdGlvbnMpIHtcbiAgICBpZiAocHJvbWlzZS5zdGF0dXNfICE9PSAwKVxuICAgICAgcmV0dXJuO1xuICAgIHByb21pc2VFbnF1ZXVlKHZhbHVlLCByZWFjdGlvbnMpO1xuICAgIHByb21pc2VTZXQocHJvbWlzZSwgc3RhdHVzLCB2YWx1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZUVucXVldWUodmFsdWUsIHRhc2tzKSB7XG4gICAgYXN5bmMoKGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBwcm9taXNlSGFuZGxlKHZhbHVlLCB0YXNrc1tpXSwgdGFza3NbaSArIDFdKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZUhhbmRsZSh2YWx1ZSwgaGFuZGxlciwgZGVmZXJyZWQpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZGVmZXJyZWQucHJvbWlzZSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgICAgIGVsc2UgaWYgKGlzUHJvbWlzZShyZXN1bHQpKVxuICAgICAgICBjaGFpbihyZXN1bHQsIGRlZmVycmVkLnJlc29sdmUsIGRlZmVycmVkLnJlamVjdCk7XG4gICAgICBlbHNlXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cbiAgfVxuICB2YXIgdGhlbmFibGVTeW1ib2wgPSAnQEB0aGVuYWJsZSc7XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAmJiAodHlwZW9mIHggPT09ICdvYmplY3QnIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlQ29lcmNlKGNvbnN0cnVjdG9yLCB4KSB7XG4gICAgaWYgKCFpc1Byb21pc2UoeCkgJiYgaXNPYmplY3QoeCkpIHtcbiAgICAgIHZhciB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhlbiA9IHgudGhlbjtcbiAgICAgIH0gY2F0Y2ggKHIpIHtcbiAgICAgICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZVJlamVjdC5jYWxsKGNvbnN0cnVjdG9yLCByKTtcbiAgICAgICAgeFt0aGVuYWJsZVN5bWJvbF0gPSBwcm9taXNlO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgcCA9IHhbdGhlbmFibGVTeW1ib2xdO1xuICAgICAgICBpZiAocCkge1xuICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGdldERlZmVycmVkKGNvbnN0cnVjdG9yKTtcbiAgICAgICAgICB4W3RoZW5hYmxlU3ltYm9sXSA9IGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoZW4uY2FsbCh4LCBkZWZlcnJlZC5yZXNvbHZlLCBkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICAgIH0gY2F0Y2ggKHIpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxQcm9taXNlKGdsb2JhbCkge1xuICAgIGlmICghZ2xvYmFsLlByb21pc2UpXG4gICAgICBnbG9iYWwuUHJvbWlzZSA9IFByb21pc2U7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbFByb21pc2UpO1xuICByZXR1cm4ge1xuICAgIGdldCBQcm9taXNlKCkge1xuICAgICAgcmV0dXJuIFByb21pc2U7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxQcm9taXNlKCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsUHJvbWlzZTtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9Qcm9taXNlLmpzXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXJNb2R1bGUoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdJdGVyYXRvci5qc1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJF9fMjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nSXRlcmF0b3IuanNcIjtcbiAgdmFyICRfXzAgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHMuanNcIiksXG4gICAgICBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCA9ICRfXzAuY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QsXG4gICAgICBpc09iamVjdCA9ICRfXzAuaXNPYmplY3Q7XG4gIHZhciB0b1Byb3BlcnR5ID0gJHRyYWNldXJSdW50aW1lLnRvUHJvcGVydHk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciBpdGVyYXRlZFN0cmluZyA9IFN5bWJvbCgnaXRlcmF0ZWRTdHJpbmcnKTtcbiAgdmFyIHN0cmluZ0l0ZXJhdG9yTmV4dEluZGV4ID0gU3ltYm9sKCdzdHJpbmdJdGVyYXRvck5leHRJbmRleCcpO1xuICB2YXIgU3RyaW5nSXRlcmF0b3IgPSBmdW5jdGlvbiBTdHJpbmdJdGVyYXRvcigpIHt9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShTdHJpbmdJdGVyYXRvciwgKCRfXzIgPSB7fSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCRfXzIsIFwibmV4dFwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG8gPSB0aGlzO1xuICAgICAgaWYgKCFpc09iamVjdChvKSB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvLCBpdGVyYXRlZFN0cmluZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGhpcyBtdXN0IGJlIGEgU3RyaW5nSXRlcmF0b3Igb2JqZWN0Jyk7XG4gICAgICB9XG4gICAgICB2YXIgcyA9IG9bdG9Qcm9wZXJ0eShpdGVyYXRlZFN0cmluZyldO1xuICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHZhciBwb3NpdGlvbiA9IG9bdG9Qcm9wZXJ0eShzdHJpbmdJdGVyYXRvck5leHRJbmRleCldO1xuICAgICAgdmFyIGxlbiA9IHMubGVuZ3RoO1xuICAgICAgaWYgKHBvc2l0aW9uID49IGxlbikge1xuICAgICAgICBvW3RvUHJvcGVydHkoaXRlcmF0ZWRTdHJpbmcpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgZmlyc3QgPSBzLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICAgICAgdmFyIHJlc3VsdFN0cmluZztcbiAgICAgIGlmIChmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IGxlbikge1xuICAgICAgICByZXN1bHRTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGZpcnN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzZWNvbmQgPSBzLmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKTtcbiAgICAgICAgaWYgKHNlY29uZCA8IDB4REMwMCB8fCBzZWNvbmQgPiAweERGRkYpIHtcbiAgICAgICAgICByZXN1bHRTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGZpcnN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGZpcnN0KSArIFN0cmluZy5mcm9tQ2hhckNvZGUoc2Vjb25kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb1t0b1Byb3BlcnR5KHN0cmluZ0l0ZXJhdG9yTmV4dEluZGV4KV0gPSBwb3NpdGlvbiArIHJlc3VsdFN0cmluZy5sZW5ndGg7XG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QocmVzdWx0U3RyaW5nLCBmYWxzZSk7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCRfXzIsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksICRfXzIpLCB7fSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yKHN0cmluZykge1xuICAgIHZhciBzID0gU3RyaW5nKHN0cmluZyk7XG4gICAgdmFyIGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShTdHJpbmdJdGVyYXRvci5wcm90b3R5cGUpO1xuICAgIGl0ZXJhdG9yW3RvUHJvcGVydHkoaXRlcmF0ZWRTdHJpbmcpXSA9IHM7XG4gICAgaXRlcmF0b3JbdG9Qcm9wZXJ0eShzdHJpbmdJdGVyYXRvck5leHRJbmRleCldID0gMDtcbiAgICByZXR1cm4gaXRlcmF0b3I7XG4gIH1cbiAgcmV0dXJuIHtnZXQgY3JlYXRlU3RyaW5nSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlU3RyaW5nSXRlcmF0b3I7XG4gICAgfX07XG59KTtcblN5c3RlbS5yZWdpc3Rlck1vZHVsZShcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZy5qc1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmcuanNcIjtcbiAgdmFyIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ0l0ZXJhdG9yLmpzXCIpLmNyZWF0ZVN0cmluZ0l0ZXJhdG9yO1xuICB2YXIgJF9fMSA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlscy5qc1wiKSxcbiAgICAgIG1heWJlQWRkRnVuY3Rpb25zID0gJF9fMS5tYXliZUFkZEZ1bmN0aW9ucyxcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IgPSAkX18xLm1heWJlQWRkSXRlcmF0b3IsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fMS5yZWdpc3RlclBvbHlmaWxsO1xuICB2YXIgJHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyICRpbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mO1xuICB2YXIgJGxhc3RJbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5sYXN0SW5kZXhPZjtcbiAgZnVuY3Rpb24gc3RhcnRzV2l0aChzZWFyY2gpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIGlmICh0aGlzID09IG51bGwgfHwgJHRvU3RyaW5nLmNhbGwoc2VhcmNoKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgcG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICBpZiAoaXNOYU4ocG9zKSkge1xuICAgICAgcG9zID0gMDtcbiAgICB9XG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbiAgICByZXR1cm4gJGluZGV4T2YuY2FsbChzdHJpbmcsIHNlYXJjaFN0cmluZywgcG9zKSA9PSBzdGFydDtcbiAgfVxuICBmdW5jdGlvbiBlbmRzV2l0aChzZWFyY2gpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIGlmICh0aGlzID09IG51bGwgfHwgJHRvU3RyaW5nLmNhbGwoc2VhcmNoKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgcG9zID0gc3RyaW5nTGVuZ3RoO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKHBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICAgICAgaWYgKGlzTmFOKHBvcykpIHtcbiAgICAgICAgICBwb3MgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBlbmQgPSBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCBzdHJpbmdMZW5ndGgpO1xuICAgIHZhciBzdGFydCA9IGVuZCAtIHNlYXJjaExlbmd0aDtcbiAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAkbGFzdEluZGV4T2YuY2FsbChzdHJpbmcsIHNlYXJjaFN0cmluZywgc3RhcnQpID09IHN0YXJ0O1xuICB9XG4gIGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaCkge1xuICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIGlmIChzZWFyY2ggJiYgJHRvU3RyaW5nLmNhbGwoc2VhcmNoKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgcG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICBpZiAocG9zICE9IHBvcykge1xuICAgICAgcG9zID0gMDtcbiAgICB9XG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbiAgICBpZiAoc2VhcmNoTGVuZ3RoICsgc3RhcnQgPiBzdHJpbmdMZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICRpbmRleE9mLmNhbGwoc3RyaW5nLCBzZWFyY2hTdHJpbmcsIHBvcykgIT0gLTE7XG4gIH1cbiAgZnVuY3Rpb24gcmVwZWF0KGNvdW50KSB7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgdmFyIG4gPSBjb3VudCA/IE51bWJlcihjb3VudCkgOiAwO1xuICAgIGlmIChpc05hTihuKSkge1xuICAgICAgbiA9IDA7XG4gICAgfVxuICAgIGlmIChuIDwgMCB8fCBuID09IEluZmluaXR5KSB7XG4gICAgICB0aHJvdyBSYW5nZUVycm9yKCk7XG4gICAgfVxuICAgIGlmIChuID09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHdoaWxlIChuLS0pIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmc7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gY29kZVBvaW50QXQocG9zaXRpb24pIHtcbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICB2YXIgc2l6ZSA9IHN0cmluZy5sZW5ndGg7XG4gICAgdmFyIGluZGV4ID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICBpZiAoaXNOYU4oaW5kZXgpKSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gc2l6ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIGZpcnN0ID0gc3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgIHZhciBzZWNvbmQ7XG4gICAgaWYgKGZpcnN0ID49IDB4RDgwMCAmJiBmaXJzdCA8PSAweERCRkYgJiYgc2l6ZSA+IGluZGV4ICsgMSkge1xuICAgICAgc2Vjb25kID0gc3RyaW5nLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbiAgICAgIGlmIChzZWNvbmQgPj0gMHhEQzAwICYmIHNlY29uZCA8PSAweERGRkYpIHtcbiAgICAgICAgcmV0dXJuIChmaXJzdCAtIDB4RDgwMCkgKiAweDQwMCArIHNlY29uZCAtIDB4REMwMCArIDB4MTAwMDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaXJzdDtcbiAgfVxuICBmdW5jdGlvbiByYXcoY2FsbHNpdGUpIHtcbiAgICB2YXIgcmF3ID0gY2FsbHNpdGUucmF3O1xuICAgIHZhciBsZW4gPSByYXcubGVuZ3RoID4+PiAwO1xuICAgIGlmIChsZW4gPT09IDApXG4gICAgICByZXR1cm4gJyc7XG4gICAgdmFyIHMgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHMgKz0gcmF3W2ldO1xuICAgICAgaWYgKGkgKyAxID09PSBsZW4pXG4gICAgICAgIHJldHVybiBzO1xuICAgICAgcyArPSBhcmd1bWVudHNbKytpXTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZnJvbUNvZGVQb2ludCgpIHtcbiAgICB2YXIgY29kZVVuaXRzID0gW107XG4gICAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgICB2YXIgaGlnaFN1cnJvZ2F0ZTtcbiAgICB2YXIgbG93U3Vycm9nYXRlO1xuICAgIHZhciBpbmRleCA9IC0xO1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgY29kZVBvaW50ID0gTnVtYmVyKGFyZ3VtZW50c1tpbmRleF0pO1xuICAgICAgaWYgKCFpc0Zpbml0ZShjb2RlUG9pbnQpIHx8IGNvZGVQb2ludCA8IDAgfHwgY29kZVBvaW50ID4gMHgxMEZGRkYgfHwgZmxvb3IoY29kZVBvaW50KSAhPSBjb2RlUG9pbnQpIHtcbiAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcignSW52YWxpZCBjb2RlIHBvaW50OiAnICsgY29kZVBvaW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2RlUG9pbnQgPD0gMHhGRkZGKSB7XG4gICAgICAgIGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMDtcbiAgICAgICAgaGlnaFN1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgPj4gMTApICsgMHhEODAwO1xuICAgICAgICBsb3dTdXJyb2dhdGUgPSAoY29kZVBvaW50ICUgMHg0MDApICsgMHhEQzAwO1xuICAgICAgICBjb2RlVW5pdHMucHVzaChoaWdoU3Vycm9nYXRlLCBsb3dTdXJyb2dhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlVW5pdHMpO1xuICB9XG4gIGZ1bmN0aW9uIHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yKCkge1xuICAgIHZhciBvID0gJHRyYWNldXJSdW50aW1lLmNoZWNrT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgIHZhciBzID0gU3RyaW5nKG8pO1xuICAgIHJldHVybiBjcmVhdGVTdHJpbmdJdGVyYXRvcihzKTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbFN0cmluZyhnbG9iYWwpIHtcbiAgICB2YXIgU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhTdHJpbmcucHJvdG90eXBlLCBbJ2NvZGVQb2ludEF0JywgY29kZVBvaW50QXQsICdlbmRzV2l0aCcsIGVuZHNXaXRoLCAnaW5jbHVkZXMnLCBpbmNsdWRlcywgJ3JlcGVhdCcsIHJlcGVhdCwgJ3N0YXJ0c1dpdGgnLCBzdGFydHNXaXRoXSk7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoU3RyaW5nLCBbJ2Zyb21Db2RlUG9pbnQnLCBmcm9tQ29kZVBvaW50LCAncmF3JywgcmF3XSk7XG4gICAgbWF5YmVBZGRJdGVyYXRvcihTdHJpbmcucHJvdG90eXBlLCBzdHJpbmdQcm90b3R5cGVJdGVyYXRvciwgU3ltYm9sKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsU3RyaW5nKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgc3RhcnRzV2l0aCgpIHtcbiAgICAgIHJldHVybiBzdGFydHNXaXRoO1xuICAgIH0sXG4gICAgZ2V0IGVuZHNXaXRoKCkge1xuICAgICAgcmV0dXJuIGVuZHNXaXRoO1xuICAgIH0sXG4gICAgZ2V0IGluY2x1ZGVzKCkge1xuICAgICAgcmV0dXJuIGluY2x1ZGVzO1xuICAgIH0sXG4gICAgZ2V0IHJlcGVhdCgpIHtcbiAgICAgIHJldHVybiByZXBlYXQ7XG4gICAgfSxcbiAgICBnZXQgY29kZVBvaW50QXQoKSB7XG4gICAgICByZXR1cm4gY29kZVBvaW50QXQ7XG4gICAgfSxcbiAgICBnZXQgcmF3KCkge1xuICAgICAgcmV0dXJuIHJhdztcbiAgICB9LFxuICAgIGdldCBmcm9tQ29kZVBvaW50KCkge1xuICAgICAgcmV0dXJuIGZyb21Db2RlUG9pbnQ7XG4gICAgfSxcbiAgICBnZXQgc3RyaW5nUHJvdG90eXBlSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gc3RyaW5nUHJvdG90eXBlSXRlcmF0b3I7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxTdHJpbmcoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxTdHJpbmc7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nLmpzXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXJNb2R1bGUoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheUl0ZXJhdG9yLmpzXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkX18yO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheUl0ZXJhdG9yLmpzXCI7XG4gIHZhciAkX18wID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzLmpzXCIpLFxuICAgICAgdG9PYmplY3QgPSAkX18wLnRvT2JqZWN0LFxuICAgICAgdG9VaW50MzIgPSAkX18wLnRvVWludDMyLFxuICAgICAgY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QgPSAkX18wLmNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0O1xuICB2YXIgQVJSQVlfSVRFUkFUT1JfS0lORF9LRVlTID0gMTtcbiAgdmFyIEFSUkFZX0lURVJBVE9SX0tJTkRfVkFMVUVTID0gMjtcbiAgdmFyIEFSUkFZX0lURVJBVE9SX0tJTkRfRU5UUklFUyA9IDM7XG4gIHZhciBBcnJheUl0ZXJhdG9yID0gZnVuY3Rpb24gQXJyYXlJdGVyYXRvcigpIHt9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShBcnJheUl0ZXJhdG9yLCAoJF9fMiA9IHt9LCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMiwgXCJuZXh0XCIsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSB0b09iamVjdCh0aGlzKTtcbiAgICAgIHZhciBhcnJheSA9IGl0ZXJhdG9yLml0ZXJhdG9yT2JqZWN0XztcbiAgICAgIGlmICghYXJyYXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0IGlzIG5vdCBhbiBBcnJheUl0ZXJhdG9yJyk7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZXggPSBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XztcbiAgICAgIHZhciBpdGVtS2luZCA9IGl0ZXJhdG9yLmFycmF5SXRlcmF0aW9uS2luZF87XG4gICAgICB2YXIgbGVuZ3RoID0gdG9VaW50MzIoYXJyYXkubGVuZ3RoKTtcbiAgICAgIGlmIChpbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgICAgaXRlcmF0b3IuYXJyYXlJdGVyYXRvck5leHRJbmRleF8gPSBJbmZpbml0eTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XyA9IGluZGV4ICsgMTtcbiAgICAgIGlmIChpdGVtS2luZCA9PSBBUlJBWV9JVEVSQVRPUl9LSU5EX1ZBTFVFUylcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KGFycmF5W2luZGV4XSwgZmFsc2UpO1xuICAgICAgaWYgKGl0ZW1LaW5kID09IEFSUkFZX0lURVJBVE9SX0tJTkRfRU5UUklFUylcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KFtpbmRleCwgYXJyYXlbaW5kZXhdXSwgZmFsc2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KGluZGV4LCBmYWxzZSk7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCRfXzIsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksICRfXzIpLCB7fSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5SXRlcmF0b3IoYXJyYXksIGtpbmQpIHtcbiAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3QoYXJyYXkpO1xuICAgIHZhciBpdGVyYXRvciA9IG5ldyBBcnJheUl0ZXJhdG9yO1xuICAgIGl0ZXJhdG9yLml0ZXJhdG9yT2JqZWN0XyA9IG9iamVjdDtcbiAgICBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XyA9IDA7XG4gICAgaXRlcmF0b3IuYXJyYXlJdGVyYXRpb25LaW5kXyA9IGtpbmQ7XG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xuICB9XG4gIGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFycmF5SXRlcmF0b3IodGhpcywgQVJSQVlfSVRFUkFUT1JfS0lORF9FTlRSSUVTKTtcbiAgfVxuICBmdW5jdGlvbiBrZXlzKCkge1xuICAgIHJldHVybiBjcmVhdGVBcnJheUl0ZXJhdG9yKHRoaXMsIEFSUkFZX0lURVJBVE9SX0tJTkRfS0VZUyk7XG4gIH1cbiAgZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHJldHVybiBjcmVhdGVBcnJheUl0ZXJhdG9yKHRoaXMsIEFSUkFZX0lURVJBVE9SX0tJTkRfVkFMVUVTKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGdldCBlbnRyaWVzKCkge1xuICAgICAgcmV0dXJuIGVudHJpZXM7XG4gICAgfSxcbiAgICBnZXQga2V5cygpIHtcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH0sXG4gICAgZ2V0IHZhbHVlcygpIHtcbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXJNb2R1bGUoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheS5qc1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheS5qc1wiO1xuICB2YXIgJF9fMCA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheUl0ZXJhdG9yLmpzXCIpLFxuICAgICAgZW50cmllcyA9ICRfXzAuZW50cmllcyxcbiAgICAgIGtleXMgPSAkX18wLmtleXMsXG4gICAgICB2YWx1ZXMgPSAkX18wLnZhbHVlcztcbiAgdmFyICRfXzEgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHMuanNcIiksXG4gICAgICBjaGVja0l0ZXJhYmxlID0gJF9fMS5jaGVja0l0ZXJhYmxlLFxuICAgICAgaXNDYWxsYWJsZSA9ICRfXzEuaXNDYWxsYWJsZSxcbiAgICAgIGlzQ29uc3RydWN0b3IgPSAkX18xLmlzQ29uc3RydWN0b3IsXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzEubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICBtYXliZUFkZEl0ZXJhdG9yID0gJF9fMS5tYXliZUFkZEl0ZXJhdG9yLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzEucmVnaXN0ZXJQb2x5ZmlsbCxcbiAgICAgIHRvSW50ZWdlciA9ICRfXzEudG9JbnRlZ2VyLFxuICAgICAgdG9MZW5ndGggPSAkX18xLnRvTGVuZ3RoLFxuICAgICAgdG9PYmplY3QgPSAkX18xLnRvT2JqZWN0O1xuICBmdW5jdGlvbiBmcm9tKGFyckxpa2UpIHtcbiAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMl07XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBpdGVtcyA9IHRvT2JqZWN0KGFyckxpa2UpO1xuICAgIHZhciBtYXBwaW5nID0gbWFwRm4gIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgayA9IDA7XG4gICAgdmFyIGFycixcbiAgICAgICAgbGVuO1xuICAgIGlmIChtYXBwaW5nICYmICFpc0NhbGxhYmxlKG1hcEZuKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIGlmIChjaGVja0l0ZXJhYmxlKGl0ZW1zKSkge1xuICAgICAgYXJyID0gaXNDb25zdHJ1Y3RvcihDKSA/IG5ldyBDKCkgOiBbXTtcbiAgICAgIGZvciAodmFyICRfXzIgPSBpdGVtc1skdHJhY2V1clJ1bnRpbWUudG9Qcm9wZXJ0eShTeW1ib2wuaXRlcmF0b3IpXSgpLFxuICAgICAgICAgICRfXzM7ICEoJF9fMyA9ICRfXzIubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkX18zLnZhbHVlO1xuICAgICAgICB7XG4gICAgICAgICAgaWYgKG1hcHBpbmcpIHtcbiAgICAgICAgICAgIGFycltrXSA9IG1hcEZuLmNhbGwodGhpc0FyZywgaXRlbSwgayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycltrXSA9IGl0ZW07XG4gICAgICAgICAgfVxuICAgICAgICAgIGsrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXJyLmxlbmd0aCA9IGs7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBsZW4gPSB0b0xlbmd0aChpdGVtcy5sZW5ndGgpO1xuICAgIGFyciA9IGlzQ29uc3RydWN0b3IoQykgPyBuZXcgQyhsZW4pIDogbmV3IEFycmF5KGxlbik7XG4gICAgZm9yICg7IGsgPCBsZW47IGsrKykge1xuICAgICAgaWYgKG1hcHBpbmcpIHtcbiAgICAgICAgYXJyW2tdID0gdHlwZW9mIHRoaXNBcmcgPT09ICd1bmRlZmluZWQnID8gbWFwRm4oaXRlbXNba10sIGspIDogbWFwRm4uY2FsbCh0aGlzQXJnLCBpdGVtc1trXSwgayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJba10gPSBpdGVtc1trXTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXJyLmxlbmd0aCA9IGxlbjtcbiAgICByZXR1cm4gYXJyO1xuICB9XG4gIGZ1bmN0aW9uIG9mKCkge1xuICAgIGZvciAodmFyIGl0ZW1zID0gW10sXG4gICAgICAgICRfXzQgPSAwOyAkX180IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNCsrKVxuICAgICAgaXRlbXNbJF9fNF0gPSBhcmd1bWVudHNbJF9fNF07XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBsZW4gPSBpdGVtcy5sZW5ndGg7XG4gICAgdmFyIGFyciA9IGlzQ29uc3RydWN0b3IoQykgPyBuZXcgQyhsZW4pIDogbmV3IEFycmF5KGxlbik7XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBsZW47IGsrKykge1xuICAgICAgYXJyW2tdID0gaXRlbXNba107XG4gICAgfVxuICAgIGFyci5sZW5ndGggPSBsZW47XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuICBmdW5jdGlvbiBmaWxsKHZhbHVlKSB7XG4gICAgdmFyIHN0YXJ0ID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gICAgdmFyIGVuZCA9IGFyZ3VtZW50c1syXTtcbiAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHRvTGVuZ3RoKG9iamVjdC5sZW5ndGgpO1xuICAgIHZhciBmaWxsU3RhcnQgPSB0b0ludGVnZXIoc3RhcnQpO1xuICAgIHZhciBmaWxsRW5kID0gZW5kICE9PSB1bmRlZmluZWQgPyB0b0ludGVnZXIoZW5kKSA6IGxlbjtcbiAgICBmaWxsU3RhcnQgPSBmaWxsU3RhcnQgPCAwID8gTWF0aC5tYXgobGVuICsgZmlsbFN0YXJ0LCAwKSA6IE1hdGgubWluKGZpbGxTdGFydCwgbGVuKTtcbiAgICBmaWxsRW5kID0gZmlsbEVuZCA8IDAgPyBNYXRoLm1heChsZW4gKyBmaWxsRW5kLCAwKSA6IE1hdGgubWluKGZpbGxFbmQsIGxlbik7XG4gICAgd2hpbGUgKGZpbGxTdGFydCA8IGZpbGxFbmQpIHtcbiAgICAgIG9iamVjdFtmaWxsU3RhcnRdID0gdmFsdWU7XG4gICAgICBmaWxsU3RhcnQrKztcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBmaW5kKHByZWRpY2F0ZSkge1xuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgIHJldHVybiBmaW5kSGVscGVyKHRoaXMsIHByZWRpY2F0ZSwgdGhpc0FyZyk7XG4gIH1cbiAgZnVuY3Rpb24gZmluZEluZGV4KHByZWRpY2F0ZSkge1xuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgIHJldHVybiBmaW5kSGVscGVyKHRoaXMsIHByZWRpY2F0ZSwgdGhpc0FyZywgdHJ1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gZmluZEhlbHBlcihzZWxmLCBwcmVkaWNhdGUpIHtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1syXTtcbiAgICB2YXIgcmV0dXJuSW5kZXggPSBhcmd1bWVudHNbM10gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzNdIDogZmFsc2U7XG4gICAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KHNlbGYpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aChvYmplY3QubGVuZ3RoKTtcbiAgICBpZiAoIWlzQ2FsbGFibGUocHJlZGljYXRlKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtpXTtcbiAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgb2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gcmV0dXJuSW5kZXggPyBpIDogdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5JbmRleCA/IC0xIDogdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsQXJyYXkoZ2xvYmFsKSB7XG4gICAgdmFyICRfXzUgPSBnbG9iYWwsXG4gICAgICAgIEFycmF5ID0gJF9fNS5BcnJheSxcbiAgICAgICAgT2JqZWN0ID0gJF9fNS5PYmplY3QsXG4gICAgICAgIFN5bWJvbCA9ICRfXzUuU3ltYm9sO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKEFycmF5LnByb3RvdHlwZSwgWydlbnRyaWVzJywgZW50cmllcywgJ2tleXMnLCBrZXlzLCAndmFsdWVzJywgdmFsdWVzLCAnZmlsbCcsIGZpbGwsICdmaW5kJywgZmluZCwgJ2ZpbmRJbmRleCcsIGZpbmRJbmRleF0pO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKEFycmF5LCBbJ2Zyb20nLCBmcm9tLCAnb2YnLCBvZl0pO1xuICAgIG1heWJlQWRkSXRlcmF0b3IoQXJyYXkucHJvdG90eXBlLCB2YWx1ZXMsIFN5bWJvbCk7XG4gICAgbWF5YmVBZGRJdGVyYXRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YoW10udmFsdWVzKCkpLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIFN5bWJvbCk7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbEFycmF5KTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgZnJvbSgpIHtcbiAgICAgIHJldHVybiBmcm9tO1xuICAgIH0sXG4gICAgZ2V0IG9mKCkge1xuICAgICAgcmV0dXJuIG9mO1xuICAgIH0sXG4gICAgZ2V0IGZpbGwoKSB7XG4gICAgICByZXR1cm4gZmlsbDtcbiAgICB9LFxuICAgIGdldCBmaW5kKCkge1xuICAgICAgcmV0dXJuIGZpbmQ7XG4gICAgfSxcbiAgICBnZXQgZmluZEluZGV4KCkge1xuICAgICAgcmV0dXJuIGZpbmRJbmRleDtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbEFycmF5KCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsQXJyYXk7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXkuanNcIiArICcnKTtcblN5c3RlbS5yZWdpc3Rlck1vZHVsZShcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL09iamVjdC5qc1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9PYmplY3QuanNcIjtcbiAgdmFyICRfXzAgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHMuanNcIiksXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzAubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fMC5yZWdpc3RlclBvbHlmaWxsO1xuICB2YXIgJF9fMSA9ICR0cmFjZXVyUnVudGltZSxcbiAgICAgIGRlZmluZVByb3BlcnR5ID0gJF9fMS5kZWZpbmVQcm9wZXJ0eSxcbiAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICRfXzEuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAgICAgZ2V0T3duUHJvcGVydHlOYW1lcyA9ICRfXzEuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgICAgIGlzUHJpdmF0ZU5hbWUgPSAkX18xLmlzUHJpdmF0ZU5hbWUsXG4gICAgICBrZXlzID0gJF9fMS5rZXlzO1xuICBmdW5jdGlvbiBpcyhsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0ID09PSByaWdodClcbiAgICAgIHJldHVybiBsZWZ0ICE9PSAwIHx8IDEgLyBsZWZ0ID09PSAxIC8gcmlnaHQ7XG4gICAgcmV0dXJuIGxlZnQgIT09IGxlZnQgJiYgcmlnaHQgIT09IHJpZ2h0O1xuICB9XG4gIGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIHZhciBwcm9wcyA9IHNvdXJjZSA9PSBudWxsID8gW10gOiBrZXlzKHNvdXJjZSk7XG4gICAgICB2YXIgcCxcbiAgICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gICAgICBmb3IgKHAgPSAwOyBwIDwgbGVuZ3RoOyBwKyspIHtcbiAgICAgICAgdmFyIG5hbWUgPSBwcm9wc1twXTtcbiAgICAgICAgaWYgKGlzUHJpdmF0ZU5hbWUobmFtZSkpXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHNvdXJjZVtuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBmdW5jdGlvbiBtaXhpbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBwcm9wcyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlKTtcbiAgICB2YXIgcCxcbiAgICAgICAgZGVzY3JpcHRvcixcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICAgIGZvciAocCA9IDA7IHAgPCBsZW5ndGg7IHArKykge1xuICAgICAgdmFyIG5hbWUgPSBwcm9wc1twXTtcbiAgICAgIGlmIChpc1ByaXZhdGVOYW1lKG5hbWUpKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBwcm9wc1twXSk7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BzW3BdLCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE9iamVjdChnbG9iYWwpIHtcbiAgICB2YXIgT2JqZWN0ID0gZ2xvYmFsLk9iamVjdDtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhPYmplY3QsIFsnYXNzaWduJywgYXNzaWduLCAnaXMnLCBpcywgJ21peGluJywgbWl4aW5dKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsT2JqZWN0KTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgaXMoKSB7XG4gICAgICByZXR1cm4gaXM7XG4gICAgfSxcbiAgICBnZXQgYXNzaWduKCkge1xuICAgICAgcmV0dXJuIGFzc2lnbjtcbiAgICB9LFxuICAgIGdldCBtaXhpbigpIHtcbiAgICAgIHJldHVybiBtaXhpbjtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbE9iamVjdCgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbE9iamVjdDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9PYmplY3QuanNcIiArICcnKTtcblN5c3RlbS5yZWdpc3Rlck1vZHVsZShcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL051bWJlci5qc1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9OdW1iZXIuanNcIjtcbiAgdmFyICRfXzAgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHMuanNcIiksXG4gICAgICBpc051bWJlciA9ICRfXzAuaXNOdW1iZXIsXG4gICAgICBtYXliZUFkZENvbnN0cyA9ICRfXzAubWF5YmVBZGRDb25zdHMsXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzAubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fMC5yZWdpc3RlclBvbHlmaWxsLFxuICAgICAgdG9JbnRlZ2VyID0gJF9fMC50b0ludGVnZXI7XG4gIHZhciAkYWJzID0gTWF0aC5hYnM7XG4gIHZhciAkaXNGaW5pdGUgPSBpc0Zpbml0ZTtcbiAgdmFyICRpc05hTiA9IGlzTmFOO1xuICB2YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gIHZhciBNSU5fU0FGRV9JTlRFR0VSID0gLU1hdGgucG93KDIsIDUzKSArIDE7XG4gIHZhciBFUFNJTE9OID0gTWF0aC5wb3coMiwgLTUyKTtcbiAgZnVuY3Rpb24gTnVtYmVySXNGaW5pdGUobnVtYmVyKSB7XG4gICAgcmV0dXJuIGlzTnVtYmVyKG51bWJlcikgJiYgJGlzRmluaXRlKG51bWJlcik7XG4gIH1cbiAgO1xuICBmdW5jdGlvbiBpc0ludGVnZXIobnVtYmVyKSB7XG4gICAgcmV0dXJuIE51bWJlcklzRmluaXRlKG51bWJlcikgJiYgdG9JbnRlZ2VyKG51bWJlcikgPT09IG51bWJlcjtcbiAgfVxuICBmdW5jdGlvbiBOdW1iZXJJc05hTihudW1iZXIpIHtcbiAgICByZXR1cm4gaXNOdW1iZXIobnVtYmVyKSAmJiAkaXNOYU4obnVtYmVyKTtcbiAgfVxuICA7XG4gIGZ1bmN0aW9uIGlzU2FmZUludGVnZXIobnVtYmVyKSB7XG4gICAgaWYgKE51bWJlcklzRmluaXRlKG51bWJlcikpIHtcbiAgICAgIHZhciBpbnRlZ3JhbCA9IHRvSW50ZWdlcihudW1iZXIpO1xuICAgICAgaWYgKGludGVncmFsID09PSBudW1iZXIpXG4gICAgICAgIHJldHVybiAkYWJzKGludGVncmFsKSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxOdW1iZXIoZ2xvYmFsKSB7XG4gICAgdmFyIE51bWJlciA9IGdsb2JhbC5OdW1iZXI7XG4gICAgbWF5YmVBZGRDb25zdHMoTnVtYmVyLCBbJ01BWF9TQUZFX0lOVEVHRVInLCBNQVhfU0FGRV9JTlRFR0VSLCAnTUlOX1NBRkVfSU5URUdFUicsIE1JTl9TQUZFX0lOVEVHRVIsICdFUFNJTE9OJywgRVBTSUxPTl0pO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKE51bWJlciwgWydpc0Zpbml0ZScsIE51bWJlcklzRmluaXRlLCAnaXNJbnRlZ2VyJywgaXNJbnRlZ2VyLCAnaXNOYU4nLCBOdW1iZXJJc05hTiwgJ2lzU2FmZUludGVnZXInLCBpc1NhZmVJbnRlZ2VyXSk7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbE51bWJlcik7XG4gIHJldHVybiB7XG4gICAgZ2V0IE1BWF9TQUZFX0lOVEVHRVIoKSB7XG4gICAgICByZXR1cm4gTUFYX1NBRkVfSU5URUdFUjtcbiAgICB9LFxuICAgIGdldCBNSU5fU0FGRV9JTlRFR0VSKCkge1xuICAgICAgcmV0dXJuIE1JTl9TQUZFX0lOVEVHRVI7XG4gICAgfSxcbiAgICBnZXQgRVBTSUxPTigpIHtcbiAgICAgIHJldHVybiBFUFNJTE9OO1xuICAgIH0sXG4gICAgZ2V0IGlzRmluaXRlKCkge1xuICAgICAgcmV0dXJuIE51bWJlcklzRmluaXRlO1xuICAgIH0sXG4gICAgZ2V0IGlzSW50ZWdlcigpIHtcbiAgICAgIHJldHVybiBpc0ludGVnZXI7XG4gICAgfSxcbiAgICBnZXQgaXNOYU4oKSB7XG4gICAgICByZXR1cm4gTnVtYmVySXNOYU47XG4gICAgfSxcbiAgICBnZXQgaXNTYWZlSW50ZWdlcigpIHtcbiAgICAgIHJldHVybiBpc1NhZmVJbnRlZ2VyO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsTnVtYmVyKCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsTnVtYmVyO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL051bWJlci5qc1wiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyTW9kdWxlKFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvcG9seWZpbGxzLmpzXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNzkvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3BvbHlmaWxscy5qc1wiO1xuICB2YXIgcG9seWZpbGxBbGwgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC43OS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHMuanNcIikucG9seWZpbGxBbGw7XG4gIHBvbHlmaWxsQWxsKFJlZmxlY3QuZ2xvYmFsKTtcbiAgdmFyIHNldHVwR2xvYmFscyA9ICR0cmFjZXVyUnVudGltZS5zZXR1cEdsb2JhbHM7XG4gICR0cmFjZXVyUnVudGltZS5zZXR1cEdsb2JhbHMgPSBmdW5jdGlvbihnbG9iYWwpIHtcbiAgICBzZXR1cEdsb2JhbHMoZ2xvYmFsKTtcbiAgICBwb2x5ZmlsbEFsbChnbG9iYWwpO1xuICB9O1xuICByZXR1cm4ge307XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjc5L3NyYy9ydW50aW1lL3BvbHlmaWxscy9wb2x5ZmlsbHMuanNcIiArICcnKTtcbiIsIi8qKlxuICogQVVUSE9SIE9GIElOSVRJQUwgSlMgTElCUkFSWVxuICogay1kIFRyZWUgSmF2YVNjcmlwdCAtIFYgMS4wXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3ViaWxhYnMva2QtdHJlZS1qYXZhc2NyaXB0XG4gKlxuICogQGF1dGhvciBNaXJjZWEgUHJpY29wIDxwcmljb3BAdWJpbGFicy5uZXQ+LCAyMDEyXG4gKiBAYXV0aG9yIE1hcnRpbiBLbGVwcGUgPGtsZXBwZUB1YmlsYWJzLm5ldD4sIDIwMTJcbiAqIEBhdXRob3IgVWJpbGFicyBodHRwOi8vdWJpbGFicy5uZXQsIDIwMTJcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIDxodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocD5cbiAqL1xuXG5cbmZ1bmN0aW9uIE5vZGUob2JqLCBkaW1lbnNpb24sIHBhcmVudCkge1xuICB0aGlzLm9iaiA9IG9iajtcbiAgdGhpcy5sZWZ0ID0gbnVsbDtcbiAgdGhpcy5yaWdodCA9IG51bGw7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLmRpbWVuc2lvbiA9IGRpbWVuc2lvbjtcbn1cblxuZnVuY3Rpb24gS2RUcmVlKHBvaW50cywgbWV0cmljLCBkaW1lbnNpb25zKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBcbiAgZnVuY3Rpb24gYnVpbGRUcmVlKHBvaW50cywgZGVwdGgsIHBhcmVudCkge1xuICAgIHZhciBkaW0gPSBkZXB0aCAlIGRpbWVuc2lvbnMubGVuZ3RoLFxuICAgICAgbWVkaWFuLFxuICAgICAgbm9kZTtcblxuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBuZXcgTm9kZShwb2ludHNbMF0sIGRpbSwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBwb2ludHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGFbZGltZW5zaW9uc1tkaW1dXSAtIGJbZGltZW5zaW9uc1tkaW1dXTtcbiAgICB9KTtcblxuICAgIG1lZGlhbiA9IE1hdGguZmxvb3IocG9pbnRzLmxlbmd0aCAvIDIpO1xuICAgIG5vZGUgPSBuZXcgTm9kZShwb2ludHNbbWVkaWFuXSwgZGltLCBwYXJlbnQpO1xuICAgIG5vZGUubGVmdCA9IGJ1aWxkVHJlZShwb2ludHMuc2xpY2UoMCwgbWVkaWFuKSwgZGVwdGggKyAxLCBub2RlKTtcbiAgICBub2RlLnJpZ2h0ID0gYnVpbGRUcmVlKHBvaW50cy5zbGljZShtZWRpYW4gKyAxKSwgZGVwdGggKyAxLCBub2RlKTtcblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdGhpcy5yb290ID0gYnVpbGRUcmVlKHBvaW50cywgMCwgbnVsbCk7XG5cbiAgdGhpcy5pbnNlcnQgPSBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICBmdW5jdGlvbiBpbm5lclNlYXJjaChub2RlLCBwYXJlbnQpIHtcblxuICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbbm9kZS5kaW1lbnNpb25dO1xuICAgICAgaWYgKHBvaW50W2RpbWVuc2lvbl0gPCBub2RlLm9ialtkaW1lbnNpb25dKSB7XG4gICAgICAgIHJldHVybiBpbm5lclNlYXJjaChub2RlLmxlZnQsIG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGlubmVyU2VhcmNoKG5vZGUucmlnaHQsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBpbnNlcnRQb3NpdGlvbiA9IGlubmVyU2VhcmNoKHRoaXMucm9vdCwgbnVsbCksXG4gICAgICBuZXdOb2RlLFxuICAgICAgZGltZW5zaW9uO1xuXG4gICAgaWYgKGluc2VydFBvc2l0aW9uID09PSBudWxsKSB7XG4gICAgICB0aGlzLnJvb3QgPSBuZXcgTm9kZShwb2ludCwgMCwgbnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmV3Tm9kZSA9IG5ldyBOb2RlKHBvaW50LCAoaW5zZXJ0UG9zaXRpb24uZGltZW5zaW9uICsgMSkgJSBkaW1lbnNpb25zLmxlbmd0aCwgaW5zZXJ0UG9zaXRpb24pO1xuICAgIGRpbWVuc2lvbiA9IGRpbWVuc2lvbnNbaW5zZXJ0UG9zaXRpb24uZGltZW5zaW9uXTtcblxuICAgIGlmIChwb2ludFtkaW1lbnNpb25dIDwgaW5zZXJ0UG9zaXRpb24ub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgIGluc2VydFBvc2l0aW9uLmxlZnQgPSBuZXdOb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnNlcnRQb3NpdGlvbi5yaWdodCA9IG5ld05vZGU7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgdmFyIG5vZGU7XG5cbiAgICBmdW5jdGlvbiBub2RlU2VhcmNoKG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5vYmogPT09IHBvaW50KSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGltZW5zaW9uID0gZGltZW5zaW9uc1tub2RlLmRpbWVuc2lvbl07XG5cbiAgICAgIGlmIChwb2ludFtkaW1lbnNpb25dIDwgbm9kZS5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgICByZXR1cm4gbm9kZVNlYXJjaChub2RlLmxlZnQsIG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5vZGVTZWFyY2gobm9kZS5yaWdodCwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgICB2YXIgbmV4dE5vZGUsXG4gICAgICAgIG5leHRPYmosXG4gICAgICAgIHBEaW1lbnNpb247XG5cbiAgICAgIGZ1bmN0aW9uIGZpbmRNYXgobm9kZSwgZGltKSB7XG4gICAgICAgIHZhciBkaW1lbnNpb24sXG4gICAgICAgICAgb3duLFxuICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgbWF4O1xuXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW2RpbV07XG4gICAgICAgIGlmIChub2RlLmRpbWVuc2lvbiA9PT0gZGltKSB7XG4gICAgICAgICAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kTWF4KG5vZGUucmlnaHQsIGRpbSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duID0gbm9kZS5vYmpbZGltZW5zaW9uXTtcbiAgICAgICAgbGVmdCA9IGZpbmRNYXgobm9kZS5sZWZ0LCBkaW0pO1xuICAgICAgICByaWdodCA9IGZpbmRNYXgobm9kZS5yaWdodCwgZGltKTtcbiAgICAgICAgbWF4ID0gbm9kZTtcblxuICAgICAgICBpZiAobGVmdCAhPT0gbnVsbCAmJiBsZWZ0Lm9ialtkaW1lbnNpb25dID4gb3duKSB7XG4gICAgICAgICAgbWF4ID0gbGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyaWdodCAhPT0gbnVsbCAmJiByaWdodC5vYmpbZGltZW5zaW9uXSA+IG1heC5vYmpbZGltZW5zaW9uXSkge1xuICAgICAgICAgIG1heCA9IHJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGZpbmRNaW4obm9kZSwgZGltKSB7XG4gICAgICAgIHZhciBkaW1lbnNpb24sXG4gICAgICAgICAgb3duLFxuICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgbWluO1xuXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW2RpbV07XG5cbiAgICAgICAgaWYgKG5vZGUuZGltZW5zaW9uID09PSBkaW0pIHtcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZE1pbihub2RlLmxlZnQsIGRpbSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duID0gbm9kZS5vYmpbZGltZW5zaW9uXTtcbiAgICAgICAgbGVmdCA9IGZpbmRNaW4obm9kZS5sZWZ0LCBkaW0pO1xuICAgICAgICByaWdodCA9IGZpbmRNaW4obm9kZS5yaWdodCwgZGltKTtcbiAgICAgICAgbWluID0gbm9kZTtcblxuICAgICAgICBpZiAobGVmdCAhPT0gbnVsbCAmJiBsZWZ0Lm9ialtkaW1lbnNpb25dIDwgb3duKSB7XG4gICAgICAgICAgbWluID0gbGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmlnaHQgIT09IG51bGwgJiYgcmlnaHQub2JqW2RpbWVuc2lvbl0gPCBtaW4ub2JqW2RpbWVuc2lvbl0pIHtcbiAgICAgICAgICBtaW4gPSByaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5sZWZ0ID09PSBudWxsICYmIG5vZGUucmlnaHQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgc2VsZi5yb290ID0gbnVsbDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwRGltZW5zaW9uID0gZGltZW5zaW9uc1tub2RlLnBhcmVudC5kaW1lbnNpb25dO1xuXG4gICAgICAgIGlmIChub2RlLm9ialtwRGltZW5zaW9uXSA8IG5vZGUucGFyZW50Lm9ialtwRGltZW5zaW9uXSkge1xuICAgICAgICAgIG5vZGUucGFyZW50LmxlZnQgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGUucGFyZW50LnJpZ2h0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgbmV4dE5vZGUgPSBmaW5kTWF4KG5vZGUubGVmdCwgbm9kZS5kaW1lbnNpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dE5vZGUgPSBmaW5kTWluKG5vZGUucmlnaHQsIG5vZGUuZGltZW5zaW9uKTtcbiAgICAgIH1cblxuICAgICAgbmV4dE9iaiA9IG5leHROb2RlLm9iajtcbiAgICAgIHJlbW92ZU5vZGUobmV4dE5vZGUpO1xuICAgICAgbm9kZS5vYmogPSBuZXh0T2JqO1xuXG4gICAgfVxuXG4gICAgbm9kZSA9IG5vZGVTZWFyY2goc2VsZi5yb290KTtcblxuICAgIGlmIChub2RlID09PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgcmVtb3ZlTm9kZShub2RlKTtcbiAgfTtcblxuICB0aGlzLm5lYXJlc3QgPSBmdW5jdGlvbiAocG9pbnQsIG1heE5vZGVzLCBtYXhEaXN0YW5jZSkge1xuICAgIHZhciBpLFxuICAgICAgcmVzdWx0LFxuICAgICAgYmVzdE5vZGVzO1xuXG4gICAgYmVzdE5vZGVzID0gbmV3IEJpbmFyeUhlYXAoXG4gICAgICBmdW5jdGlvbiAoZSkgeyByZXR1cm4gLWVbMV07IH1cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gbmVhcmVzdFNlYXJjaChub2RlKSB7XG4gICAgICB2YXIgYmVzdENoaWxkLFxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25zW25vZGUuZGltZW5zaW9uXSxcbiAgICAgICAgb3duRGlzdGFuY2UgPSBtZXRyaWMocG9pbnQsIG5vZGUub2JqKSxcbiAgICAgICAgbGluZWFyUG9pbnQgPSB7fSxcbiAgICAgICAgbGluZWFyRGlzdGFuY2UsXG4gICAgICAgIG90aGVyQ2hpbGQsXG4gICAgICAgIGk7XG5cbiAgICAgIGZ1bmN0aW9uIHNhdmVOb2RlKG5vZGUsIGRpc3RhbmNlKSB7XG4gICAgICAgIGJlc3ROb2Rlcy5wdXNoKFtub2RlLCBkaXN0YW5jZV0pO1xuICAgICAgICBpZiAoYmVzdE5vZGVzLnNpemUoKSA+IG1heE5vZGVzKSB7XG4gICAgICAgICAgYmVzdE5vZGVzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkaW1lbnNpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpID09PSBub2RlLmRpbWVuc2lvbikge1xuICAgICAgICAgIGxpbmVhclBvaW50W2RpbWVuc2lvbnNbaV1dID0gcG9pbnRbZGltZW5zaW9uc1tpXV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGluZWFyUG9pbnRbZGltZW5zaW9uc1tpXV0gPSBub2RlLm9ialtkaW1lbnNpb25zW2ldXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaW5lYXJEaXN0YW5jZSA9IG1ldHJpYyhsaW5lYXJQb2ludCwgbm9kZS5vYmopO1xuXG4gICAgICBpZiAobm9kZS5yaWdodCA9PT0gbnVsbCAmJiBub2RlLmxlZnQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGJlc3ROb2Rlcy5zaXplKCkgPCBtYXhOb2RlcyB8fCBvd25EaXN0YW5jZSA8IGJlc3ROb2Rlcy5wZWVrKClbMV0pIHtcbiAgICAgICAgICBzYXZlTm9kZShub2RlLCBvd25EaXN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5yaWdodCA9PT0gbnVsbCkge1xuICAgICAgICBiZXN0Q2hpbGQgPSBub2RlLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUubGVmdCA9PT0gbnVsbCkge1xuICAgICAgICBiZXN0Q2hpbGQgPSBub2RlLnJpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBvaW50W2RpbWVuc2lvbl0gPCBub2RlLm9ialtkaW1lbnNpb25dKSB7XG4gICAgICAgICAgYmVzdENoaWxkID0gbm9kZS5sZWZ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJlc3RDaGlsZCA9IG5vZGUucmlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmVhcmVzdFNlYXJjaChiZXN0Q2hpbGQpO1xuXG4gICAgICBpZiAoYmVzdE5vZGVzLnNpemUoKSA8IG1heE5vZGVzIHx8IG93bkRpc3RhbmNlIDwgYmVzdE5vZGVzLnBlZWsoKVsxXSkge1xuICAgICAgICBzYXZlTm9kZShub2RlLCBvd25EaXN0YW5jZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChiZXN0Tm9kZXMuc2l6ZSgpIDwgbWF4Tm9kZXMgfHwgTWF0aC5hYnMobGluZWFyRGlzdGFuY2UpIDwgYmVzdE5vZGVzLnBlZWsoKVsxXSkge1xuICAgICAgICBpZiAoYmVzdENoaWxkID09PSBub2RlLmxlZnQpIHtcbiAgICAgICAgICBvdGhlckNoaWxkID0gbm9kZS5yaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdGhlckNoaWxkID0gbm9kZS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlckNoaWxkICE9PSBudWxsKSB7XG4gICAgICAgICAgbmVhcmVzdFNlYXJjaChvdGhlckNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXhEaXN0YW5jZSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IG1heE5vZGVzOyBpICs9IDEpIHtcbiAgICAgICAgYmVzdE5vZGVzLnB1c2goW251bGwsIG1heERpc3RhbmNlXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmVhcmVzdFNlYXJjaChzZWxmLnJvb3QpO1xuXG4gICAgcmVzdWx0ID0gW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbWF4Tm9kZXM7IGkgKz0gMSkge1xuICAgICAgaWYgKGJlc3ROb2Rlcy5jb250ZW50W2ldWzBdKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtiZXN0Tm9kZXMuY29udGVudFtpXVswXS5vYmosIGJlc3ROb2Rlcy5jb250ZW50W2ldWzFdXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdGhpcy5iYWxhbmNlRmFjdG9yID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGhlaWdodChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXRoLm1heChoZWlnaHQobm9kZS5sZWZ0KSwgaGVpZ2h0KG5vZGUucmlnaHQpKSArIDE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY291bnQobm9kZSkge1xuICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gY291bnQobm9kZS5sZWZ0KSArIGNvdW50KG5vZGUucmlnaHQpICsgMTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0KHNlbGYucm9vdCkgLyAoTWF0aC5sb2coY291bnQoc2VsZi5yb290KSkgLyBNYXRoLmxvZygyKSk7XG4gIH07XG59XG5cbi8vIEJpbmFyeSBoZWFwIGltcGxlbWVudGF0aW9uIGZyb206XG4vLyBodHRwOi8vZWxvcXVlbnRqYXZhc2NyaXB0Lm5ldC9hcHBlbmRpeDIuaHRtbFxuXG5mdW5jdGlvbiBCaW5hcnlIZWFwKHNjb3JlRnVuY3Rpb24pe1xuICB0aGlzLmNvbnRlbnQgPSBbXTtcbiAgdGhpcy5zY29yZUZ1bmN0aW9uID0gc2NvcmVGdW5jdGlvbjtcbn1cblxuQmluYXJ5SGVhcC5wcm90b3R5cGUgPSB7XG4gIHB1c2g6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAvLyBBZGQgdGhlIG5ldyBlbGVtZW50IHRvIHRoZSBlbmQgb2YgdGhlIGFycmF5LlxuICAgIHRoaXMuY29udGVudC5wdXNoKGVsZW1lbnQpO1xuICAgIC8vIEFsbG93IGl0IHRvIGJ1YmJsZSB1cC5cbiAgICB0aGlzLmJ1YmJsZVVwKHRoaXMuY29udGVudC5sZW5ndGggLSAxKTtcbiAgfSxcblxuICBwb3A6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFN0b3JlIHRoZSBmaXJzdCBlbGVtZW50IHNvIHdlIGNhbiByZXR1cm4gaXQgbGF0ZXIuXG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuY29udGVudFswXTtcbiAgICAvLyBHZXQgdGhlIGVsZW1lbnQgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXkuXG4gICAgdmFyIGVuZCA9IHRoaXMuY29udGVudC5wb3AoKTtcbiAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGVsZW1lbnRzIGxlZnQsIHB1dCB0aGUgZW5kIGVsZW1lbnQgYXQgdGhlXG4gICAgLy8gc3RhcnQsIGFuZCBsZXQgaXQgc2luayBkb3duLlxuICAgIGlmICh0aGlzLmNvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jb250ZW50WzBdID0gZW5kO1xuICAgICAgdGhpcy5zaW5rRG93bigwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBwZWVrOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50WzBdO1xuICB9LFxuXG4gIHJlbW92ZTogZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciBsZW4gPSB0aGlzLmNvbnRlbnQubGVuZ3RoO1xuICAgIC8vIFRvIHJlbW92ZSBhIHZhbHVlLCB3ZSBtdXN0IHNlYXJjaCB0aHJvdWdoIHRoZSBhcnJheSB0byBmaW5kXG4gICAgLy8gaXQuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHRoaXMuY29udGVudFtpXSA9PSBub2RlKSB7XG4gICAgICAgIC8vIFdoZW4gaXQgaXMgZm91bmQsIHRoZSBwcm9jZXNzIHNlZW4gaW4gJ3BvcCcgaXMgcmVwZWF0ZWRcbiAgICAgICAgLy8gdG8gZmlsbCB1cCB0aGUgaG9sZS5cbiAgICAgICAgdmFyIGVuZCA9IHRoaXMuY29udGVudC5wb3AoKTtcbiAgICAgICAgaWYgKGkgIT0gbGVuIC0gMSkge1xuICAgICAgICAgIHRoaXMuY29udGVudFtpXSA9IGVuZDtcbiAgICAgICAgICBpZiAodGhpcy5zY29yZUZ1bmN0aW9uKGVuZCkgPCB0aGlzLnNjb3JlRnVuY3Rpb24obm9kZSkpXG4gICAgICAgICAgICB0aGlzLmJ1YmJsZVVwKGkpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2lua0Rvd24oaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb2RlIG5vdCBmb3VuZC5cIik7XG4gIH0sXG5cbiAgc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudC5sZW5ndGg7XG4gIH0sXG5cbiAgYnViYmxlVXA6IGZ1bmN0aW9uKG4pIHtcbiAgICAvLyBGZXRjaCB0aGUgZWxlbWVudCB0aGF0IGhhcyB0byBiZSBtb3ZlZC5cbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuY29udGVudFtuXTtcbiAgICAvLyBXaGVuIGF0IDAsIGFuIGVsZW1lbnQgY2FuIG5vdCBnbyB1cCBhbnkgZnVydGhlci5cbiAgICB3aGlsZSAobiA+IDApIHtcbiAgICAgIC8vIENvbXB1dGUgdGhlIHBhcmVudCBlbGVtZW50J3MgaW5kZXgsIGFuZCBmZXRjaCBpdC5cbiAgICAgIHZhciBwYXJlbnROID0gTWF0aC5mbG9vcigobiArIDEpIC8gMikgLSAxLFxuICAgICAgICAgIHBhcmVudCA9IHRoaXMuY29udGVudFtwYXJlbnROXTtcbiAgICAgIC8vIFN3YXAgdGhlIGVsZW1lbnRzIGlmIHRoZSBwYXJlbnQgaXMgZ3JlYXRlci5cbiAgICAgIGlmICh0aGlzLnNjb3JlRnVuY3Rpb24oZWxlbWVudCkgPCB0aGlzLnNjb3JlRnVuY3Rpb24ocGFyZW50KSkge1xuICAgICAgICB0aGlzLmNvbnRlbnRbcGFyZW50Tl0gPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmNvbnRlbnRbbl0gPSBwYXJlbnQ7XG4gICAgICAgIC8vIFVwZGF0ZSAnbicgdG8gY29udGludWUgYXQgdGhlIG5ldyBwb3NpdGlvbi5cbiAgICAgICAgbiA9IHBhcmVudE47XG4gICAgICB9XG4gICAgICAvLyBGb3VuZCBhIHBhcmVudCB0aGF0IGlzIGxlc3MsIG5vIG5lZWQgdG8gbW92ZSBpdCBmdXJ0aGVyLlxuICAgICAgZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzaW5rRG93bjogZnVuY3Rpb24obikge1xuICAgIC8vIExvb2sgdXAgdGhlIHRhcmdldCBlbGVtZW50IGFuZCBpdHMgc2NvcmUuXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuY29udGVudC5sZW5ndGgsXG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmNvbnRlbnRbbl0sXG4gICAgICAgIGVsZW1TY29yZSA9IHRoaXMuc2NvcmVGdW5jdGlvbihlbGVtZW50KTtcblxuICAgIHdoaWxlKHRydWUpIHtcbiAgICAgIC8vIENvbXB1dGUgdGhlIGluZGljZXMgb2YgdGhlIGNoaWxkIGVsZW1lbnRzLlxuICAgICAgdmFyIGNoaWxkMk4gPSAobiArIDEpICogMiwgY2hpbGQxTiA9IGNoaWxkMk4gLSAxO1xuICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIHN0b3JlIHRoZSBuZXcgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnQsXG4gICAgICAvLyBpZiBhbnkuXG4gICAgICB2YXIgc3dhcCA9IG51bGw7XG4gICAgICAvLyBJZiB0aGUgZmlyc3QgY2hpbGQgZXhpc3RzIChpcyBpbnNpZGUgdGhlIGFycmF5KS4uLlxuICAgICAgaWYgKGNoaWxkMU4gPCBsZW5ndGgpIHtcbiAgICAgICAgLy8gTG9vayBpdCB1cCBhbmQgY29tcHV0ZSBpdHMgc2NvcmUuXG4gICAgICAgIHZhciBjaGlsZDEgPSB0aGlzLmNvbnRlbnRbY2hpbGQxTl0sXG4gICAgICAgICAgICBjaGlsZDFTY29yZSA9IHRoaXMuc2NvcmVGdW5jdGlvbihjaGlsZDEpO1xuICAgICAgICAvLyBJZiB0aGUgc2NvcmUgaXMgbGVzcyB0aGFuIG91ciBlbGVtZW50J3MsIHdlIG5lZWQgdG8gc3dhcC5cbiAgICAgICAgaWYgKGNoaWxkMVNjb3JlIDwgZWxlbVNjb3JlKVxuICAgICAgICAgIHN3YXAgPSBjaGlsZDFOO1xuICAgICAgfVxuICAgICAgLy8gRG8gdGhlIHNhbWUgY2hlY2tzIGZvciB0aGUgb3RoZXIgY2hpbGQuXG4gICAgICBpZiAoY2hpbGQyTiA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgY2hpbGQyID0gdGhpcy5jb250ZW50W2NoaWxkMk5dLFxuICAgICAgICAgICAgY2hpbGQyU2NvcmUgPSB0aGlzLnNjb3JlRnVuY3Rpb24oY2hpbGQyKTtcbiAgICAgICAgaWYgKGNoaWxkMlNjb3JlIDwgKHN3YXAgPT0gbnVsbCA/IGVsZW1TY29yZSA6IGNoaWxkMVNjb3JlKSl7XG4gICAgICAgICAgc3dhcCA9IGNoaWxkMk47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgbmVlZHMgdG8gYmUgbW92ZWQsIHN3YXAgaXQsIGFuZCBjb250aW51ZS5cbiAgICAgIGlmIChzd2FwICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb250ZW50W25dID0gdGhpcy5jb250ZW50W3N3YXBdO1xuICAgICAgICB0aGlzLmNvbnRlbnRbc3dhcF0gPSBlbGVtZW50O1xuICAgICAgICBuID0gc3dhcDtcbiAgICAgIH1cbiAgICAgIC8vIE90aGVyd2lzZSwgd2UgYXJlIGRvbmUuXG4gICAgICBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlS2RUcmVlOiBmdW5jdGlvbiAocG9pbnRzLCBtZXRyaWMsIGRpbWVuc2lvbnMpIHtcbiAgICByZXR1cm4gbmV3IEtkVHJlZShwb2ludHMsIG1ldHJpYywgZGltZW5zaW9ucylcbiAgfVxufVxuIl19
