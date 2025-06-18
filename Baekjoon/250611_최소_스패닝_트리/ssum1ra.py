import sys
input = sys.stdin.readline

def find(parent, x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x

def union(parent, a, b):
    a = find(parent, a)
    b = find(parent, b)
    if a != b:
        parent[b] = a

def kruskal(V, edges):
    parent = [i for i in range(V + 1)]
    edges.sort(key=lambda x: x[2])
    mst_weight = 0
    for a, b, cost in edges:
        if find(parent, a) != find(parent, b):
            union(parent, a, b)
            mst_weight += cost
    return mst_weight


V, E = map(int, input().split())
edges = []
idx = 2
for _ in range(E):
    A, B, C = map(int, input().split())
    edges.append((A, B, C))
    idx += 3
print(kruskal(V, edges))