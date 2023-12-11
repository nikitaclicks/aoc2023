const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

test.each([
  ["test", testCase, 8, []],
  ["input", input, 2285, []],
])("p1 works for %s", (name, input, expectation, bads) => {
  const cfg = { red: 12, green: 13, blue: 14 };
  const actual = p1(input, cfg);

  if (bads?.length) {
    for (const bad of bads) {
      expect(sum).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});

test.each([
  ["test", testCase, 2286, []],
  ["input", input, 77021, []],
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(sum).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});
