/**
 * @fileOverview SOFA convention to and from openGL convention.
 *
 * SOFA distances are in metres, angles in degrees.
 *
 * <pre>
 *
 * SOFA          +z  +x             openGL    +y
 *                | /                          |
 *                |/                           |
 *         +y ----o                            o---- +x
 *                                            /
 *                                           /
 *                                          +z
 *
 * SOFA.x = -openGL.z               openGL.x = -SOFA.y
 * SOFA.y = -openGL.x               openGL.y =  SOFA.z
 * SOFA.z =  openGL.y               openGL.z = -SOFA.x
 *
 * SOFA.azimuth = atan2(SOFA.y, SOFA.x)
 * SOFA.elevation = atan2(SOFA.z, sqrt(SOFA.x * SOFA.x + SOFA.y * SOFA.y) );
 * SOFA.distance = sqrt(SOFA.x * SOFA.x + SOFA.y * SOFA.y + SOFA.z * SOFA.z)
 *
 * </pre>
 *
 * @author Jean-Philippe.Lambert@ircam.fr
 * @copyright 2015-2016 IRCAM, Paris, France
 * @license BSD-3-Clause
 */

import degree from './degree';

/**
 * Coordinates as an array of 3 values:
 * [x, y, z] or [azimuth, elevation, distance], depending on system
 *
 * @typedef Coordinates
 * @type {vec3}
 */

/**
 * Coordinate system: sofaCartesian', 'sofaSpherical', or'gl'.
 *
 * @typedef CoordinateSystem
 * @type {String}
 */

/**
 * Convert SOFA cartesian coordinates to openGL.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function sofaCartesianToGl(out, a) {
  // copy to handle in-place
  const x = a[0];
  const y = a[1];
  const z = a[2];

  out[0] = -y;
  out[1] = z;
  out[2] = -x;

  return out;
}

/**
 * Convert openGL coordinates to SOFA cartesian.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function glToSofaCartesian(out, a) {
  // copy to handle in-place
  const x = a[0];
  const y = a[1];
  const z = a[2];

  out[0] = -z;
  out[1] = -x;
  out[2] = y;

  return out;
}

/**
 * Convert SOFA cartesian coordinates to SOFA spherical.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function sofaCartesianToSofaSpherical(out, a) {
  // copy to handle in-place
  const x = a[0];
  const y = a[1];
  const z = a[2];

  const x2y2 = x * x + y * y;

  // from [-180, 180] to [0, 360);
  out[0] = (degree.atan2(y, x) + 360) % 360;

  out[1] = degree.atan2(z, Math.sqrt(x2y2) );
  out[2] = Math.sqrt(x2y2 + z * z);

  return out;
}

/**
 * Convert SOFA spherical coordinates to SOFA spherical.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function sofaSphericalToSofaCartesian(out, a) {
  // copy to handle in-place
  const azimuth = a[0];
  const elevation = a[1];
  const distance = a[2];

  const cosE = degree.cos(elevation);
  out[0] = distance * cosE * degree.cos(azimuth); // SOFA.x
  out[1] = distance * cosE * degree.sin(azimuth); // SOFA.y
  out[2] = distance * degree.sin(elevation); // SOFA.z

  return out;
}

/**
 * Convert SOFA spherical coordinates to openGL.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function sofaSphericalToGl(out, a) {
  // copy to handle in-place
  const azimuth = a[0];
  const elevation = a[1];
  const distance = a[2];

  const cosE = degree.cos(elevation);
  out[0] = -distance * cosE * degree.sin(azimuth); // -SOFA.y
  out[1] = distance * degree.sin(elevation); // SOFA.z
  out[2] = -distance * cosE * degree.cos(azimuth); // -SOFA.x

  return out;
}

/**
 * Convert openGL coordinates to SOFA spherical.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function glToSofaSpherical(out, a) {
  // copy to handle in-place
  // difference to avoid generating -0 out of 0
  const x = 0 - a[2]; // -openGL.z
  const y = 0 - a[0]; // -openGL.x
  const z = a[1]; // openGL.y

  const x2y2 = x * x + y * y;

  // from [-180, 180] to [0, 360);
  out[0] = (degree.atan2(y, x) + 360) % 360;

  out[1] = degree.atan2(z, Math.sqrt(x2y2) );
  out[2] = Math.sqrt(x2y2 + z * z);

  return out;
}

/**
 * Convert coordinates to SOFA cartesian.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @param {CoordinateSystem} system
 * @returns {Coordinates} out
 * @throws {Error} when the system is unknown.
 */
export function systemToSofaCartesian(out, a, system) {
  switch (system) {
    case 'sofaCartesian':
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      break;

    case 'sofaSpherical':
      sofaSphericalToSofaCartesian(out, a);
      break;

    default:
      throw new Error('Bad coordinate system');
  }
  return out;
}

/**
 * Convert coordinates to openGL.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @param {CoordinateSystem} system
 * @returns {Coordinates} out
 * @throws {Error} when the system is unknown.
 */
export function systemToGl(out, a, system) {
  switch (system) {
    case 'gl':
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      break;

    case 'sofaCartesian':
      sofaCartesianToGl(out, a);
      break;

    case 'sofaSpherical':
      sofaSphericalToGl(out, a);
      break;

    default:
      throw new Error('Bad coordinate system');
  }
  return out;
}

/**
 * Convert openGL coordinates to other system.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @param {CoordinateSystem} system
 * @returns {Coordinates} out
 * @throws {Error} when the system is unknown.
 */
export function glToSystem(out, a, system) {
  switch (system) {
    case 'gl':
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      break;

    case 'sofaCartesian':
      glToSofaCartesian(out, a);
      break;

    case 'sofaSpherical':
      glToSofaSpherical(out, a);
      break;

    default:
      throw new Error('Bad coordinate system');
  }
  return out;
}

export default {
  sofaCartesianToGl,
  sofaCartesianToSofaSpherical,
  glToSofaCartesian,
  glToSofaSpherical,
  glToSystem,
  sofaSphericalToSofaCartesian,
  sofaSphericalToGl,
  systemToSofaCartesian,
  systemToGl,
};
