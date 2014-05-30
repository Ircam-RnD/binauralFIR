# BinauralFIR node

> Processing node which spatializes an incoming audio stream in three-dimensional space for binaural audio.

The binauralFIR node provides binaural listening to the user with three simple steps. The novelty of this library is that it permits to use your own HRTF dataset. This library can be used as a regular node inside the [Web Audio API](http://www.w3.org/TR/webaudio/). 

## Example

Load binauralFIR.js, for instance in your html file by using:

```html
    <script src="binuralfir.min.js"></script>
    <!-- WAVE libraries for load AudioBuffers and to play music:
    https://github.com/Ircam-RnD/buffer-loader
    https://github.com/Ircam-RnD/player -->
    <script src="buffer-loader.min.js"></script>
    <script src="player.min.js"></script>
```

```js
  //first we generate the HRTF Dataset input format
  var hrtfs = [];
  var urls = [];
  for(var i=0; i<37; i++){
    var url = '/examples/snd/HRIR/1066/HRIR_1066_'+(i*5)+'.wav';
    var obj = {
      azimuth: -i*5,
      elevation: 0,
      distance: 1,
      url: url
    };
    hrtfs.push(obj);
    urls.push(url);
  }
  var p = 1;
  for(var i=71; i>36; i--){
    var url = '/examples/snd/HRIR/1066/HRIR_1066_'+(i*5)+'.wav';
    var obj = {
      azimuth: p*5,
      elevation: 0,
      distance: 1,
      url: url
    };
    hrtfs.push(obj);
    urls.push(url);
    p = p + 1;
  }
  
  // we need an audio context
  var audioContext = new AudioContext();
  var targetNode = audioContext.destination;
  // create one virtual source
  var binauralFIRNode = createBinauralFIR();
  
  //load the url to generate the AudioBuffers
  bufferLoader.load(urls).then(function(buffers){
            for(var i = 0; i<buffers.length; i = i+1){
                hrtfs[i].buffer = buffers[i];
            }
            // load the HRTF Dataset into the node
            binauralFIRNode.HRTFDataset = hrtfs;

             //set the position of the virtual source to -45° azimuth - 45° on your left -, distance of 1 meter and elevation of 0 - in front your head - .
            binauralFIRNode.setPosition(-45, 0, 1);
            //Load a file to be played
            bufferLoader.load('/examples/snd/breakbeat.wav').then(function(buffer){
                player = createPlayer(buffer);
                // Connect Web Audio API nodes
                player.connect(binauralFIRNode.input);
                binauralFIRNode.connect(targetNode);
                player.enableLoop(true);
                player.start();
            })
        })

```

## HRTF Dataset input format example

As this library allow you to use your own [HRTF](http://en.wikipedia.org/wiki/Head-related_transfer_function) Dataset, if you want to use your dataset in the library you have to follow the following format:

Data | Description
--- | ---
`azimuth` | Azimuth in degrees: from 0 to -180 for source on your left, and from 0 to 180 for source on your right
`distance` | Distance in meters
`elevation` | Elevation in degrees: from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
`url` | Where the audio file of the impulse response can be found.
`buffer` | AudioBuffer representing the decoded audio data. It can be decoded by using the [buffer-loader library] (https://github.com/Ircam-RnD/buffer-loader)

This data must be provided inside an Array of Objects, like this example:

```js
[
  {
    'azimuth': 0,
    'distance': 1,
    'elevation': 0,
    'url': "/HRTF_0_0.wav",
    'buffer': AudioBuffer
  },
  {
    'azimuth': 5,
    'distance': 1,
    'elevation': 0,
    'url': "/HRTF_5_0.wav",
    'buffer': AudioBuffer

  },
  {
    'azimuth': 5,
    'distance': 1,
    'elevation': 5,
    'url': "/HRTF_5_5.wav",
    'buffer': AudioBuffer
  }
]
```

## API

The `binauralFIR` object exposes the following API:

Method | Description
--- | ---
`binauralFIR.connect()` | Connects the binauralFIRNode to the Web Audio graph
`binauralFIR.disconnect()` | Disconnect the binauralFIRNode from the Web Audio graph
`binauralFIR.HRTFDataset` | Set HRTF Dataset to be used with the virtual source.
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
