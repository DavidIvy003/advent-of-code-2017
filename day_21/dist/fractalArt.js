"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forEachIteration = (length, iteration) => [...Array(length / iteration).keys()].map((n) => n * iteration);
const getGridPortion = (grid, size, i, j) => [...Array(size).keys()].map((x) => [...Array(size).keys()].map((y) => grid[i + x][j + y]).join(''));
const getSplitGridBySize = (grid, size) => forEachIteration(grid.length, size).map((i) => forEachIteration(grid[0].length, size).map((j) => getGridPortion(grid, size, i, j)));
const getSplitGrid = (grid) => getSplitGridBySize(grid, grid.length % 2 === 0 ? 2 : 3);
const getMergedGrid = (grid) => {
    const newGrid = [];
    grid.forEach((row, i) => {
        for (let j = 0; j < row[0].length; j += 1) {
            newGrid.push(row.map((col) => col[j]).join(''));
        }
    });
    return newGrid;
};
const rotateGrid = (grid, rotations) => (rotations === 0) ? grid : rotateGrid(grid.map((_, i) => grid.slice().reverse().map(row => row[i]).join('')), rotations - 1);
const flipGridHorizontal = (grid) => grid.map((row) => row.split('').reverse().join(''));
const flipGridVertical = (grid) => [...grid].reverse();
const replateGridFromRules = (grid, rules) => {
    for (let i = 0; i < 4; i += 1) {
        const rotatedGrid = rotateGrid(grid, i);
        const flipedHorizontalGrid = flipGridHorizontal(rotatedGrid);
        const flipedVerticalGrid = flipGridVertical(rotatedGrid);
        if (rules[rotatedGrid.join('/')])
            return rules[rotatedGrid.join('/')].split('/');
        if (rules[flipedHorizontalGrid.join('/')])
            return rules[flipedHorizontalGrid.join('/')].split('/');
        if (rules[flipedVerticalGrid.join('/')])
            return rules[flipedVerticalGrid.join('/')].split('/');
    }
    return grid;
};
const updateGridFromRules = (rules) => (grid) => getMergedGrid(getSplitGrid(grid).map((row) => row.map((smallGrid) => replateGridFromRules(smallGrid, rules))));
const getRules = (input) => input.trim().split('\n').reduce((rules, line) => {
    const [match, output] = line.split(' => ');
    rules[match] = output;
    return rules;
}, {});
const getFractalArtOuput = (input, iterations = 5, grid = ['.#.', '..#', '###']) => [...Array(iterations).keys()].reduce(updateGridFromRules(getRules(input)), grid).join('\n');
exports.getFractalArtOuput = getFractalArtOuput;
const countOnPixels = (grid) => (grid.match(/#/g) || []).length;
exports.countOnPixels = countOnPixels;
//# sourceMappingURL=fractalArt.js.map