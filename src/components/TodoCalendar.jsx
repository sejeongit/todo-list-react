import { useState } from 'react';
import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { createEventId } from '@/js/eventUtils.js'
import TodoItem from '@/components/TodoItem';

function TodoCalendar({todos, setTodos}) {
    // const [currentEvents, setCurrentEvents] = useState([]);
    const [currentAct, setCurrentAct] = useState('');

    const handleDateSelect = (selectInfo) => {
        let title = prompt('일정을 입력해주세요.');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })

            setTodos((prevTodos) => [
                ...prevTodos,
                {
                    id: createEventId(),
                    title: title,
                    completed: false,
                    priority: false,
                    editing: false,
                    editText: "",
                }
            ]);
        }
    }

    const renderEventContent = (eventInfo) => {
        console.log(eventInfo)
        return (
            <TodoItem todos={todos} setTodos={setTodos}></TodoItem>
            // <>
            //     <p>{eventInfo.timeText}</p>
            //     <p>{eventInfo.event.title}</p>
            //     <div>
            //         <button type="button" className="cal-edit-btn">수정</button>
            //         <button type="button" className="cal-delete-btn">삭제</button>
            //     </div>
            // </>
        )
    }

    function handleEventClick(clickInfo) {
        if (
          confirm(
            `삭제하시겠습니까? '${clickInfo.event.title}'`
          )
        ) {
          clickInfo.event.remove();
        }
      }
    
      function handleEvents(events) {
        setCurrentEvents(events);
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
            initialEvents={todos} // 초기 목록을 뿌려줌
            select={handleDateSelect}
            eventContent={renderEventContent}
            // events={todos}
            // eventClick={handleEventClick}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // dateClick={handleDateClick}
        />
    )
}

export default TodoCalendar;