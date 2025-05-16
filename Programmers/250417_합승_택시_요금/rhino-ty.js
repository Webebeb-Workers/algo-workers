// 가중치+최소거리 => 다익스트라를 사용
// 합승 전 구간, 합승 후 찢어지는 구간 2개로 나눠서 할 수 있음.
// 즉, 다익스트라로 찢어지는 노드까지의 S, A, B의 최단 거리 가중치를 구하고, 3개 합한 값의 최솟값을 도출해내면 됨

// 1. 인접리스트로 그래프 구현: 다익스트라 최소힙을 사용할 수 있게
// 2. 최소 힙 구현
// 3. 다익스트라 함수 구현: 그래프 배열로 최소 거리 배열 만든 후, 최소힙으로 현재-다음 노드 가중치 계산
// 4. S, A, B 각각 length가 노드 + 1인, 최소 거리 배열을 가진 변수 초기화
// 5. 노드 1부터 노드 length까지 순회 및 각각 요소에 대해 합친 결과물을 min 비교

function solution(n, s, a, b, fares) {
  // 그래프 구현
  const graph = Array.from({ length: n + 1 }, () => []);
  // 간선 정보 구현: 양방향 그래프
  for (const [c, d, f] of fares) {
    graph[c].push([d, f]);
    graph[d].push([c, f]);
  }

  const fromS = getMinDistWithDijkstra(graph, s);
  const fromA = getMinDistWithDijkstra(graph, a);
  const fromB = getMinDistWithDijkstra(graph, b);

  let minCost = Infinity;
  // i까지 합승한 후 각자 a와 b로 가는 경우 or S에서 시작시 택시를 타지 않는 경우
  for (let i = 1; i <= n; i++) {
    const costSum = fromS[i] + fromA[i] + fromB[i];
    minCost = Math.min(minCost, costSum);
  }

  return minCost;
}

// 다익스트라 알고리즘
function getMinDistWithDijkstra(graph, start) {
  const distances = Array(graph.length).fill(Infinity);
  distances[start] = 0;

  const minHeap = new MinHeap();
  minHeap.push([start, 0]); // [노드, 거리]

  while (!minHeap.isEmpty()) {
    const [node, dist] = minHeap.pop();

    if (dist > distances[node]) continue;

    // 현재 노드와 연결된 다른 노드들 확인
    for (const [nextNode, weight] of graph[node]) {
      const newDist = dist + weight;

      // 더 짧은 경로를 찾았다면 업데이트
      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        minHeap.push([nextNode, newDist]);
      }
    }
  }

  return distances;
}

// 삽입: 끝에 넣고 → 위로 올라감
// 삭제: 루트 뺀 후 → 마지막 요소를 루트로 → 아래로 내려감
// 비교: 기본은 값 비교, 배열이면 특정 인덱스로 비교
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this._heapifyUp();
  }

  pop() {
    if (this.isEmpty()) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (!this.isEmpty()) {
      this.heap[0] = last;
      this._heapifyDown();
    }
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _heapifyUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];

    // 위로 올라가는 반복
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this._compare(element, this.heap[parentIdx]) >= 0) break;

      // 교환
      this.heap[idx] = this.heap[parentIdx];
      idx = parentIdx;
    }
    this.heap[idx] = element;
  }

  _heapifyDown() {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let smallest = idx;

      // 자식들과 비교해 가장 작은 것 찾기
      if (leftIdx < length && this._compare(this.heap[leftIdx], this.heap[smallest]) < 0) {
        smallest = leftIdx;
      }
      if (rightIdx < length && this._compare(this.heap[rightIdx], this.heap[smallest]) < 0) {
        smallest = rightIdx;
      }

      if (smallest === idx) break; // 더 작은 자식이 없으면 종료

      // 교환
      this.heap[idx] = this.heap[smallest];
      idx = smallest;
    }
    this.heap[idx] = element;
  }

  _compare(a, b) {
    // 기본형: 숫자 비교
    // 배열형: return a[1] - b[1]; // 두 번째 요소로 비교
    return a[1] - b[1];
  }
}
