const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `42`;

test.each([
  ["test", testCase, -1, []],
  ['input', input, -1, []]
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