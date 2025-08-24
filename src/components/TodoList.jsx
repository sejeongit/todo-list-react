import { useState } from 'react';
import '@/style/TodoList.scss';
import TodoItem from '@/components/TodoItem';
import TodoListInput from '@/components/TodoListInput';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 todo id
    const [editText, setEditText] = useState('');     // 수정 입력 값

    return (
        <div className="todo-list">
            <h1>ToDo List</h1>
            <TodoListInput setTodos={setTodos}/>

            <ul>
                {todos.map((todo) => (
                    <TodoItem
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

