export enum healthType {
  CLEAN = 'CLEAN',
  WEAKENED = 'WEAKENED',
  INFECTED = 'INFECTED',
  FLAGGED = 'FLAGGED',
}

export enum directionType {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export interface positionType {
  x: number;
  y: number;
}

export interface nodeType {
  health: healthType;
}

export interface nodesType {
  [key: string]: nodeType;
}

export interface stateType {
  nodes: nodesType;
  current: positionType;
  direction: directionType;
  stats: {
    infections: number;
  };
}
