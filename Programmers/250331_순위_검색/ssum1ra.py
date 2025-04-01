from itertools import combinations
from collections import defaultdict
from bisect import bisect_left

def solution(info, query):
    answer = []
    
    dic = defaultdict(list)
    for i in info:
        arr = i.split()
        cond = arr[:-1]
        score = int(arr[-1])
        for n in range(5):
            case = list(combinations([0,1,2,3], n))
            for c in case:
                tmp = cond[:]
                for idx in c:
                    tmp[idx] = '-'
                key = ''.join(tmp)
                dic[key].append(score)
    
    for value in dic.values():
        value.sort()
    
    for q in query:
        string = q.replace('and ', '')
        arr = string.split()
        key = ''.join(arr[:-1])
        score = int(arr[-1])
        cnt = 0 
        
        if key in dic:
            scores = dic[key]
            idx = bisect_left(scores, score)
            cnt = len(scores) - idx
        
        answer.append(cnt)
    
    return answer