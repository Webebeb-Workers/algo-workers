const fs = require("fs");
const [count, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, H] = count.split(" ").map(Number);
const 석순 = Array.from({ length: H + 1 }, () => 0);
const 종유석 = Array.from({ length: H + 1 }, () => 0);
const 전체 = Array.from({ length: H + 1 }, () => 0);

// 높이가 x인 것의 수 -> 누적합 하여 높이가 x 이상인 것의 수 구하기

// 높이가 x인 것의 수 구하기
array.forEach((element, index) => {
  const height = Number(element);
  if (index % 2 === 0) {
    석순[height]++;
  } else {
    종유석[height]++;
  }
});

// 누적합해서 높이가 x 이상인 것의 수 구하기
for (let h = H - 1; h >= 1; h--) {
  석순[h] += 석순[h + 1];
  종유석[h] += 종유석[h + 1];
}

// 석순 + 종유석
for (let h = 1; h <= H; h++) {
  전체[h] = 석순[h] + 종유석[H - h + 1];
}

// 최소값 구하기
const [, ...rest] = 전체;
const min = Math.min(...rest);
const minCount = rest.filter((element) => element === min).length;

console.log(min, minCount);
