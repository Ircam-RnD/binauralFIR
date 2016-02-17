/**
 * @fileOverview Parser functions for SOFA files
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

/**
 * Parses a SOFA JSON string with into an object with `data` and `metaData`
 * attributes.
 *
 * @param {String} sofaString
 * @returns {Object} with `data` and `metaData` attributes
 * @throws {Error} when the parsing fails
 */
export function parseSofa(sofaString) {
  try {
    const sofa = JSON.parse(sofaString);
    const hrtf = {};

    hrtf.name = sofa.name;

    if (typeof sofa.attributes !== 'undefined') {
      hrtf.metaData = {};
      const metaData = sofa.attributes.find( (e) => {
        return e.name === 'NC_GLOBAL';
      });
      if (typeof metaData !== 'undefined') {
        metaData.attributes.forEach( (e) => {
          hrtf.metaData[e.name] = e.value[0];
        });
      }
    }

    if (typeof sofa.leaves !== 'undefined') {
      const data = sofa.leaves;
      data.forEach( (d) => {
        hrtf[d.name] = {};
        d.attributes.forEach( (a) => {
          hrtf[d.name][a.name] = a.value[0];
        });
        hrtf[d.name].shape = d.shape;
        hrtf[d.name].data = d.data;
      });
    }

    return hrtf;
  } catch (error) {
    throw new Error(`Unable to parse SOFA string. ${error.message}`);
  }
}

/**
 * Prefix SOFA coordinate system with `sofa`.
 *
 * @param {String} sofaType : either `cartesian` or `spherical`
 * @returns {String} either `sofaCartesian` or `sofaSpherical`
 * @throws {Error} if sofaType is unknown
 */
export function conformSofaType(sofaType) {
  let type;

  switch (sofaType) {
    case ('cartesian'):
      type = 'sofaCartesian';
      break;

    case ('spherical'):
      type = 'sofaSpherical';
      break;

    default:
      throw new Error(`Bad SOFA type ${sofaType}`);
  }
  return type;
}

export default {
  parseSofa,
  conformSofaType,
};
