import sys
from itertools import combinations
input = sys.stdin.readline

n = int(input())
words = [input().strip() for _ in range(n)]
word_to_index = {word: idx for idx, word in enumerate(words)}

sorted_words = sorted(words)

max_prefix_len = 0

for i in range(len(sorted_words) - 1):
    a = sorted_words[i]
    b = sorted_words[i + 1]
    j = 0
    while j < min(len(a), len(b)) and a[j] == b[j]:
        j += 1
    if j > max_prefix_len:
        max_prefix_len = j

from collections import defaultdict

prefix_groups = defaultdict(list)
for word in sorted_words:
    prefix = word[:max_prefix_len]
    prefix_groups[prefix].append(word)

candidate_pairs = []

for group in prefix_groups.values():
    if len(group) >= 2:
        for a, b in combinations(group, 2):
            candidate_pairs.append((a, b))

idx1, idx2 = n, n
for a, b in candidate_pairs:
    a_idx = word_to_index[a]
    b_idx = word_to_index[b]
    if a_idx > b_idx:
        a_idx, b_idx = b_idx, a_idx
    if (a_idx < idx1) or (a_idx == idx1 and b_idx < idx2):
        idx1, idx2 = a_idx, b_idx

print(words[idx1])
print(words[idx2])
