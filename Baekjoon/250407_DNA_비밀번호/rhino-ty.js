// 슬라이딩 윈도우 문제, 완탐으로 각 i-P만큼 뽑아와도 되지만 1,000,000 정도 입력값이 커서
// 전체 순회를 하기 보단 들어오는 원소, 나가는 원소를 각각 하나 씩 해서 효율적으로 만들기

// 0. 유효 비밀번호 개수, A-T까지의 개수 변수 초기화
// 1. 초기 윈도우 문자 개수 계산
// 2. 나가는 문자, 들어오는 문자 각각 카운트 계산
// 3. 매 윈도우 문자 개수 계산한 다음 조건에 부합하면 유효 비밀번호 횟수 추가

function generatePassword(input) {
  const [S, P] = input[0].split(' ').map(Number);
  const dnaStr = input[1];
  const minDnaCountArr = input[2].split(' ').map(Number);
  const dnaEleArr = ['A', 'C', 'G', 'T'];

  let validPasswordCount = 0;
  const dnaCountArr = Array(dnaEleArr.length).fill(0);

  // 초기 윈도우에 대한 문자 개수 계산
  for (let i = 0; i < P; i++) {
    const char = dnaStr[i];
    const idx = dnaEleArr.indexOf(char);
    // DNA 문자열이 들어온다고 가정
    dnaCountArr[idx]++;
  }

  // 초기 윈도우 확인
  if (isValidPassword(dnaCountArr, minDnaCountArr)) validPasswordCount++;

  for (let i = P; i < S; i++) {
    const outChar = dnaStr[i - P]; // 0-based
    const outIdx = dnaEleArr.indexOf(outChar);
    dnaCountArr[outIdx]--;

    const inChar = dnaStr[i];
    const inIdx = dnaEleArr.indexOf(inChar);
    dnaCountArr[inIdx]++;

    if (isValidPassword(dnaCountArr, minDnaCountArr)) validPasswordCount++;
  }

  return validPasswordCount;
}

function isValidPassword(dnaCountArr, minDnaStrArr) {
  const [countA, countC, countG, countT] = dnaCountArr;
  const [minA, minC, minG, minT] = minDnaStrArr;
  return countA >= minA && countC >= minC && countG >= minG && countT >= minT;
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().split('\n');
console.log(generatePassword(input));
