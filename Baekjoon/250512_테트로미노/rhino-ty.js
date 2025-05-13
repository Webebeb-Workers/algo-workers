// 회전이 1개 ~ 4개로 나뉘는 5개의 도형 변형을, 최대 500 x 500 매트릭스를 배치
// 최대 19개의 도형을 NxM 매트릭스를 고려해야 하다보니 부분 칸의 선택이 최적 값으로 나오지도 않고, 겹치는 부분도 없고!
// => 시간 복잡도 생각했을 때, 완전 탐색으로 해결 가능, 최적화 방안은 생각이 안남,,

// 1. 5가지 테트로미노의 모든 회전/대칭 변형을 미리 정의
// 2. N×M 격자의 모든 위치 순회
//    - 각 위치에서 가능한 모든 테트로미노 변형 시도
//    - 해당 테트로미노가 격자 범위를 벗어나지 않는지 확인
//    - 유효하다면 4개 칸의 숫자 합 계산
// 3. 계산된 합 중 최댓값 반환

function getMaxTetInPaper(N, M, numMatrix) {
  const TETROMINOS_NUM = 4;
  let max = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const tetLen = TETROMINOS.length;
      for (let t = 0; t < tetLen; t++) {
        const curTet = TETROMINOS[t];
        let sum = 0;
        let isValid = true;

        for (let k = 0; k < TETROMINOS_NUM; k++) {
          const newRow = i + curTet[k][0];
          const newCol = j + curTet[k][1];

          if (newRow < 0 || newRow >= N || newCol < 0 || newCol >= M) {
            isValid = false;
            break;
          }

          sum += numMatrix[newRow][newCol];
        }

        if (isValid) max = Math.max(max, sum);
      }
    }
  }

  return max;
}

const TETROMINOS = [
  // I자형 (작대기): 2가지 변형
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],

  // O자형 (정사각형): 1가지 변형
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],

  // T자형: 4가지 변형
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 1],
  ],

  // L자형: 8가지 변형
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 0],
    [2, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
  ],

  // Z/S자형: 4가지 변형
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
  ],
  [
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 0],
  ],
  [
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
];

const fs = require('fs');
const [[N, M], ...numMatrix] = fs
  .readFileSync(0)
  .toString()
  .split('\n')
  .map((i) => i.split(' ').map(Number));
console.log(getMaxTetInPaper(N, M, numMatrix));
