import { render, screen } from '@testing-library/react';
import Cover from './cover/Cover';

test('renders learn react link', () => {
  render(<Cover />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
