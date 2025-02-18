// 1. 각 건물들마다의 걸리는 시간을 저장할 DP 생성
// 2. 입력을 받으며
//    - 2차원 배열에 건물 간의 관계 저장
//    - 각 건물의 진입차수 계산
// 3. 그래프에서 진입차수가 0은 건물들부터 순회하며 걸리는 시간 계산 및 저장
//   - 현재 건물에 필요한 선행 건물들의 시간 확인
//   - 선행 건물들 중 가장 오래 걸리는 시간을 찾는다 (MAX값)
//     - 선행 조건의 건물들끼리 선행 조건에 포함되든, 안되든 병렬적으로 짓기 때문에 어쨌든 MAX로 하면 됨
//   - 현재 건물의 완성 시간 = MAX값 + 현재 건물의 건설 시간

function buildBuilding(N, buildingArr) {
  // 각 건물들마다의 걸리는 시간을 저장할 DP 생성
  const dp = new Array(N + 1).fill(0);

  // 그래프 관계와 진입차수 저장
  const graph = Array.from({ length: N + 1 }, () => []);
  const inDegree = new Array(N + 1).fill(0);
  const buildTime = new Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    const [time, ...preBuildings] = buildingArr[i];
    buildTime[i] = time;

    // -1 제외한 선행 건물들 처리
    preBuildings.forEach((pre) => {
      if (pre === -1) return;
      graph[pre].push(i);
      inDegree[i]++;
    });
  }

  // 입력 정보 저장
  for (let i = 1; i <= N; i++) {
    const [time, ...preBuildings] = buildingArr[i];
    buildTime[i] = time;

    // 선행 건물 정보 저장, -1 제외
    preBuildings.forEach((preBuilding) => {
      if (preBuilding === -1) return;
      graph[preBuilding].push(i); // preBuilding -> i 방향으로 연결
      inDegree[i]++; // i번 건물의 진입차수 증가
    });
  }

  // 진행 큐 => 진입차수가 0인 건물들부터 시작
  const queue = [];

  // 초기 진입차수가 0인 건물들을 큐에 삽입
  for (let i = 1; i <= N; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      dp[i] = buildTime[i];
    }
  }

  // 위상 정렬 수행
  while (queue.length > 0) {
    const current = queue.shift();

    // current 건물을 지은 후 지을 수 있는 건물들 확인
    for (const next of graph[current]) {
      // 다음 건물의 시간 갱신
      dp[next] = Math.max(dp[next], dp[current]);

      // 진입차수 감소
      inDegree[next]--;

      // 모든 선행 건물이 완성되었다면
      if (inDegree[next] === 0) {
        queue.push(next);
        dp[next] += buildTime[next];
      }
    }
  }

  // 결과 반환 (1번 건물부터 N번 건물까지의 건설 시간)
  return dp.slice(1, N + 1).join('\n');
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const N = parseInt(input[0]);
// buildingArr => 1-base
const buildingArr = input.map((building) => building.split(' ').map(Number));

console.log(buildBuilding(N, buildingArr));
