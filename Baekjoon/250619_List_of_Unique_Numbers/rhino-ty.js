// 연속 부분수열에서 중복이 없게끔 => 슬라이딩 윈도우

function getListOfUniqueNumbers(N, numArr) {
  let validCnt = 0;
  let left = 0;
  let last = new Map(); // 각 숫자의 마지막 출현 위치

  for (let right = 0; right < N; right++) {
    const curNum = numArr[right];

    // 중복 발견시 left 포인터 조정
    if (last.has(curNum) && last.get(curNum) >= left) {
      left = last.get(curNum) + 1;
    }

    // 현재 위치 업데이트
    last.set(curNum, right);

    // [left, right] 구간에서 right로 끝나는 모든 부분수열 개수 추가
    validCnt += right - left + 1;
  }

  // // 브루트포스: 모든 시작 지점에서 탐색
  // for (let start = 0; start < N; start++) {
  //   // 중복 체크용 Set
  //   let seen = new Set();

  //   // 현재 시작점에서 최대한 확장
  //   for (let end = start; end < N; end++) {
  //     // 중복 발견시 중단
  //     if (seen.has(numArr[end])) {
  //       break;
  //     }

  //     // 새로운 원소 추가 및 카운트
  //     seen.add(numArr[end]);
  //     validCnt++;
  //   }
  // }

  return validCnt;
}

const [N, lines] = require('fs').readFileSync(0).toString().split('\n');
const numArr = lines.split(' ').map(Number);
console.log(getListOfUniqueNumbers(Number(N), numArr));
