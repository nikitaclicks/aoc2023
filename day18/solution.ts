interface Instruction {
  direction: Direction;
  value: number;
}

interface Point {
  x: number;
  y: number;
}

enum Direction {
  Up = "U",
  Right = "R",
  Down = "D",
  Left = "L",
}

enum DirectionV2 {
  Up = "3",
  Right = "0",
  Down = "1",
  Left = "2",
}

export function p1(input: string): number {
  const rows = input.split("\n");

  const instructions = rows
    .map((row) => row.split(" "))
    .map<Instruction>((row) => ({
      direction: row[0] as Direction,
      value: Number(row[1]),
    }));

  const trench = getTrench(instructions);

  const filled = fillTrench(trench);
  
  let count = 0;

  for (let y = 0; y < filled.length; y++) {
    for (let x = 0; x < filled[y].length; x++) {
      if (filled[y][x] === "#") {
        count++;
      }
    }
  }

  return count;
}

export function p2(input: string): number {
  const rows = input.split("\n");

  const instructions = rows
    .map((row) => row.split(" "))
    .map<Instruction>((row) => {      
      return {
        direction: map(row[2][7] as DirectionV2),
        value: parseInt(row[2].substring(2, 7), 16),
      };
    });

  const { points, total: boundaryPoints } = getPoints(instructions);

  const area = getArea(points);

  const interiorPoints = getInteriorPoints(area, boundaryPoints);

  const sum = interiorPoints + boundaryPoints;

  return sum;
}

function getInteriorPoints(area: number, boundaryPoints: number) {
  // https://en.wikipedia.org/wiki/Pick%27s_theorem

  return (area - (boundaryPoints / 2) + 1);
}

function getArea(points: Point[]): number {
  // https://en.wikipedia.org/wiki/Shoelace_formula

  let area = shoelace(points[points.length - 1], points[0]);

  for (let i = 0; i < points.length - 1; i++) {
    area += shoelace(points[i], points[i + 1]);
  }

  return area / 2;

  function shoelace({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point) {
    return (x1 * y2) - (x2 * y1);
  }
}

function getPoints(instructions: Instruction[]) {
  const points: Point[] = [];

  let x = 0, y = 0;

  let total = 0;

  for (const instruction of instructions) {
    const { direction, value } = instruction;

    switch (direction) {
      case Direction.Up:
        y-= value;
        break;
      case Direction.Right:
        x += value;
        break;
      case Direction.Down:
        y += value;
        break;
      case Direction.Left:
        x -= value;
        break;
    }

    total += value;

    points.push({
      x: x,
      y: y,
    });
  }

  return { points, total };
}

function getTrench(instructions: Instruction[]): string[][] {
  let x = 0, y = 0;
  let maxX = 0, maxY = 0, minX = 0, minY = 0;
  for (const instruction of instructions) {
    const { direction, value } = instruction;

    switch (direction) {
      case Direction.Up:
        y -= value;
        break;
      case Direction.Right:
        x += value;
        break;
      case Direction.Down:
        y += value;
        break;
      case Direction.Left:
        x -= value;
        break;
    }

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  const trench = Array(maxY - minY + 1).fill(0).map<string[]>(() => Array(maxX - minX + 1).fill("."));

  x = 0, y = 0;
  for (const instruction of instructions) {
    const { direction, value } = instruction;

    for (let i = 0; i < value; i++) {
      trench[y - minY][x - minX] = "#";

      switch (direction) {
        case Direction.Up:
          y--;
          break;
        case Direction.Right:
          x++;
          break;
        case Direction.Down:
          y++;
          break;
        case Direction.Left:
          x--;
          break;
      }
    }
  }

  return trench;
}

function fillTrench(trench: string[][]): string[][] {
  const filledTrench = trench.map((row) => Array(row.length).fill("#"));

  let outOfHole: { x: number, y: number }[] = [];

  for (let y = 0; y < trench.length; y++) {
    if (trench[y][0] === ".") {
      outOfHole.push({ x: 0, y });
    }

    if (trench[y][trench[y].length - 1] === ".") {
      outOfHole.push({ x: trench[y].length - 1, y });
    }
  }

  for (let x = 0; x < trench[0].length; x++) {
    if (trench[0][x] === ".") {
      outOfHole.push({ x, y: 0 });
    }

    if (trench[trench.length - 1][x] === ".") {
      outOfHole.push({ x, y: trench.length - 1 });
    }
  }

  do {
    const next = new Map<string, { x: number, y: number }>();
    for (const toucher of outOfHole) {
      filledTrench[toucher.y][toucher.x] = ".";
      
      const emptyNeighbours = getEmptyNeighbours(trench, toucher, filledTrench);

      for (const neighbour of emptyNeighbours) {
        next.set(`${neighbour.x},${neighbour.y}`, neighbour);
      }
    }

    outOfHole = [...next.values()];
  } while (outOfHole.length);

  return filledTrench;
}

function getEmptyNeighbours(trench: string[][], toucher: { x: number, y: number }, filledTrench: string[][]) {
  const neighbours: { x: number, y: number }[] = [
    { x: toucher.x - 1, y: toucher.y },
    { x: toucher.x + 1, y: toucher.y },
    { x: toucher.x, y: toucher.y - 1 },
    { x: toucher.x, y: toucher.y + 1 },
  ];

  const toFill = neighbours.filter((neighbour) => {
    return trench[neighbour.y] && trench[neighbour.y][neighbour.x] === "." && filledTrench[neighbour.y][neighbour.x] === "#";
  });

  return toFill;
}

function map(direction: DirectionV2): Direction {
  switch (direction) {
    case DirectionV2.Up:
      return Direction.Up;
    case DirectionV2.Right:
      return Direction.Right;
    case DirectionV2.Down:
      return Direction.Down;
    case DirectionV2.Left:
      return Direction.Left;
  }
}