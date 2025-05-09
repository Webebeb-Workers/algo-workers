// 유효하고, 가변적 특정 범위를 찾는 문제 => 투포인터인 거 같음
//   끝점 증가 → 구간 확장 → 조건 만족 여부 확인
//   조건 만족 시 시작점 증가 → 구간 최소화 → 최적해 갱신
// 1. 모든 보석을 순회하면서 unique한 보석 종류 개수 파악 => Set 사용
// 2. 투 포인터로 시작, 끝 인덱스 정의
// 3. 끝 포인터를 증가시키며 맵에 보석 추가
// 4. 현재 맵에 모든 종류의 보석이 포함?
//    - 최소 길이 갱신
//    - 시작 포인터 증가시키며 최적화
// 5. 최종 결과 반환: 주의.1-indexed

function solution(gems) {
  const totalGemTypes = new Set(gems).size;
  // 포인터
  let start = 0;
  let end = 0;

  // size 및 has? 를 위함
  const gemMap = new Map();

  let minLength = Infinity;
  let result = [0, 0];

  // 투포인터
  while (end < gems.length) {
    // 현재 끝 포인터의 보석 추가
    const curGem = gems[end];
    gemMap.set(curGem, (gemMap.get(curGem) || 0) + 1);

    end++;

    while (gemMap.size === totalGemTypes) {
      const curLength = end - start;
      if (curLength < minLength) {
        minLength = curLength;
        result = [start + 1, end]; // 1-indexed로 변환
      }

      const startGem = gems[start];
      gemMap.set(startGem, gemMap.get(startGem) - 1);

      if (gemMap.get(startGem) === 0) {
        gemMap.delete(startGem);
      }

      start++;
    }
  }

  return result;
}
