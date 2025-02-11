const fs = require("fs");
const [count,...mapString] = fs.readFileSync(0).toString().trim().split("\n");
const [N,M] = count.split(" ").map(Number);
const map = Array.from({length:N+1}, () => Array.from({length:M+1}, () => 0))
const sum = Array.from({length:N+1}, () => Array.from({length:M+1}, () => 0))

mapString.forEach((elements,row) => {
    const numbers = elements.split(" ").map(Number);
    numbers.forEach((number,col) => {
        map[row+1][col+1] = number;
   })
})      

// 정수의 합이 최대가 되는 부분행렬 구하기

// 2차원 누적합 문제 (0,0) 부터 (i,j) 구간까지의 누적합 구하기

// 누적합
// sum[i][j] = map[i][j]  + sum[i][j-1] + sum[i-1][j] - sum[i-1][j-1];
// sum[i-1][j-1]을 빼주는 이유는 sum[i][j-1]와 sum[i-1][j]를 더할 때 sum[i-1][j-1]이 두 번 더해지기 때문임

// 부분합
// partialSum = sum[rowEnd][columnEnd] - (sum[rowStart-1][columnEnd] + sum[rowEnd][columnStart-1]) + sum[rowStart-1][columnStart-1]
// sum[rowStart-1][columnStart-1]을 더해주는 이유는 sum[rowStart-1][columnEnd]와 sum[rowEnd][columnStart-1] 을 뺄 떄 두 번 빼졌기 때문입

// 누적합 구하기
for(let i=1; i<=N; i++) {
    for(let j=1; j<=M; j++) {
        sum[i][j] = map[i][j]  + sum[i][j-1] + sum[i-1][j] - sum[i-1][j-1];
    }
}

let max = Number.NEGATIVE_INFINITY;

for(let rowStart = 1; rowStart<=N; rowStart++) {
    for(let rowEnd=rowStart; rowEnd<=N; rowEnd++) {
        for(let columnStart = 1; columnStart<=M; columnStart++) {
            for(let columnEnd = columnStart; columnEnd<=M; columnEnd++) {
                // 부분합 구하기 
                const partialSum = sum[rowEnd][columnEnd] - (sum[rowStart-1][columnEnd] + sum[rowEnd][columnStart-1]) + sum[rowStart-1][columnStart-1]
                max = Math.max(max, partialSum)
            }
        }
    }
}
console.log(max)