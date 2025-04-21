class PriorityQueue {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  isEmpty() {
    return this.size() === 0;
  }

  push(item) {
    this.heap.push(item);
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);

    while (parent > 0 && this.heap[current][0] < this.heap[parent][0]) {
      [this.heap[current], this.heap[parent]] = [this.heap[parent], this.heap[current]];
      current = parent;
      parent = Math.floor(current / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    const min = this.heap[1];
    const last = this.heap.pop();

    if (this.size() === 0) return min;

    this.heap[1] = last;
    let current = 1;
    let leftChild = current * 2;
    let rightChild = current * 2 + 1;

    while (leftChild <= this.size()) {
      let smaller = leftChild;
      if (rightChild <= this.size() && this.heap[rightChild][0] < this.heap[leftChild][0]) {
        smaller = rightChild;
      }

      if (this.heap[current][0] <= this.heap[smaller][0]) break;

      [this.heap[current], this.heap[smaller]] = [this.heap[smaller], this.heap[current]];
      current = smaller;
      leftChild = current * 2;
      rightChild = current * 2 + 1;
    }

    return min;
  }
}

function solution(n, s, a, b, fares) {
  // 시작: 8:40, 끝 9:37
  // 합승을 하지 않아도 됨
  // 입력: n(지점 개수), s(출발지점), a(a의 도착지점), b(b의 도착지점), fares(지점 사이의 택시요금)
  // 출력: 최저 택시요금
  //----------------------
  // 다익스트라
  // S -> A 최소 택시요금, S -> B 최소 택시요금, A -> B 최소 택시요금 구하기
  // S -> A + S -> B의 최소 요금이 S -> A + A -> B 또는 S -> B + B -> A의 최소 요금보다 적으면 각자타고 아니면 합승하기

  // 그런데 합승하다가 어떤 지점에서 각자 갈 수도 있음
  // 식으로 나타내보기: (S -> C) + (C -> A) + (C -> B), C를 1부터 해서 최소가 되는 비용 구하기
  // 처음부터 각자 가는게 나으면 C는 S랑 같을 것임, 계속 합승하는게 나으면 C는 A 또는 B일 것임

  const dijkstra = (graph, n, start) => {
    const minCost = Array.from({ length: n + 1 }, () => Infinity);
    minCost[start] = 0;

    const pq = new PriorityQueue();
    pq.push([0, start]);

    while (!pq.isEmpty()) {
      const [cost, node] = pq.pop();

      for (const [nextNode, addedCost] of graph[node]) {
        const newCost = cost + addedCost;
        if (newCost < minCost[nextNode]) {
          minCost[nextNode] = newCost;
          pq.push([newCost, nextNode]);
        }
      }
    }

    return minCost;
  };

  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [nodeA, nodeB, cost] of fares) {
    graph[nodeA].push([nodeB, cost]);
    graph[nodeB].push([nodeA, cost]);
  }

  const fromSMinCost = dijkstra(graph, n, s);
  const fromAMinCost = dijkstra(graph, n, a);
  const fromBMinCost = dijkstra(graph, n, b);

  let answer = Infinity;
  for (let c = 1; c <= n; c++) {
    const cost = fromSMinCost[c] + fromAMinCost[c] + fromBMinCost[c];
    answer = Math.min(answer, cost);
  }

  return answer;
}
