class BulletType {
  private name: string;
  private damage: number;
  private color: string;

  constructor(name: string, damage: number, color: string) {
    this.name = name;
    this.damage = damage;
    this.color = color;
  }

  getName(): string {
    return this.name;
  }

  getDamage(): number {
    return this.damage;
  }

  getColor(): string {
    return this.color;
  }
}

export class BulletTypeFactory {
  private bulletTypes: Record<string, BulletType> = {};

  getBulletType(name: string, damage: number, color: string): BulletType {
    const key = `${name}-${damage}-${color}`;

    if (!this.bulletTypes[key]) {
      this.bulletTypes[key] = new BulletType(name, damage, color);
    }

    return this.bulletTypes[key];
  }
}

class Bullet {
  private x: number;
  private y: number;
  private direction: number;
  private bulletType: BulletType;

  constructor(x: number, y: number, direction: number, bulletType: BulletType) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.bulletType = bulletType;
  }

  display(): void {
    const text = `
      Bullet type:"${this.bulletType.getName()}" 
      Coords: (${this.x}, ${this.y})
      Direction ${this.direction}
      Damage: ${this.bulletType.getDamage()} 
      Color: ${this.bulletType.getColor()}
    `;

    console.log(text);
  }
}

export class ShootingSystem {
  private bullets: Bullet[] = [];
  private factory: BulletTypeFactory;

  constructor(factory: BulletTypeFactory) {
    this.factory = factory;
  }

  shoot(
    x: number,
    y: number,
    direction: number,
    type: string,
    damage: number,
    color: string,
  ): void {
    const bulletType = this.factory.getBulletType(type, damage, color);
    const bullet = new Bullet(x, y, direction, bulletType);
    this.bullets.push(bullet);
    bullet.display();
  }

  getBulletCount(): number {
    return this.bullets.length;
  }
}

function main() {
  const factory = new BulletTypeFactory();
  const shootingSystem = new ShootingSystem(factory);

  shootingSystem.shoot(10, 20, 0, 'Gun', 10, 'Gray');
  shootingSystem.shoot(15, 25, 90, 'Shotgun', 20, 'Red');
  shootingSystem.shoot(20, 30, 180, 'Assault rifle', 15, 'Green');
  shootingSystem.shoot(10, 20, 45, 'Gun', 10, 'Gray');
  shootingSystem.shoot(25, 35, 270, 'Shotgun', 20, 'Red');

  console.log(`Total shooted bullets:${shootingSystem.getBulletCount()}\n`);
}

main();
