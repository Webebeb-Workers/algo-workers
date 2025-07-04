// 방향 그래프 + 모든 컴퓨터에 대한 최단 거리 알고리즘
// 0. 컴퓨터 배열 순회 및 그래프 구현
//   - 각 컴퓨터마다 빈 연결리스트 구현
//   - 의존성 정보 읽어서 그래프에 추가
// 1. 시작점(해킹당한 컴퓨터)부터 시작
// 2. 가장 빨리 감염되는 컴퓨터를 우선 선택 => 우선순위 큐, 방문 확인도 추가
// 3. 선택된 컴퓨터에서 전파 가능한 다른 컴퓨터들의 감염 시간 갱신
//   - 현재 컴퓨터와 연결된 모든 컴퓨터 확인, 기존 감염시간보다 빠르면 갱신하고 큐에 추가
//   - 모든 컴퓨터가 처리될 때까지 반복
// 4. 결과 계산
//   - 감염된 컴퓨터 개수 세기 (감염시간이 무한대가 아닌 것들)
//   - 가장 늦게 감염된 시간 찾기 (감염시간들 중 최댓값)

function getMinTimeInfection(T, lines) {
  const results = [];
  let lineIdx = 1;

  for (let test = 0; test < T; test++) {
    const [n, d, c] = lines[lineIdx++];

    // 그래프: 인접 리스트
    const graph = Array.from({ length: n + 1 }, () => []);
    // 의존성 정보 입력
    for (let i = 0; i < d; i++) {
      const [a, b, s] = lines[lineIdx++];
      graph[b].push([a, s]); // b->a 간선 및 연결리스트로 시간 추가
    }

    // 초기화: 다익스트라 알고리즘
    const dist = Array(n + 1).fill(Infinity); // 각 컴퓨터의 감염 시간
    const visited = Array(n + 1).fill(false); // 방문: 최대 10000이므로 리스트로 구현
    const pq = new PriorityQueue();

    dist[c] = 0;
    pq.enqueue(c, 0);

    // 다익스트라 순회
    while (!pq.isEmpty()) {
      // 루트 디큐: 제일 빠르게 감염되는 컴퓨터
      const { item: curr, priority: curTime } = pq.dequeue();

      // 이미 처리된 컴퓨터는 스킵
      if (visited[curr]) continue;
      visited[curr] = true;

      // 인접한 컴퓨터 감염 시간 갱신
      for (const [neighbor, infectionTime] of graph[curr]) {
        const newTime = curTime + infectionTime;

        // 그리디: 더 빠른 감염 경로 발견시 갱신
        if (newTime < dist[neighbor]) {
          dist[neighbor] = newTime;
          pq.enqueue(neighbor, newTime);
        }
      }
    }

    // 결과 계산
    let infectedCount = 0;
    let maxTime = 0;

    for (let i = 1; i <= n; i++) {
      if (dist[i] !== Infinity) {
        // 감염 가능한 컴퓨터
        infectedCount++;
        maxTime = Math.max(maxTime, dist[i]);
      }
    }

    results.push(`${infectedCount} ${maxTime}`);
  }

  return results.join('\n');
}

// 우선순위 큐 최소힙
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(item, priority) {
    this.heap.push({ item, priority });
    this.bubbleUp();
  }

  dequeue() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx].priority <= this.heap[idx].priority) break;
      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
      idx = parentIdx;
    }
  }

  bubbleDown() {
    let idx = 0;
    while (true) {
      let leftChild = 2 * idx + 1;
      let rightChild = 2 * idx + 2;
      let smallest = idx;

      if (leftChild < this.heap.length && this.heap[leftChild].priority < this.heap[smallest].priority) {
        smallest = leftChild;
      }

      if (rightChild < this.heap.length && this.heap[rightChild].priority < this.heap[smallest].priority) {
        smallest = rightChild;
      }

      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}

const input = require('fs').readFileSync(0).toString().split('\n');
const T = Number(input[0]);
const lines = input.map((i) => i.split(' ').map(Number));
console.log(getMinTimeInfection(T, lines));
