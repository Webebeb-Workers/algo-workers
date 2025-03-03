def solution(n, tops):
    answer = 0
    
    a = [0] * n
    b = [0] * n
    
    a[0] = 1
    b[0] = 3 if tops[0] else 2
    
    for i in range(1, n):
        if tops[i]:
            a[i] = a[i-1] + b[i-1]
            b[i] = a[i-1] * 2 + b[i-1] * 3
        else:
            a[i] = a[i-1] + b[i-1] 
            b[i] = a[i-1] + b[i-1] * 2
        a[i] %= 10_007
        b[i] %= 10_007
    
    answer = (a[n-1] + b[n-1]) % 10_007
    
    return answer