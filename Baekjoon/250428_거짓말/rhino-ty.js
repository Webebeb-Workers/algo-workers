// 따로 알고리즘을 사용하지 않고 그냥 시뮬레이션으로 돌리면 될 듯, 입력 데이터도 작은 편이라 무지성 반복 ㄱㄱ
// 진실을 말하면 무조건 말한 사람 Set에 집어넣기
// 만일 Set에 has가 있다면, 진실을 말하고 그 인원들도 Set에 추가
// has가 false라면 구라 말하기, Set에 안집어 넣어도 됨
//   이때, 카운트 추가
// 주의할점: 구라를 듣고, 진실을 들으면 안된다. 이후 진실을 들어야할 얘들도 예측해야함
//   => while로 전체 진실을 알게 한 다음, 거짓말할 수 있는 파티를 카운트

function getMaxCanLie(N, M, TPN, TP, parties) {
  let truthToldPeople = new Set(TP);

  let changed = true;
  while (changed) {
    const beforePeopleSize = truthToldPeople.size;

    for (let i = 0; i < M; i++) {
      const [PN, ...people] = parties[i];
      const hasTruthPerson = people.some((person) => truthToldPeople.has(person));
      if (hasTruthPerson) {
        people.forEach((person) => truthToldPeople.add(person));
      }
    }

    // 반복 종료
    changed = beforePeopleSize !== truthToldPeople.size;
  }

  let lyingCount = 0;
  for (let i = 0; i < M; i++) {
    const [PN, ...people] = parties[i];
    // 모든 참가자가 진실을 모르면 거짓말 가능
    const canLie = !people.some((person) => truthToldPeople.has(person));
    if (canLie) {
      lyingCount++;
    }
  }
  return lyingCount;
}

// function getMaxCanLie(N, M, TPN, TP, parties) {
//   let lyingCount = 0;
//   let truthToldPeople = new Set(TP);

//   for (let i = 0; i < M; i++) {
//     const [PN, ...people] = parties[i];
//     let canLie = true;

//     for (let j = 0; j < PN; j++) {
//       if (truthToldPeople.has(people[j])) {
//         canLie = false;
//         break;
//       }
//     }

//     // 거짓 불가: 진실만 말하기
//     if (!canLie) {
//       people.forEach((p) => truthToldPeople.add(p));
//     }
//     // 거짓 가능
//     else {
//       lyingCount++;
//     }
//   }

//   return lyingCount;
// }

const fs = require('fs');
const input = fs.readFileSync(0).toString().split('\n');
const [[N, M], [TPN, ...TP], ...parties] = input.map((i) => i.split(' ').map(Number));

console.log(getMaxCanLie(N, M, TPN, TP, parties));
