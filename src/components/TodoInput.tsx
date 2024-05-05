import React, { useState } from 'react';

type Props = {
  addTodo: (task: string) => void;
};

export const TodoInput: React.FC<Props> = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (task.trim() !== '') {
      addTodo(task);
      setTask('');
    }
  };

  return (
    <div className="form-container flex justify-center">
    <form onSubmit={handleSubmit} className="mb-4 flex w-8/12">
        <div className="w-1/2">
            <input
                type="text"
                id="task"
                name="task"
                required
                value={task}
                placeholder="Enter New Task"
                onChange={(e) => setTask(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div className="w-1/2 mx-4 mt-1">
            <button type="submit" className="w-7/12 text-center text-lg py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#3428b9] hover:bg-bg-[#F8A51B] focus:outline-none">
                Add
            </button>
        </div>

    </form>
        </div>
  );
};
