from itertools import combinations, product
from bisect import bisect_left    

def solution(dice):
    answer = []
    max_win = 0
    
    n = len(dice)
    for a_dices in combinations(range(n), n // 2):
        b_dices = set(range(n)) - set(a_dices)
        
        a_score = []
        b_score = []
        for dice_cand in product(range(6), repeat = n // 2):
            a_score.append(sum(dice[i][j] for i, j in zip(a_dices, dice_cand)))
            b_score.append(sum(dice[i][j] for i, j in zip(b_dices, dice_cand)))
        
        b_score.sort()
        win = sum(bisect_left(b_score, a) for a in a_score)
        
        if max_win < win:
            answer = [x + 1 for x in a_dices]
            max_win = win
    
    return answer