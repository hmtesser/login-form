import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  it('renders the input and label correctly', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Username"
        type="text"
        name="username"
        value="hmtesser@gmail.com"
        onChange={handleChange}
        placeHolderText="Please Inform your E-mail or ID"
      />
    );
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('shows error message when error prop is provided', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Username"
        type="text"
        name="username"
        value="hmtesser@gmail.com"
        onChange={handleChange}
        placeHolderText="Please Inform your E-mail or ID"
        error="Incorrect E-mail format"
      />
    );
    expect(screen.getByText('Incorrect E-mail format')).toBeInTheDocument();
  });

  it('calls onChange when the input value changes', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="email"
        type="text"
        name="username"
        value="hmtesser@gmail.com"
        onChange={handleChange}
        placeHolderText="Please Inform your E-mail or ID"
        error="Incorrect E-mail format"
      />
    );
    const input = screen.getByPlaceholderText(
      'Please Inform your E-mail or ID'
    );
    fireEvent.change(input, { target: { value: '123456' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
