import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoInput } from './TodoInput';

const mockAddTodo = jest.fn();

describe('TodoInput', () => {
  it('calls addTodo with input value when form is submitted', () => {
    const { getByPlaceholderText, getByText } = render(
      <TodoInput addTodo={mockAddTodo} />
    );
    const input = getByPlaceholderText('Enter New Task');
    const addButton = getByText('Add');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);
    expect(mockAddTodo).toHaveBeenCalledWith('New Task');
  });
});
