import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

type SeedMap = {
  seeds: number[];
  chain: MapChain;
};

type MapChain = ((source: number) => number)[];

const parseInput = (input: string) => {
  const lines = input.split("\n").map((line) => line.trim());

  const result: SeedMap = {
    seeds: [],
    chain: [],
  };

  result.seeds = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((value) => Number.parseInt(value.trim()))
    .filter((value) => !Number.isNaN(value));

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) {
      const mapValues: number[][] = [];
      for (let j = i + 2; j < lines.length; j++) {
        if (!lines[j]) break;
        mapValues.push(
          lines[j].split(" ").map((value) => Number.parseInt(value.trim()))
        );
      }

      const map = (value: number) => {
        for (const mapping of mapValues) {
          if (value >= mapping[1] && value < mapping[1] + mapping[2]) {
            return mapping[0] + value - mapping[1];
          }
        }
        return value;
      };

      result.chain.push(map);
    }
  }

  return result;
};

const processSeed = (seed: number, chain: MapChain) => {
  let result = seed;
  for (const map of chain) {
    result = map(result);
  }
  return result;
};

it("is the solution to day 5 challenge 1", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const map = parseInput(input);

  let min = -1;
  for (const seed of map.seeds) {
    const location = processSeed(seed, map.chain);
    if (min < 0 || location < min) {
      min = location;
    }
  }

  console.log("Day 5 Challenge 1:", min);
});
