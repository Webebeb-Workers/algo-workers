function solution(friends, gifts) {
  const fds = new Array(friends.length).fill(null);
  const ids = {};
  const infos = new Array(friends.length)
    .fill(null)
    .map(() => new Array(friends.length).fill(0));

  for (let index = 0; index < friends.length; index++) {
    ids[friends[index]] = index;
  }

  for (const friend of friends) {
    fds[ids[friend]] = { give: 0, take: 0, point: 0 };
  }

  for (const gift of gifts) {
    const [send, to] = gift.split(" ");
    infos[ids[send]][ids[to]] += 1;
    fds[ids[send]].give++;
    fds[ids[to]].take++;
  }

  for (const fd of fds) {
    fd.point = fd.give - fd.take;
    fd.take = 0;
  }

  for (let sender = 0; sender < friends.length - 1; sender++) {
    for (let taker = sender + 1; taker < friends.length; taker++) {
      if (sender == taker) continue;
      if (infos[sender][taker] == infos[taker][sender]) {
        if (fds[sender].point > fds[taker].point) fds[sender].take++;
        else if (fds[sender].point < fds[taker].point) fds[taker].take++;
      } else if (infos[sender][taker] > infos[taker][sender])
        fds[sender].take++;
      else fds[taker].take++;
    }
  }

  let result = 0;
  for (const fd of fds) {
    result = Math.max(fd.take, result);
  }

  return result;
}
