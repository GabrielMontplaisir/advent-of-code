const fs = require("fs");
const input = fs.readFileSync("04.txt", "utf-8").split("\n");

const cards = input.map((card) => [...card.matchAll(/: (.+?) \| (.+)/g)]);
const numCards = new Array(cards.length).fill(1);

const points = cards.reduce((points, card, i) => {
  const winNums = card.map((line) => line[1].split(" "));
  const userNums = card.map((line) => line[2].split(" "));

  const matches = winNums[0].filter((n) => n && userNums[0].includes(n)).length;

  // part 1
  // if (matches > 0) return (points += Math.pow(2, matches - 1));

  // return points

  //part 2
  for (let j = i + 1; j <= i + matches; j++) {
    numCards[j] += numCards[i];
  }

  return (points += numCards[i]);
}, 0);

console.log(points);
