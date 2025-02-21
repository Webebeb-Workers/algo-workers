const fs = require("fs");
const [count, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, M] = count.split(" ").map(Number);
const cityMap = array.map((element) => element.split(" ").map(Number));
const chickens = [];
const homes = [];

// 치킨 거리: 집과 가장 가까운 치킨집 사이의 거리
// 도시의 치킨 거리: 모든 집의 치킨 거리의 합
// 0: 빈 칸, 1: 집, 2:치킨집
// M개만 유지하고 폐업, '어떻게' 고를까 => 조합 문제

// 1. 치킨집 중에서 M개 고르는 조합 구하기
// 2. 그 조합들 중에서 도시의 치킨 거리가 최소인 것 구하기

// ---

// 치킨집, 집 위치 위치 저장
cityMap.forEach((row, rowIndex) => {
  row.forEach((element, columnIndex) => {
    if (element === 2) chickens.push([rowIndex, columnIndex]);
    else if (element === 1) homes.push([rowIndex, columnIndex]);
  });
});

// 조합 구하는 함수
const getCombinations = (array, selectNumber) => {
  if (selectNumber === 1) return array.map((el) => [el]);
  const results = [];
  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((el) => [fixed, ...el]);
    results.push(...attached);
  });
  return results;
};

// 도시의 치킨 거리 최소값 구하는 함수
const getMinDistance = (homes, chickenCombinations) => {
  let totalMinDistance = Infinity; // 도시의 치킨 거리 최소 저장

  chickenCombinations.forEach((selectedChickens) => {
    let totalDistance = 0; // 조합에 대한 치킨 거리 저장
    homes.forEach((home) => {
      const [hRow, hColumn] = home;

      let minDistance = Infinity; // 조합에 대한 최소 거리의 치킨 거리 저장
      selectedChickens.forEach((chicken) => {
        const [cRow, cColumn] = chicken;
        const distance = Math.abs(cRow - hRow) + Math.abs(cColumn - hColumn);
        if (distance < minDistance) minDistance = distance;
      });

      totalDistance += minDistance;
    });

    if (totalDistance < totalMinDistance) totalMinDistance = totalDistance;
  });
  return totalMinDistance;
};

const chickenCombinations = getCombinations(chickens, M);
const answer = getMinDistance(homes, chickenCombinations);
console.log(answer);
