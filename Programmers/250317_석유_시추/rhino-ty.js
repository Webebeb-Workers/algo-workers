// 닿았을 때, BFS로 크기 산정 하면 됨. 효율성 점수도 있으니 한 번 식별한 오일은 등록해 계산한 결과값을 저장하거나, 방문 여부를 확인해서 넘어가는 방법 채택
// 결과값을 따로 사용하진 않고, Max를 이용할 것이니, 배열로 여부 확인해서 하면 될 듯

// 1. 가로/세로 길이, land와 똑같은 2차원 배열(visited), 각 열이 얻을 수 있는 석유 배열(가로 길이) 선언
// 2. 전체 맵 순회
//   1. 석유가 있고 아직 방문하지 않은 상태면
//     - BFS 탐색: 방문 true, 석유 뽑기 계산, 석유가 존재하는 열 할당
//     - 탐색 후 영향 받았던, 해당 열에 석유량 추가
//   2. 그 외에는 고려 X

function solution(land) {
  const n = land.length;
  const m = land[0].length;

  const visited = Array(n)
    .fill()
    .map(() => Array(m).fill(false));
  const oilByColumn = Array(m).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (land[i][j] && !visited[i][j]) {
        bfs(i, j, land, visited, oilByColumn);
      }
    }
  }
  return Math.max(...oilByColumn);
}

function bfs(startI, startJ, land, visited, oilByColumn) {
  const n = land.length;
  const m = land[0].length;

  const columnsAffected = new Set();
  let oilSize = 0;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const colOilExisted = Array(m).fill(false);

  const queue = [[startI, startJ]];
  visited[startI][startJ] = true;

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    oilSize++;

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      colOilExisted[col] = true;

      if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m && land[newRow][newCol] && !visited[newRow][newCol]) {
        queue.push([newRow, newCol]);
        visited[newRow][newCol] = true;
      }
    }
  }

  for (let col = 0; col < m; col++) {
    if (colOilExisted[col]) {
      oilByColumn[col] += oilSize;
    }
  }
}
