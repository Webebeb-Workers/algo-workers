// 시작 - 8:28
function solution(board, r, c) {
  // 같은 그림: 게임 화면에서 사라짐
  // 같은 그림 아니면: 다시 뒤집음
  // 모든 카드 화면에서 사라지면 게임 종료
  // 방향키: 방향으로 한칸 이동(이동할 수 없으면 가만히), ctrl+방향키: 해당 방향에 있는 가장 가까운 카드로 이동(없으면 마지막 칸으로 이동)
  // 카드 뒤집기는 엔터 입력
  // 엔터, 방향키, 방향키+ctrl 각각 1번의 조작 횟수
  // 게임 진행 중 카드의 짝을 맞춰 몇 장 제거도니 상태에서 카드 앞면의 그림을 알고 있을 때, 남은 카드를 모두 제거하는데 필요한 키 조작 횟수 최소값
  // r: 커서의 최초 세로(행) 위치
  // c: 커서의 최초 가로(열) 위치
  //----------------------------
  // 카드 순열 구해서 순서 모두 탐색
  const boardLength = 4;

  // 순열 구하는 함수
  const getPermutations = function (arr, selectCount) {
    if (selectCount === 1) return arr.map((el) => [el]);

    const results = [];
    arr.forEach((fixed, index, origin) => {
      const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
      const permutations = getPermutations(rest, selectCount - 1);
      const attached = permutations.map((el) => [fixed, ...el]);
      results.push(...attached);
    });

    return results;
  };

  // 짝 카드로 이동할 때의 키 조작 횟수 구하는 함수
  const getKeyDownCount = (startR, startC, targetR, targetC, board) => {
    if (startR === targetR && startC === targetC) return 0;

    const directions = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ];
    const queue = [[startR, startC, 0]]; // [행, 열, 이동 횟수]
    const visited = new Set([`${startR},${startC}`]);

    while (queue.length > 0) {
      const [r, c, move] = queue.shift();

      if (r === targetR && c === targetC) return move;

      // only 방향키
      for (const [dr, dc] of directions) {
        const [newR, newC] = [r + dr, c + dc];

        if (newR < 0 || newC < 0 || newR >= boardLength || newC >= boardLength) continue;
        if (visited.has(`${newR},${newC}`)) continue;

        queue.push([newR, newC, move + 1]);
        visited.add(`${newR},${newC}`);
      }

      // ctrl + 방향키
      for (const [dr, dc] of directions) {
        let currentR = r;
        let currentC = c;

        while (true) {
          const [newR, newC] = [currentR + dr, currentC + dc];
          if (newR < 0 || newC < 0 || newR >= boardLength || newC >= boardLength) break;

          currentR = newR;
          currentC = newC;

          if (board[currentR][currentC]) break;
        }

        if (visited.has(`${currentR},${currentC}`)) continue;

        queue.push([currentR, currentC, move + 1]);
        visited.add(`${currentR},${currentC}`);
      }
    }
  };

  // 경우의 수 하나에 대한 키 조작 횟수 구하는 함수
  const calculateTwoCardOrder = (startR, startC, map, cardOrder, board) => {
    // 두 카드 중 먼저 가야하는 곳도 구해야 함 -> 두 경우의 조작 수 구해서 최소인것 선택하기
    let count = 0;
    let currentR = startR;
    let currentC = startC;

    const currentBoard = board.map((row) => [...row]);

    for (const card of cardOrder) {
      const [[card1R, card1C], [card2R, card2C]] = map.get(card);

      // 첫 번째 짝 카드 -> 두 번째 짝 카드
      const moveToCard1Count = getKeyDownCount(currentR, currentC, card1R, card1C, currentBoard);
      const moveToCard1ToCard2Count = getKeyDownCount(card1R, card1C, card2R, card2C, currentBoard);
      const card1ToCard2Count = moveToCard1Count + moveToCard1ToCard2Count + 2; // 2: 카드 뒤집기

      // 두 번째 짝 카드 -> 첫 번째 짝 카드
      const moveToCard2Count = getKeyDownCount(currentR, currentC, card2R, card2C, currentBoard);
      const moveToCard2ToCard1Count = getKeyDownCount(card2R, card2C, card1R, card1C, currentBoard);
      const card2ToCard1Count = moveToCard2Count + moveToCard2ToCard1Count + 2;

      if (card1ToCard2Count < card2ToCard1Count) {
        count += card1ToCard2Count;
        currentR = card2R;
        currentC = card2C;
      } else {
        count += card2ToCard1Count;
        currentR = card1R;
        currentC = card1C;
      }

      currentBoard[card1R][card1C] = 0;
      currentBoard[card2R][card2C] = 0;
    }

    return count;
  };

  const map = new Map();

  board.forEach((row, rowIndex) => {
    row.forEach((card, columnIndex) => {
      if (card === 0) return;
      if (!map.has(card)) map.set(card, [[rowIndex, columnIndex]]);
      else map.get(card).push([rowIndex, columnIndex]);
    });
  });

  const keys = [...map.keys()];

  const permutations = getPermutations(keys, keys.length);

  let answer = Infinity;

  for (const cardOrder of permutations) {
    const count = calculateTwoCardOrder(r, c, map, cardOrder, board);
    answer = Math.min(answer, count);
  }

  return answer;
}
