/**
1. Complete the copyWith method in the Player class to allow 
creating a copy with changes in name, score, or level.

2. Use the client code to test the functionality of copyWith, 
making changes to the player's score, level, and name.
 */

// 1. Clase Player inmutable
export class Player {
  readonly name: string;
  readonly score: number;
  readonly level: number;

  constructor(name: string, score: number, level: number) {
    this.name = name;
    this.score = score;
    this.level = level;
  }

  copyWith({ name, score, level }: Partial<Player>): Player {
    return new Player(name ?? this.name, score ?? this.score, level ?? this.level);
  }

  displayState(): void {
    console.log(`\nPlayer: ${this.name}`);
    console.log(`\nScore: ${this.score}`);
    console.log(`\nLevel: ${this.level}`);
  }
}

function main() {
  let player = new Player('Pepe', 0, 1);
  console.log('Initial State:');
  player.displayState();

  player = player.copyWith({ score: 10 });
  console.log('\nAfter increasing the score:');
  player.displayState();

  player = player.copyWith({ level: 2 });
  console.log('\nAfter increasing the level:');
  player.displayState();

  player = player.copyWith({ name: 'Pepe Pro' });
  console.log('\nAfter changing the name:');
  player.displayState();
}

main();
