# localStorage Todo List App

## 설명<br>

투두리스트를 이용하는 사용자에게 구분할 수 있게 카테고리로 나누어 구분하는데에 있어서 도움을 준다.<br>

## 사용한 기능<br>

1. 로그인 기능
2. 할 일 추가기능
3. 할 일 수정,제거기능
4. 완료된 할 일 표시기능
5. 카테고리 기능
6. 로컬스토리지 기능

---

## 기능 설명<br>

### load이벤트<br>

브라우저는 사용자인터페이스 -> 브라우저엔진 -> 렌더링엔진 ->통신,js해석기,ui백엔드 (자료저장소) 같은방식으로 작동한다
자바스크립트가 html보다 앞에 나오는 경우에 좋지만, 자바스크립트는 그뒤에 두는것이 성능향상에 좋다고함..
안써도 무방하다고 한다.

### 로그인 기능

유저네임 입력후 최상단에 표시해 자신만의 닉네임이나 이름을 볼 수 있다.<br>
로컬스토리지를 이용하여 이름을 기억할 수 있음<br>

    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || ''; //key = username 데이터 읽기
    nameInput.value = username;

    nameInput.addEventListener('change', evt => {
    localStorage.setItem('username', evt.target.value); // username데이터 가져오기

change는 값이 변경될 때 발생한다.
getItem과 setItem을 이용하여 key,value를 이용해 로컬스토리지에 저장함<br>

### 할 일 추가기능

텍스르를 입력하면 밑에 자신이 입력한 텍스트와함께 리스트가 생성된다.<br>

    newTodoForm.addEventListener('submit', evt => {
    evt.preventDefault();                   //새로고침방지

    const todo = {                 //로컬스토리지 todos의 value값 객체
      content: evt.target.elements.content.value,
      category: evt.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime()
    }

    todos.push(todo);                       //todos로 push
    localStorage.setItem('todos', JSON.stringify(todos)); //todos 데이터 가져오기               //JSON.stringify = 객체를 문자열로 변환

    evt.target.reset();             //form에서 submit이 일어나면 초기화

    DisplayTodos();
    })

폼에서submit발생하면 todo객체를 todos배열에 푸쉬하고 화면은초기화한다.<br>

### 할 일 수정,제거기능<br>

리스트가 생성되면 수정,삭제버튼을 눌러 내용을 변경할 수 있다.<br>

    /* 내용 수정 기능 */
    edit.addEventListener('click', evt => {
      const input = content.querySelector('input'); //content의 input
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', evt => { //blur = 해당엘리먼트의 포커스가 해제 되었을 때 발생한다. focusout도 있지만 버블링이 발생함
          input.setAttribute('readonly', true); //읽기전용
          todo.content = evt.target.value; //변경값 저장
          localStorage.setItem('todos', JSON.stringify(todos)); //로컬값 변경
          DisplayTodos();
      })
    })
    /* 삭제 기능 */
    deleteBtn.addEventListener('click', evt => {
      todos = todos.filter(LIST => LIST != todo);            // let arr = [1, 'a', 'b'];
      localStorage.setItem('todos', JSON.stringify(todos));  //arr.filter(v => v != 1)  1을 제외한 배열 생성
      DisplayTodos();
    })

수정버튼은 input값에 readonly속성을 해제하면서 수정할 수 있게 구현하였고<br>
삭제버튼은 리스트가 들어있는 todos배열에 filter를 사용하여 선택한 리스트가 제거된 새 배열을 받아 제거하는 방식<br>

### 완료된 할 일 체크기능<br>

리스트 객체에서 done이라는 값을 true,false로 받고 체크를해서 done의 값이 true가 되면<br>
line-throught속성을 적용해 표시해준다<br>

    if(todo.done){
      todoItem.classList.add('done');
    }

    /* 완료한 투두리스트 체크기능 */
    input.addEventListener('click', evt => {
      todo.done = evt.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if(todo.done){
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }
      DisplayTodos();
    })

### 카테고리 기능<br>

todoList를 생성하면서 체크박스를 통해 선택된 span클래스틀 추가해준다.

    if (todo.category === "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }

### 로컬스토리지<br>

로컬스토리지에 저장하여 데이터를 저장한다.

    todos = JSON.parse(localStorage.getItem("todos")) || []; //key = todos 데이터 읽기 //JSON.parse = 문자열을 객체로변환
    const username = localStorage.getItem("username") || ""; //key = username 데이터 읽기
