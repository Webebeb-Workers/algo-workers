const fs = require("fs");
let [count, numbers] = fs.readFileSync("./input.txt").toString().trim().split("\n");
count = Number(count);
numbers = numbers
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < count; i++) {
  const target = numbers[i];

  let left = 0;
  let right = count - 1;

  while (left < right) {
    if (left === i) {
      left++;
      continue;
    }
    if (right === i) {
      right--;
      continue;
    }
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      answer++;
      break;
    }
    if (sum < target) left++;
    if (sum > target) right--;
  }
}

console.log(answer);
