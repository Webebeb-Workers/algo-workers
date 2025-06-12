from collections import deque

def label_islands():
    label = 2
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                bfs(i, j, label)
                label += 1

def bfs(i, j, label):
    q = deque()
    q.append((i, j))
    grid[i][j] = label
    while q:
        x, y = q.popleft()
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0<=nx<n and 0<=ny<n and grid[nx][ny] == 1:
                grid[nx][ny] = label
                q.append((nx, ny))

def shortest_bridge():
    visited = [[-1]*n for _ in range(n)]
    q = deque()

    for i in range(n):
        for j in range(n):
            if grid[i][j] > 1:
                visited[i][j] = 0
                q.append((i, j))

    res = float('inf')
    while q:
        x, y = q.popleft()
        for dx, dy in directions:
            nx, ny = x+dx, y+dy
            if 0<=nx<n and 0<=ny<n:
                if grid[nx][ny] == 0 and visited[nx][ny] == -1:
                    visited[nx][ny] = visited[x][y] + 1
                    grid[nx][ny] = grid[x][y]
                    q.append((nx, ny))
                elif grid[nx][ny] != grid[x][y]:
                    res = min(res, visited[x][y] + visited[nx][ny])
    return res

n = int(input())
grid = [list(map(int, input().split())) for _ in range(n)]

directions = [(-1,0), (1,0), (0,-1), (0,1)]

label_islands()
print(shortest_bridge())