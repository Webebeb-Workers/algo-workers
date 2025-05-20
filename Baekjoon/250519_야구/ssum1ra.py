import sys
from itertools import permutations

input = sys.stdin.readline

N = int(input())

innings = [list(map(int, input().split())) for _ in range(N)]

answer = 0
for order in permutations(range(1, 9), 8):
    order = list(order)
    order.insert(3, 0)

    score = 0
    cur = 0
    for inning in range(N):
        outs = 0
        base1, base2, base3 = 0, 0, 0

        while outs < 3:
            if innings[inning][order[cur]] == 0:
                outs += 1
            elif innings[inning][order[cur]] == 1:
                score += base3
                base3, base2, base1 = base2, base1, 1
            elif innings[inning][order[cur]] == 2:
                score += base3 + base2
                base3, base2, base1 = base1, 1, 0
            elif innings[inning][order[cur]] == 3:
                score += base3 + base2 + base1
                base3, base2, base1 = 1, 0, 0
            elif innings[inning][order[cur]] == 4:
                score += base3 + base2 + base1 + 1
                base3, base2, base1 = 0, 0, 0

            cur = (cur + 1) % 9
    answer = max(answer, score)
print(answer)