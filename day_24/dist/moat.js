"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getComponents = (input) => input.split('\n').map((bridge) => bridge.split('/').map((pin) => +pin));
const getComponentsWithPinCount = (components, pinCount) => components.filter((component) => component[0] === pinCount || component[1] === pinCount);
const removeComponent = (components, component) => {
    const index = components.findIndex(c => c[0] === component[0] && c[1] === component[1]);
    return [
        ...components.slice(0, index),
        ...components.slice(index + 1),
    ];
};
const getNextComponents = (allComponents, pinCount) => getComponentsWithPinCount(allComponents, pinCount).reduce((bridgeOptions, component) => {
    const nextPin = component[0] === pinCount ? component[1] : component[0];
    const next = getNextComponents(removeComponent(allComponents, component), nextPin);
    if (next.length === 0)
        return [...bridgeOptions, [component]];
    return [...bridgeOptions, ...next.map((c) => [component, ...c])];
}, []);
const getStrength = (bridge) => bridge.reduce((total, component) => total + component[0] + component[1], 0);
exports.getStrength = getStrength;
const getPossibleBridges = (input) => getNextComponents(getComponents(input.trim()), 0);
exports.getPossibleBridges = getPossibleBridges;
const getStrongestBridge = (bridges) => bridges.sort((bridge1, bridge2) => getStrength(bridge2) - getStrength(bridge1))[0];
exports.getStrongestBridge = getStrongestBridge;
//# sourceMappingURL=moat.js.map