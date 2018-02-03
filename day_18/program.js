class Program {
  constructor(instructions, programId) {
    this.instructions = instructions;
    this.currentInstruction = 0;
    this.registers = {};
    this.registers['p'] = programId;
    this.receiveCount = 0;
  }

  value(registers, input) {
    return isNaN(input) ? registers[input] : +input;
  }

  processSend(registers, left, right) {
    this.sendValue = this.value(registers, left);
    this.running = false;
    return registers;
  }

  processSet(registers, left, right) {
    registers[left] = this.value(registers, right);
    return registers;
  }

  processAdd(registers, left, right) {
    registers[left] += this.value(registers, right);
    return registers;
  }

  processMultiple(registers, left, right) {
    registers[left] *= this.value(registers, right);
    return registers;
  }

  processMod(registers, left, right) {
    registers[left] %= this.value(registers, right);
    return registers;
  }

  processReceive(registers, left, right) {
    this.receiveRegister = left;
    this.running = false;
    return registers;
  }

  processJumps(registers, left, right) {
    if(this.value(registers, left) > 0) {
      this.currentInstruction += this.value(registers, right) - 1;
    }
    return registers;
  }

  processInstruction(registers, instruction) {
    const action = instruction.slice(0, 3);
    const [left, right] = instruction.slice(3).trim().split(' ');
    switch(action) {
      case 'snd':
        return this.processSend(registers, left, right);
      case 'set':
        return this.processSet(registers, left, right);
      case 'add':
        return this.processAdd(registers, left, right);
      case 'mul':
        return this.processMultiple(registers, left, right);
      case 'mod':
        return this.processMod(registers, left, right);
      case 'rcv':
        return this.processReceive(registers, left, right);
      case 'jgz':
        return this.processJumps(registers, left, right);
      default:
        throw(`Unknown action: ${action}`);
    }
  }

  processInstructions() {
    this.running = true;
    this.sendValue = undefined;
    this.receiveRegister = undefined;
    while(this.running) {
      this.registers = this.processInstruction(this.registers, this.instructions[this.currentInstruction]);
      this.currentInstruction += 1;
    }
    return this.registers;
  }

  receiveValue(value) {
    this.registers[this.receiveRegister] = value;
    this.receiveCount++;
  }
}

module.exports = {
  Program,
};
