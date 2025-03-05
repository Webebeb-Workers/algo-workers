// 완전탐색 + Math.max를 찾는 문제임. 근데 문제는 주사위가 10개까지 있으니 시간 복잡도가 기하급수적으로 늘어남
// 최대 C(10, 5) * 6^5 * 6^5의 시간복잡도를 가짐 150억;;
//   => DP도 사용해 각 dice의 합을 작성한 뒤, 꺼내오는 방식으로 구현하면 줄일 수 있음

// 1. 주사위 조합 생성 (A가 몇 개 골라야 할지 계산)
//   - 전체 n개 중에 반인 n/2개를 고름
//   - DFS 백트래킹으로 다 만들어서 조합 배열에 추가함
// 2. 각 조합마다 승률 계산
//   - A가 고른 주사위로 합 분포 계산
//   - B가 남은 주사위로 합 분포 계산
//   - 둘을 비교해서 승률 계산
//   - 지금까지 중 최대 승률 나오면 갱신
// 3. 승률 최대인 조합 반환

// 합 분포 계산하는 함수가 필요함
// DP를 활용해서 첫 주사위부터 하나씩 추가하면서 계산

function solution(dice) {
  const N = dice.length;
  const halfN = N / 2;

  // 모든 가능한 주사위 조합 생성 (A가 선택하는 조합)
  const combis = [];
  const picked = [];

  // 조합을 생성하는 함수 (백트래킹)
  function makeCombis(start, cnt) {
    // 기저
    if (cnt === halfN) {
      // 깊은 복사
      combis.push([...picked]);
      return;
    }

    for (let i = start; i < N; i++) {
      picked.push(i);
      makeCombis(i + 1, cnt + 1);
      picked.pop();
    }
  }

  makeCombis(0, 0);

  let maxWinRate = -1;
  let bestCombi = [];

  // 각 조합에 대해 승률 계산
  for (const combi of combis) {
    // A의 주사위 번호들 (0-based)
    const aDice = combi;

    // B의 주사위 번호들 (A가 선택하지 않은 나머지)
    const bDice = [];
    for (let i = 0; i < N; i++) {
      if (!aDice.includes(i)) {
        bDice.push(i);
      }
    }

    // A와 B 각각의 주사위 합 분포 계산
    const aSum = getSumDist(aDice, dice);
    const bSum = getSumDist(bDice, dice);

    // 승률 계산
    const winRate = getWinRate(aSum, bSum);

    if (winRate > maxWinRate) {
      maxWinRate = winRate;
      bestCombi = aDice;
    }
  }

  // 1-based 인덱스로 변환하여 반환
  return bestCombi.map((idx) => idx + 1).sort((a, b) => a - b);
}

// 선택한 주사위들의 합 분포를 계산하는 함수
function getSumDist(diceIdx, allDice) {
  // 합의 최대값은 주사위당 최대값(100) * 주사위 개수(최대 5)까지 가능
  const MAX_SUM = 100 * diceIdx.length;
  let dp = new Array(MAX_SUM + 1).fill(0);

  // 첫 번째 주사위에 대한 초기 분포 설정
  const firstIdx = diceIdx[0];
  const firstDice = allDice[firstIdx];

  for (const num of firstDice) {
    dp[num]++;
  }

  // 나머지 주사위에 대해 분포 갱신
  for (let i = 1; i < diceIdx.length; i++) {
    const idx = diceIdx[i];
    const curDice = allDice[idx];
    const newDp = new Array(MAX_SUM + 1).fill(0);

    // 기존 분포의 모든 값에 새 주사위의 모든 면 값을 더함
    for (let sum = 0; sum <= MAX_SUM; sum++) {
      if (dp[sum] > 0) {
        for (const num of curDice) {
          newDp[sum + num] += dp[sum];
        }
      }
    }

    dp = newDp;
  }

  return dp;
}

// A와 B의 합 분포를 비교하여 승률 계산
function getWinRate(aSum, bSum) {
  let total = 0;
  let win = 0;

  // 모든 가능한 합 조합 계산
  for (let a = 0; a < aSum.length; a++) {
    if (aSum[a] > 0) {
      for (let b = 0; b < bSum.length; b++) {
        if (bSum[b] > 0) {
          const cnt = aSum[a] * bSum[b];
          total += cnt;

          // A가 이기는 경우 (합이 더 큰 경우)
          if (a > b) {
            win += cnt;
          }
        }
      }
    }
  }

  return win / total;
}
