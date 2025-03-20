// 일렬로 나열된 n개의 집에 택배 배달.
// 모두 크기가 같은 재활용 택배 상자에 담아 배달. 동시에 빈 재활용 택배 상자는 수거.
// 트럭에 재활용 상자 최대 cap개 실을 수 있음
// dp는 메모리 초과 발생할 것 같음

// 무조건 먼 집까지 방문했다가 돌아오며 수거하는게 이득.
// 1. n번째 집부터 역순회하며 첫번째 실을 박스 개수를 구한다.
// 2. n번째 집부터 역순회 하며 비워야 할 박스 개수를 구한다.
// // 1-2 반복

function solution(cap, n, deliveries, pickups) {
  let result = 0;

  deliveries = [0, ...deliveries];
  pickups = [0, ...pickups];

  let del = 0;
  let pick = 0;
  for (let i = 1; i <= n; i++) {
    del += deliveries[i];
    pick += pickups[i];
  }

  while (true) {
    // 가장 먼저 작업할 집을 구한다. (역순부터 검사하며 배송/픽업이 둘 중 하나라도 0 이상인 집)
    let farHouse = 0;
    for (let i = n; i >= 0; i--) {
      if (deliveries[i] > 0 || pickups[i] > 0) {
        farHouse = i;
        break;
      }
    }

    // 작업할 집부터 역순으로 돌며 cap만큼 배송해준다. (n만큼 오며 배송하는 과정)
    let subCap = cap;
    if (del > 0) {
      for (let i = farHouse; i >= 0; i--) {
        if (deliveries[i] - subCap >= 0) {
          deliveries[i] -= subCap;
          del -= subCap;
          subCap = 0;
        } else {
          subCap -= deliveries[i];
          del -= deliveries[i];
          deliveries[i] = 0;
        }

        if (subCap == 0) break;
      }
    }

    // 작업할 집부터 역순으로 돌며 cap만큼 pickup (다시 돌아가며 픽업하는 과정)
    if (pick > 0) {
      subCap = cap;
      for (let i = farHouse; i >= 0; i--) {
        if (pickups[i] - subCap >= 0) {
          pickups[i] -= subCap;
          pick -= subCap;
          subCap = 0;
        } else {
          subCap -= pickups[i];
          pick -= pickups[i];
          pickups[i] = 0;
        }

        if (subCap == 0) break;
      }
    }

    // result+= 작업할 집 index*2;
    result += farHouse * 2;
    n = farHouse;

    if (del == 0 && pick == 0) break;
  }

  return result;
}
