function solution(friends, gifts) {
  // 선물 주고받은 기록 x 또는 횟수 same -> 선물 지수 더 큰 사람이 선물 지수 더 작은 사람에게 선물 하나 받기
  // 선물 지수: 이번달까지 친구들에게 준 선물의 수 - 받은 선물 수
  // 선물 지수도 같으면 다음 달에 선물 주고받지 x

  // friends: 친구의 이름들
  // gifts: "선물을 준 친구 선물 받은 친구"
  // 반환 값: 다음달에 가장 많은 선물을 받는 친구가 받을 선물의 수

  // 이름별 인덱스 부여
  const indexOfPerson = {};
  friends.forEach((friend, index) => (indexOfPerson[friend] = index));

  // 주고받은 선물 표
  const giveAndTakeTable = Array.from({ length: friends.length }, () =>
    Array.from({ length: friends.length }, () => 0)
  );
  gifts.forEach((gift) => {
    const [sender, receiver] = gift.split(" ");
    giveAndTakeTable[indexOfPerson[sender]][indexOfPerson[receiver]]++;
  });

  // 주고받은 선물 지수 표
  const giftIndex = Array.from({ length: friends.length }, () => 0);
  friends.forEach((_, index) => {
    const sendCount = giveAndTakeTable[index].reduce((cul, cur) => cul + cur, 0);
    const receiveCount = giveAndTakeTable.reduce((acc, row) => acc + row[index], 0);
    giftIndex[index] = sendCount - receiveCount;
  });

  const answer = Array.from({ length: friends.length }, () => 0);
  giveAndTakeTable.forEach((rowTable, rowIndex) => {
    rowTable.forEach((element, columnIndex) => {
      if (columnIndex <= rowIndex) return; // 중복 부분 제거

      const giveCount = element;
      const sendCount = giveAndTakeTable[columnIndex][rowIndex];

      // 선물 주고받은 기록이 있음 && 횟수 다름 -> 더 많이 선물 준 사람이 선물 하나 받기
      if ((giveCount !== 0 || sendCount !== 0) && giveCount !== sendCount) {
        if (giveCount > sendCount) answer[rowIndex]++;
        else answer[columnIndex]++;
      }

      // 선물 주고받은 기록이 없음 || 횟수 같음 -> 선물 지수 더 큰 사람이 선물 하나 받음
      if ((giveCount === 0 && sendCount === 0) || giveCount === sendCount) {
        const myGiftIndex = giftIndex[rowIndex];
        const otherGiftIndex = giftIndex[columnIndex];
        if (myGiftIndex > otherGiftIndex) answer[rowIndex]++;
        else if (myGiftIndex < otherGiftIndex) answer[columnIndex]++;
      }
    });
  });

  return Math.max(...answer);
}
