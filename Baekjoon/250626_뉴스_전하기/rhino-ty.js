// 한 번에 한 사람 씩 트리 구조에서 루트로부터 모든 노드까지 정보가 전파되는 최소 시간 계산
// 처음엔 BFS로 트리 높이를 구하는 문제인 줄 알았는데,, DFS로 한 번에 하나 씩 해야할 듯

function getMinTimeCompanyNews(N, bosses) {
  // 트리 구조: 인접 리스트 + 반복문으로 채우기
  const children = Array(N)
    .fill()
    .map(() => []);
  for (let i = 0; i < N; i++) {
    if (bosses[i] !== -1) {
      children[bosses[i]].push(i);
    }
  }

  // DFS: 각 노드에서 모든 부하에게 전화 완료하는데 걸리는 시간
  function calculateMinTime(node) {
    // 기저: 리프 노드
    if (children[node].length === 0) {
      return 0;
    }

    // 각 자식에 대해 재귀적으로 시간 계산
    const childTimes = [];
    for (const child of children[node]) {
      childTimes.push(calculateMinTime(child));
    }

    // 오래 걸리는 부하부터 먼저 전화
    childTimes.sort((a, b) => b - a);

    // 순서대로 전화
    let maxTime = 0;
    for (let i = 0; i < childTimes.length; i++) {
      // i번째 부하: i+1분에 전화 시작 + 그 부하의 완료 시간
      const totalTime = i + 1 + childTimes[i];
      maxTime = Math.max(maxTime, totalTime);
    }

    return maxTime;
  }

  return calculateMinTime(0);
}

// function getMinTimeCompanyNews(N, bossesStr) {
//   const bosses = bossesStr.split(' ').map(Number);

//   // 트리 구조: 인접 리스트 + 반복문으로 채우기
//   const children = Array(N)
//     .fill()
//     .map(() => []);
//   for (let i = 0; i < N; i++) {
//     if (bosses[i] !== -1) {
//       children[bosses[i]].push(i);
//     }
//   }

//   // BFS: 각 노드가 뉴스를 듣는 시간 계산
//   const queue = [[0, 0]]; // [노드 번호, 뉴스를 듣는 시간]
//   let maxTime = 0;
//   const newsTime = {}; // 각 노드가 뉴스를 듣는 시간 기록

//   while (queue.length > 0) {
//     const [curNode, curTime] = queue.shift();
//     newsTime[curNode] = curTime;
//     maxTime = Math.max(maxTime, curTime);

//     // 현재 노드의 모든 직속 부하들에게 뉴스 전달 => 1분 후
//     for (const child of children[curNode]) {
//       queue.push([child, curTime + 1]);
//     }
//   }

//   return maxTime;
// }

const [N, bosses] = require('fs').readFileSync(0).toString().split('\n');
console.log(getMinTimeCompanyNews(Number(N), bosses.split(' ').map(Number)));
