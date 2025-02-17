function check(row, col, value) {
  checkRow[row] = value;
  checkCol[col] = value;
  checkDiag[row + col] = value;
  checkReDiag[row - col + (N - 1)] = value;
}

function dfs(row, count) {
  if (count == N) result++;
  if (row >= N) return;
  for (let col = 0; col < N; col++) {
    if (
      !checkRow[row] &&
      !checkCol[col] &&
      !checkDiag[row + col] &&
      !checkReDiag[row - col + (N - 1)]
    ) {
      check(row, col, true);
      dfs(row + 1, count + 1);
      check(row, col, false);
    }
  }
}

const N = Number(require("fs").readFileSync(0).toString().trim());

const map = new Array(N).fill(null).map(() => new Array(N).fill(false));
const checkRow = new Array(N).fill(false);
const checkCol = new Array(N).fill(false);
const checkDiag = new Array(N * 2).fill(false);
const checkReDiag = new Array(N * 2).fill(false);
let result = 0;

for (let col = 0; col < N; col++) {
  check(0, col, true);
  dfs(1, 1);
  check(0, col, false);
}

console.log(result);
