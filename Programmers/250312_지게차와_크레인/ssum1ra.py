from collections import deque

def check(arr, i, j):
    visited = set()
    visited.add((i, j))
    q = deque()
    q.append((i, j))
    
    while q:
        sx, sy = q.popleft()
        for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            cx = sx + dx
            cy = sy + dy
            if 0 <= cx < len(arr) and 0 <= cy < len(arr[0]) and arr[cx][cy] == '' and (cx, cy) not in visited:
                q.append((cx, cy))
                visited.add((cx, cy))
    
    for a, b in visited:
        if a == 0 or b == 0 or a == len(arr) - 1 or b == len(arr[0]) - 1:
            return True
        
    return False

def solution(storage, requests):
    answer = 0
    
    arr = [list(storage[i]) for i in range(len(storage))]
    
    for request in requests:
        cand = set()
        for i in range(len(arr)):
            for j in range(len(arr[i])):
                if len(request) == 2 and request[0] == arr[i][j]:
                    cand.add((i, j))
                elif len(request) == 1 and request == arr[i][j]:
                    if i == 0 or j == 0 or i == len(arr) - 1 or j == len(arr[i]) - 1:
                        cand.add((i, j))
                    else:
                        if (arr[i+1][j] == '' and check(arr, i+1, j)) or \
                            (arr[i][j+1] == '' and check(arr, i, j+1)) or \
                            (arr[i-1][j] == '' and check(arr, i-1, j)) or \
                            (arr[i][j-1] == '' and check(arr, i, j-1)):
                                cand.add((i, j))
        for a, b in cand:
            arr[a][b] = ''
    
    for i in range(len(arr)):
        for j in range(len(arr[i])):
            if arr[i][j] != '':
                answer += 1
    
    return answer