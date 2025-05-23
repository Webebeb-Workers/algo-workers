#include <iostream>
#include <queue>
#include <vector>

using namespace std;

const int SIZE = 101;
const int INF = (~0U >> 2);
const vector<pair<int, int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

int dijkstra(int map[SIZE][SIZE], int N) {
    int dist[SIZE][SIZE];
    for(int i = 0; i < N; i++) {
        for(int j = 0; j < N; j++) {
            dist[i][j] = INF;
        }
    }

    priority_queue<pair<int, pair<int, int>>, vector<pair<int, pair<int,int>>>, greater<pair<int, pair<int,int>>>> pq;

    dist[0][0] = map[0][0];  
    pq.push({dist[0][0], {0, 0}});

    while (!pq.empty()) {
        int cost = pq.top().first;
        int y = pq.top().second.first;
        int x = pq.top().second.second;
        pq.pop();

        if (dist[y][x] < cost) continue; 

        for (const auto& [dy, dx] : directions) {
            int newY = y + dy;
            int newX = x + dx;

            if (newY < 0 || newX < 0 || newY >= N || newX >= N) continue;

            int new_cost = cost + map[newY][newX];
            if (dist[newY][newX] <= new_cost) continue; 

            dist[newY][newX] = new_cost;
            pq.push({new_cost, {newY, newX}});
        }
    }

    return dist[N - 1][N - 1]; 
}

int main() {
    ios::sync_with_stdio(0);    
    cin.tie(0);
    
	int T;
    cin >> T;

    for (int test_case = 1; test_case <= T; ++test_case) {
        int N;
        cin >> N;

        int map[SIZE][SIZE];

        for (int i = 0; i < N; i++) {
            string row;
            cin >> row;
            for(int j=0; j<row.size(); j++) {
            	map[i][j] = row[j]-'0';
            }
        }

        int answer = dijkstra(map, N);

        cout << "#" << test_case << " " << answer << "\n";
    }

    return 0;
}
