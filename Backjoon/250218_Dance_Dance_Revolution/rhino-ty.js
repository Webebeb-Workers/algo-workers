// 다양한 수의 최소/최대 합을 구하는 거니, DP 문제?
// 1. 현재 왼발/오른발 위치 원시타입으로 구현 => X, 각 발 위치 마다도, DP 값을 저장해야함
// 2. 입력 steps 값 만큼 DP 구현 => 발의 위치 만큼도 해야함 3차원 배열
// 3. steps 순회하며 각 양발의 위치마다(0 ~ 4) 최솟값을 구한 다음 DP 배열 갱신
//   - 현재 왼발/오른발 위치에서 다음 스텝을 왼발로 밟는 경우 & 다음 스텝을 오른발로 밟는 경우, 중 최소값을 선택
// 점화식 :
//   - 0 => 다른지점 : 2
//   - 같은지점 또 누르면 : 1
//   - `| 다른지점 => 다른지점의 차 |`가 1, 3일 때 : 3
//   - `| 다른지점 => 다른지점의 차 |`가 2일 때 : 4

function getPower(start, end) {
  if (start === 0) return 2;
  if (start === end) return 1;
  const minusAbs = Math.abs(start - end);
  if (minusAbs === 1 || minusAbs === 3) return 3;
  if (minusAbs === 2) return 4;
}

function calculateMinPower(steps) {
  const N = steps.length;
  let DP = Array(5)
    .fill()
    .map(() =>
      Array(5)
        .fill()
        .map(() => Array(N).fill(Infinity)),
    );

  function dfs(left, right, n) {
    // 기저
    if (n === N) return 0;
    // 메모이제이션
    if (DP[left][right][n] !== Infinity) return DP[left][right][n];

    DP[left][right][n] = Math.min(
      dfs(steps[n], right, n + 1) + getPower(left, steps[n]),
      dfs(left, steps[n], n + 1) + getPower(right, steps[n]),
    );

    return DP[left][right][n];
  }

  return dfs(0, 0, 0);
}

const fs = require('fs');
const steps = fs.readFileSync('/dev/stdin').toString().split(' ').map(Number);
steps.length = steps.length - 1; // 0 제거

console.log(calculateMinPower(steps));
