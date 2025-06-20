import sys
input = sys.stdin.readline

N = int(input())
arr = list(map(int, input().split()))

start = 0
total = 0

visited = [False] * 100001
for end in range(N):
    while visited[arr[end]]:
        visited[arr[start]] = False
        start += 1
    visited[arr[end]] = True
    total += (end - start + 1)

print(total)