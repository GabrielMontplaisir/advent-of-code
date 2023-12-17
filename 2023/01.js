const fs = require("fs");
const input = fs.readFileSync("01.txt", "utf-8");
const lines = input.split("\n");

const mappedNums = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const re = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;

const sum = lines
  .map((line) => {
    const nums = Array.from(line.matchAll(re), (m) => m[1]);
    const num = nums.map((num) => {
      if (mappedNums[num]) {
        return mappedNums[num];
      }
      return parseInt(num);
    });

    if (num.length === 1) return parseInt(`${num[0]}${num[0]}`);
    return parseInt(`${num[0]}${num[num.length - 1]}`);
  })
  .reduce((a, b) => a + b);

console.log(sum);
