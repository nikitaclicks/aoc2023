import { p1, p2 } from "./solution";
const input = require("./input");

const testCase = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

const testCase2 = `111111111111
999999999991
999999999991
999999999991
999999999991`;

test.each([
  ["test", testCase, 102, []],
  ["test 2", testCase2, 14 + 5*9, []],
  ['input', input, 886, []]
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
  ["test", testCase, 94, []],
  ["test 2", testCase2, 71, []],
  ['input', input, 1055, []]
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});