import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateScreen from '../PrivateScreen';

jest.mock('axios');

describe('PrivateScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display error message when user is not authorized', async () => {
    localStorage.removeItem('authToken');
    render(<Router><PrivateScreen /></Router>);

    await waitFor(() => {
      expect(screen.getByText(/You are not authorized, please login/i)).toBeInTheDocument();
    });
  });

  it('should display private data when user is authorized', async () => {
    const mockedPrivateData = {
      data: 'Private data',
      user: {
        username: 'testUser',
        email: 'test@example.com'
      }
    };
    localStorage.setItem('authToken', 'mockedToken');
    axios.get.mockResolvedValueOnce({ data: mockedPrivateData });
    
    render(<Router><PrivateScreen /></Router>);

    await waitFor(() => {
      expect(screen.getByText(/Welcome to the private page/i)).toBeInTheDocument();
      expect(screen.getByText(/You are logged in/i)).toBeInTheDocument();
      expect(screen.getByText(/Private data/i)).toBeInTheDocument();
      expect(screen.getByText(/Username:/i)).toBeInTheDocument();
      expect(screen.getByText(/testUser/i)).toBeInTheDocument();
      expect(screen.getByText(/Email:/i)).toBeInTheDocument();
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    });
  });
});
