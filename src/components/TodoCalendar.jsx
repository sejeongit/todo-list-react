import React from 'react';
import { useState } from 'react';
import TodoListInput from '@/components/TodoListInput';
import TodoPrioritySelect from '@/components/TodoPrioritySelect';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { INITIAL_EVENTS } from '@/js/eventUtils';
import { createEventId } from '@/js/eventUtils.js'
import TodoItem from '@/components/TodoItem'
import TodoEditModal from '@/components/TodoEditModal';

// function TodoItem ({todo, setTodos}) {
//     // 현재 todo 객체 (eventInfo)
//     const eventInfo = todo.event;
//     const todoExtendedProps = eventInfo.extendedProps;

//     // 중요도 체크
//     const togglePriority = () => {
//         setTodos((prevTodos) => 
//             prevTodos.map((t) =>
//                 t.id === eventInfo.id ? {...t, priority: !t.priority} : t
//             )
//         )
//     }

//     // 완료한 항목 체크
//     const toggleTodo = () => {
//         setTodos((prevTodos) => 
//             prevTodos.map((t) =>
//                 t.id === eventInfo.id ? {...t, completed: !t.completed} : t
//             )
//         )
//     }

//     const handleEventClick = (eventInfo) => {
//         // 클릭 이벤트 정보 가져와 modal 열기
//         setEditingEvent({
//             id: eventInfo.id,
//             title: eventInfo.title,
//             start: eventInfo.startStr,
//             end: eventInfo.endStr || eventInfo.startStr,
//             allDay: eventInfo.allDay
//         });
//         setCurrentEvent('edit');
//         setModalOpen(true);
//     }
    
//     // 할 일 삭제
//     const deleteTodo = () => {
//         // * filter ; 배열을 앞에서부터 하나씩 검사해서 콜백 함수가 true를 반환하는 요소들만 골라 새 배열로 만들어 반환함. 원래 배열은 변경하지 않음(비파괴).
//         // - 형태 : array.filter((element, index, array) => boolean)
//         // 불변성 유지: React 상태는 직접 변경하지 않는 게 안전해서(리액트의 재렌더링 의존), filter같이 새 배열을 반환하는 방법이 안전하고 권장됨.
    
//         // 기존 배열에서 해당 인덱스 요소만 제거해 새 배열을 만든 후 상태 업데이트
//         // 1. todos 배열을 순회하면서 콜백을 실행
//         // 2. 현재 요소의 인덱스 i가 삭제하려는 index와 같지 않으면 true(유지), 같으면 false(제외)
//         // setTodos(todos.filter((_, i) => i !== index)); // _는 element를 쓰지 않으니까 관습적으로 이름을 _로 쓴 것 -> 의미상으로는 무시되는 파라미터
//         setTodos((prevTodos) => prevTodos.filter((t) => t.id !== eventInfo.id));
//     }

//     return (
//         <li>
//             <div className="checkbox-wrap">
//                 <input type="checkbox" className="priority-btn" onChange={togglePriority}/><span>중요</span>
//                 <input type="checkbox" className="done-btn" onChange={toggleTodo}/><span>완료</span>
//             </div>
//             <p className={todoExtendedProps.completed ? "todo-done" : ""}>
//                 {eventInfo.title}
//             </p>
//             <div className="btn-wrap">
//                 <button className="edit-btn" onClick={() => {handleEventClick(eventInfo)}}>
//                     수정
//                 </button>
//                 <button className="delete-btn" onClick={() => {
//                     confirm("삭제하시겠습니까?") ? deleteTodo() : "";
//                 }}>
//                     삭제
//                 </button>
//             </div>
//         </li>
//     )
// }


function TodoCalendar() {
    const [todos, setTodos] = useState(INITIAL_EVENTS);
    console.log(todos)
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null); // 이벤트 객체 + id

    // eventContent: 커스텀 이벤트 렌더링
    const renderEventContent = (eventInfo) => {
        console.log('rendered')
        console.log(eventInfo)
        return (
            <TodoItem todo={eventInfo} setTodos={setTodos} modalOpen={modalOpen} currentEvent={currentEvent}></TodoItem>
        )
    }

    // 새 todo 추가 함수
    const addNewTodo = (selectInfo, todoTitle) => {
        const newTodo = {
            id: createEventId(),
            title: todoTitle,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
            extendedProps : {
                completed: false,
                priority: false,
            }
        }
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    const handleDateSelect = (selectInfo) => {
        // 새 todo 추가
        // let title = prompt('일정을 입력해주세요.');

        setCurrentEvent('add');
        setModalOpen(true);
        if (selectInfo.title) {
            addNewTodo(selectInfo, title);
        }
        selectInfo.view.calendar.unselect();
    }

    return (
        <>
            <div>
                <TodoListInput setTodos={setTodos}/>
                <TodoPrioritySelect />
                <FullCalendar
                    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateSelect}
                    // eventClick={handleEventClick}
                    // eventChange={handleEventChange}
                    events={todos}
                    eventContent={renderEventContent}
                />
            </div>
            {/* <TodoEditModal initialValues={initialValues} isOpen={modalOpen} currentEvent={currentEvent} /> */}
        </>
    )
}

export default TodoCalendar;