function solution(n, m, x, y, r, c, k) {
  // 시작: 8:20
  // 끝: 9:8

  // 격자 바깥으로 못나감
  // (x,y) -> (r,c) 이동 거리 총 k, 여러번 방문 가능
  // 탈출 경로 문자열 사전순으로 가장 빠른 경로로 탈출
  // 입력: n(격자h), m(격자w), x(시작y), y(시작x), r(종료y), c(종료x), k(이동거리)
  // 출력: result(결과 문자열)
  //----------------------------------------------

  // d -> l -> r -> u
  // 그리디
  // imposiible인 경우:
  // 이동 거리 k 와 최단 거리의 짝/홀수가 다른 경우
  // 이동 거리 k가 최단거리보다 클 경우

  const miro = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => "."));
  miro[x][y] = "S";
  miro[r][c] = "E";
  let [currentX, currentY] = [x, y];
  const direction = [
    [1, 0, "d"],
    [0, -1, "l"],
    [0, 1, "r"],
    [-1, 0, "u"],
  ];

  const getDistance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

  const distance = getDistance(x, y, r, c);
  if (Math.abs(distance - k) % 2 === 1) return "impossible";
  if (distance > k) return "impossible";

  let answer = "";

  while (k > 0) {
    for (const [dx, dy, char] of direction) {
      const [newX, newY] = [currentX + dx, currentY + dy];
      if (newX < 1 || newY < 1 || newX > n || newY > m) continue;
      if (getDistance(newX, newY, r, c) > k) continue;
      answer += char;
      [currentX, currentY] = [newX, newY];
      k--;
      break;
    }
  }

  return answer;
}
