// 주사위를 조작해 내가 원하는 수가 나오게 만들 수 있다면, 최소 몇 번만에 도착점 도착?
// 정육면체 주사위. 1-6. 게임판 10x10 1부터 100까지 수 순서대로 적힘.
// 플레이어 - 주사위 굴려서 나온 수만큼 이동.
// 플레이어 i번 칸 + 주사위 4 = i+4칸으로 이동. (1번 칸 + 주사위 4 = 5번 칸)
// 사다리칸이면 타고 위로 올라감.
// 뱀 칸이면 타고 내려감.
// 1번, 100번 칸은 일반 칸. 모든 칸은 최대 하나의 뱀 or 사다리.

// 방향 그래프의 bfs

const [NM, ...infos] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const canMove = new Array(101).fill(null);

for (const info of infos) {
  const [x, y] = info.split(" ").map(Number);
  canMove[x] = y;
}

const check = new Array(101).fill(Infinity);
const visit = new Array(101).fill(false);
const queue = [1];
visit[1] = true;
check[1] = 0;

let count = 0;
while (queue.length > 0) {
  const currentNode = queue.shift();
  const nextNodes = [];
  for (let d = 1; d <= 6; d++) {
    if (currentNode + d <= 100) nextNodes.push(currentNode + d);
  }

  for (const nextNode of nextNodes) {
    let toNextNode = canMove[nextNode] ? canMove[nextNode] : nextNode;

    if (visit[toNextNode]) continue;

    check[toNextNode] = Math.min(check[toNextNode], check[currentNode] + 1);
    queue.push(toNextNode);
    visit[toNextNode] = true;
  }
}

console.log(check[100]);
