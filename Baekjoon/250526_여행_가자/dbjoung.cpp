#include <iostream>
#include <cmath>

int main() {
    int N, M;
    scanf("%d\n%d", &N, &M);

    int board[N+1][N+1];

    for (int i=1 ; i<=N ; i++) {
        for (int j=1 ; j<=N ; j++) {
            scanf("%d", &board[i][j]);
            if (i==j) board[i][j] = 1;
        }
    }

    int roads[M];
    for (int i=0 ; i<M ; i++) {
        scanf("%d", &roads[i]);
    }

    for (int i=1 ; i<=N ; i++) {
        for (int s=1 ; s<=N ; s++) {
            for (int e=1 ; e<=N ; e++) {
                if (board[s][e] || (board[s][i] && board[i][e])) board[s][e] = 1;
            }
        }
    }

    int result = 1;
    for (int i=1 ; i<M ; i++) {
        if (board[roads[i-1]][roads[i]]==0) {
            result = 0;
            break;
        }
    }

    if (result == 1) printf("YES");
    else printf("NO");
}