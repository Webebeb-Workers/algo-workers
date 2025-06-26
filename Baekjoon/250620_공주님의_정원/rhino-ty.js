// 3월 1일부터 11월 30일까지 연속적으로 꽃이 피어있을 꽃의 최소 개수
// 3월 1일부터! 최대한 덮을 수 있는 꽃을 선택해서 해야함, 그리디??

function getMinCountFlowers(N, flowers) {
  flowers.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });

  const TARGET_START = 301; // 3/1
  const TARGET_END = 1130; // 11/30

  let count = 0;
  let curEnd = TARGET_START;
  let i = 0;

  while (curEnd <= TARGET_END) {
    let maxEnd = 0;
    let found = false;

    while (i < N && flowers[i][0] <= curEnd) {
      if (flowers[i][1] > maxEnd) {
        maxEnd = flowers[i][1];
        found = true;
      }
      i++;
    }

    if (!found) {
      count = 0;
      break;
    }

    count++;
    curEnd = maxEnd;
  }

  return count;
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().split('\n');

const N = parseInt(input[0]);
const flowers = [];

for (let i = 1; i <= N; i++) {
  const [SM, SD, EM, ED] = input[i].split(' ').map(Number);

  const startDate = SM * 100 + SD;
  const endDate = EM * 100 + ED;

  flowers.push([startDate, endDate]);
}

console.log(getMinCountFlowers(N, flowers));
