def solution(board, skill):
    answer = 0
    
    diff = [[0] * (len(board[0])+1) for _ in range(len(board)+1)]
    for t, r1, c1, r2, c2, degree in skill:
        degree = degree if t == 1 else -degree 
        
        diff[r1][c1] += degree
        diff[r2+1][c2+1] += degree 
        diff[r2+1][c1] -= degree
        diff[r1][c2+1] -= degree
    
    for i in range(len(diff)):
        for j in range(len(diff[0]) - 1):
            diff[i][j+1] += diff[i][j]
            
    for j in range(len(diff[0])):
        for i in range(len(diff) - 1):
            diff[i+1][j] += diff[i][j]
    
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] - diff[i][j] > 0:
                answer += 1
        
    return answer