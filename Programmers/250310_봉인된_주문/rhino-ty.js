// 기본적인 구현 문제이라고 생각함
// 문자열 직접 생산 + 전체 탐색은 n과 bans의 길이가 너무 길어서 당연히 제외
// 그렇다면 n 이하의 문자열에 해당되는 bans 수 만큼 추가한 n 값을 추출 후
// 패턴에 의거해 문자열을 생산하면 될 거 같음
// 추가) 알파벳 개수는 26개, JS에서는 15자리 정수까지 변수로 사용할 수 있기 때문에 BigInt 안써도 됨

// 1. n번째 문자열을 찾기 전에 해당 문자열의 길이 결정 필요
//   - 각 길이별 문자열 개수 계산하고 범위 체크
//   - 길이 1: 26개(a-z), 길이 2: 26*26개, 길이 3: 26*26*26개...
//   - 누적합을 이용해서 n이 어느 길이 구간에 속하는지 파악
// 2. ban 리스트 처리하기
//   - bans 문자열 중에서 우리가 찾을 n번째 문자열보다 사전상 앞에 있는 것들 개수 세기
//   - 즉, ban된 문자열 때문에 건너뛰어야 하는 개수만큼 n 값 증가시키기
// 3. 최종 n번째 문자열 생성
//   - n이 속한 길이에서 몇 번째인지 계산
//   - 해당 순서를 알파벳 인덱스로 변환해서 문자열 조합

function orderToSpell(n) {
  let result = '';
  while (n > 0) {
    n -= 1;
    result = String.fromCharCode((n % 26) + 'a'.charCodeAt(0)) + result;
    n = Math.floor(n / 26);
  }
  return result || 'a'; // 결과가 빈 문자열인 경우 "a" 반환
}

function solution(n, bans) {
  // sort()는 길이를 따지지 않고, 맨 앞부터 유니코드를 따져서 조건이 필요함
  // bans 정렬 (길이 순, 같은 길이면 사전 순)
  const bansSorted = [...bans].sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    return a.localeCompare(b);
  });

  for (const ban of bansSorted) {
    const spell = orderToSpell(n);
    if (ban.length > spell.length) {
      break;
    }
    if (ban.length < spell.length || ban <= spell) {
      n += 1;
    }
  }

  return orderToSpell(n);
}
