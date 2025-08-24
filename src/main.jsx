import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/style/index.css'
import TodoList from '@/components/TodoList.jsx'
import TodoCalendar from '@/components/TodoCalendar.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TodoList />
    <TodoCalendar />
  </BrowserRouter>,
)
