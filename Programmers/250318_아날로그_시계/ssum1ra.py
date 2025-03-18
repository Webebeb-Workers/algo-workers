def solution(h1, m1, s1, h2, m2, s2):
    answer = 0
    
    seconds1 = h1 * 60 * 60 + m1 * 60 + s1
    seconds2 = h2 * 60 * 60 + m2 * 60 + s2
    
    h_cnt = 0
    m_cnt = 0
    
    if seconds1 == 0 or seconds1 == (12 * 60 * 60):
        answer += 1
    
    for i in range(seconds1, seconds2):
        h = i * (1/120) % 360 
        m = i * (1/10) % 360 
        s = i * 6 % 360
        
        nh = (i+1) * (1/120) % 360 if (i+1) * (1/120) % 360 != 0 else 360
        nm = (i+1) * (1/10) % 360 if (i+1) * (1/10) % 360 != 0 else 360
        ns = (i+1) * 6 % 360 if (i+1) * 6 % 360 != 0 else 360
        
        if h > s and nh <= ns:
            h_cnt += 1
        if m > s and nm <= ns:
            m_cnt += 1
        if nh == nm == ns:
            answer -= 1
        
    answer += h_cnt + m_cnt
        
    return answer