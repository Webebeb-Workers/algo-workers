const fs = require("fs");
const [meta, ...array] = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [V, E] = meta.split(" ").map(Number);

const edges = array.map((el) => {
  const [a, b, c] = el.split(" ").map(Number);
  return { a, b, c };
});

// 가중치 기준 오름차순 정렬
const sortedEdges = edges.sort((el1, el2) => el1.c - el2.c);

// 사이클이 형성되지 않도록 union find 알고리즘 활용

// 처음에는 자기 자신이 부모
const parent = Array.from({ length: V + 1 }, (_, i) => i);

// 부모 찾는 함수
const getParent = (x) => {
  if (parent[x] === x) return x;
  else return (parent[x] = getParent(parent[x]));
};

// 두 부모를 합치는 함수
const unionParent = (a, b) => {
  const aParent = getParent(a);
  const bParent = getParent(b);
  if (aParent < bParent) parent[bParent] = aParent;
  else parent[aParent] = bParent;
};

// 같은 부모를 가지는지 확인
const checkSameParent = (a, b) => {
  const aParent = getParent(a);
  const bParent = getParent(b);
  return aParent === bParent;
};

let answer = 0;
let count = 0;
for (const { a, b, c } of sortedEdges) {
  if (!checkSameParent(a, b)) {
    answer += c;
    unionParent(a, b);
    count++;
    if (count === V - 1) break; // MST가 완성되었으면 종료
  }
}

console.log(answer);
