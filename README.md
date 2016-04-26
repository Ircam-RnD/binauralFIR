# Binaural #

This library permits to render sources in three-dimensional space with
binaural audio.

This library provides an access to a server, in order to load a set of
Head-related transfer functions ([HRTF]). The set of filters applies to any
number of sources, given their position, and a listener.

This library is compatible with the [Web Audio API]. The novelty of this
library is that it permits to use a custom [HRTF] dataset (see
[T. Carpentier article]).

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

### Coordinate system types ###

See the files in [src/geometry], for conversions:
- OpenGL, [SOFA], and Spat4 (Ircam) conventions
- cartesian and spherical coordinates
- radian and degree angles


## Examples ##

Please see the [examples directory] for complete code, and the [examples online].

See also the [API documentation] for the complete options.

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
    coordinateSystem: 'sofaSpherical', // [azimuth, elevation, distance]
    sourceCount: 1,
    sourcePositions: [ [0, 0, 1] ], // initial position
});
binauralPanner.connectOutputs(audioContext.destination);
binauralPanner.connectInputByIndex(0, player);

```

Load an HRTF set (this returns a [Promise]).

```js
binauralPanner.loadHrtfSet(url)
    .then(function () {
        console.log('loaded');
    })
    .catch(function (error) {
        console.log('Error while loading ' + url + error.message);
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
});
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
sample-rate matching the one of the audio context.

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

Then, a `BinauralPanner` can load one of these URLs.

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

- re-sampling is broken on full set (Chrome 48 issue): too many parallel
  audio contexts?
- clicks on Firefox 44-45 (during update of `convolver.buffer`)
- ServerDataBase: avoid server with free pattern filter?

## To do ##

- attenuation with distance
- dry/wet outputs for (shared) reverberation
- support for infinite impulse responses, once [IIRFilterNode] is
  implemented.

## Developers ##

The source code is in the [src directory], in [ES2015] standard. `npm run
compile` with [Babel] to the [dist directory]. Note that there is a
[.babelrc] file. `npm run bundle` runs the linters, the tests,
generates the documentation, and compiles the code.

Commit the source files to the branch `develop`, and update the version in
[package.json] if this is intended to be a release.

On the `master` branch, merge from the `develop` branch. Commit the
generated documentation and the generated distribution files. Put a release
tag that corresponds to the version in [package.json].

On the `gh-pages` branch, merge from the `master` branch. Commit the
examples, and the extra files (audio and HRTF set files).

### Style ###

`npm run lint` to check that the code conforms with [.eslintrc] and
[.jscsrc] files. The rules derive from [AirBnB] with these
major points:
- [ES2015]
- no `'use strict'` globally (already there via babel)
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
  test files must end with `_issues.js`. Once an issue is solved, the
  corresponding tests are added to the automated test set.
- `npm run test-browser` starts a server for running the tests in any browser.

Examples for specific testing, when developing or resolving an issue:
- `browserify test/geometry/test_Listener.js -t babelify | tape-run` in a
  headless browser
- `browserify test/geometry/test_Listener.js -t babelify | testling -u`
  for an URL to open in any browser

### Documentation ###

Document any public function and method with [JSDoc], and generate the HTML
pages with `npm run doc`. At this point, neither
[jsdoc](https://www.npmjs.com/package/jsdoc) nor
[esdoc](https://www.npmjs.com/package/esdoc) gives perfect
transcription. (See the [jsdoc.json] and [esdoc.json] files.)

## License

This module is released under the [BSD-3-Clause] license.

## Acknowledgements

This research was developped by both [Acoustic And Cognitive Spaces] and
[Analysis of Musical Practices] IRCAM research teams. A previous version
was part of the WAVE project, funded by ANR (French National Research
Agency). The current version, supporting multiple sources and a listener,
the SOFA standard, and the access to a server, is part of the [CoSiMa]
project, funded by ANR.

[//]: # (Avoid relative links for use with https://github.com/README.md)
[//]: # (and http://cdn.rawgit.com/Ircam-RnD/binauralFIR/next-gh-pages/doc/index.html)

[//]: # (Use relative links after the release, and drop rawgit.com)
[//]: # (next-develop => develop)
[//]: # (next-master => master)
[//]: # (next-gh-pages => gh-pages)

[.babelrc]: https://github.com/Ircam-RnD/binauralFIR/tree/next-develop/.babelrc
[.eslintrc]: https://github.com/Ircam-RnD/binauralFIR/tree/next-develop/.eslintrc
[.jscsrc]: https://github.com/Ircam-RnD/binauralFIR/tree/next-develop/.jscsrc
[Acoustic And Cognitive Spaces]: http://recherche.ircam.fr/equipes/salles/
[AirBnB]: https://github.com/airbnb/javascript/
[Analysis of Musical Practices]: http://apm.ircam.fr/
[API documentation directory]: https://github.com/Ircam-RnD/binauralFIR/tree/next-master/doc/
[API documentation]: http://cdn.rawgit.com/Ircam-RnD/binauralFIR/next-master/doc/index.html
[Babel]: https://babeljs.io/
[BSD-3-Clause]: http://opensource.org/licenses/BSD-3-Clause
[CoSiMa]: http://cosima.ircam.fr/
[doc directory]:  https://github.com/Ircam-RnD/binauralFIR/tree/next-master/doc/
[dist directory]:  https://github.com/Ircam-RnD/binauralFIR/tree/next-master/dist/
[documentation]: #documentation
[ES2015]: https://babeljs.io/docs/learn-es2015/
[esdoc.json]: https://github.com/Ircam-RnD/binauralFIR/tree/next-develop/esdoc.json
[examples directory]: https://github.com/Ircam-RnD/binauralFIR/tree/next-gh-pages/examples/
[examples HRTF directory]: https://github.com/Ircam-RnD/binauralFIR/tree/next-gh-pages/examples/hrtf/
[examples online]: http://cdn.rawgit.com/Ircam-RnD/binauralFIR/next-gh-pages/examples/index.html
[HRTF]: http://en.wikipedia.org/wiki/Head-related_transfer_function
[IIRFilterNode]: https://webaudio.github.io/web-audio-api/#idl-def-IIRFilterNode
[jsdoc.json]: https://github.com/Ircam-RnD/binauralFIR/tree/next-develop/jsdoc.json
[JSDoc]: http://usejsdoc.org/
[package.json]: https://github.com/Ircam-RnD/binauralFIR/tree/next-develop/package.json
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[SOFA]: http://www.aes.org/publications/standards/search.cfm?docID=99
[src directory]: https://github.com/Ircam-RnD/binauralFIR/tree/next-develop/src/
[src/geometry]: https://github.com/Ircam-RnD/binauralFIR/tree/next-develop/src/geometry/
[T. Carpentier article]: http://wac.ircam.fr/pdf/demo/wac15_submission_16.pdf
[test directory]: https://github.com/Ircam-RnD/binauralFIR/tree/next-develop/test/
[Web Audio API]: https://webaudio.github.io/web-audio-api/
