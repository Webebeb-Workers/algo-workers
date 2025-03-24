function solution(n, q, ans) {
  // 시작: 14:10
  // 끝: 14:31

  // 비밀코드: 1~n 서로 다른 정수 5개 오름차순 정렬
  // m번의 시도 가능, 시스템은 몇 개가 비밀 코드에 포함되어 있는지 알려줌
  // m번의 시도 후, 비밀 코드로 가능한 정수 조합의 개수 구하기
  // 숫자 야구 게임같당

  // 입력: n(정수), q(입력 정수 2차원 배열), ans(시스템 응답 1차원 배열)
  // 출력: 비밀 코드로 가능한 정수 조합 개수
  //--------------------------------------

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

  const array = Array.from({ length: n }, (_, index) => index + 1);
  const combinations = getCombinations(array, 5);

  let answer = 0;
  combinations.forEach((combination) => {
    let diffFlag = false;
    for (let i = 0; i < q.length; i++) {
      let answer = q[i].filter((item) => combination.includes(item)).length;
      if (answer !== ans[i]) {
        diffFlag = true;
        break;
      }
    }

    if (!diffFlag) answer++;
  });

  return answer;
}
