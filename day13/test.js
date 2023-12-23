const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const myCase = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#

##..##.
#.##.#.
......#
......#
#.##.#.
##..###
#.##.#.

..##..###
#####.##.
#####.##.
..##..###
#....#..#

.......##.......###
.....######.....##.
.....######.....#..
.......##.......###
.....#....#.......#`;

const myCase2 = `.......##.......###
.....######.....##.
.....######.....#..
.......##.......###
.....#....#.......#`;

test.each([
  ["my", myCase, 5 + (4 * 100) + 3 + (2 * 100) + 8, []],
  ["my 2", myCase2, 8, []],
  ["test", testCase, 405, []],
  ['input', input, 30575, [9217, 13261, 13559]]
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
  ["test", testCase, -1, []],
  ['input', input, -1, []]
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});