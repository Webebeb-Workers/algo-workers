n, m = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(n)]

cum = [[0] * (m+1) for _ in range(n+1)]

for i in range(1, n+1):
    for j in range(1, m+1):
        cum[i][j] = matrix[i-1][j-1] + cum[i-1][j] + cum[i][j-1] - cum[i-1][j-1]

res = float('-inf')
for i in range(1, n+1):
    for j in range(1, m+1):
        for x in range(i, 0, -1):
            for y in range(j, 0, -1):
                res = max(res, cum[i][j] + cum[x-1][y-1] - cum[i][y-1] - cum[x-1][j])

print(res)