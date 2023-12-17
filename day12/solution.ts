export function p1(input) {
  const rows = input.split("\n");

  const springs = rows
    .map((r) => r.split(" "))
    .map(([string, nums]) => ({ string, nums: nums.split(",").map(Number) }));

  const possibilities = springs.map(({ string, nums }) => ({
    string,
    nums,
    possibilities: getPossibilities({
      string,
      nums,
    }),
  }));

  const sum = possibilities.reduce((a, b) => a + b.possibilities.length, 0);

  return sum;
}

export function p2(input, times) {
  const rows = input.split("\n");

  const springs = rows
    .map((r) => r.split(" "))
    .map(([string, nums]) => ({
      string: Array(times).fill(string).join("?"),
      nums: Array(times)
        .fill(nums.split(",").map(Number))
        .flatMap((x) => x),
    }));

  let i = 0;
  let sum = 0;
  const res = springs.map(({ string, nums }) => {
    console.log('counting', i++);
    const ways = countWays({ string, nums });

    sum += ways;

    return { string, nums, ways };
  });

  return sum;
}

function countWays({
  string,
  nums,
  memo = new Map(),
}) {
  const key = `${string}_${nums.join(',')}`;
  if (memo.has(key)) {
    return memo.get(key);
  }

  if (!string.length) {
    if (!nums.length) {
      return 1;
    } else {
      return 0;
    }
  }

  if (!nums.length) {
    for (const char of string) {
      if (char === '#') {
        return 0;
      }
    }
    return 1;
  }

  const pendingSum = nums.reduce((a, b) => a + b, 0);
  const symbolsNeeded = pendingSum + nums.length - 1;
  const isValidString = string.length >= symbolsNeeded;

  if (!isValidString) {
    return 0;
  }

  let possibilities = 0;

  const char = string[0];

  let canSkipChar = false;
  if (char === "#") {
    if (!nums.length) {
      return 0;
    }
    
    const [first, ...rest] = nums;
    for (let i = 1; i < first; i++) {
      if (string[i] === '.') {
        return 0;
      }
    }

    if (string[first] === '#') {
      return 0;
    }

    const subPos2 = countWays({
      string: string.slice(first + 1),
      nums: rest,
      memo,
    });
    possibilities += subPos2;
  } else if (char === ".") {
    canSkipChar = true;
  } else {
    possibilities += countWays({
      string: '#' + string.slice(1),
      nums,
      memo,
    });
    canSkipChar = true;
  }

  if (canSkipChar) {
    possibilities += countWays({
      string: string.slice(1),
      nums,
      memo,
    });
  }

  memo.set(key, possibilities);

  return possibilities;
}

// a slower version of countWays
function getPossibilities({
  string,
  nums,
  strI = 0,
  numI = 0,
  stick = false,
  spread = false,
}) {
  let possibilities: any[] = [];

  if (!string.length) {
    return possibilities;
  }

  const pendingSum = nums.reduce((a, b) => a + b, 0);
  const symbolsNeeded = pendingSum + nums.length - 1;
  const isValidString = string.length >= symbolsNeeded;

  if (!isValidString) {
    return possibilities;
  }

  const char = string[0];

  let canBeNull, canBeNum;
  if (char === "?") {
    canBeNull = true;
    canBeNum = true;
  } else if (char === "#") {
    canBeNum = true;
  } else {
    canBeNull = true;
  }

  const substr = string.substring(1, string.length);

  if (canBeNull && !stick) {
    const pos = { strI, val: null };

    if (string.length > 1 && string.length > nums.length) {
      const subPos = getPossibilities({
        string: substr,
        strI: strI + 1,
        nums,
        numI,
      });

      for (const sub of subPos) {
        possibilities.push([pos, ...sub]);
      }
    } else if (!nums.length) {
      possibilities.push([pos]);
    }
  }

  if (canBeNum && !spread && nums.length) {
    const pos = { strI, val: numI };

    if (string.length > 1 && string.length > nums.length) {
      const nums2 = [...nums];
      let numI2 = numI;
      nums2[0] -= 1;
      let stick2 = true;
      let spread2 = false;
      if (nums2[0] === 0) {
        nums2.shift();
        numI2++;
        stick2 = false;
        spread2 = true;
      }
      const subPos = getPossibilities({
        string: substr,
        strI: strI + 1,
        nums: nums2,
        numI: numI2,
        stick: stick2,
        spread: spread2,
      });

      for (const sub of subPos) {
        possibilities.push([pos, ...sub]);
      }
    } else {
      possibilities.push([pos]);
    }
  }

  return possibilities;
}