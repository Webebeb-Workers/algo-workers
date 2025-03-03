function solution(n, tops) {
  let all = tops.length + 2 * n + 1;
  let real = tops.filter((num) => num == 1).length + 2 * n + 1;
  let exist = 0;
  let d = new Array(2 * 100000 + 2).fill(0);

  d[1] = 1;
  d[2] = 2;

  for (let t = 3, exist = 3; t <= all; t++) {
    const topExist = tops[Math.floor(t / 3) - 1];
    if (t % 3 == 0 && topExist == 0) continue;

    if (t % 3 == 1 && topExist == 1)
      d[exist] = (d[exist - 1] + d[exist - 3]) % 10007;
    else d[exist] = (d[exist - 1] + d[exist - 2]) % 10007;

    exist++;
  }

  return d[real];
}
