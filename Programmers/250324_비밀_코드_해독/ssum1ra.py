def combinations(n):
    res = []
    def dfs(idx, arr, n):
        if len(arr) == 5:
            res.append(arr)
            return
        for i in range(idx+1, n+1):
            dfs(i, arr[:] + [i], n)
    dfs(0, [], n)
    return res

def solution(n, q, ans):
    answer = 0
    
    cand = combinations(n)
    
    for c in cand:
        cnt = 0
        for i in range(len(q)):
            a = len(c + q[i]) - len(set(c + q[i]))
            if a == ans[i]:
                cnt += 1
            else:
                break
        if cnt == len(ans):
            answer += 1
    
    return answer