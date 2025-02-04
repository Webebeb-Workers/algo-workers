import sys
from collections import deque

def bfs(sx, sy):
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]

    q = deque([(sx, sy, 0)])
    visited = set([(sx, sy)])
    
    while(q):
        x, y, dist = q.popleft()

        if((x, y) == end):
            return dist
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] != '#':
                if (nx, ny) not in visited:
                    visited.add((nx, ny))
                    q.append((nx, ny, dist + 1))
    return float('inf')

n, m = map(int, input().split())
grid = [list(input()) for _ in range(n)]

ghosts = []

for i in range(n):
    for j in range(m):
        if grid[i][j] == 'N':
            start = (i, j)
        elif grid[i][j] == 'D':
            end = (i, j)
        elif grid[i][j] == 'G':
            ghosts.append((i,j))

man_dist = bfs(start[0], start[1])

ans = 'Yes'
if man_dist == float('inf'):
    ans = 'No'
else:
    for (gx, gy) in ghosts:
        ghost_dist = abs(end[0] - gx) + abs(end[1] - gy)
        if man_dist >= ghost_dist:
            ans = 'No'
            break
    
print(ans)