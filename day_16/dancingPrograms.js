const processSpin = (instruction, programs) => {
  const moveCount = +instruction.slice(1).trim();
  const front = programs.slice(programs.length - moveCount, programs.length);
  const back = programs.slice(0, programs.length - moveCount);
  return [...front, ...back];
};

const processExchange = (instruction, programs) => {
  const [program1Index, program2Index] = instruction.slice(1).trim().split('/');
  let newPrograms = [...programs];
  newPrograms[program1Index] = programs[program2Index];
  newPrograms[program2Index] = programs[program1Index];
  return newPrograms
};

const processPartner = (instruction, programs) => {
  const [program1Name, program2Name] = instruction.slice(1).trim().split('/');
  const program1Index = programs.indexOf(program1Name);
  const program2Index = programs.indexOf(program2Name);
  let newPrograms = [...programs];
  newPrograms[program1Index] = programs[program2Index];
  newPrograms[program2Index] = programs[program1Index];
  return newPrograms
};


const processInstruction = (instruction, programs) => {
  const type = instruction[0];
  switch(type) {
    case 's':
      return processSpin(instruction, programs);
    case 'x':
      return processExchange(instruction, programs);
    case 'p':
      return processPartner(instruction, programs);
  }
};

const dancingPrograms = (instructionsString, programsString = 'abcdefghijklmnop') => {
  const instructions = instructionsString.split(',');
  let programs = programsString.split('');
  instructions.forEach(instruction => {
    programs = processInstruction(instruction, programs);
  });
  return programs.join('');
};

module.exports = {
  dancingPrograms,
  processInstruction,
};
