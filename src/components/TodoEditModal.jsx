import { INITIAL_EVENTS } from '@/js/eventUtils';
import { createEventId } from '@/js/eventUtils.js';
import React, { useState } from "react";

function TodoEditModal({initialValues, isOpen, currentEvent}){
    const [title, setTitle] = useState(initialValues.title);
    const [start, setStart] = useState(initialValues.title);
    const [end, setEnd] = useState(initialValues.end);
    const [allDay, setAllDay] = useState(initialValues.allDay || false);

    // 값이 바뀌면 초기값이 바뀌었을 때도 반영하도록
    React.useEffect(() => {
        setTitle(initialValues.title);
        setStart(initialValues.start);
        setEnd(initialValues.end);
        setAllDay(initialValues.allDay || false);
    }, [initialValues]);

    if (!isOpen) return null;

    const handleEventChange = (eventInfo) => {
        // todo 수정
        setTodos(prev => prev.map(e => {
            if(e.id === eventInfo.id) {
                return {
                    ...e,
                    title: e.title, // 제목은 클릭 수정으로 처리됨
                    start: eventInfo.startStr,
                    end: eventInfo.endStr || eventInfo.startStr,
                    allDay: eventInfo.allDay
                }
            }
            return e;
        }));
    }

    const handleModalSave = (updated) => {
        // editingEvent.id 기준으로 todos 배열 수정
        setTodos(prev => prev.map(e => {
            if (e.id === editingEvent.id) {
                return {
                    ...e,
                    title: updated.title,
                    start: updated.start,
                    end: updated.end,
                    allDay: updated.allDay
                }
            }
            return e;
        }));
        setModalOpen(false);
        setCurrentEvent(null);
        setEditingEvent(null);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        setCurrentEvent(null);
        setEditingEvent(null);
    }

    return (
        <div style={{
            position: 'fixed', zIndex: '10000',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', justifyContent: 'center', alignItems:'center'
            }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
                <div>
                    <h3>{currentEvent === 'add' ? (`이벤트 추가`) : (`이벤트 수정`)}</h3>
                    <label>제목: </label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>시작 날짜: </label>
                    <input
                        type="date"
                        value={start.slice(0,10)}
                        onChange={e => setStart(e.target.value)}
                    />
                </div>
                <div>
                    <label>종료 날짜: </label>
                    <input
                        type="date"
                        value={end ? end.slice(0,10) : start.slice(0,10)}
                        onChange={e => setEnd(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        <input
                        type="checkbox"
                        checked={allDay}
                        onChange={e => setAllDay(e.target.checked)}
                        />
                        올데이 (하루종일)
                    </label>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <button onClick={() => { onSave({ title, start, end, allDay }); }}>저장</button>
                    <button onClick={onClose} style={{ marginLeft: '8px' }}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default TodoEditModal;