// 그래프 탐색(방향 그래프) + 무게 관계 추론 문제 => 완전 탐색 DFS/BFS
// 1. 방향 그래프 구성
//   - 무거운 물건 -> 가벼운 물건 방향으로 간선 연결
//   - 역방향 그래프도 구성 (가벼운 물건 -> 무거운 물건)
// 2. 각 물건(노드)에 대해 DFS/BFS로 연결된 모든 노드 탐색
//   - 원래 그래프로 해당 물건보다 가벼운 물건들 찾기
//   - 역방향 그래프로 해당 물건보다 무거운 물건들 찾기
//   - 두 결과를 합치면 비교 가능한 모든 물건 집합
// 3. 비교 불가능한 물건 수 계산
//   - 전체 물건 수 - 비교 가능한 물건 수 - 1 (자기자신 때문에)
// 4. 각 물건마다 위 과정 반복하여 결과 출력

function getUncountableThings(N, M, things) {
  // 방향 그래프 초기화: 무거운 물건 -> 가벼운 물건
  const graph = Array.from({ length: N + 1 }, () => []);
  // 역방향 그래프 초기화: 가벼운 물건 -> 무거운 물건
  const reverseGraph = Array.from({ length: N + 1 }, () => []);

  // 그래프 구성
  for (let i = 0; i < things.length; i++) {
    const [heavy, light] = things[i];
    graph[heavy].push(light); // 무거운 물건 -> 가벼운 물건
    reverseGraph[light].push(heavy); // 가벼운 물건 -> 무거운 물건
  }

  // 결과 저장 배열
  const result = [];

  // 각 물건마다 비교 불가능한 물건 개수 계산
  for (let i = 1; i <= N; i++) {
    // DFS로 가벼운 물건들 찾기
    const lighter = new Set();
    dfs(graph, i, lighter, new Array(N + 1).fill(false));

    // DFS로 무거운 물건들 찾기
    const heavier = new Set();
    dfs(reverseGraph, i, heavier, new Array(N + 1).fill(false));

    // 계산
    const uncomparableCount = N - lighter.size - heavier.size - 1; // 자기 자신 제외
    result.push(uncomparableCount);
  }

  return result.join('\n');
}

// DFS 함수
function dfs(graph, node, visited, check) {
  check[node] = true;

  for (const next of graph[node]) {
    if (!check[next]) {
      visited.add(next);
      dfs(graph, next, visited, check);
    }
  }
}

const fs = require('fs');
const [N, M, ...things] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.split(' ').map(Number));
console.log(getUncountableThings(N, M, things));
