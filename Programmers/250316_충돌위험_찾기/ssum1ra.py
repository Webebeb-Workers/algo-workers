def get_path(start, end):
    r = start[0] - end[0]
    c = start[1] - end[1]
        
    temp = [(start[0], start[1])]
    while abs(r):
        x, y = temp[-1]
        if r > 0:
            temp.append((x-1, y))
            r -= 1
        else:
            temp.append((x+1, y))
            r += 1
        
    while abs(c):
        x, y = temp[-1]
        if c > 0:
            temp.append((x, y-1))
            c -= 1
        else:
            temp.append((x, y+1))
            c += 1
    return temp[1:]

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