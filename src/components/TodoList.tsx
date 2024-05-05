import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types';

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  editTodo: (id: number, task: string) => void;
  deleteTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, toggleTodo, editTodo, deleteTodo }) => {
  return (
    <div>
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
