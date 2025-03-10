function calcCount(rocks, numOfRock, H) {
  const tracks = new Array(H + 1).fill(0);
  const maxLength = rocks[numOfRock];

  for (let track = 1; track <= maxLength; track++) {
    let left = 1;
    let right = numOfRock;
    while (left < right) {
      const half = Math.floor((left + right) / 2);
      if (track <= rocks[half]) right = half;
      else left = half + 1;
    }

    tracks[track] = numOfRock - (left - 1);
  }
  //트랙별 개수 이분 탐색.

  return tracks;
}

const [nh, ...inputs] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [N, H] = nh.split(" ").map(Number);
const upRock = [0];
const downRock = [0];

for (let i = 1; i <= N; i++) {
  if (i % 2 == 0) upRock.push(Number(inputs[i - 1]));
  else downRock.push(Number(inputs[i - 1]));
}

upRock.sort((a, b) => a - b);
downRock.sort((a, b) => a - b);

const upResult = calcCount(upRock, N / 2, H);
const downResult = calcCount(downRock, N / 2, H);

let minSum = N;
let count = 0;
for (let i = 1; i <= H; i++) {
  const sum = downResult[i] + upResult[H - i + 1];
  if (minSum > sum) {
    minSum = sum;
    count = 1;
  } else if (minSum == sum) count += 1;
}

console.log(minSum, count);
