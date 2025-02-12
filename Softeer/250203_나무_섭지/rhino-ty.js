// 귀류법 적용
// "남우가 탈출할 수 있다"고 가정
//   각 유령에 대해서
//     - 유령의 출구까지의 최단거리를 계산 (이를 `D_유령`이라 가정)
//     - 유령은 벽을 통과할 수 있으므로 맨해튼 거리로 계산
//     - 만약 `D_유령` <= `D_남우` 라면 이 유령은 반드시 남우를 잡음
//       1) 유령은 벽을 통과할 수 있고
//       2) 움직이지 않을 수도 있으며
//       3) 남우보다 먼저 도착할 수 있기 때문
//     - 따라서 "탈출 불가능" 판정
//     - 처음의 가정이 틀렸음을 증명

// 이 알고리즘의 핵심은 '도착 시점' 하나만을 비교해야만 한다는 점임
// 나는 미로 탈출 문제에서 매 순간의 상태와 이동을 추적하려고 했음
// 하지만 유령이 가진 특별한 능력들(벽 통과, 정지 가능) 때문에, 단순히 "누가 먼저 도착할 수 있는가?"만 확인하면 되기 때문
// 다시 말해, **만약 유령이 남우보다 출구에 먼저 도착할 수 있거나 동시에 도착할 수 있다면, 유령은 반드시 남우를 잡을 수 있는 전략 존재**
// 유령은 벽을 통과할 수 있고 원하는 위치에서 기다릴 수 있기 때문에, 중간 과정은 전혀 고려할 필요 X

// 1. 남우가 벽을 피해 출구까지 갈 수 있는 최단 거리
// 2. 벽과 상관 없이, 각 유령의 출구까지의 최단 거리
// 미라 땡큐 마 프렌드 많이 우아한 생각 전개였음

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1); // 각 줄이 이미 문자열로 되어있으므로 split 불필요

const solution = (n, m, board) => {
  // 초기 위치 초기화
  let namwooPos,
    exitPos,
    ghosts = [];

  // 격자를 순회하면서 남우(N), 출구(D), 유령(G)의 위치를 저장
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 'N') namwooPos = [i, j];
      else if (board[i][j] === 'D') exitPos = [i, j];
      else if (board[i][j] === 'G') ghosts.push([i, j]);
    }
  }

  // 남우의 최단거리를 구하는 BFS 함수
  const bfs = (sx, sy) => {
    // 방향 배열 (상하좌우)
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    // BFS를 위한 큐와 방문 체크를 위한 Set 초기화
    const queue = [[sx, sy, 0]]; // [x좌표, y좌표, 거리]
    const visited = new Set([`${sx},${sy}`]); // "x,y" 형태의 문자열로 방문 체크

    while (queue.length) {
      const [x, y, dist] = queue.shift();

      // 출구에 도달했다면 현재까지의 거리 반환
      if (x === exitPos[0] && y === exitPos[1]) return dist;

      // 4방향으로의 이동 시도
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        // 격자 범위 체크와 벽이 아닌지 확인
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && board[nx][ny] !== '#') {
          const key = `${nx},${ny}`;
          // 방문하지 않은 위치라면 큐에 추가
          if (!visited.has(key)) {
            visited.add(key);
            queue.push([nx, ny, dist + 1]);
          }
        }
      }
    }

    return Infinity;
  };

  // 남우의 출구까지의 최단거리
  const namwooDist = bfs(namwooPos[0], namwooPos[1]);

  // 남우가 출구에 도달할 수 없다면 'No' 반환
  if (namwooDist === Infinity) return 'No';

  for (const [gx, gy] of ghosts) {
    // 유령의 출구까지의 최단거리 : 맨해튼 거리 사용
    const ghostDist = Math.abs(exitPos[0] - gx) + Math.abs(exitPos[1] - gy);
    if (namwooDist >= ghostDist) return 'No';
  }

  // 모든 검사를 통과했다면 'Yes' 반환
  return 'Yes';
};

console.log(solution(N, M, board));
