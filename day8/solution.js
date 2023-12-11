function p1(input) {
  const rows = input.split("\n");

  const instructions = rows[0];

  const nodes = new Map();

  for (let i = 2; i < rows.length; ++i) {
    const [from, to] = rows[i].split("=").map((x) => x.trim());
    const directions = to.substring(1, to.length - 1).split(", ");
    nodes.set(from, directions);
  }

  let steps = 0;

  for (let pos = "AAA", step = 0; pos !== "ZZZ"; ++step) {
    if (step === instructions.length) {
      step = 0;
    }
    const instruction = instructions[step];

    const node = nodes.get(pos);
    pos = instruction === "L" ? node[0] : node[1];

    steps++;
  }

  return steps;
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  const instructions = rows[0];

  const nodes = new Map();

  const startNodes = [];

  for (let i = 2; i < rows.length; ++i) {
    const [from, to] = rows[i].split("=").map((x) => x.trim());
    const directions = to.substring(1, to.length - 1).split(", ");
    nodes.set(from, directions);

    if (from[2] === "A") {
      startNodes.push(from);
    }
  }

  const zLoops = [];

  for (let position of startNodes) {
    const zPositions = [];
    let steps = 1;

    for (let step = 0; ; ++step) {
      if (step === instructions.length) {
        step = 0;
      }
      const instruction = instructions[step];

      const node = nodes.get(position);
      position = instruction === "L" ? node[0] : node[1];

      if (position[2] === "Z") {
        const posKey = `${position}_${step + 1}`;
        if (
          zPositions.length &&
          zPositions[0].key === posKey &&
          zPositions[0].steps % 2 === steps % 2
        ) {
          break;
        } else {
          zPositions.push({ key: posKey, steps });
        }
      }

      ++steps;
    }

    zLoops.push(zPositions);
  }

  const nums = zLoops.map((x) => x[0].steps);

  const lcm = leastCommonMultiple(nums);

  return lcm;
}

function leastCommonMultiple(nums) {
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  var multiple = nums[0];
  nums.forEach(function (n) {
    multiple = lcm(multiple, n);
  });

  return multiple;
}

module.exports.p2 = p2;
