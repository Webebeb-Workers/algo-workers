def solution(coin, cards):
    answer = 0
    a = cards[:len(cards)//3]
    b = []
    cur_coin = coin
    target = len(cards) + 1
    
    for i in range(len(cards)//3, len(cards), 2):
        b.append(cards[i])
        b.append(cards[i+1])
        
        before_a = len(a)
        for j in a:
            if target - j in a:
                a.remove(j)
                a.remove(target - j)
                break
        if before_a != len(a):
            continue
            
        temp = a + b
        for j in temp:
            if target - j in temp:
                if j in b:
                    b.remove(j)
                    cur_coin -= 1
                else:
                    a.remove(j)
                if target - j in b:
                    b.remove(target - j)
                    cur_coin -= 1
                else:
                    a.remove(target - j)
                break
        
        if len(temp) == len(a + b):
             return (i - len(cards)//3)//2 + 1
    
        if cur_coin < 0:
            return (i - len(cards)//3)//2 + 1
    
    return (len(cards) - (len(cards)//3))//2 + 1