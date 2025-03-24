// 1. expressions 배열을 순회, 진법 후보군(2~9진법)을 사용해 진법 추출
//    - 각 수식마다 'A 연산자 B = C' 형태로 파싱
//    - X가 아닌 C값이 있는 수식들 나중에 분석
//      - 각 진법(2~9)에서 A와 B를 계산했을 때 C와 일치하는지 확인 => parseInt(51, 8) 이런 식으로 하면 되나?
//      - 일치하는 진법들만 후보군에 유지
// 2. 후보 진법들 중에서 모든 수식을 만족하는 진법 찾기
//    - 만약 여러 진법이 가능하다면 모두 저장 => 혹시 모를 `?`를 쓰기 위해
// 3. 결과 배열 생성
//    - X가 포함된 수식들 추출
//      - 가능한 진법이 하나라면 계산된 결과값으로 대체
//      - 가능한 진법이 여러 개이고 결과값이 모두 같다면 그 값으로 대체
//      - 가능한 진법이 여러 개이고 결과값이 다르다면 "?"로 대체
// 4. 완성된 결과 배열 반환

function solution(expressions) {
  // 결과 배열
  const result = [];

  // X가 있는 수식들의 인덱스 찾기
  const xIndices = expressions.reduce((acc, exp, idx) => {
    if (exp.includes('= X')) acc.push(idx);
    return acc;
  }, []);

  // 가능한 진법 찾기 (2~9 진법)
  let possibleBases = [2, 3, 4, 5, 6, 7, 8, 9];

  // X가 아닌 수식들을 통해 가능한 진법 필터링
  for (let i = 0; i < expressions.length; i++) {
    if (!expressions[i].includes('= X')) {
      // 수식 파싱
      const [left, right] = expressions[i].split(' = ');
      const [a, op, b] = left.split(' ');
      const c = right;

      // 현재 가능한 진법 중에서 이 수식을 만족하는 진법만 필터링
      possibleBases = possibleBases.filter((base) => {
        const numA = parseInt(a, base);
        const numB = parseInt(b, base);
        const numC = parseInt(c, base);

        // 계산 결과가 맞는지 확인
        if (op === '+') {
          return numA + numB === numC;
        } else {
          // op === '-'
          return numA - numB === numC;
        }
      });
    }
  }

  // X가 있는 수식들에 대해 결과값 계산
  for (const idx of xIndices) {
    const [left, right] = expressions[idx].split(' = ');
    const [a, op, b] = left.split(' ');

    // 각 가능한 진법에서의 결과값 계산
    const results = new Set();
    const valuesByBase = new Map();

    for (const base of possibleBases) {
      const numA = parseInt(a, base);
      const numB = parseInt(b, base);

      let calculatedResult;
      if (op === '+') {
        calculatedResult = numA + numB;
      } else {
        // op === '-'
        calculatedResult = numA - numB;
      }

      // 계산 결과를 해당 진법의 문자열로 변환
      const resultInBase = calculatedResult.toString(base);
      results.add(resultInBase);

      if (!valuesByBase.has(resultInBase)) {
        valuesByBase.set(resultInBase, []);
      }
      valuesByBase.get(resultInBase).push(base);
    }

    // 결과값이 모든 가능한 진법에서 동일하면 그 값을, 아니면 '?'
    if (results.size === 1) {
      result.push(expressions[idx].replace('X', [...results][0]));
    } else {
      result.push(expressions[idx].replace('X', '?'));
    }
  }

  return result;
}
