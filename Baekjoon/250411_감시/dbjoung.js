// 사무실 크기 N*M
// 총 K개의 CCTV 설치. CCTV 종류는 다섯가지.
// CCTV는 감시할 수 있는 방향에 있는 칸 전체를 감시 가능.
// 단, 벽을 통과해 감시는 못함.
// 사각지대 : CCTV가 감시할 수 없는 영역
// CCTV 회전 가능. 단, 항상 90도로만 회전.
// 0은 빈칸, 6은 벽, 1-5는 CCTV.
// CCTV의 방향을 적절히 정해서, 사각지대의 최소 크기를 구하기.

// CCTV 방향의 모든 경우의 수를 구한다.

const movement = [0, [-1, 0], [0, 1], [1, 0], [0, -1]];

function checkBox(board, subBoard, x, y, dirs) {
  let canSeeSum = 0;
  for (const dir of dirs) {
    const [mx, my] = movement[dir];
    let [cx, cy] = [x, y];
    while (cx >= 0 && cx < board.length && cy >= 0 && cy < board[0].length) {
      if (board[cx][cy] == 6) break;
      if (!subBoard[cx][cy] && board[cx][cy] == 0) {
        canSeeSum++;
        subBoard[cx][cy] = true;
      }

      cx += mx;
      cy += my;
    }
  }

  return canSeeSum;
}

function getLeastBox(board, subBoard, x, y, v, dir) {
  if (v == 1) return checkBox(board, subBoard, x, y, [dir]);
  else if (v == 2) return checkBox(board, subBoard, x, y, [dir, dir + 2]);
  else if (v == 3)
    return checkBox(board, subBoard, x, y, [dir, dir + 1 > 4 ? 1 : dir + 1]);
  else if (v == 4)
    return checkBox(board, subBoard, x, y, [
      dir,
      dir + 1 > 4 ? 1 : dir + 1,
      dir + 2 > 4 ? dir + 2 - 4 : dir + 2,
    ]);
  else return checkBox(board, subBoard, x, y, [1, 2, 3, 4]);
}

function getCameraCase(cameraIndex, caseData, cases, caseList) {
  if (cases.length == caseData.length) {
    caseList.push([...cases]);
    return;
  }

  for (let s = 0; s < caseData[cameraIndex].length; s++) {
    cases.push(caseData[cameraIndex][s]);
    getCameraCase(cameraIndex + 1, caseData, cases, caseList);
    cases.pop();
  }
}

const [NM, ...text] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, M] = NM.split(" ").map(Number);
const board = text.map((line) => line.split(" ").map(Number));

const caseData = [];
const cameraPos = [];
let numOfWall = 0;

for (let n = 0; n < N; n++) {
  for (let m = 0; m < M; m++) {
    if (1 <= board[n][m] && board[n][m] <= 5)
      cameraPos.push([n, m, board[n][m]]);
    if (board[n][m] == 1 || board[n][m] == 3 || board[n][m] == 4)
      caseData.push([1, 2, 3, 4]);
    else if (board[n][m] == 2) caseData.push([1, 2]);
    else if (board[n][m] == 5) caseData.push([1]);
    else if (board[n][m] == 6) numOfWall++;
  }
}

const cases = [];
const caseList = [];
getCameraCase(0, caseData, cases, caseList);
let maxSee = 0;
for (const cameraCase of caseList) {
  const subBoard = new Array(N).fill(null).map(() => new Array(M).fill(false));

  let sum = 0;
  for (let i = 0; i < cameraPos.length; i++) {
    const [x, y, type] = cameraPos[i];
    const dir = cameraCase[i];

    sum += getLeastBox(board, subBoard, x, y, type, dir);
  }

  maxSee = Math.max(maxSee, sum);
}

console.log(N * M - (maxSee + numOfWall + cameraPos.length));
