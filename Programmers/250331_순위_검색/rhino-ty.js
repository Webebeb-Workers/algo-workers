// 그냥 구현하면 정확도는 100점: info를 순회하면서, info 분해, 또 query 순회하면서 분해 후 info 순회하면서 개수 탐색
// 하지만 O(infoN * queryN) = 최악의 경우 5,000,000,000번의 연산을 하게 되니 효율성 필요
// info 분해 시 그룹화 진행(해당되는 조건) 및 점수 이진탐색? => 점수는 무조건 있어야해서 따로 둠

function solution(info, query) {
  // 해시맵 생성
  const infoMap = {};

  // info 정보 처리
  info.forEach((i) => {
    const [lang, job, exp, food, score] = i.split(' ');
    const scoreNum = parseInt(score);

    // 가능한 모든 조합 생성
    getCombinations(lang, job, exp, food).forEach((key) => {
      if (!infoMap[key]) {
        infoMap[key] = [];
      }
      infoMap[key].push(scoreNum);
    });
  });

  // 점수 정렬
  for (const key in infoMap) {
    infoMap[key].sort((a, b) => a - b);
  }

  // 쿼리 처리
  return query.map((q) => {
    const parts = q.split(' and ');
    const [food, score] = parts.pop().split(' ');
    const key = parts.concat(food).join('');
    const scoreNum = parseInt(score);

    if (!infoMap[key]) return 0;

    return infoMap[key].length - binarySearch(infoMap[key], scoreNum);
  });
}

// 모든 조합 생성 함수: DFS 방식
function getCombinations(lang, job, exp, food) {
  const result = [];
  const options = [
    [lang, '-'],
    [job, '-'],
    [exp, '-'],
    [food, '-'],
  ];

  function generate(index, current) {
    // 기저
    if (index === 4) {
      result.push(current.join(''));
      return;
    }

    options[index].forEach((option) => {
      current[index] = option;
      generate(index + 1, current);
    });
  }

  generate(0, Array(4).fill(''));
  return result;
}

// 이진 탐색 함수
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// 데이터베이스 시스템도 이와 매우 유사한 방식으로 작동한다! 실제로 데이터베이스에서는 이런 기법을 훨씬 더 정교하게 활용하기는 하지만..
