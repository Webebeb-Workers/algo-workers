// 알파벳 소문자로 이루어진 문자열 W
// 양의 정수 K
// 어떤 문자를 정확히 K개 포함하는 가장 짧은 연속 문자열의 길이를 구하기.
// 어떤 문자를 정확히 K개 포함하고, 문자열의 첫 번째와 마지막 글자가
// 해당 문자로 같은 가장 긴 연속 문자열의 길이 구하기

// 1. 문자열의 각 문자를 순회한다.
// 2. 각 문자의 아스키코드값을 인덱스로 하여 다음과 같은 내용을 저장.
// - 해당 문자의 인덱스.
// 2-1. 최소 길이 저장할 변수, 최대 길이 저장할 변수 선언
// 3. 문자 배열을 순회하며 슬라이딩 윈도우

const [T, ...games] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

let results = [];
for (let t = 0; t < games.length; t += 2) {
  const W = games[t];
  const K = Number(games[t + 1]);
  const check = new Array(26).fill(null).map(() => []);

  let max = 0;
  let min = Infinity;
  for (let i = 0; i < W.length; i++) {
    const aski = W[i].charCodeAt() - 97;
    check[aski].push(i);
  }

  for (const ids of check) {
    if (ids.length < K) continue;

    let start = 0;
    for (let end = 0; end < ids.length; end++) {
      if (end - start + 1 == K) {
        max = Math.max(max, ids[end] - ids[start] + 1);
        min = Math.min(min, ids[end] - ids[start] + 1);

        start++;
      }
    }
  }

  if (max > 0) results.push([min, max].join(" "));
  else results.push(-1);
}

for (const result of results) {
  console.log(result);
}
