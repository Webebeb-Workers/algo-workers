#include <iostream>
#include <string>

using namespace std;

int main() {
    string s, bomb;
    cin >> s >> bomb;

    string result;
    int blen = bomb.length();

    for(auto c : s) {
        result += c;

        if(result.length() >= blen && result.substr(result.length() - blen) == bomb){
            result.erase(result.length() - blen);
        }
    }
    
    if(result.empty()) cout << "FRULA" << endl;
    else cout << result << endl;

    return 0;
}