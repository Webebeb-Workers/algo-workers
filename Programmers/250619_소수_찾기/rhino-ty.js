// 모든 순열 + 소수 판별 문제
function solution(numbers) {
  const digits = numbers.split('');
  const perNums = new Set();

  // DFS + 백트래킹: 모든 순열 생성
  function dfs(curr, remaining) {
    // 현재까지 만든 숫자가 유효 => Set 추가
    if (curr !== '') {
      const num = Number(curr);
      perNums.add(num);
    }

    // 기저: 더 이상 사용할 숫자가 없으면
    if (remaining.length === 0) return;

    // 백트래킹: 각 남은 숫자를 하나씩 선택
    for (let i = 0; i < remaining.length; i++) {
      const newCurrent = curr + remaining[i];
      const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));

      dfs(newCurrent, newRemaining);
    }
  }

  // 모든 순열 생성
  dfs('', digits);

  // Set에서 소수인 것들만 필터링, 개수 반환
  let primeCnt = 0;
  for (const num of perNums) {
    if (isPrime(num)) {
      primeCnt++;
    }
  }

  return primeCnt;
}

// 소수 판별 함수: 에라토스테네스의 체
function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  // 최적화: 제곱근 + 홀수
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}
