"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value = (registers, input) => isNaN(+input) ? registers[input] || 0 : +input;
const processSet = (state, left, right) => {
    state.registers[left] = value(state.registers, right);
    return state;
};
const processSubtract = (state, left, right) => {
    state.registers[left] -= value(state.registers, right);
    return state;
};
const processMultiple = (state, left, right) => {
    state.stats.multiplications += 1;
    state.registers[left] *= value(state.registers, right);
    return state;
};
const processJump = (state, left, right) => {
    if (value(state.registers, left) !== 0) {
        state.current += value(state.registers, right) - 1;
    }
    return state;
};
const processInstruction = (state, instruction) => {
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
const processInstructions = (input, debug = false) => {
    const instructions = input.split('\n');
    let instruction;
    let state = {
        registers: debug ? { a: 1 } : {},
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
exports.processInstructions = processInstructions;
const getMultiplicationsCount = (state) => state.stats.multiplications;
exports.getMultiplicationsCount = getMultiplicationsCount;
//# sourceMappingURL=coprocessor.js.map