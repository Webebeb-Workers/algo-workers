const fs = require("fs");
const [size, ...array] = fs.readFileSync(0).toString().trim().split("\n");
const [n, m] = size.split(" ").map(Number);

const xDirection = [0, 0, -1, 1];
const yDirection = [-1, 1, 0, 0];

let destination = null;

const ghostQueue = [];
const ghostVisited = Array.from(Array(n), () => Array.from(Array(m), () => -1));

const namuQueue = [];
const namuVisited = Array.from(Array(n), () => Array.from(Array(m), () => -1));

array.forEach((row, x) => {
  [...row].forEach((element, y) => {
    if (element === "D") {
      destination = [x, y];
    } else if (element === "N") {
      namuQueue.push([x, y]);
      namuVisited[x][y] = 0;
    } else if (element === "G") {
      ghostQueue.push([x, y]);
      ghostVisited[x][y] = 0;
    }
  });
});

const BFSGhost = () => {
  while (ghostQueue.length > 0) {
    const [x, y] = ghostQueue.shift();
    for (let i = 0; i < 4; i++) {
      const [newX, newY] = [x + xDirection[i], y + yDirection[i]];
      if (newX < 0 || newX >= n || newY < 0 || newY >= m) continue;
      if (ghostVisited[newX][newY] === -1) {
        ghostVisited[newX][newY] = ghostVisited[x][y] + 1;
        ghostQueue.push([newX, newY]);
      }
    }
  }
};

const BFSNamu = () => {
  while (namuQueue.length > 0) {
    const [x, y] = namuQueue.shift();
    for (let i = 0; i < 4; i++) {
      const [newX, newY] = [x + xDirection[i], y + yDirection[i]];
      if (newX < 0 || newX >= n || newY < 0 || newY >= m) continue;
      if (array[newX][newY] === "#") continue;
      if (
        namuVisited[newX][newY] === -1 &&
        (ghostVisited[newX][newY] === -1 || namuVisited[x][y] + 1 < ghostVisited[newX][newY])
      ) {
        namuVisited[newX][newY] = namuVisited[x][y] + 1;
        namuQueue.push([newX, newY]);
      }
    }
  }
};

BFSGhost();
BFSNamu();

const [destinationX, destinationY] = destination;

if (namuVisited[destinationX][destinationY] === -1) console.log("No");
else console.log("Yes");
