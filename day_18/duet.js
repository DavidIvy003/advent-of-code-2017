const Program = require('./program').Program;

const processProgram = (program, sendStack, receiveStack) => {
  program.processInstructions();
  if(program.sendValue !== undefined) {
    sendStack.push(program.sendValue);
  } else if(receiveStack.length) {
    program.receiveValue(receiveStack.shift());
  } else {
    return true;
  }
  return false;
};

const duet = (instructions) => {
  const program1 = new Program(instructions, 0);
  const program2 = new Program(instructions, 1);
  let program1Stack = [];
  let program2Stack = [];
  let deadlock1 = deadlock2 = false;
  while(!deadlock1 && !deadlock2) {
    deadlock1 = processProgram(program1, program1Stack, program2Stack);
    deadlock2 = processProgram(program2, program2Stack, program1Stack);
  }
  return program1.receiveCount;
};

module.exports = {
  duet,
};
