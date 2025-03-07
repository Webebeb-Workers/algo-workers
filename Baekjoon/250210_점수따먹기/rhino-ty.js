// 부분행렬의 합 => 합을 여러번 계산 => 누적합 도출 => 2차원 배열의 누적합
// 0. 인풋 가공
// 1. 누적합 계산
//   - 2차원 배열 생성 0 으로
//   - (1,1) 부터 (N,M)까지 반복하며 누적합 생성
//   - sum(i, j)는 현재값과 누적값 상, 좌 값을 더하고, 중복을 빼주면 됨
// 2. 4중 반복문을 돌며 최댓값 비교
//   - 사각형 모양, 즉 x 시작 ~ x 끝과 y 시작 ~ y 끝으로 하여금 1 이상의 양수가 나오도록 해야함
//   - 부분행렬의 합을 구하기: (row, col)부터 (rowEnd, colEnd)일 때
//   - 누적합이므로 (row-1,colEnd), (rowEnd,col-1)를 (rowEnd, colEnd)에 빼주기
//   - 중복이 있으므로 (row-1,col-1)를 다시 더해주기
// 3. 리턴

function scoreMaxPoints(N, M, matrix) {
  // 1 based indexing, N과 M이 1부터 시작하니까
  const sumArr = Array.from({ length: N + 1 }, () => Array.from({ length: M + 1 }, () => 0));

  // 누적합 생성
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      sumArr[i][j] = matrix[i - 1][j - 1] + sumArr[i - 1][j] + sumArr[i][j - 1] - sumArr[i - 1][j - 1];
    }
  }

  let max = -Infinity;
  // 최댓값 비교, 4중 반복문
  for (let row = 1; row <= N; row++) {
    for (let col = 1; col <= M; col++) {
      for (let rowEnd = row; rowEnd <= N; rowEnd++) {
        for (let colEnd = col; colEnd <= M; colEnd++) {
          const partitialSum =
            sumArr[rowEnd][colEnd] - (sumArr[row - 1][colEnd] + sumArr[rowEnd][col - 1]) + sumArr[row - 1][col - 1];
          max = Math.max(max, partitialSum);
        }
      }
    }
  }

  return max;
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((str) => str.split(' ').map(Number));

console.log(scoreMaxPoints(N, M, matrix));

// 2차원 누적합 계산 과정
// 기본
// 2 3
// 5 6
// x 시작
// 2 5
// 5 11
// y 시작
// 2 5
// 7 16
