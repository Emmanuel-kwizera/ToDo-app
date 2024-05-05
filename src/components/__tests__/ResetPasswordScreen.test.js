import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ResetPasswordScreen from '../ResetPasswordScreen';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    resetToken: '123'
  })
}));

describe('ResetPasswordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display error when passwords do not match', async () => {
    render(<Router><ResetPasswordScreen /></Router>);

    fireEvent.change(screen.getByLabelText(/New Password:/i), { target: { value: 'password1' } });
    fireEvent.change(screen.getByLabelText(/Confirm New Password:/i), { target: { value: 'password2' } });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords don't match/i)).toBeInTheDocument();
    });
  });

  it('should handle successful password reset', async () => {
    axios.put.mockResolvedValue({ data: { message: 'Password successfully reset' } });
    render(<Router><ResetPasswordScreen /></Router>);

    fireEvent.change(screen.getByLabelText(/New Password:/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm New Password:/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/Password successfully reset/i)).toBeInTheDocument();
    });
  });
});
