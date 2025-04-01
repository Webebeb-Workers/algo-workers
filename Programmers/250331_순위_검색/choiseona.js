function solution(info, query) {
  // 코테 언어: cpp, java, python 택1
  // 직권: backend frontend 택1
  // 경력: junior, senior 택1
  // 소울푸드: chicken, pizza 택1
  // 지원 조건 선택하면 필터링 하는 도구
  // [조건]을 만족하는 사람 중 코테 점수 x점 이상 몇 명인가?
  // - : 조건 고려 x
  // 입력: info, query
  // 출력: 만족하는 사람들의 수
  //-------------------------
  // 1. info에 대한 모든 경우의 수를 key로 하는 map 생성
  // 2. map의 value인 scores 배열을 오름차순 정렬 (이진 탐색을 위해)
  // 3. query 돌면서 key에 대해 targetScore 이상인 사람 수를 이진 탐색으로 계산

  const getCombinationsMap = () => {
    const map = new Map();

    // 1. info에 대한 모든 경우의 수와 점수 저장
    info.forEach((item) => {
      const parts = item.split(" ");
      const score = parseInt(parts[4]);

      for (const lang of [parts[0], "-"]) {
        for (const part of [parts[1], "-"]) {
          for (const career of [parts[2], "-"]) {
            for (const food of [parts[3], "-"]) {
              const key = lang + part + career + food;
              if (!map.has(key)) map.set(key, []);
              map.get(key).push(score);
            }
          }
        }
      }
    });

    // 2. 각 key에 대한 점수 배열 정렬
    for (const scores of map.values()) {
      scores.sort((a, b) => a - b);
    }

    return map;
  };

  //  3. 이진 탐색으로 위치 찾기
  const binarySearch = (array, target) => {
    let start = 0;
    let end = array.length;

    while (start < end) {
      const mid = Math.floor((start + end) / 2);
      if (array[mid] < target) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }

    return start;
  };

  const map = getCombinationsMap();
  const answer = [];

  query.forEach((q) => {
    const [lang, part, career, food, score] = q.split(" ").filter((part) => part !== "and");
    const key = lang + part + career + food;
    const targetScore = parseInt(score);

    if (!map.has(key)) {
      answer.push(0);
    } else {
      const scores = map.get(key);
      const index = binarySearch(scores, targetScore);
      answer.push(scores.length - index);
    }
  });

  return answer;
}
