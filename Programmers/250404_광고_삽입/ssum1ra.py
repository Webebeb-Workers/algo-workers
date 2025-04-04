def str_to_sec(string):
    h, m, s = map(int, string.split(':'))
    return h * 3600 + m * 60 + s

def sec_to_str(seconds):
    h, m, s = seconds // 3600, (seconds % 3600) // 60, seconds% 60
    return f"{h:02}:{m:02}:{s:02}"

def solution(play_time, adv_time, logs):
    seconds = [0] * (str_to_sec(play_time) + 1)
    
    for log in logs:
        start, end = log.split('-')
        seconds[str_to_sec(start)] += 1
        seconds[str_to_sec(end)] -= 1
    
    for i in range(1, len(seconds)):
        seconds[i] += seconds[i-1]
        
    for i in range(1, len(seconds)):
        seconds[i] += seconds[i-1]
    
    answer = 0
    max_sec = seconds[str_to_sec(adv_time) - 1]
    for t in range(1, len(seconds) - str_to_sec(adv_time) + 1):
        temp = seconds[t + str_to_sec(adv_time) - 1] - seconds[t-1]
        if temp > max_sec:
            max_sec = temp
            answer = t
        
    return sec_to_str(answer)