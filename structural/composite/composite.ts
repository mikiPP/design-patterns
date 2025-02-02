export interface MenuComponent {
  showDetails(indent?: string): void;
}

export class MenuItem implements MenuComponent {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  showDetails(indent: string = ''): void {
    console.log(`${indent}- ${this.name}: $${this.price.toFixed(2)}`);
  }
}

export class MenuCategory implements MenuComponent {
  private name: string;
  private items: MenuComponent[];

  constructor(name: string) {
    this.name = name;
    this.items = [];
  }

  add(items: MenuComponent[] | MenuComponent): void {
    if (Array.isArray(items)) {
      this.items = this.items.concat(items);
    } else {
      this.items.push(items);
    }
  }

  showDetails(indent: string = ''): void {
    console.log(`${indent}+ ${this.name}`);
    this.items.forEach((menuComponent) => {
      menuComponent.showDetails(indent + ' ');
    });
  }
}

function main() {
  const salad = new MenuItem('Salad', 5.99);
  const soup = new MenuItem('Soup', 4.99);
  const steak = new MenuItem('Meat', 15.99);
  const water = new MenuItem('Water', 2.5);
  const juice = new MenuItem('Juice', 3.24);
  const dessert = new MenuItem('Chocolate cake', 6.5);

  const appetizers = new MenuCategory('Appetizers');
  appetizers.add(salad);
  appetizers.add(soup);

  const mainCourse = new MenuCategory('Main dishes');
  mainCourse.add(steak);

  const beverages = new MenuCategory('Beverages');
  beverages.add(water);
  beverages.add(juice);

  const hotBeverages = new MenuCategory('Hot');
  const coffee = new MenuItem('Coffe', 1.99);
  hotBeverages.add(coffee);
  beverages.add(hotBeverages);

  const desserts = new MenuCategory('Desserts');
  desserts.add(dessert);

  const mainMenu = new MenuCategory('Menú Principal');
  mainMenu.add([appetizers, beverages, desserts, mainCourse]);

  console.log('Menu:');
  mainMenu.showDetails();
}

main();
