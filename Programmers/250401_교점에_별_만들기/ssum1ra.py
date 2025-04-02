from itertools import combinations

def calc_intersection(l1, l2):
    A1, B1, E1 = l1
    A2, B2, E2 = l2

    denom = A1 * B2 - A2 * B1
    if denom == 0:
        return None, None

    x = (B1 * E2 - B2 * E1) / denom
    y = (E1 * A2 - E2 * A1) / denom

    if x % 1 == 0 and y % 1 == 0:
        return int(x), int(y)
    return None, None

def solution(lines):
    stars = set()

    for l1, l2 in combinations(lines, 2):
        point = calc_intersection(l1, l2)
        if point != (None, None):
            stars.add(point)

    min_x = min(x for x, y in stars)
    max_x = max(x for x, y in stars)
    min_y = min(y for x, y in stars)
    max_y = max(y for x, y in stars)

    width = max_x - min_x + 1
    height = max_y - min_y + 1

    grid = [['.' for _ in range(width)] for _ in range(height)]

    for x, y in stars:
        grid[max_y - y][x - min_x] = '*'

    return [''.join(row) for row in grid]