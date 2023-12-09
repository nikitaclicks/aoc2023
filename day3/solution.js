function p1(input) {
  const rows = input.split("\n");

  const symbols = Array(rows.length)
    .fill(0)
    .map(() =>
      Array(rows[0].length)
        .fill(false)
    );
  const numbers = Array(rows.length)
    .fill(0)
    .map(() =>
      Array(rows[0].length)
        .fill(undefined)
    );
  const readyNums = [];

  for (let y = 0; y < rows.length; ++y) {
    for (let x = 0; x < rows[y].length; ++x) {
      const num = Number(rows[y][x]);
      const isNum = !Number.isNaN(num);
      if (isNum) {
        let numCfg;
        if (x > 0 && numbers[y][x - 1]) {
          numCfg = numbers[y][x - 1];
        } else {
          numCfg = { num: '', withSymbol: false };
          readyNums.push(numCfg);
        }
        numCfg.num += num;
        numbers[y][x] = numCfg;

        // propagate symbol from left
        if (x > 0 && symbols[y][x - 1]) {
          numCfg.withSymbol = true;
        }

        // propagate symbols from up
        else if (y > 0) {
          const prevY = y - 1;
          for (let prevX = Math.min(x + 1, rows[y].length - 1); prevX >= Math.max(x - 1, 0); --prevX) {
            const symbolCfg = symbols[prevY][prevX];

            if (symbolCfg) {
              numCfg.withSymbol = true;
            }
          }
        }
      }
      const isSymbol = !isNum && rows[y][x] !== '.';

      if (isSymbol) {
        symbols[y][x] = true;

        // backtrack numbers
        if (x > 0) {
          const numCfg = numbers[y][x - 1];
          if (numCfg) {
            numCfg.withSymbol = true;
          }
        }

        //propagate symbol up
        if (y > 0) {
          const prevY = y - 1;
          for (let prevX = Math.min(x + 1, rows[y].length - 1); prevX >= Math.max(x - 1, 0); --prevX) {
            const numCfg = numbers[prevY][prevX];

            if (numCfg) {
              numCfg.withSymbol = true;
            }
          }
        }
      }
    }
  }

  return readyNums.filter(x => x.withSymbol).reduce((a, b) => a + Number(b.num), 0);
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  const symbols = Array(rows.length)
    .fill(0)
    .map(() =>
      Array(rows[0].length)
        .fill(undefined)
    );
  const numbers = Array(rows.length)
    .fill(0)
    .map(() =>
      Array(rows[0].length)
        .fill(undefined)
    );
  const readyGears = [];

  for (let y = 0; y < rows.length; ++y) {
    for (let x = 0; x < rows[y].length; ++x) {
      const num = Number(rows[y][x]);
      const isNum = !Number.isNaN(num);
      if (isNum) {
        let numCfg;
        if (x > 0 && numbers[y][x - 1]) {
          numCfg = numbers[y][x - 1];
        } else {
          numCfg = { num: '' };
        }
        numCfg.num += num;
        numbers[y][x] = numCfg;

        // propagate number to left
        if (x > 0 && symbols[y][x - 1]) {
          symbols[y][x - 1].nums.add(numCfg);
        }

        // propagate numbers up
        if (y > 0) {
          const prevY = y - 1;
          for (let prevX = Math.min(x + 1, rows[y].length - 1); prevX >= Math.max(x - 1, 0); --prevX) {
            const symbolCfg = symbols[prevY][prevX];

            if (symbolCfg) {
              symbolCfg.nums.add(numCfg);
            }
          }
        }
      }
      const isSymbol = rows[y][x] === '*';

      if (isSymbol) {
        symbols[y][x] = { nums: new Set() };
        readyGears.push(symbols[y][x]);

        // backtrack numbers from left
        if (x > 0) {
          const numCfg = numbers[y][x - 1];
          if (numCfg) {
            symbols[y][x].nums.add(numCfg);
          }
        }

        // propagate number from up
        if (y > 0) {
          const prevY = y - 1;
          for (let prevX = Math.min(x + 1, rows[y].length - 1); prevX >= Math.max(x - 1, 0); --prevX) {
            const numCfg = numbers[prevY][prevX];

            if (numCfg) {
              symbols[y][x].nums.add(numCfg);
            }
          }
        }
      }
    }
  }

  return readyGears.filter(x => x.nums.size === 2)
    .reduce((a, b) => a + [...b.nums].reduce((c, d) => c * Number(d.num), 1), 0);
}

module.exports.p2 = p2;
