def solution(diffs, times, limit):
    l = 1
    r = max(diffs)
    
    answer = r
    while l < r:
        m = (l + r)//2
        
        time = 0
        for i in range(len(diffs)):
            if m >= diffs[i]:
                time += times[i]
            else:
                time += ((times[i-1] + times[i]) * (diffs[i] - m) + times[i])
        
        if time <= limit:
            r = m
            answer = m
        else:
            l = m + 1
    
    return answer