import sys
from collections import deque
input = sys.stdin.readline

n = int(input())

building = [[] for _ in range(n+1)]
cost = [0] * (n+1)
indegree = [0] * (n+1)

for i in range(1, n+1):
    temp = list(map(int, input().split()))
    cost[i] = temp[0]
    for j in temp[1:-1]:
        building[j].append(i)
        indegree[i] += 1

q = deque()
dp = [0] * (n+1)
for i in range(1, n+1):
    if indegree[i] == 0:
        q.append(i)
        dp[i] = cost[i]

while q:
    current = q.popleft()
    for next_building in building[current]:
        indegree[next_building] -= 1
        dp[next_building] = max(dp[next_building], dp[current] + cost[next_building])
        if not indegree[next_building]:
            q.append(next_building)

for i in range(1, n+1):
    print(dp[i])