import { BulletTypeFactory, ShootingSystem } from './flyweight';

describe('Flyweight Pattern', () => {
  let factory: BulletTypeFactory;
  let shootingSystem: ShootingSystem;

  beforeEach(() => {
    factory = new BulletTypeFactory();
    shootingSystem = new ShootingSystem(factory);
  });

  test('should create and reuse bullet types', () => {
    shootingSystem.shoot(10, 20, 0, 'Gun', 10, 'Gray');
    shootingSystem.shoot(15, 25, 90, 'ShotGun', 20, 'Red');
    shootingSystem.shoot(20, 30, 180, 'Assault rifle', 15, 'Green');
    shootingSystem.shoot(10, 20, 45, 'Gun', 10, 'Gray');
    shootingSystem.shoot(25, 35, 270, 'ShotGun', 20, 'Red');

    expect(shootingSystem.getBulletCount()).toBe(5);
    expect(Object.keys(factory['bulletTypes']).length).toBe(3);
  });

  test('should correctly store bullet properties', () => {
    shootingSystem.shoot(10, 20, 0, 'Gun', 10, 'Gray');
    const bullet = shootingSystem['bullets'][0];

    expect(bullet['x']).toBe(10);
    expect(bullet['y']).toBe(20);
    expect(bullet['direction']).toBe(0);
    expect(bullet['bulletType'].getName()).toBe('Gun');
    expect(bullet['bulletType'].getDamage()).toBe(10);
    expect(bullet['bulletType'].getColor()).toBe('Gray');
  });

  test('should display bullet information', () => {
    console.log = jest.fn();
    shootingSystem.shoot(10, 20, 0, 'Gun', 10, 'Gray');

    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Bullet type:"Gun"'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Coords: (10, 20)'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Direction 0'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Damage: 10'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Color: Gray'));
  });
});
