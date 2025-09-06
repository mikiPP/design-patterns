export class Pokemon {
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}

export class PokemonCollection {
  private pokemons: Pokemon[] = [];

  addPokemon(pokemon: Pokemon): void {
    this.pokemons.push(pokemon);
  }

  *[Symbol.iterator](): IterableIterator<Pokemon> {
    yield* this.pokemons;
  }
}

function main(): void {
  const pokedex = new PokemonCollection();

  pokedex.addPokemon(new Pokemon('Pikachu', 'Electric'));
  pokedex.addPokemon(new Pokemon('Charmander', 'Fire'));
  pokedex.addPokemon(new Pokemon('Squirtle', 'Water'));
  pokedex.addPokemon(new Pokemon('Bulbasaur', 'Grass'));

  console.log('looping through pokedex');
  for (const pokemon of pokedex) {
    console.log(`Pokémon: ${pokemon.name}, Type: ${pokemon.type}`);
  }
}

main();
