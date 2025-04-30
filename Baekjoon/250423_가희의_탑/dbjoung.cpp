#include <stdio.h>
int main() {
    int N, a, b;
    scanf("%d %d %d", &N, &a, &b);
    
    int midHeight = (a>b) ? a : b;
    int midIndex = N-(b-1);
    int sameIndex = midIndex-a+1;

    int array[N+1];
    if (a==1) midIndex=1;
    for (int i=1 ; i<midIndex ; i++) {
        if (i<=sameIndex) array[i]=1;
        else array[i]=array[i-1]+1;
    }
    array[midIndex]=midHeight;
    
    for (int i=sizeof(array)/sizeof(int)-1, bValue=1 ; i>midIndex ; i--, bValue++) {
        if (bValue<b) array[i]=bValue;
        else array[i]=1;
    }
    
    if (a+b-1<=N) {
        for (int i=1 ; i<sizeof(array)/sizeof(int) ; i++) {
            printf("%d ", array[i]);
        }  
    } else printf("-1");
}