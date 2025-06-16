const fs = require("fs");
const [meta, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const T = Number(meta);

// 의존하는 컴퓨터 해킹 전염
// 단방향 그래프
// 처음에 가중치 놓치고 BFS로 품,,, -> 다익스트라
// 귀찮아서 힙 없이 sort로 했더니 또 메모리 초과 -> 우선순위 큐

const getInput = () => {
  const input = [];
  for (let t = 0, i = 0; t < T; t++) {
    const [N, D, C] = array[i].split(" ").map(Number);
    const graph = Array.from({ length: N + 1 }, () => []);
    for (let d = i + 1; d < i + 1 + D; d++) {
      const [A, B, S] = array[d].split(" ").map(Number);
      graph[B].push({ node: A, time: S });
    }
    input.push({ graph, hacked: C });
    i += D + 1;
  }

  return input;
};

class PriorityQueue {
  constructor() {
    this.heap = [null];
  }

  length() {
    return this.heap.length - 1;
  }

  isEmpty() {
    return this.length() === 0;
  }

  push(item) {
    this.heap.push(item);
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);

    while (parent > 0 && this.heap[current][0] < this.heap[parent][0]) {
      [this.heap[current], this.heap[parent]] = [this.heap[parent], this.heap[current]];
      current = parent;
      parent = Math.floor(current / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    const min = this.heap[1];
    const last = this.heap.pop();

    if (this.length() === 0) return min;

    this.heap[1] = last;
    let current = 1;
    let leftChild = current * 2;
    let rightChild = current * 2 + 1;

    while (leftChild <= this.length()) {
      let smaller = leftChild;
      if (rightChild <= this.length() && this.heap[rightChild][0] < this.heap[leftChild][0]) {
        smaller = rightChild;
      }

      if (this.heap[current][0] <= this.heap[smaller][0]) break;

      [this.heap[current], this.heap[smaller]] = [this.heap[smaller], this.heap[current]];
      current = smaller;
      leftChild = current * 2;
      rightChild = current * 2 + 1;
    }

    return min;
  }
}

const 다익스트라 = (graph, start) => {
  const N = graph.length - 1;
  const cost = Array.from({ length: N + 1 }, () => Infinity);
  const pq = new PriorityQueue();

  cost[start] = 0;
  pq.push([0, start]);

  while (pq.length() > 0) {
    const [nowTime, nowNode] = pq.pop();

    for (const { node: next, time } of graph[nowNode]) {
      const newTime = nowTime + time;
      if (cost[next] > newTime) {
        cost[next] = newTime;
        pq.push([newTime, next]);
      }
    }
  }

  const times = cost.filter((time) => time !== Infinity);
  return [times.length, Math.max(...times)];
};

const solve = () => {
  for (const { graph, hacked } of getInput()) {
    const [time, count] = 다익스트라(graph, hacked);
    console.log(`${time} ${count}`);
  }
};

solve();
