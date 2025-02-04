// 1. 기본 설정
//   - 격자에서 남우(N), 출구(D), 유령들(G) 위치 파악
//   - 남우는 상하좌우 이동 가능 (벽 제외)
//   - 유령은 상하좌우 이동 가능 (벽 통과 가능)
// 2. 유령들의 최단거리 맵 생성
//   - 각 유령별로 BFS 실행 => 유령은 벽을 뚫을 수 있으니 직선 거리, 즉 거리 계산 방식을 바꿔 더 효율적으로 개선
// 3. 남우의 가능한 경로 탐색 (BFS)
//   - 시작점에서 BFS 시작 => 단순히 BFS 최단 거리를 구하는 것이 아니고 유령을 피하면서 가야함
//   - 남우는 매 이동마다 조건들을 확인해야함
//     - 현재 위치에서 다음 위치로 이동할 때 걸리는 시간 계산
//     - 이동하려는 위치에 유령이 더 빨리 도착하면 그 경로는 제외
//     - 벽이면 이동 불가
//   - 출구에 도착했을 때 남우의 도착 시간이 해당 위치의 유령 도착 시간보다 작으면 탈출 가능
// 4. 탈출 가능성 결과 판단
//   - BFS 결과 출구에 도달 가능한 경로가 하나라도 있으면 "Yes"
//   - 아니면 "No"

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1); // 각 줄이 이미 문자열로 되어있으므로 split 불필요

function solution(n, m, board) {
  let namwooPos,
    exitPos,
    ghosts = [];
  const visited = Array(n)
    .fill()
    .map(() => Array(m).fill(false));

  // 1. 초기 위치 파악
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 'N') namwooPos = [i, j];
      else if (board[i][j] === 'D') exitPos = [i, j];
      else if (board[i][j] === 'G') ghosts.push([i, j]);
    }
  }

  // 방향 배열 (상하좌우)
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  // 2. 유령들의 최단거리 맵 생성
  function getGhostMap() {
    let ghostMap = Array(n)
      .fill()
      .map(() => Array(m).fill(Infinity));

    for (let ghost of ghosts) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          // 맨해튼 거리 계산 : 현재 칸(i,j)까지 이 유령이 도달하는 시간 계산
          const distance = Math.abs(ghost[0] - i) + Math.abs(ghost[1] - j);
          // 여러 유령 중 가장 빨리 도달하는 시간으로 업데이트
          ghostMap[i][j] = Math.min(ghostMap[i][j], distance);
        }
      }
    }

    return ghostMap;
  }

  // 3. 남우의 탈출 가능성 확인 (BFS)
  function canEscape() {
    if (ghosts.length === 0) return canReachExitPos();

    let ghostMap = getGhostMap();
    let queue = [[namwooPos[0], namwooPos[1], 0]];
    visited[namwooPos[0]][namwooPos[1]] = true;

    while (queue.length > 0) {
      let [x, y, time] = queue.shift();

      if (x === exitPos[0] && y === exitPos[1] && time < ghostMap[x][y]) {
        return true;
      }

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
        if (board[nx][ny] === '#') continue;
        if (visited[nx][ny]) continue;

        if (time + 1 < ghostMap[nx][ny]) {
          visited[nx][ny] = true;
          queue.push([nx, ny, time + 1]);
        }
      }
    }

    return false;
  }

  // 유령이 없을 때 출구까지 도달 가능한지 확인
  function canReachExitPos() {
    let queue = [[namwooPos[0], namwooPos[1]]];
    visited[namwooPos[0]][namwooPos[1]] = true;

    while (queue.length > 0) {
      let [x, y] = queue.shift();

      if (x === exitPos[0] && y === exitPos[1]) return true;

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
        if (board[nx][ny] === '#') continue;
        if (visited[nx][ny]) continue;

        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }

    return false;
  }

  return canEscape() ? 'Yes' : 'No';
}

console.log(solution(N, M, board));
