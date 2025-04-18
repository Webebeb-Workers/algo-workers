// 도착지점은 서로 겹치지 않음.
// 지점 개수 3 이상 200 이하
// s, a, b는 1 이상 n이하 자연수
// fares 크기 n(n-1) / 2
// cdf, dcf 공존 x

function solution(N, S, A, B, fares) {
  const board = new Array(N + 1)
    .fill(null)
    .map(() => new Array(N + 1).fill(Infinity));

  for (const [c, d, f] of fares) {
    board[c][d] = f;
    board[d][c] = f;
  }

  for (let n = 1; n <= N; n++) {
    for (let f = 1; f <= N; f++) {
      for (let e = 1; e <= N; e++) {
        if (f == e) {
          board[f][e] = 0;
          continue;
        }
        board[f][e] = Math.min(board[f][e], board[f][n] + board[n][e]);
      }
    }
  }

  let sum = Infinity;
  for (let n = 1; n <= N; n++) {
    sum = Math.min(sum, board[S][n] + board[n][A] + board[n][B]);
  }

  return sum;
}
