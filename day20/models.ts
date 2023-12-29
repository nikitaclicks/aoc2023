export enum ModuleType {
  Broadcaster = "broadcaster",
  Conjunction = "&",
  FlipFlop = "%",
}

export enum Pulse {
  Low = "low",
  High = "high",
}

export abstract class Module {
  constructor(public outputs: string[]) {}

  connect(caller: string): void {}
  abstract receive(input: Pulse, caller: string): void;
  abstract getOutput(): Pulse | null;
}

export class Broadcaster extends Module {
  private value: Pulse = Pulse.Low;

  receive(input: Pulse, caller: string): void {
    this.value = input;
  }

  getOutput(): Pulse | null {
    return this.value;
  }
}

export class Conjunction extends Module {
  private inputs = new Map<string, Pulse>();

  connect(caller: string): void {
    this.inputs.set(caller, Pulse.Low);
  }

  receive(input: Pulse, caller: string): void {
    this.inputs.set(caller, input);
  }

  getOutput(): Pulse | null {
    for (const [_, value] of this.inputs) {
      if (value === Pulse.Low) {
        return Pulse.High;
      }
    }

    return Pulse.Low;
  }
}

export class FlipFlop extends Module {
  private value: Pulse = Pulse.Low;
  private state = false;

  receive(input: Pulse, caller: string): void {
    if (input === Pulse.Low) {
      this.state = true;
      this.value = this.value === Pulse.Low ? Pulse.High : Pulse.Low;
    } else {
      this.state = false;
    }
  }

  getOutput(): Pulse | null {
    if (this.state) {
      return this.value;
    }

    return null;
  }
}
