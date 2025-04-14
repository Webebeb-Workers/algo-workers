import sys
input = sys.stdin.readline
from collections import deque

def bfs(si, sj, v):
    answer = []
    p_cnt = 0

    q = deque([(si, sj)])
    v.add((si, sj))
    answer.append((si, sj))
    p_cnt += ground[si][sj]

    while q:
        ci, cj = q.popleft()
        for di, dj in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            ni, nj = ci + di, cj + dj
            if 0 <= ni < N and 0 <= nj < N and (ni, nj) not in v and L <= abs(ground[ci][cj] - ground[ni][nj]) <= R:
                q.append((ni, nj))
                v.add((ni, nj))
                answer.append((ni, nj))
                p_cnt += ground[ni][nj]

    return answer, p_cnt, len(answer)

N, L, R = map(int, input().split())
ground = [list(map(int, input().split())) for _ in range(N)]

cnt = 0

while True:
    v = set()
    can_go = False

    for i in range(N):
        for j in range(N):
            if (i, j) not in v:
                countries, p_cnt, c_cnt = bfs(i, j, v)
                if c_cnt > 1:
                    can_go = True
                    for ci, cj in countries:
                        ground[ci][cj] = p_cnt // c_cnt

    if not can_go:
        break

    cnt += 1

print(cnt)