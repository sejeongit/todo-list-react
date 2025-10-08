import { useState } from 'react';
import { createEventId } from '@/js/eventUtils.js';

function TodoListInput({setTodos}) {
    const [inputVal, setInput] = useState('');
    let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

    const addInputTodo = () => {
        // input에 공백밖에 없을 시 return
        if(inputVal.trim() === '') return; // * trim : 문자열 앞뒤 공백 제거

        const newTodo = {
            id: createEventId(),
            title: inputVal,
            start: todayStr,
            allDay: true,
            extendedProps : {
                completed: false,
                priority: false,
            }
        }
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setInput('');
    }

    return (
        <>
            <div className="todo-input-wrap">
                <input type="text" 
                    className="add-todo-input"
                    value={inputVal}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="할 일 입력"
                />
                <button className="add-btn" onClick={addInputTodo}>추가</button>
            </div>
        </>
    )
}

export default TodoListInput;