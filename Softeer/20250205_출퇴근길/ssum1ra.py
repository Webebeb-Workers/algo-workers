import sys
sys.setrecursionlimit(10**6)

n, m = map(int, input().split())
adj = [[] for _ in range(n+1)]
adjR = [[] for _ in range(n+1)]
for _ in range(m):
    i, j = map(int, input().split())
    adj[i].append(j)
    adjR[j].append(i)
s, t = map(int, input().split())

def dfs(now, adj, visit):
    if visit[now]:
        return
    else:
        visit[now] = 1
        for next in adj[now]:
            dfs(next, adj, visit)
    return

fromS = [0] * (n+1)
fromS[t] = 1
dfs(s, adj, fromS)

toT = [0] * (n+1)
dfs(t, adjR, toT)

fromT = [0] * (n+1)
fromT[s] = 1
dfs(t, adj, fromT)

toS = [0] * (n+1)
dfs(s, adjR, toS)

count = 0
for i in range(1, n+1):
    if fromS[i] and fromT[i] and toS[i] and toT[i]:
        count += 1

print(count - 2)