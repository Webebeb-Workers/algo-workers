// 11:40 시작, 12:18 끝
// 주사위로 1~100의 보드게임
// 주사위 굴린 결과 100이 넘어가면 이동 불가
// 100번 칸에 도착하기 위해 주사위를 굴려야 하는 횟수의 최소값 구하기
// -------------------------------------------------------------------
const fs = require("fs");
const [info, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, M] = info.split(" ").map(Number);
const board = Array.from({ length: 101 }, (_, index) => index);
const visited = Array.from({ length: 101 }, () => false);
array.forEach((item) => {
  const [start, end] = item.split(" ").map(Number);
  board[start] = end;
});

// 최단거리, 가중치 없음 -> bfs?

const BFS = () => {
  const queue = [[1, 0]]; // [현재칸, 주사위굴린횟수]
  visited[1] = true;

  while (queue.length > 0) {
    const [current, count] = queue.shift();
    if (current === 100) return count;

    for (let i = 1; i <= 6; i++) {
      // 사다리 또는 뱀 위치로 이동
      let next = board[current + i];
      if (next > 100 || visited[next]) continue;

      visited[next] = true;
      queue.push([next, count + 1]);
    }
  }
};

const answer = BFS();
console.log(answer);
