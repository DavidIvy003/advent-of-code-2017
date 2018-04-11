"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getInitialState = (blueprints) => ({
    blueprints,
    activeState: 'A',
    position: 0,
    tape: {},
});
const getPositionValue = ({ tape, position }) => tape[`${position}`] || 0;
const getBlueprint = (state) => state.blueprints[state.activeState][getPositionValue(state)];
const getNextActiveState = (state) => getBlueprint(state)[2];
const getNextPosition = (state) => state.position + (getBlueprint(state)[1] === 'left' ? -1 : 1);
const getNextTape = (state) => {
    state.tape[state.position] = getBlueprint(state)[0];
    return state.tape;
};
const processStep = (state) => (Object.assign({}, state, { activeState: getNextActiveState(state), position: getNextPosition(state), tape: getNextTape(state) }));
const getLastState = (blueprints, steps) => [...Array(steps).keys()].reduce((state, step) => processStep(state), getInitialState(blueprints));
exports.getLastState = getLastState;
const getChecksum = ({ tape }) => Object.keys(tape).filter((val) => tape[val] === 1).length;
exports.getChecksum = getChecksum;
//# sourceMappingURL=garbageCollector.js.map