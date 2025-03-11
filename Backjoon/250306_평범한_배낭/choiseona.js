const fs = require("fs");
const [count, ...array] = fs.readFileSync("../../input.txt").toString().trim().split("\n");
const [N, K] = count.split(" ").map(Number);
const weights = array.map((el) => el.split(" ").map(Number));

// 배낭에 넣을 수 있는 물건들의 가치 최대값 구하기
// 최대 K 무게까지 가능

// 2차원 dp 초기화
const dp = Array.from({ length: N + 1 }, () => Array.from({ length: K + 1 }, () => 0));

for (let i = 1; i < N + 1; i++) {
  const [W, V] = weights[i - 1];
  for (let j = 1; j <= K; j++) {
    if (j - W >= 0) dp[i][j] = Math.max(dp[i - 1][j - W] + V, dp[i - 1][j]);
    else dp[i][j] = dp[i - 1][j];
  }
}

console.log(dp[N][K]);
