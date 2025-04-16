#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

int main() {
    int n, s;
    cin >> n >> s;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    int l = 0;
    int r = 0;
    int sum = 0;
    int minLen = INT_MAX;
    while (l <= r) {
        if(sum >= s){
            minLen = min(minLen, r-l);
            sum -= arr[l++];
        }
        else if(r == n) break;
        else sum += arr[r++];
    }

    if (minLen == INT_MAX) cout << 0 << endl; 
    else cout << minLen << endl;
    
    return 0;
}