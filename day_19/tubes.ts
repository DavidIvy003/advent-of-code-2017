type gridType = string[][];
interface pointType {
  x: number;
  y: number;
}

interface stateType {
  point: pointType;
  direction: string;
  path: string[];
  running: boolean;
}

const DOWN = 'down';
const UP = 'up';
const LEFT = 'left';
const RIGHT = 'right';
const END = 'end';

const getStart = (grid: gridType) => grid[0].findIndex((cell: string): boolean => cell === '|');
const getPoint = (grid: gridType, x: number, y: number): string => grid[y] && grid[y][x];

const getNextPoint = ({ direction, point: { x, y } }: stateType): number[] => {  
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

const nextDirection = (grid: gridType, { direction, point: { x, y } }: stateType): string => {
  if (direction === UP || direction === DOWN) {
    return getPoint(grid, x + 1, y).trim() ? RIGHT : LEFT;
  }
  return getPoint(grid, x, y - 1).trim() ? UP : DOWN;
};

const getNextState = (grid: gridType, state: stateType): stateType => {
  const [x, y] = getNextPoint(state);
  const nextPoint = getPoint(grid, x, y);

  if (!nextPoint || !nextPoint.trim()) {
    return {
      ...state,
      point: { x, y },
      running: false,
    };
  }

  if (nextPoint === '|' || nextPoint === '-') {
    return {
      ...state,
      point: { x, y },
    };
  }
  
  if (nextPoint.match(/[A-Z]/i)) {
    return {
      ...state,
      point: { x, y },
      path: [...state.path, nextPoint],
    };
  }

  if (nextPoint === '+') {
    const nextState = {
      ...state,
      point: { x, y },
    };
    return {
      ...nextState,
      direction: nextDirection(grid, nextState),
    };
  }

  return state;
};

const getPath = (input: string): string => {
  const grid = input.split('\n').map(row => row.split(''));
  const startingPoint = getStart(grid);
  
  let state = {
    direction: DOWN, 
    point: { x: startingPoint, y: 0 }, 
    path: [],
    running: true,
  };

  while (state.running) {
    state = getNextState(grid, state);
  }
  return state.path.join('');
};

export { 
  getPath,
};
