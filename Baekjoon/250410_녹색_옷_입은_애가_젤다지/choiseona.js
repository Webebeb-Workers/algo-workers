// 8:50 시작
// 9:56 끝

const fs = require("fs");
const [...iteration] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const direction = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

let index = 0;
const testCases = [];

while (index < iteration.length) {
  const N = Number(iteration[index]);
  if (N === 0) break;

  const map = [];
  for (let i = 1; i <= N; i++) {
    map.push(iteration[index + i].split(" ").map(Number));
  }

  testCases.push(map);
  index += N + 1;
}

// 잃는 금액 최소인 경로 구하기 -> 잃는 돈이라는 가중치 있는 경로 -> 다익스트라?

class PriorityQueue {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  isEmpty() {
    return this.size() === 0;
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

    if (this.size() === 0) return min;

    this.heap[1] = last;
    let current = 1;
    let leftChild = current * 2;
    let rightChild = current * 2 + 1;

    while (leftChild <= this.size()) {
      let smaller = leftChild;
      if (rightChild <= this.size() && this.heap[rightChild][0] < this.heap[leftChild][0]) {
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

for (let i = 0; i < testCases.length; i++) {
  const map = testCases[i];
  const mapLength = map.length;
  const minLose = Array.from({ length: mapLength }, () => Array.from({ length: mapLength }, () => Infinity));
  minLose[0][0] = map[0][0];

  const pq = new PriorityQueue();
  pq.push([map[0][0], 0, 0]); // lose, x, y

  while (!pq.isEmpty()) {
    const [lose, x, y] = pq.pop();

    for (const [dx, dy] of direction) {
      const [newX, newY] = [x + dx, y + dy];
      if (newX < 0 || newY < 0 || newX >= mapLength || newY >= mapLength) continue;

      const newLose = lose + map[newX][newY];

      if (newLose < minLose[newX][newY]) {
        minLose[newX][newY] = newLose;
        pq.push([newLose, newX, newY]);
      }
    }
  }

  console.log(`Problem ${i + 1}: ${minLose[mapLength - 1][mapLength - 1]}`);
}
