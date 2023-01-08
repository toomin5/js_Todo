# localStorage Todo List App
## 설명<br>
투두리스트를 이용하는 사용자에게 구분할 수 있게 카테고리로 나누어 구분하는데에 있어서 도움을 준다.<br>
## 사용한 기능<br>

1. 유저네임 표시 기능
2. 할 일 추가 기능
3. 할 일 수정,제거 기능
4. 완료된 할 일 표시 기능
5. 카테고리 기능
6. 로컬스토리지 기능
-------------------
### 기능 설명<br>
#### 유저네임 표시 기능
유저네임을 최상단에 표시해 자신만의 닉네임이나 이름을 볼 수 있다.<br>
로컬스토리지를 이용하여 이름을 기억할 수 있음<br>

    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || ''; //key = username 데이터 읽기
    nameInput.value = username;

    nameInput.addEventListener('change', evt => {
    localStorage.setItem('username', evt.target.value); // username데이터 가져오기
   
change는 값이 변경될 때 발생한다.
getItem과 setItem을 이용하여 key,value를 이용해 로컬스토리지에 저장함<br>

# js_Todo
