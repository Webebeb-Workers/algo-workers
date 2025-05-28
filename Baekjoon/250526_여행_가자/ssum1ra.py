import sys
input = sys.stdin.readline

n = int(input())
m = int(input())
graph = [list(map(int, input().split())) for _ in range(n)]
plan = list(map(int, input().split()))

for i in range(n):
    graph[i][i] = 1

for k in range(n):
    for i in range(n):
        for j in range(n):
            if graph[i][k] and graph[k][j]:
                graph[i][j] = 1

is_possible = True
for i in range(m-1):
    a = plan[i] - 1
    b = plan[i + 1] - 1
    if not graph[a][b]:
        is_possible = False
        break

print("YES" if is_possible else "NO")
