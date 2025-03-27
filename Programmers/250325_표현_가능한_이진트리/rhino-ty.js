// 1, 111(2^3 - 1 = 8 - 1), 1111111(2^7 -1 = 128 - 1), 111111111111111(2^15 - 1)... 패턴이 존재
// 더미 포함 반드시 개수가 2^n - 1 형태여야함 + 만일 부족하다면 맨 앞에 0을 붙여야함, 3같은 경우도 '011'로 표현할 수 있으니
//    => 포화 이진 트리의 노드 수는 항상 2^n - 1개

// 1. 입력된 숫자를 이진수로 변환
// 2. 이진수의 길이를 통해 완전 이진트리에 필요한 최소 노드 수 확인
// 3. 이진수를 트리로 변환하고 유효성 검사
//    - 루트 노드는 무조건 1
//    - 더미 노드(0)가 자식을 가지면 안 됨 => 중간에 0이 나오면 그 외 모든 자식 노드도 0임
//    - 트리 구조가 유효해야 함 => 부모와 자식 관계 성립돼야함

function solution(numbers) {
  const answer = [];

  for (let i = 0; i < numbers.length; i++) {
    // 이진수로 변환 및 맨 앞에 0들을 붙여 길이 2^n - 1 고정
    let binaryStr = padBinaryStr(numbers[i].toString(2));
    // 변환된 이진 문자열이 완전 이진 트리인지 검사하고 결과를 반환
    answer.push(isValidCompleteBinary(binaryStr) ? 1 : 0);
  }

  return answer;
}

function padBinaryStr(binaryStr) {
  const n = Math.ceil(Math.log2(binaryStr.length + 1));
  // 비트 왼쪽 시프트 연산자, 1 << n은 2^n과 동치
  const targetLength = (1 << n) - 1;
  return binaryStr.padStart(targetLength, '0');
}

// function padBinaryStr(binaryStr) {
//     // 다음 2의 거듭제곱 - 1 길이 찾기
//     let targetLength = 1;
//     while (targetLength <= binaryStr.length) {
//         targetLength = targetLength * 2;
//     }
//     targetLength -= 1;

//     // 0으로 패딩
//     return binaryStr.padStart(targetLength, '0');
// }

// 중간값(처음엔 루트노드)을 재귀적으로 해석함
function isValidCompleteBinary(binaryStr) {
  const midIdx = Math.floor(binaryStr.length / 2);
  const mid = binaryStr[midIdx];

  // 중간 값이 0이고 문자열 내에 1이 존재하면 유효하지 않은 것으로 판단
  if (mid === '0' && binaryStr.indexOf('1') !== -1) return false;
  // 이진 문자열의 길이가 1이면 유효한 것으로 판단
  // if (binaryStr.length === 1) return true;

  // 이진 문자열의 왼쪽과 오른쪽 부분을 재귀적으로 검사
  return isValidCompleteBinary(binaryStr.slice(0, midIdx)) && isValidCompleteBinary(binaryStr.slice(midIdx + 1));
}

// 참고
// map은 새로운 배열을 생성. 10만 개의 요소를 가진 새 배열을 한 번에 메모리에 할당
// 대규모 데이터셋에서는 이로 인해 메모리 부족 문제가 발생
