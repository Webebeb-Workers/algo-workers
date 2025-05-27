import sys
input = sys.stdin.readline

n = int(input())
sequence = [0] + list(map(int, input().split()))

dp = [[0] * (n + 1) for _ in range(n + 1)]
for i in range(1, n+1):
    dp[i][i] = 1

for i in range(1, n):
    if sequence[i] == sequence[i+1]:
        dp[i][i+1] = 1

for l in range(3, n+1):
    for i in range(1, n - l + 2):
        j = i + l - 1
        if sequence[i] == sequence[j] and dp[i + 1][j - 1]:
            dp[i][j] = 1

cnt = int(input())
for _ in range(cnt):
    l, r = map(int, input().split())
    print(dp[l][r])