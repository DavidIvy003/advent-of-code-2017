let programCache = {};

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

const processInstructions = (instructions, programs, i, times) => {
  if (programCache[programs.join('')]) {
    const next = programCache[programs.join('')];
    const iOverride = i + (i - next.loop);
    if (iOverride > times) return [next.output, i];
    return [programs, iOverride - 1];
  };
  let processedPrograms = [...programs];
  instructions.forEach(instruction => {
    processedPrograms = processInstruction(instruction, processedPrograms);
  });
  programCache[programs.join('')] = {
    output: processedPrograms,
    loop: i,
  };
  return [processedPrograms, i];
};

const dancingPrograms = (instructionsString, times = 1, programsString = 'abcdefghijklmnop') => {
  const instructions = instructionsString.split(',');
  let programs = programsString.split('');
  programCache = {};
  for (let i = 0; i < times; i++) {
    [programs, i] = processInstructions(instructions, programs, i, times);
  }
  return programs.join('');
};

module.exports = {
  dancingPrograms,
  processInstruction,
};
