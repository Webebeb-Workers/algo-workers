import java.io.*;
import java.util.*;

public class Main {
    static boolean[][] visited = new boolean[1501][1501];
    static int total;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        int A = Integer.parseInt(st.nextToken());
        int B = Integer.parseInt(st.nextToken());
        int C = Integer.parseInt(st.nextToken());
        total = A + B + C;

        if (total % 3 != 0) {
            System.out.println(0);
            return;
        }

        bfs(A, B, C);
    }

    static void bfs(int a, int b, int c) {
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{a, b});
        visited[a][b] = true;

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int x = cur[0], y = cur[1];
            int z = total - x - y;

            if (x == y && y == z) {
                System.out.println(1);
                return;
            }

            int[] arr = {x, y, z};

            for (int i = 0; i < 3; i++) {
                for (int j = i + 1; j < 3; j++) {
                    if (arr[i] == arr[j]) continue;

                    int small = Math.min(arr[i], arr[j]);
                    int big = Math.max(arr[i], arr[j]);

                    int[] next = {small * 2, big - small, total - small * 2 - (big - small)};
                    Arrays.sort(next);

                    int a1 = next[0], a2 = next[1];
                    if (!visited[a1][a2]) {
                        visited[a1][a2] = true;
                        q.add(new int[]{a1, a2});
                    }
                }
            }
        }

        System.out.println(0);
    }
}