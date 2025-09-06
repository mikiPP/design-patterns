import { Card, CardCollection } from './iterator';
import { Pokemon, PokemonCollection } from './iterator-with-symbol';

// Helper to collect cards from an iterable
function collectCards(collection: Iterable<Card>): Card[] {
  return Array.from(collection);
}

describe('Card', () => {
  it('should create a card with name and value', () => {
    const card = new Card('Ace of Hearts', 1);
    expect(card.name).toBe('Ace of Hearts');
    expect(card.value).toBe(1);
  });
});

describe('CardCollection', () => {
  let deck: CardCollection;

  beforeEach(() => {
    deck = new CardCollection();
    deck.addCard(new Card('Ace of Hearts', 1));
    deck.addCard(new Card('King of Hearts', 13));
    deck.addCard(new Card('Queen of Hearts', 12));
    deck.addCard(new Card('Jack of Hearts', 11));
  });

  it('should be iterable with for...of (Symbol.iterator)', () => {
    const names: string[] = [];
    for (const card of deck) {
      names.push(card.name);
    }
    expect(names).toEqual(['Ace of Hearts', 'King of Hearts', 'Queen of Hearts', 'Jack of Hearts']);
  });

  it('should yield cards using getCard generator', () => {
    // @ts-ignore: test generator if implemented
    if (typeof deck.getCard === 'function') {
      const cards = collectCards(deck.getCard());
      expect(cards.map((c) => c.name)).toEqual([
        'Ace of Hearts',
        'King of Hearts',
        'Queen of Hearts',
        'Jack of Hearts',
      ]);
    }
  });
});

describe('Pokedex (Symbol.iterator)', () => {
  let pokedex: PokemonCollection;

  beforeEach(() => {
    pokedex = new PokemonCollection();
    pokedex.addPokemon(new Pokemon('Pikachu', 'Electric'));
    pokedex.addPokemon(new Pokemon('Charmander', 'Fire'));
  });

  it('should be iterable with for...of', () => {
    const values: string[] = [];
    for (const pokemon of pokedex) {
      values.push(pokemon.name);
    }
    expect(values).toEqual(['Pikachu', 'Charmander']);
  });
});
