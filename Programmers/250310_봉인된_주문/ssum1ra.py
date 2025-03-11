def order_to_spell(n):
    result = ""
    while n > 0:
        n -= 1
        result = chr(n % 26 + ord('a')) + result
        n //= 26
    return result

def solution(n, bans):
    bans_sorted = sorted(bans, key=lambda x: (len(x), x))
    
    for ban in bans_sorted:
        spell = order_to_spell(n)
        if len(ban) > len(spell):
            break
        if len(ban) < len(spell) or ban <= spell:
            n += 1
            
    return order_to_spell(n)