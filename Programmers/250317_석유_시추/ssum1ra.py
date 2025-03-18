def label_areas(land):
    rows, cols = len(land), len(land[0])
    labels = [[0] * cols for _ in range(rows)]
    area_sizes = {}
    label = 1
    
    def dfs(x, y):
        stack = [(x, y)]
        size = 0
        while stack:
            cx, cy = stack.pop()
            if labels[cx][cy] == 0:
                labels[cx][cy] = label
                size += 1
                for dx, dy in [(1,0), (-1,0), (0,1), (0,-1)]:
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < rows and 0 <= ny < cols and land[nx][ny] == 1 and labels[nx][ny] == 0:
                        stack.append((nx, ny))
        return size
    
    for i in range(rows):
        for j in range(cols):
            if land[i][j] == 1 and labels[i][j] == 0:
                size = dfs(i, j)
                area_sizes[label] = size
                label += 1
    
    return labels, area_sizes


def solution(land):
    labels, area_sizes = label_areas(land)
    cols = len(land[0])
    max_oil = 0
    
    for col in range(cols):
        seen = set()
        total = 0
        for row in range(len(land)):
            if labels[row][col] > 0:
                label = labels[row][col]
                if label not in seen:
                    seen.add(label)
                    total += area_sizes[label]
        max_oil = max(max_oil, total)
    
    return max_oil
