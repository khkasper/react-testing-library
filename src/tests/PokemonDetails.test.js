import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';
import pokemons from '../data';

describe('Requirement 07 - Testing <PokemonDetails.js /> component', () => {
  test('If the detailed information of the selected Pokémon is shown on the screen', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsLink);
    const nameDetails = screen.getByRole('heading', {
      level: 2,
      name: `${pokemons[0].name} Details`,
    });
    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const pokemonSummary = screen.getByText(pokemons[0].summary);
    expect(nameDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
  });

  test('If there is a section on the page with maps containing the Pokémons locations', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsLink);
    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    const locationInfo = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(gameLocations).toBeInTheDocument();
    pokemons[0].foundAt.forEach((where, index) => {
      expect(locationInfo[index]).toHaveAttribute('src', where.map);
      const location = screen.getByText(where.location);
      expect(location).toBeInTheDocument();
    });
  });

  test('If the user can bookmark a Pokémon through the details page', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsLink);
    const checkbox = screen.getByRole('checkbox');
    const checkboxLabel = screen.getByLabelText(/pokémon favoritado\?/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkboxLabel).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
