import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

it("is the solution to day 4 challenge 1", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const cards = input.split("\n").map((card) => card.trim());

  let sum = 0;

  for (const card of cards) {
    const [winningNumbersRaw, pickedNumbersRaw] = card.split(":")[1].split("|");
    const winningNumbers = winningNumbersRaw
      .trim()
      .split(" ")
      .map((value) => Number.parseInt(value.trim()))
      .filter((value) => !Number.isNaN(value));
    const pickedNumbers = pickedNumbersRaw
      .trim()
      .split(" ")
      .map((value) => Number.parseInt(value.trim()))
      .filter((value) => !Number.isNaN(value));

    let firstWin: number | undefined = undefined;
    let numberOfWins = 0;
    for (const pickedNumber of pickedNumbers) {
      if (winningNumbers.includes(pickedNumber)) {
        if (firstWin === undefined) {
          firstWin = pickedNumber;
        }
        numberOfWins += 1;
      }
    }

    if (firstWin === undefined) {
      continue;
    }

    sum += Math.pow(2, numberOfWins - 1);
  }

  console.log("Day 4 Challenge 1:", sum);
});
