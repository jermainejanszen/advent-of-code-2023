import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

it("is the solution to day 3 challenge 1", async () => {
  const input = await readFile(join(__dirname, "sample.txt"), "utf-8");
  const lines = input.split("\n");

  let sum = 0;
  for (const line of lines) {
  }

  console.log("Day 3 Challenge 1:", sum);
});
