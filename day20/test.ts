import { p1, p2 } from "./solution";
const input = require('./input');

const testCase = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

const testCase2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

test.each([
  ["test", testCase, 32000000, []],
  ["test 2", testCase2, 11687500, []],
  ['input', input, 703315117, []]
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
  ['input', input, 230402300925361, [460804601850722]]
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});