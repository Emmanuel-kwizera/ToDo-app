import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { TodoList } from '../TodoList';

jest.mock('react-icons/bs', () => ({
  BsPencilSquare: () => <div data-testid="edit-icon"></div>,
  BsTrash: () => <div data-testid="delete-icon"></div>,
  BsCheckCircle: () => <div data-testid="check-icon"></div>,
}));

const mockTodos = [
  { id: 1, task: 'Task 1', completed: false },
  { id: 2, task: 'Task 2', completed: true },
];

const mockToggleTodo = jest.fn();
const mockEditTodo = jest.fn();
const mockDeleteTodo = jest.fn();

describe('TodoList', () => {
  it('renders loading message while fetching todos', () => {
    const { getByText } = render(
      <TodoList
        todos={[]}
        toggleTodo={mockToggleTodo}
        editTodo={mockEditTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders todos correctly', async () => {
    const { getByText } = render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        editTodo={mockEditTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
    await waitFor(() => {
      expect(getByText('Task 1')).toBeInTheDocument();
      expect(getByText('Task 2')).toBeInTheDocument();
    });
  });

  it('calls toggleTodo when todo is clicked', async () => {
    const { getByText } = render(
