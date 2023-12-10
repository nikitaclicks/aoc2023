const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const myCase = `23332 2
AAAAA 3
23456 5
AA8AA 8
23432 13
A2JA4 21
TTT98 7`;

test.each([
  ["test", testCase, 6440, []],
  ["my", myCase, 193, [198]],
  ['input', input, 246163188, [246246128]]
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
  ["test", testCase, 5905, []],
  // ["my", myCase, 215, []],
  ['input', input, 245794069, [245886126, 245682144]]
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});