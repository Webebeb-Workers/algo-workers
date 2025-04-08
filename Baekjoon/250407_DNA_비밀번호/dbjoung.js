const [SP, strings, acgt] = require("fs")
  .readFileSync(0)
  .toString()
  .split("\n");
const [S, P] = SP.split(" ").map(Number);
const [a, c, g, t] = acgt.split(" ").map(Number);
let result = 0;
const check = { A: 0, C: 0, G: 0, T: 0 };

let start = 0;
for (let end = 0; end < strings.length; end++) {
  check[strings[end]]++;

  if (end - start + 1 == P) {
    if (check.A >= a && check.C >= c && check.G >= g && check.T >= t) result++;
    check[strings[start]]--;
    start++;
  }
}

console.log(result);
