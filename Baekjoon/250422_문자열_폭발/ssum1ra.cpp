#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    cin >> s;
    string bomb;
    cin >> bomb;
    int l = bomb.length();

    bool isExist = true;
    while(isExist){
        isExist = false;
        int i = 0;
        while(i + l <= s.length()){
            if(bomb == s.substr(i, l)){
                s.erase(i, l);
                isExist = true;
            } else i++;
        }
    }

    if(s.length() == 0) cout << "FRULA" << endl;
    else cout << s << endl;

    return 0;
}