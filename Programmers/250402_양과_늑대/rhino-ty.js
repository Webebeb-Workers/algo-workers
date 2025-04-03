// 완전탐색?? 이진트리 관련 이런 거 쓸 거 같았는데, 형태를 보니 모든 노드를 돌아다닐 수 있어 완탐으로 해결 가능(DFS같은)
//   - 그리디는 아님. 왜냐면 어떤 선택이 최종적으로 더 많은 양을 모을 수 있게 할지 미리 알기 어렵기 때문
//   - 각 노드마다 가면서 양 이상으로 늑대? or 없다면? return
//   - 양이 있다면 or 늑대가 양 미만이라면(데려갈 수 있다면) 등록 + 노드 번호 새김(중복 추가 방지)
// 즉, 양의 수, 늑대의 수, 방문한 노드들의 상태를 잘 관리해서 모든 경우의 수를 탐색한 뒤 반환할 예정

// 0. 최대 양 개수 변수 초기화
// 1. 트리 구조: edges 배열로 트리 구조 만들기, 양방향임(왔다 갔다 가능)
//    - 활용하기 좋은 형태로 재정의, 양/늑대 유무 표시는 info 배열로 바로 할 수 있으니 나둠
//    - 즉, 초기형태는 트리인데, 그래프로 더 확장
// 2. DFS 함수: 현재 노드, 방문한 노드 목록, 현재 양의 수, 현재 늑대의 수
//   - 기저: 늑대의 수가 양의 수 이상이면 탐색 중단하고 return
//   - 현재까지 방문한 노드들로부터 연결된 모든 "미방문 노드 탐색": 방문한 노드 목록은 그냥 Set으로 관리할 예정
//   - 미방문 노드에 대해 방문 처리, 양-늑대 수 갱신, DFS 재귀 호출, 상위 변수 최대 양 개수 갱신
// 3. DFS 함수 실행 및 최대 양 개수 변수 반환

function solution(info, edges) {
  let maxSheepCnt = 0;

  const graph = createGraph(edges, info.length);

  function dfs(curNode, visited, sheepCnt, wolfCnt) {
    if (info[curNode]) {
      wolfCnt++;
    } else {
      sheepCnt++;
      maxSheepCnt = Math.max(maxSheepCnt, sheepCnt);
    }

    if (sheepCnt <= wolfCnt) {
      return;
    }

    visited.add(curNode);

    // 방문한 모든 노드에서 "연결된 미방문 노드"로 이동 시도
    for (const visitedNode of visited) {
      for (const nextNode of graph[visitedNode]) {
        if (!visited.has(nextNode)) {
          // 새로운 방문 집합 만들어서 재귀 호출해야함 (참조값 문제)
          const newVisited = new Set(visited);
          dfs(nextNode, newVisited, sheepCnt, wolfCnt);
        }
      }
    }
  }

  dfs(0, new Set(), 0, 0); // curNode, visited, sheepCnt, wolfCnt

  return maxSheepCnt;
}

function createGraph(edges, nodeCnt) {
  // fill([]) 안 쓴 이유는 같은 주솟값을 가진 배열들을 할당하기 때문에
  const graph = Array.from({ length: nodeCnt }, () => []);

  for (const [parent, child] of edges) {
    // 양방향
    graph[parent].push(child);
    graph[child].push(parent);
  }

  return graph;
}
