from collections import defaultdict

def solution(phone_book):
    phone_book.sort()
    for i in range(len(phone_book) - 1):
        if phone_book[i+1].startswith(phone_book[i]):
            return False  
    return True

# def solution(phone_book):
#    dic = {num: 1 for num in phone_book}
#    for num in phone_book:
#        prefix = ''
#        for ch in num[:-1]:
#            prefix += ch
#            if prefix in hash_map:
#                return False
#    return True