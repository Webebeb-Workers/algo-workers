function solution(clothes) {
  /*
   * 1. 형태가 map 모양이므로 걍 map에 넣어줘 활용
   * 2. map에 values을 해와 map iterator를 도출하고 from으로 배열 만들기
   * 3. 새 map에 종류 별로 몇개 있는지 넣기
   * 4. 방정식 사용, 곱해서 결과 도출
   *   4-1. 그냥 개수가 아닌 (개수+1)을 곱해주는 이유는 각 요소마다 안입는 경우의 수도 존재하기에
   *   4-2. 하나도 안입는 건 안치기에 -1 꼭 해주기
   */

  // 1
  const clothesMap = new Map(clothes);
  // 2
  const kindArr = Array.from(clothesMap.values());
  // 3
  const kindMap = new Map();
  for (let i = 0; i < kindArr.length; i++) {
    kindMap.set(kindArr[i], (kindMap.get(kindArr[i]) || 0) + 1);
  }
  // 4
  let result = 1;
  for (count of kindMap.values()) {
    result *= count + 1;
  }
  // 4-1
  return result - 1;

  /*
   * 해시로 객체 활용도 가능
   * const obj = {};
   * for(let i = 0; i < clothes.length; i++) {
   *   const arr = clothes[i];
   *   obj[arr[1]] = (obj[arr[1]] || 0) + 1;
   * }
   * for(let key in obj) {
   *   result *= (obj[key]+1);
   * }
   * return result - 1;
   */
}
