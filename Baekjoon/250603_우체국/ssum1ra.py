n = int(input())
villages = []

for _ in range(n):
    x, a = map(int, input().split())
    villages.append((x, a))

villages.sort()

total_population = sum(a for _, a in villages)

population_sum = 0
for x, a in villages:
    population_sum += a
    if population_sum >= (total_population + 1) // 2:
        print(x)
        break