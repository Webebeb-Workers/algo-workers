import sys
input = sys.stdin.readline

T = int(input())
for _ in range(T):
    K = int(input())
    C = list(map(int, input().split()))

    prefix_sum = [0] * (K + 1)
    for i in range(1, K + 1):
        prefix_sum[i] = prefix_sum[i - 1] + C[i - 1]

    dp = [[0] * (K + 1) for _ in range(K + 1)]
    opt = [[0] * (K + 1) for _ in range(K + 1)]

    for i in range(1, K + 1):
        opt[i][i] = i

    for length in range(2, K + 1):
        for i in range(1, K - length + 2):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(opt[i][j - 1], opt[i + 1][j] + 1):
                if k >= j:
                    break
                cost = dp[i][k] + dp[k + 1][j] + (prefix_sum[j] - prefix_sum[i - 1])
                if cost < dp[i][j]:
                    dp[i][j] = cost
                    opt[i][j] = k

    print(dp[1][K])