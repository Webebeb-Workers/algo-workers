// 완전탐색, b + y = 전체 격자 수에 대한 모든 약수에 대해 가로 세로 조합을 만든 후 노란색 격자 수가 주어진 값과 일치하는지 확인
function solution(brown, yellow) {
  const total = brown + yellow;

  // 가능한 모든 (가로, 세로) 조합 탐색
  for (let height = 3; height <= Math.sqrt(total); height++) {
    if (total % height === 0) {
      // height가 total의 약수인 경우
      const width = total / height;

      // 조건 확인: 가로 >= 세로
      if (width >= height) {
        const yellowCnt = (width - 2) * (height - 2);

        // 주어진 노란색 격자 수와 일치하는지 확인
        if (yellowCnt === yellow) {
          return [width, height];
        }
      }
    }
  }
}
