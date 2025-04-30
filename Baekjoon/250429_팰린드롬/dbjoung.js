let [N, nums, M, ...SE] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
N = Number(N);
nums = nums.split(" ").map(Number);
M = Number(M);

const pelSet = new Array(2001)
  .fill(null)
  .map(() => new Array(2001).fill(false));

// 홀수 펠린드롬 구하기
for (let center = 0; center < nums.length; center++) {
  let left = center;
  let right = center;
  while (left >= 0 && right < nums.length && nums[left] === nums[right]) {
    pelSet[left + 1][right + 1] = true;
    left--;
    right++;
  }
}

// 짝수 펠린드롬 구하기
for (let center = 0; center < nums.length - 1; center++) {
  let left = center;
  let right = center + 1;
  while (left >= 0 && right < nums.length && nums[left] === nums[right]) {
    pelSet[left + 1][right + 1] = true;
    left--;
    right++;
  }
}

const result = [];
for (const se of SE) {
  const [S, E] = se.split(" ").map(Number);
  result.push(pelSet[S][E] ? 1 : 0);
}

console.log(result.join("\n"));
