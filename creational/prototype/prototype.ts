export class Pokemon {
  name: string;
  type: string;
  level: number;
  attacks: string[];

  constructor(name: string, type: string, level: number, attacks: string[]) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.attacks = attacks;
  }

  clone(): Pokemon {
    const newAttacks = new Array().concat(this.attacks);

    return new Pokemon(this.name, this.type, this.level, newAttacks);
  }

  displayInfo(): void {
    console.log(
      `Name: ${this.name}\nType: ${this.type}\nLevel: ${this.level}\nAttacks: ${this.attacks.join(
        ', ',
      )}`,
    );
  }
}

function main() {
  const basePokemon = new Pokemon('Charmander', 'Fire', 1, ['Flamethrower', 'Scratch']);
  const pokemonCloned = basePokemon.clone();
  pokemonCloned.name = 'Charmeleon';
  pokemonCloned.level = 16;
  pokemonCloned.attacks.push('Flight');

  basePokemon.displayInfo();
  pokemonCloned.displayInfo();
}

main();
