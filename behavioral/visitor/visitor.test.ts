import { Car, Motorcycle, Truck, MaintenanceCostVisitor, EmissionCheckVisitor } from './visitor';

describe('Visitor Pattern Tests', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('MaintenanceCostVisitor', () => {
    let visitor: MaintenanceCostVisitor;

    beforeEach(() => {
      visitor = new MaintenanceCostVisitor();
    });

    it('should calculate correct maintenance cost for Car', () => {
      const car = new Car(2020, 50000);
      visitor.visitCar(car);
      const currentYear = new Date().getFullYear();
      const expectedCost = (50000 * 0.1 + (currentYear - 2020) * 50).toFixed(2);
      expect(consoleSpy).toHaveBeenCalledWith(`The cost for the car is: $${expectedCost}`);
    });

    it('should calculate correct maintenance cost for Motorcycle', () => {
      const motorcycle = new Motorcycle(2019, 30000);
      visitor.visitMotorcycle(motorcycle);
      const currentYear = new Date().getFullYear();
      const expectedCost = (30000 * 0.05 + (currentYear - 2019) * 30).toFixed(2);
      expect(consoleSpy).toHaveBeenCalledWith(`the cost for the motorcycle is: $${expectedCost}`);
    });

    it('should calculate correct maintenance cost for Truck', () => {
      const truck = new Truck(2018, 100000, 30);
      visitor.visitTruck(truck);
      const currentYear = new Date().getFullYear();
      const expectedCost = (100000 * 0.15 + 30 * 20 + (currentYear - 2018) * 100).toFixed(2);
      expect(consoleSpy).toHaveBeenCalledWith(`The cost for the car is: $${expectedCost}`);
    });
  });

  describe('EmissionCheckVisitor', () => {
    let visitor: EmissionCheckVisitor;

    beforeEach(() => {
      visitor = new EmissionCheckVisitor();
    });

    it('should pass emissions check for new Car with low kilometers', () => {
      const car = new Car(2022, 10000);
      visitor.visitCar(car);
      expect(consoleSpy).toHaveBeenCalledWith('Is the vehicle allowed: Yes');
    });

    it('should fail emissions check for old Car with high kilometers', () => {
      const car = new Car(1999, 250000);
      visitor.visitCar(car);
      expect(consoleSpy).toHaveBeenCalledWith('Is the vehicle allowed: No');
    });

    it('should pass emissions check for compliant Motorcycle', () => {
      const motorcycle = new Motorcycle(2010, 50000);
      visitor.visitMotorcycle(motorcycle);
      expect(consoleSpy).toHaveBeenCalledWith('Is the vehicle allowed: Yes');
    });

    it('should fail emissions check for non-compliant Truck', () => {
      const truck = new Truck(2009, 350000, 40);
      visitor.visitTruck(truck);
      expect(consoleSpy).toHaveBeenCalledWith('Is the vehicle allowed: No');
    });
  });

  describe('Vehicle accept method', () => {
    it('should call correct visitor method for each vehicle type', () => {
      const maintenanceVisitor = new MaintenanceCostVisitor();
      const car = new Car(2020, 50000);
      const motorcycle = new Motorcycle(2019, 30000);
      const truck = new Truck(2018, 100000, 30);

      const visitCarSpy = jest.spyOn(maintenanceVisitor, 'visitCar');
      const visitMotorcycleSpy = jest.spyOn(maintenanceVisitor, 'visitMotorcycle');
      const visitTruckSpy = jest.spyOn(maintenanceVisitor, 'visitTruck');

      car.accept(maintenanceVisitor);
      motorcycle.accept(maintenanceVisitor);
      truck.accept(maintenanceVisitor);

      expect(visitCarSpy).toHaveBeenCalledWith(car);
      expect(visitMotorcycleSpy).toHaveBeenCalledWith(motorcycle);
      expect(visitTruckSpy).toHaveBeenCalledWith(truck);
    });
  });
});
