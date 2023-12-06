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

it("is the solution to day 6 challenge 2", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const lines = input.split("\n").map((line) => line.trim());

  const time = Number.parseInt(lines[0].split(":")[1].replace(/\s/g, ""));
  const distance = Number.parseInt(lines[1].split(":")[1].replace(/\s/g, ""));

  const waysToWin = getNumberOfWaysToWin(time, distance);

  console.log("Day 6 Challenge 2:", waysToWin);
});
