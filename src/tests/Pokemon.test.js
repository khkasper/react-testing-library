import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('Requirement 06 - Testing <Pokemon.js /> component', () => {
  test('If a card with the information of a specific Pokémon is rendered', () => {
    const { averageWeight: weight } = pokemons[0];
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${weight.value} ${weight.measurementUnit}`,
    );
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('If the Pokémon card indicated in the Pokédex contains a navigation link'
    + 'to view details of that Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  test('If clicking on the Pokémon navigation link redirects the application'
    + 'to the Pokémon details page', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const title = screen.getByRole('heading', {
      level: 2,
      name: `${pokemons[0].name} Details`,
    });
    expect(history.location.pathname).toMatch(`/pokemons/${pokemons[0].id}`);
    expect(title).toBeInTheDocument();
  });
  test('If there is a star icon in favorite Pokemons', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favoriteIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
