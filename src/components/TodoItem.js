function TodoItem({ todo, updateStatus, deleteTodo }) {
    const getStatusColor = () => {
      switch(todo.status) {
        case 'à faire': return '#ffbe0b';
        case 'en cours': return '#3a86ff';
        case 'fait': return '#06d6a0';
        default: return '#adb5bd';
      }
    };
  
    const handleStatusChange = () => {
      const statusOrder = ['à faire', 'en cours', 'fait'];
      const currentIndex = statusOrder.indexOf(todo.status);
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      updateStatus(todo.id, statusOrder[nextIndex]);
    };
  
    return (
      <div className="todo-item" style={{ borderLeft: `4px solid ${getStatusColor()}` }}>
        <span>{todo.text}</span>
        
        <div className="todo-actions">
          <button 
            className="status-button"
            onClick={handleStatusChange}
            style={{ backgroundColor: getStatusColor() }}
          >
            {todo.status}
          </button>
          
          <button 
            className="delete-button" 
            onClick={() => deleteTodo(todo.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
    );
  }
  
  export default TodoItem;
