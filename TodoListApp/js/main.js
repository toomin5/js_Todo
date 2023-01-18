window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || []; //key = todos 데이터 읽기 //JSON.parse = 문자열을 객체로변환
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  const username = localStorage.getItem("username") || ""; //key = username 데이터 읽기
  nameInput.value = username;

  nameInput.addEventListener("change", (evt) => {
    localStorage.setItem("username", evt.target.value); // username데이터 가져오기
  });

  newTodoForm.addEventListener("submit", (evt) => {
    evt.preventDefault(); //새로고침방지

    const todo = {
      //로컬스토리지 todos의 value값 객체
      content: evt.target.elements.content.value,
      category: evt.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo); //todos로 push
    localStorage.setItem("todos", JSON.stringify(todos)); //todos 데이터 가져오기 //JSON.stringify = 객체를 문자열로 변환

    evt.target.reset(); //form에서 submit이 일어나면 초기화

    DisplayTodos();
  });
  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = ""; //input값 초기화

  todos.forEach((todo) => {
    //todos에 있는 각각의 수 만큼 forEach문이 실행된다.
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox"; //완료 표시를위해 체크박스로 설정
    input.checked = todo.done; //check가 되면 todo.done

    /* 투두리스트 클래스 생성 -START- */

    span.classList.add("bubble");

    if (todo.category === "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }

    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`; //임의로 수정할 수 없게 readonly사용
    edit.innerHTML = "수정";
    deleteBtn.innerHTML = "삭제";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    /* -END- */

    if (todo.done) {
      todoItem.classList.add("done");
    }

    /* 완료한 투두리스트 체크기능 */
    input.addEventListener("click", (evt) => {
      todo.done = evt.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }
      DisplayTodos();
    });

    /* 내용 수정 기능 */
    edit.addEventListener("click", (evt) => {
      const input = content.querySelector("input"); //content의 input
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (evt) => {
        //blur = 해당엘리먼트의 포커스가 해제 되었을 때 발생한다. focusout도 있지만 버블링이 발생함
        input.setAttribute("readonly", true); //읽기전용
        todo.content = evt.target.value; //변경값 저장
        localStorage.setItem("todos", JSON.stringify(todos)); //로컬값 변경
        DisplayTodos();
      });
    });
    /* 삭제 기능 */
    deleteBtn.addEventListener("click", (evt) => {
      todos = todos.filter((LIST) => LIST != todo); // let arr = [1, 'a', 'b'];
      localStorage.setItem("todos", JSON.stringify(todos)); //arr.filter(v => v != 1)  1을 제외한 배열 생성
      DisplayTodos();
    });
  });
}
