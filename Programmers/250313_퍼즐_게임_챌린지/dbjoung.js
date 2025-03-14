// n개의 퍼즐.
// 현재 퍼즐 난이도 diff, 소요 시간 time_cur, 이전 퍼즐 소요시간 time_prey, 내 숙련도 level
// diff <= level 이면 퍼즐이 틀리지 않고, time_cur 만큼의 시간을 사용하여 해결
// diff > level 이면 퍼즐을 총 diff-level 번 틀림. 퍼즐을 틀릴 때마다 time_cur만큼의 시간을 사용 & time_prev 만큼의 시간을 사용해 이전 퍼즐을 다시 풀고 와야 함.
// 제한시간(limit) 있음. 제한 시간 내에 퍼즐을 모두 해결하기 위한 숙련도의 최솟값 구하기

function playDp(lev, diffs, times) {
  const d = new Array(diffs.length + 1).fill(0);
  d[0] = 0;
  for (let i = 1; i <= diffs.length; i++) {
    const notValue = lev - diffs[i - 1] >= 0 ? 0 : diffs[i - 1] - lev;
    const prevTime = i >= 2 ? times[i - 2] : 0;
    const sumTime = notValue * (times[i - 1] + prevTime) + times[i - 1];
    d[i] = d[i - 1] + sumTime;
  }

  return d[diffs.length];
}

function solution(diffs, times, limit) {
  let right =
    diffs.reduce((acc, max) => {
      return acc < max ? max : acc;
    }, 0) + 1;
  let left = 1; //??

  let lev = 0;
  while (left < right) {
    lev = Math.floor((right + left) / 2);
    const useTime = playDp(lev, diffs, times);
    if (useTime <= limit) {
      right = lev;
    } else left = lev + 1;
  }

  return left;
}
