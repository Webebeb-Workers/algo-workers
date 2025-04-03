from bisect import bisect_left

def solution(n, k, cmd):
    arr = list(range(n))
    stack = []
    p = k
    
    for c in cmd:
        temp = c.split()
        if temp[0] == 'U':
            p -= int(temp[1])
        elif temp[0] == 'D':
            p += int(temp[1])
        elif temp[0] == 'C':
            stack.append(arr[p])
            arr = arr[:p] + arr[p+1:]
            if p == len(arr):
                p -= 1
        elif temp[0] == 'Z':
            num = stack.pop()
            idx = bisect_left(arr, num)
            if p >= idx:
                p += 1
            arr = arr[:idx] + [num] + arr[idx:]
    
    answer = []
    for i in range(n):
        if i in arr:
            answer.append('O')
        else:
            answer.append('X')
    
    return ''.join(answer)