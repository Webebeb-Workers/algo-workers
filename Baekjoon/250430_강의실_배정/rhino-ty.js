// 시간에 따른 최소의 강의실을 구하는 문제
// 10^9로 매우 크기 때문에 일반 배열이나 DP 사용 불가
// 시간에 따른 사건만 파악하도록 해야함 => 시작 시 +1  종료 시 -1 을 지정
// 즉, 여기서 최대로 +1이 되는 것 자체가 최소 강의실임

function getMinLectureRoom(N, ST) {
  const stTimes = [];
  for (let i = 0; i < N; i++) {
    const [S, T] = ST[i];
    stTimes.push([S, 1]); // 시작 이벤트
    stTimes.push([T, -1]); // 종료 이벤트
  }

  stTimes.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1]; // 종료(-1)가 시작(1)보다 먼저 오도록
  });

  let count = 0;
  let maxCount = 0;
  for (let i = 0; i < stTimes.length; i++) {
    count += stTimes[i][1];
    maxCount = Math.max(maxCount, count);
  }

  return maxCount;
}

const fs = require('fs');
const [N, ...ST] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.split(' ').map(Number));
console.log(getMinLectureRoom(N, ST));
