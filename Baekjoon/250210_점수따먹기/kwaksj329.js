const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((v) => v.split(' ').map(Number));

function getMaxSubmatrixSum(n, m, arr) {
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] =
        arr[i - 1][j - 1] + dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1];
    }
  }

  let maxSum = -Infinity;

  for (let i1 = 1; i1 <= n; i1++) {
    for (let j1 = 1; j1 <= m; j1++) {
      for (let i2 = i1; i2 <= n; i2++) {
        for (let j2 = j1; j2 <= m; j2++) {
          const sum =
            dp[i2][j2] - dp[i2][j1 - 1] - dp[i1 - 1][j2] + dp[i1 - 1][j1 - 1];
          maxSum = Math.max(maxSum, sum);
        }
      }
    }
  }

  return maxSum;
}

console.log(getMaxSubmatrixSum(n, m, arr));
