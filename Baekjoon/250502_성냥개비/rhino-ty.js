// DP로 접근? 점화식 자체가 특수한 케이스들이 많기 때문에 그냥 완전 탐색 + 메모라 비직관적
// 그리디로 접근해야할 듯? 아님 최솟값은 DP로 해야하나?
//   1. 최댓값: 자릿수가 무조건 많고, 1이 많이 쓰임 => 홀수는 7+1111... 짝수는 1로 다 채우면 그게 최댓값
//   2. 최솟값: 자릿수가 무조건 적어야함, 2-7은 한자리로 끝낼 수 있음. 가장 앞자리는 가능한 작은 수를 선택하고 나머지는 가능한 큰 자릿수 숫자로
// 최솟값이 좀 어려운데, 패턴이 복잡하고 특별 케이스가 많음..
// 첫 자리는 1로 시작하고 나머지는 최대한 0으로 채울 수 있음

const MATCH_COUNTS = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

function getMinMaxNums(N, stickNumArr) {
  const results = [];

  // i개 성냥으로 만들 수 있는 가장 작은 한 자리 숫자
  const min_num = Array(8).fill(Infinity);
  min_num[2] = 1;
  min_num[3] = 7;
  min_num[4] = 4;
  min_num[5] = 2; // 2, 3, 5 중 가장 작은 숫자
  min_num[6] = 0; // 두 번째 자리부터는 0이 가능
  min_num[7] = 8;

  // 최솟값 DP 배열 초기화 (최대 입력값까지)
  const dp = Array(101).fill(Infinity); // 문제 제약 조건: n ≤ 100

  // 초기값 설정
  dp[2] = 1;
  dp[3] = 7;
  dp[4] = 4;
  dp[5] = 2;
  dp[6] = 6; // 첫 자리에는 0이 올 수 없으므로 6
  dp[7] = 8;

  // DP 테이블 채우기 (상향식)
  for (let i = 8; i <= 100; i++) {
    for (let j = 2; j <= 7; j++) {
      if (i - j >= 2) {
        // dp[i-j]가 초기화되지 않은 경우 처리
        if (dp[i - j] === Infinity) continue;

        // 점화식 적용: dp[i] = min(dp[i], dp[i-j]*10 + min_num[j])
        const newValue = dp[i - j] * 10 + min_num[j];
        dp[i] = Math.min(dp[i], newValue);
      }
    }
  }

  // 최댓값, 각 테스트 케이스별로 처리
  for (let i = 0; i < N; i++) {
    const n = stickNumArr[i];

    // 최댓값 구하기
    let max = '';
    let remainingForMax = n;
    // 홀수, 짝수 나눠서 만듦
    if (remainingForMax % 2 === 1) {
      max += '7';
      remainingForMax -= 3;
    }
    while (remainingForMax >= 2) {
      max += '1';
      remainingForMax -= 2;
    }

    // 최솟값은 만든 DP 테이블에서 가져오기
    let min = dp[n].toString();

    results.push(`${min} ${max}`);
  }

  return results.join('\n');
}

// // 최솟값 구하기
// let min = '';
// // 특별 케이스 처리
// if (n === 2) {
//   min = '1';
// } else if (n === 3) {
//   min = '7';
// } else if (n === 4) {
//   min = '4';
// } else if (n === 5) {
//   min = '2';
// } else if (n === 6) {
//   min = '6'; // 0은 첫 자리에 올 수 없음
// } else if (n === 7) {
//   min = '8';
// } else {
//   min = findMiniNum(n);
// }
// // 최솟값 그리디
// function findMiniNum(n) {
//   // 특별 케이스 하드코딩
//   if (n === 8) return '10';
//   if (n === 9) return '18';
//   if (n === 10) return '22';
//   if (n === 11) return '20';
//   if (n === 12) return '28';
//   if (n === 13) return '100';
//   if (n === 14) return '128';
//   if (n === 15) return '108';
//   if (n === 16) return '188';
//   if (n === 17) return '200';

//   // 첫 자리는 1로 시작하고 나머지는 최대한 0으로 채우기
//   let result = '1';
//   let remaining = n - 2; // 1은 2개 사용

//   // 남은 성냥으로 최대한 0 사용 (6개씩)
//   while (remaining >= 6) {
//     result += '0';
//     remaining -= 6;
//   }

//   // 남은 성냥개비로 마지막 자리 처리
//   if (remaining === 2) result += '1';
//   else if (remaining === 3) result += '7';
//   else if (remaining === 4) result += '4';
//   else if (remaining === 5) result += '2';

//   return result;
// }

// const MATCH_COUNTS = {
//   0: 6,
//   1: 2,
//   2: 5,
//   3: 5,
//   4: 4,
//   5: 5,
//   6: 6,
//   7: 3,
//   8: 7,
//   9: 6,
// };

const fs = require('fs');
const [N, ...stickNumArr] = fs.readFileSync(0).toString().trim().split('\n').map(Number);
console.log(getMinMaxNums(N, stickNumArr));
