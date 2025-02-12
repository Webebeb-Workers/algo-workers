// 폐기, 구현하다가 단순 문제가 아닌 거 같고, 전체 순회를 해버리면 O(N * M)이 돼버려서 애초에 안됨.

// 2차원 배열의 자료구조를 사용해 종유석/석순 구현 방식
// 1. 각 구간마다에 true, false로 장애물 구조화
//   - 홀수는 거꾸로 => H - hurdle 수 + 1 부터 true
//   - 짝수는 그대로 => hurdle 수만큼 true
// 2. 각 구간을 1차 반복문으로 돈 다음 각각을 카운트
// 3. 제일 작은 값을 구하고, 그 값이 존재하는 배열 순회 및 카운트

function beatlesWithHurdle(N, H, hurdles) {
  const cave = Array.from({ length: H + 1 }, () => Array.from({ length: N + 1 }, () => false));
  for (let i = 1; i <= hurdles.length - 1; i++) {
    // hurdles의 [0]은 버리는 것
    if (i % 2 === 0) {
      for (let j = 1; j <= hurdles[i]; j++) {
        cave[i][j] = true;
      }
    }
    if (i % 2 !== 0) {
      const rockRoot = H - hurdles.length + 1;
      for (let j = rockRoot; j <= hurdles[i]; j++) {
        cave[i][j] = false;
      }
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, H] = input[0].split(' ').map(Number); // 길이, 높이
const hurdles = input.map(Number); // slice 안한 이유는 1-base로 사용하기 위함

console.log(beatlesWithHurdle(N, H, hurdles));
