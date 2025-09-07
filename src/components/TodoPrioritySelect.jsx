import { useState } from 'react';

function TodoPrioritySelect () {
    return (
        <select>
            <option value="priority">중요</option>
            <option value="normal">기본</option>
        </select>
    )
}

export default TodoPrioritySelect;