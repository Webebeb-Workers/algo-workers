import sys
import heapq

input = sys.stdin.readline

n, m = map(int, input().split())

graph = [[] for _ in range(n + 1)]
indegree = [0 for _ in range(n + 1)]
for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    indegree[b] += 1

hq = []
for i in range(1, n + 1):
    if indegree[i] == 0:
        heapq.heappush(hq, i)

answer = []
while hq:
    temp = heapq.heappop(hq)
    answer.append(temp)

    for i in graph[temp]:
        indegree[i] -= 1
        if indegree[i] == 0:
            heapq.heappush(hq, i)

print(' '.join(map(str, answer)))

