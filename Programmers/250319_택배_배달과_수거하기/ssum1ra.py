def solution(cap, n, deliveries, pickups):
    answer = 0
    d_cnt = 0
    p_cnt = 0
    
    for i in range(n-1, -1, -1):
        d_cnt += deliveries[i]
        p_cnt += pickups[i]
        
        while d_cnt > 0 or p_cnt > 0:
            d_cnt -= cap
            p_cnt -= cap
            answer += (i+1) * 2
    
    return answer