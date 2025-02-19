const fs = require("fs");
const positions = fs.readFileSync("./input.txt").toString().trim().split(" ").map(Number).slice(0, -1);
const dp = Array.from({ length: positions.length }, () =>
  Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => -1))
);
// 증점 0, 위 1, 왼쪽 2, 아래 3, 오른쪽 4
// 처음은 중점, 두 발이 동시에 움직이지 않음, 두 발 같은 곳 안됨,
// 드는 힘 -> 중앙에서: 2, 인접 지점으로: 3, 반대편으로: 4, 같은 지점: 1

// 입력: 위치 (1 2 2 4)
// 출력: 최소 힘 (8)

const getMP = (from, to) => {
  if (from === to) return 1;
  if (from === 0) return 2;
  if (Math.abs(from - to) === 2) return 4;
  else return 3;
};

const DFS = (step, left, right) => {
  if (step >= positions.length) return 0; // 재귀 종료 조건

  // 이미 계산된 값이면 반환
  if (dp[step][left][right] !== -1) return dp[step][left][right];

  const position = positions[step];

  const leftMoveResult = DFS(step + 1, position, right) + getMP(left, position);
  const rightMoveResult = DFS(step + 1, left, position) + getMP(right, position);

  dp[step][left][right] = Math.min(leftMoveResult, rightMoveResult);

  return dp[step][left][right];
};

console.log(DFS(0, 0, 0));
