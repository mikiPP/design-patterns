interface Character {
  getDescription(): string;
  getStats(): { attack: number; defense: number };
}

export class BasicCharacter implements Character {
  getDescription(): string {
    return 'Basic Character';
  }

  getStats(): { attack: number; defense: number } {
    return { attack: 10, defense: 10 };
  }
}

abstract class CharacterDecorator implements Character {
  protected character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  getDescription(): string {
    return this.character.getDescription();
  }

  getStats(): { attack: number; defense: number } {
    return this.character.getStats();
  }
}

export class HelmetDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * With helmet';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 5 };
  }
}

export class ShieldDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * with Shield';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 10 };
  }
}

export class SwordDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * with Sword';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 7, defense: stats.defense };
  }
}

export class RingDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * with Ring';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 3, defense: stats.defense };
  }
}

function main() {
  let character: Character = new BasicCharacter();
  console.log('\n Initial character:', character.getDescription());
  console.log('Stats:', character.getStats());

  character = new HelmetDecorator(character);
  console.log('\nWith Helmet:', character.getDescription());
  console.log('Stats:', character.getStats());

  character = new ShieldDecorator(character);
  console.log('\nWith Shield:', character.getDescription());
  console.log('Stats:', character.getStats());

  character = new SwordDecorator(character);
  console.log('\nWith Sword:', character.getDescription());
  console.log('Stats:', character.getStats());

  character = new RingDecorator(character);
  console.log('\nWith Ring:', character.getDescription());
  console.log('Stats:', character.getStats());

  console.log('\n');
}

main();
