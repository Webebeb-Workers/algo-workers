// 9:7 시작, 9:50 끝

const fs = require("fs");
const [meta, knows, ...parties] = fs.readFileSync("./input.txt").toString().trim().split("\n");

// 들키는 경우: 진실을 아는 사람, 진실을 아는 사람의 친구
// 입력: N(사람 수) M(파티 수), 진실 아는 사람의 수와 번호 , 파티에 오는 사람의 수와 번호
// 출력: 들키지 않고 과장된 이야기를 할 수 있는 파티 개수 최대값

//----------------------

const [peopleCount, partyCount] = meta.split(" ").map(Number);
const [count, ...knowArray] = knows.split(" ").map(Number);
const partyArray = parties.map((friend) => friend.split(" ").map(Number));

const isKnow = Array.from({ length: peopleCount + 1 }, () => false);
knowArray.forEach((person) => (isKnow[person] = true));

// 진실 퍼뜨리기
while (true) {
  let changed = false;

  for (const [count, ...people] of partyArray) {
    let hasKnow = false;

    for (const person of people) {
      if (isKnow[person]) {
        hasKnow = true;
        break;
      }
    }

    if (!hasKnow) continue;

    for (const person of people) {
      if (!isKnow[person]) {
        isKnow[person] = true;
        changed = true;
      }
    }
  }

  if (!changed) break;
}

// 참석할 수 있는 파티 수 카운트
let answer = 0;
for (const [count, ...people] of partyArray) {
  let hasKnow = false;

  for (const person of people) {
    if (isKnow[person]) hasKnow = true;
  }

  if (hasKnow) continue;

  answer++;
}

console.log(answer);
