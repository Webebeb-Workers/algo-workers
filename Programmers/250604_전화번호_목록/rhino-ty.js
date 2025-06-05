// // 해시 Set 사용
// function solution(phone_book) {
//     const phoneSet = new Set(phone_book);

//     for (const phone of phone_book) {
//         // 각 번호의 모든 접두어를 확인
//         for (let i = 1; i < phone.length; i++) {
//             const pre = phone.substring(0, i);
//             if (phoneSet.has(pre)) {
//                 return false;
//             }
//         }
//     }

//     return true;
// }

// 정렬 사용
function solution(phone_book) {
  // 정렬하면 접두어 관계에 있는 번호들이 인접하게 배치됨
  phone_book.sort();

  // 인접한 번호들만 확인!
  for (let i = 0; i < phone_book.length - 1; i++) {
    // 다음 번호가 현재 번호로 시작하는지 확인
    if (phone_book[i + 1].startsWith(phone_book[i])) {
      return false;
    }
  }

  return true;
}
