import sys
from collections import deque

def bfs(sx, sy):
    global n, m, grid, dist
    
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]

    q = deque([(sx, sy)])
    dist[sx][sy] = 0
    
    while(q):
        x, y = q.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] != '#':
                if dist[nx][ny] == float('inf'):
                    dist[nx][ny] = dist[x][y] + 1
                    q.append((nx, ny))

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

dist = [[float('inf')] * m for _ in range(n)]
bfs(start[0], start[1])

ans = 'Yes'
if dist[end[0]][end[1]] == float('inf'):
    ans = 'No'
else:
    for (gx, gy) in ghosts:
        ghost_dist = abs(end[0] - gx) + abs(end[1] - gy)
        if dist[end[0]][end[1]] >= ghost_dist:
            ans = 'No'
            break
    
print(ans)