import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const getNumberOfWinsForCard = (card: string): number => {
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
  return numberOfWins;
};

it("is the solution to day 4 challenge 2", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const cards = input.split("\n").map((card) => card.trim());

  const copies: number[] = new Array(cards.length).fill(1);
  let j = 0;
  for (let i = 0; i < cards.length; i++) {
    const wins = getNumberOfWinsForCard(cards[i]);
    for (let j = i + 1; j < Math.min(i + 1 + wins, copies.length); j++) {
      copies[j] = copies[j] + Math.max(copies[i], 1);
    }
  }

  const sum = copies.reduce((previous, current) => previous + current, 0);

  console.log("Day 4 Challenge 2:", sum);
});
