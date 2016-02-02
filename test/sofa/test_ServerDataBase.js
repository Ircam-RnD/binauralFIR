/**
 * @fileOverview SOFA server tests.
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import test from 'blue-tape';

import ServerDataBase from '../../src/sofa/ServerDataBase';

const prefix = 'ServerDataBase';

// helpers
function findOne(values, reference) {
  return values.findIndex( (currentArray) => {
    return currentArray.every( (currentValue, index) => {
      return currentValue === reference[index];
    });
  });
}

function findEvery(values, references) {
  return references.every( (reference) => {
    return findOne(values, reference) !== -1;
  });
}

const serverBad = 'http://bad.server';

test(`${prefix}: Bad server`, (assert) => {
  const dataBase = new ServerDataBase({
    serverUrl: serverBad,
  });

  // blue-tape requires a Promise to be returned.
  return dataBase.loadCatalogue()
    .then( (catalogue) => {
      assert.fail(`Bad server should have failed. Got ${catalogue} instead.`);
    })
    .catch( (error) => {
      assert.pass(`Bad server failed, as expected: ${error.message}.`);
    });
});

const serverDefault = 'http://bili2.ircam.fr';

test(`${prefix}: Bad catalogue`, (assert) => {
  const dataBase = new ServerDataBase();

  // blue-tape requires a Promise to be returned.
  return dataBase.loadCatalogue(`${serverDefault}/bad.catalogue`)
    .then( (catalogue) => {
      assert.fail(`Bad catalogue should have failed. Got ${catalogue} instead.`);
    })
    .catch( (error) => {
      assert.pass(`Bad catalogue failed, as expected: ${error.message}.`);
    });
});

test(`${prefix}: Default catalogue`, (assert) => {
  const dataBase = new ServerDataBase();

  // blue-tape requires a Promise to be returned.
  return dataBase.loadCatalogue()
    .then( (catalogue) => {
      assert.pass(`Top catalogue loaded: ${catalogue}`);

      const listen1012Url = 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/'
              + 'LISTEN/COMPENSATED/44100/IRC_1012_C_HRIR.sofa';
      let filteredUrls = dataBase.getUrls({
        convention: 'HRIR', // partial matching
        dataBase: 'Listen', // mixed-case
        equalisation: 'compensated', // lower-case
        sampleRate: 44100, // number
        freePattern: '1012', // string
      });

      assert.equals(filteredUrls.length, 1, '1 URL left after mixed filter.');

      assert.equals(filteredUrls[0], listen1012Url,
                    'filtered URL is the right one');

      const bili1121Url = 'http://bili2.ircam.fr/SimpleFreeFieldSOS/'
              + 'BILI/COMPENSATED/48000/IRC_1121_C_SOS_12order.sofa';
      // un-ordered multiple strings
      filteredUrls = dataBase.getUrls({
        freePattern: '1121 bili 48000 sos 12order',
      });

      assert.equals(filteredUrls.length, 1, '1 URL left after combined free filter.');
      assert.equals(filteredUrls[0], bili1121Url,
                    'filtered URL is the right one');

    })
    .catch( (error) => {
      assert.fail(`Top catalogue failed to load: ${error.message}`);
    });
});

test(`${prefix}: Source positions`, (assert) => {
  const dataBase = new ServerDataBase();

  const listen1012Url = 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/'
          + 'LISTEN/COMPENSATED/44100/IRC_1012_C_HRIR.sofa';

  // aggregate all promises
  const testPromises = [];

  testPromises.push(
    dataBase.getSourcePositions(`${serverBad}/bad.url`)
      .then( (sourcePositions) => {
        assert.fail(`Bad server should have failed. `
                    + `Got ${sourcePositions.length} source positions instead.`);
      })
      .catch( (error) => {
        assert.pass(`Bad server failed, as expected, for source positions: `
                    + `${error.message}.`);
      })
  );

  testPromises.push(
    dataBase.getSourcePositions(`${serverDefault}/bad.url`)
      .then( (sourcePositions) => {
        assert.fail(`Bad URL should have failed. `
                    + `Got ${sourcePositions.length} source positions instead.`);
      })
      .catch( (error) => {
        assert.pass(`Bad URL failed, as expected, for source positions: `
                    + `${error.message}.`);
      })
  );

  testPromises.push(
    dataBase.getSourcePositions(listen1012Url)
      .then( (sourcePositions) => {
        assert.equals(187, sourcePositions.length,
                      `Got ${sourcePositions.length} source positions `
                      + `from ${listen1012Url}`);

        const listen1012Positions = [
          [0, -45, 2.06],
          [105, 30, 2.06],
          [135, 45, 2.06],
          [300, 60, 2.06],
          [330, 60, 2.06],
          [180, 75, 2.06],
          [0, 90, 2.06],
        ];

        assert.true(findEvery(sourcePositions, listen1012Positions),
                    'Found expected positions');

        assert.equals(findOne(sourcePositions, [0, 0, 0]),
                      -1,
                      'Did not find unexpected position');
      })
      .catch( (error) => {
        assert.fail(`Unable to load positions from ${listen1012Url}: `
                    + `${error.message}`);
      })
  );

  return Promise.all(testPromises);
});

test(`${prefix}: Data set definitions`, (assert) => {
  const dataBase = new ServerDataBase();

  const bili1105Url = 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/'
          + 'COMPENSATED/48000/IRC_1105_C_HRIR.sofa';

  // aggregate all promises
  const testPromises = [];

  testPromises.push(
    dataBase.getDataSetDefinitions(`${serverBad}/bad.url`)
      .then( (definitions) => {
        assert.fail(`Bad server should have failed. `
                    + `Got ${definitions} as definitions instead.`);
      })
      .catch( (error) => {
        assert.pass(`Bad URL failed, as expected, for definition: `
                    + `${error.message}.`);
      })
  );

  testPromises.push(
    dataBase.getDataSetDefinitions(`${serverDefault}/bad.url`)
      .then( (definitions) => {
        assert.fail(`Bad URL should have failed. `
                    + `Got ${definitions} as definitions instead.`);
      })
      .catch( (error) => {
        assert.pass(`Bad URL failed, as expected, for definition: `
                    + `${error.message}.`);
      })
  );

  testPromises.push(
    dataBase.getDataSetDefinitions(bili1105Url)
      .then( (definitions) => {
        // source positions
        assert.equals(1680, definitions.SourcePosition.M,
                      `Got ${definitions.SourcePosition.M} source positions `
                      + `from ${bili1105Url}`);
        assert.equals(3, definitions.SourcePosition.C,
                      `Got ${definitions.SourcePosition.C} dimensions `
                      + `for source positions from ${bili1105Url}`);

        // impulse responses
        assert.equals(1680, definitions['Data.IR'].M,
                      `Got ${definitions['Data.IR'].M} impulse responses `
                      + `from ${bili1105Url}`);
        assert.equals(2, definitions['Data.IR'].R,
                      `Got pairs of impulse responses from ${bili1105Url}`);
        assert.equals(1024, definitions['Data.IR'].N,
                      `Got sample size ${definitions['Data.IR'].N} `
                      + `from ${bili1105Url}`);
      })
      .catch( (error) => {
        assert.fail(`Unable to load definitions from ${bili1105Url}: `
                    + `${error.message}`);
      })
  );

  return Promise.all(testPromises);
});

