#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <algorithm>

using namespace std;

struct Node {
    string name;
    map<string, Node*> nexts;
    vector<string> childNames;

    Node(const string& n) : name(n) {}

    Node* getPutChild(const string& key) {
        auto it = nexts.find(key);
        if (it != nexts.end()) {
            return it->second;
        }
        else {
            Node* child = new Node(key);
            nexts[key] = child;
            childNames.push_back(key);
            return child;
        }
    }
};

struct Comp {
    bool operator()(string& a, string& b) {
        return a < b;
    }
};

void printTree(Node* node, int depth = 0) {
    if (node->name != "ROOT") cout << string((depth-1) * 2, '--') << node->name << "\n";
    sort(node->childNames.begin(), node->childNames.end(), Comp());
    for (auto& name : node->childNames) {
        printTree(node->nexts[name], depth + 1);
    }
}

int main() {
    int N;
    scanf("%d", &N);

    Node* root = new Node("ROOT");

    for (int i = 0; i < N; ++i) {
        int K;
        scanf("%d", &K);

        Node* cur = root;
        for (int k = 0; k < K; ++k) {
            string word;
            cin >> word;
            cur = cur->getPutChild(word);
        }
    }

    printTree(root);

    return 0;
}