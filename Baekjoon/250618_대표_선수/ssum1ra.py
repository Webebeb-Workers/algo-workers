import sys
import heapq

input = sys.stdin.readline

N, M = map(int, input().split())
power = [list(map(int, input().split())) for _ in range(N)]

for i in range(N):
    power[i].sort()

heap = []
max_val = 0

for i in range(N):
    val = power[i][0]
    heap.append((val, i, 0))
    max_val = max(max_val, val)

heapq.heapify(heap)

min_diff = float('inf')

while True:
    min_val, c_idx, idx = heapq.heappop(heap)
    min_diff = min(min_diff, max_val - min_val)

    if idx + 1 == M:
        break
    
    next_val = power[c_idx][idx+1]
    heapq.heappush(heap, (next_val, c_idx, idx + 1))
    max_val = max(max_val, next_val)

print(min_diff)