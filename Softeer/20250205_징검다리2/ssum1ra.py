import sys
import bisect

n = int(input())
arr = list(map(int, input().split()))

lis = []
dp1 = [0] * n

for i in range(n):
    idx = bisect.bisect_left(lis, arr[i])
    if idx == len(lis):
        lis.append(arr[i])
    else:
        lis[idx] = arr[i]
    dp1[i] = idx + 1

lds = []
dp2 = [0] * n

for i in range(n-1, -1, -1):
    idx = bisect.bisect_left(lds, arr[i])
    if idx == len(lds):
        lds.append(arr[i])
    else:
        lds[idx] = arr[i]
    dp2[i] = idx + 1

ans = max(dp1[i] + dp2[i] - 1 for i in range(n))

print(ans)