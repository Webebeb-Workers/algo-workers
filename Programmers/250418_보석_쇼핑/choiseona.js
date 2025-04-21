function solution(gems) {
  // 시작 - 11:30, 끝 - 12:33

  // 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간의 보석 모두 구매
  // 입력: gems(보석들 이름)
  // 출력: [시작 진열대 번호, 끝 진열대 번호]

  //-------------------------------------
  // set, map, 투포인터 활용

  let allCategoryCount = new Set(gems).size;
  let left = 0;
  let right = 0; // 현재 진열대 구간
  let minLeft = Infinity;
  let minRight = Infinity; // 시작 진열대 번호가 가장 작은 구간
  let currentMap = new Map([[gems[0], 1]]);

  while (right < gems.length) {
    if (allCategoryCount === currentMap.size) {
      if (minLeft === Infinity || minRight - minLeft + 1 > right - left + 1) {
        minLeft = left;
        minRight = right;
      }
      const leftGem = gems[left];
      const leftGemCount = currentMap.get(leftGem);
      leftGemCount === 1 ? currentMap.delete(leftGem) : currentMap.set(leftGem, leftGemCount - 1);
      left++;
    } else {
      right++;
      currentMap.set(gems[right], (currentMap.get(gems[right]) || 0) + 1);
    }
  }
  return [minLeft + 1, minRight + 1];
}
