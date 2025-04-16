// 길이 N짜리 수열.
// 연속된 수들의 부분합 중, 그 합이 S이상 되는 것 중, 가장 짧은 것의 길이

// 슬라이딩 윈도우 + 이분탐색

function letSliding(leng, strings, S) {
  let start = 0;
  let sum = 0;
  let leastSum = Infinity;
  for (let end = 0; end < strings.length; end++) {
    sum += strings[end];
    if (end - start + 1 == leng) {
      if (sum >= S) return true;

      sum -= strings[start++];
    }
  }

  return false;
}

const [NS, text] = require("fs").readFileSync(0).toString().trim().split("\n");
const [N, S] = NS.split(" ").map(Number);
const strings = text.split(" ").map(Number);

let min = 1;
let max = strings.length + 1;
let isCan = false;
while (min < max) {
  let half = Math.floor((min + max) / 2);
  const isInclude = letSliding(half, strings, S);
  if (isInclude) {
    max = half;
    isCan = true;
  } else {
    min = half + 1;
  }
}

if (isCan) console.log(min);
else console.log(0);
