const shortCircuit = (input) => {
  let buffer = [0];
  let currentPosition = 0;
  for (let i = 1; i <= 2017; i++) {
    currentPosition = (currentPosition + input) % buffer.length + 1;
    buffer.splice(currentPosition, 0, i);
  }
  return buffer[buffer.indexOf(2017) + 1];
};

module.exports = {
  shortCircuit,
};
