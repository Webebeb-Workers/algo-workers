import java.io.*;
import java.util.*;

public class Main {
    static int N, M;
    static int[][] board;
    static boolean[][] visited;
    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, -1, 1};

    static class Point {
        int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        board = new int[N][M];

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < M; j++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        int time = 0;
        while (true) {
            mark();
            if(!melt()) break;
            time++;
        }

        System.out.println(time);
    }

    static void mark() {
        visited = new boolean[N][M];
        Queue<Point> q = new LinkedList<>();
        q.add(new Point(0,0));
        visited[0][0] = true;

        while(!q.isEmpty()) {
            Point p = q.poll();
            for(int d = 0; d < 4; d++) {
                int nx = p.x + dx[d];
                int ny = p.y + dy[d];

                if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

                if (!visited[nx][ny] && board[nx][ny] == 0) {
                    visited[nx][ny] = true;
                    q.add(new Point(nx, ny));
                }
            }
        }
    }

    static boolean melt() {
        List<Point> temp = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (board[i][j] == 1) {
                    int cnt = 0;
                    for (int d = 0; d < 4; d++) {
                        int nx = i + dx[d];
                        int ny = j + dy[d];
                        if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
                            if (board[nx][ny] == 0 && visited[nx][ny]){
                                cnt++;
                            }
                        }
                    }
                    if(cnt >= 2){
                        temp.add(new Point(i, j));
                    }
                }
            }
        }

        for (Point p : temp) {
            board[p.x][p.y] = 0;
        }

        return !temp.isEmpty();
    }
}