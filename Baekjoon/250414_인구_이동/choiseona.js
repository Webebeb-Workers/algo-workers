// 8:50 시작
// 두 나라 인구차가 L명 이상 R명 이하일 때만 인구 이동
// 각 칸의 인구수는 (연합의 인구수)/(연합을 이루고 있는 칸의 개수), 소수점 버리기
// 출력: 인구 이동이 며칠동안 발생하는지
// --------------------------------------
// bfs
// 저장해야하는 정보: 연합 개수, 연합들의 총 인구수 -> 연합 좌표 저장

const fs = require("fs");
const [meta, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, L, R] = meta.split(" ").map(Number);
const board = array.map((line) => line.split(" ").map(Number));
const direction = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

// BFS로 하나의 연합 찾기
const BFS = (startX, startY, visited) => {
  const queue = [[startX, startY]];
  const union = [[startX, startY]];
  visited[startX][startY] = true;

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    for (const [dx, dy] of direction) {
      const [newX, newY] = [x + dx, y + dy];
      if (newX < 0 || newY < 0 || newX >= N || newY >= N) continue;
      if (visited[newX][newY]) continue;
      const difference = Math.abs(board[x][y] - board[newX][newY]);
      if (difference < L || difference > R) continue;
      queue.push([newX, newY]);
      union.push([newX, newY]);
      visited[newX][newY] = true;
    }
  }
  return union;
};

// 연합 내 모든 나라의 인구수 재분배
const changeMap = (union) => {
  const sum = union.reduce((acc, [x, y]) => acc + board[x][y], 0);
  const population = Math.floor(sum / union.length);
  union.forEach(([x, y]) => (board[x][y] = population));
};

// 배열 돌았을 때 인구 이동 안됐으면 종료
let answer = 0;

while (true) {
  let moveFlag = false;
  const visited = Array.from({ length: N }, () => Array.from({ length: N }, () => false));

  board.forEach((row, rowIndex) => {
    row.forEach((country, columnIndex) => {
      if (visited[rowIndex][columnIndex]) return;
      const union = BFS(rowIndex, columnIndex, visited);
      if (union.length === 1) return;
      changeMap(union);
      moveFlag = true;
    });
  });

  if (!moveFlag) break;
  else answer++;
}

console.log(answer);
