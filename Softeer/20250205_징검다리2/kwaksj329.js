const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const N = Number(input[0]);
const A = input[1].split(' ').map(Number);

function getLISArray(arr) {
  const n = arr.length;
  const lis = [arr[0]]; // 현재까지의 증가 수열을 저장하는 배열
  const lengths = [1]; // 각 위치까지의 LIS 길이 저장

  for (let i = 1; i < n; i++) {
    if (arr[i] > lis[lis.length - 1]) {
      lis.push(arr[i]);
      lengths.push(lis.length);
    } else {
      // 이진 탐색으로 들어갈 위치 찾기
      let left = 0;
      let right = lis.length - 1;

      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (lis[mid] < arr[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      lis[left] = arr[i];
      lengths.push(left + 1);
    }
  }
  return lengths;
}

const forwardLIS = getLISArray(A); // 왼 > 오 LIS
const reversedA = [...A].reverse();
const backwardLIS = getLISArray(reversedA).reverse(); // 오 > 왼 LIS

let maximumNumber = 0;
for (let i = 0; i < N; i++) {
  maximumNumber = Math.max(maximumNumber, forwardLIS[i] + backwardLIS[i] - 1);
}

console.log(maximumNumber);
