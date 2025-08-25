import { useState } from 'react';
import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { INITIAL_EVENTS, createEventId } from '@/js/eventUtils.js'

function TodoCalendar() {
    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    const handleDateSelect = (selectInfo) => {
        let title = prompt('일정을 입력해주세요.');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId,
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    const renderEventContent = (eventInfo) => {
        console.log(eventInfo)
        return (
            <>
                <p>{eventInfo.timeText}</p>
                <p>{eventInfo.event.title}</p>
            </>
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
            initialEvents={INITIAL_EVENTS}
            select={handleDateSelect}
            eventContent={renderEventContent}
            // dateClick={handleDateClick}
        />
    )
}

export default TodoCalendar;