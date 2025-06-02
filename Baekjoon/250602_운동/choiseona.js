const fs = require("fs");
const [meta, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [V, E] = meta.split(" ").map(Number);

const graph = Array.from({ length: V + 1 }, () => Array.from({ length: V + 1 }, () => Infinity));

// 일방통행 그래프 생성
array.forEach((el) => {
  const [a, b, c] = el.split(" ").map(Number);
  graph[a][b] = c;
});

// 플로이드 워셜 - 모든 마을 사이 사이의 최단 도로 길이 구하기
for (let k = 1; k <= V; k++) {
  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
    }
  }
}

// 다시 시작점으로 돌아오는 최단길이 구하기
let min = Infinity;
for (let i = 1; i <= V; i++) {
  for (let j = 1; j <= V; j++) {
    min = Math.min(min, graph[i][j] + graph[j][i]);
  }
}

console.log(min === Infinity ? -1 : min);
