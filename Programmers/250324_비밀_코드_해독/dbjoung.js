// 1부터 n까지의 서로 다른 정수 5개 오름차순으로 정렬된 비밀 코드를 맞춰야 함.
// 암호 분석 도구로 m번 시도. 각 시도마다 서로 다른 5개 정수 입력하면, 몇 개가 비밀 코드에 포함되어 있는 지 알려줌

function find(list, q, ans) {
  let hintIndex = 0;
  for (const hint of q) {
    let count = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (list[i] == hint[j]) count++;
      }
    }
    if (ans[hintIndex] != count) {
      return 0;
    }
    hintIndex++;
  }

  return 1;
}

function dfs(start, n, list, q, ans) {
  if (list.length == 5) {
    return find(list, q, ans);
  }

  let sum = 0;
  for (let s = start; s <= n; s++) {
    sum += dfs(s + 1, n, [...list, s], q, ans);
  }

  return sum;
}

function solution(n, q, ans) {
  return dfs(1, n, [], q, ans);
}
