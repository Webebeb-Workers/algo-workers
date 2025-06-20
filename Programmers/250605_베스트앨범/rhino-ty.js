// 1. 정보 수집: 먼저 장르별 전체 재생 수 계산 및 앨범 추가 (해시 - 객체)
// 2. 계산한 장르 내 속한 앨범 정렬
// 3. 전체 재생 수 별로 정렬하기 위해 배열로 만든 후 plays 내림차순 정렬
// 4. 각 장르 순회하며 2개씩 결과 배열에 push

function solution(genres, plays) {
  const N = genres.length;
  const genreMap = {};

  // 장르별 정보 수집
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const play = plays[i];

    if (!genreMap[genre]) {
      genreMap[genre] = { total: 0, songs: [] };
    }

    genreMap[genre].total += play;
    genreMap[genre].songs.push([i, play]); // [고유번호, 재생수]
  }

  // 장르를 전체 재생 수로 정렬하기 위해 배열로 변환
  const result = Object.entries(genreMap)
    .sort((a, b) => b[1].total - a[1].total) // 장르 총 재생수 내림차순
    .flatMap(([genre, info]) => {
      return info.songs
        .sort((a, b) => b[1] - a[1] || a[0] - b[0])
        .slice(0, 2)
        .map((song) => song[0]); // 고유번호만 추출
    });

  return result;
}
