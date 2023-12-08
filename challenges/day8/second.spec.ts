import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const generateMap = (lines: string[]): Record<string, string[]> => {
  const map = {};
  for (let i = 2; i < lines.length; i++) {
    const name = lines[i].split(" = ")[0];
    map[name] = lines[i]
      .split(" = ")[1]
      .replace("(", "")
      .replace(")", "")
      .split(", ");
    console.log(map);
  }
  return map;
};

const getStartNodes = (lines: string[]) => {
  return lines
    .map((line) => line.split(" = ")[0])
    .filter((node) => /.*A$/.test(node));
};

const isFinished = (nodes: string[]) => {
  for (const node of nodes) {
    if (!(node.slice(-1) === "Z")) return false;
  }
  return true;
};

const followInstructions = (
  instructions: string,
  nodes: string[],
  map: ReturnType<typeof generateMap>
): number => {
  let steps = 0;
  for (const instruction of instructions) {
    if (isFinished(nodes)) {
      return steps;
    }
    for (let i = 0; i < nodes.length; i++) {
      nodes[i] = map[nodes[i]][instruction === "R" ? 1 : 0];
    }
    steps += 1;
  }
  return steps;
};

it("is the solution to day 8 challenge 2", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const lines = input.split("\n").map((line) => line.trim());

  console.log("Starting");
  const instructions = lines[0];
  const map = generateMap(lines);
  console.log("Generated map");

  let sum = 0;
  const starts = getStartNodes(lines);
  console.log(starts);
  while (true) {
    const steps = followInstructions(instructions, starts, map);
    sum += steps;
    console.log(starts, sum);
    if (isFinished(starts)) {
      break;
    }
  }

  console.log("Day 8 Challenge 2:", sum);
});
