const fs = require("fs");
const [n, stones] = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(n);
const stoneArray = stones.split(" ").map(Number);
const LIS = [];
const LISLength = Array.from({ length: N }, () => 1);
const LDS = [];
const LDSLength = Array.from({ length: N }, () => 1);

const binarySearch = (array, start, end, element) => {
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (element > array[mid]) start = mid + 1;
    else end = mid;
  }
  return end;
};

const searchLIS = () => {
  LIS.push(stoneArray[0]);

  for (let i = 1; i < N; i++) {
    if (stoneArray[i] > LIS[LIS.length - 1]) {
      LIS.push(stoneArray[i]);
    } else {
      const position = binarySearch(LIS, 0, LIS.length - 1, stoneArray[i]);
      LIS[position] = stoneArray[i];
    }
    LISLength[i] = LIS.length;
  }
};

const searchLDS = () => {
  LDS.push(stoneArray[stoneArray.length - 1]);

  for (let i = N - 1; i >= 0; i--) {
    if (stoneArray[i] > LDS[LDS.length - 1]) {
      LDS.push(stoneArray[i]);
    } else {
      const position = binarySearch(LDS, 0, LDS.length - 1, stoneArray[i]);
      LDS[position] = stoneArray[i];
    }
    LDSLength[i] = LDS.length;
  }
};

searchLIS();
searchLDS();

let answer = 0;
for (let i = 0; i < N; i++) {
  answer = Math.max(answer, LISLength[i] + LDSLength[i] - 1);
}

console.log(answer);
