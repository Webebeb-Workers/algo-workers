// 완탐, 그리디하게는 못품

function solution(k, dungeons) {
  let maxDungeons = 0;

  // dfs 함수
  function dfs(curFatigue, visited, dungeonCnt) {
    // 최댓값 갱신: 현재까지 탐험한 던전 수
    maxDungeons = Math.max(maxDungeons, dungeonCnt);

    // 각 던전 시도
    for (let i = 0; i < dungeons.length; i++) {
      const [minRequired, cost] = dungeons[i];

      // 이미 방문했거나 피로도가 부족하면 건뛰
      if (visited[i] || curFatigue < minRequired) {
        continue;
      }

      // 던전 탐험
      visited[i] = true;
      dfs(curFatigue - cost, visited, dungeonCnt + 1);
      visited[i] = false; // 백트래킹
    }
  }

  // 방문 배열 초기화 (모든 던전을 방문하지 않은 상태)
  const visited = new Array(dungeons.length).fill(false);

  // dfs 시작
  dfs(k, visited, 0);

  return maxDungeons;
}
