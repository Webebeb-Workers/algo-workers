// replace 같은 단순 구현으로는 안될듯, 1,000,000 * 36이라서 시간초과 날 수도 있음
// 문자열 자체를 순회하면서 i < str.length - boomStr.length, i++ 로 비교해서 제거하면 될 듯
// 근데 만약 boom이 돼서 문자열이 변경된다면? => 문자열 자체로 순회하고, 매번 새 문자열을 생성해야하기에 비효율적임
// 배열을 활용하면 효율적으로 처리 가능! => FILO: 스택
//   0. str 한 글자 씩 순회
//   1. 문자열의 각 문자를 스택에 push
//   2. 스택에 폭발 문자열 길이만큼 요소가 쌓일 때마다 마지막 N개 요소가 폭발 문자열과 일치하는지 확인
//   3. 폭발 문자열과 일치하면 해당 문자들을 pop으로 제거
//   4. 모든 문자 처리 후 스택에 남은 문자들이 정답
//   5. 스택이 비어있으면 "FRULA" 출력

function getBoomedStr(str, boomStr) {
  const stack = [];
  const boomLen = boomStr.length;

  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);

    if (stack.length < boomLen) continue;

    // const curStr = stack.slice(stack.length - boomLen).join('');
    let isBoom = true;
    for (let j = 0; j < boomLen; j++) {
      if (stack[stack.length - boomLen + j] !== boomStr[j]) {
        isBoom = false;
        break;
      }
    }

    if (isBoom) {
      for (let j = 0; j < boomLen; j++) {
        stack.pop();
      }
    }
  }

  return !stack.length ? 'FRULA' : stack.join('');
}

const fs = require('fs');
const [str, boomStr] = fs.readFileSync(0).toString().trim().split('\n');
console.log(getBoomedStr(str, boomStr));
