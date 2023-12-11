const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

test.each([
  ["test", testCase, 114, []],
  ['input', input, 1842168671, []]
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
  ["test", testCase, 2, []],
  ['input', input, 903, []]
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});