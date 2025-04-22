// 6:45 시작, 7:20 끝
const fs = require("fs");
const [words, bombs] = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 메모뤼 초과
// 시간 복잡도: O(N) * O(N) -> O(N*2)
// 공간 복잡도: immutable 함수 이기 때문에 메모리 초과할 확률, 반복문의 반복문이다보니 많은 데이터 저장될 확률
/* while (true) {
  const isExist = words.includes(bombs); -> O(N)
  if (isExist) words = words.replace(bombs, ""); -> O(N)
  else break;
} -> N길이 문자열 매번 복사하면서 반복 O(N^2) 

[...words.trim()].length === 0 ? console.log("FRULA") : console.log(words);


 */

// stack
// 시간 복잡도 : 반복문 O(N) * slice,splice(M) -> O(N*M)
// 공간 복잡도: stack -> O(N) + slice + join 근데 연산을 덜 하니까 위 방식보다 공간 복잡도 적음
const stack = [];

for (const word of words) {
  stack.push(word);

  if (bombs.length > stack.length) continue;
  else {
    const bombedWords = stack.slice(-bombs.length).join("");
    if (bombedWords === bombs) stack.splice(-bombs.length);
  }
}

const answer = stack.join("").trim();
answer.length === 0 ? console.log("FRULA") : console.log(answer);
