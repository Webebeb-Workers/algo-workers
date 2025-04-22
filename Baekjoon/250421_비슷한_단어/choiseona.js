// 9:03 시작

const fs = require("fs");
const [, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");

// n개의 영단어 중 가장 비슷한 단어 구하기
// 비슷한 정도: 접두사 길이
// M개의 글자들이 같으면서 M이 최대인 경우 구하기
// -> 앞에 같은 문자열 길이 구하기
// 여러개이면 앞에있는 단어
// --------------------------

const getPrefix = (a, b) => {
  let index = 0;
  while (index < Math.min(a.length, b.length)) {
    if (a[index] === b[index]) index++;
    else break;
  }
  return a.slice(0, index);
};

const words = array.map((word, index) => ({ word, index }));
words.sort((a, b) => a.word.localeCompare(b.word));

// key: prefix, value: index[] 형태로 저장하기
const prefixMap = new Map();
for (let i = 0; i < words.length - 1; i++) {
  const a = words[i];
  const b = words[i + 1];
  const prefix = getPrefix(a.word, b.word);
  if (prefix.length === 0) continue;

  if (!prefixMap.has(prefix)) {
    prefixMap.set(prefix, new Set([a.index, b.index]));
  } else {
    const set = prefixMap.get(prefix);
    set.add(a.index);
    set.add(b.index);
  }
}

// prefix 길이 가장 긴거 index들 중 가장 작은 인덱스 2개 선택하기
let maxLength = 0;
let answer = [0, 0];
[...prefixMap].forEach(([prefix, indices]) => {
  const sortedIndices = [...indices].sort((a, b) => a - b);
  if (prefix.length < maxLength) return;
  if (prefix.length > maxLength) {
    answer = [sortedIndices[0], sortedIndices[1]];
    maxLength = prefix.length;
  }
  if (prefix.length === maxLength && sortedIndices[0] < answer[0]) {
    answer = [sortedIndices[0], sortedIndices[1]];
  }
});

console.log(array[answer[0]]);
console.log(array[answer[1]]);
