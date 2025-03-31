// 간선마다 가중치가 있는 최단 거리 => 다익스트라: 우선순위 큐 + 매 간선마다 가중치 비교
// + 특이함: 경로 상 내의 최소 intensity를 찾아야 함, 특정 출입구 왕복, 중간에 다른 출입구 방문 불가
//    => 연속된 intensity, 즉 인접한 간선의 가중치만 생각 해도 됨, 총합 정도만..?

function solution(n, paths, gates, summits) {
  // 그래프 생성 & 양방향
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [i, j, w] of paths) {
    graph[i].push([j, w]);
    graph[j].push([i, w]);
  }

  // 출입구/산봉우리 Set: 빠른 조회 has 위해
  const gateSet = new Set(gates);
  const summitSet = new Set(summits);

  // 다익스트라 변형: 최소 intensity 찾기
  const intensity = findMinIntensity(n, graph, gateSet, summitSet);

  // 결과 반환
  return findMinimumIntensitySummit(intensity, summits);
}

// 다익스트라 변형: 최소 intensity 찾기
function findMinIntensity(n, graph, gateSet, summitSet) {
  const intensity = Array(n + 1).fill(Infinity);
  // 우선순위 큐 대신 sort + 배열 사용할 예정: [지점, 현재까지의 intensity]
  //
  const queue = [];

  // 모든 출입구를 시작점으로 설정
  for (const gate of gateSet) {
    intensity[gate] = 0;
    queue.push([gate, 0]);
  }

  while (queue.length > 0) {
    // 우선순위 큐 역할하기 위해 sort 후 intensity가 가장 작은 노드 선택
    queue.sort((a, b) => a[1] - b[1]);
    const [current, currentIntensity] = queue.shift();

    // 스킵: 산봉우리 & 이미 더 작은 intensity 방문 체크
    if (currentIntensity > intensity[current]) continue;
    if (summitSet.has(current)) continue;

    // 인접 노드 탐색
    for (const [next, weight] of graph[current]) {
      // 출입구는 시작점으로만 사용하기 위해 제외
      if (gateSet.has(next)) continue;

      // 현재까지의 intensity와 새 간선 가중치 중 최대값 체크
      const newIntensity = Math.max(currentIntensity, weight);

      // 더 작은 intensity로 이동 가능하면 업데이트
      if (newIntensity < intensity[next]) {
        intensity[next] = newIntensity;
        queue.push([next, newIntensity]);
      }
    }
  }

  return intensity;
}

// 산봉우리 중 intensity가 최소인 것 찾기
function findMinimumIntensitySummit(intensity, summits) {
  return summits
    .sort((a, b) => a - b)
    .reduce(
      (min, summit) => {
        if (intensity[summit] < min[1]) {
          return [summit, intensity[summit]];
        }
        return min;
      },
      [0, Infinity],
    );
}
