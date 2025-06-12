from collections import defaultdict

def solution(genres, plays):
    dic1 = defaultdict(int)
    dic2 = defaultdict(list)
    
    for i, (g, p) in enumerate(zip(genres, plays)):
        dic1[g] += p
        dic2[g].append((p, i))
        
    sorted_genres = sorted(dic1.keys(), key = lambda x: dic1[x], reverse=True)
    
    answer = []
    for genre in sorted_genres:
        sorted_songs = sorted(dic2[genre], key = lambda x: (-x[0], x[1]))
        for song in sorted_songs[:2]:
            answer.append(song[1])
    
    return answer