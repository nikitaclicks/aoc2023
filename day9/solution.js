function p1(input) {
  const rows = input.split("\n");

  const histories = rows.map(r => r.split(' ').map(n => Number(n.trim())));

  const predictions = histories.map(predict);
  const sum = predictions.reduce((a, b) => a + b, 0);

  return sum;

  function predict(history) {
    const differences = [history];

    while (true) {
      const difference = [];

      let hasNonZero = false;
      for (let i = 0; i < history.length - 1; ++i) {
        const diff = history[i + 1] - history[i];
        difference.push(diff);
        if (diff !== 0) {
          hasNonZero = true;
        }
      }

      differences.push(difference);

      if (!hasNonZero) {
        break;
      }

      history = difference;
    }

    differences[differences.length - 1].push(0);

    for (let i = differences.length - 2; i >= 0; --i) {
      const prevDifference = differences[i + 1];
      const thisDifference = differences[i];

      const diff = prevDifference[prevDifference.length - 1];

      const nextNum = thisDifference[thisDifference.length - 1] + diff;

      thisDifference.push(nextNum);
    }

    return differences[0][differences[0].length - 1];
  }
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  const histories = rows.map(r => r.split(' ').map(n => Number(n.trim())));

  const predictions = histories.map(predict);
  const sum = predictions.reduce((a, b) => a + b, 0);

  return sum;

  function predict(history) {
    const differences = [history];

    while (true) {
      const difference = [];

      let hasNonZero = false;
      for (let i = 0; i < history.length - 1; ++i) {
        const diff = history[i + 1] - history[i];
        difference.push(diff);
        if (diff !== 0) {
          hasNonZero = true;
        }
      }

      differences.push(difference);

      if (!hasNonZero) {
        break;
      }

      history = difference;
    }

    differences[differences.length - 1].unshift(0);

    for (let i = differences.length - 2; i >= 0; --i) {
      const prevDifference = differences[i + 1];
      const thisDifference = differences[i];

      const diff = prevDifference[0];

      const nextNum = thisDifference[0] - diff;

      thisDifference.unshift(nextNum);
    }

    return differences[0][0];
  }
}

module.exports.p2 = p2;
