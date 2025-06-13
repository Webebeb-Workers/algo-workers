const fs = require("fs");
const [meta, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const N = Number(meta);
const board = array.map((row) => row.split(" ").map(Number));
const directions = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

// 바다(0)에 가장 짧은 다리 놓아 두 대륙 연결

// BFS로 각 섬 라벨링
const labeling = (board, startY, startX, visited, label) => {
  const height = board.length;
  const width = board[0].length;

  const queue = [[startY, startX]];
  visited[startY][startX] = true;
  board[startY][startX] = label;

  while (queue.length > 0) {
    const [y, x] = queue.shift();
    for (const [dy, dx] of directions) {
      const [newY, newX] = [y + dy, x + dx];
      if (newY < 0 || newX < 0 || newY >= height || newX >= width) continue;
      if (visited[newY][newX] || board[newY][newX] === 0) continue;
      queue.push([newY, newX]);
      visited[newY][newX] = true;
      board[newY][newX] = label;
    }
  }
};

// BFS로 다른 대륙과의 거리 가장 짧은 것 구하기
const getShortDistance = (board, startY, startX) => {
  const height = board.length;
  const width = board[0].length;
  const label = board[startY][startX];
  const visited = Array.from({ length: height }, () => Array.from({ length: width }, () => false));

  const queue = [[startY, startX, 0]];
  visited[startY][startX] = true;

  while (queue.length > 0) {
    const [y, x, distance] = queue.shift();

    for (const [dy, dx] of directions) {
      const [newY, newX] = [y + dy, x + dx];

      if (newY < 0 || newX < 0 || newY >= height || newX >= width) continue;
      if (visited[newY][newX] || label === board[newY][newX]) continue;

      // 바다면 전진
      if (board[newY][newX] === 0) {
        queue.push([newY, newX, distance + 1]);
        visited[newY][newX] = true;
      }

      // 다른 섬 만나면 종료
      else {
        return distance;
      }
    }
  }

  // 다른 섬 못 찾은 경우
  return Infinity;
};

let label = 2;
const visited = Array.from({ length: N }, () => Array.from({ length: N }, () => false));
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 0 || visited[y][x]) continue;
    labeling(board, y, x, visited, label);
    label++;
  }
}

let minnDistance = Infinity;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 0) continue;
    const distance = getShortDistance(board, y, x);
    minnDistance = Math.min(minnDistance, distance);
  }
}

console.log(minnDistance);
