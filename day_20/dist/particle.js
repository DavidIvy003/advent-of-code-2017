"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getParticleValueFromString = (str, match) => str.match(match)[1].trim().split(',').map(n => +n);
const createParticleFromString = (particleString, id) => {
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
const getManhattanDistance = (position) => position.reduce((a, b) => a + Math.abs(b), 0);
const filterParticles = (particles, type) => {
    const limitFunc = type === 'velocity' ? Math.max : Math.min;
    const lowestAcceleration = limitFunc(...particles.map((particle) => getManhattanDistance(particle[type])));
    return particles.filter((particle) => lowestAcceleration === getManhattanDistance(particle[type]));
};
const getClosestParticle = (input) => {
    const particles = input.trim().split('\n').map(createParticleFromString);
    let closestParticles = filterParticles(particles, 'acceleration');
    closestParticles = filterParticles(closestParticles, 'velocity');
    closestParticles = filterParticles(closestParticles, 'position');
    return closestParticles[0].id;
};
exports.getClosestParticle = getClosestParticle;
//# sourceMappingURL=particle.js.map