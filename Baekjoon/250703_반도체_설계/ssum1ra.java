import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int[] ports = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());

        for (int i = 0; i < n; i++) {
            ports[i] = Integer.parseInt(st.nextToken());
        }

        List<Integer> lis = new ArrayList<>();

        for (int port : ports) {
            int idx = Collections.binarySearch(lis, port);
            if (idx < 0) idx = -idx - 1;

            if (idx == lis.size()) {
                lis.add(port);
            } else {
                lis.set(idx, port);
            }
        }

        System.out.println(lis.size());
    }
}
