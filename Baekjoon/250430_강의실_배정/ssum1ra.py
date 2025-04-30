import sys
import heapq

input = sys.stdin.readline

n = int(input())
classes = [tuple(map(int, input().split())) for _ in range(n)]

classes.sort()

heap = []
for start, end in classes:
    if heap and heap[0] <= start:
        heapq.heappop(heap)
    heapq.heappush(heap, end)

print(len(heap))