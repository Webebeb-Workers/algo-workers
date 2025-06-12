function solution(s) {
  let count = 0;

  for (let e of s) {
    count += e === "(" ? 1 : -1;
    if (count < 0) return false;
  }

  return count === 0;
}
