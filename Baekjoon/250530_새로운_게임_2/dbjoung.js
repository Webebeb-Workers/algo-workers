const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const table = input
  .slice(1, 1 + N)
  .map(line => line.split(' ').map(Number));

const players = new Array(K + 1);
for (let i = 1; i <= K; i++) {
  const [x, y, d] = input[1 + N + i - 1].split(' ').map(Number);
  players[i] = [x, y, d]; 
}

const board = new Array(N + 1);
for (let i = 1; i <= N; i++) {
  board[i] = new Array(N + 1);
  for (let j = 1; j <= N; j++) {
    board[i][j] = []; 
  }
}

for (let i = 1; i <= K; i++) {
  const [x, y, _] = players[i];
  board[x][y].push(i);
}

const dir = [
  null,
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

const rdir = [null, 2, 1, 4, 3];

function getMovePlayer(originList, player) {
  for (let i = 0; i < originList.length; i++) {
    if (originList[i] === player) {
      return originList.splice(i);
    }
  }
  return [];
}

function movePlayers(movePs, destinationList) {
  destinationList.push(...movePs);
  return destinationList.length;
}

for (let turn = 1; turn <= 1000; turn++) {
  for (let playerIndex = 1; playerIndex <= K; playerIndex++) {
    let [curX, curY, curD] = players[playerIndex];

    let nextX = curX + dir[curD][0];
    let nextY = curY + dir[curD][1];

    let movePs = null;   
    let color = null;    

    if (
      nextX < 1 || nextX > N ||
      nextY < 1 || nextY > N ||
      table[nextX - 1][nextY - 1] === 2
    ) {
      const newD = rdir[curD];
      players[playerIndex][2] = newD;
      curD = newD; 

      nextX = curX + dir[curD][0];
      nextY = curY + dir[curD][1];

      if (
        nextX < 1 || nextX > N ||
        nextY < 1 || nextY > N ||
        table[nextX - 1][nextY - 1] === 2
      ) {
        continue;
      }

      color = table[nextX - 1][nextY - 1];
      movePs = getMovePlayer(board[curX][curY], playerIndex);
      if (color === 1) {
        movePs.reverse();
      }
    }
    else if (table[nextX - 1][nextY - 1] === 0) {
      color = 0;
      movePs = getMovePlayer(board[curX][curY], playerIndex);
    }
    else {
      color = 1;
      movePs = getMovePlayer(board[curX][curY], playerIndex);
      movePs.reverse();
    }

    movePs.forEach(idx => {
      players[idx][0] = nextX;
      players[idx][1] = nextY;
    });

    const stackSize = movePlayers(movePs, board[nextX][nextY]);
    if (stackSize >= 4) {
      console.log(turn);
      return;
    }
  }
}

console.log(-1);
