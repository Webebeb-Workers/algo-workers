#include <string>
#include <vector>
#include <set>
#include <unordered_map>

using namespace std;

vector<int> solution(vector<string> gems) {
    int total_types = set<string>(gems.begin(), gems.end()).size();
    unordered_map<string, int> cnt;
    
    int l = 0, r = 0;
    int min_len = gems.size() + 1;
    int res_l = 0, res_r = 0;
    
    while(r < gems.size()){
        cnt[gems[r]]++;
        r++;
        
        while(cnt.size() == total_types){
            if(r - l < min_len){
                min_len = r - l;
                res_l = l + 1;
                res_r = r;
            }
            cnt[gems[l]]--;
            if(cnt[gems[l]] == 0){
                cnt.erase(gems[l]);
            }
            l++;
        }
    }
    
    return {res_l, res_r};
}