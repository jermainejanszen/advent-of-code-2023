import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const isADigit = (value: string): boolean => /\d/.test(value);

const extractNumber = (line: string, i: number): number => {
  let number: string = line[i];
  for (let k = i + 1; k < line.length; k++) {
    if (isADigit(line[k])) {
      number += line[k];
    } else {
      break;
    }
  }
  for (let k = i - 1; k >= 0; k--) {
    if (isADigit(line[k])) {
      number = line[k] + number;
    } else {
      break;
    }
  }

  return Number.parseInt(number);
};

const get1dAdjacentNumbers = (line: string, i: number): number[] => {
  const numbers: number[] = [];

  if (isADigit(line[i])) {
    numbers.push(extractNumber(line, i));
    return numbers;
  }

  if (i > 0 && isADigit(line[i - 1])) {
    numbers.push(extractNumber(line, i - 1));
  }

  if (i < line.length - 1 && isADigit(line[i + 1])) {
    numbers.push(extractNumber(line, i + 1));
  }

  return numbers;
};

const getAdjacentNumbers = (
  schematic: string[],
  i: number,
  j: number
): number[] => {
  let numbers: number[] = [];

  if (i > 0) {
    numbers = numbers.concat(get1dAdjacentNumbers(schematic[i - 1], j));
  }

  numbers = numbers.concat(get1dAdjacentNumbers(schematic[i], j));

  if (i < schematic.length - 1) {
    numbers = numbers.concat(get1dAdjacentNumbers(schematic[i + 1], j));
  }

  return numbers;
};

it("is the solution to day 3 challenge 2", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const schematic = input.split("\n").map((line) => line.trim());

  let sum = 0;

  for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic[0].length - 1; j++) {
      if (schematic[i][j] === "*") {
        const ratios = getAdjacentNumbers(schematic, i, j);
        if (ratios.length === 2) {
          sum += ratios[0] * ratios[1];
        }
      }
    }
  }

  console.log("Day 3 Challenge 2:", sum);
});
