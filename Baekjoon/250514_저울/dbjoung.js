// 무게가 서로 다른 N개의 물건. 1부터 N까지의 번호가 붙음
// 일부 물건 쌍의 양팔 저울 결과표. 비교 결과가 모순되는 입력은 없음
// 각 물건에 대해, 그 물건과의 비교 결과를 알수 없는 물건의 개수 출력
// 입력은 >
// 플로이드-워셜
// 1>2, 2>3, 3>4, 5>4, 6>5

let [N, M, ...comps] = require('fs').readFileSync(0).toString().trim().split('\n');
N = Number(N);
M = Number(M);

const d = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));

for (const comp of comps) {
    const [s, e] = comp.split(' ').map(Number);
    d[s][e] = true;  // s > e
}

for (let mid = 1; mid <= N; mid++) {
    for (let s = 1; s <= N; s++) {
        for (let e = 1; e <= N; e++) {
            if (d[s][mid] && d[mid][e]) {
                d[s][e] = true;
            }
        }
    }
}

const result = [];

for (let i = 1; i <= N; i++) {
    let count = 0;
    for (let j = 1; j <= N; j++) {
        if (i === j) continue;
        if (d[i][j] || d[j][i]) count++;  // i > j or i < j
    }
    result.push(N - 1 - count);  // 비교 불가능한 개수
}

console.log(result.join('\n'));
