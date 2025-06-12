// 1시간 10분 소요.. ㅠㅠ

#include <iostream>
#include <vector>
#include <utility>
#include <algorithm>
#include <limits>
typedef unsigned uint;

using namespace std; 

struct Comp {  
    bool operator()(pair<int, int>& a, pair<int, int>& b) {
        if (a.second < b.second) return true;
        else if (a.second == b.second) {
            if (a.first > b.first) return true;
        }

        return false;
    }
};

int main() {

    uint N, M;
    scanf("%d %d", &N, &M);

    vector<pair<int, int>> items;

    for (uint n=0 ; n<N ; n++) {
        uint w, p;
        scanf("%d %d", &w, &p);

        items.push_back(make_pair(w, p));
    }

    sort(items.begin(), items.end(), Comp());

    uint result = (uint)numeric_limits<int>::max()+1;

    uint subSum = 0;
    uint curPrice = 0;
    uint subPrice = 0;
    uint totalSum = 0;
    for (uint i=0 ; i<items.size() ; i++) {
        if (curPrice!=items[i].second) {
            totalSum += subSum;
            subSum = 0;
            curPrice = items[i].second;
            subPrice = 0;
        }

        subSum += items[i].first;
        subPrice += items[i].second;

        if (totalSum + subSum >= M) {
            result = min(result, subPrice);
        } 
    }

    if (result == (uint)numeric_limits<int>::max()+1) result = -1;
    printf("%d", result);

    return 0;
}