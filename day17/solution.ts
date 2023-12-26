enum Direction {
  Any = "any",
  Up = "up",
  Right = "right",
  Down = "down",
  Left = "left",
  Stop = "stop",
}

interface Block {
  x: number;
  y: number;
}

interface Step extends Block {
  distance: number;
  direction: Direction;
}

export function p1(input: string) {
  return getMinDistance(input, 1, 3);
}

export function p2(input: string) {
  return getMinDistance(input, 4, 10);
}

function getMinDistance(input: string, minStepDistance: number, maxStepDistance: number) {
  const rows = input.split("\n");

  const blocks = rows.map((row) => row.split("").map((char) => Number(char)));

  const maxDistance = Infinity;
  const distances: Record<Direction, number>[][] = blocks.map((row) =>
    row.map((_) => {
      return {
        [Direction.Up]: maxDistance,
        [Direction.Right]: maxDistance,
        [Direction.Down]: maxDistance,
        [Direction.Left]: maxDistance,
        [Direction.Stop]: maxDistance,
        [Direction.Any]: maxDistance,
      };
    })
  );

  const start: Step = {
    x: 0,
    y: 0,
    distance: 0,
    direction: Direction.Any,
  };
  
  const end: Block = {
    x: blocks[0].length - 1,
    y: blocks.length - 1,
  };

  traverseBlocks(blocks, [start], end, distances, minStepDistance, maxStepDistance);

  const min = Math.min(...(Object.values(distances[end.y][end.x]) as number[]));

  return min;
}

function traverseBlocks(
  blocks: number[][],
  startSteps: Step[],
  endBlock: Block,
  distances: Record<Direction, number>[][],
  minStepDistance: number,
  maxStepDistance: number
) {
  const nextSteps = startSteps.flatMap(start => getNextSteps(blocks, start, minStepDistance, maxStepDistance, distances));

  const unfinishedSteps: Step[] = [];
  for (const next of nextSteps) {
    const existingDistance = distances[next.y][next.x][next.direction];
    if (existingDistance <= next.distance) {
      continue;
    } else {
      distances[next.y][next.x][next.direction] = next.distance;
    }

    if (!equal(next, endBlock)) {
      unfinishedSteps.push(next);
    }
  }

  const nextStartSteps: Step[] = [];

  for (const unfinishedStep of unfinishedSteps) {
    if (unfinishedStep.distance === distances[unfinishedStep.y][unfinishedStep.x][unfinishedStep.direction]) {
      nextStartSteps.push(unfinishedStep);
    }
  }

  if (nextStartSteps.length) {
    traverseBlocks(blocks, nextStartSteps, endBlock, distances, minStepDistance, maxStepDistance);
  }
}

function equal(a: Block, b: Block) {
  return a.x === b.x && a.y === b.y;
}

function getNextSteps(
  blocks: number[][],
  step: Step,
  minStepDistance: number,
  maxStepDistance: number,
  distances: Record<Direction, number>[][]
): Step[] {
  const next: Step[] = [];

  const possibleDirections = getPossibleDirections(step.direction);

  for (const direction of possibleDirections) {
    const nextSteps = getNextStepsAtDirection(
      blocks,
      step,
      direction,
      minStepDistance,
      maxStepDistance,
    );

    for (const nextStep of nextSteps) {
      const fartherThenExisting = distances[nextStep.y][nextStep.x][nextStep.direction] <= nextStep.distance;
      if (fartherThenExisting) {
        continue;
      }
  
      nextStep.distance += step.distance;

      next.push(nextStep);
    }
  }

  return next;
}

function getNextStepsAtDirection(
  blocks: number[][],
  currentBlock: Block,
  direction: Direction,
  minStepDistance: number,
  maxStepDistance: number,
): Step[] {
  const { x, y } = currentBlock;

  const nextSteps: Step[] = [];

  switch (direction) {
    case Direction.Up:
      for (let i = minStepDistance; i <= maxStepDistance; i++) {
        if (y > i - 1) {
          nextSteps.push({
            x,
            y: y - i,
            distance: Array(i)
              .fill(0)
              .map((_, idx) => blocks[y - i + idx][x])
              .reduce((a, b) => a + b, 0),
            direction,
          });
        }
      }
      break;
    case Direction.Right:
      for (let i = minStepDistance; i <= maxStepDistance; i++) {
        if (x < blocks[y].length - i) {
          nextSteps.push({
            x: x + i,
            y,
            distance: Array(i)
              .fill(0)
              .map((_, idx) => blocks[y][x + i - idx])
              .reduce((a, b) => a + b, 0),
            direction,
          });
        }
      }
      break;
    case Direction.Down:
      for (let i = minStepDistance; i <= maxStepDistance; i++) {
        if (y < blocks.length - i) {
          nextSteps.push({
            x,
            y: y + i,
            distance: Array(i)
              .fill(0)
              .map((_, idx) => blocks[y + i - idx][x])
              .reduce((a, b) => a + b, 0),
            direction,
          });
        }
      }
      break;
    case Direction.Left:
      for (let i = minStepDistance; i <= maxStepDistance; i++) {
        if (x > i - 1) {
          nextSteps.push({
            x: x - i,
            y: y,
            distance: Array(i)
              .fill(0)
              .map((_, idx) => blocks[y][x - i + idx])
              .reduce((a, b) => a + b, 0),
            direction,
          });
        }
      }
      break;
  }

  return nextSteps;
}

function getPossibleDirections(direction: Direction) {
  switch (direction) {
    case Direction.Any:
      return [Direction.Right, Direction.Down];
    case Direction.Up:
    case Direction.Down:
      return [Direction.Left, Direction.Right];
    case Direction.Right:
    case Direction.Left:
      return [Direction.Up, Direction.Down];
    case Direction.Stop:
      return [];
  }
}