#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, M, L, K;
    cin >> N >> M >> L >> K;

    vector<pair<int, int>> meteors(K);
    for(int i = 0; i < K; i++){
        cin >> meteors[i].first >> meteors[i].second;
    }

    int max_caught = 0;
    
    for(int i = 0; i < K; i++) {
        for(int j = 0; j < K; j++) {
            int x_start = max(0, meteors[i].first - L);
            int y_start = max(0, meteors[j].second - L);
            
            int caught = 0;
            for(int k = 0; k < K; k++) {
                if(meteors[k].first >= x_start && meteors[k].first <= x_start + L && 
                   meteors[k].second >= y_start && meteors[k].second <= y_start + L) {
                    caught++;
                }
            }
            
            max_caught = max(max_caught, caught);
        }
    }
    
    cout << K - max_caught << endl;
    
    return 0;
}