// 시작 8:30

const fs = require("fs");
let [N, ...results] = fs.readFileSync("./input.txt").toString().trim().split("\n");
N = Number(N);
results = results.map((row) => row.split(" ").map(Number));

// 9명으로 이루어진 두 팀이 공격과 수비 번갈아 하는 게임
// 3아웃 발생하면 이닝이 종료되고, 공격과 수비 바뀜
// 공격팀 선수가 홈에 도착하면 1점 득점
// 가장 좋아하는 선수인 1번 선수를 4번 타자로 결정
// 가장 많이 득점하는 타순을 찾고 그때의 득점 구하기

//-------------------

const getPermutations = (array, selectCount) => {
  if (selectCount === 1) return array.map((el) => [el]);

  const results = [];
  array.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = getPermutations(rest, selectCount - 1);
    const attached = permutations.map((el) => [fixed, ...el]);
    results.push(...attached);
  });
  return results;
};

const movePlayer = (map, moveCount) => {
  let score = 0;
  const HOMERUN = 3;

  // 주자 진루
  if (2 + moveCount >= HOMERUN) score += map[2];
  else map[2 + moveCount] += map[2];
  map[2] = 0;

  if (1 + moveCount >= HOMERUN) score += map[1];
  else map[1 + moveCount] += map[1];
  map[1] = 0;

  if (0 + moveCount >= HOMERUN) score += map[0];
  else map[0 + moveCount] += map[0];
  map[0] = 0;

  // 타자 진루
  if (moveCount === 4) score++;
  else map[moveCount - 1] += 1;

  return score;
};

const processInning = (inning, hitterOrder, startHitterIndex) => {
  let outCount = 0;
  let score = 0;
  let hitterIndex = startHitterIndex;
  const map = [0, 0, 0];

  while (outCount < 3) {
    const hitter = hitterOrder[hitterIndex];
    const result = inning[hitter];

    if (result == 0) outCount++;
    else score += movePlayer(map, result);

    hitterIndex = (hitterIndex + 1) % 9;
  }

  return { score, nextHitterIndex: hitterIndex };
};

// 1번 선수 제외 순열 구한 후 1번 선수를 4번째에 고정하기
const players = Array.from({ length: 8 }, (_, index) => index + 1);
const permutations = getPermutations(players, players.length);

let maxScore = 0;
for (const permutation of permutations) {
  const hitterOrder = [...permutation.slice(0, 3), 0, ...permutation.slice(3)];
  let totalScore = 0;
  let hitterIndex = 0;

  for (let inning = 0; inning < N; inning++) {
    const { score, nextHitterIndex } = processInning(results[inning], hitterOrder, hitterIndex);
    hitterIndex = nextHitterIndex;
    totalScore += score;
  }
  maxScore = Math.max(maxScore, totalScore);
}

console.log(maxScore);
