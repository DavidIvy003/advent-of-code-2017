type registersType = {};

class Program {
  receiveCount: number;
  sendValue: number;

  private instructions: string;
  private currentInstruction: number;
  private running: boolean;
  private receiveRegister: string;
  private registers: registersType;
  
  constructor(instructions: string, programId: number) {
    this.instructions = instructions;
    this.currentInstruction = 0;
    this.registers = {};
    this.registers['p'] = programId;
    this.receiveCount = 0;
  }

  private value(registers, input): number {
    return isNaN(input) ? registers[input] : +input;
  }

  private processSend(registers, left, right): registersType {
    this.sendValue = this.value(registers, left);
    this.running = false;
    return registers;
  }

  private processSet(registers, left, right): registersType {
    registers[left] = this.value(registers, right);
    return registers;
  }

  private processAdd(registers, left, right): registersType {
    registers[left] += this.value(registers, right);
    return registers;
  }

  private processMultiple(registers, left, right): registersType {
    registers[left] *= this.value(registers, right);
    return registers;
  }

  private processMod(registers, left, right): registersType {
    registers[left] %= this.value(registers, right);
    return registers;
  }

  private processReceive(registers, left, right): registersType {
    this.receiveRegister = left;
    this.running = false;
    return registers;
  }

  private processJumps(registers, left, right): registersType {
    if (this.value(registers, left) > 0) {
      this.currentInstruction += this.value(registers, right) - 1;
    }
    return registers;
  }

  private processInstruction(registers, instruction): registersType {
    const action = instruction.slice(0, 3);
    const [left, right] = instruction.slice(3).trim().split(' ');
    switch (action) {
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

  processInstructions(): registersType {
    this.running = true;
    this.sendValue = undefined;
    this.receiveRegister = undefined;
    while (this.running) {
      const instruction = this.instructions[this.currentInstruction];
      this.registers = this.processInstruction(this.registers, instruction);
      this.currentInstruction += 1;
    }
    return this.registers;
  }

  receiveValue(value) {
    this.registers[this.receiveRegister] = value;
    this.receiveCount += 1;
  }
}

export { Program };
