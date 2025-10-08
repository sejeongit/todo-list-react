import { useState } from "react";
import TodoEditModal from "@/components/TodoEditModal";

function TodoItem ({
    todo,
    setTodos,
    modalOpen,
    setModalOpen,
    currentEvent,
    setCurrentEvent
}) {
    console.log(todo)
    // 현재 todo 객체 (eventInfo)
    const eventInfo = todo.event;
    const todoExtendedProps = eventInfo.extendedProps;
    // 수정 중인 객체
    // const [editingTodo, setEditingTodo] = useState(null);

    // 중요도 체크
    const togglePriority = () => {
        setTodos((prevTodos) => 
            prevTodos.map((t) =>
                t.id === eventInfo.id ? {...t, priority: !t.priority} : t
            )
        )
    }

    // 완료한 항목 체크
    const toggleTodo = () => {
        setTodos((prevTodos) => 
            prevTodos.map((t) =>
                t.id === eventInfo.id ? {...t, completed: !t.completed} : t
            )
        )
    }
    
    // 할 일 삭제
    const deleteTodo = () => {
        // * filter ; 배열을 앞에서부터 하나씩 검사해서 콜백 함수가 true를 반환하는 요소들만 골라 새 배열로 만들어 반환함. 원래 배열은 변경하지 않음(비파괴).
        // - 형태 : array.filter((element, index, array) => boolean)
        // 불변성 유지: React 상태는 직접 변경하지 않는 게 안전해서(리액트의 재렌더링 의존), filter같이 새 배열을 반환하는 방법이 안전하고 권장됨.
    
        // 기존 배열에서 해당 인덱스 요소만 제거해 새 배열을 만든 후 상태 업데이트
        // 1. todos 배열을 순회하면서 콜백을 실행
        // 2. 현재 요소의 인덱스 i가 삭제하려는 index와 같지 않으면 true(유지), 같으면 false(제외)
        // setTodos(todos.filter((_, i) => i !== index)); // _는 element를 쓰지 않으니까 관습적으로 이름을 _로 쓴 것 -> 의미상으로는 무시되는 파라미터
    
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== eventInfo.id));
    }

    // 수정 모달 열기
    const openEditModal = () => {
        setCurrentEvent('edit');
        setModalOpen(true);
    };

    return (
        <>
            <li id={eventInfo.id}>
                <div className="checkbox-wrap">
                    <input type="checkbox" className="priority-btn" onChange={togglePriority}/><span>중요</span>
                    <input type="checkbox" className="done-btn" onChange={toggleTodo}/><span>완료</span>
                </div>
                <p className={todoExtendedProps.completed ? "todo-done" : ""}>
                    {eventInfo.title}
                </p>
                <div className="btn-wrap">
                    <button className="edit-btn" onClick={() => {openEditModal(eventInfo)}}>
                        수정
                    </button>
                    <button className="delete-btn" onClick={() => {
                        confirm("삭제하시겠습니까?") ? deleteTodo() : "";
                    }}>
                        삭제
                    </button>
                </div>
            </li>
            <TodoEditModal
                initialValues={eventInfo}
                isOpen={modalOpen}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
            />
        </>
    )
}

export default TodoItem;