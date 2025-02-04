const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const [n, m] = input[0].split(' ').map(Number);

let exit;
let namu;
const map = [];
const ghost = [];

for (let i = 0; i < n; i++) {
  map.push(input[i + 1].split(''));

  for (let j = 0; j < m; j++) {
    if (map[i][j] === 'G') ghost.push([i, j]);
    else if (map[i][j] === 'N') namu = [i, j];
    else if (map[i][j] === 'D') exit = [i, j];
  }
}

function bfs(startY, startX, isGhost, exit) {
  let shortestPath = 0;
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  const queue = [[startY, startX, 0]];
  visited[startY][startX] = true;

  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];

  while (queue.length > 0) {
    const [y, x, dist] = queue.shift();
    if (isGhost && map[y][x] === 'G') return dist;
    if (!isGhost && y === exit[0] && x === exit[1]) return dist;

    for (let i = 0; i < 4; i++) {
      const cy = y + dy[i];
      const cx = x + dx[i];

      if (cy >= 0 && cx >= 0 && cy < n && cx < m && !visited[cy][cx]) {
        if (isGhost) {
          visited[cy][cx] = true;
          queue.push([cy, cx, dist + 1]);
        } else {
          if (map[cy][cx] !== '#' && map[cy][cx] !== 'G') {
            visited[cy][cx] = true;
            queue.push([cy, cx, dist + 1]);
          }
        }
      }
    }
  }
  return Infinity;
}

const namuDist = bfs(namu[0], namu[1], false, exit);
let minGhostDist = Infinity;

const ghostDist = bfs(exit[0], exit[1], true, 'G');
minGhostDist = Math.min(minGhostDist, ghostDist);

console.log(namuDist < minGhostDist ? 'Yes' : 'No');
