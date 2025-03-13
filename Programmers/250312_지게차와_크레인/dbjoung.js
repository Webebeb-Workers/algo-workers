const movement = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

function checkCanOutput(map, xy) {
  const visit = new Array(map.length)
    .fill(null)
    .map(() => new Array(map[0].length).fill(false));
  const queue = [xy];
  visit[xy[0]][xy[1]] = true;

  while (queue.length > 0) {
    const [curX, curY] = queue.shift();
    for (const move of movement) {
      const [nx, ny] = [curX + move[0], curY + move[1]];
      if (nx < 0 || nx >= visit.length || ny < 0 || ny > visit[0].length)
        return true;
      if (visit[nx][ny]) continue;
      if (!map[nx][ny]) {
        queue.push([nx, ny]);
        visit[nx][ny] = true;
      }
    }
  }

  return false;
}

function solution(storage, requests) {
  const container = storage.map((line) => line.split(""));

  let numOfOutput = 0;
  for (const req of requests) {
    const isPoc = req.length > 1 ? true : false;
    const find = req[0];
    const deletes = [];

    for (let i = 0; i < container.length; i++) {
      for (let j = 0; j < container[0].length; j++) {
        if (container[i][j] != find) continue;

        if (isPoc) {
          deletes.push([i, j]);
        } else {
          if (checkCanOutput(container, [i, j])) {
            deletes.push([i, j]);
          }
        }
      }
    }

    numOfOutput += deletes.length;
    deletes.forEach(([x, y]) => {
      container[x][y] = null;
    });
  }

  return container.length * container[0].length - numOfOutput;
}
