/**
 * @fileOverview HRTF set tests for known issues.
 *
 * tape-run 2.1.2 (Electron 0.36.7) crashes with system sample-rate at
 * 44100 Hz
 *
 * Chrome 48 crashes with system sample-rate 96000 Hz, even on small HRTF
 * sets.
 *
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import test from 'blue-tape';
import '../../include/AudioContextMonkeyPatch';

import HrtfSet from '../../src/sofa/HrtfSet';

const prefix = 'HRTF set issues';

const audioContext = new window.AudioContext();

test(`${prefix}: Load small set with different sample-rate`, (assert) => {
  const hrtfSet = new HrtfSet({
    audioContext,
  });

  // filter out duplicates
  let sofaSampleRates = [
    44100,
    48000,
    audioContext.sampleRate,
  ];

  // filter-out duplicates
  sofaSampleRates = [ ... new Set(sofaSampleRates) ];

  const urls = sofaSampleRates.map( (sampleRate) => {
    return `http://bili2.ircam.fr/SimpleFreeFieldHRIR/CROSSMOD/COMPENSATED/`
      + `${sampleRate}/IRC_1068_C_HRIR.sofa`;
  });

  const testPromises = urls.map( (url) => {
    return hrtfSet.load(url)
      .then( (response) => {
        assert.pass(`Got ${response}.`);
      })
      .catch( (error) => {
        assert.fail(`URL ${url} failed: ${error.message}.`);
      });
  });

  return Promise.all(testPromises);
});

test(`${prefix}: Load medium set with different sample-rate`, (assert) => {
  const hrtfSet = new HrtfSet({
    audioContext,
  });

  // filter out duplicates
  let sofaSampleRates = [
    44100,
    48000,
    audioContext.sampleRate,
  ];

  // filter-out duplicates
  sofaSampleRates = [ ... new Set(sofaSampleRates) ];

  const urls = sofaSampleRates.map( (sampleRate) => {
    return `http://bili2.ircam.fr/SimpleFreeFieldHRIR/LISTEN/COMPENSATED/`
      + `${sampleRate}/IRC_1052_C_HRIR.sofa`;
  });

  const testPromises = urls.map( (url) => {
    return hrtfSet.load(url)
      .then( (response) => {
        assert.pass(`Got ${response}.`);
      })
      .catch( (error) => {
        assert.fail(`URL ${url} failed: ${error.message}.`);
      });
  });

  return Promise.all(testPromises);
});

test(`${prefix}: Load big set with different sample-rate`, (assert) => {
  const hrtfSet = new HrtfSet({
    audioContext,
  });

  // filter out duplicates
  let sofaSampleRates = [
    44100,
    48000,
    audioContext.sampleRate,
  ];

  // filter-out duplicates
  sofaSampleRates = [ ... new Set(sofaSampleRates) ];

  const urls = sofaSampleRates.map( (sampleRate) => {
    return `http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/COMPENSATED/`
      + `${sampleRate}/IRC_1119_C_HRIR.sofa`;
  });

  const testPromises = urls.map( (url) => {
    return hrtfSet.load(url)
      .then( (response) => {
        assert.pass(`Got ${response}.`);
      })
      .catch( (error) => {
        assert.fail(`URL ${url} failed: ${error.message}.`);
      });
  });

  return Promise.all(testPromises);
});
