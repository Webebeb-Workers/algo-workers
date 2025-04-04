class LinkedList {
  constructor(head) {
    this.head = head;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

function solution(n, k, cmd) {
  // 9:7 시작

  // 행 선택, 삭제, 복구 프로그램
  // 한 번에 한 행만 선택 가능
  // U X : X칸 위의 행 선택
  // D X : X칸 아래 행 선택
  // C: 현재 선택 행 삭제, 아래 행 선택, 삭제된 행이 가장 마지막 행이면 위의 행 선택
  // Z: 가장 최근에 삭제된 행 복구, 현재 선택된 행 바뀌지 않음
  // 입력: (처음 표 행 기수), k(처음 선택된 행의 위치), cmd(명령어 문자열)
  // 출력: 삭제x -> O 삭제o -> X 문자열 형태

  //---------------------------------------
  // 삭제, 삽입이 효율적인 방법 -> 배열x 링크드 리스트o
  // 이전 행으로도 이동해야 하므로 이중 연결 리스트로 해야함
  // 삽입할 때 원래 위치는 어떻게 기억하고 있찌?
  // stack에 넣기, 복구할 때는 prev와 next로 다시 연결해주기

  // 링크드 리스트 생성
  const getInitialLinkedList = () => {
    const nodes = Array.from({ length: n }, (_, index) => new Node(index));
    nodes.forEach((node, index) => {
      node.prev = nodes[index - 1] ?? null;
      node.next = nodes[index + 1] ?? null;
    });
    return new LinkedList(nodes[0]);
  };

  // 특정 데이터 값에 해당하는 노드 찾기
  const getCurrentNode = (linkedList, data) => {
    let currentNode = linkedList.head;

    while (currentNode !== null) {
      if (currentNode.data === data) return currentNode;
      currentNode = currentNode.next;
    }
  };

  const linkedList = getInitialLinkedList(); // 링크드 리스트 생성
  let currentNode = getCurrentNode(linkedList, k); // 처음 선택된 행의 위치(노드) 저장

  const deletedStack = [];

  cmd.forEach((item) => {
    const [oper, number] = item.split(" ");
    let jumpCount = Number(number);

    if (oper === "D") {
      while (jumpCount-- && currentNode.next !== null) currentNode = currentNode.next;
      return;
    }

    if (oper === "U") {
      while (jumpCount-- && currentNode.prev !== null) currentNode = currentNode.prev;
      return;
    }

    if (oper === "C") {
      deletedStack.push(currentNode);
      const nextNode = currentNode.next;

      if (currentNode.prev) {
        currentNode.prev.next = currentNode.next;
      }

      if (currentNode.next) {
        currentNode.next.prev = currentNode.prev;
        currentNode = currentNode.next;
      } else {
        currentNode = currentNode.prev;
      }

      return;
    }

    if (oper === "Z") {
      const deletedNode = deletedStack.pop();
      if (deletedNode.prev) {
        deletedNode.prev.next = deletedNode;
      }
      if (deletedNode.next) {
        deletedNode.next.prev = deletedNode;
      }

      return;
    }
  });

  const answer = Array.from({ length: n }, () => "O");
  deletedStack.forEach((node) => (answer[node.data] = "X"));
  return answer.join("");
}
