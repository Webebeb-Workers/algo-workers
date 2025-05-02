def solution(stones, k):
    l = min(stones)
    r = max(stones)
    while l <= r:
        m = (l+r) // 2 # 친구들의 수
        
        cnt = 0 # 건너뛴 디딤돌의 개수
        for s in stones:
            if s <= m:
                cnt += 1
                if cnt >= k:
                    break
            else:
                cnt = 0
        
        if cnt >= k:
            r = m - 1
            answer = m
        else:
            l = m + 1
            
    return answer