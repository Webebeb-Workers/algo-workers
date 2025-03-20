def solution(n, info):
    max_diff = 0
    best_shot = [-1]
    
    def calculate_score(ryan_shot):
        ryan_score = 0
        apeach_score = 0
        
        for i in range(11):
            if ryan_shot[i] > info[i]:
                ryan_score += 10 - i
            elif info[i] > 0:
                apeach_score += 10 - i
        
        return ryan_score - apeach_score
    
    def dfs(idx, remain_arrows, ryan_shot):
        nonlocal max_diff, best_shot
        
        if idx == 11:
            if remain_arrows > 0:
                ryan_shot[10] += remain_arrows
            
            diff = calculate_score(ryan_shot)
            
            if diff > max_diff:
                max_diff = diff
                best_shot = ryan_shot[:]
            elif diff == max_diff:
                if ryan_shot[::-1] > best_shot[::-1]:
                    best_shot = ryan_shot[:]
            return
        
        dfs(idx + 1, remain_arrows, ryan_shot[:])
        
        if remain_arrows > info[idx]:
            ryan_shot[idx] = info[idx] + 1
            dfs(idx + 1, remain_arrows - ryan_shot[idx], ryan_shot[:])
            ryan_shot[idx] = 0
    
    dfs(0, n, [0] * 11)
    
    return best_shot if max_diff > 0 else [-1]