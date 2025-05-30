const fs = require("fs");
const [meta, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, M] = meta.split(" ").map(Number);
const board = array.map((row) => row.split(" ").map(Number));

// 실내 온도에 내어놓으면 고이와 접촉하여 천천히 녹음
// 2변 이상 실내온도의 공기와 접촉하면 한시간만에 녹음
// 치즈 내부 공간은 외부 공기와 접촉하지 않는 것으로 가정
// 치즈가 모두 녹아 없어지는데 걸리는 정확한 시간 구하기

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

const BFS = (board) => {
  const height = board.length;
  const width = board[0].length;
  const visited = Array.from({ length: height }, () => Array.from({ length: width }, () => false));

  const queue = [[0, 0]];
  visited[0][0] = true;

  while (queue.length > 0) {
    const [y, x] = queue.shift();
    for (const [dy, dx] of directions) {
      const [newY, newX] = [y + dy, x + dx];

      if (newY < 0 || newX < 0 || newY >= height || newX >= width) continue;

      if (board[newY][newX] === 0 && !visited[newY][newX]) {
        visited[newY][newX] = true;
        queue.push([newY, newX]);
      } else if (board[newY][newX] >= 1) {
        board[newY][newX]++;
      }
    }
  }
};

const meltCheese = (board) => {
  const height = board.length;
  const width = board[0].length;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j] > 2) board[i][j] = 0;
      else if (board[i][j] >= 1) board[i][j] = 1;
    }
  }
};

const checkHasCheese = (board) => board.some((row) => row.some((cell) => cell >= 1));

let answer = 0;

while (true) {
  const hasCheese = checkHasCheese(board);
  if (!hasCheese) break;
  answer++;
  BFS(board);
  meltCheese(board);
}

console.log(answer);
