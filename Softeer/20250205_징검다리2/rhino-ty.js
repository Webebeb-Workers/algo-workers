// 동적 계획법의 응용, 탑다운과 바텀업의 방식을 그대로 가져와야함
// 최대 증가 수열과 최대 감소 수열을 구하고, 그 i번째가 꼭짓점으로서 최대 증가/감소하기 때문에 합치면 됨
// 시간 복잡도를 줄이기 위해 이진 탐색 실행
function solution(n, stones) {
  // 증가하는 부분 수열을 저장할 배열
  let incSequence = [];
  // 현재까지의 증가 수열 길이를 저장할 배열
  let incLength = new Array(n).fill(1);

  // 감소하는 부분 수열을 저장할 배열
  let decSequence = [];
  // 현재까지의 감소 수열 길이를 저장할 배열
  let decLength = new Array(n).fill(1);

  // 이진 탐색으로 위치를 찾는 함수
  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] >= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

  // 증가 수열 계산
  for (let i = 0; i < n; i++) {
    let pos = binarySearch(incSequence, stones[i]);
    if (pos === incSequence.length) {
      incSequence.push(stones[i]);
    } else {
      incSequence[pos] = stones[i];
    }
    incLength[i] = pos + 1;
  }

  // 감소 수열 계산, 뒤에서부터 계산
  for (let i = n - 1; i >= 0; i--) {
    let pos = binarySearch(decSequence, stones[i]);
    if (pos === decSequence.length) {
      decSequence.push(stones[i]);
    } else {
      decSequence[pos] = stones[i];
    }
    decLength[i] = pos + 1;
  }

  // 각 위치에서의 최대 길이 계산
  let maxLength = 0;
  for (let i = 0; i < n; i++) {
    maxLength = Math.max(maxLength, incLength[i] + decLength[i] - 1);
  }

  return maxLength;
}

// 아래 코드는 N이 최대 3×10^5이고 현재 알고리즘은 O(N^2)이라 시간 초과가 나는 문제 발생

// function solution(n, stones) {
//   // 각 위치까지의 증가하는 부분 수열의 길이를 저장
//   const incDP = new Array(n).fill(1);
//   // 각 위치부터의 감소하는 부분 수열의 길이를 저장
//   const decDP = new Array(n).fill(1);

//   // 증가하는 부분 수열 계산
//   for (let i = 1; i < n; i++) {
//     for (let j = 0; j < i; j++) {
//       if (stones[i] > stones[j]) {
//         incDP[i] = Math.max(incDP[i], incDP[j] + 1);
//       }
//     }
//   }

//   // 감소하는 부분 수열 계산 (뒤에서부터)
//   for (let i = n - 2; i >= 0; i--) {
//     for (let j = n - 1; j > i; j--) {
//       if (stones[i] > stones[j]) {
//         decDP[i] = Math.max(decDP[i], decDP[j] + 1);
//       }
//     }
//   }

//   // 각 위치에서의 바이토닉 수열 길이 계산
//   let maxLength = 0;
//   for (let i = 0; i < n; i++) {
//     // -1은 현재 위치가 증가와 감소 수열에서 중복되므로 빼줌
//     maxLength = Math.max(maxLength, incDP[i] + decDP[i] - 1);
//   }

//   return maxLength;
// }

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = parseInt(input[0]);
const stones = input[1].split(' ').map(Number);

console.log(solution(N, stones));
