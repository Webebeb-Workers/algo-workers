function solution(clothes) {
  const clothesMap = new Map();
  let totalCombinations = 1;
  const NOTHING = 1;

  clothes.forEach(([_, clothesType]) => {
    clothesMap.set(clothesType, (clothesMap.get(clothesType) || 0) + 1);
  });

  for (let [_, value] of clothesMap) {
    totalCombinations *= value + 1;
  }

  return totalCombinations - NOTHING;
}
