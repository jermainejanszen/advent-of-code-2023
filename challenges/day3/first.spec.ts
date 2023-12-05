import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const isADigit = (value: string): boolean => /\d/.test(value);

const isASymbol = (value: string): boolean => {
  return !(isADigit(value) || value === ".");
};

const isAdjacent = (schematic: string[], i: number, j: number): boolean => {
  for (let t = Math.max(0, i - 1); t < i + 2 && t < schematic.length; t++) {
    for (
      let u = Math.max(0, j - 1);
      u < j + 2 && u < schematic[0].length;
      u++
    ) {
      if (isASymbol(schematic[t][u])) {
        return true;
      }
    }
  }
  return false;
};

it("is the solution to day 3 challenge 1", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const schematic = input.split("\n").map((line) => line.trim());

  let sum = 0;

  for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic[0].length - 1; j++) {
      if (isADigit(schematic[i][j])) {
        if (isAdjacent(schematic, i, j)) {
          let number: string = schematic[i][j];
          let endingIndex = j;
          for (let k = j + 1; k < schematic[0].length; k++) {
            if (isADigit(schematic[i][k])) {
              number += schematic[i][k];
              endingIndex += 1;
            } else {
              break;
            }
          }
          for (let k = j - 1; k >= 0; k--) {
            if (isADigit(schematic[i][k])) {
              number = schematic[i][k] + number;
            } else {
              break;
            }
          }
          j = endingIndex;
          sum += Number.parseInt(number);
        }
      }
    }
  }

  console.log("Day 3 Challenge 1:", sum);
});
