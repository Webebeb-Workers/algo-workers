function solution(land) {
  // 2:55 시작
  // 3:48 시간초과
  // 4:03 완료

  // 입력: land(석유 덩어리 2차원 정수배열)
  // 출력: 가장 많은 석유 있는 column의 석유량

  // -------------------------------------

  const height = land.length;
  const width = land[0].length;

  // 하나의 석유 덩어리 좌표들 반환
  const BFS = (startRow, startCol, visited) => {
    const direction = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];
    const queue = [];
    const dengAuRies = [];
    queue.push([startRow, startCol]);
    dengAuRies.push([startRow, startCol]);
    visited[startRow][startCol] = true;

    while (queue.length > 0) {
      const [row, col] = queue.shift();
      for (const [dy, dx, count] of direction) {
        const [newRow, newCol] = [row + dy, col + dx];
        if (newRow < 0 || newCol < 0 || newRow >= height || newCol >= width) continue;
        if (visited[newRow][newCol] || !land[newRow][newCol]) continue;
        queue.push([newRow, newCol]);
        dengAuRies.push([newRow, newCol]);
        visited[newRow][newCol] = true;
      }
    }

    return dengAuRies;
  };

  // land 돌면서, BFS로 반환받은 석유 덩어리 정보로 column에 대한 석유량 갱신
  const visited = Array.from(
    { length: height },
    () => Array.from({ length: width }),
    () => false
  );
  const seokU = Array.from({ length: width }, () => 0);
  land.forEach((row, rowIndex) => {
    row.forEach((el, columnIndex) => {
      if (visited[rowIndex][columnIndex] || !land[rowIndex][columnIndex]) return;
      const dengAuRies = BFS(rowIndex, columnIndex, visited);
      const set = new Set();

      dengAuRies.forEach(([row, col]) => set.add(col));
      set.forEach((col) => (seokU[col] += dengAuRies.length));
    });
  });

  return Math.max(...seokU);
}
