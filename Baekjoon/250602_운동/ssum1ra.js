const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on("line", (line) => input.push(line)).on("close", () => {
    const [v, e] = input[0].split(' ').map(Number)
    
    const dist = Array.from({length: v + 1}, () => Array(v + 1).fill(Infinity))

    for(let i = 1; i <= e; i++) {
        const [a, b, c] = input[i].split(' ').map(Number)
        dist[a][b] = c
    }

    for(let k = 1; k <= v; k++){
        for(let i = 1; i <= v; i++){
            for(let j = 1; j <= v; j++){
                if(dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j]
                }
            }
        }
    }

    let minCycle = Infinity
    for (let i = 1; i <= v; i++) {
        for (let j = 1; j <= v; j++) {
            minCycle = Math.min(minCycle, dist[i][j] + dist[j][i])
        }
    }

    console.log(minCycle === Infinity ? -1 : minCycle)
});