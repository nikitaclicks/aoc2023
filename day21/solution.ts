const startCell = "S";

export function p1(input: string, steps: number): number {
  const rows = input.split("\n");
  const position = getStartPosition(rows);
  const available = rows.map((row) => row.split("").map((v) => v !== "#"));

  return countPositions(available, position, steps);
}

export function p2(input: string): number {
  const rows = input.split("\n");
  const position = getStartPosition(rows);
  const available = rows.map((row) => row.split("").map((v) => v !== "#"));

  const steps = 26501365;
  const dim = available.length;

  const x0 = steps % dim;
  const x1 = x0 + dim;
  const x2 = x1 + dim;

  const getResult = lagrangeInterpolation(available, position, [x0, x1, x2]);

  return getResult(steps);
}

function getStartPosition(rows: string[]) {
  const position: [number, number] = [0, 0];
  let found = false;
  for (let y = 0; !found && y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === startCell) {
        position[0] = x;
        position[1] = y;
        found = true;
        break;
      }
    }
  }

  return position;
}

function getNeighbourPositions(position: [number, number]): [number, number][] {
  const neighbours = [
    [position[0] - 1, position[1]],
    [position[0] + 1, position[1]],
    [position[0], position[1] - 1],
    [position[0], position[1] + 1],
  ];

  return neighbours as [number, number][];
}

function lagrangeInterpolation(available, position, [x0, x1, x2]) {
  const y0 = countPositions(available, position, x0);
  const y1 = countPositions(available, position, x1);
  const y2 = countPositions(available, position, x2);

  const l0 = (x) => (((x - x1) / (x0 - x1)) * (x - x2)) / (x0 - x2);
  const l1 = (x) => (((x - x0) / (x1 - x0)) * (x - x2)) / (x1 - x2);
  const l2 = (x) => (((x - x0) / (x2 - x0)) * (x - x1)) / (x2 - x1);

  const L = (x) => y0 * l0(x) + y1 * l1(x) + y2 * l2(x);

  return L;
}

function countPositions(available, position, steps) {
  let positions: [number, number][] = [position];

  for (let step = 0; step < steps; step++) {
    const neighbours = positions.flatMap((position) =>
      getNeighbourPositions(position)
    );

    const nextPositions = new Map<string, [number, number]>();

    for (const neighbour of neighbours) {
      let x = neighbour[0];
      while (x < 0) {
        x += available[0].length;
      }
      x = x % available[0].length;

      let y = neighbour[1];
      while (y < 0) {
        y += available.length;
      }
      y = y % available.length;

      if (available[y][x]) {
        nextPositions.set(`${neighbour[0]}_${neighbour[1]}`, neighbour);
      }
    }

    positions = [...nextPositions.values()];
  }

  return positions.length;
}
