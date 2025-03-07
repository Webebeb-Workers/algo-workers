const [NM, ...inputs] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, M] = NM.split(" ").map(Number);
const nums = Array.from(inputs, (line) => line.split(" ").map(Number));
const d = nums.map((row) => [0, ...row]);
d.unshift(new Array(M + 1).fill(0));

let maxSum = -10001;
for (let r = 1; r <= N; r++) {
  for (let c = 1; c <= M; c++) {
    d[r][c] += d[r - 1][c] + d[r][c - 1] - d[r - 1][c - 1];
  }
}

for (let r1 = 1; r1 <= N; r1++) {
  for (let c1 = 1; c1 <= M; c1++) {
    for (let r = r1; r <= N; r++) {
      for (let c = c1; c <= M; c++) {
        const sum = d[r][c] - d[r1 - 1][c] - d[r][c1 - 1] + d[r1 - 1][c1 - 1];
        maxSum = Math.max(sum, maxSum);
      }
    }
  }
}

console.log(maxSum);
