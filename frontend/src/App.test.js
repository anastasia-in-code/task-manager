import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('should set initial state of isLoggedIn to false', () => {
  const { container } = render(<App />);
  const isLoggedInState = container.querySelector('isLoggedIn');
  expect(isLoggedInState).toBeFalsy();
});
