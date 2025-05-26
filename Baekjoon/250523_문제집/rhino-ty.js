// 문제집 풀기 => 위상 정렬 + 우선순위 큐
// 먼저 풀어야 하는 문제가 있음 => 그래프의 간선으로 표현, A → B: A를 먼저 풀어야 B 가능
// 가능하면 쉬운 문제부터 => 최소 힙 사용
// 핵심! 진입 차수가 0인 문제들 중 가장 작은 번호부터 선택

// 위상 정렬 + 우선순위 큐 알고리즘
// 1. 각 노드의 진입 차수 계산
// 2. 진입 차수가 0인 노드를 최소 힙에 추가
// 3. 힙에서 가장 작은 번호 꺼내서 처리
// 4. 해당 노드와 연결된 다음 노드들의 진입 차수 감소
// 5. 진입 차수가 0이 된 노드를 힙에 추가
// 6. 모든 노드 처리할 때까지 3-5 반복

function getProblemOrder(inputLines) {
  const [N, M] = inputLines[0].split(' ').map(Number);

  // 그래프 & 진입 차수 배열 초기화
  const graph = Array(N + 1)
    .fill()
    .map(() => []);
  const inDegree = Array(N + 1).fill(0);

  // 그래프 구성
  for (let i = 1; i <= M; i++) {
    const [A, B] = inputLines[i].split(' ').map(Number);
    // A를 풀면 B를 풀 수 있음
    graph[A].push(B);
    // B를 풀기 위해 먼저 풀어야 하는 문제 개수 증가
    inDegree[B]++;
  }

  // 힙 추가: 진입 차수가 0인 노드
  const heap = new MinHeap();
  for (let i = 1; i <= N; i++) {
    if (inDegree[i] === 0) {
      heap.push(i);
    }
  }

  const result = [];

  // 위상 정렬
  while (!heap.isEmpty()) {
    // 현재 풀 수 있는 문제 중 가장 쉬운 / 작은 번호 문제 선택
    const current = heap.pop();
    result.push(current);

    // 현재 문제를 풀었으므로, 이 문제를 선행 조건으로 하는 문제들 처리
    for (const next of graph[current]) {
      inDegree[next]--;
      // 선행 조건을 모두 만족한 문제는 힙에 추가
      if (inDegree[next] === 0) {
        heap.push(next);
      }
    }
  }

  return result.join(' ');
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this._heapifyUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _heapifyUp(idx) {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] >= this.heap[parentIdx]) break;
      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }

  _heapifyDown(idx) {
    while (true) {
      let minIdx = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (left < this.heap.length && this.heap[left] < this.heap[minIdx]) {
        minIdx = left;
      }
      if (right < this.heap.length && this.heap[right] < this.heap[minIdx]) {
        minIdx = right;
      }

      if (minIdx === idx) break;
      [this.heap[idx], this.heap[minIdx]] = [this.heap[minIdx], this.heap[idx]];
      idx = minIdx;
    }
  }

  get length() {
    return this.heap.length;
  }
}

// class MinHeap {
//   constructor() {
//     this.heap = [];
//   }
//   push(value) {
//     this.heap.push(value);
//     this._heapifyUp();
//   }
//   pop() {
//     if (this.isEmpty()) return null;
//     const min = this.heap[0];
//     const last = this.heap.pop();
//     if (!this.isEmpty()) {
//       this.heap[0] = last;
//       this._heapifyDown();
//     }
//     return min;
//   }
//   isEmpty() {
//     return this.heap.length === 0;
//   }
//   _heapifyUp() {
//     let idx = this.heap.length - 1;
//     const element = this.heap[idx];
//     while (idx > 0) {
//       const parentIdx = Math.floor((idx - 1) / 2);
//       if (this._compare(element, this.heap[parentIdx]) >= 0) break;
//       this.heap[idx] = this.heap[parentIdx];
//       idx = parentIdx;
//     }
//     this.heap[idx] = element;
//   }
//   _heapifyDown() {
//     let idx = 0;
//     const length = this.heap.length;
//     const element = this.heap[0];
//     while (true) {
//       const leftIdx = 2 * idx + 1;
//       const rightIdx = 2 * idx + 2;
//       let smallest = idx;
//       if (leftIdx < length && this._compare(this.heap[leftIdx], this.heap[smallest]) < 0) {
//         smallest = leftIdx;
//       }
//       if (rightIdx < length && this._compare(this.heap[rightIdx], this.heap[smallest]) < 0) {
//         smallest = rightIdx;
//       }
//       if (smallest === idx) break;
//       this.heap[idx] = this.heap[smallest];
//       idx = smallest;
//     }
//     this.heap[idx] = element;
//   }
//   _compare(a, b) {
//     return a - b;
//   }
// }

const fs = require('fs');
const inputLines = fs.readFileSync(0).toString().split('\n');
console.log(getProblemOrder(inputLines));

// 초기 상태:
// - graph: 1→[], 2→[], 3→[1], 4→[2]
// - inDegree: [0, 1, 1, 0, 0]
// - heap: [3, 4]

// Step 1: pop() → 3
// - result: [3]
// - 3과 연결된 1의 진입차수 감소: inDegree[1] = 0
// - heap: [1, 4]

// Step 2: pop() → 1
// - result: [3, 1]
// - heap: [4]

// Step 3: pop() → 4
// - result: [3, 1, 4]
// - 4와 연결된 2의 진입차수 감소: inDegree[2] = 0
// - heap: [2]

// Step 4: pop() → 2
// - result: [3, 1, 4, 2]
// - heap: []

// 최종 결과: 3 1 4 2
