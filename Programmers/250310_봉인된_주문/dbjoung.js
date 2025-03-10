function solution(n, bans) {
  bans = bans.map((num) => {
    const numArray = num.split("").map((c) => c.charCodeAt() - 96);
    const length = numArray.length;
    let result = 0;
    for (let i = length - 1; i >= 0; i--) {
      result += 26 ** i * numArray[length - i - 1];
    }

    return result;
  });

  bans.sort((a, b) => a - b);
  bans.forEach((num) => {
    if (num <= n) n++;
  });

  let resultLeng = 0;
  while (true) {
    if (26 ** resultLeng > n) break;
    resultLeng++;
  }

  const result = new Array(resultLeng).fill(null);
  for (let i = resultLeng - 1; i >= 0; i--) {
    result[resultLeng - i - 1] = Math.floor(n / 26 ** i);
    n -= result[resultLeng - i - 1] * 26 ** i;
  }

  for (let i = result.length - 1; i > 0; i--) {
    if (result[i] == 0) {
      result[i] = 26;
      result[i - 1] -= 1;
    }
  }

  return String.fromCharCode(...result.map((num) => num + 96));
}
