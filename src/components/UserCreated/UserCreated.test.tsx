import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserCreated from './UserCreated';

it('renders UserCreated form', () => {
  render(
    <Router>
      <UserCreated />
    </Router>
  );
  const title = screen.getByText(/User Created /i);
  expect(title).toBeInTheDocument();
});
