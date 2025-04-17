#include <string>
#include <vector>
#include <algorithm>

using namespace std;

const int INF = 1e9;

int solution(int n, int s, int a, int b, vector<vector<int>> fares) {
    vector<vector<int>> graph(n+1, vector<int>(n+1, INF));
    for(const auto& fare : fares){
        graph[fare[0]][fare[1]] = fare[2];
        graph[fare[1]][fare[0]] = fare[2];
    }
    
    for(int i = 1; i <= n; i++){
        graph[i][i] = 0;
    }
    
    for(int k = 1; k <= n; k++){
        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= n; j++){
                if(graph[i][k] == INF || graph[k][j] == INF) continue;
                graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j]);
            }
        }
    }
    
    long long answer = INF;
    for(int k = 1; k <= n; k++){
        answer = min(answer, (long long)graph[s][k] + graph[k][a] + graph[k][b]);
    }
    
    return answer;
}