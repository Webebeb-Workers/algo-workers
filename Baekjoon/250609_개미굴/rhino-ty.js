// 시뮬레이션, 트리를 만드는데 DFS/BFS를 사용해서 만들어야할 듯
// 1. 경로 정보 수집: 입력값에 보내준 경로 모음
// 2. 각 경로를 따라 트리 구축
// 3. 정렬해 출력: 같은 층에서는 사전순으로 정렬함

function buildAntHill(paths) {
  // 트리 구조: 각 노드는 {자식이름: 자식노드} 형태의 객체
  const root = {};

  // 경로 트리 추가, 겹침 처리 추가
  for (const path of paths) {
    // 시작점: 루트
    let cur = root;

    for (const food of path) {
      // 해당 방(노드)이 없으면 새로 생성
      if (!(food in cur)) {
        cur[food] = {};
      }
      // 다음 층으로 이동
      cur = cur[food];
    }
  }

  // 결과를 저장할 배열
  const result = [];

  // DFS: 트리 순회, 출력물 생성
  function dfs(node, depth = 0) {
    const children = Object.keys(node).sort();

    for (const child of children) {
      // 깊이만큼 "--" 추가
      const prefix = '--'.repeat(depth);
      result.push(prefix + child);

      // 자식 노드들 재귀적으로 방문, 깊이 +1
      dfs(node[child], depth + 1);
    }
  }

  dfs(root);
  return result.join('\n');
}

const input = require('fs').readFileSync(0).toString().split('\n');
const N = Number(input[0]);
const paths = [];
for (let i = 1; i <= N; i++) {
  const line = input[i].trim().split(' ');
  const path = line.slice(1);
  paths.push(path);
}
console.log(buildAntHill(paths));
