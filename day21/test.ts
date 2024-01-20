import { p1, p2 } from "./solution";
const input = require('./input');

const testCase = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

test.each([
  ["test", testCase, 6, 16, []],
  ['input', input, 64, 3788, []]
])("p1 works for %s", (name, input, steps, expectation, bads) => {
  const actual = p1(input, steps);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});

test.each([
  ['input', input, 631357596621921, []]
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});