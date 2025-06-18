from itertools import combinations
from collections import deque
import sys

input = sys.stdin.readline

def bfs(active_viruses):
    visited = [[-1]*N for _ in range(N)]
    q = deque()
    for x, y in active_viruses:
        q.append((x, y))
        visited[x][y] = 0
    
    infected = 0
    max_time = 0

    while q:
        x, y = q.popleft()
        for d in range(4):
            nx, ny = x+dx[d], y+dy[d]
            if 0 <= nx < N and 0 <= ny < N:
                if visited[nx][ny] == -1 and lab[nx][ny] != 1:
                    visited[nx][ny] = visited[x][y] + 1
                    q.append((nx, ny))
                    if lab[nx][ny] == 0:
                        infected += 1
                        max_time = visited[nx][ny]
    
    return max_time if infected == empty else float('inf')

N, M = map(int, input().split())
lab = [list(map(int, input().split())) for _ in range(N)]

viruses = [(i, j) for i in range(N) for j in range(N) if lab[i][j] == 2]

empty = sum(row.count(0) for row in lab)

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

min_time = float('inf')
for comb in combinations(viruses, M):
    time = bfs(comb)
    min_time = min(min_time, time)

print(min_time if min_time != float('inf') else -1)