import sys
sys.setrecursionlimit(10000)

def solution(n, m, x, y, r, c, k):
    def dfs(sx, sy, path, remaining):
        if remaining == 0 and sx == r-1 and sy == c-1:
            return path
        
        if remaining < abs(sx - (r-1)) + abs(sy - (c-1)):
            return None
        
        if (abs(sx - (r-1)) + abs(sy - (c-1)) - remaining) % 2 != 0:
            return None
        
        for direction, dx, dy in [('d', 1, 0), ('l', 0, -1), ('r', 0, 1), ('u', -1, 0)]:
            nx, ny = sx + dx, sy + dy
            
            if 0 <= nx < n and 0 <= ny < m:
                result = dfs(nx, ny, path + direction, remaining - 1)
                if result:
                    return result
        
        return None
    
    result = dfs(x-1, y-1, '', k)
    
    return result if result else 'impossible'