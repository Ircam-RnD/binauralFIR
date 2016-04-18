import test from 'tape';

import {
  almostEquals,
  almostEqualsModulo,
} from '../../src/common/utilities';

import {
  glToSofaCartesian,
  glToSofaSpherical,
  glToSpat4Cartesian,
  glToSpat4Spherical,
  glToSystem,
  sofaCartesianToGl,
  sofaCartesianToSofaSpherical,
  sofaSphericalToGl,
  sofaSphericalToSofaCartesian,
  spat4CartesianToGl,
  spat4CartesianToSpat4Spherical,
  spat4SphericalToGl,
  spat4SphericalToSpat4Cartesian,
  systemToGl,
} from '../../src/geometry/coordinates';

// extra imports for debugging
import degree from '../../src/geometry/degree'; // eslint-disable-line

const prefix = 'Coordinates';

const epsilon = 1e-6;

// ------------ SOFA

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
    for (let e = -90; e <= 90; e += 10) {
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

// ----------------- Spat4

test(`${prefix}: Spat4 coordinates`, (assert) => {
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

  // Spat spherical
  const positionsExpected = [
    [0, 0, 0],
    [90, 0, 1],
    [0, 0, 1],
    [0, 90, 1],
    [45, 45, 2],
    [-90, 0, 1],
    [180, 0, 1],
    [0, -90, 1],
    [-135, -45, 2],
  ];

  let positionsModified = positions.map( (current) => {
    return spat4CartesianToSpat4Spherical([], current);
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
    return spat4SphericalToSpat4Cartesian([], spat4CartesianToSpat4Spherical([], current) );
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'out of place coordinates transform identity');

  positionsModified = positions.map( (current) => {
    const modified = current.slice(0);
    spat4CartesianToSpat4Spherical(modified, modified);
    spat4SphericalToSpat4Cartesian(modified, modified);
    return modified;
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'in-place coordinates transform identity');

  assert.end();
});

test(`${prefix}: Spat4 cartesian coordinates to GL`, (assert) => {
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
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0],
    [1, 3, -2],
  ];

  let positionsModified = positions.map( (current) => {
    return spat4CartesianToGl([], current);
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
    return glToSpat4Cartesian([], spat4CartesianToGl([], current) );
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'out of place coordinates transform identity');

  positionsModified = positions.map( (current) => {
    const modified = current.slice(0);
    spat4CartesianToGl(modified, modified);
    glToSpat4Cartesian(modified, modified);
    return modified;
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'in-place coordinates transform identity');

  assert.end();
});

test(`${prefix}: Spat4 spherical coordinates to GL`, (assert) => {
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
    [1, 0, 0],
    [0, 1, 0],
  ];

  let positionsModified = positions.map( (current) => {
    return spat4SphericalToGl([], current);
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positionsExpected[index][dIndex], epsilon);
    });
  }), -1, 'coordinates transform basics');

  positions = [];
  for (let a = -170; a <= 180; a += 10) {
    for (let e = -90; e < 90; e += 10) {
      positions.push([a, e, 2.345]);
    }
  }

  positionsModified = positions.map( (current) => {
    return glToSpat4Spherical([], spat4SphericalToGl([], current) );
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEquals(d, positions[index][dIndex], epsilon);
    });
  }), -1, 'out of place coordinates transform identity');

  positionsModified = positions.map( (current) => {
    const modified = current.slice(0);
    spat4SphericalToGl(modified, modified);
    glToSpat4Spherical(modified, modified);
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

  // in Spat4 spherical
  // azimuth in [-180, 180], elevation in [-90, 90], distance in [0, +inf)
  positionsExpected = [
    [0, 0, 1],
    [10, 0, 1],
    [-90, 0, 1],
    [-120, 0, 1],
    [180, 80, 1],
    [180, 0, 1],
    [180, -80, 1],
    [180, -60, 1],
    [0, 0, 1],
    [180, 0, 1],
    [-170, -20, 1],
    [170, 20, 1],
  ];

  positionsModified = positions.map( (current) => {
    const modified = current.slice(0);
    spat4SphericalToGl(modified, modified);
    glToSpat4Spherical(modified, modified);
    return modified;
  });

  assert.equals(positionsModified.findIndex( (current, index) => {
    return !current.every( (d, dIndex) => {
      return almostEqualsModulo(d, positionsExpected[index][dIndex],
                                epsilon, 360);
    });
  }), -1, 'wrap angles to Spat4 convention');

  assert.end();
});

// ----------- named coordinate systems

test(`${prefix}: named coordinate systems`, (assert) => {
  const positions = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 2, 3],
  ];

  const systems = [
    'sofaCartesian',
    'sofaSpherical',
    'spat4Cartesian',
    'spat4Spherical',
  ];

  const positionModified = [];
  systems.forEach( (system) => {
    assert.equals(positions.findIndex( (position) => {
      glToSystem(positionModified, position, system); // copy and convert
      systemToGl(positionModified, positionModified, system); // in-place
      return !position.every( (coordinate, c) => {
        return almostEquals(coordinate, positionModified[c], epsilon);
      });
    }), -1, `coordinate system ${system} converted from and to openGL`);
  });

  assert.end();
});
