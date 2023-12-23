function p1(input) {
  const squares = input.split("\n\n").map((s) => s.split("\n"));

  let sum = 0;
  
  squares.forEach(square => {
    const rowMirrors = [];
    for (let x = 0; x < square[0].length - 1; x++) {
      rowMirrors.push(x);
      let stop = false;
      for (let y = 0; y < square.length && !stop; y++) {
      for (let l = x, r = x + 1; l >= 0 && r < square[y].length && !stop; --l, ++r) {
        if (square[y][l] != square[y][r]) {
          rowMirrors.pop();
          stop = true;
          break;
        }
      }
     }
    }

    if (rowMirrors.length) {
      sum += rowMirrors[rowMirrors.length - 1] + 1;
    }

    const colMirrors = [];
    for (let y = 0; y < square.length - 1; y++) {
      colMirrors.push(y);
      let stop = false;
      for (let x = 0; x < square[y].length && !stop; x++) {
      for (let l = y, r = y + 1; l >= 0 && r < square.length && !stop; --l, ++r) {
        if (square[l][x] != square[r][x]) {
          colMirrors.pop();
          stop = true;
          break;
        }
      }
     }
    }

    if (colMirrors.length) {
      sum += (colMirrors[colMirrors.length - 1] + 1) * 100;
    }

    // const colMirrors = [];
    // for (let i = 0; i <= square.length; i++) {
    //   colMirrors.push(i);
    //   for (let l = i, r = i + 1; l >= 0 && r < square.length; --l, ++r) {
    //     if (square[l] != square[r]) {
    //       colMirrors.pop();
    //       break;
    //     }
    //   }

    //   if (colMirrors.length) {
    //     sum += (colMirrors[colMirrors.length - 1] + 1) * 100;
    //   }
    // }
  });

  return sum;
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  return -1;
}

module.exports.p2 = p2;
