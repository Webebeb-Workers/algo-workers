// 시작 8:20

const fs = require("fs");
let [cityCount, cityPopulations, ...cityNeighbors] = fs.readFileSync("./input.txt").toString().trim().split("\n");
cityCount = Number(cityCount);
cityPopulations = cityPopulations.split(" ").map(Number);
cityNeighbors = cityNeighbors.map((item) => item.split(" ").map(Number));
const allCities = Array.from({ length: cityCount }, (_, index) => index + 1);

// 특정 개수의 조합 생성
const getCombinations = (array, selectCount) => {
  if (selectCount === 1) return array.map((el) => [el]);

  const result = [];
  array.forEach((item, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectCount - 1);
    const attached = combinations.map((combination) => [item, ...combination]);
    result.push(...attached);
  });
  return result;
};

// 그래프 연결
const drawGraph = () => {
  const graph = Array.from({ length: cityCount + 1 }, () => []);

  cityNeighbors.forEach(([, ...neighbors], city) => {
    neighbors.forEach((neighbor) => {
      graph[city + 1].push(neighbor);
      graph[neighbor].push(city + 1);
    });
  });

  return graph;
};

// 모든 조합 구하기
const getAllCombinations = () => {
  const allCombinations = [];

  for (let i = 1; i <= Math.floor(cityCount / 2); i++) {
    const combination = getCombinations(allCities, i);
    allCombinations.push(...combination);
  }

  return allCombinations;
};

// 도달 가능한지 체크
const checkConnected = (group) => {
  const visited = new Set();
  const queue = [group[0]];
  visited.add(group[0]);

  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of graph[current]) {
      if (!group.includes(neighbor) || visited.has(neighbor)) continue;
      queue.push(neighbor);
      visited.add(neighbor);
    }
  }

  return visited.size === group.length;
};

// 가능한 케이스인지 check
const checkPossible = (group1, group2) => {
  return checkConnected(group1) && checkConnected(group2);
};

// 인구 차이 구하기
const getPopulationDiff = (group1, group2) => {
  const sum1 = group1.reduce((acc, city) => acc + cityPopulations[city - 1], 0);
  const sum2 = group2.reduce((acc, city) => acc + cityPopulations[city - 1], 0);
  return Math.abs(sum1 - sum2);
};

// 인구 차이 최소 구하기
const getMinDiff = (combinations) => {
  let minDiff = Infinity;

  combinations.forEach((group1) => {
    const group2 = allCities.filter((city) => !group1.includes(city));

    if (checkPossible(group1, group2)) {
      const diff = getPopulationDiff(group1, group2);
      minDiff = Math.min(minDiff, diff);
    }
  });

  return minDiff === Infinity ? -1 : minDiff;
};

const graph = drawGraph();
const combinations = getAllCombinations();
const minDiff = getMinDiff(combinations);

console.log(minDiff);
