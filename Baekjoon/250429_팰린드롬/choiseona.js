// 시작 8:50, 끝 9:50

const fs = require("fs");
const [tempN, tempArray, tempM, ...tempQ] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const N = Number(tempN);
const array = tempArray.split(" ").map(Number);
const M = Number(tempM);
const question = tempQ.map((question) => question.split(" ").map(Number));

// 입력: N(수열 크기), N개의 자연수, M(질문) 개수, S와 E(질문)
// 출력: 각 질문에 대한 true or false
//--------------------------

// dp?
// [시작][끝] = boolean

const dp = Array.from({ length: N + 1 }, () => Array.from({ length: N + 1 }, () => false));

// 1. 수열 돌면서 dp 구하기

// 길이 1이면 무조건 팰린드롬
for (let i = 1; i <= N; i++) dp[i][i] = true;

// 길이 2이면 숫자 같아야 팰린드롬
for (let i = 0; i < N - 1; i++) {
  if (array[i] !== array[i + 1]) continue;
  dp[i + 1][i + 1 + 1] = true; // 1-base로 변환
}

// 길이 3이상이면 dp 활용하여 팰린드롬
for (let len = 3; len <= N; len++) {
  for (let start = 0; start <= N - len; start++) {
    const end = start + len - 1;
    if (array[start] !== array[end] || !dp[start + 2][end]) continue;
    dp[start + 1][end + 1] = true; // 1-base로 변환
  }
}

// 2. dp 배열 이용해서 각 질문에 대한 true or false 출력
const answer = [];
for (const [S, E] of question) {
  answer.push(dp[S][E] ? 1 : 0);
}
console.log(answer.join("\n"));
