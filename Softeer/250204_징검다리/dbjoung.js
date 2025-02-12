/* 답안 - 바텀업 */
const fs = require("fs");
const [N, rockString] = fs.readFileSync(0).toString().split("\n");
const rocks = rockString.split(" ").map(Number);
const d = new Array(rocks.length).fill(0);

d[0] = 1;

for (let i = 1; i < d.length; i++) {
  for (let j = 0; j < i; j++) {
    if (rocks[i] > rocks[j]) d[i] = Math.max(d[j], d[i]);
  }
  d[i]++;
}

console.log(Math.max(...d));

/* 탑다운 연습 - 시간초과
function d(n, rocks) {
    if (n==0) return 1;
    
    let lastMax = 0;
    for (let i=0 ; i<n ; i++) {
        if (rocks[i] < rocks[n]) lastMax = Math.max(lastMax, d(i, rocks))
    }

    return lastMax +1;
}

const fs = require('fs');
const [N, rockString] = fs.readFileSync(0).toString().split('\n');
const rocks = rockString.split(' ').map(Number);

let max = 0;
for (let i=0 ; i<N ; i++) {
    max = Math.max(max, d(i, rocks));
}

console.log(max);
*/
