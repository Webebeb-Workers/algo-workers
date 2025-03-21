// 난이도=시간의 길이가 30만개, 또한, 모든 값을 일일이 확인하는 것은 비효율적, 일반적인 구현, 그리디 방식 안됨.
//   => DP인가? 각 레벨마다 걸리는 시간을 1차원 DP로 선언 후..? level에 따른 점화식이 나오지 않음.. 이전 값을 현재 값에 사용하는 각도 안나오고
// 이진 탐색으로 매개변수:최적값을 찾는 방법이 있음: "제한 시간 안에 퍼즐을 모두 풀 수 있는 가장 낮은 숙련도"

// 1. 숙련도(level)에 대해 제한 시간 내에 모든 퍼즐을 풀 수 있는지 확인하는 함수 구현, 논리대로 구현하면 됨
//   - diffs 순회하며 level에 따라 걸리는 시간 연산 => level에 따라 틀리는지 안틀리는지
//   - 순회하면서 나온 시간들은 전체 시간 변수 추가
//   - 전체 시간 변수가 limit를 안넘으면 가능, 넘으면 불가능
// 2. 이진 탐색을 통해 가능한 최소 숙련도 찾기
//   - 숙련도 범위: 1 ~ 최대 난이도(diffs 배열 최댓값)
//   - 중간값으로 가능 여부 확인 후 범위 좁히기
//   - 가능하면 더 낮은 숙련도 탐색, 불가능하면 더 높은 숙련도 탐색

function solution(diffs, times, limit) {
  // let left = 1;
  // diffs 길이는 30만개 이하임, JS 엔진의 호출 스택은 일반적으로 수천에서 수만 개의 프레임까지만 처리 가능
  // 그래서 diffs를 스프레드로 펼쳐버리면 내부적으로 호출 스택에 모든 요소를 펼치게 되어 스택 오버플로우가 발생
  // let right = Math.max(...diffs)

  // 스프레드 연산자가 아닌 reduce로 최댓값 구함
  let [left, right] = [1, diffs.reduce((acc, cur) => Math.max(acc, cur), 1)];

  // 이진 탐색으로 매개변수(최소 숙련도) 찾기: 최솟값이 최댓값보다 커졌을 때!
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canResolve(mid, diffs, times, limit)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
    // -1, +1 안해주면, mid가 범위의 가장 작은 값일 때 무한 루프에 빠질 수 있음
  }

  return left;
}

function canResolve(curLevel, diffs, times, limit) {
  let totalTime = 0;

  for (let i = 0; i < diffs.length; i++) {
    const curDiff = diffs[i];
    const curTime = times[i];

    if (curDiff <= curLevel) {
      totalTime += curTime;
    } else {
      const wrongCount = curDiff - curLevel;
      const prevTime = i > 0 ? times[i - 1] : 0;

      // 틀릴 때마다: 현재 퍼즐 시간 + 이전 퍼즐들 이전 시간만큼 다시 풀기
      totalTime += curTime + (curTime + prevTime) * wrongCount;
    }

    // 순회 도중 return 을 명시해 쓸 데 없는 연산 감소
    if (limit < totalTime) return false;
  }
  return true;
}

// 1. 초기 설정
//    - left = 1
//    - right = 5 (최대 난이도)

// 2. 첫 번째 반복
//    - mid = (1 + 5) / 2 = 3
//    - canResolve(3, [1, 5, 3], [2, 4, 7], 30) 호출
//      - 첫 번째 퍼즐(난이도 1): 한 번에 해결, 시간 = 2
//      - 두 번째 퍼즐(난이도 5): 틀림 (5-3=2번), 시간 = (4+2)*2 + 4 = 16
//      - 세 번째 퍼즐(난이도 3): 한 번에 해결, 시간 = 7
//      - 총 시간 = 2 + 16 + 7 = 25 < 30 → true 반환
//    - right = mid - 1 = 2 (더 작은 레벨 탐색)

// 3. 두 번째 반복
//    - mid = (1 + 2) / 2 = 1
//    - canResolve(1, [1, 5, 3], [2, 4, 7], 30) 호출
//      - 첫 번째 퍼즐(난이도 1): 한 번에 해결, 시간 = 2
//      - 두 번째 퍼즐(난이도 5): 틀림 (5-1=4번), 시간 = (4+2)*4 + 4 = 28
//      - 세 번째 퍼즐(난이도 3): 틀림 (3-1=2번), 시간 = (7+4)*2 + 7 = 29
//      - 총 시간 = 2 + 28 + 29 = 59 > 30 → false 반환
//    - left = mid + 1 = 2 (더 큰 레벨 탐색)

// 4. 세 번째 반복
//    - mid = (2 + 2) / 2 = 2
//    - canResolve(2, [1, 5, 3], [2, 4, 7], 30) 호출
//      - 첫 번째 퍼즐(난이도 1): 한 번에 해결, 시간 = 2
//      - 두 번째 퍼즐(난이도 5): 틀림 (5-2=3번), 시간 = (4+2)*3 + 4 = 22
//      - 세 번째 퍼즐(난이도 3): 틀림 (3-2=1번), 시간 = (7+4)*1 + 7 = 18
//      - 총 시간 = 2 + 22 + 18 = 42 > 30 → false 반환
//    - left = mid + 1 = 3 (더 큰 레벨 탐색)

// 5. 더 이상 진행 불가 (left > right)
//    - 최종 답: left = 3
