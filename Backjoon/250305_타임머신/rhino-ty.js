// 1→2→3→1→2→3→1→... 무한 반복이면 -1..
// 최단 경로 => 다익스트라, 하지만 벨만-포드 알고리즘 사용 (음수 가중치가 있으므로 다익스트라 대신 벨만-포드 사용)

// 1. 도시 간 버스 정보를 그래프로 저장
// 2. 1번 도시에서 다른 모든 도시로 가는 최단 거리 배열 초기화 (무한대로)
// 3. 벨만-포드 알고리즘 구현
//   - N-1번 모든 간선을 순회하며 각 도시까지의 최단 시간 갱신
//   - 한 번 더 순회해서 음수 사이클 확인
// 4. 음수 사이클 발견 시 -1 출력, 아니면 각 도시별 최단 시간 출력
//   - 음수 사이클이 존재하면서 1번 도시에서 해당 사이클에 도달할 수 있는지 확인
//   - 도달할 수 없는 도시는 -1 출력

// 각 버스 노선을 그래프에 저장, 시간까지 포함!

function getFastestTime(N, M, busLineArr) {
  // 최단 거리를 저장할 배열, 1번 도시는 시작점이므로 0 초기화
  const distance = new Array(N + 1).fill(Infinity);
  distance[1] = 0;

  // 벨만-포드 알고리즘 수행
  // N-1번 반복
  for (let i = 0; i < N - 1; i++) {
    for (const [from, to, time] of busLineArr) {
      // 현재 간선을 통해 갱신 가능한 경우
      if (distance[from] !== Infinity && distance[to] > distance[from] + time) {
        distance[to] = distance[from] + time;
      }
    }
  }

  // 음수 사이클 확인
  for (const [from, to, time] of busLineArr) {
    if (distance[from] !== Infinity && distance[to] > distance[from] + time) {
      return '-1';
    }
  }

  // 2번 도시부터 N번 도시까지의 최단 거리 반환
  return distance
    .slice(2)
    .map((d) => (d === Infinity ? -1 : d))
    .join('\n');
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').split('\n');
const [N, M] = input[0].split(' ').map(Number);
const busLineArr = input.slice(1).map((busLine) => busLine.split(' ').map(Number));

console.log(getFastestTime(N, M, busLineArr));
