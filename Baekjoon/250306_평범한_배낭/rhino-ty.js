// function getMaxThingsInBag(N, K, things) {
//   const dp = Array(N + 1)
//     .fill()
//     .map(() => Array(K + 1).fill(0));

//   // DP 배열 채우기
//   for (let i = 1; i <= N; i++) {
//     const [weight, value] = things[i - 1]; // 0-based 배열을 1-based로 변환

//     for (let w = 0; w <= K; w++) {
//       if (weight > w) {
//         dp[i][w] = dp[i - 1][w];
//       } else {
//         dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
//       }
//     }
//   }

//   return dp[N][K];
// }

// 1. 각 무게에서의 최대 가치를 배열로 관리하는 DP 방식 채택
// 2. 무게 한도(K)부터 현재 물건의 무게까지 역순으로 순회
// 3. 역순 순회는 현재 물건을 한 번만 고려하기 위해 필요
//   - 만약 순방향(0부터 K까지)으로 순회하면, 현재 물건을 추가한 후 갱신된 dp[w] 값을 사용해 같은 물건을 또 한 번 추가될 수 있음
//   - 역순으로 순회하면, 현재 물건을 고려하기 전의 상태(dp[w - weight])를 사용하게 되어, 한 물건을 중복해서 사용하는 것을 방지

function getMaxThingsInBag(N, K, things) {
  const dp = Array(K + 1).fill(0);

  // 각 물건에 대해 처리
  for (let i = 0; i < N; i++) {
    const [weight, value] = things[i];

    for (let w = weight; w <= K; w++) {
      dp[w] = Math.max(dp[w], dp[w - weight] + value);
      console.log(...dp);
    }

    // for (let w = K; w >= weight; w--) {
    //   dp[w] = Math.max(dp[w], dp[w - weight] + value);
    //   console.log(...dp);
    // }
  }

  return dp[K];
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').split('\n');
const [N, K] = input[0].split(' ').map(Number);
const things = input.slice(1).map((t) => t.split(' ').map(Number));

console.log(getMaxThingsInBag(N, K, things));

// 아이템의 개수 n = 4
// 가방의 최대 무게 k = 7

// 물건 1: 무게 6, 가치 13
// 물건 2: 무게 4, 가치 8
// 물건 3: 무게 3, 가치 6
// 물건 4: 무게 5, 가치 12
// 초기 dp 배열: [0, 0, 0, 0, 0, 0, 0, 0] (k+1개의 0)

// 물건 1 (무게 6, 가치 13)
// j = 7: dp[7] = max(dp[7], dp[7-6] + 13) = max(0, 0 + 13) = 13
// j = 6: dp[6] = max(dp[6], dp[6-6] + 13) = max(0, 0 + 13) = 13
// dp 배열: [0, 0, 0, 0, 0, 0, 13, 13]

// 물건 2 (무게 4, 가치 8)
// j = 7: dp[7] = max(dp[7], dp[7-4] + 8) = max(13, 0 + 8) = 13
// j = 6: dp[6] = max(dp[6], dp[6-4] + 8) = max(13, 0 + 8) = 13
// j = 5: dp[5] = max(dp[5], dp[5-4] + 8) = max(0, 0 + 8) = 8
// j = 4: dp[4] = max(dp[4], dp[4-4] + 8) = max(0, 0 + 8) = 8
// dp 배열: [0, 0, 0, 0, 8, 8, 13, 13]

// 물건 3 (무게 3, 가치 6)
// j = 7: dp[7] = max(dp[7], dp[7-3] + 6) = max(13, 8 + 6) = 14
// j = 6: dp[6] = max(dp[6], dp[6-3] + 6) = max(13, 0 + 6) = 13
// j = 5: dp[5] = max(dp[5], dp[5-3] + 6) = max(8, 0 + 6) = 8
// j = 4: dp[4] = max(dp[4], dp[4-3] + 6) = max(8, 0 + 6) = 8
// j = 3: dp[3] = max(dp[3], dp[3-3] + 6) = max(0, 0 + 6) = 6
// dp 배열: [0, 0, 0, 6, 8, 8, 13, 14]

// 물건 4 (무게 5, 가치 12)
// j = 7: dp[7] = max(dp[7], dp[7-5] + 12) = max(14, 8 + 12) = 14
// j = 6: dp[6] = max(dp[6], dp[6-5] + 12) = max(13, 0 + 12) = 13
// j = 5: dp[5] = max(dp[5], dp[5-5] + 12) = max(8, 0 + 12) = 12
// dp 배열: [0, 0, 0, 6, 8, 12, 13, 14]

// 결과: dp[7] = 14
