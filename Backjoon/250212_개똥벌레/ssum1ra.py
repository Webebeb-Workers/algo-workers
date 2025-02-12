n, h = map(int, input().split())
s = [int(input()) for _ in range(n)]

temp = [0] * h

for i in range(n):
    if i % 2 == 0:
        for j in range(s[i]):
            temp[j] += 1
    else:
        for j in range(h - 1, h - 1 - s[i], -1):
            temp[j] += 1

min = float('inf')
cnt = 0
for i in range(len(temp)):
    if temp[i] < min:
        min = temp[i]

for i in range(len(temp)):
    if temp[i] == min:
        cnt += 1

print(min, cnt)