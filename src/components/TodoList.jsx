import { useState } from 'react';
import '@/style/TodoList.scss';
import Todo from '@/components/TodoItem';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputVal, setInput] = useState('');
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 todo id
    const [editText, setEditText] = useState('');     // 수정 입력 값

    // 할 일 추가
    const addTodo = () => {
        // input에 공백밖에 없을 시 return
        if(inputVal.trim() === '') return; // * trim : 문자열 앞뒤 공백 제거

        setTodos((prevTodos) => [
                ...prevTodos, // 이전 배열 복사
                {id: Date.now(), text: inputVal, completed: false}
        ]);
        setInput('');
    }

    return (
        <div className="todo-list">
            <h1>ToDo List</h1>
            <input type="text" 
                className="add-todo-input"
                value={inputVal}
                onChange={(e) => setInput(e.target.value)}
                placeholder="할 일 입력"
            />
            <button className="add-btn" onClick={addTodo}>추가</button>

            <ul>
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        setTodos={setTodos}
                        setEditingId={setEditingId}
                        setEditText={setEditText}
                        editingId={editingId}
                        editText={editText}
                    />
                ))}
            </ul>
        </div>
    )
}

export default TodoList;

