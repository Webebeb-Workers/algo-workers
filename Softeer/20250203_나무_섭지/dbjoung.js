function getDistanceBFS(n, m, xy, exit, map) {
  const dismap = new Array(n).fill(null).map(() => new Array(m).fill(null));
  dismap[xy[0]][xy[1]] = 0;
  const queue = [];
  queue.push(xy);

  const movement = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (const [px, py] of movement) {
      const [nextX, nextY] = [x + px, y + py];
      if (
        nextX >= 0 &&
        nextX < n &&
        nextY >= 0 &&
        nextY < m &&
        map[nextX][nextY] !== "G" &&
        map[nextX][nextY] !== "#" &&
        dismap[nextX][nextY] === null
      ) {
        dismap[nextX][nextY] = dismap[x][y] + 1;
        queue.push([nextX, nextY]);
      }
    }
  }

  return dismap[exit[0]][exit[1]];
}

function main() {
  const input = fs.readFileSync(0).toString().split("\n");

  const [n, m] = input.shift().split(" ").map(Number);
  const map = input.map((line) => line.split(""));

  let namu = null;
  let ghosts = [];
  let exit = null;

  // 남우, 유령, 출구 위치 파악
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] == "N") namu = [i, j];
      else if (map[i][j] == "G") ghosts.push([i, j]);
      else if (map[i][j] == "D") exit = [i, j];
    }
  }

  // bfs로 남우~출구 최단 거리 탐색
  // 출구까지의 길이 막혀있으면 false 리턴하도록 함
  const namuDistance = getDistanceBFS(n, m, namu, exit, map);
  if (!namuDistance) return false;

  // 유령~출구 최단 거리 계산
  const ghostDistances = ghosts.map((ghost) => {
    return Math.abs(ghost[0] - exit[0]) + Math.abs(ghost[1] - exit[1]);
  });
  const closetDistanceOfGhost = Math.min(...ghostDistances);

  // 남우의 최단거리가 유령의 최단거리보다 짧으면 탈출 가능
  if (namuDistance < closetDistanceOfGhost) return true;
  else true;
}

const fs = require("fs");
let result = main();

console.log(result ? "Yes" : "No");
