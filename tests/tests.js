var chai = require('chai');
var audioContext = require("audio-context");
var BinauralFIR = require('../binaural-fir.es6.js')
var assert = chai.assert;


// Here we create a buffer to be used later with our player
var targetNode = audioContext.destination;

// Returns a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("BinauralFIR tests", function() {

  this.buffer = audioContext.createBuffer(1, 512, 44100);
  this.data = this.buffer.getChannelData(0);
  for (var i = 0; i < this.data.length; i++) {
    this.data[i] = (Math.random() - 0.5) * 2;
  }

  var numberOfPositions = getRandomInt(100,200);
  this.hrtfs = [];
  for (var i = 0; i < numberOfPositions; i++){
    var url = 'fakeURL.wav';
    var obj = {
      azimuth: getRandomInt(0,90),
      elevation: getRandomInt(0,90),
      distance: getRandomInt(1,3),
      url: url,
      buffer: this.buffer
    };
    this.hrtfs.push(obj);
  }

  var self = this;
  self.binauralFIR = new BinauralFIR();
  self.binauralFIR.connect(targetNode);

  it('should set HRTF DataSet correctly', function(){
    self.binauralFIR.HRTFDataset = self.hrtfs;
    assert.equal(self.binauralFIR.HRTFDataset, self.hrtfs);
  });

  it('should detect that is crossfading', function(){
    self.binauralFIR.setPosition(0, 0, 1);
    assert.equal(self.binauralFIR.isCrossfading(), true);
  });

  it('should set position correctly', function(){
    self.binauralFIR.setPosition(10, 20, 30);
    var coord = self.binauralFIR.getRealCoordinates(10, 20, 30);
    assert.equal(self.binauralFIR.getPosition().azimuth, coord.azimuth);
    assert.equal(self.binauralFIR.getPosition().elevation, coord.elevation);
    assert.equal(self.binauralFIR.getPosition().distance, coord.distance);
  });

  it('should set crossfade duration correctly', function(){
    self.binauralFIR.setCrossfadeDuration(30);
    assert.equal(self.binauralFIR.getCrossfadeDuration(), 30);
  });

});
