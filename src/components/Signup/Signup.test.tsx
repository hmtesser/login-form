import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Signup from './SignUp';
import { vi } from 'vitest';

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

describe('Signup Form', () => {
  it('renders Signup form', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    expect(screen.getByLabelText(/Full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Day of Birth/i)).toBeInTheDocument();
    expect(screen.getByText(/Register Now/i)).toBeInTheDocument();

    const passwordInputs = screen.getAllByLabelText(/password/i);
    expect(passwordInputs).toHaveLength(2);
    expect(passwordInputs[0]).toHaveAttribute('type', 'password');
    expect(passwordInputs[1]).toHaveAttribute('type', 'password');
  });

  it('shows error messages for invalid inputs', async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const submitButton = screen.getByText('Register Now');
    await userEvent.click(submitButton);

    expect(
      await screen.findByText('Field Full name is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Field Email is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Field City is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Field Date of Birth is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Field Password is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Field Confirm Password is required')
    ).toBeInTheDocument();
  });

  it('navigates to the UserCreated page when "Register Now" is clicked and all data is correct', async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <Router>
        <Signup />
      </Router>
    );

    const fNameInput = screen.getByLabelText('Full name');
    const emailInput = screen.getByLabelText('Email');
    const cityInput = screen.getByLabelText('City');
    const birthDateInput = screen.getByLabelText('Day of Birth');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const checkBoxInput = screen.getByRole('checkbox', {
      name: /i accept the/i,
    });
    const submitButton = screen.getByText('Register Now');

    await userEvent.type(fNameInput, 'John Doe');
    await userEvent.type(emailInput, 'john.doe@example.com');
    await userEvent.type(cityInput, 'New York');
    await userEvent.type(birthDateInput, '1990-01-01');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmPasswordInput, 'password123');
    await userEvent.click(checkBoxInput);
    await userEvent.click(submitButton);

    const signUpButton = screen.getByText('Register Now');
    await userEvent.click(signUpButton);

    expect(mockNavigate).toHaveBeenCalledWith('/usercreated', {
      replace: true,
    });
  });
});
