const fs = require("fs");
const [, ...iteration] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const pairs = Array.from({ length: iteration.length / 2 }, (_, i) => [iteration[2 * i], Number(iteration[2 * i + 1])]);

pairs.forEach(([words, length]) => {
  const map = new Map();
  let minLength = Infinity;
  let maxLength = -1;

  // 알파벳별 index 기록
  [...words].forEach((word, index) => {
    if (!map.has(word)) map.set(word, []);
    map.get(word).push(index);
  });

  // 알파벳 k개 이상 포함하는 것 돌면서 문자열 최소 길이, 최대 길이 구하기
  [...map].forEach((wordIndices) => {
    const [, indices] = wordIndices;
    if (indices.length < length) return;

    for (let i = 0; i <= indices.length - length; i++) {
      const nextLength = indices[i + length - 1] - indices[i] + 1;

      // k개 포함하는 가장 짧은 연속 문자열 길이
      minLength = Math.min(minLength, nextLength);

      // k개 포함하는 가장 긴 연속 문자열 길이
      maxLength = Math.max(maxLength, nextLength);
    }
  });

  if (minLength === Infinity || maxLength === -1) {
    console.log(-1);
  } else {
    console.log(minLength, maxLength);
  }
});
