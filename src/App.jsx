import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  // ローカルストレージから読み込む
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        setTodos(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load todos:', error)
      }
    }
  }, [])

  // ローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // タスク追加
  const addTodo = () => {
    if (inputValue.trim() === '') return
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }
    
    setTodos([...todos, newTodo])
    setInputValue('')
  }

  // タスク削除
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // タスク完了切り替え
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Enterキーで追加
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>📝 My Todo List</h1>
        
        <div className="input-section">
          <input
            type="text"
            placeholder="新しいタスクを入力..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            追加
          </button>
        </div>

        <div className="stats">
          合計: {todos.length} 個 | 完了: {todos.filter(t => t.completed).length} 個
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-message">タスクがありません。新しいタスクを追加してください！</p>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  削除
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
