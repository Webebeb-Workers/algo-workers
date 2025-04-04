def solution(n, k, cmd):
    prev = [i - 1 for i in range(n)]
    next = [i + 1 for i in range(n)]
    next[n - 1] = -1
    stack = []
    cur = k

    for c in cmd:
        if c[0] == 'U':
            x = int(c[2:])
            for _ in range(x):
                cur = prev[cur]
                
        elif c[0] == 'D':
            x = int(c[2:])
            for _ in range(x):
                cur = next[cur]
                
        elif c[0] == 'C':
            stack.append((cur, prev[cur], next[cur]))
            if prev[cur] != -1:
                next[prev[cur]] = next[cur]
            if next[cur] != -1:
                prev[next[cur]] = prev[cur]
                
            if next[cur] != -1:
                cur = next[cur]
            else:
                cur = prev[cur]
                
        elif c[0] == 'Z':
            node, p, n_ = stack.pop()
            if p != -1:
                next[p] = node
            if n_ != -1:
                prev[n_] = node

    result = ['O'] * n
    for node, _, _ in stack:
        result[node] = 'X'

    return ''.join(result)