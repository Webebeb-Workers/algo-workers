function solution(coin, cards) {
  const n = cards.length;
  const targetSum = n + 1;
  let round = 1; // 이미 1라운드부터 시작

  const handCards = cards.slice(0, n / 3); // 처음에 가진 카드들 (a 배열)
  const remainingDeck = cards.slice(n / 3); // 아직 뽑지 않은 카드들
  const discardedCards = []; // 뽑았지만 아직 가져오지 않은 카드들 (b 배열)
  let currentIdx = 0; // 현재 인덱스

  // 게임 시작
  while (currentIdx < remainingDeck.length) {
    // 이번 라운드에서 뽑은 두 장의 카드
    const card1 = remainingDeck[currentIdx];
    const card2 = remainingDeck[currentIdx + 1];

    // 뽑은 카드를 discardedCards에 추가
    discardedCards.push(card1, card2);

    // 우선순위 1: 동전 0개 - 손에 든 카드 두 장으로 합이 n+1
    let canProceed = false;
    for (let i = 0; i < handCards.length; i++) {
      for (let j = i + 1; j < handCards.length; j++) {
        if (handCards[i] + handCards[j] === targetSum) {
          // 다음 라운드로 진행 가능
          handCards.splice(j, 1); // 인덱스가 큰 것부터 제거
          handCards.splice(i, 1);
          canProceed = true;
          break;
        }
      }
      if (canProceed) break;
    }

    // 우선순위 2: 동전 1개 - 손에 든 카드 1장 + 버린 카드 1장으로 합이 n+1
    if (!canProceed && coin >= 1) {
      for (let i = 0; i < handCards.length; i++) {
        for (let j = 0; j < discardedCards.length; j++) {
          if (handCards[i] + discardedCards[j] === targetSum) {
            // 다음 라운드로 진행 가능
            handCards.splice(i, 1);
            discardedCards.splice(j, 1);
            coin -= 1; // 동전 1개 사용
            canProceed = true;
            break;
          }
        }
        if (canProceed) break;
      }
    }

    // 우선순위 3: 동전 2개 - 버린 카드 두 장으로 합이 n+1
    if (!canProceed && coin >= 2) {
      for (let i = 0; i < discardedCards.length; i++) {
        for (let j = i + 1; j < discardedCards.length; j++) {
          if (discardedCards[i] + discardedCards[j] === targetSum) {
            // 다음 라운드로 진행 가능
            discardedCards.splice(j, 1);
            discardedCards.splice(i, 1);
            coin -= 2; // 동전 2개 사용
            canProceed = true;
            break;
          }
        }
        if (canProceed) break;
      }
    }

    // 다음 라운드로 진행할 수 없으면 게임 종료
    if (!canProceed) {
      return round;
    }

    // 다음 라운드로 진행
    round++;
    currentIdx += 2;

    // 더 이상 뽑을 카드가 없으면 게임 종료
    if (currentIdx >= remainingDeck.length) {
      return round;
    }
  }

  return round;
}

// DFS 풀이 -----------------------------------------------------------------------------------------------------------

// 각 cards마다 탐색 후 n+1이 있으면 뽑기? => 그리디한 방법은 안될 거 같음. 현재 카드보다 미래 카드와의 조합을 하는 것이 더 낫다는 가능성이 있기 때문
// DFS로 재귀적으로 전체 탐색 후 항상 최대 라운드 변수를 갱신하는 게 좋을 듯, 어차피 맨 아래 노드까지 내려갈 것이니

// 1. 먼저 초기 변수 설정
//   - 처음 시작카드 (n/3장)
//   - 동전 할당 (coin개)
//   - 목표 합 (n+1)
//   - 최대 라운드
// 2. DFS: 모든 경우의 수 탐색
//   - 각 라운드마다 새로 뽑은 카드 2장에 대해 4가지 선택지
//     - 두 카드 모두 X
//     - 카드1만 가져가고 카드2 X (동전 1개)
//     - 카드2만 가져가고 카드1 X (동전 1개)
//     - 두 카드 모두 가져감 (동전 2개)
// 3. 카드를 가져온 후 다음 라운드로 진행할 수 있는지 확인
//   - 손에 든 카드 중 합이 n+1이 되는 두 장이 있는지 확인
//     - 있으면: 해당 카드 두 장을 내고 다음 라운드로 진행
//     - 없으면: 게임 종료, 현재 라운드 수를 최대값과 비교하여 갱신
// 4. 모든 탐색이 끝나면 최대 라운드 수 반환

// 가지치기 최적화
// - 이미 찾은 최대 라운드보다 현재 라운드가 작고, 남은 카드가 부족하면 탐색 중단
// - 동전을 다 써버리면 더 이상 카드를 가져올 수 없으므로 현재 카드만으로 가능한 최대 라운드 계산

// function solution(coin, cards) {
//   const n = cards.length;
//   const targetSum = n + 1;
//   let maxRound = 0;

