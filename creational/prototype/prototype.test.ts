import { Pokemon } from './prototype';

describe('Pokemon Prototype Pattern', () => {
  it('should create a clone of the Pokemon object', () => {
    const basePokemon = new Pokemon('Charmander', 'Fire', 1, ['Flamethrower', 'Scratch']);
    const pokemonCloned = basePokemon.clone();

    expect(pokemonCloned).toEqual(basePokemon);
    expect(pokemonCloned).not.toBe(basePokemon);
  });

  it('should ensure cloned Pokemon is independent of the original', () => {
    const basePokemon = new Pokemon('Charmander', 'Fire', 1, ['Flamethrower', 'Scratch']);
    const pokemonCloned = basePokemon.clone();
    pokemonCloned.name = 'Charmeleon';
    pokemonCloned.level = 16;
    pokemonCloned.attacks.push('Flight');

    expect(basePokemon.name).toBe('Charmander');
    expect(basePokemon.level).toBe(1);
    expect(basePokemon.attacks).toEqual(['Flamethrower', 'Scratch']);
    expect(pokemonCloned.name).toBe('Charmeleon');
    expect(pokemonCloned.level).toBe(16);
    expect(pokemonCloned.attacks).toEqual(['Flamethrower', 'Scratch', 'Flight']);
  });

  it('should ensure changes to the original Pokemon do not affect the clone', () => {
    const basePokemon = new Pokemon('Charmander', 'Fire', 1, ['Flamethrower', 'Scratch']);
    const pokemonCloned = basePokemon.clone();
    basePokemon.name = 'Charizard';
    basePokemon.level = 36;
    basePokemon.attacks.push('Flight');

    expect(basePokemon.name).toBe('Charizard');
    expect(basePokemon.level).toBe(36);
    expect(basePokemon.attacks).toEqual(['Flamethrower', 'Scratch', 'Flight']);
    expect(pokemonCloned.name).toBe('Charmander');
    expect(pokemonCloned.level).toBe(1);
    expect(pokemonCloned.attacks).toEqual(['Flamethrower', 'Scratch']);
  });
});
