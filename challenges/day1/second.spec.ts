import { readFile } from "fs/promises";
import { join } from "path";
import { expect, it } from "vitest";

const numberStrings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;

const numberTree = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  e: {
    i: {
      g: {
        h: {
          t: 8,
        },
      },
    },
  },
  f: {
    i: {
      v: {
        e: 5,
      },
    },
    o: {
      u: {
        r: 4,
      },
    },
  },
  n: {
    i: {
      n: {
        e: 9,
      },
    },
  },
  o: {
    n: {
      e: 1,
    },
  },
  s: {
    e: {
      v: {
        e: {
          n: 7,
        },
      },
    },
    i: {
      x: 6,
    },
  },
  t: {
    h: {
      r: {
        e: {
          e: 3,
        },
      },
    },
    w: {
      o: 2,
    },
  },
};

const isANumber = (
  line: string,
  index: number,
  tree: object
): { value: number; endingIndex: number } | undefined => {
  if (index >= line.length || !tree) return;
  if (typeof tree === "number") return { value: tree, endingIndex: index - 1 };

  if (Object.keys(tree).includes(line[index])) {
    return isANumber(line, index + 1, tree[line[index]]);
  }
};

it("is the solution to day 1 challenge 2", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const lines = input.split("\n");

  let sum = 0;
  for (const line of lines) {
    let firstNumber: number | undefined = undefined;
    let lastNumber: number | undefined = undefined;
    for (let i = 0; i < line.length; i++) {
      const decodedNumber = isANumber(line, i, numberTree);
      if (decodedNumber !== undefined) {
        if (firstNumber === undefined) {
          firstNumber = decodedNumber.value;
        }
        lastNumber = decodedNumber.value;
      }
    }

    sum += Number.parseInt(`${firstNumber}${lastNumber}`);
  }

  console.log("Day 1 Challenge 2:", sum);
});
