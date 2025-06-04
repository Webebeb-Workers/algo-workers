// 구현-시뮬레이션 문제: 체스판 위 말들이 특정 규칙에 따라 이동하며, 4개 이상 쌓이는 순간을 카운팅
// 칸에 따라 체스말의 처리가 달라짐
//   * 흰색(0): 그대로 이동하여 쌓기
//   * 빨간색(1): 이동 후 순서 뒤집어서 쌓기
//   * 파란색(2) 또는 범위밖: 방향 반대로 바꾸고 한 칸 이동

// 1. 입력 및 자료구조 초기화
//    - board: 체스판 색깔 정보 - 0:흰색, 1:빨간색, 2:파란색
//    - stackedHorses: 각 칸에 쌓인 말들의 번호 배열
//    - horseMap: 각 말의 [row, col, direction] 정보를 객체로 관리
//    - dr, dc: 방향벡터: 1:→, 2:←, 3:↑, 4:↓ (인덱스로)
//    - 입력된 보드, 말 파싱 후 순회해 정보 입력
// 2. 1~1000턴 시뮬레이션 루프
//    - 각 턴마다 1번~K번 말 순서대로 처리
// 3. 각 말 이동 처리
//    - horseMap에서 현재 말의 [r, c, d] 정보 가져오기
//    - 다음 위치 계산: nr = r + dr[d], nc = c + dc[d]
// 4. 이동 가능성 체크 및 방향 변경
//    - 범위밖 또는 파란색(2)
//      * horseMap[말번호][2] = [0,2,1,4,3][d]로 방향 반대로 변경
//      * 새 방향으로 다시 다음 위치 계산
//    - 바뀐 방향도 파란색이면 이동하지 않음
// 5. 실제 말 이동 처리
//    - stackedHorses[r][c].splice(indexOf(말번호))로 이동할 말들 추출+제거
//    - 이동하는 모든 말들의 horseMap 위치 정보 업데이트
//    - 목적지 칸 색깔에 따른 처리를 해줘야함
//      * 빨간색(1): movingHorses.reverse() 후 concat
//      * 흰색(0): 그대로 concat
// 6. 게임 종료 조건 체크
//    - stackedHorses[nr][nc].length >= 4이면 현재 턴 반환
//    - 1000턴 초과시 -1 반환

function solveHorseGame(N, K, input) {
  // 체스판 색깔 정보 (처음 N줄)
  const chessBoard = [];
  for (let i = 0; i < N; i++) {
    chessBoard.push(input[i].split(' ').map(Number));
  }

  // 각 칸의 말들: 말 번호로 저장, 3차원 배열
  const stackedHorses = Array(N)
    .fill()
    .map(() =>
      Array(N)
        .fill()
        .map(() => []),
    );

  // 각 말의 [row, col, direction] 정보
  const horseObj = {};

  // 말 정보 초기화
  for (let i = N; i < N + K; i++) {
    const [r, c, d] = input[i];
    const horseNum = i - N + 1;
    stackedHorses[r - 1][c - 1].push(horseNum);
    horseObj[horseNum] = [r - 1, c - 1, d];
  }

  for (let turn = 1; turn <= 1000; turn++) {
    for (let horseNum = 1; horseNum <= K; horseNum++) {
      let [r, c, d] = horseObj[horseNum];
      let nr = r + dr[d];
      let nc = c + dc[d];

      // 범위밖이거나 파란색인 경우
      if (nr < 0 || nr >= N || nc < 0 || nc >= N || board[nr][nc] === 2) {
        horseObj[horseNum][2] = [0, 2, 1, 4, 3][d]; // 방향 반대로
        nr = r + dr[horseObj[horseNum][2]];
        nc = c + dc[horseObj[horseNum][2]];
      }

      // 이동 가능한 경우
      if (0 <= nr && nr < N && 0 <= nc && nc < N && board[nr][nc] !== 2) {
        // splice로 현재 말부터 위 말들 모두 제거+추출
        let movingHorses = stackedHorses[r][c].splice(stackedHorses[r][c].indexOf(horseNum));

        // 이동하는 말들의 위치 정보 업데이트
        for (let horse of movingHorses) {
          horseObj[horse][0] = nr;
          horseObj[horse][1] = nc;
        }

        // 빨간색이면 순서 뒤집어서 쌓기
        if (board[nr][nc] === 1) {
          stackedHorses[nr][nc] = stackedHorses[nr][nc].concat(movingHorses.reverse());
        } else {
          stackedHorses[nr][nc] = stackedHorses[nr][nc].concat(movingHorses);
        }

        // 4개 이상 쌓였는지 확인
        if (stackedHorses[nr][nc].length >= 4) {
          return turn;
        }
      }
    }
  }
  return -1;
}

// 4개 이상 쌓였는지 확인
function checkGameEnd(stackedHorses) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (stackedHorses[i][j].length >= 4) {
        return true;
      }
    }
  }
  return false;
}

const [[N, K], ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((x) => x.split(' ').map(Number));
console.log(solveHorseGame(N, K, input));
