const test = require('tape');

import BinauralFIR from '../es6/binaural-fir.js';


var audioContext = new AudioContext();
// Here we create a buffer to be used later with our player
var targetNode = audioContext.destination;

// Returns a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var buffer = audioContext.createBuffer(1, 512, 44100);
var data = buffer.getChannelData(0);
for (var i = 0; i < data.length; i++) {
  data[i] = (Math.random() - 0.5) * 2;
}

var numberOfPositions = getRandomInt(100, 200);
var hrtfs = [];
for (var i = 0; i < numberOfPositions; i++) {
  var url = 'fakeURL.wav';
  var obj = {
    azimuth: getRandomInt(0, 90),
    elevation: getRandomInt(0, 90),
    distance: getRandomInt(1, 3),
    url: url,
    buffer: buffer
  };
  hrtfs.push(obj);
}

var binauralFIR = new BinauralFIR({audioContext: audioContext});
binauralFIR.connect(targetNode);

test('should set HRTF DataSet correctly', (assert) => {
  binauralFIR.HRTFDataset = hrtfs;
  assert.equal(binauralFIR.HRTFDataset, hrtfs);
  assert.end();
});

test('should detect that is crossfading', (assert) => {
  binauralFIR.setPosition(0, 0, 1);
  assert.equal(binauralFIR.isCrossfading(), true);
  assert.end();
});

test('should set crossfade duration correctly', (assert) => {
  binauralFIR.setCrossfadeDuration(30);
  assert.equal(binauralFIR.getCrossfadeDuration(), 30);
  assert.end();
});
