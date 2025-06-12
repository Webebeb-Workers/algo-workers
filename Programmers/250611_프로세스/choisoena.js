function solution(priorities, location) {
  const orderedPriorities = [];

  // 인덱스 포함된 객체 배열 만들기
  const newPriorities = priorities.map((e, i) => ({ process: e, index: i }));

  while (newPriorities.length !== 0) {
    // 실행 대기 큐에서 대기중인 프로세스 하나 꺼내기
    const process = newPriorities.shift();

    // 큐에 대기중인 프로세스 중 우선순위 더 높은 프로세스 있는지 판정
    // 우선순위 더 높은 프로세스 있으면 현재 프로세스 다시 큐에 넣기
    if (newPriorities.some((e) => process.process < e.process)) {
      newPriorities.push(process);
    }
    // 없으면 다른 새 배열에 push
    else orderedPriorities.push(process);
  }
  return orderedPriorities.findIndex((e) => e.index === location) + 1;
}
