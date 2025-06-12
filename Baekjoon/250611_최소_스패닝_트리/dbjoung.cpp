#include <iostream>
#include <vector>
#include <algorithm>
#include <tuple>

using namespace std;

struct Comp {
    bool operator()(tuple<int, int, int>& a, tuple<int, int, int>& b) {
        return get<2>(a) > get<2>(b);
    }
};

int getParent(int vertex[], int node) {
    if (vertex[node] == node) return node;

    return vertex[node] = getParent(vertex, vertex[node]);
}

bool isSameGroup(int vertex[], int a, int b) {
    int aParent = getParent(vertex, a);
    int bParent = getParent(vertex, b);

    if (aParent == bParent) return true;

    if (aParent < bParent) {
        vertex[bParent] = aParent;
    }
    else if (aParent > bParent) {
        vertex[aParent] = bParent;
    }

    return false;
}

int main() {
    int V, E;
    scanf("%d %d", &V, &E);

    vector<tuple<int, int, int>> edgeList;

    for (int e = 0; e < E; e++) {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        edgeList.push_back(make_tuple(a, b, c));
    }

    sort(edgeList.begin(), edgeList.end(), Comp());

    int vertex[10001];
    for (int v = 1; v <= V; v++) {
        vertex[v] = v;
    }
    
    long long sum = 0;
    int count = 0;
    while (edgeList.size()>0) {
        tuple<int, int, int> curNode = edgeList[edgeList.size() - 1];
        edgeList.pop_back();

        int a = get<0>(curNode);
        int b = get<1>(curNode);
        int w = get<2>(curNode);

        if (isSameGroup(vertex, a, b)) continue;
        else {
            sum += (long long)w;
            count++;
        }

        if (count == V - 1) break;
    }

    printf("%lld", sum);

    return 0;
}
