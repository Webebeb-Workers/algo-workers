// 최적화 해법: 한 번 DFS로 서브트리 크기 구하기
function solution(n, wires) {
  // 전체 그래프 구성
  const graph = Array(n + 1)
    .fill()
    .map(() => []);
  for (const [a, b] of wires) {
    graph[a].push(b);
    graph[b].push(a);
  }

  let minDiff = n;

  // DFS: 각 정점을 루트로 하는 서브트리 크기 계산
  function dfs(node, parent, targetEdge) {
    // 제거할 간선을 만나면 탐색 중단
    if (
      parent !== -1 &&
      ((targetEdge[0] === parent && targetEdge[1] === node) || (targetEdge[0] === node && targetEdge[1] === parent))
    ) {
      return 0;
    }

    let size = 1;
    for (const neighbor of graph[node]) {
      if (neighbor !== parent) {
        size += dfs(neighbor, node, targetEdge);
      }
    }
    return size;
  }

  // 각 간선을 제거했을 때 연결 성분 크기 계산
  for (const wire of wires) {
    const compo1Size = dfs(wire[0], -1, wire);
    const compo2Size = n - compo1Size;

    const diff = Math.abs(compo1Size - compo2Size);
    minDiff = Math.min(minDiff, diff);
  }

  return minDiff;
}
