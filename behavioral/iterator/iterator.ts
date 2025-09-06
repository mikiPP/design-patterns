export class Card {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export class CardCollection {
  private deck: Card[] = [];

  addCard(card: Card): void {
    this.deck.push(card);
  }

  *[Symbol.iterator](): IterableIterator<Card> {
    yield* this.deck;
  }

  *getCard(): IterableIterator<Card> {
    for (const card of this.deck) {
      yield card;
    }
  }
}

function main(): void {
  const deck = new CardCollection();

  deck.addCard(new Card('Ace de Hearts', 1));
  deck.addCard(new Card('King de Hearts', 13));
  deck.addCard(new Card('Queen de Hearts', 12));
  deck.addCard(new Card('Jack de Hearts', 11));

  for (const card of deck) {
    console.log(`Card: ${card.name}, Value: ${card.value}`);
  }
}

main();
