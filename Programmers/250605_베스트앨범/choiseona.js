function solution(genres, plays) {
  const answer = [];
  const genreTotalPlayCount = {};
  const genreChoiceCount = {};

  // 장르별 play 수 구하기
  genres.forEach((genre, index) => (genreTotalPlayCount[genre] = (genreTotalPlayCount[genre] || 0) + plays[index]));

  // 노래들 하나의 객체로 나타내기
  const songArray = genres.map((e, i) => ({ genre: e, play: plays[i], index: i, genreTotal: genreTotalPlayCount[e] }));

  // 장르별 play 수로 정렬 => 개별 play 수로 정렬
  const sortedSongArray = songArray.sort((a, b) => b.genreTotal - a.genreTotal || b.play - a.play);

  // 장르별로 2개 선택
  sortedSongArray.forEach((e) => {
    const { genre, index } = e;
    if (genreChoiceCount[genre] > 2) return;
    answer.push(index);
    genreChoiceCount[genre] = (genreChoiceCount[genre] || 1) + 1;
  });

  return answer;
}
