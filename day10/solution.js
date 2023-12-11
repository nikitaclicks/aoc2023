const Direction = {
  Stop: 'Stop',
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right'
}

const moves = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];

const moveOpposites = { 
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
 }; 

const possibleCellMoves = {
  '|': [Direction.Up, Direction.Down],
  '-': [Direction.Left, Direction.Right],
  'L': [Direction.Up, Direction.Right],
  'J': [Direction.Up, Direction.Left],
  '7': [Direction.Down, Direction.Left],
  'F': [Direction.Down, Direction.Right],
  '.': [],
  'S': moves
};

function p1(input) {
  const field = input.split("\n");
  const animalPosition = getAnimalPosition(field);

  const loop = findLoop(animalPosition, field);

  return loop.length / 2;
}

function findLoop(startPosition, field) {
  for (const move of moves) {
    const cells = [startPosition];
    cells[0][2] = move;

    let direction = move;
    while (true) {
      const currentPosition = cells[cells.length - 1];
      const { nextDirection, nextPosition } = step(currentPosition, direction, field);
    
      if (nextDirection === Direction.Stop) {
        // pipe is broken
        break;
      } else {
        const nextPosIsAnimal = nextPosition[0] === cells[0][0] && nextPosition[1] === cells[0][1];
        if (nextPosIsAnimal) {
          // loop ended, animal reached itself again
          return cells;
        }

        // continuing the loop
        cells.push(nextPosition);
        nextPosition[2] = nextDirection;
        direction = nextDirection;
      }
    }
  }
}

function getAnimalPosition(field) {
  for (let y = 0; y < field.length; ++y) {
    for (let x = 0; x < field[0].length; ++x) {
      if (field[y][x] === 'S') {
        return [x, y];
      }
    }
  }
}

function step(currentPosition, direction, field) {
  const nextPosition = [...currentPosition];

  let hasError = false;

  switch (direction) {
    case Direction.Up:
      nextPosition[1] -= 1;
      break;
    case Direction.Down:
      nextPosition[1] += 1;
      break;
    case Direction.Left:
      nextPosition[0] -= 1;
      break;
    case Direction.Right:
      nextPosition[0] += 1;
      break;
    default:
      // this should never happen
      throw new Error('default swithc');
      break;
  }

  if (nextPosition[0] < 0 || nextPosition[1] < 0 || nextPosition[0] >= field[0].length || nextPosition[1] >= field[1].length) {
    // the next cell is out of bounds
    hasError = true;
  }

  if (hasError) {
    return { nextPosition: null, nextDirection: Direction.Stop };
  }

  const nextCell = field[nextPosition[1]][nextPosition[0]];

  const possibleMoves = possibleCellMoves[nextCell];

  const revertedMove = moveOpposites[direction];
  const moveIndex = possibleMoves.indexOf(revertedMove);

  if (moveIndex === -1) {
    // pipe not connected
    return { nextPosition: null, nextDirection: Direction.Stop };
  }

  // just first possible move for the pipe
  const nextDirection = possibleMoves.find((v, i) => i !== moveIndex);

  return { nextPosition, nextDirection };
}

module.exports.p1 = p1;

function p2(input) {
  const field = input.split("\n");
  const animalPosition = getAnimalPosition(field);

  const loop = findLoop(animalPosition, field);

  loop.push(loop[0]);

  const visitedNodes = new Map([[`${loop[0][0]}_${loop[0][1]}`, 0]]); // x_y -> i
  const closedSpaces = [];
  for (let i = 1; i < loop.length; ++i) {
    const prevCell = loop[i - 1];
    const cell = loop[i];

    visitedNodes.set(`${cell[0]}_${cell[1]}`, i);

    const nodesToCloseSpace = getNodesToCloseSpace(prevCell, cell);

    // if (i >= 5) {
    //   // min nodes to close just a single cell
    // }
  }

  return -1;
}

function getNodesToCloseSpace(prevCell, currentCell) {
  return [];
}

module.exports.p2 = p2;
