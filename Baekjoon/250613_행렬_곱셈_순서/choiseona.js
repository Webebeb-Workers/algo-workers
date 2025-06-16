const fs = require("fs");
const [meta, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const N = Number(meta);
const matrix = array.map((row) => row.split(" ").map(Number));

// i번부터 j번 행렬까지의 최소 연산 횟수
// dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k+1][j] + cost(i~k, k+1~j))

const dp = Array.from({ length: N + 1 }, () => Array.from({ length: N + 1 }, () => 0));

const getCost = (i, k, j) => matrix[i - 1][0] * matrix[k - 1][1] * matrix[j - 1][1];

for (let length = 2; length <= N; length++) {
  for (let i = 1; i <= N - length + 1; i++) {
    const j = i + length - 1;
    dp[i][j] = Infinity;
    for (let k = i; k < j; k++) {
      dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + getCost(i, k, j));
    }
  }
}

console.log(dp[1][N]);
