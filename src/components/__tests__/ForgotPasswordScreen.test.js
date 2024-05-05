import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ForgotPasswordScreen from '../ForgotPasswordScreen';

jest.mock('axios');

describe('ForgotPasswordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display error when the API call fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { error: 'User not found' } }
    });

    render(<ForgotPasswordScreen />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /send email/i }));

    await waitFor(() => {
      expect(screen.getByText(/User not found/i)).toBeInTheDocument();
    });
  });

  it('should display success message when email is sent', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'Email sent successfully' }
    });

    render(<ForgotPasswordScreen />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /send email/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email sent successfully/i)).toBeInTheDocument();
    });
  });
});
