import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requirement 05 - Testing <Pokedex.js /> component', () => {
  test('If page contains a heading h2 with the text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(title).toBeInTheDocument();
  });

  test('If the next Pokémon in the list is displayed when "Próximo pokémon" button is clicked', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    pokemons.forEach((pokemon) => {
      const nextPokemon = screen.getByTestId('pokemon-name');
      expect(nextPokemon).toHaveTextContent(pokemon.name);
      userEvent.click(button);
    });
  });

  test('If only one Pokemon is shown at a time', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  test('If the Pokédex has the filter buttons', () => {
    renderWithRouter(<App />);
    const allTypesButton = screen.getByRole('button', {
      name: 'All',
    });
    const pokemonType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    pokemonType.forEach((type) => {
      const pokemonTypeButton = screen.getByRole('button', {
        name: type,
      });
      expect(pokemonTypeButton).toBeInTheDocument();
    });
    expect(allTypesButton).toBeInTheDocument();
  });

  test('If clicking on a type button, the Pokédex only cycle through the Pokémon of that type', () => {
    renderWithRouter(<App />);
    const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button');
    const pokemonType = screen.getByTestId('pokemon-type');
    const allTypesButton = screen.getByRole('button', {
      name: 'All',
    });
    pokemonTypeButton.forEach((button, index) => {
      userEvent.click(pokemonTypeButton[index]);
      const buttonType = button.innerHTML;
      const type = pokemonType.innerHTML;
      expect(type).toBe(buttonType);
      expect(allTypesButton).toBeInTheDocument();
    });
  });

  test('If the Pokédex contains a button to reset the filter', () => {
    renderWithRouter(<App />);
    const allTypesButton = screen.getByRole('button', {
      name: 'All',
    });
    const fireTypeButton = screen.getByRole('button', {
      name: 'Fire',
    });
    const displayedPokemonType = screen.getByTestId('pokemon-type');
    expect(allTypesButton).toBeInTheDocument();
    userEvent.click(allTypesButton);
    expect(displayedPokemonType).toHaveTextContent('Electric');
    userEvent.click(fireTypeButton);
    expect(displayedPokemonType).toHaveTextContent('Fire');
  });
});
