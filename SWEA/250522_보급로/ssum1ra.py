import heapq

T = int(input())

for test_case in range(1, T + 1):
    n = int(input())
    grid = [list(map(int, list(input()))) for _ in range(n)]

    dist = [[float('inf')] * n for _ in range(n)]
    dist[0][0] = 0

    hq = [(0, 0, 0)]

    while hq:
        cost, cx, cy = heapq.heappop(hq)

        if cost > dist[cx][cy]:
            continue

        if cx == n - 1 and cy == n - 1:
            break

        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nx, ny = cx + dx, cy + dy

            if 0 <= nx < n and 0 <= ny < n:
                if cost + grid[nx][ny] < dist[nx][ny]:
                    dist[nx][ny] = cost + grid[nx][ny]
                    heapq.heappush(hq, (cost + grid[nx][ny], nx, ny))

    print(f"#{test_case} {dist[n-1][n-1]}")