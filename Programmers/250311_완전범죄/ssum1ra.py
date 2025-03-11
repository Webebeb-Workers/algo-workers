def solution(info, n, m):
    l = len(info)
    dp = [[[False] * m for _ in range(n)] for _ in range(l + 1)]
    dp[0][0][0] = True

    for i in range(1, l + 1):
        for j in range(n):
            for k in range(m):
                if j >= info[i-1][0] and dp[i-1][j-info[i-1][0]][k]:
                    dp[i][j][k] = True
                elif k >= info[i-1][1] and dp[i-1][j][k-info[i-1][1]]:
                    dp[i][j][k] = True

    for j in range(n):
        for k in range(m):
            if dp[l][j][k]:
                return j

    return -1