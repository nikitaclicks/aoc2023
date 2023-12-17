import { p1, p2 } from "./solution";
const input = require("./input");

const testCase = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

const myCase = `?##??.??#??? 3,2,1
??????? 1,1,1`;

const my2 = `.??..??...?##. 1,1,3`;

const my3 = `?###???????? 3,2,1`;

test.each([
  ["my", myCase, 16, []],
  ["my2", my2, 4, []],
  ["my3", my3, 10, []],
  ["test", testCase, 21, []],
  ['input', input, 7236, []]
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
  ["simple", '?? 1', 2, 1, []],
  ["my", myCase, 16, 1, []],
  ["my2", my2, 4, 1, []],
  ["my3", my3, 10, 1, []],
  ["test", testCase, 525152, 5, []],
  ['input', input, 7236, 1, []],
  ['input', input, 475443, 2, []],
  ['input', input, 98864402, 3, []],
  ['input', input, 11607695322318, 5, []]
])("p2 works for %s", (name, input, expectation, times, bads) => {
  const actual = p2(input, times);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});