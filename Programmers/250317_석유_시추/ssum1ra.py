from collections import deque

def check(land, x, y):
    q = deque()
    q.append((x, y))
    visited = set()
    visited.add((x, y))
    
    while q:
        cx, cy = q.popleft()
        for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            nx = cx + dx
            ny = cy + dy
            if 0 <= nx < len(land) and 0 <= ny < len(land[0]) and land[nx][ny] == 1 and (nx, ny) not in visited:
                q.append((nx, ny))
                visited.add((nx, ny))
    
    return visited

def solution(land):
    answer = 0
    
    for i in range(len(land[0])):
        visited = set()
        temp = 0
        for j in range(len(land)):
            if (j, i) not in visited and land[j][i] == 1:
                positions = check(land, j, i)
                visited.update(positions)
                temp += len(positions)
        if answer < temp:
            answer = temp
                            
    return answer