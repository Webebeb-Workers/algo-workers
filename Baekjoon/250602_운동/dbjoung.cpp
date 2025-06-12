#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <algorithm>
#include <vector>
#include <limits>

using namespace std;

int main()
{   
    int V, E;
    scanf("%d %d", &V, &E);


    int map[401][401];
    fill(&map[0][0], &map[0][0] + 401 * 401, numeric_limits<int>::max());

    for (int e = 0; e < E; e++) {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);

        map[a][b] = c;
    }

    for (int c = 1; c <= V; c++) {
        for (int s = 1; s <= V; s++) {
            for (int e = 1; e <= V; e++) {
                int sum = map[s][c] + map[c][e];
                if (sum < 1) sum = numeric_limits<int>::max();
                if (sum < map[s][e]) map[s][e] = sum;
            }
        }
    }

    int minRoute = numeric_limits<int>::max();
    for (int v = 1; v <= V; v++) {
        minRoute = min(minRoute, map[v][v]);
    }
    
    if (minRoute != numeric_limits<int>::max()) printf("%d", minRoute);
    else printf("-1");
    return 0;
}