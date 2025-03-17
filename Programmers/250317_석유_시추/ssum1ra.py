from collections import deque

def check(land):
    temp = [[0] * len(land[0]) for _ in range(len(land))]
    cnt = 1
    for i in range(len(land)):
        for j in range(len(land[i])):
            if land[i][j] == 1 and temp[i][j] == 0:
                q = deque()
                q.append((i, j))
                visited = set()
                visited.add((i, j))
                temp[i][j] = cnt
    
                while q:
                    cx, cy = q.popleft()
                    for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                        nx = cx + dx
                        ny = cy + dy
                        if 0 <= nx < len(land) and 0 <= ny < len(land[0]) and land[nx][ny] == 1 and (nx, ny) not in visited:
                            q.append((nx, ny))
                            visited.add((nx, ny))
                            temp[nx][ny] = cnt
            cnt += 1
    
    return temp

def solution(land):
    answer = 0
    
    temp = check(land)
    
    dict = {}
    for i in range(len(temp)):
        for j in range(len(temp[0])):
            if temp[i][j] != 0:
                if temp[i][j] not in dict:
                    dict[temp[i][j]] = 1
                else:
                    dict[temp[i][j]] += 1
                
    
    for i in range(len(temp[0])):
        visited = set()
        for j in range(len(temp)):
            if temp[j][i] != 0 and temp[j][i] not in visited:
                visited.add(temp[j][i])
                
        res = 0
        for v in visited:
            res += dict[v]
            
        if res > answer:
            answer = res
        
    return answer