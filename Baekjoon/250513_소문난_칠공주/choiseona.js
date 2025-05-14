// 시작: 8:45, 끝: 9:40
const fs = require("fs");
let [...map] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const width = 5;
const height = 5;
map = map.map((item) => item.split(""));
const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

// 이다솜파 4명이상, 총 7명
// 인접 자리만 가능
// 7명 결성하는 모든 경우의 수 구하기
// DFS, 백트래킹

const DFS = (count, dasomCount, selected, visited, set) => {
  if (count === 7) {
    if (dasomCount >= 4) {
      // 중복을 피하기 위해 Set에 추가
      set.add([...selected].sort().join(","));
    }
    return;
  }

  for (const position of selected) {
    const y = Math.floor(position / width);
    const x = position % width;

    for (const [dy, dx] of directions) {
      const [newY, newX] = [dy + y, dx + x];

      if (newX < 0 || newY < 0 || newX >= width || newY >= height) continue;
      if (visited[newY][newX]) continue;

      selected.push(width * newY + newX);
      visited[newY][newX] = true;

      //이다솜파인 경우 dasomCount 증가
      DFS(count + 1, dasomCount + (map[newY][newX] === "S" ? 1 : 0), selected, visited, set);

      selected.pop();
      visited[newY][newX] = false;
    }
  }
};

const visited = Array.from({ length: height }, () => Array.from({ length: width }, () => false));
const set = new Set();

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    visited[i][j] = true;
    DFS(1, map[i][j] === "S" ? 1 : 0, [width * i + j], visited, set);
    visited[i][j] = false;
  }
}

console.log(set.size);
