// 컨테이너 n x m
// requests 1개: 외부와 접촉된 컨테이너
// requests 2개: 모든 컨테이너
// 남은 컨테이너 개수 반환
// 각 requests 마다 최적의 해결을 해야하니 그리디로 충분히 풀 수 있을 듯

// 0. storage를 탐색해 개수 변수 선언초기화
// 1. storage를 2차원 배열로 가공 => 뽑힌 컨테이너는 null로 명시하기 위함
// 2. requests 순회하며 컨테이너 뽑기
//   - requests 2개일 때, 1번 변수를 순회하며 해당하는 컨테이너 null로 할당 + 뽑을 때 마다 1번 변수 -1 계산
//   - requests 1개일 때, 외부 컨테이너인지 조건 확인 후 컨테이너 null로 할당
//     - storage를 순회하며 각 요소에 외부인지 아닌지 사분면 판단 + 요구 문자가 같다면 순회 중 행렬 요소 위치 추가([n, m])
//     - 순회가 끝나면 위치 추가한 걸 가지고 컨테이너 null로 할당 + 위치 배열 길이만큼 1번 변수 마이너스
// 3. requests 순회가 끝나면 컨테이너 개수 변수 리턴

// 이러면 requests 길이 * 이중 반복문이 최대이니 O(requests.length * n * m)으로 할 수 있음

function solution(storage, requests) {
  let containerCount = 0;
  const containerMatrix = storage.map((containers) => {
    // 개수 추가
    containerCount += containers.length;

    // storage를 2차원 배열로 가공
    return containers.split('');
  });

  for (let i = 0; i < requests.length; i++) {
    const curRequest = requests[i];

    // requests 2개일 때
    if (curRequest.length === 2) {
      const requestContainer = curRequest[0];
      for (let n = 0; n < containerMatrix.length; n++) {
        for (let m = 0; m < containerMatrix[n].length; m++) {
          if (containerMatrix[n][m] === requestContainer) {
            containerMatrix[n][m] = null;
            containerCount--;
          }
        }
      }
    }

    // requests 1개일 때
    if (curRequest.length === 1) {
      const positionExcludeArr = [];
      for (let n = 0; n < containerMatrix.length; n++) {
        for (let m = 0; m < containerMatrix[n].length; m++) {
          if (containerMatrix[n][m] === curRequest && isExternalContainer(containerMatrix, n, m)) {
            positionExcludeArr.push([n, m]);
          }
        }
      }
      // 순회가 끝난 후 제외할 컨테이너 위치 배열로 containerMatrix 수정 및 개수 차감
      positionExcludeArr.forEach((pos) => {
        const [n, m] = pos;
        containerMatrix[n][m] = null;
      });
      containerCount -= positionExcludeArr.length;
    }
  }

  return containerCount;
}

function isExternalContainer(containerMatrix, n, m) {
  // 가장자리에 있는 컨테이너는 외부와 연결됨
  if (n === 0 || n === containerMatrix.length - 1 || m === 0 || m === containerMatrix[n].length - 1) {
    return true;
  }

  // 단순히 사분면이 null임만을 체크하는 건 되지 않음 => 1번째 예시 3번째 request 할 때 알 수 있음
  // if (!containerMatrix[n-1][m] ||
  // !containerMatrix[n+1][m] ||
  // !containerMatrix[n][m-1] ||
  // !containerMatrix[n][m+1]) {
  //     return true;
  // }

  // BFS로 인접한 null 지점에서 외부로 나갈 수 있는지 확인
  const queue = [];
  const visited = new Set();

  // 컨테이너 상하좌우 방향
  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  for ([dx, dy] of directions) {
    const nx = n + dx;
    const ny = m + dy;
    const key = `${nx},${ny}`;

    // 범위 체크 및 빈 공간 체크 후 탐색할 지점 queue에 넣기
    if (
      nx >= 0 &&
      nx < containerMatrix.length &&
      ny >= 0 &&
      ny < containerMatrix[n].length &&
      containerMatrix[nx][ny] === null
    ) {
      queue.push([nx, ny]);
      visited.add(key);
    }
  }

  // BFS 시작
  while (queue.length > 0) {
    const [cx, cy] = queue.shift();

    // 가장자리에 닿았다면 이 컨테이너는 외부와 연결됨, return true
    if (cx === 0 || cx === containerMatrix.length - 1 || cy === 0 || cy === containerMatrix[n].length - 1) {
      return true;
    }

    for ([dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;
      const key = `${nx},${ny}`;

      // 범위 체크 및 빈 공간 체크 후 탐색할 지점 queue에 넣기
      if (
        nx >= 0 &&
        nx < containerMatrix.length &&
        ny >= 0 &&
        ny < containerMatrix[n].length &&
        containerMatrix[nx][ny] === null &&
        !visited.has(key)
      ) {
        queue.push([nx, ny]);
        visited.add(key);
      }
    }
  }

  return false;
}
