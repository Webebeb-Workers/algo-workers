function heapifyUp(queue, index) {
  const parent = Math.floor((index + 1) / 2);
  if (parent == 0) return;
  if (queue[index][2] < queue[parent][2]) {
    [queue[index], queue[parent]] = [queue[parent], queue[index]];

    heapifyUp(queue, parent);
  }
}

function heapifyDown(queue, index) {
  const left = index * 2 + 1;
  const right = index * 2 + 2;
  let smallest = index;

  if (left < queue.length && queue[left][2] < queue[smallest][2])
    smallest = left;
  if (right < queue.length && queue[right][2] < queue[smallest][2])
    smallest = right;

  if (smallest == index) return;

  [queue[smallest], queue[index]] = [queue[index], queue[smallest]];
  heapifyDown(queue, smallest);
}

function addValue(queue, data) {
  queue.push(data);

  if (queue.length == 1) return;
  heapifyUp(queue, queue.length - 1);
}

function popValue(queue) {
  const pop = [...queue[0]];
  const lastValue = queue.pop();

  if (queue.length == 0) return [...pop];

  queue[0] = lastValue;
  heapifyDown(queue, 0);

  return [...pop];
}

const text = require("fs").readFileSync(0).toString().trim().split("\n");

let t = 0;
let tNum = 1;
while (text[t] > 0) {
  const N = Number(text[t]);
  const map = text
    .slice(t + 1, t + N + 1)
    .map((line) => line.split(" ").map(Number));
  const check = new Array(N).fill(null).map(() => new Array(N).fill(Infinity));
  //TC별 로직 작성

  const queue = [];
  addValue(queue, [0, 0, map[0][0]]);
  check[0][0] = map[0][0];

  while (queue.length > 0) {
    const [x, y, v] = popValue(queue);
    if (check[x][y] < v) continue;
    for (const [xx, yy] of [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ]) {
      let nextX = x + xx;
      let nextY = y + yy;

      if (nextX >= 0 && nextX < N && nextY >= 0 && nextY < N) {
        if (check[nextX][nextY] > check[x][y] + map[nextX][nextY]) {
          check[nextX][nextY] = check[x][y] + map[nextX][nextY];
          addValue(queue, [nextX, nextY, check[nextX][nextY]]);
        }
      }
    }
  }

  console.log(`Problem ${tNum}:`, check[N - 1][N - 1]);

  t += N + 1;
  tNum++;
}
