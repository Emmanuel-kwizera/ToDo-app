import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginScreen from '../LoginScreen';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation(() => (cmd => cmd))
}));
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn()
};

describe('LoginScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects if authToken is already in localStorage', () => {
    localStorage.getItem.mockReturnValue('someAuthToken');
    const navigate = jest.fn();
    render(
      <Router>
        <LoginScreen />
      </Router>
    );
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('allows user to input email and password', () => {
    render(
      <Router>
        <LoginScreen />
      </Router>
    );
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });
    expect(screen.getByLabelText(/Email:/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/Password:/i)).toHaveValue('password123');
  });

  it('handles login success', async () => {
    axios.post.mockResolvedValue({ data: { token: 'newToken' } });
    render(
      <Router>
        <LoginScreen />
      </Router>
    );
    fireEvent.click(screen.getByText(/login/i));
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'newToken');
    });
  });

  it('displays an error when login fails', async () => {
    axios.post.mockRejectedValue({
      response: { data: { error: 'Invalid Credentials' } }
    });
    render(
      <Router>
        <LoginScreen />
      </Router>
    );
    fireEvent.click(screen.getByText(/login/i));
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
