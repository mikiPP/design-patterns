import {
  BasicCharacter,
  HelmetDecorator,
  ShieldDecorator,
  SwordDecorator,
  RingDecorator,
} from './decorator';

describe('Decorator Pattern', () => {
  it('should create a basic character', () => {
    const character = new BasicCharacter();
    expect(character.getDescription()).toBe('Basic Character');
    expect(character.getStats()).toEqual({ attack: 10, defense: 10 });
  });

  it('should add helmet to the character', () => {
    let character = new BasicCharacter();
    character = new HelmetDecorator(character);
    expect(character.getDescription()).toBe('Basic Character\n * With helmet');
    expect(character.getStats()).toEqual({ attack: 10, defense: 15 });
  });

  it('should add shield to the character', () => {
    let character = new BasicCharacter();
    character = new ShieldDecorator(character);
    expect(character.getDescription()).toBe('Basic Character\n * with Shield');
    expect(character.getStats()).toEqual({ attack: 10, defense: 20 });
  });

  it('should add sword to the character', () => {
    let character = new BasicCharacter();
    character = new SwordDecorator(character);
    expect(character.getDescription()).toBe('Basic Character\n * with Sword');
    expect(character.getStats()).toEqual({ attack: 17, defense: 10 });
  });

  it('should add ring to the character', () => {
    let character = new BasicCharacter();
    character = new RingDecorator(character);
    expect(character.getDescription()).toBe('Basic Character\n * with Ring');
    expect(character.getStats()).toEqual({ attack: 13, defense: 10 });
  });

  it('should add multiple decorators to the character', () => {
    let character = new BasicCharacter();
    character = new HelmetDecorator(character);
    character = new ShieldDecorator(character);
    character = new SwordDecorator(character);
    character = new RingDecorator(character);
    expect(character.getDescription()).toBe(
      'Basic Character\n * With helmet\n * with Shield\n * with Sword\n * with Ring',
    );
    expect(character.getStats()).toEqual({ attack: 20, defense: 25 });
  });
});
