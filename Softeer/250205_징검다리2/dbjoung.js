const fs = require("fs");
const [N, rockString] = fs.readFileSync(0).toString().split("\n");
const rocks = rockString.split(" ").map(Number);

const goUpRocks = new Array(rocks.length);
const goDownRocks = new Array(rocks.length);

const upArray = [];
const downArray = [];

for (let rockIndex = 0; rockIndex < rocks.length; rockIndex++) {
  const upRock = rocks[rockIndex];
  const downRock = rocks[rocks.length - 1 - rockIndex];

  if (upArray.length == 0 || upArray[upArray.length] < upRock)
    upArray.push(upRock);
  else if (upRock < upArray[0]) upArray[0] = upRock;
  else {
    let left = 0;
    let right = upArray.length;
    while (left < right) {
      let half = Math.floor((left + right) / 2);
      if (upArray[half] < upRock) left = half + 1;
      else right = half;
    }

    upArray[left] = upRock;
  }
  goUpRocks[rockIndex] = upArray.length;

  if (downArray.length == 0 || downArray[downArray.length] < downRock)
    downArray.push(downRock);
  else if (downRock < downArray[0]) downArray[0] = downRock;
  else {
    let left = 0;
    let right = downArray.length;
    while (left < right) {
      let half = Math.floor((left + right) / 2);
      if (downArray[half] < downRock) left = half + 1;
      else right = half;
    }

    downArray[left] = downRock;
  }
  goDownRocks[rocks.length - 1 - rockIndex] = downArray.length;
}

let result = 0;
for (let i = 0; i < rocks.length; i++) {
  result = Math.max(goUpRocks[i] + goDownRocks[i], result);
}

console.log(result - 1);
