// 트램펄린에 부딪히는 최대 별똥별을 구해야함 => 완탐: 최댓값 변수를 두고, 0부터 N-K, M-K 만큼 돌면서 해야하나?
//   근데 그러면 N * M * K^2이 돼서 시간 초과가 날 거 같음.
// 무조건 별똥별이 있는 위치를 기준으로 배치하기 때문에 M*N의 별똥별 구역 전체를 도는 게 아닌, 별똥별 K번 순회하면서 하면 될 듯
// 트램펄린을 두는 것도 각 별똥별 중앙이 아닌 두 별똥별 조합 x, y 좌표를 추출한 거로 별 계산

// 1. 별똥별 K개의 좌표 (x, y) 저장
// 2. 모든 별똥별 쌍에 대해 트램펄린 배치 시도하며 최대 별똥별 수 계산
//   - 별똥별 i, j를 선택한 뒤 i의 x좌표와 j의 y좌표로 좌측 상단 모서리 배치
//   - 이 배치에서 트램펄린 안에 들어오는 별똥별 수 세기
// 3. 최대로 튕겨낼 수 있는 별똥별 수 찾고, 지구에 부딪히는 별똥별 수 계산

function findMinStarsHitGround(N, M, L, K, stars) {
  let maxStarsCaught = 0;

  for (let i = 0; i < K; i++) {
    for (let j = 0; j < K; j++) {
      const starX = stars[i][0];
      const starY = stars[j][1];

      const starsCaughtCount = countStarInTrampoline(starX, starY, stars, L);

      maxStarsCaught = Math.max(maxStarsCaught, starsCaughtCount);
    }
  }

  return K - maxStarsCaught;
}

function countStarInTrampoline(starX, starY, stars, L) {
  let count = 0;

  for (const [x, y] of stars) {
    if (starX >= x && starY >= y && starX <= x + L && starY <= y + L) count++;
  }

  return count;
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
const [N, M, L, K] = input[0].split(' ').map(Number);
const stars = input.slice(1).map((s) => s.split(' ').map(Number));

console.log(findMinStarsHitGround(N, M, L, K, stars));
