function solution(edges) {
  // 도녓 -> n개 정점, n개 간선
  // 막대 -> n개 정점, n-1개 간선
  // 8자 -> 2n+1개 젖엄, 2n+2개 간선
  // 결과 -> [생성한 정점 번호, 도넛 그래프 수, 막대 그래프 수, 8자 그래프 수]

  // 생성한 정점 번호: 들어오는 간선 0, 나가는 간선 2개 이상(제한 사항: 그래프는 2개 이상)
  // 막대: 나가는 간선 0 (생성한 정점에서 간선이 들어오므로 들어오는 간선 0일 때는 제외)
  // 8자: 들어오는 간선 2 이상, 나가는 간선 2 (들어오는 간선 2 이상인 이유: 생성한 정점에서 들어오는 간선 포함)
  // 도넛: 생성한 정점의 나가는 간선 개수 - 막대 개수 - 8자 개수

  // 그래프 연결하기
  const graphs = {};
  edges.forEach(([from, to]) => {
    if (!graphs[from]) {
      graphs[from] = { from: [], to: [] };
    }
    if (!graphs[to]) {
      graphs[to] = { from: [], to: [] };
    }
    graphs[from].to.push(to);
    graphs[to].from.push(from);
  });

  // 개수 구하기
  const answer = [0, 0, 0, 0];
  for (const [node, { from, to }] of Object.entries(graphs)) {
    if (from.length === 0 && to.length >= 2) answer[0] = Number(node);
    if (to.length === 0) answer[2]++;
    if (from.length >= 2 && to.length === 2) answer[3]++;
  }
  answer[1] = graphs[answer[0]].to.length - answer[2] - answer[3];

  return answer;
}
