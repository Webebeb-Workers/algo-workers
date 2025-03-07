// 완전탐색 + Math.min을 찾는 문제 => 만일 치킨집을 없애는 경우의 수 중에,
// 현재까지 치킨 거리합 아직 계산 안한 거리와 최종 최소 거리 중에 벌써부터 min이 안되면 백트래킹(가지치기?)
// 1. 도시 순회 하면서 치킨집, 집 배열에 좌표 추가
// 2. 1부터 M까지 DFS로 재귀하며 치킨집 선택
//   - DFS 함수 외부 변수인, 선택 치킨집 좌표에 대해서 전체 경우의 수를 만듦
//   - 현재 선택된 치킨집들과 모든 집들 사이의 치킨 거리 합 계산

function getDistance(start, end) {
  return Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
}

// 현재 선택된 치킨집들(M)과 모든 집들(N) 사이의 치킨 거리 합 계산
function getChiResDistance(house, chiRes, selctedChiRes, minResult) {
  let sum = 0;
  // 각 집부터
  for (const h of house) {
    let min = Infinity;
    // 선택된 치킨집들과의 거리 중 최소값 찾기
    for (const idx of selctedChiRes) {
      const c = chiRes[idx];
      min = Math.min(min, getDistance(h, c));
    }
    sum += min;
    // 백트래킹: 현재까지의 합이 이미 최소값보다 크다면 더 계산할 필요 없음
    if (sum >= minResult) return Infinity;
  }
  return sum;
}

function getMinChiRes(N, M, city) {
  // 집, 치킨집 좌표
  const house = [];
  const chiRes = [];
  // 선택된 치킨집 좌표, DFS 사용 예정
  const selctedChiRes = [];
  // 최종 최소 치킨 거리
  let minResult = Infinity;

  // 1. 도시 순회하면서 치킨집, 집 좌표 저장, 0-base
  for (let i = 0; i < N; i++) {
    const row = city[i].split(' ');
    for (let j = 0; j < N; j++) {
      if (row[j] === '2') chiRes.push([i, j]);
      if (row[j] === '1') house.push([i, j]);
    }
  }

  // DFS로 치킨집 선택
  function dfs(index, count) {
    // 기저: 최종 선택 치킨집 좌표(M)
    if (count === M) {
      minResult = Math.min(minResult, getChiResDistance(house, chiRes, selctedChiRes, minResult));
      return;
    }

    // chiRes.length - index: 아직 선택할 수 있는 남은 치킨집의 수
    // count: 현재까지 선택한 치킨집의 수
    // 둘을 합쳐도 M개가 안 된다면 더 진행할 필요 없음
    if (chiRes.length - index + count < M) return;

    // 현재 치킨집부터 선택 후 다음 치킨집 선택
    for (let i = index; i < chiRes.length; i++) {
      selctedChiRes.push(i);
      dfs(i + 1, count + 1);
      selctedChiRes.pop();
    }
  }

  dfs(0, 0);
  return minResult;
}

const fs = require('fs');
const [NM, ...city] = fs.readFileSync(0, 'utf-8').split('\n'); // 0-base
const [N, M] = NM.split(' ').map(Number);

console.log(getMinChiRes(N, M, city));

// [A,B,C,D] 중 2개 선택 조건
// 1단계: A 선택
// → 2단계: B 선택 → (A,B) 완성 → B 취소
// → 2단계: C 선택 → (A,C) 완성 → C 취소
// → 2단계: D 선택 → (A,D) 완성 → D 취소
// → A 취소
// 1단계: B 선택
// → 2단계: C 선택 → (B,C) 완성 → C 취소
// → 2단계: D 선택 → (B,D) 완성 → D 취소
// → B 취소
//   => B,A 같이 이전에 선택한 것을 다시 선택하지 않음

// 입력 2를 기준해서 과정 살펴보기
// ...
// {
//   index: 1,
//   count: 1,
//   selctedChiRes: [ 0 ],
//   chiRes: [ [ 0, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 4 ] ]
// }
// {
//   index: 2,
//   count: 2,
//   selctedChiRes: [ 0, 1 ], // M에 도달, 최소 거리 구하기
//   chiRes: [ [ 0, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 4 ] ]
// }
// {
//   index: 3,
//   count: 2,
//   selctedChiRes: [ 0, 2 ], // 다른 경우의 수로 선택
//   chiRes: [ [ 0, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 4 ] ]
// }
// ...
// {
//   index: 3,
//   count: 1,
//   selctedChiRes: [ 2 ],
//   chiRes: [ [ 0, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 4 ] ]
// }
// {
//   index: 4,
//   count: 2,
//   selctedChiRes: [ 2, 3 ], // M에 도달, 최소 거리 구하기
//   chiRes: [ [ 0, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 4 ] ]
// }
// {
//   index: 5,
//   count: 2,
//   selctedChiRes: [ 2, 4 ],
//   chiRes: [ [ 0, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 4 ] ]
// }
