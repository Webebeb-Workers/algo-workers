import sys
from collections import deque

input = sys.stdin.readline

def bfs(n, k):
    visited = [False] * 100_001
    prev = [-1] * 100_001
    dist = [0] * 100_001

    q = deque([n])
    visited[n] = True

    while q:
        cur = q.popleft()

        if cur == k:
            break
        
        for next in [cur+1, cur-1, cur * 2]:
            if 0 <= next < 100_001 and not visited[next]:
                visited[next] = True
                dist[next] = dist[cur] + 1
                prev[next] = cur
                q.append(next)
    
    path = []
    start = k
    while start != -1:
        path.append(start)
        start = prev[start]
    path.reverse()

    return dist[k], path


n, k = map(int, input().split())
time, path = bfs(n, k)

print(time)
print(*path)