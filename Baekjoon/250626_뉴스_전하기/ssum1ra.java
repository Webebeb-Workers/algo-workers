import java.io.*;
import java.util.*;

public class Main {
    static List<List<Integer>> tree = new ArrayList<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());

        for(int i = 0; i < n; i++){
            tree.add(new ArrayList<>());
        }

        for(int i = 0; i < n; i++){
            int p = Integer.parseInt(st.nextToken());
            if(p != -1){
                tree.get(p).add(i);
            }
        }

        System.out.println(dfs(0));
    }

    private static int dfs(int node){
        List<Integer> times = new ArrayList<>();

        for(int child : tree.get(node)){
            times.add(dfs(child));
        }

        times.sort(Collections.reverseOrder());

        int maxTime = 0;
        for(int i = 0; i < times.size(); i++){
            int wait = i + 1;
            maxTime = Math.max(maxTime, times.get(i) + wait);
        }
        return maxTime;
    }
}