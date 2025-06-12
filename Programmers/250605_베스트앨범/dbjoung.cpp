#include <iostream>
#include <string>
#include <vector>
#include <utility>
#include <map>
#include <algorithm>

using namespace std;

struct CompSong {
    bool operator()(pair<int, int>& a, pair<int, int>& b) {
        return a.second > b.second;
    }
};

struct Comp {
    map<string, pair<int, vector<pair<int, int>>>>& dic;
    Comp(map<string, pair<int, vector<pair<int, int>>>>& _dic) : dic(_dic) {}
    
    bool operator()(string& a, string& b) {
        return dic[a].first > dic[b].first;
    }
};

vector<int> solution(vector<string> genres, vector<int> plays) {
    // map에 장르명을 키로, 총 재생수와 {인덱스, 조회수} 쌍으로 값 넣음
    // genres, plays 순회하면서 map에 값 저장
    // 장르 배열 따로 선언해서 총 재생수 순으로 정렬
    // 정렬 후, 해당 장르 순으로 map 탐색하며 재생수 정렬 & 앞 2개 인덱스 구하기
    
    vector<int> result;
    
    map<string, pair<int, vector<pair<int, int>>>> dic;
    vector<string> genList;
    
    for (int i=0 ; i<genres.size() ; i++) {
        if (dic.find(genres[i]) == dic.end()) {
            dic.insert({genres[i], make_pair(
                plays[i],
                vector<pair<int, int>>(1, make_pair(i, plays[i]))
            )});
            genList.push_back(genres[i]);
        } else {
            dic[genres[i]].first+=plays[i];
            dic[genres[i]].second.push_back(make_pair(i, plays[i]));
        }
    }
    
    sort(genList.begin(), genList.end(), Comp(dic));
    
    for (string& genName : genList) {
        vector<pair<int, int>>& songList = dic[genName].second;
        sort(songList.begin(), songList.end(), CompSong());
        
        result.push_back(songList[0].first);
        if (songList.size()>1) result.push_back(songList[1].first);
    }
    
    return result;
}