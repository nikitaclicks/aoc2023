function p1(input) {
  const steps = input.split(",");
  let sum = 0;

  for (const step of steps) {
    sum += hash(step);
  }

  return sum;
}

function hash(string) {
  let sum = 0;

  for (const char of string) {
    sum += char.charCodeAt(0);
    sum *= 17;
    sum %= 256;
  }

  return sum;
}

module.exports.p1 = p1;

function p2(input) {
  const steps = input.split(",");

  const boxes = [];

  for (const step of steps) {
    let lens = '';
    
    for (let i = 0; i < step.length; i++) {
      const char = step[i];
      
      if (char === '-') {
        const box = hash(lens);
        if (boxes[box]) {
          boxes[box].delete(lens);
        }
        break;
      }

      if (char === '=') {
        const box = hash(lens);
        if (!boxes[box]) {
          boxes[box] = new Map();
        }
        const focus = Number(step[i + 1]);
        boxes[box].set(lens, focus);
        break;
      }

      lens += char;
    }
  }

  let sum = 0;

  for (let i = 0; i < 256; i++) {
    if (!boxes[i]) {
      continue;
    }

    let slot = 1;
    for (const value of boxes[i].values()) {
      sum += (i + 1) * slot * value;
      slot++;
    }
  }

  return sum;
}

module.exports.p2 = p2;
