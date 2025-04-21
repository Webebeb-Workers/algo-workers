#include <iostream>
#include <string>
#include <vector>

using namespace std;

int getPrefixLength(const string& s1, string& s2){
    int i = 0;
    int minLength = min(s1.length(), s2.length());
    
    while(i < minLength && s1[i] == s2[i]){
        i++;
    }

    return i;
}

int main(){
    int n;
    cin >> n;

    vector<string> words(n);
    for(int i = 0; i < n; i++){
        cin >> words[i];
    }

    int maxPrefixLength = -1;
    int firstWordIndex = 0;
    int secondWordIndex = 0;

    for(int i = 0; i < n; i++){
        for(int j = i + 1; j < n; j++){
            int prefixLength = getPrefixLength(words[i], words[j]);

            if (prefixLength > maxPrefixLength){
                maxPrefixLength = prefixLength;
                firstWordIndex = i;
                secondWordIndex = j;
            }
        }
    }

    cout << words[firstWordIndex] << endl;
    cout << words[secondWordIndex] << endl;
    
    return 0;
}