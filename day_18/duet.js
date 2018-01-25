const fs = require('fs');

class Duet {
  constructor(filename) {
    this.instructions = fs.readFileSync(filename).toString().split("\n");
    this.lastFrequency = 0;
    this.running = true;
    this.currentInstruction = 0;
    this.processInstructions()
  }

  value(registers, input) {
    return isNaN(input) ? registers[input] : +input;
  }

  processSound(registers, left, right) {
    this.lastFrequency = this.value(registers, left);
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

  processRecovers(registers, left, right) {
    if(this.value(registers, left)) {
      this.running = false;
    }
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
        return this.processSound(registers, left, right);
      case 'set':
        return this.processSet(registers, left, right);
      case 'add':
        return this.processAdd(registers, left, right);
      case 'mul':
        return this.processMultiple(registers, left, right);
      case 'mod':
        return this.processMod(registers, left, right);
      case 'rcv':
        return this.processRecovers(registers, left, right);
      case 'jgz':
        return this.processJumps(registers, left, right);
      default:
        throw(`Unknown action: ${action}`);
    }
  }

  processInstructions() {
    let registers = {};
    while(this.running) {
      registers = this.processInstruction(registers, this.instructions[this.currentInstruction]);
      this.currentInstruction += 1;
    }
    return registers;
  }
}

module.exports = {
  Duet,
};
