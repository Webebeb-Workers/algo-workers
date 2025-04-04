// 명령어에 따른 구현: 표의 행을 선택, 삭제, 복구하는 4가지 명령어(U X, D X, C, Z)를 처리해야 함
// 현재 선택된 행 추적, 삭제된 이력을 중첩으로 관리(가장 늦게 들어온 Z부터 복구 => 스택, 삭제될 게 없을 때 Z는 주어지지 않음), 삭제 시
// 최종적으로 삭제되지 않은 행은 "O", 삭제된 행은 "X"로 표시된 문자열 반환

function solution(n, k, cmd) {
  let curIdx = k;

  // 표의 상태: true는 존재하는 행, false는 삭제된 행
  const table = Array(n).fill(true);

  // 스택: 삭제 중첩 관리
  const deleted = [];

  for (const command of cmd) {
    // U X
    if (command.startsWith('U')) {
      let x = parseInt(command.split(' ')[1]);
      while (x > 0 && curIdx > 0) {
        curIdx--;
        if (table[curIdx]) {
          x--;
        }
      }
    }
    // D X
    else if (command.startsWith('D')) {
      let x = parseInt(command.split(' ')[1]);
      while (x > 0 && curIdx < n - 1) {
        curIdx++;
        if (table[curIdx]) {
          x--;
        }
      }
    }
    // C
    else if (command === 'C') {
      deleted.push(curIdx);
      table[curIdx] = false;

      // 다음 존재하는 행 찾기
      let nextRow = curIdx + 1;
      while (nextRow < n && !table[nextRow]) {
        nextRow++;
      }

      // 다음 행이 없으면(마지막 행이었다면) 이전 행 찾기
      if (nextRow === n) {
        nextRow = curIdx - 1;
        while (nextRow >= 0 && !table[nextRow]) {
          nextRow--;
        }
      }

      curIdx = nextRow;
    }
    // Z
    else if (command === 'Z') {
      const restored = deleted.pop();
      table[restored] = true;
    }
  }

  // 결과 문자열 생성
  return table.map((exists) => (exists ? 'O' : 'X')).join('');
}
