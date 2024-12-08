/* eslint-disable @typescript-eslint/no-explicit-any */
import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from './Login';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as {
      BrowserRouter: React.ComponentType;
      useNavigate: () => (
        to: string,
        options?: { replace?: boolean; state?: any }
      ) => void;
    }),
    BrowserRouter: ({ children }: any) => <div>{children}</div>,
    useNavigate: vi.fn(), //
  };
}); //para usar useNavigate lá em baixo

it('renders login form', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const title = screen.getByText(/Welcome Back/i);
  expect(title).toBeInTheDocument();
});

it('displays error messages for invalid input', async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const signInButton = screen.getByText('Sign in');
  await userEvent.click(signInButton);

  expect(screen.getByText('Incorrect E-mail format')).toBeInTheDocument();
  expect(
    screen.getByText('Password must be at least 6 characters')
  ).toBeInTheDocument();
});

it('submits the form without error for valid input', async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText(
    'Please inform your E-mail or ID'
  );
  const passwordInput = screen.getByPlaceholderText(
    'Please inform your password'
  );
  const signInButton = screen.getByText('Sign in');

  await userEvent.type(emailInput, 'test@example.com');
  await userEvent.type(passwordInput, 'password123');
  await userEvent.click(signInButton);

  expect(screen.queryByText('Incorrect E-mail format')).not.toBeInTheDocument();
  expect(
    screen.queryByText('Password must be at least 6 characters')
  ).not.toBeInTheDocument();
});

it('navigates to the signup page when "Sign up" is clicked', async () => {
  const mockNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  render(
    <Router>
      <Login />
    </Router>
  );

  const signUpButton = screen.getByText('Sign up');
  await userEvent.click(signUpButton);

  expect(mockNavigate).toHaveBeenCalledWith('/signup', { replace: true });
});
