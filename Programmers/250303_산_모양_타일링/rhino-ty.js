// 처음엔 완전 탐색느낌으로 DFS를 구현하려고 했다가 N의 제한사항 덕분에 다른 방법으로 바꿨음
// DP로 접근해야할 듯, 전체 경우의 수에 대해 탐색 후 DP 저장 및 계산
// 1. 각 위치별로 상태를 두 가지로 나눔
//    - 평평하게 끝난 상태
//    - 위로 튀어나온 상태
// 2. DP 배열 초기값 설정
// 3. i=1부터 n까지 각 위치별로 이전 상태에서 계산
//    - tops[i-1]에 따라 규칙 다르게 적용
//    - 삼각형이 있으면 경우의 수가 더 많아짐
// 4. 각 계산마다 나머지(MOD) 연산 적용
// 5. 마지막 위치에서 두 상태 합쳐서 반환

// function solution(n, tops) {
//   const MOD = 10007;

//   // dp[i][0]: i번째 위치에서 평평하게 끝나는 경우의 수
//   // dp[i][1]: i번째 위치에서 위로 튀어나온 상태로 끝나는 경우의 수
//   const dp = Array.from({ length: n + 1 }, () => [0, 0]);

//   // 초기 상태 설정, 평평한 상태로 시작
//   dp[0][0] = 1;
//   dp[0][1] = 1;

//   for (let i = 1; i <= n; i++) {
//     // 위에 삼각형이 있는 경우
//     if (tops[i - 1] === 1) {
//       dp[i][0] = (dp[i - 1][0] * 3 + dp[i - 1][1] * 2) % MOD;
//       dp[i][1] = (dp[i - 1][0] * 2 + dp[i - 1][1] * 2) % MOD;
//     }
//     // 위에 삼각형이 없는 경우
//     else {
//       dp[i][0] = (dp[i - 1][0] * 2 + dp[i - 1][1] * 1) % MOD;
//       dp[i][1] = (dp[i - 1][0] * 1 + dp[i - 1][1] * 1) % MOD;
//     }
//   }

//   // 마지막 위치에서 두 상태의 합 반환
//   return (dp[n][0] + dp[n][1]) % MOD;
// }

// 위 코드는 상태 정의(평평함/튀어나옴)와 전이 규칙이 실제 문제에서 제시하는 타일 배치 특성(1번/2번/3번/4번 타일)을 정확히 모델링하지 못했음.

// https://tech.kakao.com/posts/610 참고해서 다시 풀어봄
function solution(n, tops) {
  const MOD = 10007;

  // rightDiamond[k]: k번째 아래 방향 정삼각형까지 덮되, k번째에 3번 방법(오른쪽 마름모)을 적용한 경우의 수
  // otherTiles[k]: k번째 아래 방향 정삼각형까지 덮되, k번째에 3번 방법이 아닌 방법을 적용한 경우의 수
  let rightDiamond = Array(n + 1).fill(0);
  let otherTiles = Array(n + 1).fill(0);

  // 초기 상태 설정
  rightDiamond[0] = 0;
  otherTiles[0] = 1;

  for (let k = 1; k <= n; k++) {
    // Case 1: k번째 아래 방향 정삼각형 위에 정삼각형이 붙은 경우
    if (tops[k - 1] === 1) {
      rightDiamond[k] = (rightDiamond[k - 1] + otherTiles[k - 1]) % MOD;
      otherTiles[k] = (2 * rightDiamond[k - 1] + 3 * otherTiles[k - 1]) % MOD;
    }
    // Case 2: k번째 아래 방향 정삼각형 위에 정삼각형이 붙지 않은 경우
    else {
      rightDiamond[k] = (rightDiamond[k - 1] + otherTiles[k - 1]) % MOD;
      otherTiles[k] = (rightDiamond[k - 1] + 2 * otherTiles[k - 1]) % MOD;
    }
  }

  // 정답은 rightDiamond[n] + otherTiles[n]
  return (rightDiamond[n] + otherTiles[n]) % MOD;
}
