const fs = require("fs");

const [count, ...info] = fs.readFileSync(0).toString().trim().split("\n");

const [n, m] = count.split(" ").map(Number);
const vertexes = info.slice(0, -1);
const [home, work] = info[info.length - 1].split(" ").map(Number);

const toWorkGraph = Array.from({ length: n + 1 }, () => []);
const toHomeGraph = Array.from({ length: n + 1 }, () => []);

const visited1 = Array.from({ length: n + 1 }, () => false);
const visited2 = Array.from({ length: n + 1 }, () => false);
const visited3 = Array.from({ length: n + 1 }, () => false);
const visited4 = Array.from({ length: n + 1 }, () => false);

vertexes.forEach((vertex) => {
  const [x, y] = vertex.split(" ").map(Number);
  toWorkGraph[x].push(y);
  toHomeGraph[y].push(x);
});

const bfs = (start, visited, graph) => {
  const queue = [start];
  visited[start] = true;

  while (queue.length > 0) {
    const node = queue.shift();
    for (const next of graph[node]) {
      if (!visited[next]) {
        visited[next] = true;
        queue.push(next);
      }
    }
  }
};

visited1[work] = true;
visited2[home] = true;

bfs(home, visited1, toWorkGraph);
bfs(work, visited2, toWorkGraph);
bfs(home, visited3, toHomeGraph);
bfs(work, visited4, toHomeGraph);

let answer = 0;
for (let i = 1; i <= n; i++) {
  if (visited1[i] && visited2[i] && visited3[i] && visited4[i]) {
    answer++;
  }
}

console.log(answer - 2); // home, work 제거
