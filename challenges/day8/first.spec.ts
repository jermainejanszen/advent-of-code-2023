import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const generateMap = (lines: string[]): Record<string, string[]> => {
  const map = {};
  for (let i = 2; i < lines.length; i++) {
    map[lines[i].split(" = ")[0]] = lines[i]
      .split(" = ")[1]
      .replace("(", "")
      .replace(")", "")
      .split(", ");
  }
  return map;
};

const followInstructions = (
  instructions: string,
  start: string,
  map: ReturnType<typeof generateMap>
): { steps: number; ending: string } => {
  let current = start;
  let steps = 0;
  for (const instruction of instructions) {
    if (current === "ZZZ") {
      return { steps, ending: current };
    }
    current = map[current][instruction === "R" ? 1 : 0];
    steps += 1;
  }
  return { steps, ending: current };
};

it("is the solution to day 8 challenge 1", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const lines = input.split("\n").map((line) => line.trim());

  const instructions = lines[0];
  const map = generateMap(lines);

  let sum = 0;
  let start = "AAA";
  while (true) {
    const { steps, ending } = followInstructions(instructions, start, map);
    if (ending !== "ZZZ") {
      start = ending;
      sum += steps;
    } else {
      sum += steps;
      break;
    }
  }

  console.log("Day 8 Challenge 1:", sum);
});
