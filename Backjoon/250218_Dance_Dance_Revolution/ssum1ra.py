import sys
input = sys.stdin.readline

def calculate_power(start, end):
    if start == 0:
        return 2
    elif start == end:
        return 1
    elif abs(start - end) == 2:
        return 4
    else: 
        return 3

step = list(map(int, input().split()))
dp = [[[float('inf') for _ in range(5)] for _ in range(5)] for _ in range(len(step))]

dp[0][0][0] = 0

for i in range(len(step) - 1):
    for left in range(5):
        for right in range(5):
            dp[i+1][step[i]][right] = min(dp[i + 1][step[i]][right], dp[i][left][right] + calculate_power(left, step[i]))
            dp[i+1][left][step[i]] = min(dp[i + 1][left][step[i]], dp[i][left][right] + calculate_power(right, step[i]))

res = float('inf')
for left in range(5):
    for right in range(5):
        res = min(res, dp[len(step) - 1][left][right])

print(res)
