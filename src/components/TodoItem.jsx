function TodoItem ({
    todo,
    setTodos,
    setEditingId,
    setEditText,
    editingId,
    editText,
}) {

    // 완료한 항목 체크/해제
    const toggleTodo = (id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        )
    }
    
    // 할 일 삭제
    const deleteTodo = (id) => {
        // * filter ; 배열을 앞에서부터 하나씩 검사해서 콜백 함수가 true를 반환하는 요소들만 골라 새 배열로 만들어 반환함. 원래 배열은 변경하지 않음(비파괴).
        // - 형태 : array.filter((element, index, array) => boolean)
        // 불변성 유지: React 상태는 직접 변경하지 않는 게 안전해서(리액트의 재렌더링 의존), filter같이 새 배열을 반환하는 방법이 안전하고 권장됨.
    
        // 기존 배열에서 해당 인덱스 요소만 제거해 새 배열을 만든 후 상태 업데이트
        // 1. todos 배열을 순회하면서 콜백을 실행
        // 2. 현재 요소의 인덱스 i가 삭제하려는 index와 같지 않으면 true(유지), 같으면 false(제외)
        // setTodos(todos.filter((_, i) => i !== index)); // _는 element를 쓰지 않으니까 관습적으로 이름을 _로 쓴 것 -> 의미상으로는 무시되는 파라미터
    
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
    
    // 할 일 수정
    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    }
    
    const saveEdit = (id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => 
                todo.id === id ? {...todo, text: editText} : todo
            )
        );
        setEditingId(null);
    }

    return (
        <li>
            <input type="checkbox"
                className="done-btn"
                onChange={() => toggleTodo(todo.id)} />
                {editingId === todo.id ? (
                    <>
                        <input type="text"
                            className="edit-todo-input"
                            value={editText} 
                            onChange={(e) => setEditText(e.target.value)}
                        />
                        <button onClick={() => saveEdit(todo.id)}>저장</button>
                        <button onClick={() => setEditingId(null)}>취소</button>
                    </>
                ) : (
                    <>
                        <span className={todo.completed ? "todo-done" : ""}>
                            {todo.text}
                        </span>
                        <div className="btn-wrap">
                            <button className="edit-btn" onClick={() => {startEdit(todo)}}>
                                수정
                            </button>
                            <button className="delete-btn" onClick={() => {
                                confirm("삭제하시겠습니까?") ? deleteTodo(todo.id) : "";
                            }}>
                                삭제
                            </button>
                        </div>
                    </>
                )}
        </li>
    )
}

export default TodoItem;