// 연속된 부분합 중 최소 => 구간이 고정된 슬라이딩 윈도우는 아님, 투포인터를 사용해야할 듯
// 1. 시작/끝 인덱스(0), 현재 합(0), 최소 길이(무한대) 초기화
// 2. end가 배열이랑 길이가 같을 때까지 반복
//   - end를 증가하고 현재합에 더하기
//   - end로 지나온 인덱스를 while로 순회: S가 현재합보다 초과면(빼야하니까)
//     - start, 현재합, 최소 길이 변경
// 3. 최소 길이가 아직도 Infinity면 0, 아니면 그대로 반환

function getMinSumS(N, S, numArr) {
  let start = 0;
  let end = 0;
  let curSum = 0;
  let minLength = Infinity;

  while (end <= numArr.length - 1) {
    curSum += numArr[end];

    while (curSum >= S) {
      minLength = Math.min(minLength, end - start + 1);

      curSum -= numArr[start];
      start++;
    }

    end++;
  }

  return minLength === Infinity ? 0 : minLength;
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
const [N, S] = input[0].split(' ').map(Number);
const numArr = input[1].split(' ').map(Number);
console.log(getMinSumS(N, S, numArr));
