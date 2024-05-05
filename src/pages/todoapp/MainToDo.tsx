import React, { useState } from 'react';
import { TodoList } from "../../components/TodoList";
import { TodoInput } from '../../components/TodoInput';
import { Todo } from '../../types';

function MainToDo() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (task: string) => {
    const newTodo: Todo = { id: Date.now(), task, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, task: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task };
      }
      return todo;
    }));
  };

  return (
    <div className="container mx-auto mt-10">
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default MainToDo;
