/**
 * @fileOverview Coordinate systems conversions. openGL, SOFA, and Spat4 (Ircam).
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
 * @typedef {vec3} Coordinates
 */

/**
 * Coordinate system: `gl`, `sofaCartesian`, `sofaSpherical`,
 * `spat4Cartesian`, or `spat4Spherical`.
 *
 * @typedef {String} CoordinateSystem
 */

// ----------------------------- SOFA

/**
 * SOFA cartesian coordinate system: `sofaCartesian`.
 *
 * SOFA distances are in metres.
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
 * </pre>
 *
 * @typedef {Coordinates} SofaCartesian
 */

/**
 * SOFA spherical coordinate system:  `sofaSpherical`.
 *
 * SOFA angles are in degrees.
 *
 * <pre>
 *
 * SOFA.azimuth = atan2(SOFA.y, SOFA.x)
 * SOFA.elevation = atan2(SOFA.z, sqrt(SOFA.x * SOFA.x + SOFA.y * SOFA.y) );
 * SOFA.distance = sqrt(SOFA.x * SOFA.x + SOFA.y * SOFA.y + SOFA.z * SOFA.z)
 *
 * </pre>
 *
 * @typedef {Coordinates} SofaSpherical
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

  out[0] = 0 - y;
  out[1] = z;
  out[2] = 0 - x;

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

  out[0] = 0 - z;
  out[1] = 0 - x;
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
  out[0] = 0 - distance * cosE * degree.sin(azimuth); // -SOFA.y
  out[1] = distance * degree.sin(elevation); // SOFA.z
  out[2] = 0 - distance * cosE * degree.cos(azimuth); // -SOFA.x

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
export function sofaToSofaCartesian(out, a, system) {
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

// ---------------- Spat4

/**
 * Spat4 cartesian coordinate system: `spat4Cartesian`.
 *
 * Spat4 distances are in metres.
 *
 * <pre>
 *
 * Spat4         +z  +y             openGL    +y
 *                | /                          |
 *                |/                           |
 *                o---- +x                     o---- +x
 *                                            /
 *                                           /
 *                                         +z
 *
 * Spat4.x =  openGL.x               openGL.x =  Spat4.x
 * Spat4.y = -openGL.z               openGL.y =  Spat4.z
 * Spat4.z =  openGL.y               openGL.z = -Spat4.y
 *
 * </pre>
 *
 * @typedef {Coordinates} Spat4Cartesian
 */

/**
 * Spat4 spherical coordinate system: `spat4Spherical`.
 *
 * Spat4 angles are in degrees.
 *
 * <pre>
 *
 * Spat4.azimuth = atan2(Spat4.x, Spat4.y)
 * Spat4.elevation = atan2(Spat4.z, sqrt(Spat4.x * Spat4.x + Spat4.y * Spat4.y) );
 * Spat4.distance = sqrt(Spat4.x * Spat4.x + Spat4.y * Spat4.y + Spat4.z * Spat4.z)
 *
 * </pre>
 *
 * @typedef {Coordinates} Spat4Spherical
 */

/**
 * Convert Spat4 cartesian coordinates to openGL.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function spat4CartesianToGl(out, a) {
  // copy to handle in-place
  const x = a[0];
  const y = a[1];
  const z = a[2];

  out[0] = x;
  out[1] = z;
  out[2] = 0 - y;

  return out;
}

/**
 * Convert openGL coordinates to Spat4 cartesian.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function glToSpat4Cartesian(out, a) {
  // copy to handle in-place
  const x = a[0];
  const y = a[1];
  const z = a[2];

  out[0] = x;
  out[1] = 0 - z;
  out[2] = y;

  return out;
}

/**
 * Convert Spat4 cartesian coordinates to Spat4 spherical.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function spat4CartesianToSpat4Spherical(out, a) {
  // copy to handle in-place
  const x = a[0];
  const y = a[1];
  const z = a[2];

  const x2y2 = x * x + y * y;

  out[0] = degree.atan2(x, y);
  out[1] = degree.atan2(z, Math.sqrt(x2y2) );
  out[2] = Math.sqrt(x2y2 + z * z);

  return out;
}

/**
 * Convert Spat4 spherical coordinates to Spat4 spherical.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function spat4SphericalToSpat4Cartesian(out, a) {
  // copy to handle in-place
  const azimuth = a[0];
  const elevation = a[1];
  const distance = a[2];

  const cosE = degree.cos(elevation);
  out[0] = distance * cosE * degree.sin(azimuth); // Spat4.x
  out[1] = distance * cosE * degree.cos(azimuth); // Spat4.y
  out[2] = distance * degree.sin(elevation); // Spat4.z

  return out;
}

/**
 * Convert Spat4 spherical coordinates to openGL.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function spat4SphericalToGl(out, a) {
  // copy to handle in-place
  const azimuth = a[0];
  const elevation = a[1];
  const distance = a[2];

  const cosE = degree.cos(elevation);
  out[0] = distance * cosE * degree.sin(azimuth); // Spat4.x
  out[1] = distance * degree.sin(elevation); // Spat4.z
  out[2] = 0 - distance * cosE * degree.cos(azimuth); // -Spat4.y

  return out;
}

/**
 * Convert openGL coordinates to Spat4 spherical.
 *
 * @param {Coordinates} out in-place if out === a.
 * @param {Coordinates} a
 * @returns {Coordinates} out
 */
export function glToSpat4Spherical(out, a) {
  // copy to handle in-place
  // difference to avoid generating -0 out of 0
  const x = a[0]; // openGL.x
  const y = 0 - a[2]; // -openGL.z
  const z = a[1]; // openGL.y

  const x2y2 = x * x + y * y;

  out[0] = degree.atan2(x, y);
  out[1] = degree.atan2(z, Math.sqrt(x2y2) );
  out[2] = Math.sqrt(x2y2 + z * z);

  return out;
}

// ---------------- named coordinate systems

/**
 * Get the coordinate system general type (cartesian or spherical).
 *
 * @param {String} system
 * @returns {String} 'cartesian' or 'spherical', if `system` if of cartesian
 * or spherical type.
 */
export function systemType(system) {
  let type;
  if (system === 'sofaCartesian'
     || system === 'spat4Cartesian'
     || system === 'gl') {
    type = 'cartesian';
  } else if (system === 'sofaSpherical'
             || system === 'spat4Spherical') {
    type = 'spherical';
  } else {
    throw new Error(`Unknown coordinate system type ${system}`);
  }
  return type;
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

    case 'spat4Cartesian':
      spat4CartesianToGl(out, a);
      break;

    case 'spat4Spherical':
      spat4SphericalToGl(out, a);
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

    case 'spat4Cartesian':
      glToSpat4Cartesian(out, a);
      break;

    case 'spat4Spherical':
      glToSpat4Spherical(out, a);
      break;

    default:
      throw new Error('Bad coordinate system');
  }
  return out;
}

export default {
  glToSofaCartesian,
  glToSofaSpherical,
  glToSpat4Cartesian,
  glToSpat4Spherical,
  glToSystem,
  sofaCartesianToGl,
  sofaCartesianToSofaSpherical,
  sofaSphericalToGl,
  sofaSphericalToSofaCartesian,
  sofaToSofaCartesian,
  spat4CartesianToGl,
  spat4CartesianToSpat4Spherical,
  spat4SphericalToGl,
  spat4SphericalToSpat4Cartesian,
  systemToGl,
  systemType,
};
