import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo , deleteTodo } from './feature/todos/todoSlice';

function App() {
  const [todoText, setTodoText] = useState('');
  
  // ✅ FIXED: Get todos from correct state path
  const todos = useSelector((state) => state.todoSlice.todos);
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (todoText.trim()) {
      // ✅ FIXED: Dispatch just the text, not an object
      dispatch(addTodo(todoText));
      setTodoText('');
    }
  };
 function handleDelete (todoId)  {
  dispatch(deleteTodo(todoId));
}
  return (
    <div style={{
      maxWidth: '500px',
      margin: '80px auto',
      marginLeft: '520px',
      padding: '40px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: 'linear-gradient(145deg, #f0f4ff, #ffffff)',
      borderRadius: '25px',
      boxShadow: '0 10px 40px rgba(0, 123, 255, 0.15)',
      border: '1px solid rgba(0, 123, 255, 0.1)'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        fontSize: '42px',
        fontWeight: '700',
        color: '#007bff',
        textShadow: '2px 2px 4px rgba(0, 123, 255, 0.1)'
      }}>
        Simple Todo
      </h1>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="What would you like to do today?"
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '18px',
            marginBottom: '15px',
            border: '2px solid #e0e7ff',
            borderRadius: '15px',
            outline: 'none',
            background: '#f8faff',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
            color: 'black'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007bff';
            e.target.style.background = '#ffffff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e0e7ff';
            e.target.style.background = '#f8faff';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '18px',
            fontSize: '18px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
          }}
        >
          Add Todo
        </button>
      </form>
      
      {/* Todo List */}
      <div style={{ marginTop: '30px' }}>
        {todos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '50px 20px',
            color: '#6c757d',
            background: '#f8f9fa',
            borderRadius: '15px',
            border: '2px dashed #dee2e6'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📝</div>
            <h3 style={{ margin: '0 0 10px 0' }}>No todos yet</h3>
            <p>Add your first todo using the input above</p>
          </div>
        ) : (
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '10px'
          }}>
            {/* ✅ FIXED: Changed addTodos to todos */}
            {todos.map((todo, index) => (
              <div
                key={todo.id}  
                style={{
                  padding: '20px',
                  marginBottom: '15px',
                  background: index % 2 === 0 ? '#ffffff' : '#f8faff',
                  borderLeft: '6px solid #007bff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                    background: '#007bff',
                    color: 'white',
                    borderRadius: '50%',
                    marginRight: '15px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </span>
                  <span style={{
                    fontSize: '18px',
                    color: '#212529',
                    fontWeight: '500'
                  }}>
                    {todo.text}
                  </span>
                </div>
                <div style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '14px',
                  color: '#6c757d'
                }}>
                  {/* ✅ FIXED: todo.id instead of addTodos.id */}
                  #{todo.id.toString().slice(-4)}
                          <button 
  onClick={() => handleDelete(todo.id)}
  style={{
    marginLeft: '10px',
    padding: '5px 12px',
    background: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s ease',
  }}
  onMouseOver={(e) => e.target.style.background = '#cc0000'}
  onMouseOut={(e) => e.target.style.background = '#ff4444'}
>
  Delete
</button>

                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Counter */}
        {todos.length > 0 && (
          <div style={{
            marginTop: '25px',
            padding: '15px',
            background: 'rgba(0, 123, 255, 0.05)',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#007bff',
            fontWeight: '600',
            fontSize: '16px',
            border: '1px solid rgba(0, 123, 255, 0.1)'
          }}>
            {todos.length} todo{todos.length !== 1 ? 's' : ''} in list
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;