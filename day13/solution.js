function p1(input) {
  const squares = input.split("\n\n").map((s) => s.split("\n"));

  let sum = 0;
  
  squares.forEach(square => {
    const rowReflections = [];
    for (let y = 0; y < square.length - 1; y++) {
      rowReflections.push(y);
      let stop = false;
      for (let x = 0; x < square[y].length && !stop; x++) {
        for (let l = y, r = y + 1; l >= 0 && r < square.length; --l, ++r) {
          if (square[l][x] != square[r][x]) {
            rowReflections.pop();
            stop = true;
            break;
          }
        }
      }
    }

    if (rowReflections.length) {
      sum += (rowReflections[rowReflections.length - 1] + 1) * 100;
    } else {
      const colReflections = [];
      for (let x = 0; x < square[0].length - 1; x++) {
        colReflections.push(x);
        let stop = false;
        for (let y = 0; y < square.length && !stop; y++) {
          for (let l = x, r = x + 1; l >= 0 && r < square[y].length; --l, ++r) {
            if (square[y][l] != square[y][r]) {
              colReflections.pop();
              stop = true;
              break;
            }
          }
        }
      }

      if (colReflections.length) {
        sum += colReflections[colReflections.length - 1] + 1;
      }
    }
  });

  return sum;
}

module.exports.p1 = p1;

function p2(input) {
  const squares = input.split("\n\n").map((s) => s.split("\n"));

  let sum = 0;
  
  squares.forEach(square => {
    const rowReflections = [];
    for (let y = 0; y < square.length - 1; y++) {
      rowReflections.push(y);
      let stop = false;
      let errors = 0;
      for (let x = 0; x < square[y].length && !stop; x++) {
        for (let l = y, r = y + 1; l >= 0 && r < square.length; --l, ++r) {
          if (square[l][x] != square[r][x]) {
            errors += 1;
          }

          if (errors > 1) {
            rowReflections.pop();
            stop = true;
            break;
          }
        }
      }

      if (errors === 0) {
        rowReflections.pop();
      }
    }

    if (rowReflections.length) {
      sum += (rowReflections[rowReflections.length - 1] + 1) * 100;
    } else {
      const colReflections = [];
      for (let x = 0; x < square[0].length - 1; x++) {
        colReflections.push(x);
        let stop = false;
        let errors = 0;
        for (let y = 0; y < square.length && !stop; y++) {
          for (let l = x, r = x + 1; l >= 0 && r < square[y].length; --l, ++r) {
            if (square[y][l] != square[y][r]) {
              errors += 1;
            }

            if (errors > 1) {
              colReflections.pop();
              stop = true;
              break;
            }
          }
        }

        if (errors === 0) {
          colReflections.pop();
        }
      }

      if (colReflections.length) {
        sum += colReflections[colReflections.length - 1] + 1;
      }
    }
  });

  return sum;
}

module.exports.p2 = p2;
