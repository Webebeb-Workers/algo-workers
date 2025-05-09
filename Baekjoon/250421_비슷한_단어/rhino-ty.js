// 앞부분이 가장 많이 일치하는 두 단어를 찾는 것, 이중 반목문으로 그냥 구현하면 될 듯?
// 1. 입력값 N과 N개의 영단어들을 배열로 저장
// 2. 가장 긴 공통 접두사 길이와 해당하는 단어 쌍을 추적할 변수 선언 및 초기화
// 3. 이중 반복문으로 모든 단어 쌍을 비교
//   - 각 쌍마다 공통 접두사 길이 계산
//   - 현재까지의 최대 길이보다 크면 최대값과 해당 단어 쌍 갱신
// 4. 결과 출력

function findMostSimilarWords(N, words) {
  let maxPreLength = -1;
  let firstWordIdx = -1;
  let secondWordIdx = -1;

  // for (let i = 0; i < N; i++) {
  //   for (let j = 0; j < N; j++) {
  //     if (i === j) continue; // 같은 단어는 비교하지 않음
  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      const preLength = getCommonPreLength(words[i], words[j]);

      if (preLength > maxPreLength) {
        maxPreLength = preLength;
        firstWordIdx = i;
        secondWordIdx = j;
      }
      // 접두사 길이가 같은 경우, 입력 순서를 고려
      else if (preLength === maxPreLength) {
        // 현재 단어 쌍의 첫 번째 단어가 이전 결과의 첫 번째 단어보다 입력 순서상 앞에 있는 경우
        if (i < firstWordIdx) {
          firstWordIdx = i;
          secondWordIdx = j;
        }
        // 첫 번째 단어가 같고, 두 번째 단어가 이전 결과의 두 번째 단어보다 입력 순서상 앞에 있는 경우
        else if (i === firstWordIdx && j < secondWordIdx) {
          secondWordIdx = j;
        }
      }
    }
  }

  return `${words[firstWordIdx]}\n${words[secondWordIdx]}`;
}

// 두 단어의 공통 접두사 길이 계산 함수
function getCommonPreLength(word1, word2) {
  let length = 0;
  const minLength = Math.min(word1.length, word2.length);

  for (let i = 0; i < minLength; i++) {
    if (word1[i] === word2[i]) {
      length++;
    } else {
      break;
    }
  }

  return length;
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
const N = parseInt(input[0]);
const words = input.slice(1);

console.log(findMostSimilarWords(N, words));
