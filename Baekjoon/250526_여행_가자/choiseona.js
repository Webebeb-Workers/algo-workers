const fs = require("fs");
let [N, M, ...map] = fs.readFileSync("./input.txt").toString().trim().split("\n");
N = Number(N);
M = Number(M);
const destinations = map.pop().split(" ").map(Number);
map = map.map((row) => row.split(" ").map(Number));

// 자기 자신은 1
for (let i = 0; i < N; i++) {
  map[i][i] = 1;
}

// 플로이드 워셜로 노드에서 노드로 이동할 수 있는지 구하기
for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][k] && map[k][j]) map[i][j] = 1;
    }
  }
}

// 불가능한 곳 있으면 false
let isPossible = true;
for (let i = 0; i < M - 1; i++) {
  const current = destinations[i] - 1;
  const next = destinations[i + 1] - 1;
  if (!map[current][next]) {
    isPossible = false;
    break;
  }
}

console.log(isPossible ? "YES" : "NO");
