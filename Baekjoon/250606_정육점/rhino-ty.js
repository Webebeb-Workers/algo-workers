// 최소 가격 + 가격 아래 싼 고기는 모두 덤 => 정렬 후 그리디하게 접근

// 1. 가격 기준으로 내림차순 정렬
// 2. 전체 무게 합 구함
// 3. 가장 비싼 것부터 하나씩 제거하면서, 남은 무게가 여전히 M 이상인지 확인
// 4. M 미만이 되는 순간, 바로 직전에 제거하려던 고기의 가격이 답

function getMinCostToBuyMeat(N, M, meatArr) {
  // 가격 내림차순 정렬
  meatArr.sort((a, b) => b[1] - a[1]);

  // 전체 무게의 합 계산, 불가능 조건 실행
  let totalWeight = meatArr.reduce((sum, [weight, price]) => sum + weight, 0);
  if (totalWeight < M) return -1;

  // 가장 비싼 것부터 하나씩 제거하면서 확인
  for (let i = 0; i < N; i++) {
    const [curWeight, curPrice] = meatArr[i];

    // 현재 고기 제거: 여전히 M 이상이면 제거
    const weightWithoutCur = totalWeight - curWeight;
    if (weightWithoutCur >= M) {
      totalWeight = weightWithoutCur;
    } else {
      // 제거하면 M 미만이 되므로, 이 고기를 사야 함
      return curPrice;
    }
  }

  // 모든 고기를 다 제거해도 M 이상이었다면 (이론적으로 불가능)
  return 0;
}

const [[N, M], ...meatArr] = require('fs')
  .readFileSync(0)
  .toString()
  .split('\n')
  .map((i) => i.split(' ').map(Number));
console.log(getMinCostToBuyMeat(N, M, meatArr));
