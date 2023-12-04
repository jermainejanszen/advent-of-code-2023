import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const isANumber = (value: string) => /\d/.test(value);

it("is the solution to day 1 challenge 1", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const lines = input.split("\n");

  let sum = 0;
  for (const line of lines) {
    let firstNumber: number | undefined = undefined;
    for (let i = 0; i < line.length; i++) {
      if (isANumber(line[i])) {
        firstNumber = Number.parseInt(line[i]);
        break;
      }
    }

    let lastNumber: number | undefined = undefined;
    for (let i = line.length - 1; i >= 0; i--) {
      if (isANumber(line[i])) {
        lastNumber = Number.parseInt(line[i]);
        break;
      }
    }

    sum += Number.parseInt(`${firstNumber}${lastNumber}`);
  }

  console.log("Day 1 Challenge 1:", sum);
});
