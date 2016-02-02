import test from 'tape';

import { almostEquals } from '../../src/common/utilities';

import {
  sofaCartesianToGl,
  sofaCartesianToSofaSpherical,
  glToSofaCartesian,
  glToSofaSpherical,
  sofaSphericalToGl,
  sofaSphericalToSofaCartesian,
} from '../../src/geometry/coordinates';

// extra imports for debugging
import degree from '../../src/geometry/degree'; // eslint-disable-line

const prefix = 'Coordinates';

const epsilon = 1e-6;

test(`${prefix}: SOFA coordinates`, (assert) => {
  let positions = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, Math.sqrt(2)],
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, -1],
    [-1, -1, -Math.sqrt(2)],
  ];

  // SOFA spherical
  const positionsExpected = [
    [0, 0, 0],
    [0, 0, 1],
    [90, 0, 1],
    [0, 90, 1],
    [45, 45, 2],
    [180, 0, 1],
    [270, 0, 1],
    [0, -90, 1],
    [225, -45, 2],
  ];

  let positionsModified = positions.map( (current) => {
    return sofaCartesianToSofaSpherical([], current);
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positionsExpected[index][dIndex], epsilon);
    });
  }), -1, 'coordinates transform basics');

  positions = [];
  for (let x = -10; x < 10; x += 1) {
    for (let y = -10; y < 10; y += 1) {
      for (let z = -10; z < 10; z += 1) {
        positions.push([x, y, z]);
      }
    }
  }

  positionsModified = positions.map( (current) => {
    return sofaSphericalToSofaCartesian([], sofaCartesianToSofaSpherical([], current) );
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'out of place coordinates transform identity');

  positionsModified = positions.map( (current) => {
    const modified = current.slice(0);
    sofaCartesianToSofaSpherical(modified, modified);
    sofaSphericalToSofaCartesian(modified, modified);
    return modified;
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'in-place coordinates transform identity');

  assert.end();
});

test(`${prefix}: SOFA cartesian coordinates to GL`, (assert) => {
  let positions = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 2, 3],
  ];

  // in GL cartesian
  const positionsExpected = [
    [0, 0, 0],
    [0, 0, -1],
    [-1, 0, 0],
    [0, 1, 0],
    [-2, 3, -1],
  ];

  let positionsModified = positions.map( (current) => {
    return sofaCartesianToGl([], current);
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positionsExpected[index][dIndex], epsilon);
    });
  }), -1, 'coordinates transform basics');

  positions = [];
  for (let x = -10; x < 10; x += 1) {
    for (let y = -10; y < 10; y += 1) {
      for (let z = -10; z < 10; z += 1) {
        positions.push([x, y, z]);
      }
    }
  }

  positionsModified = positions.map( (current) => {
    return glToSofaCartesian([], sofaCartesianToGl([], current) );
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'out of place coordinates transform identity');

  positionsModified = positions.map( (current) => {
    const modified = current.slice(0);
    sofaCartesianToGl(modified, modified);
    glToSofaCartesian(modified, modified);
    return modified;
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'in-place coordinates transform identity');

  assert.end();
});

test(`${prefix}: SOFA spherical coordinates to GL`, (assert) => {
  let positions = [
    [0, 0, 0],
    [0, 0, 1],
    [90, 0, 1],
    [0, 90, 1],
  ];

  // in GL conventions
  let positionsExpected = [
    [0, 0, 0],
    [0, 0, -1],
    [-1, 0, 0],
    [0, 1, 0],
  ];

  let positionsModified = positions.map( (current) => {
    return sofaSphericalToGl([], current);
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positionsExpected[index][dIndex], epsilon);
    });
  }), -1, 'coordinates transform basics');

  positions = [];
  for (let a = 0; a < 360; a += 10) {
    for (let e = -90; e < 90; e += 10) {
      positions.push([a, e, 2.345]);
    }
  }

  positionsModified = positions.map( (current) => {
    return glToSofaSpherical([], sofaSphericalToGl([], current) );
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'out of place coordinates transform identity');

  positionsModified = positions.map( (current) => {
    const modified = current.slice(0);
    sofaSphericalToGl(modified, modified);
    glToSofaSpherical(modified, modified);
    return modified;
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'in-place coordinates transform identity');

  positions = [
    [720, 0, 1],
    [370, 0, 1],
    [-90, 0, 1],
    [-120, 0, 1],
    [0, 100, 1],
    [0, 180, 1],
    [0, -100, 1],
    [0, -120, 1],
    [0, 360, 1],
    [0, 0, -1],
    [10, 20, -1],
    [-10, -20, -1],
  ];

  // in SOFA spherical
  // azimuth in [0, 360), elevation in [-90, 90], distance in [0, +inf)
  positionsExpected = [
    [0, 0, 1],
    [10, 0, 1],
    [270, 0, 1],
    [240, 0, 1],
    [180, 80, 1],
    [180, 0, 1],
    [180, -80, 1],
    [180, -60, 1],
    [0, 0, 1],
    [180, 0, 1],
    [190, -20, 1],
    [170, 20, 1],
  ];

  positionsModified = positions.map( (current) => {
    const modified = current.slice(0);
    sofaSphericalToGl(modified, modified);
    glToSofaSpherical(modified, modified);
    return modified;
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positionsExpected[index][dIndex], epsilon);
    });
  }), -1, 'wrap angles to SOFA convention');

  assert.end();
});
