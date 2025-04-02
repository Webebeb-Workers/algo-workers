function solution(line) {
  // 9:11 시작
  // 9:46 끝

  // 입력: line([A,B,C][])
  // 출력: 모든 별을 포함하는 최소 사각형
  //-------------------------------

  // 두 직선(Ax + By + E = 0, Cx + Dy + F = 0)의 교점:
  // x = (BF - ED) / AD - BC, y = (EC - AF) / (AD - BC)
  // 평행또는 일치할 때: AD - BC = 0
  // 정수 좌표여야함

  // 1. 모든 교점 찾기
  // 2. 최소 범위 구하기
  // 3. 교점 별로 표시

  // 1. 모든 교점 찾기
  const getPoints = () => {
    const points = [];
    for (let i = 0; i < line.length; i++) {
      for (let j = i + 1; j < line.length; j++) {
        const [A, B, E] = line[i];
        const [C, D, F] = line[j];

        const ADMinusBC = A * D - B * C;
        const BFMinusED = B * F - E * D;
        const ECMinusAF = E * C - A * F;

        // 평행 또는 일치하면 제외
        if (ADMinusBC === 0) continue;

        // 정수 좌표여야함
        if (BFMinusED % ADMinusBC !== 0 || ECMinusAF % ADMinusBC !== 0) continue;

        const x = BFMinusED / ADMinusBC;
        const y = ECMinusAF / ADMinusBC;

        points.push([x, y]);
      }
    }
    return points;
  };

  // 2. 최소 범위 구하기
  const getMinRange = (pointArray) => {
    const xPoints = pointArray.map((point) => point[0]);
    const yPoints = pointArray.map((point) => point[1]);
    const xMin = Math.min(...xPoints);
    const xMax = Math.max(...xPoints);
    const yMin = Math.min(...yPoints);
    const yMax = Math.max(...yPoints);

    return [xMin, xMax, yMin, yMax];
  };

  // 3. 교점 별로 표시
  const print = (pointArray, range) => {
    const [xMin, xMax, yMin, yMax] = range;
    const array = Array.from({ length: yMax - yMin + 1 }, () => Array.from({ length: xMax - xMin + 1 }, () => "."));
    // y 좌표: 실제 좌표계에서는 위에서 아래로 갈수록 숫자가 작아지고 배열에서는 커짐 => 뒤집어주기
    pointArray.forEach(([x, y]) => (array[yMax - y][x - xMin] = "*"));
    return array.map((row) => row.join(""));
  };

  const points = getPoints();
  const range = getMinRange(points);
  return print(points, range);
}
