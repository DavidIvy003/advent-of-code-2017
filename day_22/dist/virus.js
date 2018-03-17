"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virus_types_1 = require("./virus.types");
const UP = virus_types_1.directionType.Up;
const DOWN = virus_types_1.directionType.Down;
const LEFT = virus_types_1.directionType.Left;
const RIGHT = virus_types_1.directionType.Right;
const CLEAN = virus_types_1.healthType.CLEAN;
const WEAKENED = virus_types_1.healthType.WEAKENED;
const INFECTED = virus_types_1.healthType.INFECTED;
const FLAGGED = virus_types_1.healthType.FLAGGED;
const TURN_OPTIONS = {
    INFECTED: {
        UP: RIGHT,
        RIGHT: DOWN,
        DOWN: LEFT,
        LEFT: UP,
    },
    WEAKENED: {
        UP,
        LEFT,
        DOWN,
        RIGHT,
    },
    CLEAN: {
        UP: LEFT,
        LEFT: DOWN,
        DOWN: RIGHT,
        RIGHT: UP,
    },
    FLAGGED: {
        UP: DOWN,
        LEFT: RIGHT,
        DOWN: UP,
        RIGHT: LEFT,
    },
};
const NEXT_HEALTH = {
    CLEAN: INFECTED,
    INFECTED: CLEAN,
};
const EVOLVES_NEXT_HEALTH = {
    CLEAN: WEAKENED,
    WEAKENED: INFECTED,
    INFECTED: FLAGGED,
    FLAGGED: CLEAN,
};
const MOVEMENTS = {
    UP: { deltax: 0, deltay: 1 },
    DOWN: { deltax: 0, deltay: -1 },
    LEFT: { deltax: -1, deltay: 0 },
    RIGHT: { deltax: 1, deltay: 0 },
};
const getNode = (nodes, nodex, nodey) => (nodes[`${nodex},${nodey}`] || { health: CLEAN });
const createNode = (nodes, nodex, nodey, health) => health === CLEAN ? Object.assign({}, nodes) : (Object.assign({}, nodes, { [`${nodex},${nodey}`]: { health } }));
const getNodeHealth = (nodes, nodex, nodey) => getNode(nodes, nodex, nodey).health;
const getNextNodeHealth = (currentHealth, evolves) => (evolves ? EVOLVES_NEXT_HEALTH : NEXT_HEALTH)[currentHealth];
const getNextDirection = (currentDirection, health) => TURN_OPTIONS[health][currentDirection];
const getNextNode = (direction, { x, y }) => ({
    x: x + MOVEMENTS[direction].deltax,
    y: y + MOVEMENTS[direction].deltay,
});
const getNextNodes = (nodes, health, current) => {
    if (health === CLEAN) {
        delete nodes[`${current.x},${current.y}`];
    }
    else {
        nodes[`${current.x},${current.y}`] = { health };
    }
    return nodes;
};
const getInitalState = (input) => {
    const grid = input.split('\n').map((row) => row.split(''));
    const midY = Math.trunc(grid.length / 2);
    const midX = Math.trunc(grid[0].length / 2);
    let nodes = {};
    grid.reverse().forEach((row, y) => {
        row.forEach((node, x) => {
            nodes = createNode(nodes, x - midX, y - midY, node === '#' ? INFECTED : CLEAN);
        });
    });
    return {
        nodes,
        current: {
            x: 0,
            y: 0,
        },
        direction: UP,
        stats: {
            infections: 0,
        },
    };
};
const getNextState = (evolves) => (state, i) => {
    const nodeHealth = getNodeHealth(state.nodes, state.current.x, state.current.y);
    const nextNodeHealth = getNextNodeHealth(nodeHealth, evolves);
    const nextDirection = getNextDirection(state.direction, nodeHealth);
    const nextNode = getNextNode(nextDirection, state.current);
    const nextNodes = getNextNodes(state.nodes, nextNodeHealth, state.current);
    return {
        nodes: nextNodes,
        direction: nextDirection,
        current: nextNode,
        stats: {
            infections: nextNodeHealth === INFECTED ? state.stats.infections + 1 : state.stats.infections,
        },
    };
};
const getVirusStateAfterIterations = (input, interations = 10000, evolves = false) => [...Array(interations).keys()].reduce(getNextState(evolves), getInitalState(input));
exports.getVirusStateAfterIterations = getVirusStateAfterIterations;
//# sourceMappingURL=virus.js.map