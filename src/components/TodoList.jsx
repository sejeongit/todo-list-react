import { useState } from 'react';
import '@/style/TodoList.scss';
import TodoCalendar from '@/components/TodoCalendar';

function TodoList() {    
    return (
        <div className="todo-list">
            <h1>ToDo List</h1>
            <TodoCalendar />
        </div>
    )
}

export default TodoList;

