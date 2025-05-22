import sys

input = sys.stdin.readline

def can_interleave(a, b, c):
    if len(c) != len(a) + len(b):
        return False

    dp = [[False] * (len(b) + 1) for _ in range(len(a) + 1)]
    dp[0][0] = True

    for i in range(len(a) + 1):
        for j in range(len(b) + 1):
            if i > 0 and a[i-1] == c[i+j-1]:
                dp[i][j] |= dp[i-1][j]
            if j > 0 and b[j-1] == c[i+j-1]:
                dp[i][j] |= dp[i][j-1]

    return dp[len(a)][len(b)]


n = int(input())
for idx in range(1, n + 1):
    a, b, c = input().split()
    if can_interleave(a, b, c):
        print(f"Data set {idx}: yes")
    else:
        print(f"Data set {idx}: no")