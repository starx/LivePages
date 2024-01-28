import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import App from './App';


test('renders hello world route', () => {
  render(
    <MemoryRouter initialEntries={['/hello-world']}>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Hello world!/i);
  expect(linkElement).toBeInTheDocument();
});

