function solution(array, commands) {
  // 1. commands의 각 요소인 배열을 slice로 짜르고 정렬(함정: 인덱스로 치환해야함)
  // 2. commands[2]의 숫자로 인덱스를 통해 구하고(함정: 3번짼데 인덱스 상으론 2번째임)새 배열에 담기
  // Destructuring도 가능 const [from, to, position] = commands

  // const result = [];
  // // 1
  // commands.forEach((el) => {
  //   const newArr = array.slice(el[0] - 1, el[1]);
  //   const sortArr = newArr.sort((a, b) => a - b);
  //   // 2
  //   const commandNum = sortArr[el[2] - 1];
  //   result.push(commandNum);
  // });
  // return result;
  // Destructuring 적용, map 적용
  return commands.map(([from, to, position]) => {
    return array.slice(from - 1, to).sort((a, b) => a - b)[position - 1];
  });
}
