interface ruleType {
  [key: string]: string;
}

type gridType = string[];

const forEachIteration = (length, iteration) =>
  [...Array(length / iteration).keys()].map((n: number): number => n * iteration);

const getGridPortion = (grid: gridType, size: number, i: number, j: number): gridType => 
  [...Array(size).keys()].map((x: number): string =>
    [...Array(size).keys()].map((y: number): string =>
      grid[i + x][j + y]).join(''));

const getSplitGridBySize = (grid: gridType, size: number): gridType[][] => 
  forEachIteration(grid.length, size).map((i: number): gridType[] => 
    forEachIteration(grid[0].length, size).map((j: number): gridType => 
      getGridPortion(grid, size, i, j)));

const getSplitGrid = (grid: gridType): gridType[][] => 
  getSplitGridBySize(grid, grid.length % 2 === 0 ? 2 : 3);

const getMergedGrid = (grid: gridType[][]): gridType => {
  const newGrid = [];
  grid.forEach((row: gridType[], i: number) => {
    for (let j = 0; j < row[0].length; j += 1) {
      newGrid.push(row.map((col: string[]): string => col[j]).join(''));
    }
  });
  return newGrid;
};

const rotateGrid = (grid: gridType, rotations: number): gridType =>
  (rotations === 0) ? grid : rotateGrid(
    grid.map((_, i) => 
      grid.slice().reverse().map(row => row[i]).join('')), 
    rotations - 1);

const flipGridHorizontal = (grid: gridType): gridType =>
  grid.map((row: string): string => row.split('').reverse().join(''));

const flipGridVertical = (grid: gridType): gridType =>
  [...grid].reverse();

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

const updateGridFromRules = (rules: ruleType) =>
  (grid: gridType): gridType => 
    getMergedGrid(
      getSplitGrid(grid).map((row: gridType[]): gridType[] => 
        row.map((smallGrid: gridType): gridType =>
          replateGridFromRules(smallGrid, rules))),
    );

const getRules = (input: string): ruleType => 
  input.trim().split('\n').reduce(
    (rules: ruleType, line: string) => {
      const [match, output] = line.split(' => ');
      rules[match] = output;
      return rules;
    },
    {});

const getFractalArtOuput = 
(input: string, iterations: number = 5, grid: gridType = ['.#.', '..#', '###']): string =>
  [...Array(iterations).keys()].reduce(
    updateGridFromRules(getRules(input)), 
    grid).join('\n');

const countOnPixels = (grid: string): number =>
  (grid.match(/#/g) || []).length;

export { 
  getFractalArtOuput,
  countOnPixels,
};
