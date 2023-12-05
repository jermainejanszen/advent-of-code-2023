import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const getNumberOfWinsForCard = (
  card: string
): { cardNumber: number; wins: number } => {
  const cardNumber = Number.parseInt(card.split(":")[0].split(" ")[1]);

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
  return { cardNumber, wins: numberOfWins };
};

it("is the solution to day 4 challenge 2", async () => {
  const input = await readFile(join(__dirname, "sample.txt"), "utf-8");
  const cards = input.split("\n").map((card) => card.trim());

  const copies: number[] = new Array(cards.length).fill(1);
  for (const card of cards) {
    const { cardNumber, wins } = getNumberOfWinsForCard(card);
    for (
      let i = cardNumber;
      i < Math.min(cardNumber + wins, copies.length);
      i++
    ) {
      copies[i] = copies[i] + Math.max(copies[cardNumber - 1], 1);
    }
    console.log(cardNumber, wins, copies);
  }

  const sum = copies.reduce((previous, current) => previous + current, 0);

  console.log("Day 4 Challenge 2:", sum);
});
