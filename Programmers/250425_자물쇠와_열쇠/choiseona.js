function solution(key, lock) {
  // 시작 - 8: 20
  // 자물쇠: N * N, 열쇠: M * M
  // 열쇠는 회전과 이동이 가능, 열쇠의 돌기 부분을 자물쇠의 홈 부분에 딱 맞게 채우면 열림
  // 자물쇠 영역을 벗어난 부분은 영향을 주지 않음
  // 입력: key(열쇠), lock(자물쇠)
  // 출력: 열 수 있는지 없는지
  // -----------------------------
  // 완탐? 90도씩 회전시키면서 && 겹치는 지점(?)이 바뀌도록

  const M = key.length;
  const N = lock.length;

  const getRotated = (array) => {
    const arrayHeight = array.length;
    const arrayWidth = array[0].length;
    const rotatedArray = Array.from({ length: arrayHeight }, () => Array.from({ length: arrayWidth }, () => 0));

    for (let i = 0; i < arrayHeight; i++) {
      for (let j = 0; j < arrayWidth; j++) {
        rotatedArray[j][arrayHeight - 1 - i] = array[i][j];
      }
    }
    return rotatedArray;
  };

  const checkCanUnlock = (key, lock, startX, startY) => {
    const temp = lock.map((row) => [...row]);

    for (let i = 0; i < M; i++) {
      for (let j = 0; j < M; j++) {
        const x = i + startX;
        const y = j + startY;
        if (x < 0 || x >= N || y < 0 || y >= N) continue;
        temp[x][y] += key[i][j];
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (temp[i][j] !== 1) return false;
      }
    }
    return true;
  };

  for (let rotation = 0; rotation < 4; rotation++) {
    key = getRotated(key);
    for (let startX = -M + 1; startX < N; startX++) {
      for (let startY = -M + 1; startY < N; startY++) {
        if (checkCanUnlock(key, lock, startX, startY)) return true;
      }
    }
  }

  return false;
}
