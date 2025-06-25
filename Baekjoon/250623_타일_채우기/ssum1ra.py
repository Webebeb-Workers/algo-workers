import sys
input = sys.stdin.readline

n = int(input())

if n % 2 == 1:
    print(0)
else:
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[2] = 3

    for i in range(4, n + 1, 2):
        dp[i] = 3 * dp[i - 2]
        for j in range(0, i - 2, 2):
            dp[i] += 2 * dp[j]
    
    print(dp[n])