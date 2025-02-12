import sys

n = int(input())
stones = list(map(int, input().split()))

dp = [1] * n

for i in range(n):
    for j in range(i + 1, n):
        if stones[i] < stones[j]:
            dp[j] = max(dp[j], dp[i] + 1)

print(max(dp))