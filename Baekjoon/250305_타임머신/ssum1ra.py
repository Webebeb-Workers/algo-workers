from collections import deque
import sys
input = sys.stdin.readline

def bf(start):
    dist[start] = 0
    for i in range(n):
        for j in range(m):
            start = edges[j][0]
            end = edges[j][1]
            time = edges[j][2]
            if dist[start] != float('inf') and dist[start] + time < dist[end]:
                dist[end] = dist[start] + time
                if i == n - 1:
                    return True 

    return False

n, m = map(int, input().split())
edges = []
dist = [float('inf')] * (n + 1)

for _ in range(m):
    start, end, time = map(int, input().split())
    edges.append((start, end, time))

negative_cycle = bf(1)

if negative_cycle:
    print(-1)
else:
    for i in range(2, n+1):
        if dist[i] == float('inf'):
            print(-1)
        else:
            print(dist[i])