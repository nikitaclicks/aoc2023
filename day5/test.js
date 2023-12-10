const { p1, p2 } = require("./solution");
const input = require("./input");

const testCase = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

test.each([
  ["test", testCase, 35, []],
  ['input', input, 910845529, [1044732983]]
])("p1 works for %s", (name, input, expectation, bads) => {
  const actual = p1(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});

const myCase = `seeds: 10 5 30 10

seed-to-soil map:
50 8 4
100 13 1
120 25 5
200 50 10

soil-to-fertilizer map:
5 5 5

fertilizer-to-water map:


water-to-light map:


light-to-temperature map:
7 7 7

temperature-to-humidity map:
999 999 999

humidity-to-location map:
`;

test.each([
  // ["test", testCase, 46, []],
  // ["test2", test2Case, 46, []],
  // ["my", myCase, 12, []],
  ['input', input, 77435348, [292211340]]
])("p2 works for %s", (name, input, expectation, bads) => {
  const actual = p2(input);

  if (bads?.length) {
    for (const bad of bads) {
      expect(actual).not.toBe(bad);
    }
  }

  expect(actual).toBe(expectation);
});