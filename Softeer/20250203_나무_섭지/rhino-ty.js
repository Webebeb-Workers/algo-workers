// 0. 입력값 초기화
// 1. 남우, 출구, 유령, 빈 공간, 벽 위치 확인 및 변수 초기화
//   => 벽 위치는 미리 안 알아도 됨, 유령만 움직이기에 변수로 해야함
// 2. 인접한 사방향으로 확인 해야함 : BFS 방식을 사용해 거리를 구함 (출구 방향으로 무조건 가야한다는 조건이 있는 줄 알았음..)
//   2-0. 방문한 위치인지 확인
//   2-1. 벽, 유령을 피해야함
//   2-2. 출구를 향해 가야함 (랜덤?)
//   2-3. 격자 밖인 지 확인
// 3. 유령 체크 : 유령은 남우에게 최적으로 다가감
//   3-1. 모든 유령에 대해 검사
//   3-2. 유령이 현재 위치에서 잡을 수 있는지
//   3-3. 유령이 다음 위치에서 잡을 수 있는지
//   3-4. 잡히지 않는 경우만 큐에 추가
// 4. 남우, 유령 이동 : 남우는 안전한 경우에만 다음 위치로 이동, 유령은 남우에게 다가감
//   4-1. 유령이 어떻게 남우에게 최적으로 다가가는가? => 맨해튼 거리, A* 알고리즘 등
// 5. 탈출 확인
//   5-1. 현재 위치가 출구이고 유령에 안잡혔다면 Yes
//   5-2. 다음 행동 큐가 비거나, 유령에게 잡히면 No

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((line) => line.split(' '));

function runAwayGhost() {
  // 초기 위치 초기화
  let namwooPos,
    exitPos = null;
  const ghosts = []; // 2마리 이상 들어올 수 있음

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 'N') namwooPos = [i, j];
      else if (arr[i][j] === 'D') exitPos = [i, j];
      else if (arr[i][j] === 'G') ghosts.push([i, j]);
    }
  }

  // BFS를 위한 큐 초기화 및 반복 시작
  const queue = [[playerPos, 0]]; // [위치, 시간]
  const visited = new Set([`${playerPos[0]},${playerPos[1]}`]);

  while (queue.length > 0) {
    const [curPos, time] = queue.shift();

    // 출구에 도달했는지 확인
    if (curPos[0] === exitPos[0] && curPos[1] === exitPos[1]) {
      return 'Yes';
    }

    for (const nextPos of getNextPositions(curPos, board)) {
      const posKey = `${nextPos[0]},${nextPos[1]}`;
      if (visited.has(posKey)) {
        continue;
      }
    }
    // 이동 위한 큐 갱신
    queue.push([nextPos, time + 1]);
    visited.add(posKey);
  }
  return 'No';
}

// 인접한 사방향 확인
function getNextPos(curPos, board) {
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]; // 동서남북
  const nextPos = [];

  for (const [dx, dy] of dir) {
    const nx = curPos[0] + dx;
    const ny = curPos[1] + dy;
    if (nx >= 0 && nx < N && ny >= 0 && ny < M && board[nx][ny] !== '#') {
      nextPos.push([nx, ny]);
    }
  }

  return nextPos;
}
