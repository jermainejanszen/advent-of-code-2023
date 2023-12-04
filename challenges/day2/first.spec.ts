import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

it("is the solution to day 2 challenge 1", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const lines = input.split("\n");

  let sum = 0;
  for (const line of lines) {
    const id = Number.parseInt(line.split(":", 2)[0].split(" ")[1]);

    const sets = line.split(":", 2)[1].trim().split(";");
    let isPossible = true;
    for (const set of sets) {
      if (!isPossible) break;
      for (const color of set.split(",")) {
        const [value, colorString] = color.trim().split(" ");
        if (Number.parseInt(value) > limits[colorString]) {
          isPossible = false;
          break;
        }
      }
    }

    if (isPossible) sum += id;
  }

  console.log("Day 2 Challenge 1:", sum);
});
