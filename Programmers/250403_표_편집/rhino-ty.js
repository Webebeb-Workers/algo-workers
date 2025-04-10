// 명령어에 따른 구현: 표의 행을 선택, 삭제, 복구하는 4가지 명령어(U X, D X, C, Z)를 처리해야 함
// 현재 선택된 행 추적, 삭제된 이력을 중첩으로 관리(가장 늦게 들어온 Z부터 복구 => 스택, 삭제될 게 없을 때 Z는 주어지지 않음), 삭제 시
// 최종적으로 삭제되지 않은 행은 "O", 삭제된 행은 "X"로 표시된 문자열 반환
// => 최적화 방법: 삭제 시 순회하는 것이 아닌, 포인터 연결만 변경할 수 있게 => 연결 리스트

function solution(n, k, cmd) {
  let curIdx = k;

  // 표의 상태: true는 존재하는 행, false는 삭제된 행
  const table = Array(n).fill(true);

  // 스택: 삭제 중첩 관리
  const deleted = [];

  // 각 행의 이전/다음 행 정보를 저장 (연결 리스트 개념)
  const prevRows = Array(n);
  const nextRows = Array(n);

  // 연결 리스트 초기화
  for (let i = 0; i < n; i++) {
    prevRows[i] = i - 1; // 이전 행 (첫 행은 -1)
    nextRows[i] = i + 1; // 다음 행 (마지막 행은 n)
  }
  nextRows[n - 1] = -1; // 마지막 행의 다음 행은 없음

  for (const command of cmd) {
    // U X
    if (command.startsWith('U')) {
      let x = parseInt(command.split(' ')[1]);
      while (x > 0 && prevRows[curIdx] !== -1) {
        curIdx = prevRows[curIdx];
        x--;
      }
    }
    // D X
    else if (command.startsWith('D')) {
      let x = parseInt(command.split(' ')[1]);
      while (x > 0 && nextRows[curIdx] !== -1) {
        curIdx = nextRows[curIdx];
        x--;
      }
    }
    // C
    else if (command === 'C') {
      // 삭제할 행 정보 저장 (행 번호, 이전 행, 다음 행)
      deleted.push([curIdx, prevRows[curIdx], nextRows[curIdx]]);
      table[curIdx] = false;

      // 이전 행과 다음 행의 연결 업데이트
      const prev = prevRows[curIdx];
      const next = nextRows[curIdx];

      if (prev !== -1) {
        nextRows[prev] = next;
      }

      if (next !== -1) {
        prevRows[next] = prev;
        curIdx = next; // 다음 행 선택
      } else {
        curIdx = prev; // 마지막 행이면 이전 행 선택
      }
    }
    // Z
    else if (command === 'Z') {
      // 가장 최근에 삭제된 행 복구
      const [row, prev, next] = deleted.pop();
      table[row] = true;

      // 연결 정보 복구
      if (prev !== -1) {
        nextRows[prev] = row;
      }

      if (next !== -1) {
        prevRows[next] = row;
      }

      // 행의 이전/다음 정보도 복구
      prevRows[row] = prev;
      nextRows[row] = next;
    }
  }

  // 결과 문자열 생성
  return table.map((exists) => (exists ? 'O' : 'X')).join('');
}
