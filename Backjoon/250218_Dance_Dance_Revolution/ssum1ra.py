import sys
input = sys.stdin.readline
sys.setrecursionlimit(1_000_000)

def move(start, end):
    if start == 0:
        return 2
    elif start == end:
        return 1
    elif abs(start - end) == 2:
        return 4
    else: 
        return 3

def solve(num, left, right):
    if num >= len(step) - 1:
        return 0
    
    if dp[num][left][right] != -1:
        return dp[num][left][right]
    
    dp[num][left][right] = min(solve(num + 1, step[num], right) + move(left, step[num]), solve(num + 1, left, step[num]) + move(right, step[num]))
    return dp[num][left][right]

step = list(map(int, input().split()))
dp = [[[-1] * 5 for _ in range(5)] for _ in range(len(step))]

print(solve(0, 0, 0))