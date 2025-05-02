import sys
input = sys.stdin.readline

def getMin(cnt):
    min_cnt = { 2 : 1, 3 : 7, 4 : 4, 5 : 2, 6 : 6, 7 : 8}

    dp = [float('inf')] * 101
    for i in range(2, 8):
        dp[i] = min_cnt[i]

    for i in range(8, cnt + 1):
        for j in range(2, i - 1):
            dp[i] = min(dp[i], int(str(dp[j]) + str(dp[i-j])))
            if j == 6:
                dp[i] = min(dp[i], int(str(dp[i-j]) + '0'))
    
    return dp[cnt]
    

def getMax(cnt):
    if cnt % 2 == 0:
        return "1" * (cnt // 2)
    else:
        return "7" + "1" * ((cnt - 1) // 2 - 1)

n = int(input())
for _ in range(n):
    cnt = int(input())
    
    min_num = getMin(cnt)
    max_num = getMax(cnt)

    print(f"{min_num} {max_num}")