from collections import defaultdict

def solution(info, edges):
    answer = 0
    
    dic = defaultdict(list)
    for edge in edges:
        dic[edge[0]].append(edge[1])
    
    def dfs(cn, sheep, wolf, nodes):
        nonlocal answer
        
        if sheep <= wolf:
            return
        
        answer = max(answer, sheep)
        
        for i, node in enumerate(nodes):
            next_nodes = nodes[:i] + nodes[i+1:] + dic[node]
            if info[node] == 1:
                dfs(node, sheep, wolf+1, next_nodes)
            else:
                dfs(node, sheep+1, wolf, next_nodes)
        
    dfs(0, 1, 0, dic[0])
    
    return answer