#include <cstdio>
#include <cstring>
#include <vector>

using namespace std;

bool canMake(char (*s)[402]) {
    int len1 = strlen(s[0]);
    int len2 = strlen(s[1]);
    int len3 = strlen(s[2]);
    
    vector<vector<bool>> d(202, vector(202, false));

    d[0][0] = true;

    for (int i1 = 0 ; i1 <= len1 ; i1++) {
        for (int i2 = 0 ; i2 <= len2 ; i2++) {
            if (d[i1][i2] && s[0][i1] == s[2][i1+i2]) d[i1+1][i2] = true;
            if (d[i1][i2] && s[1][i2] == s[2][i1+i2]) d[i1][i2+1] = true;
        }
    }
    
    return d[len1][len2];
    
}

int main() {
    int N;
    scanf("%d", &N);

    vector<bool> result;
    for (int n=0 ; n<N ; n++) {
        char s[3][402];
        for (int i=0 ; i<=2 ; i++) {
            scanf("%s", s[i]);
        }

        if (canMake(s)) result.push_back(true);
        else result.push_back(false);
    }

    for (int i=0 ; i<result.size() ; i++) {
        printf("Data set %d: %s\n", i+1, (result[i]) ? "yes" : "no");
    }
}