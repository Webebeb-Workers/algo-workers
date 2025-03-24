// n이 작아서 모든 경우의 수를 따지는 완전탐색 DFS 가능할 듯?
// 1. 1부터 n까지의 숫자 중에서 5개를 선택하는 모든 가능한 조합을 구하기
// 2. 각 조합에 대해, 주어진 모든 시도들을 확인
//   - 각 시도에서 선택한 5개 숫자 중 비밀 코드에 포함된 숫자의 개수가 ans와 일치하는지 검사
// 3. 모든 시도에 대해 조건을 만족하는 조합의 개수를 반환

function solution(n, q, ans) {
  let result = 0;

  // 재귀: 1부터 n까지의 숫자 중 5개를 선택하는 모든 조합 생성
  function generateCombis(current, start) {
    // 기저: 5개의 숫자를 모두 선택했을 때
    if (current.length === 5) {
      // 현재 조합이 모든 시도의 조건을 만족하는지 검사
      if (isValidCode(q, ans, current)) {
        result++;
      }
      return;
    }

    // 재귀 호출로 조합 생성
    for (let i = start; i <= n; i++) {
      current.push(i);
      generateCombis(current, i + 1);
      current.pop(); // 백트래킹
    }
  }

  // 조합 생성 시작
  generateCombis([], 1);

  return result;
}

// 현재 조합이 모든 시도의 조건을 만족하는지 검사
function isValidCode(q, ans, code) {
  // 각 시도에 대해 검사
  for (let i = 0; i < q.length; i++) {
    const attempt = q[i];
    const expected = ans[i];

    // 현재 시도에서 비밀 코드와 일치하는 숫자의 개수를 계산
    let count = 0;
    for (const num of attempt) {
      if (code.includes(num)) {
        count++;
      }
    }

    // ans와 일치하지 않으면 유효하지 않은 코드
    if (count !== expected) {
      return false;
    }
  }

  return true;
}
