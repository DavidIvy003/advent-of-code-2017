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

const getClosestParticle = (input: string): number => {
  const particles = input.trim().split('\n').map(createParticleFromString);

  let closestParticles = filterParticles(particles, 'acceleration');
  closestParticles = filterParticles(closestParticles, 'velocity');
  closestParticles = filterParticles(closestParticles, 'position');
  
  return closestParticles[0].id;
};

export { 
  getClosestParticle,
};
