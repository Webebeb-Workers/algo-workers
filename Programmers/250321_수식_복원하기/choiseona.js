function solution(expressions) {
  // 시작: 5:10,
  // 16-21 오답: 7:32
  // 7:49 해결
  // 문자열 공백때문에 애먹었다..ㅜㅜ trim..trim...

  // 진법 계산/저장, 최소 진법 찾기
  const getOperationsInfo = (expressions) => {
    const array = Array.from({ length: 10 }, () =>
      Array.from({ length: expressions.length }, () => [-1, -1, -1, -1, -1])
    );
    let minBase = -1;

    expressions.forEach((expression, expressionIndex) => {
      const [operation, result] = expression.split("=");
      const operator = operation.includes("+") ? "+" : "-";
      const [left, right] = operation.split(operator);

      // 공백 제거를 위해 trim
      const leftString = left.trim();
      const rightString = right.trim();
      const resultString = result.trim();

      for (let base = 2; base <= 9; base++) {
        const leftDecimal = parseInt(leftString, base);
        const rightDecimal = parseInt(rightString, base);
        const decimalResult = operator === "-" ? leftDecimal - rightDecimal : leftDecimal + rightDecimal;
        const iBaseResult = decimalResult.toString(base);
        array[base][expressionIndex] = [leftString, operator, rightString, iBaseResult, resultString];
      }

      const leftNumbers = leftString.split("").map(Number);
      const rightNumbers = rightString.split("").map(Number);

      // 최소 진법 찾기
      minBase = Math.max(minBase, ...leftNumbers, ...rightNumbers);
    });
    minBase += 1;

    return { minBase, array };
  };

  // 최소 진법부터 9진법까지 돌면서 진법 후보 구하기
  const getBaseCandidate = (array, minBase) => {
    const candidate = array.filter((base, baseIndex) => {
      if (baseIndex < minBase) return false;

      return base.every((item) => {
        const targetResult = item[4];
        const currentResult = item[3];
        return targetResult === "X" || currentResult === targetResult;
      });
    });
    return candidate;
  };

  // 진법이 하나로 특정되면 계산
  // 진법이 하나로 특정되지 않으면
  // 결과가 여러개이면 ?
  // 결과가 하나이면 결과값
  const getAnswer = (candidate) => {
    // 진법이 하나로 특정되면 바로 반환
    if (candidate.length === 1) {
      const answer = [];
      candidate[0].forEach((item) => {
        const [left, oper, right, result] = item;
        if (item[4] === "X") answer.push(`${left} ${oper} ${right} = ${result}`);
      });
      return answer;
    }

    // 진법이 하나로 특정되지 않으면
    else {
      const answer = [];
      const diffIndex = [];
      for (let i = 0; i < candidate[0].length; i++) {
        let diffFlag = false; // 결과 여러개 flag
        for (let j = 0; j < candidate.length - 1; j++) {
          if (candidate[j][i][3] !== candidate[j + 1][i][3]) diffFlag = true;
        }
        if (diffFlag) diffIndex.push(i);
      }

      candidate[0].forEach((item, index) => {
        let [left, oper, right, result] = item;

        if (item[4] === "X") {
          // 결과가 여러개이면 ?, 결과가 하나이면 그대로
          if (diffIndex.includes(index)) result = "?";
          answer.push(`${left} ${oper} ${right} = ${result}`);
        }
      });

      return answer;
    }
  };

  const { minBase, array } = getOperationsInfo(expressions);
  const candidate = getBaseCandidate(array, minBase);
  const answer = getAnswer(candidate);
  return answer;
}
