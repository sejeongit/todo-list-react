import { createRoot } from 'react-dom/client'
import '@/style/index.css'
import TodoList from '@/components/TodoList.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TodoList />
  </BrowserRouter>,
)
