import { useState } from 'react';

function TodoListInput({setTodos}) {
    const [inputVal, setInput] = useState('');

    // 할 일 추가
    const addTodo = () => {
        // input에 공백밖에 없을 시 return
        if(inputVal.trim() === '') return; // * trim : 문자열 앞뒤 공백 제거

        setTodos((prevTodos) => [
                ...prevTodos, // 이전 배열 복사
                {
                    id: Date.now(),
                    text: inputVal,
                    completed: false,
                    editing: false,
                    editText: ""
                }
        ]);
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
                <button className="add-btn" onClick={addTodo}>추가</button>
            </div>
        </>
    )
}

export default TodoListInput;