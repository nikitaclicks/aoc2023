const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `Time:      7  15   30
Distance:  9  40  200`;

test.each([
  ["test", testCase, 288, []],
  ['input', input, 345015, []]
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
  ["test", testCase, 71503, []],
  ['input', input, 42588603, []]
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});