const fs = require('fs');

const flattenArray = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flattenArray(b) : b), []);

const uniqueArray = arrArg =>
  arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

const getConnections = (programs, programId, connections = []) => {
  if (connections.includes(programId)) {
    return programs[programId];
  }
  connections.push(programId);
  return uniqueArray(flattenArray(programs[programId].map((id) => getConnections(programs, id, connections))));
};

const getProgramsAndConnections = (input) => {
  let programs = {};
  input.split("\n").forEach((line) => {
    const [ programId, connections ] = line.split('<->');
    programs[programId.trim()] = connections.trim().split(', ');
  });
  return programs;
};

const getCommunicationGroups = (programs) => {
  let groups = {};
  let seenProgramIds = [];
  Object.keys(programs).forEach((programId) => {
    if (seenProgramIds.includes(programId)) return;
    const connections = getConnections(programs, programId);
    seenProgramIds = [
      ...seenProgramIds,
      ...connections,
    ];
    groups[programId] = connections;
  });
  return groups;
};

const getCommunicationGroup = (filename, programId) => {
  const input = fs.readFileSync(filename).toString().trim();
  const programs = getProgramsAndConnections(input);
  return getConnections(programs, programId);
};

const countCommunicationGroups = (filename) => {
  const input = fs.readFileSync(filename).toString().trim();
  const programs = getProgramsAndConnections(input);
  return Object.keys(getCommunicationGroups(programs)).length;
};

module.exports = {
  countCommunicationGroups,
  getCommunicationGroup,
};
