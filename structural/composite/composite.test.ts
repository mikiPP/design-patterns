import { MenuItem, MenuCategory } from './composite';

describe('Composite Pattern', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should display details of a single menu item', () => {
    const salad = new MenuItem('Salad', 5.99);
    salad.showDetails();
    expect(consoleSpy).toHaveBeenCalledWith('- Salad: $5.99');
  });

  it('should display details of a menu category with items', () => {
    const salad = new MenuItem('Salad', 5.99);
    const soup = new MenuItem('Soup', 4.99);
    const appetizers = new MenuCategory('Appetizers');
    appetizers.add(salad);
    appetizers.add(soup);

    appetizers.showDetails();
    expect(consoleSpy).toHaveBeenCalledWith('+ Appetizers');
    expect(consoleSpy).toHaveBeenCalledWith(' - Salad: $5.99');
    expect(consoleSpy).toHaveBeenCalledWith(' - Soup: $4.99');
  });

  it('should display details of a nested menu category', () => {
    const coffee = new MenuItem('Coffee', 1.99);
    const hotBeverages = new MenuCategory('Hot Beverages');
    hotBeverages.add(coffee);

    const beverages = new MenuCategory('Beverages');
    beverages.add(hotBeverages);

    beverages.showDetails();
    expect(consoleSpy).toHaveBeenCalledWith('+ Beverages');
    expect(consoleSpy).toHaveBeenCalledWith(' + Hot Beverages');
    expect(consoleSpy).toHaveBeenCalledWith('  - Coffee: $1.99');
  });

  it('should display details of the main menu with all categories and items', () => {
    const salad = new MenuItem('Salad', 5.99);
    const soup = new MenuItem('Soup', 4.99);
    const steak = new MenuItem('Meat', 15.99);
    const water = new MenuItem('Water', 2.5);
    const juice = new MenuItem('Juice', 3.24);
    const dessert = new MenuItem('Chocolate cake', 6.5);
    const coffee = new MenuItem('Coffee', 1.99);

    const appetizers = new MenuCategory('Appetizers');
    appetizers.add(salad);
    appetizers.add(soup);

    const mainCourse = new MenuCategory('Main dishes');
    mainCourse.add(steak);

    const beverages = new MenuCategory('Beverages');
    beverages.add(water);
    beverages.add(juice);

    const hotBeverages = new MenuCategory('Hot');
    hotBeverages.add(coffee);
    beverages.add(hotBeverages);

    const desserts = new MenuCategory('Desserts');
    desserts.add(dessert);

    const mainMenu = new MenuCategory('Menú Principal');
    mainMenu.add([appetizers, beverages, desserts, mainCourse]);

    mainMenu.showDetails();
    expect(consoleSpy).toHaveBeenCalledWith('+ Menú Principal');
    expect(consoleSpy).toHaveBeenCalledWith(' + Appetizers');
    expect(consoleSpy).toHaveBeenCalledWith('  - Salad: $5.99');
    expect(consoleSpy).toHaveBeenCalledWith('  - Soup: $4.99');
    expect(consoleSpy).toHaveBeenCalledWith(' + Beverages');
    expect(consoleSpy).toHaveBeenCalledWith('  - Water: $2.50');
    expect(consoleSpy).toHaveBeenCalledWith('  - Juice: $3.24');
    expect(consoleSpy).toHaveBeenCalledWith('  + Hot');
    expect(consoleSpy).toHaveBeenCalledWith('   - Coffee: $1.99');
    expect(consoleSpy).toHaveBeenCalledWith(' + Desserts');
    expect(consoleSpy).toHaveBeenCalledWith('  - Chocolate cake: $6.50');
    expect(consoleSpy).toHaveBeenCalledWith(' + Main dishes');
    expect(consoleSpy).toHaveBeenCalledWith('  - Meat: $15.99');
  });
});
