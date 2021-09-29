import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import About from '../components/About';

describe('Requirement 02 - Testing <About.js /> component', () => {
  test('If the page contains information about the Pokédex', () => {
    renderWithRouter(<About />);
    const aboutInfo = screen.getByText(/this application simulates a pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });
  test('If the page contains a heading h2 with the text "About Pokédex"', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });
  test('If the page contains two paragraphs with text about the Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs).toHaveLength(2);
  });
  test('If the page contains a specific image of a Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toHaveAttribute('src', URL);
  });
});
