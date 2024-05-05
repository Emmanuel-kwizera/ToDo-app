import React, { useState } from 'react';
import { TodoList } from "../../components/TodoList";
import { TodoInput } from '../../components/TodoInput';

function MainToDo() {

  const addTodo = (task: string) => {
    fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: task,
        completed: false,
        userId: 5,
      })
    })
    .then(res => res.json())
    .then(newTodo => {
      console.log("New Todo added:", newTodo);
    })
    .catch(error => console.error('Error adding todo:', error));
  };

  return (
    <div className="container mx-auto mt-10">
      <TodoInput addTodo={addTodo} />
      <TodoList />
    </div>
  );
}

export default MainToDo;