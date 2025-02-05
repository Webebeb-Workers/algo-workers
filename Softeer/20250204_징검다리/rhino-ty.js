// 0. 가장 긴, 최대 길이의 수열을 뽑아내야하니 동적 계획법을 사용해야함, 시작점부터 시작하는 바텀업 방식으로 함
// 1. 변수 초기화: 각 돌들이 1을 가지기 때문에 N개의 1로 된 DP 배열 초기화
// 2. 상향식 방식으로 탐색
//   2-1. 두번째 돌부터 탐색, 마지막까지 모든 돌 순회(N-1)
//   2-2. 현재 돌이 이전 돌보다 크다면, 해당 이전 돌까지의 `최장 수열 길이 + 1`과 `현재 저장된 값`을 비교, DP 배열 갱신
// 3. 가장 큰 값이 최장 증가 부분 수열을 의미, max로 반환
function solution(n, stones) {
    // DP[i]는 i번째 원소를 마지막으로 하는 증가 수열의 최대 길이, 각 돌을 밟을 수 있으니 기본값 1
    let DP = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        const curStone = stones[i];
        for (let j = 0; j < i; j++) {
            const preStone = stones[j];
            // 이전 돌들과 현재 돌 비교: '지금까지 찾은 가장 긴 돌 조합'과 '새로 만든 돌 조합' 중에서 더 긴 것을 선택
            if (curStone > preStone) DP[i] = Math.max(DP[i], DP[j] + 1);
        }
    }
    
    return Math.max(...DP)
}

// 아래 코드의 문제점: 매 순간 '현재보다 큰 수'를 발견하면 무조건 선택한다는 점임 => 그리디 방식과 비슷함
//   + 애초에 N이 3 * 10^3 으로 들어와서 O(n)인 아래 코드는 시간 초과가 남
// 예를 들어 [1, 8, 2, 3, 4, 5, 6, 7] 같은 입력이 들어오면,
// 이 코드는 1 -> 8로 진행한 후 더 이상 진행하지 못해 길이 2를 반환하지만,
// 실제 최장 증가 수열은 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7로 길이가 7임
// 즉, 지금 당장 큰 수를 선택하는 것이 아니라, 전체적으로 봤을 때 가장 긴 증가 수열을 찾아야 함 => 동적 계획법 학습

// 1. 입력값 가공
// 2. 순회하며 카운트 방식으로 최대 개수를 산정함
// 3. 현재 철수가 서있는 돌 위를 고정해놓고, 만일 순차적으로 커진다는 조건에 부합하면 변경
// function solution(n, stones) {
//     let count = 0;
//     let curStone = 0;
    
//     for (let i = 0; i < n; i++) {
//         const nextStone = stones[i];
//         if (curStone < nextStone) {
//             count++
//             curStone = nextStone
//         }
//     }

//     return count;
// }

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = parseInt(input[0]);
const stones = input[1].split(' ').map(Number);

console.log(solution(N, stones));
