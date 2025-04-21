// 진열대의 특정 범위의 보석 모두 구매하되, 아래 목적 달성
//  진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간을 찾아서 구매
// 띄엄띄엄 사는거 X. 연속으로 사야함.
// 가장 짧은 구간의 시작 진열대 번호, 끝 진열대 번호를 차례대로 배열에 담아 return
// 만약 그런 구간이 여러개면, 시작 진열대 번호가 가장 작은 구간

// 1. set으로 총 보석 종류 개수를 구한다.
// 2. 투포인터 돌린다.
// 3. object에 보석명-개수 로 저장한다.
// 4. end를 증가시켜 해당하는 보석명의 개수를 +1하는데, 만약 0->1이 됐으면 얻은종류+1
// 5. 얻은 종류 개수가 총 보석 종류 개수랑 같아질 때까지 end 증가
// 6. 같아졌다면, start를 증가시키는데, 해당 인덱스의 보석명 개수를 -1.
// 풀이 시간 : 1시간

function solution(gems) {
  let numOfV = 0;
  const gemNum = {};
  for (const gem of gems) {
    if (gemNum[gem] == undefined) numOfV++;
    gemNum[gem] = 0;
  }

  let getType = 0;

  let start = -1;
  let end = -1;
  let minLength = Infinity;
  let result = null;
  while (end < gems.length) {
    if (getType < numOfV) {
      end++;
      gemNum[gems[end]]++;
      if (gemNum[gems[end]] == 1) getType++;
    } else {
      start++;
      gemNum[gems[start]]--;
      if (gemNum[gems[start]] == 0) {
        getType--;

        if (minLength > end - start) {
          minLength = end - start;
          result = [start + 1, end + 1];
        }
      }
    }
  }

  return result;
}
