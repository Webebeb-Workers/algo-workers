// 점수 차이의 최댓값을 계속 갱신, DFS로 결과값 비교
// - 각 점수대에서 라이언은 0발부터 최대 n발까지 쏨
// - 어떤 점수를 얻으려면 어피치보다 최소 1발 더 많이 맞혀야 함
// - 남은 화살 수와 현재까지의 점수 차이를 계속 추적, 최대 차이가 나오도록
// - 같은 점수 차이라면 낮은 점수에 더 많은 화살을 쏜 경우를 선택
// 화살 수가 최대 10개, 과녁 점수가 11가지로 제한, DP 필요 없긴 할 듯
// k점을 여러 발 맞혀도 k점 보다 많은 점수를 가져가는 게 아니고 k점만 가져가는 것을 유의

function solution(n, info) {
  let maxDiff = 0;
  let answer = [-1];
  const ryan = Array(11).fill(0);

  function dfs(idx, leftArrows) {
    // 기저: 모든 점수대를 확인했거나 화살을 모두 사용한 경우
    if (idx === 11 || leftArrows === 0) {
      // 남은 화살이 있으면 0점에 모두 할당
      if (leftArrows > 0) {
        ryan[10] += leftArrows;
      }

      // 점수 계산 및 비교
      let apeachScore = 0;
      let ryanScore = 0;

      for (let i = 0; i < 11; i++) {
        // 둘 다 화살을 쏘지 않은 경우
        if (info[i] === 0 && ryan[i] === 0) continue;

        // 점수 계산 (10-i 점에 대한)
        if (info[i] >= ryan[i]) {
          apeachScore += 10 - i;
        } else {
          ryanScore += 10 - i;
        }
      }

      const diff = ryanScore - apeachScore;

      // 라이언이 이기는 경우만 처리
      if (diff > 0) {
        // 현재 차이가 최대 차이보다 크거나 최대 차이와 같지만 낮은 점수에 더 많은 화살을 쏜 경우 갱신
        if (diff > maxDiff || (diff === maxDiff && isLowerScoreBetter(ryan, answer))) {
          maxDiff = diff;
          answer = [...ryan];
        }
      }

      // 남은 화살을 0점에 추가했다면 다시 원복 (백트래킹)
      if (leftArrows > 0) {
        ryan[10] -= leftArrows;
      }

      return;
    }

    // 현재 점수대에 화살 배치 결정
    const apeachArrows = info[idx];

    // 어피치보다 1발 더 많이 쏴서 점수 획득 시도
    if (leftArrows > apeachArrows) {
      ryan[idx] = apeachArrows + 1;
      dfs(idx + 1, leftArrows - (apeachArrows + 1));
      ryan[idx] = 0; // 백트래킹
    }

    // 해당 점수대를 포기하고 화살을 쏘지 않는 경우
    ryan[idx] = 0;
    dfs(idx + 1, leftArrows);
  }

  dfs(0, n);

  return answer;
}

// 낮은 점수를 더 많이 맞혔는지 확인하는 함수
function isLowerScoreBetter(ryan, current) {
  // 낮은 점수부터(뒤에서부터) 비교
  for (let i = 10; i >= 0; i--) {
    if (ryan[i] !== current[i]) {
      return ryan[i] > current[i];
    }
  }
  return false;
}
