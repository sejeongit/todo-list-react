import { useState } from 'react';
import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { createEventId } from '@/js/eventUtils.js'
import TodoItem from '@/components/TodoItem';

function TodoCalendar({todos, setTodos}) {
    const handleDateSelect = (selectInfo) => {
        let title = prompt('일정을 입력해주세요.');
        let calendarApi = selectInfo.view.calendar;

        // 예: 선택된 날짜 범위
        const { startStr, endStr, allDay } = selectInfo;

        if (title) {
            const newTodo = {
                id: createEventId(),
                title: title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
                extendedProps : {
                    completed: false,
                    priority: false,
                    editing: false,
                    editText: "",
                }
            }

            setTodos((prevTodos) => [...prevTodos, newTodo]);
        }

        calendarApi.unselect(); // clear date selection
    }

    const renderEventContent = (eventInfo) => {
        console.log('rendered')
        console.log(eventInfo)
        return (
            <TodoItem todo={eventInfo.event} setTodos={setTodos}></TodoItem>
        )
    }

    return (
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
            events={todos}
            eventContent={renderEventContent}
            // eventChange={}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // dateClick={handleDateClick}
        />
    )
}

export default TodoCalendar;