// 디딤돌의 숫자는 밟을 때 1씩 줄어듬.
// 디디돌 숫자가 0이 되면 더 밟을 수 없음. 이때, 그 다음 디디돌로 한번에 여러 칸 건너 뛸 수 있음
// 다음으로 밟을 수 있는 디딤돌이 여러개면 무조건 가까운 디딤돌로만 건너뛸 수 있음
// 한 친구가 징검다리를 다 건넌 후 그 다음 친구가 건넘
// 최대 몇 명 까지 징검다리를 건널 수 있는가?

#include <string>
#include <vector>
#include <cstdio>

using namespace std;

bool canGo(vector<int>* stones, int k, int numOf) {
    int blankCount = 0;
    for (int i=0 ; i<(*stones).size() ; i++) {
        if ((*stones)[i]-(numOf-1)<=0) {
            blankCount++;
            if (blankCount>=k) return false;
        } else blankCount = 0;
        
        
    }
    
    return true;
}

int solution(vector<int> stones, int k) {
    int maxRock = 0;

    for (int i=0 ; i<stones.size() ; i++) {
        maxRock = (maxRock<stones[i]) ? stones[i] : maxRock;
    }

    int left = 1;
    int right = maxRock+1;
    
    while(left<right) {
        int half = (left+right)/2;
        if (canGo(&stones, k, half)) left = half+1;
        else right = half;
    }
    
    return left-1;
}