const streamScore = (input) => {
  let ignored = false;
  let isGarbage = false;
  let depth = 0;
  let score = 0;
  let garbageSize = 0;

  input.split('').forEach((char) => {
    if (ignored) {
      ignored = false;
    } else if (char === '!') {
      ignored = true;
    } else if (isGarbage) {
      if (char === '>')
        isGarbage = false;
      else
        garbageSize++;
    } else if (char === '<') {
      isGarbage = true;
    } else if (char === '{') {
      depth++;
      score += depth;
    } else if (char === '}') {
      depth--;
    }
  });
  return {
    score,
    garbageSize,
  };
};

module.exports = {
  streamScore,
};
