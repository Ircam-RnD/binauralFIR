var assert = chai.assert;

window.AudioContext = window.AudioContext||window.webkitAudioContext;


// Here we create a buffer to be used later with our player
var audioContext = new AudioContext();
var targetNode = audioContext.destination;


describe("BinauralFIR tests", function() {

  this.buffer = audioContext.createBuffer(1, 44100, 44100);
  this.data = this.buffer.getChannelData(0);
  for (i = 0; i < this.data.length; i++) {
    this.data[i] = (Math.random() - 0.5) * 2;
  }

  this.buffer2 = audioContext.createBuffer(1, 22050, 44100);
  this.data2 = this.buffer2.getChannelData(0);
  for (i = 0; i < this.data2.length; i++) {
    this.data2[i] = (Math.random() - 0.5) * 2;
  }

  var self = this;
  self.binauralFIR = createBinauralFIR(this.buffer);
  self.binauralFIR.connect(targetNode); 

  it('should set buffer correctly', function(){
    self.binauralFIR.setBuffer(self.buffer);
    assert.equal(self.binauralFIR.hrtfData, self.buffer);
  });

  it('should set position correctly', function(){
    self.binauralFIR.setPosition(10, 20, 30);
    assert.equal(self.binauralFIR.getPosition()[0], 10);
    assert.equal(self.binauralFIR.getPosition()[1], 20);
    assert.equal(self.binauralFIR.getPosition()[2], 30);
  });

  it('should set crossfade duration correctly', function(){
    self.binauralFIR.setCrossfadeDuration(30);
    assert.equal(self.binauralFIR.getCrossfadeDuration(), 30);
  });

  it('should detect that is crossfading', function(){
    self.binauralFIR.setPosition(0, 0, 1);
    assert.equal(self.binauralFIR.isCrossfading(), true);
  });

  it('should detect that load a array', function(){
    self.binauralFIR.loadHRTF(self.buffer);
    assert.equal(self.buffer, self.binauralFIR.hrtfData);
  });

  it('should detect that load a new buffer in the convolver', function(){
    self.binauralFIR.convNode[0].buffer = self.buffer2;
    assert.equal(self.buffer2, self.binauralFIR.convNode[0].buffer);
  });

  it('should detect that load a new buffer in the convolver 2', function(){
    self.binauralFIR.convNode[0].buffer = self.buffer;
    assert.equal(self.buffer, self.binauralFIR.convNode[0].buffer);
  });
  

});
