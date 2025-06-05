const fs = require("fs");
const [meta] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, K] = meta.split(" ").map(Number);
const size = 100001;

const BFS = (start, end) => {
  const visited = Array.from({ length: size }, () => false);
  const parent = Array.from({ length: size }, () => undefined);
  const queue = [[start, 0]];
  visited[start] = true;

  while (queue.length > 0) {
    const [pos, count] = queue.shift();
    if (pos === end) return [count, parent];

    for (const next of [pos - 1, pos + 1, 2 * pos]) {
      if (visited[next]) continue;
      if (next < 0 || next >= size) continue;

      parent[next] = pos;
      queue.push([next, count + 1]);
      visited[next] = true;
    }
  }
};

const [count, parent] = BFS(N, K);
const countString = `${count}\n`;
let pathString = "";

let curr = K;
const path = [];
while (curr >= 0) {
  path.push(curr);
  curr = parent[curr];
}
pathString += path.reverse().join(" ");
console.log(countString + pathString);
