n, m = map(int, input().split())
length = [int(input()) for _ in range(n)]

dp = [float('inf')] * (n + 1)
dp[n] = 0

for i in range(n-1, -1, -1):
    l = 0
    for j in range(i, n):
        l += length[j]

        if j > i:
            l += 1
        
        if l > m:
            break
        
        if j == n-1:
            cost = 0
        else:
            cost = (m - l) ** 2

        dp[i] = min(dp[i], cost + dp[j+1])

print(dp[0])