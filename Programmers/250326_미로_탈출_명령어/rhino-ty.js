// 총 이동 거리가 k
// 같은 격자를 여러 번 방문해도 됨
// 가능한 경로 중 사전순으로 가장 빠른 경로를 찾아야 함 => d, l, r, u 순으로 탐색하면 될 듯?
//   => DFS 속 그리디 느낌. 사전 순으로 방향을 모두 탐색하면 자동으로 사전 순 result가 쌓여짐
// (최단 거리 - k)의 차이가 홀수면 impossible 반환 (왕복이 짝수 단위로만 가능하기 때문) => 3번을 보면 알 수 있음
// 첫 시작이 d가 있으면 lru 시작 폐기, 2번째 시작이 d가 있으면 lru 폐기 이런 식으로 가지치기를 할 수도 있을 듯

function solution(n, m, x, y, r, c, k) {
  // 최단거리 계산: 점과 점사이
  const totalMinDist = getMinDist(x, y, r, c);
  // 불가능한 경우 체크: 최단거리가 k보다 크거나 그 차이가 홀수
  if (totalMinDist > k || (k - totalMinDist) % 2 !== 0) return 'impossible';

  // 사전순 방향
  const directions = [
    ['d', 1, 0],
    ['l', 0, -1],
    ['r', 0, 1],
    ['u', -1, 0],
  ];

  let result = '';

  function dfs(curX, curY, remainingMoves, path) {
    // 결과를 찾았을 때, dfs 함수가 진행되고 있는 것도 있으니 끝내기 => 가지치기
    if (result !== '') return;

    // 남은 이동 횟수로 목적지에 도달할 수 없는 경우 체크
    const distToTarget = getMinDist(curX, curY, r, c);
    if (distToTarget > remainingMoves || (remainingMoves - distToTarget) % 2 !== 0) {
      return;
    }

    // 목적지에 도달하고 남은 이동이 0이면 경로 저장
    if (curX === r && curY === c && remainingMoves === 0) {
      result = path;
      return;
    }

    // 남은 이동이 없으면 종료
    if (remainingMoves === 0) return;

    // 사전순으로 이동 시도 (d, l, r, u)
    for (const [dir, dx, dy] of directions) {
      const nextX = curX + dx;
      const nextY = curY + dy;

      // 격자 내에 있는지 확인, 재귀 설정
      if (nextX >= 1 && nextX <= n && nextY >= 1 && nextY <= m) {
        dfs(nextX, nextY, remainingMoves - 1, path + dir);
      }
    }
  }

  dfs(x, y, k, '');

  return result === '' ? 'impossible' : result;
}

// 점과 점사이 최솟값 구하기
function getMinDist(cx, cy, r, c) {
  return Math.abs(cx - r) + Math.abs(cy - c);
}
