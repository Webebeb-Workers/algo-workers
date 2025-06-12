#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    int N;
    scanf("%d", &N);

    int A[N];
    for (int i=0 ; i<N ; i++) {
        scanf("%d", &A[i]);
    }

    sort(A, A+N);
    int count = 0;
    for (int i=0 ; i<N ; i++) {
        int left = 0, right = N-1;
        if (i==left) left++;
        if (i==right) right--;
        while(left<right) {
            int sum = A[left] + A[right];
            if (sum == A[i]) {
                count++;
                break;
            } else if (sum < A[i]) {
                if (left+1==i) left+=2;
                else left++;
            } else {
                if (right-1==i) right-=2;
                else right--;
            } 
        }
    }

    printf("%d", count);
}