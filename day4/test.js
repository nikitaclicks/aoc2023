const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

test.each([
  ["test", testCase, 13, []],
  ['input', input, 21158, [103065]]
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
  ["test", testCase, 30, [], [1, 2, 4, 8, 14, 1]],
  ['input', input, 6050769, [], []]
])("p2 works for %s", (name, input, expectation, bads, expCards) => {
  const { total, cards } = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  if (expCards?.length) {
    expect(cards).toEqual(expCards);
  }

  expect(total).toBe(expectation);
});