//   // 처음 n/3장의 카드
//   const initialCards = cards.slice(0, n / 3);
//   // 남은 카드들
//   const remainingCards = cards.slice(n / 3);

//   // 합이 targetSum인 카드 두 장이 있는지 체크
//   function canMoveToNextRound(cards, targetSum) {
//     return findPairWithSum(cards, targetSum) !== null;
//   }

//   // 합이 targetSum인 카드 쌍 찾기
//   function findPairWithSum(cards, targetSum) {
//     for (let i = 0; i < cards.length; i++) {
//       for (let j = i + 1; j < cards.length; j++) {
//         if (cards[i] + cards[j] === targetSum) {
//           return [cards[i], cards[j]];
//         }
//       }
//     }
//     return null;
//   }

//   // DFS 탐색
//   function dfs(round, handCards, remainingCoins, nextCardIdx) {
//     // 이미 카드를 다 뽑았으면 현재 라운드로 최대값 갱신
//     if (nextCardIdx >= remainingCards.length) {
//       maxRound = Math.max(maxRound, round);
//       return;
//     }

//     // 이번 라운드에 뽑은 두 장의 카드
//     const card1 = remainingCards[nextCardIdx];
//     const card2 = remainingCards[nextCardIdx + 1];

//     // 현재 손패로 다음 라운드로 진행할 수 있는지 체크
//     const canProceedWithCurCards = canMoveToNextRound(handCards, targetSum);

//     // 케이스 1: 두 카드 모두 버리기
//     if (canProceedWithCurCards) {
//       // 다음 라운드로 진행 가능한 경우
//       const newHandCards = [...handCards];
//       const pairToUse = findPairWithSum(newHandCards, targetSum);
//       if (pairToUse) {
//         // 사용할 카드 두 장 제거
//         newHandCards.splice(newHandCards.indexOf(pairToUse[0]), 1);
//         newHandCards.splice(newHandCards.indexOf(pairToUse[1]), 1);
//         dfs(round + 1, newHandCards, remainingCoins, nextCardIdx + 2);
//       }
//     } else {
//       // 다음 라운드로 진행 불가능한 경우
//       maxRound = Math.max(maxRound, round);
//     }

//     // 남은 카드나 동전이 충분하지 않으면 더 이상 진행 불가
//     if (nextCardIdx + 2 >= remainingCards.length || round >= n / 2) {
//       return;
//     }

//     // 케이스 2: 카드1만 가져가기 (동전 1개 사용)
//     if (remainingCoins >= 1) {
//       const newHandCards = [...handCards, card1];
//       if (canMoveToNextRound(newHandCards, targetSum)) {
//         const pairToUse = findPairWithSum(newHandCards, targetSum);
//         if (pairToUse) {
//           const cardsAfterUsing = [...newHandCards];
//           cardsAfterUsing.splice(cardsAfterUsing.indexOf(pairToUse[0]), 1);
//           cardsAfterUsing.splice(cardsAfterUsing.indexOf(pairToUse[1]), 1);
//           dfs(round + 1, cardsAfterUsing, remainingCoins - 1, nextCardIdx + 2);
//         }
//       } else {
//         dfs(round, newHandCards, remainingCoins - 1, nextCardIdx + 2);
//       }
//     }

//     // 케이스 3: 카드2만 가져가기 (동전 1개 사용)
//     if (remainingCoins >= 1) {
//       const newHandCards = [...handCards, card2];
//       if (canMoveToNextRound(newHandCards, targetSum)) {
//         const pairToUse = findPairWithSum(newHandCards, targetSum);
//         if (pairToUse) {
//           const cardsAfterUsing = [...newHandCards];
//           cardsAfterUsing.splice(cardsAfterUsing.indexOf(pairToUse[0]), 1);
//           cardsAfterUsing.splice(cardsAfterUsing.indexOf(pairToUse[1]), 1);
//           dfs(round + 1, cardsAfterUsing, remainingCoins - 1, nextCardIdx + 2);
//         }
//       } else {
//         dfs(round, newHandCards, remainingCoins - 1, nextCardIdx + 2);
//       }
//     }

//     // 케이스 4: 두 카드 모두 가져가기 (동전 2개 사용)
//     if (remainingCoins >= 2) {
//       const newHandCards = [...handCards, card1, card2];
//       if (canMoveToNextRound(newHandCards, targetSum)) {
//         const pairToUse = findPairWithSum(newHandCards, targetSum);
//         if (pairToUse) {
//           const cardsAfterUsing = [...newHandCards];
//           cardsAfterUsing.splice(cardsAfterUsing.indexOf(pairToUse[0]), 1);
//           cardsAfterUsing.splice(cardsAfterUsing.indexOf(pairToUse[1]), 1);
//           dfs(round + 1, cardsAfterUsing, remainingCoins - 2, nextCardIdx + 2);
//         }
//       } else {
//         dfs(round, newHandCards, remainingCoins - 2, nextCardIdx + 2);
//       }
//     }
//   }

//   // 초기 호출
//   dfs(1, initialCards, coin, 0);

//   return maxRound;
// }
