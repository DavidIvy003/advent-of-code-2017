import { 
  healthType, 
  directionType,
  positionType,
  nodeType,
  nodesType,
  stateType,
} from './virus.types';

const UP = directionType.Up;
const DOWN = directionType.Down;
const LEFT = directionType.Left;
const RIGHT = directionType.Right;

const CLEAN = healthType.CLEAN;
const WEAKENED = healthType.WEAKENED;
const INFECTED = healthType.INFECTED;
const FLAGGED = healthType.FLAGGED;

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

const getNode = (nodes: nodesType, nodex: number, nodey: number): nodeType =>
  (nodes[`${nodex},${nodey}`] || { health: CLEAN });

const createNode = (
  nodes: nodesType, 
  nodex: number, 
  nodey: number, 
  health: healthType,
): nodesType =>
  health === CLEAN ? { ...nodes } : ({ ...nodes, [`${nodex},${nodey}`]: { health } });

const getNodeHealth = (nodes: nodesType, nodex: number, nodey: number): healthType =>
  getNode(nodes, nodex, nodey).health;

const getNextNodeHealth = (currentHealth: healthType, evolves: boolean): healthType =>
  (evolves ? EVOLVES_NEXT_HEALTH : NEXT_HEALTH)[currentHealth];

const getNextDirection = (currentDirection: directionType, health: healthType): directionType =>
  TURN_OPTIONS[health][currentDirection];

const getNextNode = (direction: directionType, { x, y }: positionType): positionType => ({
  x: x + MOVEMENTS[direction].deltax,
  y: y + MOVEMENTS[direction].deltay,
});

const getNextNodes = (nodes: nodesType, health: healthType, current: positionType): nodesType => {
  if (health === CLEAN) {
    delete nodes[`${current.x},${current.y}`];
  } else {
    nodes[`${current.x},${current.y}`] = { health };
  }
  return nodes;
};

const getInitalState = (input: string): stateType => {
  const grid = input.split('\n').map((row: string) => row.split(''));
  const midY = Math.trunc(grid.length / 2);
  const midX = Math.trunc(grid[0].length / 2);
  let nodes = {};
  grid.reverse().forEach((row: string[], y: number) => {
    row.forEach((node: string, x: number) => {
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

const getNextState = (evolves: boolean) => (state: stateType, i): stateType => {
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

const getVirusStateAfterIterations = (
  input: string, 
  interations: number = 10000, 
  evolves: boolean = false,
) =>
  [...Array(interations).keys()].reduce(getNextState(evolves), getInitalState(input));

export { 
  getVirusStateAfterIterations,
};
