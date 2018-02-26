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
const updateParticle = (particle) => {
    const velocity = particle.velocity.map((v, i) => v + particle.acceleration[i]);
    const position = particle.position.map((v, i) => v + velocity[i]);
    const distance = getManhattanDistance(position);
    const increasingDistance = distance > particle.distance &&
        getManhattanDistance(velocity) < getManhattanDistance(particle.velocity);
    return Object.assign({}, particle, { velocity,
        position,
        distance,
        increasingDistance });
};
const filterCollisions = (particles) => {
    const positionCounts = {};
    particles.forEach((particles) => {
        if (!positionCounts[particles.position.join(',')])
            positionCounts[particles.position.join(',')] = 0;
        positionCounts[particles.position.join(',')] += 1;
    });
    return particles.filter((particle) => positionCounts[particle.position.join(',')] === 1);
};
const getClosestParticle = (input) => {
    const particles = input.trim().split('\n').map(createParticleFromString);
    let closestParticles = filterParticles(particles, 'acceleration');
    closestParticles = filterParticles(closestParticles, 'velocity');
    closestParticles = filterParticles(closestParticles, 'position');
    return closestParticles[0].id;
};
exports.getClosestParticle = getClosestParticle;
const removeCollisions = (input) => {
    let particles = input.trim().split('\n').map(createParticleFromString);
    for (let i = 0; i < 500; i += 1) {
        particles = filterCollisions(particles.map(updateParticle));
    }
    return particles.length;
};
exports.removeCollisions = removeCollisions;
//# sourceMappingURL=particle.js.map