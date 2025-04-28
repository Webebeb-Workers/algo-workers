#include <stdio.h>
#include <string>
#include <vector>

using namespace std;
typedef vector<vector<int>> Array;

void rotateKey(Array* key) {
    int keySize = (*key).size();
    Array newKey(keySize, vector<int>(keySize));
    for (int i=0 ; i<newKey.size() ; i++) {
        for (int j=0 ; j<newKey.size() ; j++) {
            newKey[i][j] = (*key)[keySize-j-1][i];
        }
    }
    
    (*key) = newKey;
}

bool isMatch(Array* key, Array* lock, int li, int lj, int numOfBlank) {
    int count = 0;
    for (int ki = 0 ; ki<(*key).size() ; ki++) {
        for (int kj=0 ; kj<(*key).size() ; kj++) {
            int ci = li+ki, cj = lj+kj;
            if (ci<0 || cj<0 || ci>=(*lock).size() || cj>=(*lock).size()) continue;
            if ((*key)[ki][kj]+(*lock)[ci][cj]!=1) return false;
            if ((*lock)[ci][cj]==0) count++;
        }
    }
    
    if (count==numOfBlank) return true;
    else return false;
}

bool solution(Array key, Array lock) {
    int numOfBlank = 0;
    for (int i=0 ; i<lock.size() ; i++) {
        for (int j=0 ; j<lock.size() ; j++) {
            if (!lock[i][j]) numOfBlank++;
        }
    }
    
    // 네 방향 돌기
    for (int d=0 ; d<4 ; d++) {
        int keySize = key.size();
        int lockSize = lock.size();
                
        // 사각형 순회
        for (int li = 1 - keySize; li < lockSize; li++) {
            for (int lj = 1 - keySize; lj < lockSize; lj++) {
                if (isMatch(&key, &lock, li, lj, numOfBlank)) return true;
            }
        }
        
        // 방향 회전
        if (d<3) rotateKey(&key);
    }
    
    return false;
}