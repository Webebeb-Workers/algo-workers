function solution(points, routes) {
  // n개 포인트 (r,c)
  // 로봇 운송 경로: m개의 포인트로 구성
  // 로봇: x대, 0초 출발, 1초마다 r좌표 또는 c 좌표 중 하나가 1 감소 또는 증가
  // 최단 경로 -> r좌표 우선
  // 마지막 포인트에 도착하면 끝

  // 입력: points(운송 포인트 n개의 좌표), routes(운송 경로)
  // 출력: 위험 상황 횟수

  // ---------------------------------------------------------

  // 같은 좌표, 같은 time인 것 count
  const visitedTimeMap = new Map();
  const record = (row, col, time) => {
    const key = `${row},${col},${time}`;

    if (!visitedTimeMap.has(key)) visitedTimeMap.set(key, 1);
    else visitedTimeMap.set(key, visitedTimeMap.get(key) + 1);
  };

  const move = (startRow, startCol, endRow, endCol, accTime) => {
    // row 먼저 이동 -> col 이동
    // 위/아래 이동
    while (startRow - endRow !== 0) {
      accTime++;
      startRow < endRow ? startRow++ : startRow--;
      record(startRow, startCol, accTime);
    }

    // 오른쪽/왼쪽 이동
    while (startCol - endCol !== 0) {
      accTime++;
      startCol < endCol ? startCol++ : startCol--;
      record(startRow, startCol, accTime);
    }

    return accTime;
  };

  // 최단 경로 좌표와 각 좌표마다 걸린 time 반환 [y,x,time]
  routes.forEach((route, index) => {
    let accTime = 0;

    const startIndex = route[0] - 1;
    const [startRow, startCol] = points[startIndex];
    record(startRow, startCol, 0);

    for (let i = 1; i < route.length; i++) {
      const [partialStartIndex, partialEndIndex] = [route[i - 1] - 1, route[i] - 1];
      const [partialStartRow, partialStartCol] = points[partialStartIndex];
      const [partialEndRow, partialEndCol] = points[partialEndIndex];
      accTime = move(partialStartRow, partialStartCol, partialEndRow, partialEndCol, accTime);
    }
  });

  let answer = 0;
  for (const [key, value] of visitedTimeMap) {
    if (value > 1) {
      answer++;
    }
  }

  return answer;
}
