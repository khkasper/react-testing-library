import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Requirement 01 - Testing <App.js /> component', () => {
  test('If the "Home" link text is in the page', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });
    expect(linkHome).toBeInTheDocument();
  });

  test('If the "About" link text is in the page', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    expect(linkAbout).toBeInTheDocument();
  });

  test('If the "Favorite Pokémons" link text is in the page', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkFavorite).toBeInTheDocument();
  });

  test('If clicking the "Home" link redirects to "/"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });
  test('If clicking the "About" link redirects to "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });
  test('If clicking the "Favorite Pokémons" link redirects to "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('If typing an unwknown route renders "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unknown-route');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
