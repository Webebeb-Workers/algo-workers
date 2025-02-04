// 1. 입력값 가공
// 2. 순회하며 카운트 방식으로 최대 개수를 산정함
// 3. 현재 철수가 서있는 돌 위를 고정해놓고, 만일 순차적으로 커진다는 조건에 부합하면 변경

function solution(n, stones) {
    let count = 0;
    let curStone = 0;
    
    for (let i = 0; i < n; i++) {
        const nextStone = stones[i];
        if (curStone < nextStone) {
            count++
            curStone = nextStone
        }
    }

    return count;
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = parseInt(input[0]);
const stones = input[1].split(' ').map(Number);

console.log(solution(N, stones));
