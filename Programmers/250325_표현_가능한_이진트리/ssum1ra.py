def check(arr):
    if len(arr) <= 1:
        return True

    mid = len(arr) // 2
    if arr[mid] == '0':
        return all(x == '0' for x in arr)

    return check(arr[:mid]) and check(arr[mid + 1:])

def solution(numbers):
    answer = []

    for number in numbers:
        b = list(bin(number))[2:]

        # padding
        l = 1
        while l < len(b):
            l = l * 2 + 1
        b = ['0'] * (l - len(b)) + b[:]

        answer.append(1 if check(b) else 0)

    return answer