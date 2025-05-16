// 인구 포함 연결 양방향 그래프를 만들고, 조합을 만든 다음,
// 완전 탐색을 통해 2개의 선거구의 각 인구가 최소화 되도록 경우의 수를 탐색함
// 선거구를 지정할 때, 연결돼있어야함. 그리고 분리된 노드들이 있는데, 2개 초과되면 -1로 반환
// => 이 연결성 탐색은 조합 생성할 때 해야함. 만약 연결된 노드 뭉치가 2개면 2개의 선거구가 나왔으니 바로 인구수 반환,
//    3개 이상이면 이미 2개의 연결된 노드 뭉치 - 2개의 선거구를 만들 수 없으니 -1 반환해야함.

// 0. 그래프 생성 (인접 리스트)
// 1. 전체 그래프에서 연결된 컴포넌트 개수 확인
//    - 3개 이상이면 -1 반환
//    - 2개면 각각이 선거구가 됨
//    - 1개면 모든 조합을 시도
// 2. 1개인 경우: 모든 가능한 조합으로 나누기
//    - 각 조합이 연결돼 있는지 확인
//    - 나머지도 연결돼 있는지 확인
// 3. 최소 인구 차이 반환

function getMinBetweenDistricts(N, populars, areas) {
  const graph = Array.from({ length: N + 1 }, () => []);

  // 그래프 생성 (1-indexed)
  for (let i = 0; i < N; i++) {
    const [count, ...nodes] = areas[i];
    for (let j = 0; j < count; j++) {
      graph[i + 1].push(nodes[j]);
    }
  }

  const componentCount = countComponents(graph);

  // 3개 이상의 컴포넌트: 불가능
  if (componentCount >= 3) return -1;

  // 2개의 컴포넌트: 각각이 선거구
  if (componentCount === 2) {
    const visited = new Array(N + 1).fill(false);
    const groups = [];

    for (let i = 1; i <= N; i++) {
      if (!visited[i]) {
        const group = [];
        const queue = [i];
        visited[i] = true;

        while (queue.length > 0) {
          const cur = queue.shift();
          group.push(cur);

          for (const next of graph[cur]) {
            if (!visited[next]) {
              visited[next] = true;
              queue.push(next);
            }
          }
        }

        groups.push(group);
      }
    }

    return Math.abs(getPopulationSum(groups[0]) - getPopulationSum(groups[1]));
  }

  // 1개의 컴포넌트: 모든 조합 시도
  let minDiff = Infinity;

  // 모든 조합 생성: 비트마스크 (1 ~ 2^N-1)
  for (let mask = 1; mask < (1 << N) - 1; mask++) {
    const group1 = [];
    const group2 = [];

    for (let i = 0; i < N; i++) {
      if (mask & (1 << i)) {
        group1.push(i + 1);
      } else {
        group2.push(i + 1);
      }
    }

    // 두 그룹이 각각 연결되어 있는지 확인
    if (isConnected(group1, graph) && isConnected(group2, graph)) {
      const diff = Math.abs(getPopulationSum(group1) - getPopulationSum(group2));
      minDiff = Math.min(minDiff, diff);
    }
  }

  return minDiff === Infinity ? -1 : minDiff;
}

// 전체 연결 컴포넌트 개수 확인
function countComponents(graph) {
  const visited = new Array(N + 1).fill(false);
  let count = 0;

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      count++;
      const queue = [i];
      visited[i] = true;

      while (queue.length > 0) {
        const cur = queue.shift();

        for (const next of graph[cur]) {
          if (!visited[next]) {
            visited[next] = true;
            queue.push(next);
          }
        }
      }
    }
  }

  return count;
}

// 인구 합계 계산
function getPopulationSum(group) {
  return group.reduce((sum, idx) => sum + populars[idx - 1], 0);
}

// 연결된 구역 찾기: BFS
function isConnected(group, graph) {
  if (group.length === 0) return false;

  const visited = new Set();
  const queue = [group[0]];
  visited.add(group[0]);

  while (queue.length > 0) {
    const cur = queue.shift();

    for (const next of graph[cur]) {
      if (group.includes(next) && !visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }

  return visited.size === group.length;
}

const fs = require('fs');
const [N, populars, ...areas] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.split(' ').map(Number));

console.log(getMinBetweenDistricts(N, populars, areas));
