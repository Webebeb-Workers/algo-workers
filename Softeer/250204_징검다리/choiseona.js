const fs = require("fs");
const [n, stones] = fs.readFileSync(0).toString().trim().split("\n");

const stoneArray = stones.split(" ").map(Number);
const dp = Array.from({ length: Number(n) }, () => 1);

const getIndexOfLowerNumber = (array, index) => {
  let indexOfLowerNumber = -1;
  for (let i = index - 1; i >= 0; i--) {
    if (array[i] < array[index]) {
      indexOfLowerNumber = i;
      break;
    }
  }
  return indexOfLowerNumber;
};

stoneArray.forEach((current, index) => {
  if (index === 0) return;

  if (current > stoneArray[index - 1]) {
    dp[index] = dp[index - 1] + 1;
  } else if (current === stoneArray[index - 1]) {
    dp[index] = dp[index - 1];
  } else {
    const indexOfLowerNumber = getIndexOfLowerNumber(stoneArray, index);
    if (indexOfLowerNumber !== -1) {
      dp[index] = dp[indexOfLowerNumber] + 1;
    } else {
      dp[index] = 1;
    }
  }
});

console.log(dp.pop());
