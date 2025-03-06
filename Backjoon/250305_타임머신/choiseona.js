const fs = require("fs");
const [count, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [cityCount, busCount] = count.split(" ").map(Number);
const edges = array.map((element) => element.split(" ").map(Number));

// 최단 거리 배열
const dp = Array.from({ length: cityCount + 1 }, () => Infinity);
dp[1] = 0;

// 벨만-포드 실행 (N-1번 반복)
for (let count = 1; count <= cityCount - 1; count++) {
  for (const [from, to, time] of edges) {
    if (dp[from] !== Infinity && dp[from] + time < dp[to]) {
      dp[to] = dp[from] + time;
    }
  }
}

// 음수 사이클 확인 (N번째 반복)
let hasNegativeCycle = false;
for (const [from, to, time] of edges) {
  if (dp[from] !== Infinity && dp[from] + time < dp[to]) {
    hasNegativeCycle = true;
  }
}

// 결과 출력
if (hasNegativeCycle) {
  console.log(-1);
} else {
  for (let i = 2; i <= cityCount; i++) {
    console.log(dp[i] === Infinity ? -1 : dp[i]);
  }
}
