const fs = require("fs");
const [count, DNA, DNAMinCount] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [S, P] = count.split(" ").map(Number);
const [ACount, CCount, GCount, TCount] = DNAMinCount.split(" ").map(Number);
const DNAArray = [...DNA];
const DNAS = ["A", "C", "G", "T"];

// 각각의 개수 저장
const map = new Map();
DNAS.forEach((dna) => map.set(dna, 0));

// 비밀번호로 사용할 수 있는지 체크
const checkCan = () => {
  const [A, C, G, T] = DNAS.map((dna) => map.get(dna));
  return A >= ACount && C >= CCount && G >= GCount && T >= TCount;
};

let answer = 0;

// 첫 번째 비밀번호 ACGT 개수 갱신 -> 비밀번호로 사용할 수 있는지 체크
for (let i = 0; i < P; i++) {
  const dna = DNAArray[i];
  map.set(dna, map.get(dna) + 1);
}
if (checkCan()) answer++;

// 슬라이딩 윈도우 사용하여 비밀번호 AGCT 개수 갱신 -> 비밀번호로 사용할 수 있는지 체크
for (let i = 0; i < S - P; i++) {
  const prevStartDNA = DNAArray[i];
  const currentStartDNA = DNAArray[i + P];
  map.set(prevStartDNA, map.get(prevStartDNA) - 1);
  map.set(currentStartDNA, map.get(currentStartDNA) + 1);
  if (checkCan()) answer++;
}

console.log(answer);
