// 구현 문제, 각 직선을 조합으로 구하고, 교점 공식으로 정수가 나오는 것들을 저장, 나오는 result로 교점 그리기(최소 사각형)

function solution(line) {
  const points = new Set(); // 중복 제거를 위함
  const combinations = getCombination(line);

  // 모든 조합에 대해 교점 계산
  for (let i = 0; i < combinations.length; i++) {
    const [line1, line2] = combinations[i];
    const [A, B, E] = line1;
    const [C, D, F] = line2;

    // 분모가 0인 경우 (평행 또는 일치) 제외
    const denominator = A * D - B * C;
    if (denominator === 0) continue;

    // 교점 계산
    const x = (B * F - E * D) / denominator;
    const y = (E * C - A * F) / denominator;

    // 정수 좌표인 경우만 저장
    // if (x % 1 === 0 && y % 1 === 0) {
    if (Number.isInteger(x) && Number.isInteger(y)) {
      points.add(`${x},${y}`); // Set 중복 제거는 메모리주소에 의해 제거됨(참조형은 안돼서 문자열로 치환)
    }
  }

  const pointArray = [...points].map((p) => {
    const [x, y] = p.split(',').map(Number);
    return [x, y];
  });

  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;
  for (const [x, y] of pointArray) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const result = Array(height)
    .fill()
    .map(() => Array(width).fill('.'));

  for (const [x, y] of pointArray) {
    // 좌표계 변환
    const row = maxY - y; // y축 뒤집기
    const col = x - minX;
    result[row][col] = '*';
  }

  return result.map((row) => row.join(''));
}

function getCombination(lineArr) {
  const lineCombi = [];

  function dfs(current, start) {
    if (current.length === 2) {
      lineCombi.push([...current]);
      return;
    }

    for (let i = start; i < lineArr.length; i++) {
      current.push(lineArr[i]);
      dfs(current, i + 1);
      current.pop();
    }
  }

  dfs([], 0);
  return lineCombi;
}
