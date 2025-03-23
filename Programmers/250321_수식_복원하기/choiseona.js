function solution(expressions) {
  // 최소 2진법, 최대 9진법
  // 최소 진법 구해서 9진법까지 for문 돌기
  // 진법이 하나로 특정되면 계산
  // 진법이 하나로 특정되지 않으면
  // 결과가 여러개이면 ?
  // 결과가 하나이면 결과값

  // -----------------------------------
  // 시작: 5:10,
  // 16-21 오답: 7:32
  // 7:49 해결

  // 문자열 공백때문에 애먹었다..ㅜㅜ trim..trim...

  const array = Array.from({ length: 10 }, () => Array.from({ length: expressions.length }, () => [-1, -1, -1, -1]));
  const operations = [];
  let minBase = -1;

  expressions.forEach((expression) => {
    const [operation, result] = expression.split("=");
    const operator = operation.includes("+") ? "+" : "-";
    const [left, right] = operation.split(operator);

    // 공백 제거를 위해 trim
    const leftString = left.trim();
    const rightString = right.trim();
    const resultString = result.trim();
    operations.push([leftString, operator, rightString, resultString]);

    const leftNumbers = leftString.split("").map(Number);
    const rightNumbers = rightString.split("").map(Number);

    // 최소 진법 찾기
    minBase = Math.max(minBase, ...leftNumbers, ...rightNumbers);
  });
  minBase += 1;

  // 최소 진법부터 9진법까지 돌면서
  // 진법이 하나로 특정되면 계산
  // 진법이 하나로 특정되지 않으면
  // 결과가 여러개이면 ?
  // 결과가 하나이면 결과값
  for (let base = minBase; base <= 9; base++) {
    for (let i = 0; i < operations.length; i++) {
      const [leftString, operator, rightString, resultString] = operations[i];
      const leftDecimal = parseInt(leftString, base);
      const rightDecimal = parseInt(rightString, base);
      const decimalResult = operator === "-" ? leftDecimal - rightDecimal : leftDecimal + rightDecimal;
      const iBaseResult = decimalResult.toString(base);
      array[base][i] = [leftString, operator, rightString, iBaseResult];
    }
  }

  // 진법에 대한 결과값 구하기
  const candidate = array.filter((base, baseIndex) => {
    if (baseIndex < minBase) return false; // 이게 없어서 틀렸다. array[base][i]가 [-1,-1,-1,-1] 이고 targetResult가 X라면 true이기 때문에 잘못된 결과가 나오게 됨!
    return base.every((current, index) => {
      const targetResult = operations[index][3];
      const currentResult = current[3];
      return targetResult === "X" || currentResult === targetResult;
    });
  });

  // 진법이 하나로 특정되면 바로 반환
  if (candidate.length === 1) {
    const answer = [];
    candidate[0].forEach((item, index) => {
      const [left, oper, right, result] = item;
      if (operations[index][3] === "X") answer.push(`${left} ${oper} ${right} = ${result}`);
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

      if (operations[index][3] === "X") {
        // 결과가 여러개이면 ?, 결과가 하나이면 그대로
        if (diffIndex.includes(index)) result = "?";
        answer.push(`${left} ${oper} ${right} = ${result}`);
      }
    });

    return answer;
  }
}
