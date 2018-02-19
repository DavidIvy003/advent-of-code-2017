"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DOWN = 'down';
const UP = 'up';
const LEFT = 'left';
const RIGHT = 'right';
const END = 'end';
const getGrid = (input) => input.split('\n').map(row => row.split(''));
const getStart = (grid) => grid[0].findIndex((cell) => cell === '|');
const getPoint = (grid, x, y) => grid[y] && grid[y][x];
const getNextPoint = ({ direction, point: { x, y } }) => {
    switch (direction) {
        case DOWN:
            return [x, y + 1];
        case UP:
            return [x, y - 1];
        case RIGHT:
            return [x + 1, y];
        case LEFT:
            return [x - 1, y];
    }
};
const nextDirection = (grid, { direction, point: { x, y } }) => {
    if (direction === UP || direction === DOWN) {
        return getPoint(grid, x + 1, y).trim() ? RIGHT : LEFT;
    }
    return getPoint(grid, x, y - 1).trim() ? UP : DOWN;
};
const getNextState = (grid, state) => {
    const [x, y] = getNextPoint(state);
    const nextPoint = getPoint(grid, x, y);
    if (!nextPoint || !nextPoint.trim()) {
        return Object.assign({}, state, { point: { x, y }, running: false });
    }
    if (nextPoint === '|' || nextPoint === '-') {
        return Object.assign({}, state, { point: { x, y } });
    }
    if (nextPoint.match(/[A-Z]/i)) {
        return Object.assign({}, state, { point: { x, y }, path: [...state.path, nextPoint] });
    }
    if (nextPoint === '+') {
        const nextState = Object.assign({}, state, { point: { x, y } });
        return Object.assign({}, nextState, { direction: nextDirection(grid, nextState) });
    }
    return state;
};
const getInitialState = (grid) => ({
    direction: DOWN,
    point: { x: getStart(grid), y: 0 },
    path: [],
    running: true,
});
const getPath = (input) => {
    const grid = getGrid(input);
    let state = getInitialState(grid);
    while (state.running) {
        state = getNextState(grid, state);
    }
    return state.path.join('');
};
exports.getPath = getPath;
const getStepCount = (input) => {
    const grid = getGrid(input);
    let state = getInitialState(grid);
    let counter = 0;
    while (state.running) {
        state = getNextState(grid, state);
        counter += 1;
    }
    return counter;
};
exports.getStepCount = getStepCount;
//# sourceMappingURL=tubes.js.map