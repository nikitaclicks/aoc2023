const Direction = {
  Stop: 'Stop',
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right'
}

const Animal = 'S';

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
  [Animal]: moves
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
      if (field[y][x] === Animal) {
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
      throw new Error('default switch');
      break;
  }

  if (nextPosition[0] < 0 || nextPosition[1] < 0 
    || nextPosition[0] >= field[0].length 
    || nextPosition[1] >= field[1].length) {
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

  const loopNodes = new Set();
  for (const node of loop) {
    loopNodes.add(getId(node));
  }

  const bounds = getBoundingBox(loop);

  const leftNodesById = new Map();
  const rightNodesById = new Map();
  let leftTouchesBounds = false;
  let rightTouchesBounds = false;

  let prevDirection;
  for (let i = 0; i < loop.length; ++i) {
    const node = loop[i];
    const direction = node[2];

    const leftNodes = [getLeftNode(node, direction)];
    const rightNodes = [getRightNode(node, direction)];

    if (prevDirection && prevDirection != direction) {
      leftNodes.push(getLeftNode(node, prevDirection))
      rightNodes.push(getRightNode(node, prevDirection))
    }

    for (const leftNode of leftNodes) {
      const leftNodeId = getId(leftNode);
      if (!loopNodes.has(leftNodeId)) {
        leftNodesById.set(leftNodeId, leftNode);

        if (!leftTouchesBounds && !rightTouchesBounds && touchesOrOutOfBounds(leftNode, bounds)) {
          leftTouchesBounds = true;
        }
      }
    }

    for (const rightNode of rightNodes) {
      const rightNodeId = getId(rightNode);
      if (!loopNodes.has(rightNodeId)) {
        rightNodesById.set(rightNodeId, rightNode);

        if (!leftTouchesBounds && !rightTouchesBounds && touchesOrOutOfBounds(rightNode, bounds)) {
          rightTouchesBounds = true;
        }
      }
    }

    prevDirection = direction;
  }

  let result;

  if (leftTouchesBounds) {
    result = extrapolate(rightNodesById, loopNodes);
  } else if (rightTouchesBounds) {
    result = extrapolate(leftNodesById, loopNodes);
  } else {
    // both dont touch bounds yet

    const left = extrapolate(leftNodesById, loopNodes);

    for (const node of left) {
      if (touchesOrOutOfBounds(node, bounds)) {
        leftTouchesBounds = true;
        break;
      }
    }

    if (leftTouchesBounds) {
      result = extrapolate(rightNodesById, loopNodes);
    } else {
      // right will for sure touch bounds
      result = left;
    }
  }

  return result.size;
}

function extrapolate(nodes, loopNodes, extrapolatedIds = new Set()) {
  for (const [id] of nodes) {
    extrapolatedIds.add(id);
  }

  const nextNodes = new Map();

  for (const [_, node] of nodes) {
    const neighbours = getNeighbours(node, loopNodes);

    for (const neighbour of neighbours) {
      const neighbourId = getId(neighbour);
      if (!extrapolatedIds.has(neighbourId)) {
        nextNodes.set(neighbourId, neighbour);
        extrapolatedIds.add(neighbourId);
      }
    }
  }

  if (nextNodes.size) {
    extrapolate(nextNodes, loopNodes, extrapolatedIds);
  }

  return extrapolatedIds;
}

function getId(node) {
  return `${node[0]}_${node[1]}`;
}

function getNeighbours(node, loopNodes) {
  const neighbours = [
    [node[0] - 1, node[1]],
    [node[0] + 1, node[1]],
    [node[0], node[1] - 1],
    [node[0], node[1] + 1]
  ];

  return neighbours.filter(n => !loopNodes.has(`${n[0]}_${n[1]}`));
}

function getLeftNode(node, direction) {
  // if up -> left
  // if down -> right
  // if left -> down
  // if right -> up
  switch (direction) {
    case Direction.Up:
      return [node[0]-1, node[1]];
    case Direction.Down:
      return [node[0]+1, node[1]];
    case Direction.Left:
      return [node[0], node[1]+1];
    case Direction.Right:
      return [node[0], node[1]-1];
  }
}

function getRightNode(node, direction) {
  // if up -> right
  // if down -> left
  // if left -> up
  // if right -> down
  switch (direction) {
    case Direction.Up:
      return [node[0]+1, node[1]];
    case Direction.Down:
      return [node[0]-1, node[1]];
    case Direction.Left:
      return [node[0], node[1]-1];
    case Direction.Right:
      return [node[0], node[1]+1];
  }
}

function touchesOrOutOfBounds(node, bounds) {
  return node[0] <= bounds.minX
    || node[0] >= bounds.maxX
    || node[1] <= bounds.minY
    || node[1] >= bounds.maxY;
}

function getBoundingBox(loop) {
  let minX = Number.MAX_SAFE_INTEGER, 
    minY = Number.MAX_SAFE_INTEGER, 
    maxX = -1, 
    maxY = -1;

  for (let [x, y] of loop) {
    if (x > maxX) maxX = x;
    if (x < minX) minX = x;

    if (y > maxY) maxY = y;
    if (y < minY) minY = y;
  }

  return { minX, minY, maxX, maxY };
}

module.exports.p2 = p2;
