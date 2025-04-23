#include <iostream>
#include <vector>
#include <algorithm>
#include <deque>

using namespace std;

int main() {
    int N, a, b;
    cin >> N >> a >> b;
    
    if(a + b - 1 > N) {
        cout << - 1 << endl;
        return 0;
    }
    
    deque<int> arr1 = {max(a, b)};
    int i = 0;
    while(arr1.size() < a){
        arr1.push_back(++i);
    }
    sort(arr1.begin(), arr1.end());

    deque<int> arr2 = {max(a, b)};
    i = 0;
    while(arr2.size() < b){
        arr2.push_back(++i);
    }
    sort(arr2.begin(), arr2.end(), greater<>());

    if(arr1.size() + arr2.size() - 1 < N){
        if(arr1.size() > 1){
            arr1.insert(arr1.begin() + 1, N - (arr1.size() + arr2.size() - 1), 1);
        }
        else if(arr2.size() > 1){
            arr2.insert(arr2.begin() + 1, N - (arr1.size() + arr2.size() - 1), 1);
        }
        else if(arr1.size() == 1 && arr2.size() == 1){
            arr1.insert(arr1.end(), N - 1, 1);
        }
    }

    for(auto a1 : arr1){
        cout << a1 << " ";
    }
    for(int i = 1; i < arr2.size(); i++){
        cout << arr2[i] << " ";
    }
    cout << endl;

    return 0;
}