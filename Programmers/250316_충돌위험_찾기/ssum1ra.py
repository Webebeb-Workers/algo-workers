def get_path(start, end):
    dr = start[0] - end[0]
    dc = start[1] - end[1]
        
    path = [start]
    x, y = start

    while dr != 0:
        if dr > 0:
            x -= 1
            dr -= 1
        else:
            x += 1
            dr += 1
        path.append((x, y))
        
     while dc != 0:
        if dc > 0:
            y -= 1
            dc -= 1
        else:
            y += 1
            dc += 1
        path.append((x, y))
    
    return path[1:]

def solution(points, routes):
    answer = 0
    
    paths = []
    for i in range(len(routes)):
        path = [(points[routes[i][0] - 1][0], points[routes[i][0] - 1][1])]
        for j in range(len(routes[i])-1):
            path += get_path(points[routes[i][j] - 1], points[routes[i][j+1] - 1])
        paths.append(path)

    max_length = max(len(path) for path in paths)
    
    for l in range(max_length):
        p = set()
        c = set()
        
        for path in paths:
            if l < len(path):
                pos = path[l]
                if pos in p:
                    c.add(pos)
                p.add(pos)
        
        answer += len(c)

    return answer