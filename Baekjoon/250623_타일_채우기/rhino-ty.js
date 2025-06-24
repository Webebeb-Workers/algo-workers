// DP 문제, 계산을 해보니 1일 땐 0, 2일 땐 3, 3일 땐 0, 4일 땐 9
// 홀수일 때는 0이고, 짝수일 때는 3에 거듭제곱이 일어난다

function solveTiling(N) {
  if (N === 0) {
    return 0;
  }

  if (N === 1) {
    return 0;
  }

  // 홀수 N: 항상 0
  if (N % 2 === 1) {
    return 0;
  }

  // 짝수 N: 3^(N/2)
  return Math.pow(3, N / 2);
}

const N = require('fs').readFileSync(0).toString();
console.log(solveTiling(Number(N)));
