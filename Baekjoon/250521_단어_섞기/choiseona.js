// 시작: 8:50

const fs = require("fs");
let [N, ...cases] = fs.readFileSync("./input.txt").toString().trim().split("\n");
N = Number(N);
cases = cases.map((line) => line.trim().split(" "));

// 첫 번째 단어와 두 번째 단어를 섞어 세번째 단어를 만들 수 있을까? (원래의 순서는 섞이지 말아야함)
// Data set n: yes or no 형식으로 출력

// dp[i][j] = true:  word1의 처음 i글자와 word2의 처음 j글자를 섞어서 result의 처음 i + j글자를 만들 수 있음

const check = (word1, word2, result) => {
  const word1Length = word1.length;
  const word2Length = word2.length;

  if (word1Length + word2Length !== result.length) return false;

  const dp = Array.from({ length: word1Length + 1 }, () => Array.from({ length: word2Length + 1 }, () => false));
  dp[0][0] = true;

  for (let i = 0; i <= word1Length; i++) {
    for (let j = 0; j <= word2Length; j++) {
      if (!dp[i][j]) continue;
      if (i < word1Length && word1[i] === result[i + j]) dp[i + 1][j] = true;
      if (j < word2Length && word2[j] === result[i + j]) dp[i][j + 1] = true;
    }
  }

  return dp[word1Length][word2Length];
};

cases.forEach(([word1, word2, result], index) => {
  const answer = check(word1, word2, result);
  console.log(`Data set ${index + 1}: ${answer ? "yes" : "no"}`);
});
