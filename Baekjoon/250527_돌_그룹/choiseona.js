const fs = require("fs");
const stones = fs.readFileSync("./input.txt").toString().trim().split(" ").map(Number);
const STONE_COUNT = 3;

const stoneSum = stones.reduce((acc, cul) => acc + cul, 0);
if (stoneSum % STONE_COUNT !== 0) return console.log("0");

const DFS = (stones, visited) => {
  if (stones[0] === stones[1] && stones[1] === stones[2]) return true;

  const sortedStones = stones.sort((a, b) => a - b);
  const key = sortedStones.join(",");
  if (visited.has(key)) return false;
  visited.add(key);

  for (let left = 0; left < STONE_COUNT; left++) {
    for (let right = left + 1; right < STONE_COUNT; right++) {
      const newStones = [...sortedStones];
      newStones[left] += sortedStones[left];
      newStones[right] -= sortedStones[left];

      if (DFS(newStones, visited)) return true;
    }
  }

  return false;
};

const visited = new Set();
const result = DFS(stones, visited);

console.log(result ? "1" : "0");
