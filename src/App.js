import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './styles.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState('tous');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      status: 'à faire'
    };
    setTodos([...todos, newTodo]);
  };

  const updateStatus = (id, newStatus) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'tous') return true;
    return todo.status === filter;
  });

  return (
    <div className="app">
      <h1>Ma Todo List</h1>
      
      <div className="filter-buttons">
        <button onClick={() => setFilter('tous')}>Tous</button>
        <button onClick={() => setFilter('à faire')}>À faire</button>
        <button onClick={() => setFilter('en cours')}>En cours</button>
        <button onClick={() => setFilter('fait')}>Fait</button>
      </div>
      
      <TodoForm addTodo={addTodo} />
      
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateStatus={updateStatus}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;