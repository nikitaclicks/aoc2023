function p1(input) {
  const rows = input.split("\n");

  let win = 0;

  for (const row of rows) {
    const [ winning, have ] = row.split(':')[1].split('|')
      .map(x => x.trim().split(' ').filter(x => x.length).map(x => Number(x)));

    const distinctWinning = new Set(winning);

    let total = 0;

    for (const num of have) {
      if (distinctWinning.has(num)) {
        if (total === 0) {
          total = 1;
        } else {
          total *= 2;
        }
      }
    }

    win += total;
  }

  return win;
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  const wins = [];

  for (const row of rows) {
    const [ winning, have ] = row.split(':')[1].split('|')
      .map(x => x.trim().split(' ').filter(x => x.length).map(x => Number(x)));

    const distinctWinning = new Set(winning);

    let total = 0;

    for (const num of have) {
      if (distinctWinning.has(num)) {
        total++;
      }
    }

    wins.push(total);
  }

  const cards = wins.map(() => 1);

  for (let [index, value] of wins.entries()) {
    for (let i = 0; i < value; ++i) {
      cards[index + 1 + i] += cards[index];
    }
  }

  return { total: cards.reduce((a, b) => a + b, 0), cards };
}

module.exports.p2 = p2;
