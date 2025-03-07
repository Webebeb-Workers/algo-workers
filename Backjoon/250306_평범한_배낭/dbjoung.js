const [NK, ...thing] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, K] = NK.split(" ").map(Number);
const things = thing.map((line) => line.split(" ").map(Number));
const d = new Array(K + 1).fill(null).map(() => new Array(N + 1).fill(0));

for (let k = 1; k <= K; k++) {
  for (let n = 1; n <= N; n++) {
    const w = things[n - 1][0];
    const v = things[n - 1][1];
    if (k - w < 0) d[k][n] = d[k][n - 1];
    else d[k][n] = Math.max(d[k - w][n - 1] + v, d[k][n - 1]);
  }
}

let result = 0;
for (let n = 1; n <= N; n++) {
  result = Math.max(d[K][n], result);
}

console.log(result);
