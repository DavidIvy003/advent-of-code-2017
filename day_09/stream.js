const streamScore = (input) => {
  console.log(input)
  let ignored = false;
  let garbage = false;
  let depth = 0;
  let score = 0;

  input.split('').forEach((char) => {
    if (ignored) {
      ignored = false
    } else if (char === '!') {
      ignored = true
    } else if (garbage) {
      if (char === '>')
        garbage = false;
    } else if (char === '<') {
      garbage = true;
    } else if (char === '{') {
      depth++;
      score += depth;
    } else if (char === '}') {
      depth--;
    }
  });
  return score;
};

module.exports = {
  streamScore,
};
