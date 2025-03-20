// 1. 가장 먼 집부터 시작해서 물류창고 방향으로 진행하는 방식으로 계획 => 각 경로마다 그리디하게
//    - 어떤 집까지 가기로 결정했다면, 그 집까지 가는 경로 상에 있는 다른 집들에 대한 배달이나 수거는 추가 이동 거리 없이 수행
//    - 가장 먼 집부터 처리하는 것이 경로 중복을 최소화하고 총 이동 거리를 줄이는 가장 효율적인 방법
//    - 가장 먼 곳을 기준으로 경로를 설계하고, 그 안에 다른 모든 목적지를 효율적으로 배치
// 2. 배달과 수거는 각각 처리 가능 (트럭 한 대에 둘 다 가능)
// 3. cap 개 이상 박스를 담을 수 없음

// 1. 총 이동 거리를 계산할 변수 totalDistance 초기화
// 2. 배달할 물건과 수거할 물건이 하나라도 남아있는 동안 순회(물류센터 출발 기준)
//    - 배달, 수거할 물건 있는 가장 멀리 있는 집 찾기 및 결정(max)
//    - 먼 집 idx 부터 -1 순회하며 배달 처리 후 수거 처리 => 배달을 먼저 하고 나서 cap을 비운 다음 수거하는 것이 올바름

function solution(cap, n, deliveries, pickups) {
  let totalDistance = 0;

  // 마지막 처리 위치 변수를 유지
  let lastIdx = n - 1;

  // 배달/수거해야 할 것이 남아있는 동안 반복
  while (true) {
    // 배달할 물건이 있는 가장 먼 집 찾기 (이전 마지막 인덱스부터 스캔)
    let lastDeliveryIdx = -1;
    for (let i = lastIdx; i >= 0; i--) {
      if (deliveries[i] > 0) {
        lastDeliveryIdx = i;
        break;
      }
    }

    // 수거할 물건이 있는 가장 먼 집 찾기 (이전 마지막 인덱스부터 스캔)
    let lastPickupIdx = -1;
    for (let i = lastIdx; i >= 0; i--) {
      if (pickups[i] > 0) {
        lastPickupIdx = i;
        break;
      }
    }

    // 모든 배달과 수거가 완료되었는지 확인
    if (lastDeliveryIdx === -1 && lastPickupIdx === -1) {
      break;
    }

    // 이번에 방문해야 할 가장 먼 집 결정
    const farthestIdx = Math.max(lastDeliveryIdx, lastPickupIdx);
    // 다음 반복을 위해 마지막 처리 인덱스 업데이트
    lastIdx = farthestIdx;

    // 이번 왕복 거리 추가
    totalDistance += (farthestIdx + 1) * 2;

    // 배달 처리
    let deliveryCap = cap;
    for (let i = farthestIdx; i >= 0; i--) {
      if (deliveries[i] > 0) {
        const deliverAmount = Math.min(deliveries[i], deliveryCap);
        deliveries[i] -= deliverAmount;
        deliveryCap -= deliverAmount;
        if (deliveryCap === 0) break;
      }
    }

    // 수거 처리
    let pickupCap = cap;
    for (let i = farthestIdx; i >= 0; i--) {
      if (pickups[i] > 0) {
        const pickupAmount = Math.min(pickups[i], pickupCap);
        pickups[i] -= pickupAmount;
        pickupCap -= pickupAmount;
        if (pickupCap === 0) break;
      }
    }
  }

  return totalDistance;
}
