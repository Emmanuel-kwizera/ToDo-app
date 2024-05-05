import React, { useState } from 'react';
import { Todo } from '../types';
import { BsPencilSquare, BsTrash, BsCheckCircle } from 'react-icons/bs';

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
    <div className="flex justify-center w-full">
      <div className="w-9/12 mb-2 p-2 border-b border-[#3428b9] flex justify-between items-center">
        {isEditing ? (
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <span className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : 'text-black'}`}>
            {todo.task}
          </span>
        )}

        <div className="flex items-center">
          {isEditing ? (
            <button onClick={handleEdit} className="btn btn-xs">
              Save
            </button>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="btn btn-xs">
                <BsPencilSquare />
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-xs ml-2">
                <BsTrash />
              </button>
              <button onClick={() => toggleTodo(todo.id)} className={`btn btn-xs ml-2 ${todo.completed ? 'text-green-500' : 'text-gray-500'}`}>
                <BsCheckCircle />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
