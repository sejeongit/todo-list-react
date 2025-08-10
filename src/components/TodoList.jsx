import { useState } from 'react';
import '../style/TodoList.scss';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    // 할 일 추가
    const addTodo = () => {
        // input에 공백밖에 없을 시 return
        if(input.trim() === '') return; // * trim : 문자열 앞뒤 공백 제거
        // 새로운 할 일을 기존 배열에 추가
        setTodos([...todos, {text: input, completed: false}]); // ...todos 는 기존 배열 복사
        setInput('');
    }

    // 완료한 항목 체크/해제
    const toggleTodo = (index) => {
        const newTodos = [...todos]; // 원본 배열 복사
        // 클릭한 할 일의 완료 상태를 true <-> false 로 토글
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    // 할 일 삭제
    const deleteTodo = (index) => {
        // * filter ; 배열을 앞에서부터 하나씩 검사해서 콜백 함수가 true를 반환하는 요소들만 골라 새 배열로 만들어 반환함. 원래 배열은 변경하지 않음(비파괴).
        // - 형태 : array.filter((element, index, array) => boolean)
        // 불변성 유지: React 상태는 직접 변경하지 않는 게 안전해서(리액트의 재렌더링 의존), filter같이 새 배열을 반환하는 방법이 안전하고 권장됨.

        // 기존 배열에서 해당 인덱스 요소만 제거해 새 배열을 만든 후 상태 업데이트
        // 1. todos 배열을 순회하면서 콜백을 실행
        // 2. 현재 요소의 인덱스 i가 삭제하려는 index와 같지 않으면 true(유지), 같으면 false(제외)
        setTodos(todos.filter((_, i) => i !== index)); // _는 element를 쓰지 않으니까 관습적으로 이름을 _로 쓴 것 -> 의미상으로는 무시되는 파라미터
    }

    return (
        <div className="todo-list">
            <h1>ToDo List</h1>
            <input value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="할 일 입력"
            />
            <button className="add-btn" onClick={addTodo}>추가</button>

            <ul>
                {todos.map((todo, index) => (
                    <li key={index} className={todo.completed ? "todo-done" : ""}>
                        {todo.text}
                        <button className="done-btn" onClick={() => toggleTodo(index)}>
                            {todo.completed ? "취소" : "완료"}
                        </button>
                        <button className="delete-btn" onClick={() => {
                            confirm("삭제하시겠습니까?") ? deleteTodo(index) : "";
                        }}>
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;

