def dfs(row):
    global cnt

    if row == n:
        cnt += 1
        return
    
    for col in range(n):
        if cols[col] or diag1[row - col] or diag2[row + col]:
            continue

        cols[col] = diag1[row - col] = diag2[row + col] = 1

        dfs(row + 1)

        cols[col] = diag1[row - col] = diag2[row + col] = 0


n = int(input())
cnt = 0

cols = [0] * n
diag1 = [0] * (2 * n - 1)
diag2 = [0] * (2 * n - 1)

dfs(0)

print(cnt)