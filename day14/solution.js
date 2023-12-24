function p1(input) {
  const rows = input.split("\n");

  const before = rows.map((row) => row.split(''));

  const rolled = rollNorth(before);

  const sum = sumNorth(rolled);

  return sum;
}

function rollNorth(before) {
  const rolled = before.map((row) => [...row]);

  for (let x = 0; x < rolled[0].length; x++) {
    for (let yt = 0; yt < rolled.length; yt++) {
      const target = rolled[yt][x];
      if (target === 'O' || target === '#') {
        continue;
      }

      for (let ys = yt + 1; ys < rolled.length; ys++) {
        const source = rolled[ys][x];
        if (source === '#') {
          break;
        }

        if (source === '.') {
          continue;
        }

        rolled[yt][x] = source;
        rolled[ys][x] = '.';
        break;
      }
    }
  }

  return rolled;
}

function sumNorth(rows) {
  let sum = 0;

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === 'O') {
        sum += rows.length - y;
      }
    }
  }

  return sum;
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  let before = rows.map((row) => row.split(''));
  const hist = [];
  let loop, cycle = 0;
  while (true) {
    let rolled = rollNorth(before);
    rolled = rollWest(rolled);
    rolled = rollSouth(rolled);
    rolled = rollEast(rolled);

    const [found, indexes] = has(rolled, hist, 2);
    if (found) {
      loop = indexes;
      break;
    }

    before = rolled;
    hist.push(rolled);
    cycle++;
  }

  const step = loop[1] - loop[0];

  const targetI = loop[0] + ((1000000000 - loop[0] - 1) % step);

  const rolled = hist[targetI];

  const sum = sumNorth(rolled);

  return sum;
}

function rollWest(before) {
  const rolled = before.map((row) => [...row]);

  for (let y = 0; y < rolled.length; y++) {
    for (let xt = 0; xt < rolled[y].length; xt++) {
      const target = rolled[y][xt];
      if (target === 'O' || target === '#') {
        continue;
      }

      for (let xs = xt + 1; xs < rolled[y].length; xs++) {
        const source = rolled[y][xs];
        if (source === '#') {
          break;
        }

        if (source === '.') {
          continue;
        }

        rolled[y][xt] = source;
        rolled[y][xs] = '.';
        break;
      }
    }
  }

  return rolled;
}

function rollSouth(before) {
  const rolled = before.map((row) => [...row]);

  for (let x = 0; x < rolled[0].length; x++) {
    for (let yt = rolled.length - 1; yt >= 0; yt--) {
      const target = rolled[yt][x];
      if (target === 'O' || target === '#') {
        continue;
      }

      for (let ys = yt - 1; ys >= 0; ys--) {
        const source = rolled[ys][x];
        if (source === '#') {
          break;
        }

        if (source === '.') {
          continue;
        }

        rolled[yt][x] = source;
        rolled[ys][x] = '.';
        break;
      }
    }
  }

  return rolled;
}

function rollEast(before) {
  const rolled = before.map((row) => [...row]);

  for (let y = 0; y < rolled.length; y++) {
    for (let xt = rolled[y].length - 1; xt >= 0; xt--) {
      const target = rolled[y][xt];
      if (target === 'O' || target === '#') {
        continue;
      }

      for (let xs = xt - 1; xs >= 0; xs--) {
        const source = rolled[y][xs];
        if (source === '#') {
          break;
        }

        if (source === '.') {
          continue;
        }

        rolled[y][xt] = source;
        rolled[y][xs] = '.';
        break;
      }
    }
  }

  return rolled;
}

function has(rows, hist, targetCount) {
  let count = 0;
  let indexes = [];

  for (let i = 0; i < hist.length; i++) {
    if (equal(rows, hist[i])) {
      count++;
      indexes.push(i);

      if (count === targetCount) {
        return [true, indexes];
      }
    }
  }

  return [false, indexes];
}

function equal(rows1, rows2) {
  for (let y = 0; y < rows1.length; y++) {
    for (let x = 0; x < rows1[y].length; x++) {
      if (rows1[y][x] !== rows2[y][x]) {
        return false;
      }
    }
  }

  return true;
}

module.exports.p2 = p2;
