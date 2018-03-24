type componentType = number[];
type bridgeType = componentType[];

const getComponents = (input: string): componentType[] =>
  input.split('\n').map((bridge: string): componentType =>
    bridge.split('/').map((pin: string): number => +pin));

const getComponentsWithPinCount =
  (components: componentType[], pinCount: number): componentType[] =>
  components.filter((component: componentType): boolean =>
    component[0] === pinCount || component[1] === pinCount,
  );

const removeComponent = (components: componentType[], component: componentType) => {
  const index = components.findIndex(c => c[0] === component[0] && c[1] === component[1]);
  return [
    ...components.slice(0, index),
    ...components.slice(index + 1),
  ];
};

const getNextComponents = (allComponents: componentType[], pinCount: number): bridgeType[] =>
  getComponentsWithPinCount(allComponents, pinCount).reduce(
    (bridgeOptions: bridgeType[], component: componentType): bridgeType[] => {
      const nextPin = component[0] === pinCount ? component[1] : component[0];
      const next = getNextComponents(removeComponent(allComponents, component), nextPin);
      if (next.length === 0)
        return [...bridgeOptions, [component]];
      return [...bridgeOptions, ...next.map((c: componentType[]) => [component, ...c])];
    },
    []);

const getStrength = (bridge: bridgeType): number =>
  bridge.reduce((total, component) => total + component[0] + component[1], 0);

const getPossibleBridges = (input: string): bridgeType[] =>
  getNextComponents(getComponents(input.trim()), 0);

const getStrongestBridge = (bridges: bridgeType[]): bridgeType =>
  bridges.sort((bridge1, bridge2) => getStrength(bridge2) - getStrength(bridge1))[0];

export {
  getPossibleBridges,
  getStrength,
  getStrongestBridge,
};
