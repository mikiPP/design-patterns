import { Player } from './immutability';

describe('Player', () => {
  it('should create a player with initial values', () => {
    const player = new Player('Pepe', 0, 1);
    expect(player.name).toBe('Pepe');
    expect(player.score).toBe(0);
    expect(player.level).toBe(1);
  });

  it('should create a copy with updated score', () => {
    const player = new Player('Pepe', 0, 1);
    const updatedPlayer = player.copyWith({ score: 10 });
    expect(updatedPlayer.name).toBe('Pepe');
    expect(updatedPlayer.score).toBe(10);
    expect(updatedPlayer.level).toBe(1);
  });

  it('should create a copy with updated level', () => {
    const player = new Player('Pepe', 0, 1);
    const updatedPlayer = player.copyWith({ level: 2 });
    expect(updatedPlayer.name).toBe('Pepe');
    expect(updatedPlayer.score).toBe(0);
    expect(updatedPlayer.level).toBe(2);
  });

  it('should create a copy with updated name', () => {
    const player = new Player('Pepe', 0, 1);
    const updatedPlayer = player.copyWith({ name: 'Pepe Pro' });
    expect(updatedPlayer.name).toBe('Pepe Pro');
    expect(updatedPlayer.score).toBe(0);
    expect(updatedPlayer.level).toBe(1);
  });

  it('should create a copy with multiple updated properties', () => {
    const player = new Player('Pepe', 0, 1);
    const updatedPlayer = player.copyWith({ name: 'Pepe Pro', score: 20, level: 3 });
    expect(updatedPlayer.name).toBe('Pepe Pro');
    expect(updatedPlayer.score).toBe(20);
    expect(updatedPlayer.level).toBe(3);
  });
});
