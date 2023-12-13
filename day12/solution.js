function p1(input) {
  const rows = input.split("\n");

  const springs = rows.map(r => r.split(' '))
    .map(([string, nums]) => ({ string, nums: nums.split(',').map(Number) }));

  const possibilities = springs.map(({string, nums}) => ({
    string, nums, possibilities: getPossibilities({
      string,
      nums,
    })
  }));

  const stringPossibilities = possibilities.map(possibilitiesToString);

  const sum = stringPossibilities.reduce((a, b) => a + b.length, 0);

  return sum;
}

function possibilitiesToString({ string, nums, possibilities }) {
  return possibilities.map(p => p.reduce((a, b) => a + (b.val !== null ? nums[b.val] : ' '), ''));
}

function getPossibilities({ string, nums, strI = 0, numI = 0, stick = false, spread = false, memo = new Map() }) {
  let possibilities = [];

  const key = `${string}_${nums.join(',')}_${stick}_${spread}`;
  const res = memo.get(key);
  if (res) {
    return res;
  }

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
  if (char === '?') {
    canBeNull = true;
    canBeNum = true;
  } else if (char === '#') {
    canBeNum = true;
  } else {
    canBeNull = true;
  }

  if (canBeNull && !stick) {
    const pos = { strI, val: null };

    if (string.length > 1 && string.length > nums.length) {
      const subPos = getPossibilities({
        string: string.substring(1, string.length), 
        strI: strI + 1,
        nums,
        numI,
        memo
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
        string: string.substring(1, string.length), 
        strI: strI + 1,
        nums: nums2,
        numI: numI2,
        stick: stick2,
        spread: spread2,
        memo
      });
      for (const sub of subPos) {
        possibilities.push([pos, ...sub]);
      }
    } else {
      possibilities.push([pos]);
    }
  }

  memo.set(key, possibilities);

  return possibilities;
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  const springs = rows.map(r => r.split(' '))
    // .map(([string, nums]) => ({ string, nums: nums.split(',').map(Number) }));
    .map(([string, nums]) => ({ string: Array(1).fill(string).join('?'), nums: Array(1).fill(nums.split(',').map(Number)).flatMap(x => x) }));

  let i = 1;
  let total = springs.length;
  let sum = 0;
  const possibilities = springs.forEach(({string, nums}) => {
    console.log(`completed ${i}/${total}`);
    i++;
    sum += getPossibilities({
      string, 
      nums,
    }).length;
  });

  // const stringPossibilities = possibilities.map(possibilitiesToString);

  // const sum = possibilities.reduce((a, b) => a + b.possibilities.length, 0);

  return sum;
}

module.exports.p2 = p2;
