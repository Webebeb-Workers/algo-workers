function solution(info, n, m) {
  const d = new Array(info.length + 1)
    .fill(null)
    .map(() => new Array(m).fill(Infinity));

  d[0][0] = 0;
  for (let i = 1; i <= info.length; i++) {
    for (let b = 0; b < m; b++) {
      if (d[i - 1][b] < 121) {
        if (d[i - 1][b] + info[i - 1][0] < n)
          d[i][b] = Math.min(d[i - 1][b] + info[i - 1][0], d[i][b]);
        if (b + info[i - 1][1] < m)
          d[i][b + info[i - 1][1]] = Math.min(
            d[i - 1][b],
            d[i][b + info[i - 1][1]]
          );
      }
    }
  }

  const result = d[info.length].reduce((f, s) => {
    return f > s ? s : f;
  }, Infinity);

  if (result == Infinity) return -1;
  else return result;
}
