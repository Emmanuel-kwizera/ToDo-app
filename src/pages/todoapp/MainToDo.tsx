import React, { useState } from 'react';
import { TodoList } from "../../components/TodoList";
import { TodoInput } from '../../components/TodoInput';
import { Todo } from '../../types';

function MainToDo() {

  const addTodo = (task: string) => {
    const newTodo: Todo = { id: Date.now(), task, completed: false };
  };

  return (
    <div className="container mx-auto mt-10">
      <TodoInput addTodo={addTodo} />
      <TodoList />
    </div>
  );
}

export default MainToDo;
