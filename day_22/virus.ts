type nodesType = nodeType[];
type directionType = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface positionType {
  x: number;
  y: number;
};

interface nodeType {
  position: positionType;
}

interface stateType {
  nodes: nodesType;
  current: positionType;
  direction: directionType;
  stats: {
    infections: number;
    cleans: number;
  }
}

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

const isNodeInfected = (nodes: nodesType, nodex: number, nodey: number): boolean =>
  !!nodes.find(({ position: { x, y } }) => nodex === x && nodey === y);

const getNextDirection = (currentDirection: directionType, infected: boolean): directionType =>
  TURN_OPTIONS[infected ? 'infected' : 'clean'][currentDirection];

const getNextNode = (direction: directionType, { x, y }: positionType): positionType => {
  switch(direction) {
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

const getNextNodes = (nodes: nodesType, infect: boolean, current: positionType): nodesType =>
  infect ? 
    [...nodes, { position: current }] :
    nodes.filter(({ position: { x, y } }) => !(x === current.x && y === current.y));

const getInitalState = (input: string): stateType => {
  const grid = input.split('\n').map((row: string) => row.split(''));
  const midY = Math.trunc(grid.length / 2);
  const midX = Math.trunc(grid[0].length / 2);
  const nodes = [];
  grid.reverse().forEach((row: string[], y: number) => {
    row.forEach((node: string, x: number) => {
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

const getNextState = (state: stateType): stateType => {
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

const getVirusStateAfterIterations = (input: string, interations: number = 10000) =>
  [...Array(interations).keys()].reduce(getNextState, getInitalState(input));

export { 
  getVirusStateAfterIterations,
};
