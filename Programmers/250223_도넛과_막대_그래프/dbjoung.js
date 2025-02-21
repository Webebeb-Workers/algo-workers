function pop(list, value) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] == value) list.splice(i, 1);
  }
}

function bfs(startNode, map, visit) {
  const queue = [];

  queue.push(startNode);
  visit[startNode] = true;

  while (queue.length > 0) {
    const curNode = queue.shift();
    if (map[curNode].length == 0) continue;
    for (const nextNode of map[curNode]) {
      if (visit[nextNode]) continue;
      visit[nextNode] = true;
      queue.push(nextNode);
    }
  }
}

function solution(edges) {
  const map = new Array(1000001).fill(null).map(() => []);
  const rmap = new Array(1000001).fill(null).map(() => []);
  const visit = new Array(1000001).fill(true);

  let numOfNode = 0;
  for (const edge of edges) {
    map[edge[0]].push(edge[1]);
    rmap[edge[1]].push(edge[0]);
    visit[edge[0]] = false;
    visit[edge[1]] = false;
    numOfNode = Math.max(numOfNode, edge[0], edge[1]);
  }

  const addedNode = map.findIndex(
    (edge, i) => edge.length >= 2 && rmap[i].length == 0
  );
  map[addedNode].forEach((node) => {
    pop(rmap[node], addedNode);
  });

  const lineGStarts = [];
  const EGCenters = [];

  for (let nodeIndex = 1; nodeIndex <= numOfNode; nodeIndex++) {
    if (visit[nodeIndex]) continue;
    if (map[nodeIndex].length == 2 && rmap[nodeIndex].length == 2)
      EGCenters.push(nodeIndex);
    else if (map[nodeIndex].length <= 1 && rmap[nodeIndex].length == 0)
      lineGStarts.push(nodeIndex);
  }

  lineGStarts.forEach((node) => {
    bfs(node, map, visit);
  });
  EGCenters.forEach((node) => {
    bfs(node, map, visit);
  });

  let donuts = 0;
  for (let i = 1; i <= numOfNode; i++) {
    if (visit[i] || i == addedNode) continue;
    bfs(i, map, visit);
    donuts++;
  }

  var answer = [addedNode, donuts, lineGStarts.length, EGCenters.length];
  return answer;
}
