let [N, ...ST] = require('fs').readFileSync(0).toString().trim().split('\n');
N = Number(N);
ST = ST.map(line => line.split(' ').map(Number));

const events = [];

for (const [s, t] of ST) {
    events.push([s, 'start']);
    events.push([t, 'end']);
}

// 시간 기준 정렬. 같은 시간이면 'end' 먼저 와야 강의실 재사용 가능
events.sort((a, b) => {
    if (a[0] === b[0]) return a[1] === 'end' ? -1 : 1;
    return a[0] - b[0];
});

let count = 0;
let result = 0;
for (const [time, type] of events) {
    if (type === 'start') count++;
    else count--;
    result = Math.max(result, count);
}

console.log(result);