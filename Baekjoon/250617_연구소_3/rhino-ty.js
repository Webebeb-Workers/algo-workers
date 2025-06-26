// 바이러스 후보들 중 M개를 활성화하여 모든 빈 칸에 바이러스를 퍼뜨리는 최소 시간 구하는 문제
// 완탐-시뮬레이션, 매트릭스 바이러스 중 M개로 구성된 조합을 만들어 전체 탐색, 전파이니 BFS + 최솟값 만들도록 최적화
// 0은 빈 칸, 1은 벽, 2는 바이러스의 위치

// 1. 입력 처리 및 전처리: 조합을 만들 바이러스 위치, 전파 확인을 위한 빈 칸 개수 저장
// 2. 바이러스 조합 생성: 백트래킹
//    - 매트릭스 바이러스들 중 M개를 선택하는 모든 조합 구현
//    - C(매트릭스 바이러스, M) 가지 조합 생성
// 3. 각 조합에 대해 BFS 시뮬레이션 수행
//    - 선택된 M개 바이러스를 큐에 동시에 넣고 시작
//    - 상하좌우로 인접한 칸으로 1초마다 확산
//    - 1은 통과 불가, 0과 남아있는 2 모두 감염
//    - 빈 칸이 감염될 때만 시간 갱신 - 비활성 바이러스 감염은 시간에 영향 없음
// 4. 각 조합의 결과 검증
//    - 모든 빈 칸이 감염되었는지 확인
//    - 감염되지 않은 빈 칸이 있으면 해당 조합은 실패 => -1
//    - 모든 빈 칸이 감염되면 걸린 시간 기록
// 5. 최적해 반환
//    - 모든 조합 중 성공한 경우들의 최소 시간 반환
//    - 모든 조합이 실패하면 -1 반환

function getMinTimeVirus(N, M, labLines) {
  const lab = [];
  const viruses = [];
  let emptyCount = 0;

  // 입력 처리 및 전처리
  for (let i = 0; i < N; i++) {
    const row = labLines[i].split(' ').map(Number);
    lab.push(row);
    for (let j = 0; j < N; j++) {
      if (row[j] === 2) viruses.push([i, j]);
      else if (row[j] === 0) emptyCount++;
    }
  }

  if (emptyCount === 0) return 0;

  // 모든 바이러스 조합 생성
  const combis = getCombinations(viruses, M);
  let minTime = Infinity;

  // 각 조합에 대해 시뮬레이션 수행
  for (const combi of combis) {
    const time = simulateVirus(lab, combi, emptyCount);
    if (time !== -1) {
      minTime = Math.min(minTime, time);
    }
  }

  return minTime === Infinity ? -1 : minTime;
}

// 바이러스 중 M개를 선택하는 모든 조합 생성
function getCombinations(arr, m) {
  const combis = [];

  function dfs(start, curr) {
    if (curr.length === m) {
      combis.push([...curr]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      curr.push(arr[i]);
      // DFS
      dfs(i + 1, curr);
      // Backtrack
      curr.pop();
    }
  }

  dfs(0, []);
  return combis;
}

// BFS 시뮬레이션
function simulateVirus(lab, selectedViruses, emptyCount) {
  const N = lab.length;
  const visited = Array(N)
    .fill()
    .map(() => Array(N).fill(false));
  const queue = [];

  // 선택된 바이러스들을 큐에 추가: 동시 시작
  for (const [r, c] of selectedViruses) {
    // [행, 열, 시간]
    queue.push([r, c, 0]);
    visited[r][c] = true;
  }

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let maxTime = 0;
  let infectedEmpty = 0;

  while (queue.length > 0) {
    const [r, c, time] = queue.shift();

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < N && nc >= 0 && nc < N && !visited[nr][nc]) {
        if (lab[nr][nc] !== 1) {
          // 벽이 아니면?
          visited[nr][nc] = true;
          queue.push([nr, nc, time + 1]);

          // 0이었다면 감염된 빈 칸 수 증가
          if (lab[nr][nc] === 0) {
            infectedEmpty++;
            maxTime = time + 1; // 빈 칸이 감염될 때만 시간 갱신
          }
        }
      }
    }
  }

  // 모든 빈 칸이 감염되었는지 확인
  return infectedEmpty === emptyCount ? maxTime : -1;
}

const [NM, ...labLines] = require('fs').readFileSync(0).toString().split('\n');
const [N, M] = NM.split(' ').map(Number);
console.log(getMinTimeVirus(N, M, labLines));
