function getPower(cur, to) {
  if (cur == 0) return 2;
  else if (cur == to) return 1;
  else if (Math.abs(cur - to) == 1 || Math.abs(cur - to) == 3) return 3;
  else if (Math.abs(cur - to) == 2) return 4;
  console.log("에러 발생");
  return 0;
}

const nodes = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);
nodes.length = nodes.length - 1;
const N = nodes.length;

const d = new Array(N + 1)
  .fill(null)
  .map(() => new Array(5).fill(null).map(() => new Array(5).fill(Infinity)));
d[0][0][0] = 0;
for (let n = 1; n <= N; n++) {
  const node = nodes[n - 1];
  for (let r = 0; r < 5; r++) {
    for (let l = 0; l < 5; l++) {
      if (d[n - 1][r][l] == Infinity) continue;
      d[n][node][l] = Math.min(
        d[n - 1][r][l] + getPower(r, node),
        d[n][node][l]
      );
      d[n][r][node] = Math.min(
        d[n - 1][r][l] + getPower(l, node),
        d[n][r][node]
      );
    }
  }
}

let result = Infinity;
for (let r = 0; r < 5; r++) {
  for (let l = 0; l < 5; l++) {
    result = Math.min(result, d[N][r][l]);
  }
}

console.log(result);
