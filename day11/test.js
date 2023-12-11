const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

test.each([
  ["test", testCase, 374, []],
  ['input', input, 9445168, []]
])("p1 works for %s", (name, input, expectation, bads) => {
  const actual = p1(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});

test.each([
  ["test", testCase, 10, 1030, []],
  ["test", testCase, 100, 8410, []],
  ['input', input, 1000000, 742305960572, [742306702870]]
])("p2 works for %s", (name, input, expansion, expectation, bads) => {
  const actual = p2(input, expansion);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});