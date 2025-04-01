from itertools import combinations

def calc(line1, line2):
    x, y, x_1, y_1, x_2, y_2 = None, None, None, None, None, None
    
    if line1[0] * line2[1] == line1[1] * line2[0]:
        return None, None
    
    if line1[0] == 0:
        y_1 = -(line1[2] / line1[1])
    
    if line1[1] == 0:
        x_1 = -(line1[2] / line1[0])
        
    if line2[0] == 0:
        y_2 = -(line2[2] / line2[1])
    
    if line2[1] == 0:
        x_2 = -(line2[2] / line2[0])
    
    if (y_1 != None and y_2 != None) or (x_1 != None and x_2 != None):
        return None, None
    
    if x_1 != None and y_2 != None:
        return x_1, y_2
    
    if x_2 != None and y_1 != None:
        return x_2, y_1
    
    if x_1 != None:
        y = -((line2[2] + (line2[0] * x_1)) / line2[1])
        return x_1, y
    
    if x_2 != None:
        y = -((line1[2] + (line1[0] * x_2)) / line1[1])
        return x_2, y
    
    if y_1 != None:
        x = -((line2[2] + (line2[1] * y_1)) / line2[0])
        return x, y_1
    
    if y_2 != None:
        x = -((line1[2] + (line1[1] * y_2)) / line1[0])
        return x, y_2
    
    temp1 = line1[0]
    temp2 = line2[0]
    new_line1 = [item * temp2 for item in line1]
    new_line2 = [item * temp1 for item in line2]
    
    y = -((new_line1[2] - new_line2[2]) / (new_line1[1] - new_line2[1]))
    x = -((line1[2] + (line1[1] * y)) / line1[0])
    
    return x, y

def solution(line):
    answer = []
    
    stars = set()
    for comb in combinations(line, 2):
        line1, line2 = comb
        x, y = calc(line1, line2)
        if x != None and y != None and x % 1 == 0 and y % 1 == 0:
            stars.add((int(x), int(y)))
    
    min_x = min(x for x, y in stars)
    max_x = max(x for x, y in stars)
    min_y = min(y for x, y in stars)
    max_y = max(y for x, y in stars)
    
    for i in range(max_y, min_y - 1, -1):
        temp = []
        for j in range(min_x, max_x + 1):
            if (j, i) in stars:
                temp.append('*')
            else:
                temp.append('.')
        answer.append(''.join(temp))
    
    return answer