from collections import defaultdict

def solution(clothes):
    dic = defaultdict(int)
    for cloth in clothes:
        dic[cloth[1]] += 1
    
    answer = 1
    for v in dic.values():
        answer *= v + 1
    
    return answer - 1