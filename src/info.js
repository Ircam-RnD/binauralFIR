/**
 * @fileOverview Information on the library, from the `package.json` file.
 *
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import packageJSON from '../package.json';

/**
 * @module info
 */

/**
 * Short description of the library.
 *
 * @type {String}
 */
export const {description} = packageJSON;

/**
 * License of the library.
 *
 * @type {String}
 */
export const {license} = packageJSON;

/**
 * Name of the library.
 *
 * @type {String}
 */
export const {name} = packageJSON;

/**
 * Semantic version of the library.
 *
 * @type {String}
 */
export const {version} = packageJSON;

export default {
  description,
  license,
  name,
  version,
};
