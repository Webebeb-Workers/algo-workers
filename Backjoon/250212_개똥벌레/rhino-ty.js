// 아 혹시 정렬도 사용 가능 한가? 홀수, 짝수로 나누고, 크기 탐색 후(이진 탐색을 사용해야하나?)
// 그 크기만큼의 장애물을 1부터 시작해서 H까지 계산
// 1. 석순과 종유석을 분리
// 2. 각각 정렬
// 3. H의 각 높이마다 체크(이진 탐색 후 카운팅), H + 1까지 배열 만든 후 카운팅

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return arr.length - left; // target보다 큰 값의 개수 반환
}
function beatlesWithHurdle(N, H, hurdles) {
  const topRocks = [];
  const bottomRocks = [];

  // hurdles는 1-base
  for (let i = 1; i <= N; i++) {
    i % 2 !== 0 ? topRocks.push(hurdles[i]) : bottomRocks.push(hurdles[i]);
  }

  // 정렬
  bottomRocks.sort((a, b) => a - b);
  topRocks.sort((a, b) => a - b);

  let minHurdles = N; // 최대값으로 초기화
  let count = 0; // 최소값을 가진 구간의 수

  // 각 높이별로 장애물 수 계산
  for (let height = 1; height <= H; height++) {
    // 석순: h보다 큰 석순의 수
    const bottomCount = binarySearch(bottomRocks, height - 1);

    // 종유석: (H-height+1)보다 큰 종유석의 수
    const topCount = binarySearch(topRocks, H - height);

    const totalHurdles = bottomCount + topCount;

    if (totalHurdles < minHurdles) {
      minHurdles = totalHurdles;
      count = 1;
    } else if (totalHurdles === minHurdles) {
      count++;
    }
  }

  return `${minHurdles} ${count}`;
}

// 폐기, 구현하다가 단순 문제가 아닌 거 같고, 전체 순회를 해버리면 O(N * M)이 돼버려서 애초에 안됨.

// 2차원 배열의 자료구조를 사용해 종유석/석순 구현 방식
// 1. 각 구간마다에 true, false로 장애물 구조화
//   - 홀수는 거꾸로 => H - hurdle 수 + 1 부터 true
//   - 짝수는 그대로 => hurdle 수만큼 true
// 2. 각 구간을 1차 반복문으로 돈 다음 각각을 카운트
// 3. 제일 작은 값을 구하고, 그 값이 존재하는 배열 순회 및 카운트

// function beatlesWithHurdle(N, H, hurdles) {
//   const cave = Array.from({ length: H + 1 }, () => Array.from({ length: N + 1 }, () => false));
//   for (let i = 1; i <= hurdles.length - 1; i++) {
//     // hurdles의 [0]은 버리는 것
//     if (i % 2 === 0) {
//       for (let j = 1; j <= hurdles[i]; j++) {
//         cave[i][j] = true;
//       }
//     }
//     if (i % 2 !== 0) {
//       const rockRoot = H - hurdles.length + 1;
//       for (let j = rockRoot; j <= hurdles[i]; j++) {
//         cave[i][j] = false;
//       }
//     }
//   }
// }

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, H] = input[0].split(' ').map(Number); // 길이, 높이
const hurdles = input.map(Number); // [0]은 안쓰는 값 => 1-base로 사용하기 위함

console.log(beatlesWithHurdle(N, H, hurdles));
