type BlueprintType = [number, string, string];

interface BlueprintsType {
  [key: string]: {
    [key: string]: BlueprintType;
  };
}

interface TapeType {
  [key: string]: number;
}

interface StateType {
  activeState: string;
  position: number;
  blueprints: BlueprintsType;
  tape: TapeType;
}

const getInitialState = (blueprints): StateType => ({
  blueprints,
  activeState: 'A',
  position: 0,
  tape: {},
});

const getPositionValue = ({ tape, position }: StateType) =>
  tape[`${position}`] || 0;

const getBlueprint = (state: StateType): BlueprintType =>
  state.blueprints[state.activeState][getPositionValue(state)];

const getNextActiveState = (state: StateType): string =>
  getBlueprint(state)[2];

const getNextPosition = (state: StateType): number =>
  state.position + (getBlueprint(state)[1] === 'left' ? -1 : 1);

const getNextTape = (state: StateType): TapeType => {
  state.tape[state.position] = getBlueprint(state)[0];
  return state.tape;
};

const processStep = (state: StateType): StateType => ({
  ...state,
  activeState: getNextActiveState(state),
  position: getNextPosition(state),
  tape: getNextTape(state),
});

const getLastState = (blueprints: BlueprintsType, steps: number): StateType =>
  [...Array(steps).keys()].reduce(
    (state: StateType, step: number): StateType => processStep(state),
    getInitialState(blueprints));

const getChecksum = ({ tape }: StateType): number =>
  Object.keys(tape).filter((val: string): boolean => tape[val] === 1).length;

export {
  getLastState,
  getChecksum,
};
