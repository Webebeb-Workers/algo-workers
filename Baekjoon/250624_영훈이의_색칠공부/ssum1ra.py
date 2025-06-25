import sys
input = sys.stdin.readline

N = int(input())
MOD = 10**9 + 7

factorial = [1] * (N + 1)
for i in range(1, N + 1):
    factorial[i] = i * factorial[i-1] % MOD

derangement = [0] * (N+1)
derangement[0] = 1
for i in range(2, N + 1):
    derangement[i] = (i - 1) * (derangement[i - 1] + derangement[i-2]) % MOD

print(factorial[N] * derangement[N] % MOD)