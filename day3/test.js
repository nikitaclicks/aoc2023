const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const myCase = `......*...
467..114..
...*......
..35..633.
......#...
617*......
.....++58.
..592.....
......755.
..........
.664.598..
....$.....`;

test.each([
  ["test", testCase, 4361, []],
  ["my", myCase, 4361 + 58 + 114 - 755, []],
  ["input", input, 559667, [612925, 553071]],
])("p1 works for %s", (name, input, expectation, bads) => {
  const actual = p1(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});

const testCase2 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

test.each([
  ["test", testCase2, 467835, []],
  ["my", myCase, 16345, []],
  ["input", input, 86841457, []],
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});
