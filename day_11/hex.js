const getRoute = (steps) => {
  let x = 0;
  let y = 0;
  let z = 0;

  return steps.map((step) => {
    if (step === 'n') {
      y += 1;
      z -= 1;
    } else if (step === 's') {
      y -= 1;
      z += 1;
    } else if (step === 'ne') {
      x += 1;
      z -= 1;
    } else if (step === 'sw') {
      x -= 1;
      z += 1;
    } else if (step === 'nw') {
      x -= 1;
      y += 1;
    } else if (step === 'se') {
      x += 1;
      y -= 1;
    }
    return (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;
  });
};

const fastestTravelPath = (stepsInput) => {
  const steps = stepsInput.split(',');
  const route = getRoute(steps);
  return route[route.length - 1];
};

const furthestPoint = (stepsInput) => {
  const steps = stepsInput.split(',');
  const route = getRoute(steps);
  console.log('route', route)
  return Math.max(...route);
};

module.exports = {
  fastestTravelPath,
  furthestPoint,
};
