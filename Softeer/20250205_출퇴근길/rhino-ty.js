// 1. 입력받은 간선들로 그래프 생성, 인접 리스트 방식으로 구현 (방향 그래프이므로 단방향으로만 연결)
// 2. S에서 도달 가능한 정점들을 찾는 함수 구현
//   - S를 시작점으로 하는 DFS를 수행 => 모든 경로를 찾는데 최적화
//   - 각 정점에서 T까지 도달 가능한지도 체크
//   - S에서 해당 정점을 거쳐 T까지 갈 수 있는 정점들의 집합을 반환
// 3. T에서 도달 가능한 정점들을 찾는 함수 구현
//   - T를 시작점으로 하는 DFS를 수행 => 모든 경로를 찾는데 최적화
//   - 각 정점에서 S까지 도달 가능한지도 체크
//   - T에서 해당 정점을 거쳐 S까지 갈 수 있는 정점들의 집합을 반환
// 4. 2번과 3번에서 구한 두 집합에 모두 포함된 정점들의 개수가 답이 된다

// - 단순히 양방향으로 도달 가능한지만 체크하는 것이 아니라, 해당 정점을 거쳐서 최종 목적지(T 또는 S)까지 도달 가능한지를 확인해야 함
// - 사이클이 있을 수 있으므로 방문 체크 필요

function solution(N, M, edges, S, T) {
  // 두 개의 그래프 - 정방향과 역방향
  const graph = Array.from({ length: N + 1 }, () => []);
  const reverseGraph = Array.from({ length: N + 1 }, () => []);

  // 간선 정보로 그래프 구성
  for (const [from, to] of edges) {
    graph[from].push(to); // 정방향 간선 추가
    reverseGraph[to].push(from); // 역방향 간선 추가
  }

  // DFS로 방문 가능한 노드들을 찾는 함수
  // 재귀 호출 초과로 런타임 에러, 스택으로 변경
  function dfs(start, graph, visited) {
    const stack = [start];

    while (stack.length > 0) {
      const current = stack.pop();
      if (visited[current]) continue;

      visited[current] = true;
      for (const next of graph[current]) {
        if (!visited[next]) {
          stack.push(next);
        }
      }
    }
  }

  // 출근길에서 방문 가능한 노드들 체크
  const fromStart = Array(N + 1).fill(false);
  fromStart[T] = true; // 도착점은 미리 방문 처리 (마지막에만 방문해야 하므로)
  dfs(S, graph, fromStart);

  // 도착점에서 방문 가능한 노드들 체크
  const toEnd = Array(N + 1).fill(false);
  dfs(T, reverseGraph, toEnd);

  // 퇴근길에서 방문 가능한 노드들 체크
  const fromEnd = Array(N + 1).fill(false);
  fromEnd[S] = true; // 도착점은 미리 방문 처리
  dfs(T, graph, fromEnd);

  // 시작점에서 방문 가능한 노드들 체크
  const toStart = Array(N + 1).fill(false);
  dfs(S, reverseGraph, toStart);

  // 모든 조건을 만족하는 노드 개수 세기
  let answer = 0;
  for (let i = 1; i <= N; i++) {
    // 모든 조건을 만족하는 노드만 카운트
    if (fromStart[i] && fromEnd[i] && toStart[i] && toEnd[i]) {
      answer++;
    }
  }

  // S와 T는 제외해야 하므로 2를 뺌
  return answer - 2;
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const edges = input.slice(1, M + 1).map((line) => line.split(' ').map(Number));
const [S, T] = input[M + 1].split(' ').map(Number);

console.log(solution(N, M, edges, S, T));
