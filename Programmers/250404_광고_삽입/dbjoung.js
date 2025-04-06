function transToSec(time) {
  const [h, m, s] = time.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}

function transToTime(sec) {
  const h = Math.floor(sec / 3600);
  let least = sec - h * 3600;
  const m = Math.floor(least / 60);
  least -= m * 60;

  return [
    `${h}`.padStart(2, 0),
    `${m}`.padStart(2, 0),
    `${least}`.padStart(2, 0),
  ].join(":");
}

function solution(play_time, adv_time, logs) {
  const playSec = transToSec(play_time);
  const advSec = transToSec(adv_time);
  const check = new Array(playSec + 1).fill(0);

  for (const log of logs) {
    const [start, end] = log.split("-");
    const startTime = transToSec(start);
    const endTime = transToSec(end);
    check[startTime]++;
    check[endTime]--;
  }

  for (let i = 1; i < check.length; i++) {
    check[i] += check[i - 1];
  }

  let start = 0;
  let end = 0;
  let sum = 0;

  let longestSec = 0;
  let longestCheck = 0;
  while (end <= check.length) {
    if (end - start == advSec) {
      if (longestSec < sum) {
        longestSec = sum;
        longestCheck = start;
      }
      sum -= check[start++];
    }
    sum += check[end++];
  }

  return transToTime(longestCheck);
}
