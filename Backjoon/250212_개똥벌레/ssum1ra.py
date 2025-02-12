import sys
input = sys.stdin.readline

n, h = map(int, input().split())

t = [0] * (n//2)
d = [0] * (n//2)

for i in range(n):
    if i % 2 == 0:
        d[i//2] = int(input())
    else:
        t[i//2] = int(input())

t_h = [0] * (h+1)
d_h = [0] * (h+1)

for i in range(n//2):
    t_h[t[i]] += 1
    d_h[d[i]] += 1

dp_t = [0] * (h+1)
dp_d = [0] * (h+1)
dp_t[h] = t_h[h]
dp_d[h] = d_h[h]
for i in range(h - 1, 0, -1):
    dp_t[i] = dp_t[i+1] + t_h[i]
    dp_d[i] = dp_d[i+1] + d_h[i]

min_s = float('inf')
s = [0] * (h+1)
for i in range(1, h + 1):
    s[i] = dp_d[i] + dp_t[h + 1 - i]
    min_s = min(s[i], min_s)

cnt = 0
for i in range(1, h + 1):
    if s[i] == min_s:
        cnt += 1

print(min_s, cnt)