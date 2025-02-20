def solution(friends, gifts):
    answer = 0
    
    table = [[0] * len(friends) for _ in range(len(friends))]
    gift_score = [0] * len(friends)
    for gift in gifts:
        giver, reciever = gift.split()
        gi, ri = friends.index(giver), friends.index(reciever)
        table[gi][ri] += 1
        gift_score[gi] += 1
        gift_score[ri] -= 1
        
    res = [0] * len(friends)
    for i in range(len(friends)):
        for j in range(i + 1, len(friends)):
            if table[i][j] > table[j][i]:
                    res[i] += 1
            elif table[i][j] < table[j][i]:
                    res[j] += 1
            elif gift_score[i] > gift_score[j]:
                    res[i] += 1
            elif gift_score[i] < gift_score[j]:
                    res[j] += 1 
    
    return max(res)

import sys
input = sys.stdin.readline

friends = input()
gifts = input()