import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const cards = {
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
} as const;

const is5OfAKind = (hand: string) => {
  const cards = new Set(hand);
  return cards.size === 1;
};

const is4OfAKind = (hand: string) => {
  for (let j = 0; j < hand.length - 3; j++) {
    let count = 1;
    for (let i = 0; i < hand.length; i++) {
      if (i === j) continue;
      if (hand[i] === hand[j]) {
        count += 1;
      }
    }
    if (count === 4) return true;
  }
  return false;
};

const isFullHouse = (hand: string) => {
  if (is3OfAKind(hand)) {
    return new Set(hand).size === 2;
  }
  return false;
};

const is3OfAKind = (hand: string) => {
  for (let j = 0; j < hand.length - 2; j++) {
    let count = 1;
    for (let i = 0; i < hand.length; i++) {
      if (i === j) continue;
      if (hand[i] === hand[j]) {
        count += 1;
      }
    }
    if (count === 3) return true;
  }
  return false;
};

const isTwoPair = (hand: string) => {
  const cards = new Set(hand);
  return cards.size === hand.length - 2;
};

const isOnePair = (hand: string) => {
  const cards = new Set(hand);
  return cards.size === hand.length - 1;
};

const isHighCard = (hand: string) => {
  const cards = new Set(hand);
  return cards.size === hand.length;
};

const getValueOfHand = (hand: string): number => {
  if (is5OfAKind(hand)) {
    return 6;
  }

  if (is4OfAKind(hand)) {
    return 5;
  }

  if (isFullHouse(hand)) {
    return 4;
  }

  if (is3OfAKind(hand)) {
    return 3;
  }

  if (isTwoPair(hand)) {
    return 2;
  }

  if (isOnePair(hand)) {
    return 1;
  }

  if (isHighCard(hand)) {
    return 0;
  }

  return 0;
};

const handSorter = (hand1: string, hand2: string): number => {
  const valueDifference = getValueOfHand(hand1) - getValueOfHand(hand2);
  if (valueDifference !== 0) return valueDifference;

  for (let i = 0; i < hand1.length; i++) {
    const cardDifference = cards[hand1[i]] - cards[hand2[i]];
    if (cardDifference !== 0) return cardDifference;
  }

  return 0;
};

it("is the solution to day 7 challenge 1", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const hands = input.split("\n").map((line) => line.trim().split(" "));

  hands.sort((a, b) => handSorter(a[0], b[0]));

  let sum = 0;
  for (let i = 0; i < hands.length; i++) {
    sum += Number.parseInt(hands[i][1]) * (i + 1);
  }

  console.log("Day 7 Challenge 1:", sum);
});
