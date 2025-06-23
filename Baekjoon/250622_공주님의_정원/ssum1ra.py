import sys
input = sys.stdin.readline

n = int(input())
flowers = []

for i in range(n):
    sm, sd, em, ed = map(int, input().split())
    start = sm * 100 + sd
    end = em * 100 + ed
    flowers.append((start, end))


flowers.sort()

target = 301
cnt = 0
idx = 0
max_end = 0

while target <= 1130:
    found = False

    while idx < n and flowers[idx][0] <= target:
        if flowers[idx][1] > max_end:
            max_end = flowers[idx][1]
            found = True
        idx += 1

    if not found:
        print(0)
        exit()
    
    cnt += 1
    target = max_end

print(cnt)