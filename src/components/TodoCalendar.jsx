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

function TodoCalendar() {
    const [todos, setTodos] = useState(INITIAL_EVENTS);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    // eventContent: 커스텀 이벤트(todo) 렌더링
    const renderEventContent = (eventInfo) => {
        console.log('rendered')
        console.log(eventInfo)
        return (
            <TodoItem
                todo={eventInfo}
                setTodos={setTodos}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}>
            </TodoItem>
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