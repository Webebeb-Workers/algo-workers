// -1, +1, 2*X에 해당하는 3가지 경우의 수를 전체 탐색 후 몇 초가 가장 최소인지 반환하는 프로그램

function findShortestPath(N, K) {
  if (N === K) {
    return `0\n${N}`;
  }

  const queue = [N];
  const visited = new Array(100001).fill(false);
  const parent = new Array(100001).fill(-1);
  const dist = new Array(100001).fill(0);

  visited[N] = true;

  while (queue.length > 0) {
    const cur = queue.shift();

    if (cur === K) {
      break;
    }

    // +1, -1, *2
    const nextPosArr = [cur + 1, cur - 1, cur * 2];

    for (const next of nextPosArr) {
      if (next >= 0 && next < 100001 && !visited[next]) {
        visited[next] = true;
        dist[next] = dist[cur] + 1;
        parent[next] = cur;
        queue.push(next);
      }
    }
  }

  // 경로 역추적
  const path = [];
  let start = K;
  while (start !== -1) {
    path.unshift(start);
    start = parent[start];
  }

  return `${dist[K]}\n${path.join(' ')}`;
}

// function findShortestPath(N, K) {
//   // 이미 같은 위치에 있는 경우
//   if (N === K) {
//     return `0\n${N}`;
//   }

//   // BFS를 위한 큐와 방문 체크 배열
//   // const queue = [[N, 0, [N]]]; // [현재위치, 시간, 경로]
//   const queue = [[N, 0]]; // [현재위치, 시간] - 경로는 저장하지 않음!
//   const parent = new Array(100001).fill(-1);
//   const visited = new Array(100001).fill(false);
//   visited[N] = true;

//   while (queue.length > 0) {
//     const [curPos, time] = queue.shift();

//     // 가능한 다음 위치들을 계산
//     const nextPosArr = [];

//     // 2. X+1
//     if (curPos + 1 <= 100000) nextPosArr.push(curPos + 1);
//     // 1. X-1
//     if (curPos - 1 >= 0) nextPosArr.push(curPos - 1);
//     // 3. 2*X
//     if (curPos << 1 <= 100000) nextPosArr.push(curPos << 1);

//     // 각 다음 위치를 확인
//     for (const nextPos of nextPosArr) {
//       if (nextPos === K) {
//         // 목표 도달!@부모 정보 설정 후 경로 역추적
//         parent[nextPos] = curPos;

//         // 경로 역추적
//         const path = [];
//         let cur = nextPos;
//         while (cur !== -1) {
//           path.unshift(cur);
//           cur = parent[cur];
//         }

//         return `${time + 1}\n${path.join(' ')}`;
//       }

//       if (!visited[nextPos]) {
//         visited[nextPos] = true;
//         parent[nextPos] = curPos;
//         queue.push([nextPos, time + 1]);

//         // queue.push([nextPos, time + 1, [...path, nextPos]]);
//       }
//     }
//   }

//   return null; // 실제로는 발생 X
// }

const [N, K] = require('fs').readFileSync(0).toString().split(' ').map(Number);
console.log(findShortestPath(N, K));
