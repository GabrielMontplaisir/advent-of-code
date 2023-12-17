const fs = require("fs");
const input = fs.readFileSync("02.txt", "utf-8").split("\n");

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

// console.log(input);

const games = input.map((game) => [
  ...game.matchAll(/(\d+) (red|green|blue)/g),
]);

const sum = games.reduce((acc, game) => {
  const gameObj = game.reduce((obj, g) => {
    Object.keys(obj).includes(g[2])
      ? obj[g[2]] < parseInt(g[1])
        ? (obj[g[2]] = parseInt(g[1]))
        : obj[g[2]]
      : (obj[g[2]] = parseInt(g[1]));
    return obj;
  }, {});
  console.log(gameObj);

  // part 1
  // if (
  //   gameObj.red <= limits.red &&
  //   gameObj.blue <= limits.blue &&
  //   gameObj.green <= limits.green
  // ) {
  // return (acc += games.indexOf(game) + 1);
  // } else {
  //   return acc;
  // }

  return (acc += gameObj.red * gameObj.blue * gameObj.green); // part 2
}, 0);

console.log(sum);
