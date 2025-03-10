const fs = require("fs");
const [N, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");

const graph = Array.from({ length: Number(N) + 1 }, () => ({ time: 0, indegree: 0, next: [] }));
const result = Array.from({ length: Number(N) + 1 }, () => 0);

array.forEach((element, index) => {
  const to = index + 1;
  const [time, ...fromNodes] = element.split(" ").map(Number).slice(0, -1);

  graph[to].time = time;
  result[to] = time; // 건물 짓는데 걸리는 시간을 자기 자신으로 초기화

  fromNodes.forEach((from) => {
    graph[from].next.push(to);
    graph[to].indegree++;
  });
});

const queue = [];

// 진입 차수 0인 건물 큐에 삽입
graph.forEach((node, index) => {
  if (index === 0) return;
  if (node.indegree === 0) queue.push(index);
});

// 진입 차수가 0일 때만 건물을 큐에 삽입 (시간 초과 해결)
while (queue.length > 0) {
  const currentNode = queue.shift();

  for (const nextNode of graph[currentNode].next) {
    result[nextNode] = Math.max(result[nextNode], result[currentNode] + graph[nextNode].time);
    graph[nextNode].indegree--;

    if (graph[nextNode].indegree === 0) queue.push(nextNode);
  }
}

console.log(result.slice(1).join("\n"));
