import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterScreen from '../RegisterScreen';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation(() => (cmd => cmd))
}));
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn()
};

describe('RegisterScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('validates email format on submission', async () => {
    render(
      <Router>
        <RegisterScreen />
      </Router>
    );
    
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password:/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/register/i));

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('submits registration form with valid data', async () => {
    render(
      <Router>
        <RegisterScreen />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password:/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/register/i));

    // Wait for success message or redirect
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
      // or expect redirection to another page
    });
  });
});
