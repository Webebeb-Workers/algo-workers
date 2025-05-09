// 시작 8:15, 끝 9:30

const fs = require("fs");
const [meta, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
let [R, C, T] = meta.split(" ").map(Number);
const map = array.map((numbers) => numbers.split(" ").map(Number));
const directions = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];
let airFresher = undefined;
for (let i = 0; i < R; i++) {
  if (map[i][0] === -1) {
    airFresher = [i, 0];
    break;
  }
}

while (T--) {
  // 미세먼지 확산
  const spreaded = Array.from({ length: R }, () => Array.from({ length: C }, () => 0));

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (map[i][j] <= 0) continue;

      const spreadAmount = Math.floor(map[i][j] / 5);
      let spreadCount = 0;
      for (const [dx, dy] of directions) {
        const [newY, newX] = [i + dy, j + dx];
        if (newY < 0 || newY >= R || newX < 0 || newX >= C) continue;
        if (map[newY][newX] === -1) continue;
        spreaded[newY][newX] += spreadAmount;
        spreadCount++;
      }
      map[i][j] -= spreadAmount * spreadCount;
    }
  }

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      map[i][j] += spreaded[i][j];
    }
  }

  // 공기 청정기 작동
  const [fresherTop, fresherBottom] = [airFresher[0], airFresher[0] + 1];

  // 위쪽 (반시계 방향)
  for (let i = fresherTop - 1; i > 0; i--) map[i][0] = map[i - 1][0];
  for (let j = 0; j < C - 1; j++) map[0][j] = map[0][j + 1];
  for (let i = 0; i < fresherTop; i++) map[i][C - 1] = map[i + 1][C - 1];
  for (let j = C - 1; j > 1; j--) map[fresherTop][j] = map[fresherTop][j - 1];
  map[fresherTop][1] = 0;

  // 아래쪽 (시계 방향)
  for (let i = fresherBottom + 1; i < R - 1; i++) map[i][0] = map[i + 1][0];
  for (let j = 0; j < C - 1; j++) map[R - 1][j] = map[R - 1][j + 1];
  for (let i = R - 1; i > fresherBottom; i--) map[i][C - 1] = map[i - 1][C - 1];
  for (let j = C - 1; j > 1; j--) map[fresherBottom][j] = map[fresherBottom][j - 1];
  map[fresherBottom][1] = 0;
}

// 공기청정기 값 -2 상쇄
const answer = map.reduce((rowAcc, row) => rowAcc + row.reduce((partialAcc, num) => partialAcc + num, 0), 0) + 2;
console.log(answer);
