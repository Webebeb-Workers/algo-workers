def rotate90(key):
    return list(zip(*key[::-1]))

def attach(x, y, m, key, board):
    for i in range(m):
        for j in range(m):
            board[x + i][y + j] += key[i][j]
            
def detach(x, y, m, key, board):
    for i in range(m):
        for j in range(m):
            board[x + i][y + j] -= key[i][j]

def check(board, m, n):
    for i in range(n):
        for j in range(n):
            if board[i + m][j + m] != 1:
                return False
    return True
            
def solution(key, lock):  
    m, n = len(key), len(lock)
    
    board = [[0] * (2 * m + n) for _ in range(2 * m + n)]
    
    for i in range(0, n):
        for j in range(0, n):
            board[i+m][j+m] = lock[i][j]

    rotated_key = key
    for _ in range(4):
        rotated_key = rotate90(rotated_key)
        for x in range(1, m + n):
            for y in range(1, m + n):
                attach(x, y, m, rotated_key, board)
                if check(board, m, n):
                    return True
                detach(x, y, m, rotated_key, board)
    
    return False