type AcceptionRule = Record<string, [number, number]>;

const accept = "A";
const reject = "R";

export function p1(input: string): number {
  const [workflowRows, partRows] = input
    .split("\n\n")
    .map((row) => row.split("\n"));

  const workflows = parseWorkflows(workflowRows);
  const parts = parseParts(partRows);

  const accepted: Record<string, number>[] = [];
  for (const part of parts) {
    if (executeWorkflow("in", workflows, part)) {
      accepted.push(part);
    }
  }

  let sum = 0;

  for (const part of accepted) {
    sum += Object.values(part).reduce((partAcc, value) => partAcc + value, 0);
  }

  return sum;
}

function parseWorkflows(workflowRows: string[]): Map<string, string[]> {
  const workflows = new Map<string, string[]>();

  for (const row of workflowRows) {
    const [name, ruleString] = row.split("{");

    const rules = ruleString.substring(0, ruleString.length - 1).split(",");

    workflows.set(name, rules);
  }

  return workflows;
}

function parseParts(partRows: string[]): Record<string, number>[] {
  const parts: Record<string, number>[] = [];

  for (const row of partRows) {
    const part: Record<string, number> = {};

    const pairs = row.substring(1, row.length - 1).split(",");

    for (const pair of pairs) {
      const [key, value] = pair.split("=");

      part[key] = Number(value);
    }

    parts.push(part);
  }

  return parts;
}

function executeWorkflow(name: string, workflows, part): boolean {
  const workflow = workflows.get(name);

  for (const rule of workflow) {
    if (rule.length === 1) {
      return rule === accept;
    }

    const [condition, next] = rule.split(":");

    if (!next) {
      return executeWorkflow(condition, workflows, part);
    }

    const ruleAttr = condition[0];
    const value = Number(condition.substring(2));
    const isPass =
      condition[1] === ">" ? part[ruleAttr] > value : part[ruleAttr] < value;

    if (isPass) {
      if (next === accept) {
        return true;
      } else if (next === reject) {
        return false;
      } else {
        return executeWorkflow(next, workflows, part);
      }
    }
  }

  return false;
}

export function p2(input: string): number {
  const [workflowRows] = input.split("\n\n").map((row) => row.split("\n"));

  const workflows = parseWorkflows(workflowRows);

  const minRating = 1, maxRating = 4000;

  const rules = testWorkflows("in", workflows, {
    m: [minRating, maxRating],
    a: [minRating, maxRating],
    x: [minRating, maxRating],
    s: [minRating, maxRating],
  });

  let sum = 0;
  for (const rule of rules) {
    sum += Object.values(rule).reduce((acc, value) => acc * (value[1] - value[0] + 1), 1);
  }

  return sum;
}

function testWorkflows(
  name: string,
  workflows: Map<string, string[]>,
  rule: AcceptionRule
): AcceptionRule[] {
  const workflow = workflows.get(name)!;

  let testedRules: AcceptionRule[] = [];
  let currentRule = rule;

  for (const func of workflow) {
    if (func.length === 1) {
      if (func === accept) {
        testedRules.push(currentRule);
      }
      // this is the last A result
      break;
    }

    const [condition, next] = func.split(":");

    if (!next) {
      // this is the last plain func
      testedRules.push(...testWorkflows(condition, workflows, currentRule));
      continue;
    }

    const attr = condition[0];
    const value = Number(condition.substring(2));
    const operation = condition[1];

    const [min, max] = currentRule[attr];
    if (value > max || value < min) {
      // current rule is out of range, can't pass
      continue;
    }

    const passingRule: AcceptionRule = {
      ...currentRule,
      [attr]: operation === ">" ? [value + 1, max] : [min, value - 1],
    };

    const failingRule: AcceptionRule = {
      ...currentRule,
      [attr]: operation === ">" ? [min, value] : [value, max],
    };

    if (next === accept) {
      // just save it and move on
      testedRules.push(passingRule);
    } else if (next === reject) {
      // dont care about this rule
    } else {
      testedRules.push(...testWorkflows(next, workflows, passingRule));
    }

    currentRule = failingRule;
  }

  return testedRules;
}
