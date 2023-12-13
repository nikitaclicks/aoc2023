const { p1, p2 } = require("./solution");
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
  // ["my", myCase, 16, []],
  // // ["my2", my2, 4, []],
  // // ["my3", my3, 10, []],
  ["test", testCase, 21, []],
  // ['input', input, 7236, []]
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
  ["test", testCase, 525152, []],
  // ['input', input, -1, []]
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});