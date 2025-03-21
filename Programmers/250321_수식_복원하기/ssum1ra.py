def n_to_ten(number, n):
    answer = 0
    for i in range(len(number)):
        answer += int(number[len(number) - 1 - i]) * n ** i
    
    return answer

def ten_to_n(number, n):
    if number == 0:
        return '0'
    
    answer = []
    
    while number:
        answer.append(number % n)
        number = number // n 
    
    return ''.join(map(str, answer[::-1]))

def solution(expressions):
    answer = []
    
    a = 1
    f = []
    hints = []
    
    for exp in expressions:
        num1, op, num2, _, ans = exp.split()
        
        for d in num1:
            if int(d) > int(a):
                a = int(d)
        
        for d in num2:
            if int(d) > int(a):
                a = int(d)
        
        for d in ans:
            if d != 'X' and int(d) > int(a):
                a = int(d)        
        
        if ans != 'X':
            hints.append(exp)
        else:
            answer.append(exp)
    
    for i in range(a + 1, 10):
        cnt = 0
        for exp in hints:
            num1, op, num2, _, ans = exp.split()
            if op == '+':
                if n_to_ten(num1, i) + n_to_ten(num2, i) == n_to_ten(ans, i):
                    cnt += 1
            elif op == '-':
                if n_to_ten(num1, i) - n_to_ten(num2, i) == n_to_ten(ans, i): 
                    cnt += 1
        if cnt == len(hints):
            f.append(i)
    
    for i in range(len(answer)):
        num1, op, num2, _, ans = answer[i].split()
        res = set()
        for n in f:
            if op == '+':
                res.add(ten_to_n(n_to_ten(num1, n) + n_to_ten(num2, n), n))
            elif op == '-':
                res.add(ten_to_n(n_to_ten(num1, n) - n_to_ten(num2, n), n))
        if len(res) == 1:
            answer[i] = ' '.join([num1, op, num2, '=', res.pop()])
        else:
            answer[i] = ' '.join([num1, op, num2, '=', '?'])
    return answer