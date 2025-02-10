n, m = map(int, input().split())
matrix = [[0]*(m+1)] + [([0] + list(map(int, input().split()))) for _ in range(n)]

res = float('-inf')

for i in range(1, n+1):
    p = [0] * (m+1)
    for j in range(i, n+1):
        t = [0] * (m+1)
        for k in range(1, m+1):
            p[k] += matrix[j][k]
            t[k] = max(t[k-1] + p[k], p[k])
            res = max(t[k], res)

print(res)