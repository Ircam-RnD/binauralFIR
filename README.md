# BinauralFIR sound module

> Processing node/library which spatializes an incoming audio stream in three-dimensional space for binaural audio.


## Example

Load binauralFIR.js, for instance in your html file by using:

```html
    <script src="binuralfir.min.js"></script>
```

```js
  // we need an audio context
  var audioContext = new AudioContext();
  var targetNode = audioContext.destination;

  // create one virtual source
  var binauralFIRNode = createBinauralFIR();
  // load the HRTF set
  binauralFIRNode.HRTFDataset = HRTFDataset;
  // Connect Web Audio API nodes
  player.connect(binauralFIRNode.input);
  binauralFIRNode.connect(targetNode);
  //set the position of the virtual source
  binauralFIRNode.setPosition(0, 0, 1);

```

## HRTFSet input format example

Data | Description
--- | ---
`azimuth` | Azimuth in degrees: from 0 to -180 for source on your left, and from 0 to 180 for source on your right
`distance` | Distance in meters
`elevation` | Elevation in degrees: from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
`url` | Where the audio file of the impulse response can be found.
`buffer` | AudioBuffer representing the decoded audio data. It can be decoded by using the [buffer-loader library] (https://github.com/Ircam-RnD/buffer-loader)


```js
[
  {
    'azimuth': 0,
    'distance': 1,
    'elevation': 0,
    'url': "/HRTF_0_0.wav",
    'buffer': decodedBuffer_0_0
  },
  {
    'azimuth': 5,
    'distance': 1,
    'elevation': 0,
    'url': "/HRTF_5_0.wav",
    'buffer': decodedBuffer_5_0

  },
  {
    'azimuth': 5,
    'distance': 1,
    'elevation': 5,
    'url': "/HRTF_5_5.wav",
    'buffer': decodedBuffer_5_5
  }
]
```

## API

The `binauralFIR` object exposes the following API:

Method | Description
--- | ---
`binauralFIR.connect()` | Connects the binauralFIRNode to the Web Audio graph
`binauralFIR.disconnect()` | Disconnect the binauralFIRNode from the Web Audio graph
`binauralFIR.loadHRTF(hrtfData)` | Set hrtf set buffer to be used and update the current position with the new HRTF.
`binauralFIR.setPosition(azimuth, elevation, distance, optImmediate)` | Set position of the virtual source.
`binauralFIR.getPosition()` | Get the current position of the virtual source.
`binauralFIR.setCrossfadeDuration(duration)` | Set the duration of crossfading in miliseconds.
`binauralFIR.getCrossfadeDuration()` | Get the duration of crossfading in miliseconds.
`binauralFIR.getMetaDataAboutCurrentHRTF(metadataName)` | Get metadata about the current HRTF set.



## Tests

If grunt is not installed

```bash
$ npm install -g grunt-cli
```

Install all depencies in the module folder

```bash
$ npm install
```

Run the server on 9001 port (you can change the port in the Grunfile.js)

```bash
$ grunt test
```

Run the test via the web browser on `http://localhost:9001/tests`

## License

This module is released under the [BSD-3-Clause license](http://opensource.org/licenses/BSD-3-Clause).

## Acknowledgments

This code has been developed from both [Acoustic And Cognitive Spaces](http://recherche.ircam.fr/equipes/salles/) and [Analysis of Musical Practices](http://apm.ircam.fr) IRCAM research teams. It is also part of the WAVE project (http://wave.ircam.fr), funded by ANR (The French National Research Agency), ContInt program, 2012-2015.
