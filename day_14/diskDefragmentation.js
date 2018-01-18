const KnotHash = require('../day_10/knotHash');

const {
  knotHash,
} = KnotHash;

const GRID_SIZE = 128;

const padLeft = (input, length) => ('0'.repeat(length) + input).slice(-length);
const hexToBinary = (input) => input.split('').map((char) => padLeft(parseInt(char, 16).toString(2), 4)).join('');

const getGrid = (input) =>
  [...Array(GRID_SIZE)].map((_, index) => hexToBinary(knotHash(`${input}-${index}`)));

const markGroup = (grid, rowId, colId, groupId) => {
  if (rowId < 0 || colId < 0 || rowId >= grid.length || colId >= grid.length) return;
  const cell = grid[rowId][colId];
  if (!cell.active || cell.groupId === groupId) return;
  cell.groupId = groupId;
  markGroup(grid, rowId - 1, colId, groupId);
  markGroup(grid, rowId + 1, colId, groupId);
  markGroup(grid, rowId, colId - 1, groupId);
  markGroup(grid, rowId, colId + 1, groupId);
};

const drawGrid = (grid) =>
  grid.forEach((row) => {
    console.log(row.map((cell) => cell.active ? '#' : '.').join(''));
  });

const drawGridWithGroup = (grid) =>
  grid.forEach((row) => {
    console.log(row.map((cell) => cell.groupId ? cell.groupId : '.').join(''));
  });

const countBitsUsed = (input) =>
  getGrid(input).reduce((sum, row) =>
    sum + row.match(/1/g).length
  , 0);

const countRegions = (input) => {
  let groupId = 0;
  const grid = getGrid(input).map(row => row.split('').map(cell => ({ active: cell === '1' })));
  [...Array(GRID_SIZE)].forEach((_, rowId) => {
    [...Array(GRID_SIZE)].forEach((_, colId) => {
      const cell = grid[rowId][colId];
      if (cell.active && cell.groupId === undefined) {
        markGroup(grid, rowId, colId, groupId);
        groupId++;
      }
    });
  });
  return groupId;
};

module.exports = {
  countBitsUsed,
  countRegions
};
