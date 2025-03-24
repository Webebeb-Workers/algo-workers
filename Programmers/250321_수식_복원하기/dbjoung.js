function calcAns(num1, oper, num2, base) {
  const gap = 10 - base;
  if (oper == "+") {
    if (
      (num1 % 10) + (num2 % 10) >= base &&
      Math.floor(num1 / 10) + Math.floor(num2 / 10) + 1 >= base
    ) {
      return num1 + num2 + gap + gap * 10;
    } else if ((num1 % 10) + (num2 % 10) >= base) {
      return num1 + num2 + gap;
    } else if (Math.floor(num1 / 10) + Math.floor(num2 / 10) >= base) {
      return num1 + num2 + gap * 10;
    } else return num1 + num2;
  } else {
    if (num1 % 10 >= num2 % 10) return num1 - num2;
    else return num1 - num2 - gap;
  }
}

function solution(expressions) {
  let result = [];
  let base = null;
  let min = 1;
  for (const exp of expressions) {
    let [num1, oper, num2, _, answer] = exp.split(" ");

    if (answer != "X")
      min = Math.max(
        min,
        ...num1.split(""),
        ...num2.split(""),
        ...answer.split("")
      );
    else min = Math.max(min, ...num1.split(""), ...num2.split(""));

    num1 = Number(num1);
    num2 = Number(num2);
    if (answer == "X") {
      result.push([num1, oper, num2]);
      continue;
    }
    answer = Number(answer);

    if (base) continue;

    if (oper == "-" && num1 % 10 < num2 % 10) {
      const decimal = num1 - num2;
      const gap = decimal - answer;
      base = 10 - gap;
    } else if (oper == "+") {
      const decimal = num1 + num2;
      const gap = answer - decimal;
      if (gap > 0) base = 10 - (gap % 10 > 0 ? gap % 10 : Math.floor(gap / 10));
    }
  }

  if (base) {
    return result.map(([num1, oper, num2]) => {
      const ans = calcAns(num1, oper, num2, base);
      return [num1, oper, num2, "=", ans].join(" ");
    });
  } else {
    const anss = new Array(result.length).fill(null);
    for (let i = min + 1; i <= 9; i++) {
      for (let j = 0; j < result.length; j++) {
        const [num1, oper, num2] = result[j];
        const ans = calcAns(num1, oper, num2, i);
        if (!anss[j]) anss[j] = ans;
        else if (anss[j] != ans) anss[j] = "?";
      }
    }

    return result.map(([num1, oper, num2], i) => {
      return [num1, oper, num2, "=", anss[i]].join(" ");
    });
  }
}
