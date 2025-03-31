// 우선순위 큐 구현 (최소 힙)
// 항상 현재까지 발견된 가장 작은 intensity를 가진 노드를 먼저 처리하기 위함
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

function solution(n, paths, gates, summits) {
  // 출입구는 처음과 끝에 한 번, 산봉우리는 한 번만 포함
  // intensity: 휴식 없이 이동해야하는 시간 중 가장 긴 시간
  // intensity 최소 등산코스 정하기
  // 입력: n(지점 수), paths(등산로 정보 2차원 배열), gates(출입구 번호), summits(봉우리 번호)
  // 출력: [intensity가 최소가 되는 등산 코스에 포함된 산봉우리 번호, intensity 최소값]
  //--------------------------------------------------------------
  // 가중치 있음, 양의 정수 -> 다익스트라?
  // 근데 모든 가중치의 합이 아니라 가중치 중 최대값이 최소인 경로 구해야함

  // 그래프 초기화
  const graph = Array.from({ length: n + 1 }, () => []);

  // 양방향 그래프 구성
  for (const [i, j, w] of paths) {
    graph[i].push([j, w]);
    graph[j].push([i, w]);
  }

  // 산봉우리 체크 배열
  const isSummit = Array.from({ length: n + 1 }, () => false);
  for (const summit of summits) {
    isSummit[summit] = true;
  }

  // 각 지점까지의 최소 intensity 저장
  const intensity = Array.from({ length: n + 1 }, () => Infinity);

  // 다익스트라 알고리즘
  const heap = new PriorityQueue();

  // 모든 출발지(게이트)를 우선순위 큐에 넣기
  for (const gate of gates) {
    intensity[gate] = 0;
    heap.push([0, gate]);
  }

  while (!heap.isEmpty()) {
    const [currentIntensity, point] = heap.pop();

    // 현재 계산된 intensity보다 크거나 산봉우리면 스킵
    if (intensity[point] < currentIntensity || isSummit[point]) continue;

    for (const [vertex, nextIntensity] of graph[point]) {
      // 다음 지점까지의 intensity 계산 (경로 중 최대값)
      const max = Math.max(intensity[point], nextIntensity);

      // 더 작은 intensity로 갈 수 있다면 업데이트
      if (intensity[vertex] > max) {
        intensity[vertex] = max;
        heap.push([max, vertex]);
      }
    }
  }

  // 결과 계산 [봉우리 번호, intensity 최소값]
  let answer = [0, Infinity];

  // 산봉우리를 오름차순으로 정렬하고 최소 intensity 찾기
  // 오름차순 정렬: 봉우리 번호 최소로 하기 위함
  for (const summit of [...summits].sort((a, b) => a - b)) {
    if (answer[1] > intensity[summit]) {
      answer = [summit, intensity[summit]];
    }
  }

  return answer;
}
