import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requirement 03 - Testing <FavoritePokemons.js /> component', () => {
  test('If the message "No favorite pokemon found" is displayed on the screen, if there is no favorite pokemons', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemons = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemons).toBeInTheDocument();
  });
  test('If all favorite Pokemon cards are displayed', () => {
    const charmander = [{
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    }];
    renderWithRouter(<FavoritePokemons pokemons={ charmander } />);
    const favName = screen.getByText('Charmander');
    const favType = screen.getByText('Fire');
    const favAverageWeight = screen.getByText(/8.5 kg/i);
    const favImage = screen.getByAltText(/charmander sprite/i);
    expect(favName).toBeInTheDocument();
    expect(favType).toBeInTheDocument();
    expect(favAverageWeight).toBeInTheDocument();
    expect(favImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
});
