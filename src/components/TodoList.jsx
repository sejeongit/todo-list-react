import { useState } from 'react';
import '@/style/TodoList.scss';
import TodoListInput from '@/components/TodoListInput';
import TodoCalendar from '@/components/TodoCalendar';

function TodoList() {
    const [todos, setTodos] = useState([]);

    return (
        <div className="todo-list">
            <h1>ToDo List</h1>
            <TodoListInput setTodos={setTodos}/>
            <TodoCalendar todos={todos} setTodos={setTodos} />
        </div>
    )
}

export default TodoList;

