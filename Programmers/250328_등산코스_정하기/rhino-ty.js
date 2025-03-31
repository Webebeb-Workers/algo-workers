// 간선마다 가중치가 있는 최단 거리 => 다익스트라: 우선순위 큐 + 매 간선마다 가중치 비교
// + 특이함: 경로 상 내의 최소 intensity를 찾아야 함, 특정 출입구 왕복, 중간에 다른 출입구 방문 불가
//    => 연속된 intensity, 즉 인접한 간선의 가중치만 생각 해도 됨, 총합 정도만..?
function solution(n, paths, gates, summits) {
  // 그래프 생성 & 양방향
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [i, j, w] of paths) {
    graph[i].push([j, w]);
    graph[j].push([i, w]);
  }

  // 출입구/산봉우리 Set: 빠른 조회 has 위해
  const gateSet = new Set(gates);
  const summitSet = new Set(summits);

  const minIntensity = findMinIntensity(n, graph, gateSet, summitSet);
  return findMinIntensitySummit(minIntensity, summits);
}

// 다익스트라 변형: 최소 intensity 찾기
function findMinIntensity(n, graph, gateSet, summitSet) {
  const intensity = Array(n + 1).fill(Infinity);
  // MinHeap 사용
  const minHeap = new MinHeap();

  // 모든 출입구를 시작점으로 설정
  for (const gate of gateSet) {
    intensity[gate] = 0;
    minHeap.add([gate, 0]);
  }

  while (!minHeap.isEmpty()) {
    // MinHeap에서 최소 intensity를 가진 노드 추출
    const [current, currentIntensity] = minHeap.poll();

    // 스킵: 산봉우리 & 이미 더 작은 intensity 방문 체크
    if (currentIntensity > intensity[current]) continue;
    if (summitSet.has(current)) continue;

    // 인접 노드 탐색
    for (const [next, weight] of graph[current]) {
      // 출입구는 시작점으로만 사용하기 위해 제외
      if (gateSet.has(next)) continue;

      // 현재까지의 intensity와 새 간선 가중치 중 최대값 체크
      const newIntensity = Math.max(currentIntensity, weight);

      // 더 작은 intensity로 이동 가능하면 업데이트
      if (newIntensity < intensity[next]) {
        intensity[next] = newIntensity;
        minHeap.add([next, newIntensity]);
      }
    }
  }

  return intensity;
}

// 산봉우리 중 intensity가 최소인 것 찾기
function findMinIntensitySummit(intensity, summits) {
  let answer = [0, Infinity];
  summits.sort((a, b) => a - b); // 산봉우리 번호 오름차순 정렬

  for (const summit of summits) {
    if (intensity[summit] < answer[1]) {
      answer = [summit, intensity[summit]];
    }
  }

  return answer;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 힙의 크기 반환
  size() {
    return this.heap.length;
  }

  // 힙이 비어있는지 확인
  isEmpty() {
    return this.heap.length === 0;
  }

  // 요소 추가
  add(item) {
    this.heap.push(item);
    this._heapifyUp(this.heap.length - 1);
    return this;
  }

  // 최소값 추출
  poll() {
    if (this.isEmpty()) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._heapifyDown(0);
    }

    return min;
  }

  // 최소값 확인 (제거하지 않음)
  peek() {
    return this.isEmpty() ? null : this.heap[0];
  }

  // 힙 속성 상향식 유지
  _heapifyUp(index) {
    let currentIdx = index;

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);

      // 비교 함수를 통해 부모와 자식 비교
      if (this._compare(this.heap[currentIdx], this.heap[parentIdx]) >= 0) {
        break;
      }

      [this.heap[currentIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[currentIdx]];

      currentIdx = parentIdx;
    }
  }

  // 힙 속성 하향식 유지
  _heapifyDown(index) {
    const lastIdx = this.heap.length - 1;
    let currentIdx = index;

    while (true) {
      let smallest = currentIdx;
      const leftChildIdx = 2 * currentIdx + 1;
      const rightChildIdx = 2 * currentIdx + 2;

      if (leftChildIdx <= lastIdx && this._compare(this.heap[leftChildIdx], this.heap[smallest]) < 0) {
        smallest = leftChildIdx;
      }

      if (rightChildIdx <= lastIdx && this._compare(this.heap[rightChildIdx], this.heap[smallest]) < 0) {
        smallest = rightChildIdx;
      }

      if (smallest === currentIdx) {
        break;
      }

      [this.heap[currentIdx], this.heap[smallest]] = [this.heap[smallest], this.heap[currentIdx]];

      currentIdx = smallest;
    }
  }

  // 비교 함수 - 기본적으로 [노드, 가중치] 배열의 가중치 비교
  // 다른 형태의 데이터를 위해 오버라이드 가능
  _compare(a, b) {
    // 기본 구현: [노드, 가중치] 형태의 배열 비교
    return a[1] - b[1];
  }
}
