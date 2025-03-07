// 1. 퀸은 행, 열, 대각선 이동할 수 있으니 검사 => 완전 탐색? ++ 백트래킹?
// 2. 체스를 모방한 2차원 배열 구현 ++ 1차원 배열로도 가능하다고 함.
// 3. 첫 번째 행부터 순회 시작
// 4. 각 열에 퀸을 놓아보며 DFS 진행 => 퀸의 공격 범위 고려한 백트래킹 사용해야함,,
//   - 상하, 좌우, 대각선(좌상-우하, 좌하-우상) 조건 체크 => 해당 row 이후는 체크 안해도 됨!
//   - 만일, 공격이 가능하지 않다면 그 자리에 true, DFS +1을 실행
// 5. 마지막 행까지 도달하면 해답 카운트

// 1. (0,0)에 퀸을 놓음 (true)
// 2. 다음 행 탐색 시도 (dfs)
// 3. 만약 해답을 못찾으면
// 4. (0,0)의 퀸을 제거 (false)
// 5. (0,1)에 퀸을 놓는 시도로 넘어감

function putQueens(N) {
  let count = 0;
  const board = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

  // 퀸의 공격 가능 경로 체크
  function isAttack(row, col) {
    // 아래 행은 놓지 않았기 때문에, 이전 행들만 확인하면 됨
    for (let i = 0; i < row; i++) {
      // 같은 열에 퀸이 있는지
      if (board[i][col]) return true;

      // 대각선 체크: 절댓값 사용
      // |현재 행 - 이전 행(i)| === |현재 열 - 놓인 퀸의 열 위치|
      if (Math.abs(row - i) === Math.abs(col - board[i].indexOf(true))) return true;
    }
    return false;
  }

  function dfs(row) {
    if (row === N) {
      count++;
      return;
    }

    for (let col = 0; col < N; col++) {
      if (!isAttack(row, col)) {
        board[row][col] = true;
        dfs(row + 1);
        board[row][col] = false;
      }
    }
  }

  dfs(0);
  return count;
}

const fs = require('fs');
const N = parseInt(fs.readFileSync('/dev/stdin').toString());
console.log(putQueens(N));
