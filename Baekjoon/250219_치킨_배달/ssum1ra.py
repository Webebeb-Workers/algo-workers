import sys
input = sys.stdin.readline
from itertools import combinations

n, m = map(int, input().split())
homes = set()
chickens = set()
for i in range(n):
    city = list(map(int, input().split()))
    for j in range(n):
        if city[j] == 1:
            homes.add((i, j))
        if city[j] == 2:
            chickens.add((i, j))

min_res = float('inf')
for chicken in combinations(chickens, m):
    res = 0
    for hx, hy in homes:
        distance = float('inf')
        for cx, cy in chicken:
            distance = min(distance, abs(hx - cx) + abs(hy - cy))
        res += distance
    min_res = min(min_res, res)

print(min_res)
