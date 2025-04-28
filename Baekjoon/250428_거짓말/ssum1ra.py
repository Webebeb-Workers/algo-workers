import sys
input = sys.stdin.readline

n, m = map(int, input().split())
known = set(input().split()[1:])
parties = []
for _ in range(m):
    parties.append(set(input().split()[1:]))

for _ in range(m):
    for party in parties:
        if party & known:
            known |= party

cnt = 0
for party in parties:
    if party & known:
        continue
    cnt += 1

print(cnt)



