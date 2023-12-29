import { Pulse, ModuleType, FlipFlop, Conjunction, Module, Broadcaster } from './models';

export function p1(input: string): number {
  const modules = parseModules(input);
  const broadcaster = 'broadcaster';

  let lows = 0;
  let highs = 0;
  const btnPresses = 1000;

  const queue: { source: string, pulse: Pulse }[] = [];
  let queueIdx = 0;

  for (let i = 0; i < btnPresses; i++) {
    modules.get(broadcaster)!.receive(Pulse.Low, 'button');
    lows++;

    queue.push({ source: broadcaster, pulse: Pulse.Low });

    while (queueIdx < queue.length) {
      const { source, pulse } = queue[queueIdx];

      const sourceModule = modules.get(source)!;

      for (const output of sourceModule.outputs) {
        if (pulse === Pulse.Low) {
          lows++;
        } else {
          highs++;
        }

        const targetModule = modules.get(output)!;
        if (!targetModule) {
          // debug module, it cannot output
          continue;
        }

        targetModule.receive(pulse, source);

        const outputPulse = targetModule.getOutput();

        if (outputPulse !== null) {
          queue.push({ source: output, pulse: outputPulse });
        }
      }

      queueIdx++;
    }
  }

  return lows * highs;
}

export function p2(input: string): number {
  const modules = parseModules(input);
  const broadcaster = 'broadcaster';

  const btnPresses = 5000;

  const cycle: number[] = [];

  const queue: { source: string, pulse: Pulse }[] = [];
  let queueIdx = 0;

  for (let i = 0; i < btnPresses; i++) {
    modules.get(broadcaster)!.receive(Pulse.Low, 'button');

    queue.push({ source: broadcaster, pulse: Pulse.Low });

    while (queueIdx < queue.length) {
      const { source, pulse } = queue[queueIdx];

      const sourceModule = modules.get(source)!;

      for (const output of sourceModule.outputs) {
        // "cs" is the last conjunction module before the "rx" module
        if (output === 'cs' && pulse === Pulse.High) {
          cycle.push(i + 1);
        }

        const targetModule = modules.get(output)!;
        if (!targetModule) {
          // debug module, it cannot output
          continue;
        }

        targetModule.receive(pulse, source);

        const outputPulse = targetModule.getOutput();

        if (outputPulse !== null) {
          queue.push({ source: output, pulse: outputPulse });
        }
      }

      queueIdx++;
    }
  }

  return leastCommonMultiple(cycle);
}

function leastCommonMultiple(nums) {
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  var multiple = nums[0];
  nums.forEach(function (n) {
    multiple = lcm(multiple, n);
  });

  return multiple;
}

function parseModules(input: string): Map<string, Module> {
  const modules = new Map<string, Module>();

  const rows = input.split("\n");

  const conjunctionInputs = new Map<string, Map<string, Pulse>>();

  for (const row of rows) {
    let [name, outputString] = row.split(" -> ");
    const outputs = outputString.split(", ");
    let module: Module;
    if (name[0] === ModuleType.Conjunction) {
      name = name.substring(1);
      module = new Conjunction(outputs);
    } else if (name[0] === ModuleType.FlipFlop) {
      name = name.substring(1);
      module = new FlipFlop(outputs);
    } else {
      module = new Broadcaster(outputs);
    }

    modules.set(name, module);

    for (const output of outputs) {
      const inputs = conjunctionInputs.get(output) ?? new Map<string, Pulse>();
      inputs.set(name, Pulse.Low);
      conjunctionInputs.set(output, inputs);
    }
  }

  for (const input of conjunctionInputs) {
    const [name, inputs] = input;
    const module = modules.get(name)!;
    for (const [caller, _] of inputs) {
      module?.connect(caller);
    }
  }

  return modules;
}