const fs = require("fs");
const input = fs.readFileSync("03.txt", "utf-8").split("\n");

const inputArray = input.reduce(
  (arr, line, y) => {
    // Numbers
    [...line.matchAll(/\d+/g)].map((el) => {
      if (el)
        return arr[0].push({
          type: "n",
          value: parseInt(el[0]),
          x_start: el.index - 1, // Start search at start of string - 1 spot
          x_end: el.index + el[0].length, // End search at end of string + 1 spots
          y_start: y - 1, // Start search at line above
          y_end: y + 1, // End search at line below
        });
    });

    // Symbols
    [...line.matchAll(/[^\d.]/g)].map((el) => {
      if (el) return arr[1].push({ type: "s", value: el[0], x: el.index, y });
    });

    return arr;
  },
  [[], []]
);

// console.log(inputArray);

// const matches = inputArray[0]
//   .filter((num) => {
//     return inputArray[1].some(
//       (sym) =>
//         sym.x >= num.x_start &&
//         sym.x <= num.x_end &&
//         sym.y >= num.y_start &&
//         sym.y <= num.y_end
//     );
//   })
//   .map((el) => el.value);

// part 2
const matches = inputArray[1]
  .filter((sym) => sym.value === "*")
  .map((sym) => {
    const gearNums = inputArray[0]
      .filter(
        (num) =>
          sym.x >= num.x_start &&
          sym.x <= num.x_end &&
          sym.y >= num.y_start &&
          sym.y <= num.y_end
      )
      .map((el) => el.value);

    if (gearNums.length === 2) return gearNums[0] * gearNums[1];

    return 0;
  });

console.log(matches);

const sum = matches.reduce((a, b) => a + b, 0);

console.log(sum);
