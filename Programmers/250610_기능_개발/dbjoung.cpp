// 각 기능은 진도가 100%일 때 서비스 반영
// 개발 속도 모두 다름. 뒷 기능이 앞 기능보다 먼저 개발 가능. 이때, 뒷 기능은 앞 기능 배포 때 같이 배포됨
// 배포되어야 하는 순서대로 작업의 진도가 적힌 progresses, 
// 각 작업의 개발 속도가 적힌 정수 배열 speeds
// 각 배포마다 몇 개의 기능이 배포되는가?

// 1. 하루 지날 때마다 progresses의 각 원소에 speeds 배열의 각 값을 더한다.
// 2. 각 반복 마다,
//  - speeds 값 더하기 (100)
//  - 맨 앞 원소부터 검사하여, 100이 넘은 것들 pop_front();
//  - pop_front() 할때마다 count+1;
//  - 총 count 수 result 배열에 저장

#include <string>
#include <vector>
#include <deque>

using namespace std;

vector<int> solution(vector<int> progresses, vector<int> speeds) {
    vector<int> answer;
    deque<int> que;
    deque<int> que_speeds;
    
    for (int i=0 ; i<speeds.size() ; i++) {
        que.push_back(progresses[i]);
        que_speeds.push_back(speeds[i]);
    }
    
    for (int day=1 ; day<=100 ; day++) {
        for (int i=0 ; i<que.size() ; i++) {
            que[i]+=que_speeds[i];
        }

        
        int count = 0;
        while(que.size()>0) {
            if (que[0]>=100) {
                que.pop_front();
                que_speeds.pop_front();
                count++;
            } else {
                break;
            }
        }
        
        if (count>0) answer.push_back(count);
    }
    
    return answer;
}