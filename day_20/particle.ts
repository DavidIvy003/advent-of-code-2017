interface particleType {
  id: number;
  position: number[];
  velocity: number[];
  acceleration: number[];
  distance: number;
  increasingDistance: boolean;
}

const getParticleValueFromString = (str: string, match: RegExp): number[] => 
  str.match(match)[1].trim().split(',').map(n => +n);

const createParticleFromString = (particleString: string, id: number): particleType => {
  const position = getParticleValueFromString(particleString, /p=<(.*)>, v=/);
  return {
    id,
    position,
    velocity: getParticleValueFromString(particleString, /v=<(.*)>, a=/),
    acceleration: getParticleValueFromString(particleString, /, a=<(.*)>/),
    distance: getManhattanDistance(position),
    increasingDistance: false,
  };
};

const getManhattanDistance = (position: number[]): number => 
  position.reduce((a, b) => a + Math.abs(b), 0);

const filterParticles = (particles: particleType[], type: string): particleType[] => {
  const limitFunc = type === 'velocity' ? Math.max : Math.min;
  const lowestAcceleration = limitFunc(...particles.map((particle: particleType): number => 
    getManhattanDistance(particle[type]),
  ));

  return particles.filter((particle: particleType): boolean =>
    lowestAcceleration === getManhattanDistance(particle[type]));
};

const updateParticle = (particle: particleType): particleType => {
  const velocity = particle.velocity.map((v, i) => v + particle.acceleration[i]);
  const position = particle.position.map((v, i) => v + velocity[i]);
  const distance = getManhattanDistance(position);
  const increasingDistance = distance > particle.distance &&
    getManhattanDistance(velocity) < getManhattanDistance(particle.velocity);

  return {
    ...particle,
    velocity,
    position,
    distance,
    increasingDistance,
  };
};

const filterCollisions = (particles: particleType[]): particleType[] => {
  const positionCounts = {};
  particles.forEach((particles: particleType) => {
    if (!positionCounts[particles.position.join(',')]) 
      positionCounts[particles.position.join(',')] = 0;
    positionCounts[particles.position.join(',')] += 1;
  });

  return particles.filter((particle: particleType): boolean =>
    positionCounts[particle.position.join(',')] === 1);
};

const getClosestParticle = (input: string): number => {
  const particles = input.trim().split('\n').map(createParticleFromString);

  let closestParticles = filterParticles(particles, 'acceleration');
  closestParticles = filterParticles(closestParticles, 'velocity');
  closestParticles = filterParticles(closestParticles, 'position');
  
  return closestParticles[0].id;
};

const removeCollisions = (input: string): number => {
  let particles = input.trim().split('\n').map(createParticleFromString);
  for (let i = 0; i < 500; i += 1) {
    particles = filterCollisions(particles.map(updateParticle));
  }

  return particles.length;
};

export { 
  getClosestParticle,
  removeCollisions,
};
