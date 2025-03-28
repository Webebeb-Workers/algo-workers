import heapq

def solution(n, paths, gates, summits):
    graph = [[] for _ in range(n+1)]
    for i, j, w in paths:
        graph[i].append((j, w))
        graph[j].append((i, w))
        
    is_summit = [False] * (n+1)
    for summit in summits:
        is_summit[summit] = True
    
    intensity = [float('inf')] * (n+1)
    heap = []
    for gate in gates:
        intensity[gate] = 0
        heapq.heappush(heap, (0, gate))
        
    while heap:
        ci, u = heapq.heappop(heap)
        
        if intensity[u] < ci or is_summit[u]:
            continue
        
        for v, i in graph[u]:
            ni = max(intensity[u], i)
            if intensity[v] > ni:
                intensity[v] = ni
                heapq.heappush(heap, (ni, v))
    
    answer = [0, float('inf')]
    for summit in sorted(summits):
        if answer[1] > intensity[summit]:
            answer = [summit, intensity[summit]]
    return answer