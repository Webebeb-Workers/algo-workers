function solution(progresses, speeds) {
  const answer = [0];
  const remainDays = progresses.map((e, i) => Math.ceil((100 - progresses[i]) / speeds[i]));

  let maxRemainDay = remainDays[0];

  for (let i = 0, j = 0; i < remainDays.length; i++) {
    if (remainDays[i] > maxRemainDay) {
      maxRemainDay = remainDays[i];
      answer[++j] = 0;
    }
    if (remainDays[i] <= maxRemainDay) {
      answer[j]++;
    }
  }
  return answer;
}
