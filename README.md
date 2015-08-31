## BinauralFIR node

> Processing audio node which spatializes an incoming audio stream in three-dimensional space for binaural audio.

The binauralFIR node provides binaural listening to the user with three simple steps. The novelty of this library is that it permits to use your own HRTF dataset. This library can be used as a regular node - AudioNode - inside the [Web Audio API](http://www.w3.org/TR/webaudio/). You can connect the native nodes to the binauralFIR node by using the connect method to binauralFIR.input:

```js
nativeNode.connect(binauralFIR.input);
binauralFIR.connect(audioContext.destination);
```

We provide a HRTF dataset example provided by [IRCAM](http://www.ircam.fr/) in the /example/snd/complete_hrtfs.js file.

### Example

A working demo for this module can be found [here](http://ircam-rnd.github.io/binauralFIR/examples/) and in the `examples` folder.

### HRTF dataset format

As this library allow you to use your own [HRTF](http://en.wikipedia.org/wiki/Head-related_transfer_function) Dataset, if you want to use your dataset in the library you have to follow the following format:

Data | Description
--- | ---
`azimuth` | Azimuth in degrees: from 0 to -180 for source on your left, and from 0 to 180 for source on your right
`distance` | Distance in meters
`elevation` | Elevation in degrees: from 0 to 90 for source above your head, 0 for source in front of your head, and from 0 to -90 for source below your head)
`buffer` | AudioBuffer representing the decoded audio data. An audio file can be decoded by using the [buffer-loader library] (https://github.com/Ircam-RnD/buffer-loader)

This data must be provided inside an Array of Objects, like this example:

```js
[
  {
    'azimuth': 0,
    'distance': 1,
    'elevation': 0,
    'buffer': AudioBuffer
  },
  {
    'azimuth': 5,
    'distance': 1,
    'elevation': 0,
    'buffer': AudioBuffer

  },
  {
    'azimuth': 5,
    'distance': 1,
    'elevation': 5,
    'buffer': AudioBuffer
  }
]
```

### API

The `binauralFIR` object exposes the following API:

Method | Description
--- | ---
`binauralFIR.connect()` | Connects the binauralFIRNode to the Web Audio graph
`binauralFIR.disconnect()` | Disconnect the binauralFIRNode from the Web Audio graph
`binauralFIR.HRTFDataset` | Set HRTF Dataset to be used with the virtual source.
`binauralFIR.setPosition(azimuth, elevation, distance)` | Set position of the virtual source.
`binauralFIR.getPosition()` | Get the current position of the virtual source.
`binauralFIR.setCrossfadeDuration(duration)` | Set the duration of crossfading in miliseconds.
`binauralFIR.getCrossfadeDuration()` | Get the duration of crossfading in miliseconds.

## License

This module is released under the [BSD-3-Clause license](http://opensource.org/licenses/BSD-3-Clause).

## Acknowledgments

This code has been developed from both [Acoustic And Cognitive Spaces](http://recherche.ircam.fr/equipes/salles/) and [Analysis of Musical Practices](http://apm.ircam.fr) IRCAM research teams. It is also part of the WAVE project (http://wave.ircam.fr), funded by ANR (The French National Research Agency), ContInt program, 2012-2015.
