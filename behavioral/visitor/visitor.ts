interface Visitor {
  visitCar(car: Car): void;
  visitMotorcycle(motorcycle: Motorcycle): void;
  visitTruck(truck: Truck): void;
}

interface Vehicle {
  accept(visitor: Visitor): void;
  getYear(): number;
  getKilometers(): number;
}

export class Car implements Vehicle {
  private year: number;
  private kilometers: number;

  constructor(year: number, kilometers: number) {
    this.year = year;
    this.kilometers = kilometers;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  accept(visitor: Visitor): void {
    visitor.visitCar(this);
  }
}

export class Motorcycle implements Vehicle {
  private year: number;
  private kilometers: number;

  constructor(year: number, kilometers: number) {
    this.year = year;
    this.kilometers = kilometers;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  accept(visitor: Visitor): void {
    visitor.visitMotorcycle(this);
  }
}

export class Truck implements Vehicle {
  private year: number;
  private kilometers: number;
  private loadCapacity: number;

  constructor(year: number, kilometers: number, loadCapacity: number) {
    this.year = year;
    this.kilometers = kilometers;
    this.loadCapacity = loadCapacity;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  getLoadCapacity(): number {
    return this.loadCapacity;
  }

  accept(visitor: Visitor): void {
    visitor.visitTruck(this);
  }
}

export class MaintenanceCostVisitor implements Visitor {
  private CURRENT_YEAR = new Date().getFullYear();

  visitCar(car: Car): void {
    const cost = car.getKilometers() * 0.1 + (this.CURRENT_YEAR - car.getYear()) * 50;
    console.log(`The cost for the car is: $${cost.toFixed(2)}`);
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    const cost =
      motorcycle.getKilometers() * 0.05 + (this.CURRENT_YEAR - motorcycle.getYear()) * 30;
    console.log(`the cost for the motorcycle is: $${cost.toFixed(2)}`);
  }

  visitTruck(truck: Truck): void {
    const cost =
      truck.getKilometers() * 0.15 +
      truck.getLoadCapacity() * 20 +
      (this.CURRENT_YEAR - truck.getYear()) * 100;

    console.log(`The cost for the car is: $${cost.toFixed(2)}`);
  }
}

export class EmissionCheckVisitor implements Visitor {
  visitCar(car: Car): void {
    this.isAcomplishingEmissionsCriteria({
      minYearForPassTheEmissionsCheck: 2000,
      maxKmForPassTheEmissionsCheck: 200_000,
      vehicle: car,
    });
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    this.isAcomplishingEmissionsCriteria({
      minYearForPassTheEmissionsCheck: 2005,
      maxKmForPassTheEmissionsCheck: 100_000,
      vehicle: motorcycle,
    });
  }

  visitTruck(truck: Truck): void {
    this.isAcomplishingEmissionsCriteria({
      minYearForPassTheEmissionsCheck: 2010,
      maxKmForPassTheEmissionsCheck: 300_000,
      vehicle: truck,
    });
  }

  private isAcomplishingEmissionsCriteria({
    minYearForPassTheEmissionsCheck,
    maxKmForPassTheEmissionsCheck,
    vehicle,
  }: {
    minYearForPassTheEmissionsCheck: number;
    maxKmForPassTheEmissionsCheck: number;
    vehicle: Vehicle;
  }): void {
    const passes =
      vehicle.getYear() > minYearForPassTheEmissionsCheck &&
      vehicle.getKilometers() < maxKmForPassTheEmissionsCheck;

    console.log(`Is the vehicle allowed: ${passes ? 'Yes' : 'No'}`);
  }
}

function main(): void {
  const vehicles: Vehicle[] = [
    new Car(2018, 50_000),
    new Motorcycle(2015, 30_000),
    new Truck(2008, 250_000, 20),
  ];

  console.log('\nCalculating the maintainance cost:');
  const maintenanceVisitor = new MaintenanceCostVisitor();
  vehicles.forEach((vehicle) => vehicle.accept(maintenanceVisitor));

  console.log('\nChecking emission:');
  const emissionVisitor = new EmissionCheckVisitor();
  vehicles.forEach((vehicle) => vehicle.accept(emissionVisitor));
}

main();
