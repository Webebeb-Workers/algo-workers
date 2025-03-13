function solution(storage, requests) {
  const containers = storage.map((row) => [...row]);
  const height = containers.length;
  const width = containers[0].length;

  // 빈 공간이 외부와 연결되어 있는지 확인
  const checkIsConnectedToOutside = (row, col) => {
    const queue = [[row, col]];
    const visited = Array.from({ length: height }, () => Array.from({ length: width }, () => false));
    visited[row][col] = true;
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    while (queue.length > 0) {
      const [currentRow, currentCol] = queue.shift();

      // 현재 위치가 가장자리라면 외부와 연결됨
      if (currentRow === 0 || currentCol === 0 || currentRow === height - 1 || currentCol === width - 1) return true;

      // 인접한 빈 공간 탐색
      for (const [dy, dx] of directions) {
        const nextRow = currentRow + dy;
        const nextCol = currentCol + dx;

        if (
          nextRow >= 0 &&
          nextRow < height &&
          nextCol >= 0 &&
          nextCol < width &&
          containers[nextRow][nextCol] === "" &&
          !visited[nextRow][nextCol]
        ) {
          queue.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = true;
        }
      }
    }

    return false;
  };

  // 해당 컨테이너가 접근 가능한지 확인
  const checkIsAccessible = (row, col) => {
    // 가장자리에 있는 경우
    if (row === 0 || col === 0 || row === height - 1 || col === width - 1) return true;

    // 인접한 위치 중 빈 공간이고 외부와 연결된 공간이 있는지 확인
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        nextRow >= 0 &&
        nextRow < height &&
        nextCol >= 0 &&
        nextCol < width &&
        containers[nextRow][nextCol] === "" &&
        checkIsConnectedToOutside(nextRow, nextCol)
      ) {
        return true;
      }
    }

    return false;
  };

  for (const request of requests) {
    const containersToRemove = [];

    // 컨테이너 제거
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const containerType = containers[row][col];

        if (containerType === "") continue;

        if (request.length === 2) {
          if (containerType === request[0]) {
            containersToRemove.push([row, col]);
          }
        } else {
          if (containerType === request && checkIsAccessible(row, col)) {
            containersToRemove.push([row, col]);
          }
        }
      }
    }

    for (const [row, col] of containersToRemove) {
      containers[row][col] = "";
    }
  }

  return containers.flat().filter((cell) => cell !== "").length;
}
