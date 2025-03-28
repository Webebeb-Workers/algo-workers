function solution(board, skill) {
  // 입력: board(건물의 내구도 2차원 배열), skill(type, r1, c1, r2, c2, degree 2차원 배열)
  // type:1 -> 내구도 낮추기, 2 -> 내구도 높이기
  // degree: 내구도 낮추고 높이는 정도
  // 출력: 파괴되지 않은 건물의 개수 (0초과)

  //----------------------------------------

  // 단순 구현은 쉬울 듯 하여 바로 효율성 고민...

  const width = board[0].length;
  const height = board.length;

  const sumArray = Array.from({ length: height + 1 }, () => Array.from({ length: width + 1 }, () => 0));

  // 누적합 할 숫자 채워넣기
  // n 0 -n
  // 0 0 0
  // -n 0 n
  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    const realDegree = type === 1 ? -degree : degree;
    sumArray[r1][c1] += realDegree;
    sumArray[r1][c2 + 1] -= realDegree;
    sumArray[r2 + 1][c1] -= realDegree;
    sumArray[r2 + 1][c2 + 1] += realDegree;
  });

  // 누적합 하기
  // 왼쪽에서 오른쪽으로 누적합 -> 위에서 아래로 누적합

  // 왼쪽에서 오른쪽으로 누적
  for (let h = 0; h <= height; h++) {
    for (let w = 0; w < width; w++) {
      sumArray[h][w + 1] += sumArray[h][w];
    }
  }

  // 위에서 아래로 누적
  for (let h = 0; h < height; h++) {
    for (let w = 0; w <= width; w++) {
      sumArray[h + 1][w] += sumArray[h][w];
    }
  }

  // 결과 계산하기
  let answer = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j] + sumArray[i][j] > 0) answer++;
    }
  }

  return answer;
}
