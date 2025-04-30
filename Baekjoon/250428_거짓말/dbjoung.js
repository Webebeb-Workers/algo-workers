function find(people, node) {
  if (node != people[node]) {
    people[node] = find(people, people[node]);
  }

  return people[node];
}

function union(people, a, b) {
  a = find(people, a);
  b = find(people, b);

  if (a < b) {
    people[b] = a;
  } else {
    people[a] = b;
  }
}

function getAnswer() {
  const [NM, KNOWNS, ...PARTY] = require("fs")
    .readFileSync(0)
    .toString()
    .trim()
    .split("\n");
  const [N, M] = NM.split(" ").map(Number);
  const [k, ...knowns] = KNOWNS.split(" ").map(Number);
  const parties = PARTY.map((line) => line.split(" ").map(Number));

  if (k == 0) return M;

  const people = new Array(N + 1).fill(0).map((_, i) => i);

  for (const know of knowns) {
    people[know] = 0;
  }

  for (const party of parties) {
    for (let i = 1; i < party.length - 1; i++) {
      union(people, party[i], party[i + 1]);
    }
  }

  let answer = 0;
  for (const party of parties) {
    const isLiePossible = party
      .slice(1)
      .every((person) => find(people, person) != find(people, 0));
    if (isLiePossible) {
      answer++;
    }
  }

  return answer;
}

console.log(getAnswer());
