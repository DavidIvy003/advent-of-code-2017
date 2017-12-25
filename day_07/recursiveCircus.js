const fs = require('fs');

const allEqual = (arr) => !!arr.reduce((a, b) => (a === b) ? a : NaN);

const getTowers = (fileUrl) => {
  const input = fs.readFileSync(fileUrl).toString();
  const programs = input.trim().split("\n");
  return programs.map((program) => {
    const name = program.match(/^(\w*)/g)[0];
    const children = (program.match(/\s\w+/g) || []).map(child => child.trim());
    const weight = +program.match(/\d+/g)[0];
    return {
      name,
      weight,
      children,
    }
  });
};

const getWeight = (graph, name) => {
  const program = graph[name];
  let weight = program.weight;
  if (program.children.length) {
    weight += program.children.map(child => getWeight(graph, child)).reduce((sum, x) => sum + x);
  }
  return weight;
};

const getStructure = (towers) => {
  const structure = {};
  towers.forEach((tower) => {
    structure[tower.name] = {
      ...(structure[tower.name] || {}),
      ...tower,
    };
    tower.children.forEach((child) => {
      structure[child] = {
        ...structure[child],
        parent: tower.name,
      }
    });
  });
  return structure;
};

const countGroupBy = (array) => {
  return array.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
};

const isBalanced = (graph, name) => {
  const program = graph[name];
  const weights = program.children.map((child) => getWeight(graph, child));
  return allEqual(weights);
};

const hasUnbalancedChildren = (graph, programId) => {
  const program = graph[programId];
  return program.children.map((child => isBalanced(graph, child))).filter(a => !a).length > 0;
};

const findUnbalancedProgram = (graph) =>
  Object.keys(graph).filter(child => graph[child].children.length).find((child) =>
      !isBalanced(graph, child) && !hasUnbalancedChildren(graph, child));

const getBottom = (graph) => Object.keys(graph).find((key) => !graph[key].parent);
const createStructure = (fileUrl) => getStructure(getTowers(fileUrl));

const weightToFixUnbalance = (graph) => {
  const program = graph[findUnbalancedProgram(graph)];
  const weights = program.children.map((child) => getWeight(graph, child));
  const groupedWeights = countGroupBy(weights);
  const unbalancedWeight = Object.keys(groupedWeights).find((key) => groupedWeights[key] === 1);
  const balancedWeight = Object.keys(groupedWeights).find((key) => groupedWeights[key] > 1);
  const index = weights.indexOf(+unbalancedWeight);
  const difference = balancedWeight - unbalancedWeight;
  const unbalancedProgramId = program.children[index];
  return graph[unbalancedProgramId].weight + difference;
};

module.exports = {
  getBottom,
  createStructure,
  weightToFixUnbalance,
};
