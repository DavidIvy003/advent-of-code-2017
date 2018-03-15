"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const TURN_OPTIONS = {
    infected: {
        UP: RIGHT,
        RIGHT: DOWN,
        DOWN: LEFT,
        LEFT: UP,
    },
    clean: {
        UP: LEFT,
        LEFT: DOWN,
        DOWN: RIGHT,
        RIGHT: UP,
    },
};
const isNodeInfected = (nodes, nodex, nodey) => !!nodes.find(({ position: { x, y } }) => nodex === x && nodey === y);
const getNextDirection = (currentDirection, infected) => TURN_OPTIONS[infected ? 'infected' : 'clean'][currentDirection];
const getNextNode = (direction, { x, y }) => {
    switch (direction) {
        case UP:
            return {
                x,
                y: y + 1,
            };
        case DOWN:
            return {
                x,
                y: y - 1,
            };
        case LEFT:
            return {
                x: x - 1,
                y,
            };
        case RIGHT:
            return {
                x: x + 1,
                y,
            };
    }
};
const getNextNodes = (nodes, infect, current) => infect ?
    [...nodes, { position: current }] :
    nodes.filter(({ position: { x, y } }) => !(x === current.x && y === current.y));
const getInitalState = (input) => {
    const grid = input.split('\n').map((row) => row.split(''));
    const midY = Math.trunc(grid.length / 2);
    const midX = Math.trunc(grid[0].length / 2);
    const nodes = [];
    grid.reverse().forEach((row, y) => {
        row.forEach((node, x) => {
            if (node === '#')
                nodes.push({
                    position: {
                        x: x - midX,
                        y: y - midY,
                    },
                });
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
            cleans: 0,
        }
    };
};
const getNextState = (state) => {
    const currentInfected = isNodeInfected(state.nodes, state.current.x, state.current.y);
    const nextDirection = getNextDirection(state.direction, currentInfected);
    const nextNode = getNextNode(nextDirection, state.current);
    const nextNodes = getNextNodes(state.nodes, !currentInfected, state.current);
    return {
        nodes: nextNodes,
        direction: nextDirection,
        current: nextNode,
        stats: {
            infections: currentInfected ? state.stats.infections : state.stats.infections + 1,
            cleans: currentInfected ? state.stats.cleans + 1 : state.stats.cleans,
        }
    };
};
const getVirusStateAfterIterations = (input, interations = 10000) => [...Array(interations).keys()].reduce(getNextState, getInitalState(input));
exports.getVirusStateAfterIterations = getVirusStateAfterIterations;
//# sourceMappingURL=virus.js.map