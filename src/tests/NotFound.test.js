import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requirement 04 - Testing <NotFound.js /> component', () => {
  test('If page contains a heading h2 with the text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('If the page displays a specific image', () => {
    renderWithRouter(<NotFound />);
    const notFoundImage = screen.getByRole('img', {
      src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
