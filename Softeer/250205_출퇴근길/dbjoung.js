function dfs(s, T, list, checkArray, visitArray) {
  const queue = [s];
  visitArray[s] = true;

  while (queue.length > 0) {
    const current = queue.pop();
    if (current === T) return true;
    checkArray[current] = true;

    for (const nextNode of list[current]) {
      if (!visitArray[nextNode]) {
        visitArray[nextNode] = true;
        queue.push(nextNode);
      }
    }
  }
}

const fs = require("fs");
let [nm, ...paths] = fs.readFileSync(0).toString().split("\n");
const [n, m] = nm.split(" ").map(Number);
const filteredPaths = paths.filter((line) => line.trim() != "");
const [S, T] = filteredPaths.pop().split(" ").map(Number);

const list = new Array(n + 1).fill(null).map(() => []);
const rlist = new Array(n + 1).fill(null).map(() => []);
const visitArray = new Array(n + 1).fill(false);
const checkArray = new Array(n + 1).fill(false);
const checkArray_r = new Array(n + 1).fill(false);
const checkArray_toS = new Array(n + 1).fill(false);
const checkArray_toS_r = new Array(n + 1).fill(false);

for (const st of filteredPaths) {
  const [s, t] = st.trim().split(" ").map(Number);
  list[s].push(t);
  rlist[t].push(s);
}

visitArray[T] = true;
if (list[S].length > 0) dfs(S, T, list, checkArray, visitArray);

visitArray.fill(false);
if (rlist[T].length > 0) dfs(T, n + 1, rlist, checkArray_r, visitArray);

visitArray.fill(false);
visitArray[S] = true;
if (list[T].length > 0) dfs(T, S, list, checkArray_toS, visitArray);

visitArray.fill(false);
if (rlist[S].length > 0) dfs(S, n + 1, rlist, checkArray_toS_r, visitArray);

let result = 0;
for (let i = 1; i <= n; i++) {
  if (
    checkArray[i] &&
    checkArray_r[i] &&
    checkArray_toS[i] &&
    checkArray_toS_r[i]
  )
    result++;
}

console.log(result);
