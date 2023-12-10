function p1(input) {
  const rows = input.split("\n");

  const [times, distances] = rows
    .map(r => r.split(':')[1].trim()
      .split(' ')
      .filter(n => n.length)
      .map(n => Number(n)));

  let totalWaysToWin = 1;

  for (let i = 0; i < times.length; ++i) {
    totalWaysToWin *= waysToWin(times[i], distances[i]);
  }

  return totalWaysToWin;

  function waysToWin(time, record) {
    let wins = 0;

    for (let hold = 1; hold <= time; hold++) {
      const distance = (time - hold) * hold;
      if (distance > record) wins++;
    }

    return wins;
  }
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  const [time, record] = rows
    .map(r => Number(r.split(':')[1].trim()
    .replaceAll(' ', '')));

    let wins = 0;

    for (let hold = 1; hold <= time; hold++) {
      const distance = (time - hold) * hold;
      if (distance > record) wins++;
    }

    return wins;
}

module.exports.p2 = p2;
