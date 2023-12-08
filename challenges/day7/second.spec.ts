import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

const cards = {
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  T: 9,
  J: 0,
  Q: 10,
  K: 11,
  A: 12,
} as const;

const is5OfAKind = (hand: string) => {
  const cards = new Set(hand);
  if (cards.size === 1) {
    return true;
  } else if (cards.size === 2) {
    if (cards.has("J")) return true;
  }
  return false;
};

const is4OfAKind = (hand: string) => {
  for (let j = 0; j < hand.length - 3; j++) {
    let count = 1;
    for (let i = 0; i < hand.length; i++) {
      if (i === j) continue;
      if (hand[i] === hand[j] || hand[i] === "J") {
        count += 1;
      }
    }
    if (count === 4) return true;
  }
  return false;
};

const isFullHouse = (hand: string) => {
  if (is3OfAKind(hand)) {
    const cards = new Set(hand);
    return (
      cards.size === hand.length - 3 ||
      (cards.size === hand.length - 2 && cards.has("J"))
    );
  }
  return false;
};

const is3OfAKind = (hand: string) => {
  for (let j = 0; j < hand.length - 2; j++) {
    let count = 1;
    for (let i = 0; i < hand.length; i++) {
      if (i === j) continue;
      if (hand[i] === hand[j] || hand[i] === "J") {
        count += 1;
      }
    }
    if (count === 3) return true;
  }
  return false;
};

const isTwoPair = (hand: string) => {
  const cards = new Set(hand);
  return (
    cards.size === hand.length - 2 ||
    (cards.size === hand.length - 1 && cards.has("J"))
  );
};

const isOnePair = (hand: string) => {
  const cards = new Set(hand);
  return (
    cards.size === hand.length - 1 ||
    (cards.size === hand.length && cards.has("J"))
  );
};

const isHighCard = (hand: string) => {
  const cards = new Set(hand);
  return cards.size === hand.length;
};

const getValueOfHand = (hand: string): number => {
  if (is5OfAKind(hand)) {
    console.log("IS 5", hand);
    return 6;
  }

  if (is4OfAKind(hand)) {
    console.log("IS 4", hand);
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

it("is the solution to day 7 challenge 2", async () => {
  const input = await readFile(join(__dirname, "sample.txt"), "utf-8");
  const hands = input.split("\n").map((line) => line.trim().split(" "));

  console.log(hands);
  hands.sort((a, b) => handSorter(a[0], b[0]));
  console.log(hands);

  let sum = 0;
  for (let i = 0; i < hands.length; i++) {
    sum += Number.parseInt(hands[i][1]) * (i + 1);
  }

  console.log("Day 7 Challenge 2:", sum);
});
