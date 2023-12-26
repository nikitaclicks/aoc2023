interface Beam {
  x: number;
  y: number;
  direction: Direction;
}

interface Cell {
  value: string;
  beams: Set<Direction>;
}

enum Direction {
  Up = 'up',
  Right = 'right',
  Down = 'down',
  Left = 'left',
}

export function p1(input: string) {
  const rows = input.split("\n");

  return countBeams(rows, { x: 0, y: 0, direction: Direction.Right });
}

function countBeams(rows: string[], startBeam: Beam) {
  const cells: Cell[][] = rows.map((r) => 
    r.split("").map((c) => ({ value: c, beams: new Set<Direction>() })));

  let beams: Beam[] = [startBeam];
  while (true) {
    beams = hit(cells, beams);

    if (!beams.length) {
      break;
    }
  }

  let count = 0;

  for (let y = 0; y < cells.length; y++) {
    const row = cells[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x].beams.size) {
        count++;
      }
    }
  }

  return count;
}

function hit(cells: Cell[][], beams: Beam[]) {
  const newBeams: Beam[] = [];

  for (const beam of beams) {
    const cell = cells[beam.y][beam.x];

    if (cell.beams.has(beam.direction)) {
      continue;
    }

    cell.beams.add(beam.direction);

    const next = getNextBeams(cells, beam);
    newBeams.push(...next);
  }

  return newBeams;
}

function getNextBeams(cells: Cell[][], beam: Beam) {
  const cell = cells[beam.y][beam.x];

  const directions = getNewDirections(beam.direction, cell);

  const nextBeams: Beam[] = [];

  for (const direction of directions) {
    const nextBeam = projectBeam(cells, beam, direction);
    if (nextBeam) {
      nextBeams.push(nextBeam);
    }
  }

  return nextBeams;
}

function projectBeam(cells: Cell[][], beam: Beam, direction: Direction): Beam | null {
  switch (direction) {
    case Direction.Up:
      if (beam.y > 0) {
        return {
          x: beam.x,
          y: beam.y - 1,
          direction,
        };
      }
      break;
    case Direction.Right:
      if (beam.x < cells[0].length - 1) {
        return {
          x: beam.x + 1,
          y: beam.y,
          direction,
        };
      }
      break;
    case Direction.Down:
      if (beam.y < cells.length - 1) {
        return {
          x: beam.x,
          y: beam.y + 1,
          direction,
        };
      }
      break;
    case Direction.Left:
      if (beam.x > 0) {
        return {
          x: beam.x - 1,
          y: beam.y,
          direction,
        };
      }
      break;
  }

  return null;
}

function getNewDirections(direction: Direction, cell: Cell): Direction[] {
  if (cell.value === ".") {
    return [direction];
  }

  switch (direction) {
    case Direction.Up:
      if (cell.value === "/") {
        return [Direction.Right];
      } else if (cell.value === "\\") {
        return [Direction.Left];
      } else if (cell.value === "-") {
        return [Direction.Left, Direction.Right];
      } else if (cell.value === "|") {
        return [Direction.Up];
      }
    case Direction.Right:
      if (cell.value === "/") {
        return [Direction.Up];
      } else if (cell.value === "\\") {
        return [Direction.Down];
      } else if (cell.value === "-") {
        return [Direction.Right];
      } else if (cell.value === "|") {
        return [Direction.Up, Direction.Down];
      }
    case Direction.Down:
      if (cell.value === "/") {
        return [Direction.Left];
      } else if (cell.value === "\\") {
        return [Direction.Right];
      } else if (cell.value === "-") {
        return [Direction.Right, Direction.Left];
      } else if (cell.value === "|") {
        return [Direction.Down];
      }
    case Direction.Left:
      if (cell.value === "/") {
        return [Direction.Down];
      } else if (cell.value === "\\") {
        return [Direction.Up];
      } else if (cell.value === "-") {
        return [Direction.Left];
      } else if (cell.value === "|") {
        return [Direction.Down, Direction.Up];
      }
    default:
      throw new Error("Invalid direction");
  }

  throw new Error("Invalid cell value");
}

export function p2(input) {
  const rows = input.split("\n");

  const y = rows.length, x = rows[0].length;
  const possibleStartBeams = [
    ...Array(y).fill(0).map((_, i) => ({ x: 0, y: i, direction: Direction.Right })),
    ...Array(y).fill(0).map((_, i) => ({ x: x - 1, y: i, direction: Direction.Left })),
    ...Array(x).fill(0).map((_, i) => ({ x: i, y: 0, direction: Direction.Down })),
    ...Array(x).fill(0).map((_, i) => ({ x: i, y: y - 1, direction: Direction.Up })),
  ];

  let max = 0;
  for (const beam of possibleStartBeams) {
    const count = countBeams(rows, beam);
    if (count > max) {
      max = count;
    }
  }
  
  return max;
}

