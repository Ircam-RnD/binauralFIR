# Binaural #

This library permits to render sources in three-dimensional space with
binaural audio.

This library provides an access to a server, in order to load a set of
[HRTF]. The set of filters applies to any number of sources, given their
position, and a listener.

This library is compatible with the [Web Audio API]. The novelty of this
library is that it permits to use a custom [HRTF] dataset (see
[T. Carpentier]).

It is possible to use it without a server, with a direct URL to an [HRTF]
set.

## Documentation ##

You can consult the [API documentation] for the complete documentation.

### BinauralPanner ###

A `BinauralPanner` is a panner for use with the [Web Audio API]. It
spatialises multiple audio sources, given a set of head-related transfer
functions [HRTF]s, and a listener.

### ServerDataBase ###

**The public server that hosts a database of individual [HRTF]s is available
for beta-testers only and will open to public in 2016.**

The `ServerDataBase` retrieves a catalogue from a [SOFA] server. From the
catalogue, it get URLs matching optional filters: data-base, sample-rate,
and any free pattern.

### HRTF dataset ###

You can use any [HRTF] data-set that follows the [SOFA] standard, in JSON
format, using finite impulse responses (FIR). Second-order sections (SOS)
are not supported, yet. See the [examples HRTF directory] for a few samples.

### Coordinates system types ###

See the files in the geometry, for conversions:
- [SOFA] and openGL conventions
- cartesian and spherical coordinates
- radian and degree angles


## Examples ##

Please see the [examples directory] for complete code, and the [examples online].

See also the API documentation for the complete options.

### BinauralPanner ###
Given an audio element, and a global binaural module,

```html
<html>
    <head>
        <script src="../binaural.js"></script>
    </head>
    <body>
        <audio id="source" src="./snd/breakbeat.wav" controls loop></audio>
    </body>
</html>
```

create a source audio node,

```js
var audioContext = new AudioContext();
var $mediaElement = document.querySelector('#source');
var player = audioContext.createMediaElementSource($mediaElement);
```

instantiate a `BinauralPanner` and connect it.

```js
var binauralPanner = new binaural.audio.BinauralPanner({
    audioContext,
    crossfadeDuration: 0.05, // in seconds
    positionsType: 'sofaSpherical', // [azimuth, elevation, distance]
    sourceCount: 1,
    sourcePositions: [ [0, 0, 1] ], // initial position
});
binauralPanner.connectOutputs(audioContext.destination);
binauralPanner.connectInputByIndex(0, player);

```

Load an HRTF set (this returns a promise).

```js
binauralPanner.loadHrtfSet(url)
    .then(function () {
        console.log('loaded');
    })
    .catch(function (error) {
        console.log('Error while loading ' + url
                    + error.message);
    });
```

Then, any source can move:

```js
$azimuth.on("input", function(event) {
    // get current position
    var position = binauralPanner.getSourcePositionByIndex(0);

    // update azimuth
    position[0] = event.target.value;
    binauralPanner.setSourcePositionByIndex(0, position);

    // update filters
    window.requestAnimationFrame(function () {
        binauralPanner.update();
    });
}
```

Note that a call to the `update` method actually updates the filters.

### ServerDataBase ###

Instantiate a `ServerDataBase`

```js
var serverDataBase = new binaural.sofa.ServerDataBase();
```

and load the catalogue from the server. This returns a promise.

```js
var catalogLoaded = serverDataBase.loadCatalogue();
```

Find URLs with `HRIR` convention, `COMPENSATED` equalisation, and a
sample-rate matching those of the audio context.

```js
var urlsFound = catalogLoaded.then(function () {
    var urls = serverDataBase.getUrls({
        convention: 'HRIR',
        equalisation: 'COMPENSATED',
        sampleRate: audioContext.sampleRate,
    });
    return urls;
})
.catch(function(error) {
    console.log('Error accessing HRTF server. ' + error.message);
});
```

Then, a `BinauralPanner` can load one of these URLs

