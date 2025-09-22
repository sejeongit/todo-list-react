import { useState } from 'react';
import '@/style/TodoList.scss';
import TodoListInput from '@/components/TodoListInput';
import TodoPrioritySelect from '@/components/TodoPrioritySelect';
import TodoCalendar from '@/components/TodoCalendar';
import { INITIAL_EVENTS } from '@/js/eventUtils';

function TodoList() {
    const [todos, setTodos] = useState(INITIAL_EVENTS);
    console.log(todos);
    
    return (
        <div className="todo-list">
            <h1>ToDo List</h1>
            <TodoListInput setTodos={setTodos}/>
            <TodoPrioritySelect />
            <TodoCalendar todos={todos} setTodos={setTodos} />
        </div>
    )
}

export default TodoList;

