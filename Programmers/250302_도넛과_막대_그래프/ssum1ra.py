def solution(edges):
    answer = [0] * 4
    
    in_degree = [0] * 1_000_001
    out_degree = [0] * 1_000_001
    
    for o, i in edges:
        in_degree[i] += 1
        out_degree[o] += 1
    
    for i in range(1_000_001):
        if in_degree[i] == 0 and out_degree[i] >= 2:
            answer[0] = i
        elif in_degree[i] != 0 and out_degree[i] == 0:
            answer[2] += 1
        elif in_degree[i] >= 2 and out_degree[i] == 2:
            answer[3] += 1
    
    answer[1] = out_degree[answer[0]] - answer[2] - answer[3]
        
    return answer