import React, { useEffect, useState } from 'react';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => {
        const formattedTodos = data.todos.map((todo: any) => ({
          id: todo.id,
          task: todo.todo,
          completed: todo.completed
        }));
        setTodos(formattedTodos);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch todos', err);
        setLoading(false);
      });
  }, []);

  const toggleTodo = (id: number) => {
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const editTodo = (id: number, task: string) => {
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, task } : todo))
    );
  };

  const deleteTodo = (id: number) => {
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data); 
      setTodos(todos => todos.filter(todo => todo.id !== id));
    })
    .catch(error => console.error('Error deleting todo:', error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};
