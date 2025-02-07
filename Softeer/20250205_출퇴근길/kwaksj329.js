const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const [nm, ...info] = input;
const [n, m] = nm.split(' ').map(Number);

const edges = info.slice(0, -1);
const [start, end] = info[info.length - 1].split(' ').map(Number);

// 그래프 생성 (정방향, 역방향)
const forward = Array.from({ length: n + 1 }, () => []);
const backward = Array.from({ length: n + 1 }, () => []);

for (const edge of edges) {
  const [from, to] = edge.split(' ').map(Number);
  forward[from].push(to);
  backward[to].push(from);
}

function bfs(start, graph) {
  const visited = new Array(n + 1).fill(false);
  const queue = [start];
  visited[start] = true;

  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];
    for (const next of graph[current]) {
      if (!visited[next]) {
        visited[next] = true;
        if (next === stop) continue; // 도착점 이후 탐색 방지
        queue.push(next);
      }
    }
  }
  return visited;
}

const fromStart = bfs(start, forward);
const fromEnd = bfs(end, forward);
const toStart = bfs(start, backward);
const toEnd = bfs(end, backward);

// 모든 방향에서 방문 가능한 노드 카운트
let count = 0;
for (let i = 1; i <= n; i++) {
  if (fromStart[i] && fromEnd[i] && toStart[i] && toEnd[i]) {
    count++;
  }
}

console.log(count - 2); // 시작점과 도착점 제외
