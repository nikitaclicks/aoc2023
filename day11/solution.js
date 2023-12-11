function p1(input) {
  const rows = input.split("\n");

  const expanded = expand(rows);

  const stars = findStars(expanded);

  const pairs = pairStars(stars);

  const distances = pairs.map(([a, b]) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y));

  const sum = distances.reduce((a, b) => a + b, 0);
  return sum;
}

function expand(rows) {
  const { rowsWithStars, colsWithStars } = getStarlessLocations(rows);

  const expanded = [];

  for (let y = 0; y < rows.length; ++y) {
    const row = [];
    for (let x = 0; x < rows[y].length; ++x) {
      row.push(rows[y][x]);
      if (!colsWithStars.has(x)) {
        row.push(rows[y][x]);
      }
    }
    expanded.push(row);
    if (!rowsWithStars.has(y)) {
      expanded.push(row);
    }
  }

  return expanded;
}

function getStarlessLocations(rows) {
  const rowsWithStars = new Set();
  const colsWithStars = new Set();

  for (let y = 0; y < rows.length; ++y) {
    for (let x = 0; x < rows[y].length; ++x) {
      const isStar = rows[y][x] !== '.';

      if (isStar) {
        rowsWithStars.add(y);
        colsWithStars.add(x);
      }
    }
  }

  return { rowsWithStars, colsWithStars };
}

function findStars(rows) {
  const stars = [];
  let name = 1;
  for (let y = 0; y < rows.length; ++y) {
    for (let x = 0; x < rows[y].length; ++x) {
      const isStar = rows[y][x] !== '.';
      if (isStar) {
        stars.push({ x, y, name: name++ });
      }
    }
  }
  return stars;
}

function pairStars(stars) {
  const pairs = [];
  const roots = new Set();

  for (const from of stars) {
    roots.add(from);

    for (const to of stars) {
      if (from !== to && !roots.has(to)) {
        pairs.push([from, to]);
      }
    }
  }

  return pairs;
}

module.exports.p1 = p1;

function p2(input, expansion) {
  const universe = input.split("\n");

  const { rowsWithStars, colsWithStars } = getStarlessLocations(universe);

  const stars = findStars(universe);

  const pairs = pairStars(stars);

  const distances = pairs.map(([a, b]) => {
    const minX = a.x < b.x ? a.x : b.x;
    const maxX = a.x < b.x ? b.x : a.x;
    let emptyCols = 0;
    for (let i = minX + 1; i < maxX; ++i) {
      if (!colsWithStars.has(i)) {
        emptyCols++;
      }
    }

    const minY = a.y < b.y ? a.y : b.y;
    const maxY = a.y < b.y ? b.y : a.y;
    let emptyRows = 0;
    for (let i = minY + 1; i < maxY; ++i) {
      if (!rowsWithStars.has(i)) {
        emptyRows++;
      }
    }
    return maxX - minX + (emptyCols * expansion) - emptyCols
      + maxY - minY + (emptyRows * expansion) - emptyRows;
  });

  const sum = distances.reduce((a, b) => a + b, 0);
  return sum;
}

module.exports.p2 = p2;
