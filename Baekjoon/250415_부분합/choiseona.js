// 9:35 시작, 9:56 끝
// 부분합 중에 합이 S 이상이 되는 것 중, 가장 짧은 것의 길이 구하기

const fs = require("fs");
const [meta, array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, S] = meta.split(" ").map(Number);
const arr = array.split(" ").map(Number);

// 투포인터
let left = 0;
let right = 0;
let sum = 0;
let minLength = Infinity;

while (true) {
  if (sum >= S) {
    minLength = Math.min(minLength, right - left);
    sum -= arr[left];
    left++;
  } else {
    if (right === N) break;
    sum += arr[right];
    right++;
  }
}

minLength === Infinity ? console.log(0) : console.log(minLength);
