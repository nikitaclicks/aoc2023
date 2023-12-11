function p1(input, cfg) {
  const rows = input.split("\n");

  const games = [];

  for (const row of rows) {
    const [gameName, game] = row.split(":");
    const throws = game
      .split(";")
      .map((x) => x.split(",").map((c) => c.split(" ")));

    let ok = true;

    for (const thrw of throws) {
      if (!ok) {
        break;
      }

      for (const [_, num, type] of thrw) {
        if (Number(num) > cfg[type]) {
          ok = false;
          break;
        }
      }
    }

    if (ok) {
      const gameIdx = Number(gameName.split(" ")[1]);
      games.push(gameIdx);
    }
  }

  return games.reduce((a, b) => a + b, 0);
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  const games = [];

  for (const row of rows) {
    const maxs = { blue: 0, green: 0, red: 0 };

    const [gameName, game] = row.split(":");
    const throws = game
      .split(";")
      .map((x) => x.split(",").map((c) => c.split(" ")));

    for (const thrw of throws) {
      for (const [_, num, type] of thrw) {
        if (Number(num) > maxs[type]) {
          maxs[type] = Number(num);
        }
      }
    }

    // const gameIdx = Number(gameName.split(' ')[1]);
    games.push(maxs.blue * maxs.green * maxs.red);
  }

  return games.reduce((a, b) => a + b, 0);
}

module.exports.p2 = p2;
