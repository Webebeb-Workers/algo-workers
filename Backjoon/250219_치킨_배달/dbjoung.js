function getDistance(selects) {
  let result = 0;
  for (const house of houses) {
    let distance = Infinity;
    for (const select of selects) {
      distance = Math.min(
        Math.abs(select[0] - house[0]) + Math.abs(select[1] - house[1]),
        distance
      );
    }
    result += distance;
  }
  return result;
}

function dfs(m, s, M, selects) {
  if (m == M) {
    answer = Math.min(getDistance(selects), answer);
    return;
  }

  for (let i = s; i < chickens.length; i++) {
    if (chickens.length - i + selects.length < M) continue;
    if (checkArray[i]) continue;
    checkArray[i] = true;
    dfs(m + 1, i + 1, M, [...selects, [...chickens[i]]]);
    checkArray[i] = false;
  }
}

const [NMs, ...inputs] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const map = inputs.map((line) => line.split(" ").map(Number));
const [N, M] = NMs.split(" ").map(Number);

const houses = [];
const chickens = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] == 1) houses.push([i, j, Infinity]);
    else if (map[i][j] == 2) chickens.push([i, j]);
  }
}

let checkArray = new Array(chickens.length).fill(false);
let answer = Infinity;
dfs(0, 0, M, []);

console.log(answer);
