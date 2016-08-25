/**
 * @fileOverview Utility classes to handle the loading of HRTF files form a
 * SOFA server, direct wrapping of serve-sofa-hrir package for both 
 * retro-compatibility and self-sufficiency of the final binaural lib
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import { HrtfSet, ServerDataBase } from 'serve-sofa-hrir';

export default {
  HrtfSet,
  ServerDataBase,
};
