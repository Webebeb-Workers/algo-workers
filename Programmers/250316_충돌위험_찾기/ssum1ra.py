def get_path(start, end):
    dr = start[0] - end[0]
    dc = start[1] - end[1]
        
    path = [start[:]]
    x, y = start

    while dr != 0:
        if dr > 0:
            x -= 1
            dr -= 1
        else:
            x += 1
            dr += 1
        path.append([x, y])
        
    while dc != 0:
        if dc > 0:
            y -= 1
            dc -= 1
        else:
            y += 1
            dc += 1
        path.append([x, y])
    
    return path[1:]

def solution(points, routes):
    paths = []

    for route in routes:
        path = [points[route[0] - 1][:]]
        for k in range(len(route) - 1):
            start = points[route[k] - 1]
            end = points[route[k + 1] - 1]
            path += get_path(start, end)
        paths.append(path)

    max_length = max(len(path) for path in paths)
    answer = 0

    for t in range(max_length):
        positions = set()
        collisions = set()
        
        for path in paths:
            if t < len(path):
                pos = tuple(path[t])
                if pos in positions:
                    collisions.add(pos)
                positions.add(pos)
        
        answer += len(collisions)

    return answer