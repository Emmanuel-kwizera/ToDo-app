import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoItem } from '../TodoItem';

const mockTodo = {
  id: 1,
  task: 'Sample Task',
  completed: false,
};

const mockToggleTodo = jest.fn();
const mockEditTodo = jest.fn();
const mockDeleteTodo = jest.fn();

describe('TodoItem', () => {
  it('renders todo task correctly', () => {
    const { getByText } = render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        editTodo={mockEditTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
    expect(getByText('Sample Task')).toBeInTheDocument();
  });

  it('calls toggleTodo when todo task is clicked', () => {
    const { getByText } = render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        editTodo={mockEditTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
    fireEvent.click(getByText('Sample Task'));
    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  it('calls editTodo when edit button is clicked', () => {
    const { getByTestId } = render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        editTodo={mockEditTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
    fireEvent.click(getByTestId('edit-button'));
    expect(mockEditTodo).toHaveBeenCalledWith(1, 'Sample Task');
  });

  it('calls deleteTodo when delete button is clicked', () => {
    const { getByTestId } = render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        editTodo={mockEditTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
    fireEvent.click(getByTestId('delete-button'));
    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });
});
