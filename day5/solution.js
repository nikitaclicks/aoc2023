const sequence = [
  "seed",
  "soil",
  "fertilizer",
  "water",
  "light",
  "temperature",
  "humidity",
  "location",
];

function p1(input) {
  const rows = input.split("\n");

  const seeds = rows[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((x) => Number(x.trim()));

  const maps = new Map();

  let term;
  for (let i = 1; i < rows.length; ++i) {
    const row = rows[i];

    if (!row.length) {
      continue;
    }

    if (row.endsWith("map:")) {
      term = row.split(" ")[0];

      maps.set(term, []);
    } else {
      const [d, s, l] = row.split(" ").map((x) => Number(x.trim()));

      maps.get(term).push({ d, s, l });
    }
  }

  const ids = new Map([[sequence[0], seeds]]);

  for (let i = 0; i < sequence.length - 1; i++) {
    let source = sequence[i];
    let dest = sequence[i + 1];

    const sourceNums = ids.get(source);
    const mapping = maps.get(`${source}-to-${dest}`);

    const destNums = [];

    // convert
    for (const srcNum of sourceNums) {
      const map = mapping.find(
        ({ d, s, l }) => s <= srcNum && s + l + 1 >= srcNum
      );

      if (!map) {
        destNums.push(srcNum);
      } else {
        const destNum = srcNum - map.s + map.d;
        destNums.push(destNum);
      }
    }

    ids.set(dest, destNums);
  }

  return ids.get(sequence[sequence.length - 1]).sort((a, b) => a - b)[0];
}

module.exports.p1 = p1;

function p2(input) {
  const rows = input.split("\n");

  const seedsRow = rows[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((x) => Number(x.trim()));

  const seedRanges = [];
  for (let i = 0; i < seedsRow.length - 1; i += 2) {
    seedRanges.push({ start: seedsRow[i], length: seedsRow[i + 1] });
  }

  const maps = new Map();

  let term;
  for (let i = 1; i < rows.length; ++i) {
    const row = rows[i];

    if (!row.length) {
      continue;
    }

    if (row.endsWith("map:")) {
      term = row.split(" ")[0];

      maps.set(term, []);
    } else {
      const [d, s, l] = row.split(" ").map((x) => Number(x.trim()));

      maps.get(term).push({ d, s, l });
    }
  }

  const ranges = new Map([["seed", seedRanges]]);

  for (let i = 0; i < sequence.length - 1; i++) {
    let source = sequence[i];
    let dest = sequence[i + 1];

    const sourceRanges = ranges.get(source).sort((a, b) => a.start - b.start);

    const destRanges = [];

    for (const sourceRange of sourceRanges) {
      const mapping = maps
        .get(`${source}-to-${dest}`)
        .concat()
        .sort((a, b) => b.s - a.s);

      let nextMapping = mapping.pop();

      for (let processed = 0; processed < sourceRange.length; ) {
        const rangeStart = sourceRange.start + processed;

        // iterate passed mappings
        while (nextMapping && isMapBeforeRange(rangeStart, nextMapping)) {
          nextMapping = mapping.pop();
        }

        let destRange;
        if (!nextMapping) {
          // we apply the range, not map exists for the range
          destRange = {
            start: rangeStart,
            length: sourceRange.length - processed,
          };
          processed = sourceRange.length;
        } else {
          const pending = sourceRange.length - processed;
          if (rangeHasItemsBeforeMap(rangeStart, nextMapping)) {
            // the range has items before the map, we apply them

            const mapStart = nextMapping.s;
            const itemsBeforeStart = mapStart - rangeStart;
            const available = Math.min(pending, itemsBeforeStart);
            destRange = { start: rangeStart, length: available };
            processed += available;
          } else {
            // we apply the map that follow at the range start
            const mapOffset = rangeStart - nextMapping.s;
            const available = Math.min(pending, nextMapping.l - mapOffset);
            destRange = { start: nextMapping.d + mapOffset, length: available };
            processed += available;
          }
        }

        destRanges.push(destRange);
      }
    }

    ranges.set(dest, destRanges);
  }

  return ranges
    .get(sequence[sequence.length - 1])
    .map((x) => x.start)
    .sort((a, b) => a - b)[0];
}

function isMapBeforeRange(rangeStart, map) {
  const mapEnd = map.s + map.l - 1;

  return mapEnd < rangeStart;
}

function rangeHasItemsBeforeMap(rangeStart, map) {
  const mapStart = map.s;
  return rangeStart < mapStart;
}

module.exports.p2 = p2;
