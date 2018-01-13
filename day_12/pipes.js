const fs = require('fs');

const flattenArray = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flattenArray(b) : b), []);

var uniqueArray = (arrArg) =>
  arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

const getConnections = (programs, programId, connections = []) => {
  if (connections.includes(programId)) {
    return programs[programId];
  }
  connections.push(programId);
  return flattenArray(programs[programId].map((id) => getConnections(programs, id, connections)));
};

const getProgramsAndConnections = (input) => {
  let programs = {};
  input.split("\n").forEach((line) => {
    const [ programId, connections ] = line.split('<->');
    programs[programId.trim()] = connections.trim().split(', ');
  });
  return programs;
};

const getCommunicationGroup = (filename, programId) => {
  const input = fs.readFileSync(filename).toString().trim();
  const programs = getProgramsAndConnections(input);
  return uniqueArray(getConnections(programs, programId));
};

module.exports = {
  getCommunicationGroup,
};
