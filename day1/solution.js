function day1p2(s) {
  const rows = s.split("\n");

  const names = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const nums = rows
    .map((row) => row.trim())
    .map((row) => findFirstNum(row, names) * 10 + findLastNum(row, names));

  const sum = nums.reduce((a, b) => a + b, 0);

  return { nums, sum };
}

function findFirstNum(s, names) {
  const cursor = names.map((x) => 0);
  for (let i = 0; i < s.length; i++) {
    const num = Number(s[i]);
    if (num) return num;

    for (let n = 0; n < names.length; n++) {
      if (s[i] === names[n][cursor[n]]) {
        cursor[n] += 1;
        if (cursor[n] === names[n].length) return n + 1;
      } else {
        cursor[n] = 0;
        if (s[i] === names[n][0]) {
            cursor[n] += 1;
        }
      }
    }
  }
  return 0;
}

function findLastNum(s, names) {
  const cursor = names.map((x) => x.length - 1);
  for (let i = s.length - 1; i >= 0; i--) {
    const num = Number(s[i]);
    if (num) return num;

    for (let n = 0; n < names.length; n++) {
      if (s[i] === names[n][cursor[n]]) {
        cursor[n] -= 1;
        if (cursor[n] < 0) return n + 1;
      } else {
        cursor[n] = names[n].length - 1;
        if (s[i] === names[n][names[n].length - 1]) {
            cursor[n] -= 1;
        }
      }
    }
  }
  return 0;
}

module.exports = day1p2;
