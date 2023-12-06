import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const getNumberOfWaysToWin = (time: number, distance: number): number => {
  let waysToWin = 0;
  for (let i = 1; i < time; i++) {
    const distanceTraveled = i * (time - i);
    if (distanceTraveled > distance) {
      waysToWin += 1;
    }
  }
  return waysToWin;
};

it("is the solution to day 6 challenge 1", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const lines = input.split("\n").map((line) => line.trim());

  const times = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((value) => Number.parseInt(value))
    .filter((value) => !Number.isNaN(value));

  const distances = lines[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((value) => Number.parseInt(value))
    .filter((value) => !Number.isNaN(value));

  let marginOfError = 1;
  for (let i = 0; i < times.length; i++) {
    marginOfError =
      marginOfError * getNumberOfWaysToWin(times[i], distances[i]);
  }

  console.log("Day 6 Challenge 1:", marginOfError);
});
