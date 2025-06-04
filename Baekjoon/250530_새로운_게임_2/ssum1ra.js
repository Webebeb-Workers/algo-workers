const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on("line", (line) => input.push(line)).on("close", () => {
  const [n, k] = input[0].split(' ').map(Number)
  const board = input.slice(1, n + 1).map((row) => row.split(' ').map(Number))
  const pieces = input.slice(n+1).map((line) => {
    const [r, c, d] = line.split(' ').map(Number)
    return { r: r - 1, c: c - 1, d: d - 1}
  })

  const map = Array.from({length: n}, () => Array.from({length: n}, () => []))

  pieces.forEach((_, idx) => {
    const { r, c } = pieces[idx];
    map[r][c].push(idx);
  })

  const dx = [0, 0, -1, 1]
  const dy = [1, -1, 0, 0]
  const reverse = [1, 0, 3, 2]

  let turn = 0
  let finished = false

  while (turn <= 1000 && !finished) {
    turn++

    for (let i = 0; i < k; i++) {
      const piece = pieces[i]
      const { r, c, d } = piece
      const idx = map[r][c].indexOf(i)
      const moving = map[r][c].splice(idx)

      let nr = r + dx[d];
      let nc = c + dy[d];

      if (nr < 0 || nr >= n || nc < 0 || nc >= n || board[nr][nc] === 2) {
        piece.d = reverse[d]
        nr = r + dx[piece.d]
        nc = c + dy[piece.d]

        if (nr < 0 || nr >= n || nc < 0 || nc >= n || board[nr][nc] === 2) {
          map[r][c].push(...moving)
          continue
        }
      }

      if (board[nr][nc] == 1) moving.reverse()
        
      for (const m of moving) {
        pieces[m].r = nr
        pieces[m].c = nc
      }

      map[nr][nc].push(...moving)

      if (map[nr][nc].length >= 4) {
        finished = true
        break
      }
    }
  }

  console.log(turn > 1000 ? -1 : turn)
})