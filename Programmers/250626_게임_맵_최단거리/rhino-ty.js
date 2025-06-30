// BFS: 가까운 블록을 탐색해 거리 저장 및 인큐 후 최소 거리 반환

function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // 큐 + 거리 정보
  const queue = [[0, 0, 1]]; // [행, 열, 현재까지의거리]
  // 방문 처리
  const visited = Array(n)
    .fill()
    .map(() => Array(m).fill(false));
  visited[0][0] = true;

  while (queue.length > 0) {
    // FIFO 순서로 처리 = 레벨별 탐색
    const [curRow, curCol, distance] = queue.shift();

    // 최단거리 반환: 목표에 처음 도달하는 순간
    if (curRow === n - 1 && curCol === m - 1) return distance;

    // 현재 거리 + 1로 인접 칸들을 큐에 추가
    for (const [dr, dc] of directions) {
      const nr = curRow + dr;
      const nc = curCol + dc;

      // 경계 검사
      if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
        if (maps[nr][nc] === 1 && !visited[nr][nc]) {
          visited[nr][nc] = true;

          // 현재 거리 + 1로 다음 레벨 설정
          queue.push([nr, nc, distance + 1]);
        }
      }
    }
  }
  return -1;
}
