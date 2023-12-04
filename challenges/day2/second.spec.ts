import { readFile } from "fs/promises";
import { join } from "path";
import { it } from "vitest";

it("is the solution to day 2 challenge 2", async () => {
  const input = await readFile(join(__dirname, "input.txt"), "utf-8");
  const lines = input.split("\n");

  let sum = 0;
  for (const line of lines) {
    const id = Number.parseInt(line.split(":", 2)[0].split(" ")[1]);

    const gameMinimum = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const sets = line.split(":", 2)[1].trim().split(";");
    for (const set of sets) {
      for (const color of set.split(",")) {
        const [value, colorString] = color.trim().split(" ");
        if (Number.parseInt(value) > gameMinimum[colorString]) {
          gameMinimum[colorString] = Number.parseInt(value);
        }
      }
    }

    const power = gameMinimum.red * gameMinimum.green * gameMinimum.blue;
    sum += power;
  }

  console.log("Day 2 Challenge 2:", sum);
});
