import React, { useState } from 'react';
import { Todo } from '../types';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, task: string) => void;
  deleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, toggleTodo, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);

  const handleEdit = () => {
    editTodo(todo.id, task);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center mb-2 p-2 border-b">
      {isEditing ? (
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      ) : (
        <span onClick={() => toggleTodo(todo.id)} className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}>
          {todo.task}
        </span>
      )}

      <div>
        {isEditing ? (
          <button onClick={handleEdit} className="btn btn-xs">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn btn-xs">
            <BsPencilSquare />
          </button>
        )}
        <button onClick={() => deleteTodo(todo.id)} className="btn btn-xs ml-2">
          <BsTrash />
        </button>
      </div>
    </div>
  );
};
