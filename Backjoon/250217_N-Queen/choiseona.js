const fs = require("fs");
const N = Number(fs.readFileSync("./input.txt").toString().trim());
const queen = Array.from({ length: N }, () => undefined);
let answer = 0;

const checkIsPossible = (row) => {
  for (let prevRow = 0; prevRow < row; prevRow++) {
    if (queen[prevRow] === queen[row] || Math.abs(row - prevRow) === Math.abs(queen[row] - queen[prevRow]))
      return false;
  }
  return true;
};

const DFS = (row) => {
  if (row === N) return answer++; // 모든 퀸을 놓았으면 count 증가

  for (let col = 0; col < N; col++) {
    queen[row] = col; // 각 행의 열 저장

    // 가능한 위치이면 다음행으로 이동
    if (checkIsPossible(row)) {
      DFS(row + 1);
    }
  }
};

DFS(0);
console.log(answer);
