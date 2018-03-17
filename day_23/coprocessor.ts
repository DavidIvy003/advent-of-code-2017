interface registersType {
  [key: string]: number;
}

export interface stateType {
  registers: registersType;
  current: number;
  stats: {
    multiplications: number;
  };
}

const value = (registers: registersType, input: string): number =>
  isNaN(+input) ? registers[input] || 0 : +input;

const processSet = (state: stateType, left: string, right: string): stateType => {
  state.registers[left] = value(state.registers, right);
  return state;
};

const processSubtract = (state: stateType, left: string, right: string): stateType => {
  state.registers[left] -= value(state.registers, right);
  return state;
};

const processMultiple = (state: stateType, left: string, right: string): stateType => {
  state.stats.multiplications += 1;
  state.registers[left] *= value(state.registers, right);
  return state;
};

const processJump = (state: stateType, left: string, right: string): stateType => {
  if (value(state.registers, left) !== 0) {
    state.current += value(state.registers, right) - 1;
  }
  return state;
};

const processInstruction = (state: stateType, instruction: string): stateType => {
  const action = instruction.slice(0, 3);
  const [left, right] = instruction.slice(3).trim().split(' ');

  switch (action) {
    case 'set':
      return processSet(state, left, right);
    case 'sub':
      return processSubtract(state, left, right);
    case 'mul':
      return processMultiple(state, left, right);
    case 'jnz':
      return processJump(state, left, right);
    default:
      throw (`Unknown action: ${action}`);
  }
};

const processInstructions = (input: string): stateType => {
  const instructions = input.split('\n');
  let instruction;
  let state = {
    registers: {},
    current: 0,
    stats: {
      multiplications: 0,
    },
  };

  while (instruction = instructions[state.current]) {
    state = processInstruction(state, instruction);
    state.current += 1;
  }

  return state;
};

const getMultiplicationsCount = (state: stateType): number =>
  state.stats.multiplications;

export {
  getMultiplicationsCount,
  processInstructions,
};
