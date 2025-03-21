def solution(nodes, edges):
    n = len(nodes)
    
    tree_parent = list(range(n))
    node_degree = [0] * n
    valid_root_count = [0] * n
    invalid_root_count = [0] * n
    
    node_index_map = {}
    
    for i in range(n):
        tree_parent[i] = i
        node_index_map[nodes[i]] = i
    
    for u, v in edges:
        u_idx = node_index_map[u]
        v_idx = node_index_map[v]
        node_degree[u_idx] += 1
        node_degree[v_idx] += 1
    
    def find(node):
        if tree_parent[node] == node:
            return node
        tree_parent[node] = find(tree_parent[node])
        return tree_parent[node]
    
    def union(node_a, node_b):
        root_a = find(node_a)
        root_b = find(node_b)
        if root_a != root_b:
            tree_parent[root_b] = root_a
    
    for u, v in edges:
        u_idx = node_index_map[u]
        v_idx = node_index_map[v]
        union(u_idx, v_idx)
    
    for i in range(n):
        root = find(i)
        if nodes[i] % 2 == node_degree[i] % 2:
            valid_root_count[root] += 1
        else:
            invalid_root_count[root] += 1
    
    holzzak_tree_count = 0
    reverse_holzzak_tree_count = 0
    
    for i in range(n):
        if find(i) != i:
            continue
        
        if valid_root_count[i] == 1:
            holzzak_tree_count += 1
        
        if invalid_root_count[i] == 1:
            reverse_holzzak_tree_count += 1
    
    return [holzzak_tree_count, reverse_holzzak_tree_count]