n, s = map(int, input().split())
arr = list(map(int, input().split()))

l, r = 0, 0
sum = 0
min_len = float('inf')

while True:
    if sum >= s:
        min_len = min(min_len, r - l)
        sum -= arr[l]
        l += 1
    elif r == n:
        break
    else:
        sum += arr[r]
        r += 1


if min_len == float('inf'):
    print(0)
else:
    print(min_len)
