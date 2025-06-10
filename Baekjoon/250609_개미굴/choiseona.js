const fs = require("fs");
const [meta, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const N = Number(meta);

class Node {
  constructor() {
    this.children = new Map();
  }
}

// 개미굴 입구
const root = new Node();

for (let i = 0; i < N; i++) {
  const foodList = array[i].split(" ").slice(1);

  let current = root; // 현재 트리의 위치
  for (const food of foodList) {
    if (!current.children.has(food)) current.children.set(food, new Node());
    current = current.children.get(food);
  }
}

function DFS(node, depth) {
  const sortedFoods = [...node.children.keys()].sort();
  for (let food of sortedFoods) {
    console.log(`${"--".repeat(depth)}${food}`);
    DFS(node.children.get(food), depth + 1);
  }
}

DFS(root, 0);