```js
urlsFound.then(function(urls) {
    binauralPanner.loadHrtfSet(urls[0])
        .then(function () {
            console.log('loaded');
        })
        .catch(function (error) {
            console.log('Error while loading ' + url
                + error.message);
        });
});
```

## Issues ##

- re-sampling is broken (Chrome 48 issue)
- no HTTPS on server, yet (mixed content blocked)

## To do ##

- Spat coordinates
- attenuation with distance
- dry/wet outputs for (shared) reverberation
- relative view for the listener

## Developers ##

The source code is in the [src directory], in [ES2015] standard. `npm run
compile` with [Babel] to the [dist directory]. Note that there is a
[.babelrc](./.babelrc) file. `npm run bundle` runs the linters, the tests,
generates the documentation, and compiles the code.

Be sure to commit the distribution files and the documentation for any
release, and tag it.

### Style ###

`npm run lint` to check that the code conforms with [.eslintrc](./.eslintrc) and
[.jscsrc](./.jscsrc) files. The rules derives from [AirBnB] with these
major points:
- [ES2015]
- no `'strict'` globally (already there via babel)
- enforce curly braces (`if`, `for`, etc.)
- allow spaces and new lines, with fewer requirements: use them for clarity

### Test ###

For any function or method, there is at least a test. The hierarchy in the
[test directory] is the same as in the [src directory].

- `npm run test` for all automated tests
- `npm run test-listen` for supervised listening tests. The test files must
  end with `_listen.js`
- `npm run test-issues` for unsolved issues. The issues may depend on the
  host: operating system, user-agent, sound-device, sample-rate, etc. The
  test files must end with `_issues.js`

### Documentation ###

Document any public function and method with [JSDoc], and generate the HTML
pages with `npm run doc`. At this point, neither
[jsdoc](https://www.npmjs.com/package/jsdoc) nor
[esdoc](https://www.npmjs.com/package/esdoc) gives perfect
transcription. (See the [jsdoc.json](./jsdoc.json) and
[esdoc.json](./esdoc.json) files.)

## License

This module is released under the [BSD-3-Clause] license.

## Acknowledgments

This research was developped by both [Acoustic And Cognitive Spaces] and
[Analysis of Musical Practices] IRCAM research teams. A previous version
was part of the WAVE project, funded by ANR (French National Research
Agency). The current version, supporting multiple sources and a listener,
the SOFA standard, and the access to a server, is part of the [CoSiMa]
project, funded by ANR.

[AirBnB]: https://github.com/airbnb/javascript/
[API documentation directory]: https://github.com/Ircam-RnD/binauralFIR/tree/next/doc/
[API documentation]: http://cdn.rawgit.com/Ircam-RnD/binauralFIR/next/doc/index.html
[Acoustic And Cognitive Spaces]: http://recherche.ircam.fr/equipes/salles/
[Analysis of Musical Practices]: http://apm.ircam.fr/
[Babel]: https://babeljs.io/
[BSD-3-Clause]: http://opensource.org/licenses/BSD-3-Clause
[T. Carpentier]: http://wac.ircam.fr/pdf/demo/wac15_submission_16.pdf
[CoSiMa]: http://cosima.ircam.fr/
[dist directory]:  https://github.com/Ircam-RnD/binauralFIR/tree/next/dist/
[documentation]: #documentation
[ES2015]: https://babeljs.io/docs/learn-es2015/
[examples directory]: https://github.com/Ircam-RnD/binauralFIR/tree/next/examples/
[examples HRTF directory]: https://github.com/Ircam-RnD/binauralFIR/tree/next/examples/hrtf/
[examples online]: http://cdn.rawgit.com/Ircam-RnD/binauralFIR/next/examples/index.html
[JSDoc]: http://usejsdoc.org/
[HRTF]: http://en.wikipedia.org/wiki/Head-related_transfer_function
[SOFA]: http://www.aes.org/publications/standards/search.cfm?docID=99
[src directory]: https://github.com/Ircam-RnD/binauralFIR/tree/next/src
[Web Audio API]: https://webaudio.github.io/web-audio-api/