def combinations(n):
    res = []
    def dfs(start, arr):
        if len(arr) == 5:
            res.append(arr)
            return
        for i in range(start+1, n+1):
            dfs(i, arr[:] + [i])
    dfs(0, [])
    return res

def solution(n, q, ans):
    answer = 0
    
    cand = combinations(n)
    
    for c in cand:
        match_cnt = 0
        for i in range(len(q)):
            overlap_cnt = len(c + q[i]) - len(set(c + q[i]))
            if overlap_cnt == ans[i]:
                match_cnt += 1
            else:
                break
        if match_cnt == len(ans):
            answer += 1
    
    return answer