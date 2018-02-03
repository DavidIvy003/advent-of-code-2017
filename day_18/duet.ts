import { Program } from './program';

type stackType = number[];

const processProgram = (program, sendStack: stackType, receiveStack: stackType): boolean => {
  program.processInstructions();
  if (program.sendValue !== undefined) {
    sendStack.push(program.sendValue);
  } else if (receiveStack.length) {
    program.receiveValue(receiveStack.shift());
  } else {
    return true;
  }
  return false;
};

const duet = (instructions: string): number => {
  const program1 = new Program(instructions, 0);
  const program2 = new Program(instructions, 1);
  const program1Stack: stackType = [];
  const program2Stack: stackType = [];
  let deadlock1 = false;
  let deadlock2 = false;

  while (!deadlock1 && !deadlock2) {
    deadlock1 = processProgram(program1, program1Stack, program2Stack);
    deadlock2 = processProgram(program2, program2Stack, program1Stack);
  }
  return program1.receiveCount;
};

export { duet };
